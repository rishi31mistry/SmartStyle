const express = require('express');
const router = express.Router();
const MoodyProduct = require('../models/MoodyProduct');

// GET /api/moodyproducts?moodId=comfort-mode&isMoodyOutfit=true
router.get('/', async (req, res) => {
  try {
    const { moodId, isMoodyOutfit, outfitGender, outfitNum, outfitRole } = req.query;

    const filter = {};
    if (moodId) filter.moodId = moodId;
    if (isMoodyOutfit !== undefined) filter.isMoodyOutfit = isMoodyOutfit === 'true';
    if (outfitGender) filter.outfitGender = outfitGender;
    if (outfitNum !== undefined) filter.outfitNum = Number(outfitNum);
    if (outfitRole) filter.outfitRole = outfitRole;

    const products = await MoodyProduct.find(filter);
    res.json(products);
  } catch (err) {
    console.error('Error fetching moody products:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
