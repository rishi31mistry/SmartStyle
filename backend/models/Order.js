const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  size: { type: String, default: '' },
  quantity: { type: Number, required: true, min: 1 },
  category: { type: mongoose.Schema.Types.Mixed, default: null },
  brand: { type: String, default: '' },
}, { _id: false });

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  items: { type: [orderItemSchema], default: [] },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  paymentMethod: { type: String, enum: ['cod', 'razorpay'], required: true },
  status: { type: String, enum: ['created', 'paid', 'cod_pending', 'failed', 'cancelled'], default: 'created', index: true },
  address: {
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    pincode: { type: String, default: '' },
  },
  razorpayOrderId: { type: String, default: '' },
  razorpayPaymentId: { type: String, default: '' },
  razorpaySignature: { type: String, default: '' },
  receipt: { type: String, default: '' },
  cancelledAt: { type: Date, default: null },
  cancelReason: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
