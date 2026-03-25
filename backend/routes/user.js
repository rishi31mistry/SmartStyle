/* eslint-env node */
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');

// GET user profile (protected)
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE user account
router.put('/update', auth, async (req, res) => {
  const { name, address, phone } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, address, phone },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;