const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Known values from your data
const GENDERS = ['men', 'women', 'footwear', 'accessories'];
const GENDER_MAP = {
  'men': 'Men',
  'women': 'Women',
  'footwear': 'Footwear',
  'accessories': 'Accessories'
};

const CATEGORIES = [
  'hoodies', 'trousers', 'ethnic wear', 't-shirts', 'suits', 'shirts',
  'jackets', 'kurtas', 'sportswear', 'shorts', 'jeans', 'skirts',
  'dresses', 'kurtis', 'sarees', 'lehengas', 'tops', 'plazzos',
  'sneakers', 'heels', 'boots', 'sandals', 'loafers', 'flip flops',
  'wedges', 'flats', 'sports shoes', 'derby shoes', 'formal shoes',
  'mules', 'pumps', 'stilettos', 'ballerinas', 'kolhapuri', 'juttis',
  'slip-ons', 'watches', 'wallets', 'belts', 'sunglasses', 'bags',
  'handbags', 'earrings', 'necklaces', 'bracelets', 'rings', 'clutches',
  'bangles', 'jewellery', 'perfumes', 'trimmer', 'keychains', 'ties',
  'cufflinks', 'caps', 'hats','hair accessories',
  'bags & backpacks', 'scarves & stoles', 'bangles ','Bracelets',
  'oversized', 'cargo', 'blazer', 'polo', 'denim', 'linen', 'jogger',
  'kurta', 'track', 'printed', 'formal', 'casual', 'sport',
];

const BRANDS = [
  'nike', 'adidas', 'puma', 'h&m', 'zara', 'levi\'s', 'levis',
  'tommy hilfiger', 'jack & jones', 'gap', 'u.s. polo', 'us polo',
  'wrangler', 'woodland', 'new balance', 'skechers', 'asics',
  'under armour', 'bata', 'lee cooper', 'aldo', 'inc.5', 'rocia',
  'clarks', 'hush puppies', 'fabindia', 'biba', 'aurelia', 'libas',
  'nykaa fashion', 'vero moda', 'shein', 'only', 'mango', 'w',
  'non brand'
];

const COLORS = [
  'black', 'white', 'blue', 'red', 'grey', 'gray', 'brown', 'navy',
  'pink', 'yellow', 'orange', 'purple', 'green', 'beige', 'gold',
  'silver', 'tan', 'nude', 'olive', 'camel', 'cream', 'maroon'
];

const TAGS = ['new', 'sale', 'trending', 'hot', 'popular', 'bestseller'];

const FOOTWEAR_TERMS = [
  'sneaker', 'sneakers', 'heel', 'heels', 'boot', 'boots', 'sandal', 'sandals',
  'loafer', 'loafers', 'flip flop', 'flip flops', 'wedge', 'wedges', 'flat', 'flats',
  'sports shoe', 'sports shoes', 'derby shoe', 'derby shoes', 'formal shoe', 'formal shoes',
  'mule', 'mules', 'pump', 'pumps', 'stiletto', 'stilettos', 'ballerina', 'ballerinas',
  'kolhapuri', 'jutti', 'juttis', 'slip-on', 'slip-ons', 'slip on', 'shoe', 'shoes'
];

const ACCESSORY_TERMS = [
  'watch', 'watches', 'wallet', 'wallets', 'belt', 'belts', 'sunglass', 'sunglasses',
  'bag', 'bags', 'handbag', 'handbags', 'earring', 'earrings', 'necklace', 'necklaces',
  'bracelet', 'bracelets', 'ring', 'rings', 'clutch', 'clutches', 'bangle', 'bangles',
  'jewellery', 'perfume', 'perfumes', 'trimmer', 'trimmers', 'keychain', 'keychains',
  'tie', 'ties', 'cufflink', 'cufflinks', 'cap', 'caps', 'hat', 'hats', 'Scarves & Stoles',
  'stole', 'stoles', 'hair accessory', 'hair accessories', 'backpack', 'backpacks'
];

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildLooseRegex(term) {
  const trimmed = term.toLowerCase().trim();
  if (!trimmed) return '';
  const normalized = trimmed.replace(/[^a-z0-9]+/g, ' ').trim();
  if (!normalized) return escapeRegex(trimmed);
  const parts = normalized.split(/\s+/).map(escapeRegex);
  const sep = "[\\s&'\\-\\.]*";
  return parts.join(sep);
}

