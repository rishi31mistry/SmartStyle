/* eslint-env node */
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');

// GET wishlist
router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('wishlist');
  res.json(user.wishlist);
});

// ADD to wishlist
router.post('/add', auth, async (req, res) => {
  const { productId, name, price, image } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const exists = user.wishlist.find(item => item.productId === productId);
    if (exists) return res.status(400).json({ message: 'Already in wishlist' });

    user.wishlist.push({ productId, name, price, image });
    await user.save();
    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// REMOVE from wishlist
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.wishlist = user.wishlist.filter(item => item.productId !== req.params.productId);
    await user.save();
    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;