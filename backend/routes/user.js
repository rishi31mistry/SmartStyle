const express = require('express');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const User = require('../models/User');
const Order = require('../models/Order');
const auth = require('../middleware/authMiddleware');
const { isSuperAdmin, getRole } = require('../utils/adminAccess');

const router = express.Router();

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({ storage });

function adminOnly(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  next();
}

function serializeUser(user) {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    role: getRole(user),
    isBlocked: Boolean(user.isBlocked),
    isSuperAdmin: isSuperAdmin(user.email),
    createdAt: user.createdAt,
    profileImage: user.profileImage || '',
  };
}

router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .select('_id items amount currency paymentMethod status createdAt razorpayOrderId razorpayPaymentId receipt cancelledAt cancelReason')
      .lean();

    res.json({
      ...user.toObject(),
      orders,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/update', auth, async (req, res) => {
  const {
    name,
    email,
    phone,
    addressStreet,
    addressCity,
    addressState,
    addressPincode,
    paymentCardName,
    paymentCardLast4,
    paymentCardExpiry,
    paymentUpiId,
    securityTwoFactor,
    securityLoginAlerts,
    securitySessionTimeout,
  } = req.body;

  try {
    const update = {};
    if (name !== undefined) update.name = name;
    if (email !== undefined) update.email = email;
    if (phone !== undefined) update.phone = phone;
    if (addressStreet !== undefined) update.addressStreet = addressStreet;
    if (addressCity !== undefined) update.addressCity = addressCity;
    if (addressState !== undefined) update.addressState = addressState;
    if (addressPincode !== undefined) update.addressPincode = addressPincode;
    if (paymentCardName !== undefined) update.paymentCardName = paymentCardName;
    if (paymentCardLast4 !== undefined) update.paymentCardLast4 = paymentCardLast4;
    if (paymentCardExpiry !== undefined) update.paymentCardExpiry = paymentCardExpiry;
    if (paymentUpiId !== undefined) update.paymentUpiId = paymentUpiId;
    if (securityTwoFactor !== undefined) update.securityTwoFactor = securityTwoFactor;
    if (securityLoginAlerts !== undefined) update.securityLoginAlerts = securityLoginAlerts;
    if (securitySessionTimeout !== undefined) update.securitySessionTimeout = securitySessionTimeout;

    const user = await User.findByIdAndUpdate(req.user.id, update, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/delete', auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: 'Account deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/profile-image', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No image uploaded' });

    const imagePath = `/uploads/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage: imagePath },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/password', auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new password are required' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/admin/users', auth, adminOnly, async (_req, res) => {
  try {
    const users = await User.find({})
      .sort({ createdAt: -1 })
      .select('name email phone role isBlocked profileImage createdAt');

    res.json(users.map(serializeUser));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/admin/users/:id/role', auth, adminOnly, async (req, res) => {
  const { role } = req.body;

  try {
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (isSuperAdmin(user.email)) {
      return res.status(400).json({ message: 'Cannot change super-admin role' });
    }

    user.role = role;
    await user.save();

    res.json({
      message: `${user.email} is now ${role}`,
      user: serializeUser(user),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/admin/users/:id/status', auth, adminOnly, async (req, res) => {
  const { isBlocked } = req.body;

  try {
    if (typeof isBlocked !== 'boolean') {
      return res.status(400).json({ message: 'isBlocked must be a boolean value' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (isSuperAdmin(user.email)) {
      return res.status(400).json({ message: 'Cannot block or unblock a super-admin' });
    }

    user.isBlocked = isBlocked;
    await user.save();

    res.json({
      message: `${user.email} has been ${isBlocked ? 'blocked' : 'unblocked'}`,
      user: serializeUser(user),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
