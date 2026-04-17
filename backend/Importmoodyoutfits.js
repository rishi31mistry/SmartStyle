require('dotenv').config();
const mongoose = require('mongoose');
const Product  = require('./models/MoodyProduct');

// ─── Outfit definitions ───────────────────────────────────────────────────────
// Mirrors exactly what MoodyOutfits.jsx expects:
//   /image/moodyoutfits/<moodId>/<gender>/outfit<N>_<role>.jpg
//
// Each outfit item becomes ONE Product document in MongoDB.
// The outfit is reconstructed on the frontend by querying:
//   GET /api/products?moodId=comfort-mode&gender=men&outfitNum=1

const MOODS = [
  {
    id: 'first-impression-fit',
    name: 'First Impression Fit',
    slots: [
      { role: 'Top',       category: 'Shirts',       sizes: ['XS','S','M','L','XL'],    basePrice: 1299 },
      { role: 'Bottom',    category: 'Trousers',      sizes: ['S','M','L','XL'],         basePrice: 1499 },
      { role: 'Footwear',  category: 'Formal Shoes',  sizes: ['7','8','9','10'],         basePrice: 2199 },
      { role: 'Accessory', category: 'Watches',       sizes: [],                         basePrice: 1999 },
    ],
  },
  {
    id: 'comfort-mode',
    name: 'Comfort Mode',
    slots: [
      { role: 'Top',       category: 'T-Shirts',      sizes: ['XS','S','M','L','XL'],   basePrice: 699  },
      { role: 'Bottom',    category: 'Trousers',       sizes: ['S','M','L','XL','XXL'],  basePrice: 799  },
      { role: 'Footwear',  category: 'Flip Flops',    sizes: ['7','8','9','10'],         basePrice: 499  },
      { role: 'Accessory', category: 'Caps & Hats',   sizes: ['S','M','L'],             basePrice: 399  },
    ],
  },
  {
    id: 'statement-fit',
    name: 'Statement Fit',
    slots: [
      { role: 'Top',       category: 'Hoodies',       sizes: ['S','M','L','XL'],        basePrice: 1299 },
      { role: 'Bottom',    category: 'Jeans',          sizes: ['S','M','L','XL'],        basePrice: 1499 },
      { role: 'Footwear',  category: 'Sneakers',       sizes: ['7','8','9','10'],        basePrice: 2499 },
      { role: 'Accessory', category: 'Sunglasses',     sizes: [],                        basePrice: 899  },
    ],
  },
  {
    id: 'quick-go',
    name: 'Quick Go',
    slots: [
      { role: 'Top',       category: 'T-Shirts',      sizes: ['XS','S','M','L','XL'],   basePrice: 599  },
      { role: 'Bottom',    category: 'Shorts',         sizes: ['S','M','L','XL'],        basePrice: 699  },
      { role: 'Footwear',  category: 'Loafers',        sizes: ['7','8','9','10'],        basePrice: 1299 },
      { role: 'Accessory', category: 'Belts',          sizes: ['S','M','L'],             basePrice: 499  },
    ],
  },
  {
    id: 'travel-ready',
    name: 'Travel Ready',
    slots: [
      { role: 'Top',       category: 'Shirts',        sizes: ['S','M','L','XL'],        basePrice: 999  },
      { role: 'Bottom',    category: 'Trousers',       sizes: ['S','M','L','XL','XXL'], basePrice: 1499 },
      { role: 'Footwear',  category: 'Sports Shoes',   sizes: ['7','8','9','10'],        basePrice: 3499 },
      { role: 'Accessory', category: 'Bags',           sizes: [],                        basePrice: 1499 },
    ],
  },
]

// Small price variation per outfit number so all 6 outfits aren't identical price
const priceVariants = [1.0, 0.9, 1.1, 0.95, 1.05, 0.85]

// Tag rotation so products look varied
const tags = ['New', 'Trending', 'Popular', 'Hot', 'Bestseller', null]

