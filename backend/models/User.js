/* eslint-env node */
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
  wishlist: [wishlistItemSchema], // embedded array in user document
  address:  { type: String },
  cart:     [cartItemSchema],   
  phone:    { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);