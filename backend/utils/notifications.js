const nodemailer = require('nodemailer');
const Notification = require('../models/Notification');

let cachedTransporter = null;

function getSmtpConfig() {
  return {
    host: String(process.env.SMTP_HOST || '').trim(),
    port: Number(process.env.SMTP_PORT || 0),
    user: String(process.env.SMTP_USER || '').trim(),
    pass: String(process.env.SMTP_PASS || '').trim(),
    from: String(process.env.SMTP_FROM || process.env.SMTP_USER || '').trim(),
  };
}

function isEmailConfigured() {
  const config = getSmtpConfig();
  return Boolean(config.host && config.port && config.user && config.pass && config.from);
}

function getTransporter() {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const config = getSmtpConfig();
  cachedTransporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  return cachedTransporter;
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function formatOrderDate(value) {
  if (!value) return '';

  return new Date(value).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function getPaymentMethodLabel(order) {
  if (order?.paymentMethod === 'cod') return 'Cash on Delivery';
  if (order?.paymentMethod === 'razorpay') return 'Razorpay';
  return 'Online Payment';
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

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildEmailContent({ user, event, payload = {} }) {
  const name = user?.name || 'there';
  const order = payload.order;
  const orderId = String(order?._id || order?.receipt || '').trim();
  const orderAmount = formatCurrency(order?.amount);
  const paymentMethod = getPaymentMethodLabel(order);
  const createdAt = formatOrderDate(order?.createdAt);

  if (event === 'signup') {
    return {
      subject: 'Welcome to SmartStyle',
      text: `Hi ${name}, your SmartStyle account is ready.`,
      html: `<p>Hi ${escapeHtml(name)},</p><p>Your SmartStyle account is ready.</p>`,
    };
  }

  if (event === 'login') {
    return {
      subject: 'SmartStyle login alert',
      text: `Hi ${name}, your SmartStyle account was accessed successfully.`,
      html: `<p>Hi ${escapeHtml(name)},</p><p>Your SmartStyle account was accessed successfully.</p>`,
    };
  }

  if (event === 'purchase') {
    return {
      subject: `SmartStyle order confirmed${orderId ? ` - ${orderId}` : ''}`,
      text: [
        `Hi ${name},`,
        `Your order has been placed successfully.`,
        orderId ? `Order ID: ${orderId}` : '',
        `Amount: ${orderAmount}`,
        `Payment Method: ${paymentMethod}`,
        createdAt ? `Date: ${createdAt}` : '',
      ].filter(Boolean).join('\n'),
      html: [
        `<p>Hi ${escapeHtml(name)},</p>`,
        `<p>Your order has been placed successfully.</p>`,
        `<p><strong>Amount:</strong> ${escapeHtml(orderAmount)}<br/>`,
        `<strong>Payment Method:</strong> ${escapeHtml(paymentMethod)}${orderId ? `<br/><strong>Order ID:</strong> ${escapeHtml(orderId)}` : ''}${createdAt ? `<br/><strong>Date:</strong> ${escapeHtml(createdAt)}` : ''}</p>`,
        `<p>You can track this order from your SmartStyle account.</p>`,
      ].join(''),
    };
  }

  if (event === 'cancellation') {
    return {
      subject: `SmartStyle order cancelled${orderId ? ` - ${orderId}` : ''}`,
      text: [
        `Hi ${name},`,
        `Your order has been cancelled successfully.`,
        orderId ? `Order ID: ${orderId}` : '',
      ].filter(Boolean).join('\n'),
      html: [
        `<p>Hi ${escapeHtml(name)},</p>`,
        `<p>Your order has been cancelled successfully.</p>`,
        orderId ? `<p><strong>Order ID:</strong> ${escapeHtml(orderId)}</p>` : '',
      ].join(''),
    };
  }

  return {
    subject: 'SmartStyle update',
    text: `Hi ${name}, there is a new update in your account.`,
    html: `<p>Hi ${escapeHtml(name)},</p><p>There is a new update in your account.</p>`,
  };
}

async function sendEmailNotification({ user, event, payload = {} }) {
  const email = String(user?.email || '').trim();
  if (!email || !isEmailConfigured()) {
    return null;
  }

  const transporter = getTransporter();
  const config = getSmtpConfig();
  const content = buildEmailContent({ user, event, payload });

  return transporter.sendMail({
    from: config.from,
    to: email,
    subject: content.subject,
    text: content.text,
    html: content.html,
  });
}

async function sendUserNotification({ user, event, payload = {} }) {
  const userId = user?._id || user?.id;
  if (!userId || !event) {
    return null;
  }

  const content = buildNotificationContent(event, payload);

  const notification = await Notification.create({
    userId,
    event,
    ...content,
  });

  try {
    await sendEmailNotification({ user, event, payload });
  } catch (err) {
    console.error('Email notification failed:', err.message);
  }

  return notification;
}

module.exports = {
  sendUserNotification,
};