// Brand names per role
const brands = {
  Top:       ['H&M', 'Zara', 'Jack & Jones', 'Levi\'s', 'Tommy Hilfiger', 'Gap'],
  Bottom:    ['Levi\'s', 'H&M', 'Wrangler', 'Jack & Jones', 'Gap', 'U.S. Polo'],
  Footwear:  ['Nike', 'Adidas', 'Puma', 'Skechers', 'New Balance', 'Bata'],
  Accessory: ['Fossil', 'Casio', 'Titan', 'Ray-Ban', 'Wildcraft', 'Fastrack'],
}

// Colors per role
const colors = {
  Top:       ['White', 'Black', 'Navy', 'Grey', 'Blue', 'White'],
  Bottom:    ['Black', 'Blue', 'Grey', 'Brown', 'Navy', 'Black'],
  Footwear:  ['Black', 'White', 'Brown', 'Grey', 'White', 'Black'],
  Accessory: ['Black', 'Silver', 'Brown', 'Black', 'Black', 'Grey'],
}


// ─── Curated Unsplash image URLs per mood/gender/role/outfit ────────────────
// Using direct Unsplash URLs so images work without downloading
const OUTFIT_IMAGES = {
  'first-impression-fit': {
    Men: {
        Top:       ['/image/moodyoutfits/first-impression-fit/men/outfit1_top.jpg','/image/moodyoutfits/first-impression-fit/men/outfit2_top.jpg','/image/moodyoutfits/first-impression-fit/men/outfit3_top.jpg','/image/moodyoutfits/first-impression-fit/men/outfit4_top.jpg','/image/moodyoutfits/first-impression-fit/men/outfit5_top.jpg','/image/moodyoutfits/first-impression-fit/men/outfit6_top.jpg'],
        Bottom:    ['/image/moodyoutfits/first-impression-fit/men/outfit1_bottom.jpg','/image/moodyoutfits/first-impression-fit/men/outfit2_bottom.jpg','/image/moodyoutfits/first-impression-fit/men/outfit3_bottom.jpg','/image/moodyoutfits/first-impression-fit/men/outfit4_bottom.jpg','/image/moodyoutfits/first-impression-fit/men/outfit5_bottom.jpg','/image/moodyoutfits/first-impression-fit/men/outfit6_bottom.jpg'],
        Footwear:  ['/image/moodyoutfits/first-impression-fit/men/outfit1_shoes.jpg','/image/moodyoutfits/first-impression-fit/men/outfit2_shoes.jpg','/image/moodyoutfits/first-impression-fit/men/outfit3_shoes.jpg','/image/moodyoutfits/first-impression-fit/men/outfit4_shoes.jpg','/image/moodyoutfits/first-impression-fit/men/outfit5_shoes.jpg','/image/moodyoutfits/first-impression-fit/men/outfit6_shoes.jpg'],
        Accessory: ['/image/moodyoutfits/first-impression-fit/men/outfit1_acc.jpg','/image/moodyoutfits/first-impression-fit/men/outfit2_acc.jpg','/image/moodyoutfits/first-impression-fit/men/outfit3_acc.jpg','/image/moodyoutfits/first-impression-fit/men/outfit4_acc.jpg','/image/moodyoutfits/first-impression-fit/men/outfit5_acc.jpg','/image/moodyoutfits/first-impression-fit/men/outfit6_acc.jpg'],
    },
    Women: {
        Top:       ['/image/moodyoutfits/first-impression-fit/women/outfit1_top.jpg','/image/moodyoutfits/first-impression-fit/women/outfit2_top.jpg','/image/moodyoutfits/first-impression-fit/women/outfit3_top.jpg','/image/moodyoutfits/first-impression-fit/women/outfit4_top.jpg','/image/moodyoutfits/first-impression-fit/women/outfit5_top.jpg','/image/moodyoutfits/first-impression-fit/women/outfit6_top.jpg'],
        Bottom:    ['/image/moodyoutfits/first-impression-fit/women/outfit1_bottom.jpg','/image/moodyoutfits/first-impression-fit/women/outfit2_bottom.jpg','/image/moodyoutfits/first-impression-fit/women/outfit3_bottom.jpg','/image/moodyoutfits/first-impression-fit/women/outfit4_bottom.jpg','/image/moodyoutfits/first-impression-fit/women/outfit5_bottom.jpg','/image/moodyoutfits/first-impression-fit/women/outfit6_bottom.jpg'],
        Footwear:  ['/image/moodyoutfits/first-impression-fit/women/outfit1_shoes.jpg','/image/moodyoutfits/first-impression-fit/women/outfit2_shoes.jpg','/image/moodyoutfits/first-impression-fit/women/outfit3_shoes.jpg','/image/moodyoutfits/first-impression-fit/women/outfit4_shoes.jpg','/image/moodyoutfits/first-impression-fit/women/outfit5_shoes.jpg','/image/moodyoutfits/first-impression-fit/women/outfit6_shoes.jpg'],
        Accessory: ['/image/moodyoutfits/first-impression-fit/women/outfit1_acc.jpg','/image/moodyoutfits/first-impression-fit/women/outfit2_acc.jpg','/image/moodyoutfits/first-impression-fit/women/outfit3_acc.jpg','/image/moodyoutfits/first-impression-fit/women/outfit4_acc.jpg','/image/moodyoutfits/first-impression-fit/women/outfit5_acc.jpg','/image/moodyoutfits/first-impression-fit/women/outfit6_acc.jpg'],
    },
  },

  'comfort-mode': {
    Men: {
        Top:       ['/image/moodyoutfits/comfort-mode/men/outfit1_top.jpg','/image/moodyoutfits/comfort-mode/men/outfit2_top.jpg','/image/moodyoutfits/comfort-mode/men/outfit3_top.jpg','/image/moodyoutfits/comfort-mode/men/outfit4_top.jpg','/image/moodyoutfits/comfort-mode/men/outfit5_top.jpg','/image/moodyoutfits/comfort-mode/men/outfit6_top.jpg'],
        Bottom:    ['/image/moodyoutfits/comfort-mode/men/outfit1_bottom.jpg','/image/moodyoutfits/comfort-mode/men/outfit2_bottom.jpg','/image/moodyoutfits/comfort-mode/men/outfit3_bottom.jpg','/image/moodyoutfits/comfort-mode/men/outfit4_bottom.jpg','/image/moodyoutfits/comfort-mode/men/outfit5_bottom.jpg','/image/moodyoutfits/comfort-mode/men/outfit6_bottom.jpg'],
        Footwear:  ['/image/moodyoutfits/comfort-mode/men/outfit1_shoes.jpg','/image/moodyoutfits/comfort-mode/men/outfit2_shoes.jpg','/image/moodyoutfits/comfort-mode/men/outfit3_shoes.jpg','/image/moodyoutfits/comfort-mode/men/outfit4_shoes.jpg','/image/moodyoutfits/comfort-mode/men/outfit5_shoes.jpg','/image/moodyoutfits/comfort-mode/men/outfit6_shoes.jpg'],
        Accessory: ['/image/moodyoutfits/comfort-mode/men/outfit1_acc.jpg','/image/moodyoutfits/comfort-mode/men/outfit2_acc.jpg','/image/moodyoutfits/comfort-mode/men/outfit3_acc.jpg','/image/moodyoutfits/comfort-mode/men/outfit4_acc.jpg','/image/moodyoutfits/comfort-mode/men/outfit5_acc.jpg','/image/moodyoutfits/comfort-mode/men/outfit6_acc.jpg'],
    },
    Women: {
        Top:       ['/image/moodyoutfits/comfort-mode/women/outfit1_top.jpg','/image/moodyoutfits/comfort-mode/women/outfit2_top.jpg','/image/moodyoutfits/comfort-mode/women/outfit3_top.jpg','/image/moodyoutfits/comfort-mode/women/outfit4_top.jpg','/image/moodyoutfits/comfort-mode/women/outfit5_top.jpg','/image/moodyoutfits/comfort-mode/women/outfit6_top.jpg'],
        Bottom:    ['/image/moodyoutfits/comfort-mode/women/outfit1_bottom.jpg','/image/moodyoutfits/comfort-mode/women/outfit2_bottom.jpg','/image/moodyoutfits/comfort-mode/women/outfit3_bottom.jpg','/image/moodyoutfits/comfort-mode/women/outfit4_bottom.jpg','/image/moodyoutfits/comfort-mode/women/outfit5_bottom.jpg','/image/moodyoutfits/comfort-mode/women/outfit6_bottom.jpg'],
        Footwear:  ['/image/moodyoutfits/comfort-mode/women/outfit1_shoes.jpg','/image/moodyoutfits/comfort-mode/women/outfit2_shoes.jpg','/image/moodyoutfits/comfort-mode/women/outfit3_shoes.jpg','/image/moodyoutfits/comfort-mode/women/outfit4_shoes.jpg','/image/moodyoutfits/comfort-mode/women/outfit5_shoes.jpg','/image/moodyoutfits/comfort-mode/women/outfit6_shoes.jpg'],
        Accessory: ['/image/moodyoutfits/comfort-mode/women/outfit1_acc.jpg','/image/moodyoutfits/comfort-mode/women/outfit2_acc.jpg','/image/moodyoutfits/comfort-mode/women/outfit3_acc.jpg','/image/moodyoutfits/comfort-mode/women/outfit4_acc.jpg','/image/moodyoutfits/comfort-mode/women/outfit5_acc.jpg','/image/moodyoutfits/comfort-mode/women/outfit6_acc.jpg'],
    },
  },

  'statement-fit': {
    Men: {
        Top:       ['/image/moodyoutfits/statement-fit/men/outfit1_top.jpg','/image/moodyoutfits/statement-fit/men/outfit2_top.jpg','/image/moodyoutfits/statement-fit/men/outfit3_top.jpg','/image/moodyoutfits/statement-fit/men/outfit4_top.jpg','/image/moodyoutfits/statement-fit/men/outfit5_top.jpg','/image/moodyoutfits/statement-fit/men/outfit6_top.jpg'],
        Bottom:    ['/image/moodyoutfits/statement-fit/men/outfit1_bottom.jpg','/image/moodyoutfits/statement-fit/men/outfit2_bottom.jpg','/image/moodyoutfits/statement-fit/men/outfit3_bottom.jpg','/image/moodyoutfits/statement-fit/men/outfit4_bottom.jpg','/image/moodyoutfits/statement-fit/men/outfit5_bottom.jpg','/image/moodyoutfits/statement-fit/men/outfit6_bottom.jpg'],
        Footwear:  ['/image/moodyoutfits/statement-fit/men/outfit1_shoes.jpg','/image/moodyoutfits/statement-fit/men/outfit2_shoes.jpg','/image/moodyoutfits/statement-fit/men/outfit3_shoes.jpg','/image/moodyoutfits/statement-fit/men/outfit4_shoes.jpg','/image/moodyoutfits/statement-fit/men/outfit5_shoes.jpg','/image/moodyoutfits/statement-fit/men/outfit6_shoes.jpg'],
        Accessory: ['/image/moodyoutfits/statement-fit/men/outfit1_acc.jpg','/image/moodyoutfits/statement-fit/men/outfit2_acc.jpg','/image/moodyoutfits/statement-fit/men/outfit3_acc.jpg','/image/moodyoutfits/statement-fit/men/outfit4_acc.jpg','/image/moodyoutfits/statement-fit/men/outfit5_acc.jpg','/image/moodyoutfits/statement-fit/men/outfit6_acc.jpg'],
    },
    Women: {
        Top:       ['/image/moodyoutfits/statement-fit/women/outfit1_top.jpg','/image/moodyoutfits/statement-fit/women/outfit2_top.jpg','/image/moodyoutfits/statement-fit/women/outfit3_top.jpg','/image/moodyoutfits/statement-fit/women/outfit4_top.jpg','/image/moodyoutfits/statement-fit/women/outfit5_top.jpg','/image/moodyoutfits/statement-fit/women/outfit6_top.jpg'],
        Bottom:    ['/image/moodyoutfits/statement-fit/women/outfit1_bottom.jpg','/image/moodyoutfits/statement-fit/women/outfit2_bottom.jpg','/image/moodyoutfits/statement-fit/women/outfit3_bottom.jpg','/image/moodyoutfits/statement-fit/women/outfit4_bottom.jpg','/image/moodyoutfits/statement-fit/women/outfit5_bottom.jpg','/image/moodyoutfits/statement-fit/women/outfit6_bottom.jpg'],
        Footwear:  ['/image/moodyoutfits/statement-fit/women/outfit1_shoes.jpg','/image/moodyoutfits/statement-fit/women/outfit2_shoes.jpg','/image/moodyoutfits/statement-fit/women/outfit3_shoes.jpg','/image/moodyoutfits/statement-fit/women/outfit4_shoes.jpg','/image/moodyoutfits/statement-fit/women/outfit5_shoes.jpg','/image/moodyoutfits/statement-fit/women/outfit6_shoes.jpg'],
        Accessory: ['/image/moodyoutfits/statement-fit/women/outfit1_acc.jpg','/image/moodyoutfits/statement-fit/women/outfit2_acc.jpg','/image/moodyoutfits/statement-fit/women/outfit3_acc.jpg','/image/moodyoutfits/statement-fit/women/outfit4_acc.jpg','/image/moodyoutfits/statement-fit/women/outfit5_acc.jpg','/image/moodyoutfits/statement-fit/women/outfit6_acc.jpg'],
    },
  },

  'quick-go': {
    Men: {
        Top:       ['/image/moodyoutfits/quick-go/men/outfit1_top.jpg','/image/moodyoutfits/quick-go/men/outfit2_top.jpg','/image/moodyoutfits/quick-go/men/outfit3_top.jpg','/image/moodyoutfits/quick-go/men/outfit4_top.jpg','/image/moodyoutfits/quick-go/men/outfit5_top.jpg','/image/moodyoutfits/quick-go/men/outfit6_top.jpg'],
        Bottom:    ['/image/moodyoutfits/quick-go/men/outfit1_bottom.jpg','/image/moodyoutfits/quick-go/men/outfit2_bottom.jpg','/image/moodyoutfits/quick-go/men/outfit3_bottom.jpg','/image/moodyoutfits/quick-go/men/outfit4_bottom.jpg','/image/moodyoutfits/quick-go/men/outfit5_bottom.jpg','/image/moodyoutfits/quick-go/men/outfit6_bottom.jpg'],
        Footwear:  ['/image/moodyoutfits/quick-go/men/outfit1_shoes.jpg','/image/moodyoutfits/quick-go/men/outfit2_shoes.jpg','/image/moodyoutfits/quick-go/men/outfit3_shoes.jpg','/image/moodyoutfits/quick-go/men/outfit4_shoes.jpg','/image/moodyoutfits/quick-go/men/outfit5_shoes.jpg','/image/moodyoutfits/quick-go/men/outfit6_shoes.jpg'],
        Accessory: ['/image/moodyoutfits/quick-go/men/outfit1_acc.jpg','/image/moodyoutfits/quick-go/men/outfit2_acc.jpg','/image/moodyoutfits/quick-go/men/outfit3_acc.jpg','/image/moodyoutfits/quick-go/men/outfit4_acc.jpg','/image/moodyoutfits/quick-go/men/outfit5_acc.jpg','/image/moodyoutfits/quick-go/men/outfit6_acc.jpg'],
    },
    Women: {
        Top:       ['/image/moodyoutfits/quick-go/women/outfit1_top.jpg','/image/moodyoutfits/quick-go/women/outfit2_top.jpg','/image/moodyoutfits/quick-go/women/outfit3_top.jpg','/image/moodyoutfits/quick-go/women/outfit4_top.jpg','/image/moodyoutfits/quick-go/women/outfit5_top.jpg','/image/moodyoutfits/quick-go/women/outfit6_top.jpg'],
        Bottom:    ['/image/moodyoutfits/quick-go/women/outfit1_bottom.jpg','/image/moodyoutfits/quick-go/women/outfit2_bottom.jpg','/image/moodyoutfits/quick-go/women/outfit3_bottom.jpg','/image/moodyoutfits/quick-go/women/outfit4_bottom.jpg','/image/moodyoutfits/quick-go/women/outfit5_bottom.jpg','/image/moodyoutfits/quick-go/women/outfit6_bottom.jpg'],
        Footwear:  ['/image/moodyoutfits/quick-go/women/outfit1_shoes.jpg','/image/moodyoutfits/quick-go/women/outfit2_shoes.jpg','/image/moodyoutfits/quick-go/women/outfit3_shoes.jpg','/image/moodyoutfits/quick-go/women/outfit4_shoes.jpg','/image/moodyoutfits/quick-go/women/outfit5_shoes.jpg','/image/moodyoutfits/quick-go/women/outfit6_shoes.jpg'],
        Accessory: ['/image/moodyoutfits/quick-go/women/outfit1_acc.jpg','/image/moodyoutfits/quick-go/women/outfit2_acc.jpg','/image/moodyoutfits/quick-go/women/outfit3_acc.jpg','/image/moodyoutfits/quick-go/women/outfit4_acc.jpg','/image/moodyoutfits/quick-go/women/outfit5_acc.jpg','/image/moodyoutfits/quick-go/women/outfit6_acc.jpg'],
    },
  },

  'travel-ready': {
    Men: {
        Top:       ['/image/moodyoutfits/travel-ready/men/outfit1_top.jpg','/image/moodyoutfits/travel-ready/men/outfit2_top.jpg','/image/moodyoutfits/travel-ready/men/outfit3_top.jpg','/image/moodyoutfits/travel-ready/men/outfit4_top.jpg','/image/moodyoutfits/travel-ready/men/outfit5_top.jpg','/image/moodyoutfits/travel-ready/men/outfit6_top.jpg'],
        Bottom:    ['/image/moodyoutfits/travel-ready/men/outfit1_bottom.jpg','/image/moodyoutfits/travel-ready/men/outfit2_bottom.jpg','/image/moodyoutfits/travel-ready/men/outfit3_bottom.jpg','/image/moodyoutfits/travel-ready/men/outfit4_bottom.jpg','/image/moodyoutfits/travel-ready/men/outfit5_bottom.jpg','/image/moodyoutfits/travel-ready/men/outfit6_bottom.jpg'],
        Footwear:  ['/image/moodyoutfits/travel-ready/men/outfit1_shoes.jpg','/image/moodyoutfits/travel-ready/men/outfit2_shoes.jpg','/image/moodyoutfits/travel-ready/men/outfit3_shoes.jpg','/image/moodyoutfits/travel-ready/men/outfit4_shoes.jpg','/image/moodyoutfits/travel-ready/men/outfit5_shoes.jpg','/image/moodyoutfits/travel-ready/men/outfit6_shoes.jpg'],
        Accessory: ['/image/moodyoutfits/travel-ready/men/outfit1_acc.jpg','/image/moodyoutfits/travel-ready/men/outfit2_acc.jpg','/image/moodyoutfits/travel-ready/men/outfit3_acc.jpg','/image/moodyoutfits/travel-ready/men/outfit4_acc.jpg','/image/moodyoutfits/travel-ready/men/outfit5_acc.jpg','/image/moodyoutfits/travel-ready/men/outfit6_acc.jpg'],
    },
    Women: {
        Top:       ['/image/moodyoutfits/travel-ready/women/outfit1_top.jpg','/image/moodyoutfits/travel-ready/women/outfit2_top.jpg','/image/moodyoutfits/travel-ready/women/outfit3_top.jpg','/image/moodyoutfits/travel-ready/women/outfit4_top.jpg','/image/moodyoutfits/travel-ready/women/outfit5_top.jpg','/image/moodyoutfits/travel-ready/women/outfit6_top.jpg'],
        Bottom:    ['/image/moodyoutfits/travel-ready/women/outfit1_bottom.jpg','/image/moodyoutfits/travel-ready/women/outfit2_bottom.jpg','/image/moodyoutfits/travel-ready/women/outfit3_bottom.jpg','/image/moodyoutfits/travel-ready/women/outfit4_bottom.jpg','/image/moodyoutfits/travel-ready/women/outfit5_bottom.jpg','/image/moodyoutfits/travel-ready/women/outfit6_bottom.jpg'],
        Footwear:  ['/image/moodyoutfits/travel-ready/women/outfit1_shoes.jpg','/image/moodyoutfits/travel-ready/women/outfit2_shoes.jpg','/image/moodyoutfits/travel-ready/women/outfit3_shoes.jpg','/image/moodyoutfits/travel-ready/women/outfit4_shoes.jpg','/image/moodyoutfits/travel-ready/women/outfit5_shoes.jpg','/image/moodyoutfits/travel-ready/women/outfit6_shoes.jpg'],
        Accessory: ['/image/moodyoutfits/travel-ready/women/outfit1_acc.jpg','/image/moodyoutfits/travel-ready/women/outfit2_acc.jpg','/image/moodyoutfits/travel-ready/women/outfit3_acc.jpg','/image/moodyoutfits/travel-ready/women/outfit4_acc.jpg','/image/moodyoutfits/travel-ready/women/outfit5_acc.jpg','/image/moodyoutfits/travel-ready/women/outfit6_acc.jpg'],
    },
  },
}
function getOutfitImage(moodId, gender, outfitNum, role) {
  const idx = outfitNum - 1
  try {
    return OUTFIT_IMAGES[moodId][gender][role][idx]
  } catch {
    return `https://placehold.co/400x500?text=${role}`
  }
}

