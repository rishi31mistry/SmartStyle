const express = require('express');
const auth = require('../middleware/authMiddleware');
const Notification = require('../models/Notification');

const router = express.Router();

function buildPromoNotifications() {
  const now = new Date();

  return [
    {
      _id: 'promo-flash-sale',
      type: 'promotion',
      event: 'sale_live',
      title: 'Flash sale is live',
      message: 'Flash sale is live now. Grab your favorites before the prices go back up.',
      isRead: true,
      createdAt: new Date(now.getTime() - (1000 * 60 * 60 * 4)),
      metadata: {
        link: '/products/flash-sale',
      },
    },
    {
      _id: 'promo-deals-day',
      type: 'promotion',
      event: 'deals_live',
      title: 'Deals of the day are live',
      message: 'Fresh daily offers are now available in SmartStyle. Check the latest deals and trending picks.',
      isRead: true,
      createdAt: new Date(now.getTime() - (1000 * 60 * 60 * 28)),
      metadata: {
        link: '/products/deals',
      },
    },
  ];
}

router.get('/', auth, async (req, res) => {
  try {
    const records = await Notification.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .lean();

    const unreadCount = records.filter((item) => !item.isRead).length;
    const notifications = [...records, ...buildPromoNotifications()]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      notifications,
      unreadCount,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Unable to load notifications' });
  }
});

router.put('/read-all', auth, async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.user.id, isRead: false },
      { $set: { isRead: true, readAt: new Date() } }
    );

    res.json({ message: 'Notifications marked as read' });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Unable to update notifications' });
  }
});

module.exports = router;
