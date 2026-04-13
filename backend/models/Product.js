const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:          { type: String, required: true },
  price:         { type: Number, required: true },
  originalPrice: { type: Number },
  rating:        { type: Number, default: 0 },
  tag:           { type: String },
  category:      { type: mongoose.Schema.Types.Mixed },
  brand:         { type: String, required: true },
  sizes:         [{ type: String }],
  color:         { type: String },
  image:         { type: String },
  gender:        { type: String, enum: ['Men', 'Women', 'Footwear', 'Accessories'] },
  subGender:     { type: String },

  isMoodyOutfit: { type: Boolean, default: false },
  moodId:        { type: String,  default: null },
  moodName:      { type: String,  default: null },
  outfitNum:     { type: Number,  default: null },
  outfitRole:    { type: String,  default: null },
  outfitGender:  { type: String,  default: null },
  
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);