// ─── Build all product documents ─────────────────────────────────────────────
function buildProducts() {
  const products = []

  for (const mood of MOODS) {
    for (const gender of ['Men', 'Women']) {

      for (let outfitNum = 1; outfitNum <= 6; outfitNum++) {
        const variantIdx = outfitNum - 1

        for (const slot of mood.slots) {
          const price = Math.round(slot.basePrice * priceVariants[variantIdx])
          const originalPrice = Math.round(price * 1.4) // ~30% discount shown

          // Footwear gender mapping: stored as 'Footwear' gender in your DB
          // Accessories stored as 'Accessories' gender in your DB
          let dbGender = gender
          if (slot.role === 'Footwear')  dbGender = 'Footwear'
          if (slot.role === 'Accessory') dbGender = 'Accessories'

          products.push({
            name: `${mood.name} — ${slot.role} (${gender} #${outfitNum})`,
            price,
            originalPrice,
            rating: parseFloat((4.0 + Math.random() * 0.9).toFixed(1)),
            tag: tags[variantIdx],
            category: slot.category,
            brand: brands[slot.role][variantIdx],
            sizes: slot.sizes,
            color: colors[slot.role][variantIdx],
            image: getOutfitImage(mood.id, gender, outfitNum, slot.role),
            gender: dbGender,

            // ── Moody outfit specific fields ──
            isMoodyOutfit: true,
            moodId: mood.id,
            moodName: mood.name,
            outfitNum,
            outfitRole: slot.role,       // 'Top' | 'Bottom' | 'Footwear' | 'Accessory'
            outfitGender: gender,        // 'Men' | 'Women'  (original gender, for filtering)
          })
        }
      }
    }
  }

  return products
}

// ─── Run seeder ───────────────────────────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected')

    // Remove old moody outfit products first (clean re-seed)
    const deleted = await Product.deleteMany({ isMoodyOutfit: true })
    console.log(`Removed ${deleted.deletedCount} old moody outfit products`)

    const products = buildProducts()
    await Product.insertMany(products)

    console.log(`✅ Inserted ${products.length} moody outfit products`)
    console.log(`   5 moods × 2 genders × 6 outfits × 4 items = ${products.length} total`)
    console.log('\nBreakdown:')
    for (const mood of MOODS) {
      console.log(`  ${mood.name}: ${2 * 6 * 4} products`)
    }

    console.log('\nQuery example to get one outfit:')
    console.log('  GET /api/products?moodId=comfort-mode&outfitGender=Men&outfitNum=1')

    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })