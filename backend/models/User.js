const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name:      { type: String, required: true },
  price:     { type: Number, required: true },
  image:     { type: String }
});
const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name:      { type: String, required: true },
  price:     { type: Number, required: true },
  image:     { type: String },
  size:      { type: String },
  quantity:  { type: Number, default: 1 }
});
const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['user', 'admin'], default: 'user' },
  isBlocked:{ type: Boolean, default: false },
  wishlist: [wishlistItemSchema], // embedded array in user document
  address:  { type: String },
  addressStreet: { type: String },
  addressCity:   { type: String },
  addressState:  { type: String },
  addressPincode:{ type: String },
  paymentCardName: { type: String },
  paymentCardLast4: { type: String },
  paymentCardExpiry: { type: String },
  paymentUpiId: { type: String },
  profileImage: { type: String },
  securityTwoFactor: { type: Boolean, default: false },
  securityLoginAlerts: { type: Boolean, default: true },
  securitySessionTimeout: { type: Number, default: 30 },
  cart:     [cartItemSchema],   
  phone:    { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
