const Notification = require('../models/Notification');

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function buildNotificationContent(event, payload = {}) {
  const order = payload.order;

  if (event === 'signup') {
    return {
      type: 'account',
      title: 'Welcome to SmartStyle',
      message: 'Your account is ready. Explore new arrivals, wishlist picks, and curated outfits.',
      metadata: { link: '/home' },
    };
  }

  if (event === 'login') {
    return {
      type: 'account',
      title: 'New login detected',
      message: 'Your SmartStyle account was accessed successfully. If this was not you, change your password.',
      metadata: { link: '/account' },
    };
  }

  if (event === 'purchase') {
    return {
      type: 'order',
      title: 'Order placed successfully',
      message: `Your order for ${formatCurrency(order?.amount)} has been placed successfully.`,
      metadata: { link: '/account/orders', orderId: String(order?._id || '') },
    };
  }

  if (event === 'cancellation') {
    return {
      type: 'order',
      title: 'Order cancelled',
      message: 'Your order has been cancelled successfully. You can place a new order anytime from your account.',
      metadata: { link: '/account/orders', orderId: String(order?._id || '') },
    };
  }

  return {
    type: 'account',
    title: 'SmartStyle update',
    message: 'There is a new update in your account.',
    metadata: { link: '/account' },
  };
}

async function sendUserNotification({ user, event, payload = {} }) {
  const userId = user?._id || user?.id;
  if (!userId || !event) {
    return null;
  }

  const content = buildNotificationContent(event, payload);

  return Notification.create({
    userId,
    event,
    ...content,
  });
}

module.exports = {
  sendUserNotification,
};
