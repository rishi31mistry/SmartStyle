const express = require('express');
const auth = require('../middleware/authMiddleware');
const Order = require('../models/Order');

const router = express.Router();

function adminOnly(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  next();
}

router.get('/dashboard', auth, adminOnly, async (_req, res) => {
  try {
    const paidOrders = await Order.find({ status: 'paid' }).lean();
    const totalOrders = paidOrders.length;
    const totalUnitsSold = paidOrders.reduce(
      (sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + Number(item.quantity || 0), 0),
      0
    );

    const productMap = new Map();
    const categoryMap = new Map();

    for (const order of paidOrders) {
      for (const item of order.items) {
        const existingProduct = productMap.get(item.productId) || {
          productId: item.productId,
          name: item.name,
          soldUnits: 0,
        };

        existingProduct.soldUnits += Number(item.quantity || 0);
        productMap.set(item.productId, existingProduct);

        const categorySource = Array.isArray(item.category) ? item.category[0] : item.category;
        const category = categorySource || 'Other';
        categoryMap.set(category, (categoryMap.get(category) || 0) + Number(item.quantity || 0));
      }
    }

    res.json({
      totalOrders,
      totalUnitsSold,
      topSoldProducts: [...productMap.values()]
        .sort((a, b) => b.soldUnits - a.soldUnits)
        .slice(0, 5),
      soldByCategory: [...categoryMap.entries()]
        .sort((a, b) => b[1] - a[1]),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
