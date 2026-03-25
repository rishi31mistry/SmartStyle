const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');

// GET cart
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('cart');
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADD to cart
router.post('/add', auth, async (req, res) => {
  const { productId, name, price, image, size, quantity } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const exists = user.cart.find(
      item => item.productId === productId && item.size === size
    );
    if (exists) {
      exists.quantity += quantity || 1;
    } else {
      user.cart.push({ productId, name, price, image, size, quantity: quantity || 1 });
    }
    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE quantity
router.put('/update/:productId', auth, async (req, res) => {
  const { size, quantity } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const item = user.cart.find(
      item => item.productId === req.params.productId && item.size === size
    );
    if (!item) return res.status(404).json({ message: 'Item not found' });
    item.quantity = quantity;
    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// REMOVE from cart
router.delete('/remove/:productId', auth, async (req, res) => {
  const { size } = req.query;
  try {
    const user = await User.findById(req.user.id);
    user.cart = user.cart.filter(
      item => !(item.productId === req.params.productId && item.size === size)
    );
    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CLEAR cart
router.delete('/clear', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.cart = [];
    await user.save();
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;