function buildTokenRegex(token) {
  const base = buildLooseRegex(token);
  if (!base) return '';
  if (token.length <= 3) return base;
  const lower = token.toLowerCase().trim();
  if (lower.endsWith('s') && lower.length > 3) {
    const singular = buildLooseRegex(lower.slice(0, -1));
    return `(?:${base}|${singular})`;
  }
  return `${base}(?:es|s)?`;
}

function inferDepartment(parsed, tokens) {
  const phrases = [];
  for (let i = 0; i < tokens.length; i++) {
    phrases.push(tokens[i]);
    if (i < tokens.length - 1) phrases.push(`${tokens[i]} ${tokens[i + 1]}`);
  }

  const matchesAny = (terms) => phrases.some((phrase) => terms.includes(phrase));
  const categoryText = String(parsed.detectedCategory || '').toLowerCase();

  if (categoryText && FOOTWEAR_TERMS.includes(categoryText)) return 'Footwear';
  if (categoryText && ACCESSORY_TERMS.includes(categoryText)) return 'Accessories';
  if (matchesAny(FOOTWEAR_TERMS)) return 'Footwear';
  if (matchesAny(ACCESSORY_TERMS)) return 'Accessories';
  return null;
}

function parseSearchQuery(query) {
  const lower = query.toLowerCase().trim();
  const words = lower.split(/\s+/);

  let detectedGender = null;
  let detectedCategory = null;
  let detectedBrand = null;
  let detectedColor = null;
  let detectedTag = null;
  const remainingWords = [];

  let usedIndices = new Set();

  // Try 3-word phrases
  for (let i = 0; i <= words.length - 3; i++) {
    const phrase = words.slice(i, i + 3).join(' ');
    if (!detectedBrand && BRANDS.includes(phrase)) {
      detectedBrand = phrase;
      usedIndices.add(i); usedIndices.add(i+1); usedIndices.add(i+2);
    }
    if (!detectedCategory && CATEGORIES.includes(phrase)) {
      detectedCategory = phrase;
      usedIndices.add(i); usedIndices.add(i+1); usedIndices.add(i+2);
    }
  }

  // Try 2-word phrases
  for (let i = 0; i <= words.length - 2; i++) {
    if (usedIndices.has(i)) continue;
    const phrase = words.slice(i, i + 2).join(' ');
    if (!detectedBrand && BRANDS.includes(phrase)) {
      detectedBrand = phrase;
      usedIndices.add(i); usedIndices.add(i+1);
    } else if (!detectedCategory && CATEGORIES.includes(phrase)) {
      detectedCategory = phrase;
      usedIndices.add(i); usedIndices.add(i+1);
    }
  }

  // Single words
  words.forEach((word, i) => {
    if (usedIndices.has(i)) return;
    if (!detectedGender && GENDERS.includes(word)) {
      detectedGender = GENDER_MAP[word];
      usedIndices.add(i);
    } else if (!detectedBrand && BRANDS.includes(word)) {
      detectedBrand = word;
      usedIndices.add(i);
    } else if (!detectedColor && COLORS.includes(word)) {
      detectedColor = word;
      usedIndices.add(i);
    } else if (!detectedTag && TAGS.includes(word)) {
      detectedTag = word;
      usedIndices.add(i);
    } else if (!detectedCategory && CATEGORIES.includes(word)) {
      detectedCategory = word;
      usedIndices.add(i);
    }
  });

  // Remaining words not matched
  words.forEach((word, i) => {
    if (!usedIndices.has(i)) {
      remainingWords.push(word);
    }
  });

  return { detectedGender, detectedCategory, detectedBrand, detectedColor, detectedTag, remainingWords };
}

