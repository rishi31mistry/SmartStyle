const express = require('express');
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { createRazorpayOrder, getRazorpayConfig, verifyPaymentSignature } = require('../utils/razorpay');
const { sendUserNotification } = require('../utils/notifications');

const router = express.Router();

function buildOrderLookup(orderId, userId) {
  return {
    userId,
    $or: [
      { _id: orderId },
      { razorpayOrderId: orderId },
      { receipt: orderId },
    ],
  };
}

function normalizeCheckoutItems(items) {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => ({
      productId: String(item.productId || item.id || item._id || '').trim(),
      name: String(item.name || '').trim(),
      price: Number(item.price || 0),
      image: String(item.image || '').trim(),
      size: String(item.size || '').trim(),
      quantity: Math.max(1, Number(item.quantity || 1)),
    }))
    .filter((item) => item.productId && item.name && item.price > 0);
}

async function hydrateOrderItems(items) {
  const productIds = [...new Set(items.map((item) => item.productId))];
  const products = await Product.find({ _id: { $in: productIds } })
    .select('_id category brand')
    .lean();

  const productMap = new Map(products.map((product) => [String(product._id), product]));

  return items.map((item) => {
    const product = productMap.get(item.productId);

    return {
      ...item,
      category: product?.category ?? null,
      brand: product?.brand || '',
    };
  });
}

function buildAddressSnapshot(user) {
  return {
    street: user.addressStreet || '',
    city: user.addressCity || '',
    state: user.addressState || '',
    pincode: user.addressPincode || '',
  };
}

async function clearPurchasedCartItems(userId, purchasedItems) {
  const user = await User.findById(userId);
  if (!user) return;

  const remainingCart = [...user.cart];

  for (const purchasedItem of purchasedItems) {
    const index = remainingCart.findIndex((cartItem) =>
      cartItem.productId === purchasedItem.productId &&
      String(cartItem.size || '').trim().toUpperCase() === String(purchasedItem.size || '').trim().toUpperCase()
    );

    if (index >= 0) {
      remainingCart.splice(index, 1);
    }
  }

  user.cart = remainingCart;
  await user.save();
}

router.post('/create-order', auth, async (req, res) => {
  try {
    const { keyId, configured } = getRazorpayConfig();
    if (!configured) {
      return res.status(500).json({ message: 'Razorpay is not configured on the server' });
    }

    const items = normalizeCheckoutItems(req.body.items);
    if (items.length === 0) {
      return res.status(400).json({ message: 'No valid checkout items were provided' });
    }

    const user = await User.findById(req.user.id).select('name email phone addressStreet addressCity addressState addressPincode');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hydratedItems = await hydrateOrderItems(items);
    const amount = hydratedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const receipt = `ss-${Date.now()}`;

    const razorpayOrder = await createRazorpayOrder({
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt,
      notes: {
        userId: String(req.user.id),
        source: 'smartstyle',
      },
    });

    const order = await Order.create({
      userId: req.user.id,
      items: hydratedItems,
      amount,
      currency: 'INR',
      paymentMethod: 'razorpay',
      status: 'created',
      address: buildAddressSnapshot(user),
      razorpayOrderId: razorpayOrder.id,
      receipt,
    });

    res.json({
      key: keyId,
      internalOrderId: String(order._id),
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      customer: {
        name: user.name || '',
        email: user.email || '',
        contact: user.phone || '',
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Unable to create payment order' });
  }
});

router.post('/verify', auth, async (req, res) => {
  try {
    const {
      internalOrderId,
      razorpay_payment_id: razorpayPaymentId,
      razorpay_order_id: razorpayOrderId,
      razorpay_signature: razorpaySignature,
    } = req.body;

    if (!internalOrderId || !razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
      return res.status(400).json({ message: 'Missing payment verification fields' });
    }

    const order = await Order.findOne({ _id: internalOrderId, userId: req.user.id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.razorpayOrderId !== razorpayOrderId) {
      return res.status(400).json({ message: 'Order ID mismatch' });
    }

    const isValid = verifyPaymentSignature({
      orderId: order.razorpayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature,
    });

    if (!isValid) {
      order.status = 'failed';
      await order.save();
      return res.status(400).json({ message: 'Invalid Razorpay signature' });
    }

    order.status = 'paid';
    order.razorpayPaymentId = razorpayPaymentId;
    order.razorpaySignature = razorpaySignature;
    await order.save();
    await clearPurchasedCartItems(req.user.id, order.items);

    const user = await User.findById(req.user.id).select('name email phone');
    if (user) {
      sendUserNotification({ user, event: 'purchase', payload: { order } }).catch((notifyErr) => {
        console.error('Purchase notification failed:', notifyErr.message);
      });
    }

    res.json({
      message: 'Payment verified successfully',
      orderId: String(order._id),
      paymentId: razorpayPaymentId,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Unable to verify payment' });
  }
});

router.post('/cod', auth, async (req, res) => {
  try {
    const items = normalizeCheckoutItems(req.body.items);
    if (items.length === 0) {
      return res.status(400).json({ message: 'No valid checkout items were provided' });
    }

    const user = await User.findById(req.user.id).select('addressStreet addressCity addressState addressPincode');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hydratedItems = await hydrateOrderItems(items);
    const amount = hydratedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const order = await Order.create({
      userId: req.user.id,
      items: hydratedItems,
      amount,
      currency: 'INR',
      paymentMethod: 'cod',
      status: 'cod_pending',
      address: buildAddressSnapshot(user),
      receipt: `cod-${Date.now()}`,
    });

    await clearPurchasedCartItems(req.user.id, hydratedItems);

    const notificationUser = await User.findById(req.user.id).select('name email phone');
    if (notificationUser) {
      sendUserNotification({ user: notificationUser, event: 'purchase', payload: { order } }).catch((notifyErr) => {
        console.error('COD purchase notification failed:', notifyErr.message);
      });
    }

    res.json({
      message: 'Cash on delivery order placed',
      orderId: String(order._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Unable to place COD order' });
  }
});

router.put('/orders/:orderId/cancel', auth, async (req, res) => {
  try {
    const orderId = String(req.params.orderId || '').trim();
    if (!orderId) {
      return res.status(400).json({ message: 'Order ID is required' });
    }

    const order = await Order.findOne(buildOrderLookup(orderId, req.user.id));
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (!['paid', 'cod_pending'].includes(order.status)) {
      return res.status(400).json({ message: 'This order cannot be cancelled' });
    }

    order.status = 'cancelled';
    order.cancelledAt = new Date();
    order.cancelReason = 'Cancelled by user';
    await order.save();

    const user = await User.findById(req.user.id).select('name email phone');
    if (user) {
      sendUserNotification({ user, event: 'cancellation', payload: { order } }).catch((notifyErr) => {
        console.error('Cancellation notification failed:', notifyErr.message);
      });
    }

    res.json({
      message: 'Order cancelled successfully',
      order,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Unable to cancel order' });
  }
});

module.exports = router;
