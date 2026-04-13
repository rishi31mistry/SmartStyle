const mongoose = require('mongoose');

const moodyProductSchema = new mongoose.Schema({
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
  gender:        { type: String },

  // 🔥 Moody specific fields
  isMoodyOutfit: { type: Boolean, default: true },
  moodId:        { type: String, required: true },
  moodName:      { type: String },
  outfitNum:     { type: Number, required: true },
  outfitRole:    { type: String },
  outfitGender:  { type: String },

}, { timestamps: true });

module.exports = mongoose.model(
  'MoodyProduct',
  moodyProductSchema,
  'moodyproducts' // ✅ separate collection
);