function normalizeNumber(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function sortProducts(sort) {
  if (sort === 'price-low') return { price: 1 };
  if (sort === 'price-high') return { price: -1 };
  if (sort === 'popular') return { rating: -1 };
  if (sort === 'newest') return { createdAt: -1 };
  return {};
}

async function getAdminFilterOptions({ gender } = {}) {
  const optionFilter = {};

  if (gender) {
    optionFilter.gender = { $regex: `^${gender}$`, $options: 'i' };
  }

  const rawProducts = await Product.find(optionFilter, 'brand category tag').lean();
  const brands = new Set();
  const categories = new Set();
  const tags = new Set();

  rawProducts.forEach((product) => {
    if (product.brand) brands.add(String(product.brand).trim());
    if (product.tag) tags.add(String(product.tag).trim());

    const categoryValues = Array.isArray(product.category)
      ? product.category
      : [product.category];

    categoryValues
      .filter(Boolean)
      .forEach((value) => categories.add(String(value).trim()));
  });

  return {
    brands: [...brands].sort((a, b) => a.localeCompare(b)),
    categories: [...categories].sort((a, b) => a.localeCompare(b)),
    tags: [...tags].sort((a, b) => a.localeCompare(b)),
  };
}

router.get('/', async (req, res) => {
  try {
    const {
      gender, category, brand, size,
      color, minPrice, maxPrice,
      tag, sort, limit, subGender, search, page, includeMeta,
      isMoodyOutfit, moodId, outfitGender, outfitNum
    } = req.query;

    let filter = {};

    // Direct filters from query params
    if (brand)     filter.brand = { $regex: `^${brand}$`, $options: 'i' };
    if (color)     filter.color = color;

    // ── subGender: match on field OR image path ──────────────
    if (subGender) {
      const normalizedSubGender = subGender.toLowerCase();
      filter.$and = filter.$and || [];
      filter.$and.push({
        $or: [
          { subGender },
          { image: { $regex: `/footwear/${normalizedSubGender}/`, $options: 'i' } }
        ]
      });
    }

    if (tag)       filter.tag    = tag;
    if (size)      filter.sizes  = { $in: [size] };

    // ── Moody outfit filters ──
    if (isMoodyOutfit) filter.isMoodyOutfit = isMoodyOutfit === 'true';
    if (moodId)        filter.moodId        = moodId;
    if (outfitGender)  filter.outfitGender  = outfitGender;
    if (outfitNum)     filter.outfitNum     = parseInt(outfitNum);

    if (category) {
      filter.category = { $in: Array.isArray(category) ? category : [category] };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (search) {
      const parsed = parseSearchQuery(search);
      const tokens = search.toLowerCase().trim().split(/\s+/).filter(Boolean);
      const inferredDepartment = inferDepartment(parsed, tokens);
      const hasToken = (t) => tokens.includes(t);
      const hasShirt = hasToken('shirt') || hasToken('shirts');
      const hasTshirt = hasToken('tshirt') || hasToken('t-shirt') || hasToken('tshirts') || hasToken('t-shirts') || hasToken('tee') || hasToken('tees');

      if (parsed.detectedGender) {
        if (
          (parsed.detectedGender === 'Men' || parsed.detectedGender === 'Women') &&
          (inferredDepartment === 'Footwear' || inferredDepartment === 'Accessories')
        ) {
          filter.gender = { $regex: `^${inferredDepartment}$`, $options: 'i' };
          const normalizedSubGender = parsed.detectedGender.toLowerCase();
          const normalizedDepartment = inferredDepartment.toLowerCase();
          filter.$and = filter.$and || [];
          filter.$and.push({
            $or: [
              { subGender: { $regex: `^${parsed.detectedGender}$`, $options: 'i' } },
              { image: { $regex: `/${normalizedDepartment}/${normalizedSubGender}/`, $options: 'i' } }
            ]
          });
        } else {
          filter.gender = { $regex: `^${parsed.detectedGender}$`, $options: 'i' };
        }
      } else if (gender) {
        filter.gender = { $regex: `^${gender}$`, $options: 'i' };
      }

      if (parsed.detectedBrand && !brand) {
        const brandRegex = buildLooseRegex(parsed.detectedBrand);
        filter.brand = { $regex: brandRegex, $options: 'i' };
      }

      if (parsed.detectedColor && !color) {
        filter.color = { $regex: parsed.detectedColor, $options: 'i' };
      }

      if (parsed.detectedTag && !tag) {
        filter.tag = { $regex: `^${parsed.detectedTag}$`, $options: 'i' };
      }

      if (parsed.detectedCategory && !category) {
        const categoryRegex = buildLooseRegex(parsed.detectedCategory);
        filter.category = { $regex: categoryRegex, $options: 'i' };
      }

      if (parsed.remainingWords.length > 0) {
        const remainingText = parsed.remainingWords.join(' ');
        const remainingRegex = buildLooseRegex(remainingText);
        const textConditions = [
          { name:     { $regex: remainingRegex, $options: 'i' } },
          { category: { $regex: remainingRegex, $options: 'i' } },
          { brand:    { $regex: remainingRegex, $options: 'i' } },
          { color:    { $regex: remainingRegex, $options: 'i' } },
          { tag:      { $regex: remainingRegex, $options: 'i' } },
        ];
        if (!filter.category) {
          filter.$or = textConditions;
        }
      }

      if (!parsed.detectedGender && !parsed.detectedCategory &&
          !parsed.detectedBrand && !parsed.detectedColor &&
          !parsed.detectedTag && parsed.remainingWords.length === 0) {
        const searchRegex = buildLooseRegex(search);
        filter.$or = [
          { name:     { $regex: searchRegex, $options: 'i' } },
          { category: { $regex: searchRegex, $options: 'i' } },
          { brand:    { $regex: searchRegex, $options: 'i' } },
          { color:    { $regex: searchRegex, $options: 'i' } },
          { tag:      { $regex: searchRegex, $options: 'i' } },
        ];
      }

      if (tokens.length > 1) {
        const tokenAnd = tokens.map(t => {
          const rx = buildTokenRegex(t);
          return {
            $or: [
              { name:     { $regex: rx, $options: 'i' } },
              { category: { $regex: rx, $options: 'i' } },
              { brand:    { $regex: rx, $options: 'i' } },
              { gender:   { $regex: rx, $options: 'i' } },
              { subGender:{ $regex: rx, $options: 'i' } },
              { color:    { $regex: rx, $options: 'i' } },
              { tag:      { $regex: rx, $options: 'i' } },
            ]
          };
        });
        filter.$and = (filter.$and || []).concat(tokenAnd);
      }

      if (hasShirt && !hasTshirt) {
        const tshirtRx = 't\\s*[-\\s]*shirt|tshirt';
        const shirtRx = buildTokenRegex('shirt');
        filter.$and = (filter.$and || []).concat([
          { $or: [
            { name:     { $regex: shirtRx, $options: 'i' } },
            { category: { $regex: shirtRx, $options: 'i' } },
          ]},
          { category: { $not: { $regex: tshirtRx, $options: 'i' } } },
          { name:     { $not: { $regex: tshirtRx, $options: 'i' } } },
        ]);
      }

    } else {
      if (gender) {
        filter.gender = { $regex: `^${gender}$`, $options: 'i' };
      }
    }

    const shouldIncludeMeta = includeMeta === '1' || includeMeta === 'true';
    const pageNumber = normalizeNumber(page, 1);
    const pageSize = shouldIncludeMeta ? normalizeNumber(limit, 10) : (limit ? normalizeNumber(limit, 0) : 0);
    const skip = shouldIncludeMeta ? (pageNumber - 1) * pageSize : 0;
    const productQuery = Product.find(filter)
      .sort(sortProducts(sort));

    if (shouldIncludeMeta) {
      productQuery.skip(skip).limit(pageSize);
      const [products, totalItems, filterOptions] = await Promise.all([
        productQuery.lean(),
        Product.countDocuments(filter),
        getAdminFilterOptions({ gender }),
      ]);
      const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

      return res.json({
        items: products,
        pagination: {
          page: Math.min(pageNumber, totalPages),
          limit: pageSize,
          totalItems,
          totalPages,
          hasNextPage: pageNumber < totalPages,
          hasPrevPage: pageNumber > 1,
        },
        filters: filterOptions,
      });
    }

    if (pageSize > 0) productQuery.limit(pageSize);
    const products = await productQuery;

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/add', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;