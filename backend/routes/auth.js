const express  = require('express');
const router   = express.Router();
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const User     = require('../models/User');

// ─── List of permanent super-admins (always admin regardless of DB role) ──────
// Add your email and any other permanent admins here
const SUPER_ADMINS = [
  'mistryrishi31052004@gmail.com',
  // 'anotherpermanentadmin@gmail.com',  ← add more here anytime
]

function isSuperAdmin(email) {
  return SUPER_ADMINS.map(e => e.toLowerCase()).includes(String(email).toLowerCase())
}

function getRole(user) {
  // Super admin email always wins, regardless of what's in DB
  if (isSuperAdmin(user.email)) return 'admin'
  // Otherwise use whatever role is stored in the user document
  return user.role || 'user'
}

function buildToken(user) {
  const role = getRole(user)
  return jwt.sign(
    { id: user._id, email: user.email, role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

function buildAuthResponse(user) {
  const role = getRole(user)
  return {
    token: buildToken(user),
    user: {
      id:    user._id,
      name:  user.name,
      email: user.email,
      role,
    }
  }
}

// ─── Middleware: verify JWT ───────────────────────────────────────────────────
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'No token' })
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}

// ─── Middleware: admin only ───────────────────────────────────────────────────
function adminOnly(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' })
  }
  next()
}

// ─── SIGNUP ───────────────────────────────────────────────────────────────────
router.post('/signup', async (req, res) => {
  const { name, email, password, phone } = req.body
  try {
    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ message: 'Email already exists' })

    const hashed = await bcrypt.hash(password, 10)

    // If signing up with a super-admin email, store admin role in DB too
    const role = isSuperAdmin(email) ? 'admin' : 'user'

    const user = await User.create({ name, email, password: hashed, phone, role })
    res.status(201).json(buildAuthResponse(user))
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ─── LOGIN ────────────────────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' })

    // If this is a super-admin email but DB has role 'user' (old account),
    // fix it in DB automatically on login
    if (isSuperAdmin(email) && user.role !== 'admin') {
      user.role = 'admin'
      await user.save()
      console.log(`Auto-upgraded ${email} to admin role in DB`)
    }

    res.json(buildAuthResponse(user))
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ─── FORGOT PASSWORD ──────────────────────────────────────────────────────────
router.post('/forgot-password', async (req, res) => {
  const { email, newPassword } = req.body
  try {
    if (!email || !newPassword)
      return res.status(400).json({ message: 'Email and new password are required' })
    if (newPassword.length < 8)
      return res.status(400).json({ message: 'Password must be at least 8 characters' })

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'User not found' })

    user.password = await bcrypt.hash(newPassword, 10)
    await user.save()
    res.json({ message: 'Password updated successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ─── ADMIN: Grant admin role to any user ─────────────────────────────────────
// POST /api/auth/make-admin   { email: 'someone@gmail.com' }
// Only existing admins can call this
router.post('/make-admin', authMiddleware, adminOnly, async (req, res) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found' })

    user.role = 'admin'
    await user.save()
    console.log(`Admin granted to ${email} by ${req.user.email}`)
    res.json({ message: `${email} is now an admin`, user: { email, role: 'admin' } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ─── ADMIN: Remove admin role from a user ────────────────────────────────────
// POST /api/auth/remove-admin   { email: 'someone@gmail.com' }
router.post('/remove-admin', authMiddleware, adminOnly, async (req, res) => {
  const { email } = req.body
  try {
    // Can't remove a super-admin
    if (isSuperAdmin(email))
      return res.status(400).json({ message: 'Cannot remove super-admin role' })

    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found' })

    user.role = 'user'
    await user.save()
    console.log(`Admin removed from ${email} by ${req.user.email}`)
    res.json({ message: `${email} admin access removed` })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ─── ADMIN: List all admins ───────────────────────────────────────────────────
// GET /api/auth/admins
router.get('/admins', authMiddleware, adminOnly, async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' }).select('name email role createdAt')
    res.json(admins)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
