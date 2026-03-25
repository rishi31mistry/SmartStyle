import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'
import '../styles/common-pages.css'

function FilterSidebar({ filterOpen, setFilterOpen, clearFilters,
  selectedPrices, setSelectedPrices,
  selectedCategories, setSelectedCategories,
  selectedBrands, setSelectedBrands,
  selectedSizes, setSelectedSizes,
  selectedColors, setSelectedColors,
  selectedRating, setSelectedRating,
}) {
  const priceRanges = ['Under ₹500', '₹500 - ₹1000', '₹1000 - ₹2000', '₹2000 - ₹3000', 'Above ₹3000']
  const categories = ['Kurtas', 'Dresses', 'Sarees', 'Tops', 'Jeans', 'Co-ord Sets', 'Lehengas', 'Jackets', 'Skirts', 'Ethnic Wear', 'Sportswear']
  const brands = ['Zara', 'H&M', 'Mango', 'Libas', 'W', 'Biba', 'Global Desi', 'AND', 'Aurelia', 'Fabindia', 'Anita Dongre', 'Vero Moda']
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const colors = [
    { name: 'Black', hex: '#111' }, { name: 'White', hex: '#f5f5f5' },
    { name: 'Pink', hex: '#E91E8C' }, { name: 'Red', hex: '#e53935' },
    { name: 'Blue', hex: '#1565C0' }, { name: 'Yellow', hex: '#f9a825' },
    { name: 'Green', hex: '#2e7d32' }, { name: 'Purple', hex: '#6a1b9a' },
  ]
  const ratings = ['4★ & above', '3★ & above', '2★ & above']

  const toggleArr = (arr, setArr, val) => {
    setArr(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val])
  }

  return (
    <div className={`filter-sidebar ${filterOpen ? 'open' : ''}`}>
      <div className="filter-top">
        <div className="filter-title">🎛️ Filters</div>
        <button className="filter-clear" onClick={clearFilters}>Clear All</button>
      </div>
      <div className="filter-section">
        <div className="filter-section-title">Price Range</div>
        <div className="filter-price-options">
          {priceRanges.map(p => (
            <label key={p} className="filter-checkbox-item">
              <input type="checkbox" checked={selectedPrices.includes(p)}
                onChange={() => toggleArr(selectedPrices, setSelectedPrices, p)} />
              <span className="filter-checkbox-label">{p}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="filter-section">
        <div className="filter-section-title">Category</div>
        <div className="filter-category-options">
          {categories.map(c => (
            <label key={c} className="filter-checkbox-item">
              <input type="checkbox" checked={selectedCategories.includes(c)}
                onChange={() => toggleArr(selectedCategories, setSelectedCategories, c)} />
              <span className="filter-checkbox-label">{c}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="filter-section">
        <div className="filter-section-title">Brand</div>
        <div className="filter-brand-options">
          {brands.map(b => (
            <label key={b} className="filter-checkbox-item">
              <input type="checkbox" checked={selectedBrands.includes(b)}
                onChange={() => toggleArr(selectedBrands, setSelectedBrands, b)} />
              <span className="filter-checkbox-label">{b}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="filter-section">
        <div className="filter-section-title">Size</div>
        <div className="filter-size-options">
          {sizes.map(s => (
            <button key={s}
              className={`filter-size-btn ${selectedSizes.includes(s) ? 'active' : ''}`}
              onClick={() => toggleArr(selectedSizes, setSelectedSizes, s)}
            >{s}</button>
          ))}
        </div>
      </div>
      <div className="filter-section">
        <div className="filter-section-title">Color</div>
        <div className="filter-color-options">
          {colors.map(c => (
            <button key={c.name} title={c.name}
              className={`filter-color-btn ${selectedColors.includes(c.name) ? 'active' : ''}`}
              style={{ background: c.hex, borderColor: selectedColors.includes(c.name) ? '#E91E8C' : 'transparent' }}
              onClick={() => toggleArr(selectedColors, setSelectedColors, c.name)}
            />
          ))}
        </div>
      </div>
      <div className="filter-section">
        <div className="filter-section-title">Rating</div>
        <div className="filter-rating-options">
          {ratings.map(r => (
            <label key={r} className="filter-rating-item">
              <input type="radio" name="rating" checked={selectedRating === r}
                onChange={() => setSelectedRating(r)} />
              <span className="filter-rating-stars">★</span>
              <span className="filter-rating-label">{r}</span>
            </label>
          ))}
        </div>
      </div>
      <button className="filter-apply-btn" style={{ background: '#E91E8C' }}
        onClick={() => setFilterOpen(false)}>
        Apply Filters
      </button>
    </div>
  )
}

export default function CommonWomen() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const urlCategory = searchParams.get('category')

  const [wishlist, setWishlist] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState('popular')
  const [selectedPrices, setSelectedPrices] = useState([])
  const [selectedCategories, setSelectedCategories] = useState(
    urlCategory ? [decodeURIComponent(urlCategory)] : []
  )
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedRating, setSelectedRating] = useState(null)

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  const clearFilters = () => {
    setSelectedPrices([])
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedSizes([])
    setSelectedColors([])
    setSelectedRating(null)
  }

  const products = [
    { id: 1,  name: 'Floral Midi Dress',   price: '₹1,499',               rating: 4.6, tag: 'New',      category: 'Dresses',     brand: 'Zara',       size: ['XS','S','M','L'],        color: 'Pink',   img: '/image/women/dress/d1.jpg'   },
    { id: 2,  name: 'Boho Maxi Dress',     price: '₹1,799',               rating: 4.5, tag: 'Trending', category: 'Dresses',     brand: 'H&M',        size: ['S','M','L','XL'],        color: 'Yellow', img: '/image/women/dress/d16.jpg'   },
    { id: 3,  name: 'Summer Kurta',        price: '₹899',                 rating: 4.3, tag: 'Popular',  category: 'Kurtas',      brand: 'Libas',      size: ['XS','S','M','L','XL'],   color: 'White',  img: '/image/women/kurta/d2.jpg'   },
    { id: 4,  name: 'Wrap Dress',          price: '₹1,299',               rating: 4.4, tag: 'Hot',      category: 'Dresses',     brand: 'Mango',      size: ['XS','S','M'],            color: 'Red',    img: '/image/women/dress/d5.jpg'   },
    { id: 5,  name: 'Silk Saree',          price: '₹2,499',               rating: 4.7, tag: 'Popular',  category: 'Sarees',      brand: 'Fabindia',   size: ['S','M','L'],             color: 'Pink',   img: '/image/women/saree/d1.jpg'   },
    { id: 6,  name: 'Denim Jacket',        price: '₹2,199',               rating: 4.5, tag: 'New',      category: 'Jackets',     brand: 'Zara',       size: ['XS','S','M','L'],        color: 'Blue',   img: '/image/women/jacket/d1.jpg'  },
    { id: 7,  name: 'Co-ord Set',          price: '₹1,699',               rating: 4.4, tag: 'Trending', category: 'Lehengas',    brand: 'AND',        size: ['S','M','L','XL'],        color: 'White',  img: '/image/women/lehenga/d4.jpg'     },
    { id: 8,  name: 'Ethnic Wear',         price: '₹1,899',               rating: 4.6, tag: 'Hot',      category: 'Ethnic Wear', brand: 'Biba',       size: ['S','M','L','XL','XXL'],  color: 'Purple', img: '/image/women/ethnic/d2.jpg'  },
    { id: 9,  name: 'Floral Top',          price: '₹799',                 rating: 4.2, tag: 'New',      category: 'Tops',        brand: 'H&M',        size: ['XS','S','M','L'],        color: 'Pink',   img: '/image/women/top/d4.jpg'     },
    { id: 10, name: 'Slim Fit Jeans',      price: '₹1,299',               rating: 4.3, tag: 'Popular',  category: 'Jeans',       brand: 'Mango',      size: ['XS','S','M','L','XL'],   color: 'Blue',   img: '/image/women/dress/d13.jpg'  },
    { id: 11, name: 'Linen Kurti',         price: '₹999',                 rating: 4.4, tag: 'New',      category: 'Kurtis',      brand: 'W',          size: ['S','M','L','XL'],        color: 'White',  img: '/image/women/kurta/d7.jpg'   },
    { id: 12, name: 'Slip Dress',          price: '₹1,199',               rating: 4.1, tag: 'Trending', category: 'Dresses',     brand: 'Zara',       size: ['XS','S','M'],            color: 'Black',  img: '/image/women/dress/d7.jpg'   },
    { id: 13, name: 'Sports Wear',         price: '₹1,199',               rating: 4.3, tag: 'New',      category: 'Sportswear',  brand: 'AND',        size: ['S','M','L','XL'],        color: 'Black',  img: '/image/women/dress/d6.jpg'   },
    { id: 14, name: 'Puff Sleeve Dress',   price: '₹1,799',               rating: 4.5, tag: 'Hot',      category: 'Dresses',     brand: 'Vero Moda',  size: ['XS','S','M','L'],        color: 'Yellow', img: '/image/women/dress/d4.jpg'   },
    { id: 15, name: 'Anarkali Suit',       price: '₹2,199',               rating: 4.7, tag: 'Popular',  category: 'Ethnic Wear', brand: 'Aurelia',    size: ['S','M','L','XL','XXL'],  color: 'Red',    img: '/image/women/ethnic/d6.jpg'  },
    { id: 16, name: 'Ruffle Midi Skirt',   price: '₹999',                 rating: 4.2, tag: 'New',      category: 'Skirts',      brand: 'H&M',        size: ['XS','S','M','L'],        color: 'Pink',   img: '/image/women/skirt/d5.jpg'   },
    { id: 17, name: 'Printed Kurta',       price: '₹299',  originalPrice: '₹599',  rating: 4.1, tag: 'Sale',     category: 'Kurtis',      brand: 'Non Brand', size: ['XS','S','M','L','XL'],   color: 'White',  img: '/image/women/kurta/d3.jpg'   },
    { id: 18, name: 'Casual Top',          price: '₹399',  originalPrice: '₹799',  rating: 4.0, tag: 'Sale',     category: 'Tops',        brand: 'Non Brand', size: ['XS','S','M','L'],        color: 'Pink',   img: '/image/women/top/d2.jpg'     },
    { id: 19, name: 'Flared Palazzo',      price: '₹449',  originalPrice: '₹899',  rating: 4.2, tag: 'Sale',     category: 'Palazzos',    brand: 'Non Brand', size: ['S','M','L','XL'],        color: 'Blue',   img: '/image/women/plazzo/d2.jpg'  },
    { id: 20, name: 'Floral Dress',        price: '₹349',  originalPrice: '₹699',  rating: 4.1, tag: 'Sale',     category: 'Dresses',     brand: 'Non Brand', size: ['XS','S','M','L'],        color: 'Pink',   img: '/image/women/dress/d2.jpg'   },
    { id: 21, name: 'Cotton Jeans',        price: '₹199',  originalPrice: '₹399',  rating: 4.3, tag: 'Sale',     category: 'Jeans',       brand: 'Non Brand', size: ['XS','S','M','L','XL'],   color: 'Blue',   img: '/image/women/jeans/d2.jpg'   },
    { id: 22, name: 'Linen Kurti',         price: '₹499',  originalPrice: '₹999',  rating: 4.2, tag: 'Sale',     category: 'Kurtis',      brand: 'Non Brand', size: ['S','M','L','XL'],        color: 'White',  img: '/image/women/kurta/d4.jpg'   },
    { id: 23, name: 'Rayon Skirt',         price: '₹379',  originalPrice: '₹749',  rating: 4.0, tag: 'Sale',     category: 'Skirts',      brand: 'Non Brand', size: ['XS','S','M','L'],        color: 'Grey',   img: '/image/women/skirt/d2.jpg'   },
    { id: 24, name: 'Denim Jacket',        price: '₹249',  originalPrice: '₹499',  rating: 4.4, tag: 'Sale',     category: 'Jackets',     brand: 'Non Brand', size: ['S','M','L','XL'],        color: 'Blue',   img: '/image/women/jacket/d3.jpg'  },
    { id: 25, name: 'Floral Midi Dress',   price: '₹1,499',               rating: 4.6, tag: 'New',      category: 'Dresses',     brand: 'Non Brand', size: ['XS','S','M','L'],        color: 'Pink',   img: '/image/women/dress/d3.jpg'   },
    { id: 26, name: 'Black Jeans',         price: '₹1,899',               rating: 4.5, tag: 'New',      category: 'Jeans',       brand: 'Non Brand', size: ['XS','S','M','L','XL'],   color: 'Black',  img: '/image/women/jeans/d3.jpg'   },
    { id: 27, name: 'Boho Kurta Set',      price: '₹1,299',               rating: 4.3, tag: 'New',      category: 'Kurtis',      brand: 'Non Brand', size: ['S','M','L','XL'],        color: 'White',  img: '/image/women/kurta/d5.jpg'   },
    { id: 28, name: 'Wrap Maxi Dress',     price: '₹1,799',               rating: 4.7, tag: 'New',      category: 'Dresses',     brand: 'Non Brand', size: ['XS','S','M','L'],        color: 'Red',    img: '/image/women/dress/d8.jpg'   },
    { id: 29, name: 'Crop Top & Palazzo',  price: '₹1,099',               rating: 4.2, tag: 'New',      category: 'Palazzos',    brand: 'Non Brand', size: ['S','M','L','XL'],        color: 'Yellow', img: '/image/women/plazzo/d3.jpg'  },
    { id: 30, name: 'Anarkali Suit',       price: '₹2,199',               rating: 4.8, tag: 'New',      category: 'Lehengas',    brand: 'Non Brand', size: ['S','M','L','XL','XXL'],  color: 'Purple', img: '/image/women/lehenga/d3.jpg' },
    { id: 31, name: 'Denim Skirt',         price: '₹899',                 rating: 4.1, tag: 'New',      category: 'Skirts',      brand: 'Non Brand', size: ['XS','S','M','L'],        color: 'Blue',   img: '/image/women/skirt/d3.jpg'   },
    { id: 32, name: 'Satin Slip Dress',    price: '₹1,699',               rating: 4.4, tag: 'New',      category: 'Dresses',     brand: 'Non Brand', size: ['XS','S','M','L'],        color: 'Black',  img: '/image/women/dress/d14.jpg'   },
    { id: 33, name: 'Oversized Blazer',    price: '₹1,999',               rating: 4.5, tag: 'Trending', category: 'Jackets',     brand: 'Non Brand', size: ['S','M','L','XL'],        color: 'Black',  img: '/image/women/jacket/d4.jpg'  },
    { id: 34, name: 'Wide Leg Pants',      price: '₹1,299',               rating: 4.4, tag: 'Hot',      category: 'Jeans',       brand: 'Non Brand', size: ['XS','S','M','L','XL'],   color: 'Grey',   img: '/image/women/jeans/d4.jpg'   },
    { id: 35, name: 'Puff Sleeve Dress',   price: '₹1,799',               rating: 4.6, tag: 'New',      category: 'Dresses',     brand: 'Non Brand', size: ['XS','S','M','L'],        color: 'Yellow', img: '/image/women/dress/d15.jpg'   },
    { id: 36, name: 'Embroidered Kurta',   price: '₹1,599',               rating: 4.7, tag: 'Popular',  category: 'Kurtis',      brand: 'Non Brand', size: ['S','M','L','XL'],        color: 'Red',    img: '/image/women/kurta/d6.jpg'   },
    { id: 37, name: 'Linen Shirt Dress',   price: '₹1,399',               rating: 4.3, tag: 'Trending', category: 'Dresses',     brand: 'Non Brand', size: ['XS','S','M','L'],        color: 'White',  img: '/image/women/dress/d9.jpg'   },
    { id: 38, name: 'Ruffle Midi Skirt',   price: '₹999',                 rating: 4.2, tag: 'Hot',      category: 'Skirts',      brand: 'Non Brand', size: ['XS','S','M','L'],        color: 'Pink',   img: '/image/women/skirt/d4.jpg'   },
    { id: 39, name: 'Silk Saree',          price: '₹3,499',               rating: 4.8, tag: 'New',      category: 'Sarees',      brand: 'Non Brand', size: ['S','M','L'],             color: 'Pink',   img: '/image/women/saree/d3.jpg'   },
    { id: 40, name: 'Tie-dye Jumpsuit',    price: '₹1,199',               rating: 4.1, tag: 'Popular',  category: 'Palazzos',    brand: 'Non Brand', size: ['S','M','L','XL'],        color: 'Blue',   img: '/image/women/plazzo/d4.jpg'  },
    { id: 41, name: 'Party Wear Lehenga',  price: '₹4,999',               rating: 4.7, tag: 'Popular',  category: 'Lehengas',    brand: 'Non Brand', size: ['S','M','L','XL'],        color: 'Red',    img: '/image/women/lehenga/d2.jpg' },
    { id: 42, name: 'Summer Sundress',     price: '₹1,299',               rating: 4.4, tag: 'New',      category: 'Dresses',     brand: 'Non Brand', size: ['XS','S','M','L'],        color: 'Yellow', img: '/image/women/dress/d10.jpg'  },
    { id: 43, name: 'Office Blazer Set',   price: '₹2,799',               rating: 4.5, tag: 'Popular',  category: 'Ethnic Wear', brand: 'Non Brand', size: ['S','M','L','XL'],        color: 'Black',  img: '/image/women/ethnic/d5.jpg'  },
    { id: 44, name: 'Festive Saree',       price: '₹2,499',               rating: 4.6, tag: 'Popular',  category: 'Sarees',      brand: 'Non Brand', size: ['S','M','L'],             color: 'Pink',   img: '/image/women/saree/d4.jpg'   },
    { id: 45, name: 'Yoga Set',            price: '₹999',                 rating: 4.3, tag: 'New',      category: 'Sportswear',  brand: 'Non Brand', size: ['XS','S','M','L','XL'],   color: 'Black',  img: '/image/women/sport/d3.jpg'   },
    { id: 46, name: 'Formal Trousers',     price: '₹1,499',               rating: 4.4, tag: 'Popular',  category: 'Jeans',       brand: 'Non Brand', size: ['S','M','L','XL'],        color: 'Grey',   img: '/image/women/jeans/d5.jpg'   },
    { id: 47, name: 'Casual Denim Dress',  price: '₹1,199',               rating: 4.2, tag: 'New',      category: 'Dresses',     brand: 'Non Brand', size: ['XS','S','M','L'],        color: 'Blue',   img: '/image/women/dress/d12.jpg'  },
    { id: 48, name: 'Winter Shrug',        price: '₹1,799',               rating: 4.3, tag: 'Hot',      category: 'Tops',        brand: 'Non Brand', size: ['S','M','L','XL'],        color: 'Grey',   img: '/image/women/top/d3.jpg'     },

    // Zara Dresses

  { id: 49,  name: 'Zara Floral Midi Dress',      price: '₹2,999', originalPrice: '₹4,499', rating: 4.7, tag: 'Bestseller', category: 'Dresses',  brand: 'Zara', size: ['XS','S','M','L'],        color: 'Pink',   img: '/image/women/brand/zara/d1.jpg' },
  { id: 50,  name: 'Zara Satin Slip Dress',        price: '₹2,499', originalPrice: '₹3,999', rating: 4.5, tag: 'New',        category: 'Dresses',  brand: 'Zara', size: ['XS','S','M','L'],        color: 'Black',  img: '/image/women/brand/zara/d2.jpg' },
  { id: 51,  name: 'Zara Wrap Midi Dress',         price: '₹3,199', originalPrice: '₹4,799', rating: 4.6, tag: 'Trending',   category: 'Dresses',  brand: 'Zara', size: ['S','M','L','XL'],        color: 'Red',    img: '/image/women/brand/zara/d3.jpg' },
  { id: 52,  name: 'Zara Linen Shirt Dress',       price: '₹2,699', originalPrice: '₹3,999', rating: 4.4, tag: null,         category: 'Dresses',  brand: 'Zara', size: ['S','M','L','XL'],        color: 'White',  img: '/image/women/brand/zara/d4.jpg' },
  { id: 53,  name: 'Zara Puff Sleeve Dress',       price: '₹2,799', originalPrice: '₹4,199', rating: 4.5, tag: 'Popular',    category: 'Dresses',  brand: 'Zara', size: ['XS','S','M','L'],        color: 'Yellow', img: '/image/women/brand/zara/d5.jpg' },
  { id: 54,  name: 'Zara Denim Shirt Dress',       price: '₹2,299', originalPrice: '₹3,499', rating: 4.3, tag: 'Sale',       category: 'Dresses',  brand: 'Zara', size: ['S','M','L','XL'],        color: 'Blue',   img: '/image/women/brand/zara/d6.jpg' },
  { id: 55,  name: 'Zara Ruffle Mini Dress',       price: '₹1,999', originalPrice: '₹2,999', rating: 4.2, tag: 'Sale',       category: 'Dresses',  brand: 'Zara', size: ['XS','S','M'],            color: 'Pink',   img: '/image/women/brand/zara/d7.jpg' },
  { id: 56,  name: 'Zara Knit Bodycon Dress',      price: '₹3,499', originalPrice: '₹4,999', rating: 4.8, tag: 'New',        category: 'Dresses',  brand: 'Zara', size: ['XS','S','M','L'],        color: 'Black',  img: '/image/women/brand/zara/d8.jpg' },

  { id: 57,  name: 'Zara Basic White Tee',         price: '₹999',   originalPrice: '₹1,599', rating: 4.4, tag: 'Bestseller', category: 'T-Shirts', brand: 'Zara', size: ['XS','S','M','L','XL'],   color: 'White',  img: '/image/women/brand/zara/t1.jpg' },
  { id: 58,  name: 'Zara Cropped Graphic Tee',     price: '₹1,199', originalPrice: '₹1,899', rating: 4.3, tag: 'Trending',   category: 'T-Shirts', brand: 'Zara', size: ['XS','S','M','L'],        color: 'Grey',   img: '/image/women/brand/zara/t2.jpg' },
  { id: 59,  name: 'Zara Oversized Tee',           price: '₹1,299', originalPrice: '₹1,999', rating: 4.5, tag: 'New',        category: 'T-Shirts', brand: 'Zara', size: ['S','M','L','XL'],        color: 'Black',  img: '/image/women/brand/zara/t3.jpg' },
  { id: 60,  name: 'Zara Ribbed Tee',              price: '₹899',   originalPrice: '₹1,399', rating: 4.2, tag: null,         category: 'T-Shirts', brand: 'Zara', size: ['XS','S','M','L'],        color: 'White',  img: '/image/women/brand/zara/t4.jpg' },
  { id: 61,  name: 'Zara Striped Crop Tee',        price: '₹1,099', originalPrice: '₹1,699', rating: 4.3, tag: 'Popular',    category: 'T-Shirts', brand: 'Zara', size: ['XS','S','M'],            color: 'Blue',   img: '/image/women/brand/zara/t5.jpg' },
  { id: 62,  name: 'Zara Cotton Boxy Tee',         price: '₹799',   originalPrice: '₹1,299', rating: 4.1, tag: 'Sale',       category: 'T-Shirts', brand: 'Zara', size: ['S','M','L','XL'],        color: 'Grey',   img: '/image/women/brand/zara/t6.jpg' },
  { id: 63,  name: 'Zara Printed Logo Tee',        price: '₹1,399', originalPrice: '₹2,099', rating: 4.6, tag: 'New',        category: 'T-Shirts', brand: 'Zara', size: ['XS','S','M','L'],        color: 'White',  img: '/image/women/brand/zara/t7.jpg' },
  { id: 64,  name: 'Zara V-Neck Tee',              price: '₹949',   originalPrice: '₹1,499', rating: 4.2, tag: 'Sale',       category: 'T-Shirts', brand: 'Zara', size: ['XS','S','M','L'],        color: 'Black',  img: '/image/women/brand/zara/t8.jpg' },

  { id: 65,  name: 'Zara High Waist Skinny Jeans', price: '₹2,499', originalPrice: '₹3,699', rating: 4.6, tag: 'Bestseller', category: 'Jeans',    brand: 'Zara', size: ['XS','S','M','L'],        color: 'Blue',   img: '/image/women/brand/zara/p1.jpg' },
  { id: 66,  name: 'Zara Wide Leg Jeans',          price: '₹2,799', originalPrice: '₹3,999', rating: 4.5, tag: 'Trending',   category: 'Jeans',    brand: 'Zara', size: ['S','M','L','XL'],        color: 'Black',  img: '/image/women/brand/zara/p2.jpg' },
  { id: 67,  name: 'Zara Straight Cut Jeans',      price: '₹2,299', originalPrice: '₹3,499', rating: 4.4, tag: 'New',        category: 'Jeans',    brand: 'Zara', size: ['S','M','L','XL'],        color: 'Blue',   img: '/image/women/brand/zara/p3.jpg' },
  { id: 68,  name: 'Zara Mom Fit Jeans',           price: '₹2,599', originalPrice: '₹3,799', rating: 4.3, tag: null,         category: 'Jeans',    brand: 'Zara', size: ['XS','S','M','L'],        color: 'Grey',   img: '/image/women/brand/zara/p4.jpg' },
  { id: 69,  name: 'Zara Flared Denim',            price: '₹2,999', originalPrice: '₹4,299', rating: 4.7, tag: 'Popular',    category: 'Jeans',    brand: 'Zara', size: ['XS','S','M','L'],        color: 'Blue',   img: '/image/women/brand/zara/p5.jpg' },
  { id: 70,  name: 'Zara Ripped Skinny Jeans',     price: '₹2,199', originalPrice: '₹3,299', rating: 4.2, tag: 'Sale',       category: 'Jeans',    brand: 'Zara', size: ['XS','S','M','L'],        color: 'Black',  img: '/image/women/brand/zara/p6.jpg' },
  { id: 71,  name: 'Zara Cropped Straight Jeans',  price: '₹2,399', originalPrice: '₹3,599', rating: 4.4, tag: 'New',        category: 'Jeans',    brand: 'Zara', size: ['S','M','L','XL'],        color: 'Blue',   img: '/image/women/brand/zara/p7.jpg' },
  { id: 72,  name: 'Zara Paperbag Waist Jeans',    price: '₹2,699', originalPrice: '₹3,999', rating: 4.5, tag: 'Trending',   category: 'Jeans',    brand: 'Zara', size: ['XS','S','M','L'],        color: 'Grey',   img: '/image/women/brand/zara/p8.jpg' },
 
  // H&M Dresses

  { id: 73,  name: 'H&M Floral Wrap Dress',        price: '₹1,999', originalPrice: '₹3,499', rating: 4.5, tag: 'Bestseller', category: 'Dresses',  brand: 'H&M', size: ['XS','S','M','L'],        color: 'Pink',   img: '/image/women/brand/h&m/d1.jpg' },
  { id: 74,  name: 'H&M Puff Sleeve Dress',        price: '₹1,799', originalPrice: '₹2,999', rating: 4.3, tag: 'New',        category: 'Dresses',  brand: 'H&M', size: ['XS','S','M','L'],        color: 'Yellow', img: '/image/women/brand/h&m/d2.jpg' },
  { id: 75,  name: 'H&M Linen Midi Dress',         price: '₹2,199', originalPrice: '₹3,699', rating: 4.6, tag: 'Trending',   category: 'Dresses',  brand: 'H&M', size: ['S','M','L','XL'],        color: 'White',  img: '/image/women/brand/h&m/d3.jpg' },
  { id: 76,  name: 'H&M Shirt Dress',              price: '₹1,699', originalPrice: '₹2,799', rating: 4.2, tag: null,         category: 'Dresses',  brand: 'H&M', size: ['S','M','L','XL'],        color: 'Blue',   img: '/image/women/brand/h&m/d4.jpg' },
  { id: 77,  name: 'H&M Satin Mini Dress',         price: '₹2,299', originalPrice: '₹3,999', rating: 4.4, tag: 'Popular',    category: 'Dresses',  brand: 'H&M', size: ['XS','S','M','L'],        color: 'Black',  img: '/image/women/brand/h&m/d5.jpg' },
  { id: 78,  name: 'H&M Cotton Sundress',          price: '₹1,499', originalPrice: '₹2,499', rating: 4.3, tag: 'Sale',       category: 'Dresses',  brand: 'H&M', size: ['S','M','L','XL'],        color: 'Pink',   img: '/image/women/brand/h&m/d6.jpg' },
  { id: 79,  name: 'H&M Bodycon Dress',            price: '₹1,599', originalPrice: '₹2,699', rating: 4.1, tag: 'Sale',       category: 'Dresses',  brand: 'H&M', size: ['XS','S','M'],            color: 'Black',  img: '/image/women/brand/h&m/d7.jpg' },
  { id: 80,  name: 'H&M Maxi Boho Dress',          price: '₹2,499', originalPrice: '₹3,999', rating: 4.7, tag: 'New',        category: 'Dresses',  brand: 'H&M', size: ['S','M','L','XL'],        color: 'Yellow', img: '/image/women/brand/h&m/d8.jpg' },

  { id: 81,  name: 'H&M Basic Crop Tee',           price: '₹699',   originalPrice: '₹1,199', rating: 4.3, tag: 'Bestseller', category: 'T-Shirts', brand: 'H&M', size: ['XS','S','M','L'],        color: 'White',  img: '/image/women/brand/h&m/t1.jpg' },
  { id: 82,  name: 'H&M Graphic Print Tee',        price: '₹799',   originalPrice: '₹1,399', rating: 4.2, tag: 'Trending',   category: 'T-Shirts', brand: 'H&M', size: ['XS','S','M','L'],        color: 'Grey',   img: '/image/women/brand/h&m/t2.jpg' },
  { id: 83,  name: 'H&M Oversized Tee',            price: '₹899',   originalPrice: '₹1,499', rating: 4.4, tag: 'New',        category: 'T-Shirts', brand: 'H&M', size: ['S','M','L','XL'],        color: 'Black',  img: '/image/women/brand/h&m/t3.jpg' },
  { id: 84,  name: 'H&M Ribbed Slim Tee',          price: '₹599',   originalPrice: '₹999',   rating: 4.1, tag: null,         category: 'T-Shirts', brand: 'H&M', size: ['XS','S','M','L'],        color: 'White',  img: '/image/women/brand/h&m/t4.jpg' },
  { id: 85,  name: 'H&M Striped Tee',              price: '₹749',   originalPrice: '₹1,299', rating: 4.2, tag: 'Popular',    category: 'T-Shirts', brand: 'H&M', size: ['XS','S','M'],            color: 'Blue',   img: '/image/women/brand/h&m/t5.jpg' },
  { id: 86,  name: 'H&M V-Neck Tee',               price: '₹549',   originalPrice: '₹949',   rating: 4.0, tag: 'Sale',       category: 'T-Shirts', brand: 'H&M', size: ['XS','S','M','L'],        color: 'Grey',   img: '/image/women/brand/h&m/t6.jpg' },
  { id: 87,  name: 'H&M Knotted Tee',              price: '₹849',   originalPrice: '₹1,499', rating: 4.5, tag: 'New',        category: 'T-Shirts', brand: 'H&M', size: ['XS','S','M','L'],        color: 'Pink',   img: '/image/women/brand/h&m/t7.jpg' },
  { id: 88,  name: 'H&M Cotton Round Neck Tee',    price: '₹649',   originalPrice: '₹1,099', rating: 4.1, tag: 'Sale',       category: 'T-Shirts', brand: 'H&M', size: ['XS','S','M','L'],        color: 'White',  img: '/image/women/brand/h&m/t8.jpg' },

  { id: 89,  name: 'H&M High Waist Skinny Jeans',  price: '₹1,999', originalPrice: '₹3,199', rating: 4.5, tag: 'Bestseller', category: 'Jeans',    brand: 'H&M', size: ['XS','S','M','L'],        color: 'Blue',   img: '/image/women/brand/h&m/p1.jpg' },
  { id: 90,  name: 'H&M Wide Leg Jeans',           price: '₹2,299', originalPrice: '₹3,699', rating: 4.4, tag: 'Trending',   category: 'Jeans',    brand: 'H&M', size: ['S','M','L','XL'],        color: 'Black',  img: '/image/women/brand/h&m/p2.jpg' },
  { id: 91,  name: 'H&M Straight Fit Jeans',       price: '₹1,799', originalPrice: '₹2,999', rating: 4.3, tag: 'New',        category: 'Jeans',    brand: 'H&M', size: ['S','M','L','XL'],        color: 'Blue',   img: '/image/women/brand/h&m/p3.jpg' },
  { id: 92,  name: 'H&M Mom Jeans',                price: '₹2,099', originalPrice: '₹3,399', rating: 4.2, tag: null,         category: 'Jeans',    brand: 'H&M', size: ['XS','S','M','L'],        color: 'Grey',   img: '/image/women/brand/h&m/p4.jpg' },
  { id: 93,  name: 'H&M Flared Jeans',             price: '₹2,399', originalPrice: '₹3,799', rating: 4.6, tag: 'Popular',    category: 'Jeans',    brand: 'H&M', size: ['XS','S','M','L'],        color: 'Blue',   img: '/image/women/brand/h&m/p5.jpg' },
  { id: 94,  name: 'H&M Ripped Jeans',             price: '₹1,699', originalPrice: '₹2,799', rating: 4.1, tag: 'Sale',       category: 'Jeans',    brand: 'H&M', size: ['XS','S','M','L'],        color: 'Black',  img: '/image/women/brand/h&m/p6.jpg' },
  { id: 95,  name: 'H&M Cropped Jeans',            price: '₹1,899', originalPrice: '₹3,099', rating: 4.3, tag: 'New',        category: 'Jeans',    brand: 'H&M', size: ['S','M','L','XL'],        color: 'Blue',   img: '/image/women/brand/h&m/p7.jpg' },
  { id: 96,  name: 'H&M Boyfriend Jeans',          price: '₹2,199', originalPrice: '₹3,499', rating: 4.4, tag: 'Trending',   category: 'Jeans',    brand: 'H&M', size: ['S','M','L','XL'],        color: 'Grey',   img: '/image/women/brand/h&m/p8.jpg' },

  // Aurelia Dresses

  { id: 97,  name: 'Aurelia Floral A-Line Dress',    price: '₹2,199', originalPrice: '₹3,499', rating: 4.6, tag: 'Bestseller', category: 'Dresses',  brand: 'Aurelia', size: ['XS','S','M','L'],        color: 'Pink',   img: '/image/women/brand/aurelia/d1.jpg' },
  { id: 98,  name: 'Aurelia Ethnic Midi Dress',      price: '₹2,499', originalPrice: '₹3,999', rating: 4.5, tag: 'New',        category: 'Dresses',  brand: 'Aurelia', size: ['S','M','L','XL'],        color: 'Red',    img: '/image/women/brand/aurelia/d2.jpg' },
  { id: 99,  name: 'Aurelia Printed Wrap Dress',     price: '₹1,999', originalPrice: '₹3,299', rating: 4.4, tag: 'Trending',   category: 'Dresses',  brand: 'Aurelia', size: ['XS','S','M','L'],        color: 'Yellow', img: '/image/women/brand/aurelia/d3.jpg' },
  { id: 100, name: 'Aurelia Cotton Shirt Dress',     price: '₹1,799', originalPrice: '₹2,999', rating: 4.3, tag: null,         category: 'Dresses',  brand: 'Aurelia', size: ['S','M','L','XL'],        color: 'White',  img: '/image/women/brand/aurelia/d4.jpg' },
  { id: 101, name: 'Aurelia Embroidered Dress',      price: '₹2,799', originalPrice: '₹4,499', rating: 4.7, tag: 'Popular',    category: 'Dresses',  brand: 'Aurelia', size: ['S','M','L','XL','XXL'],  color: 'Purple', img: '/image/women/brand/aurelia/d5.jpg' },
  { id: 102, name: 'Aurelia Rayon Flared Dress',     price: '₹1,699', originalPrice: '₹2,799', rating: 4.2, tag: 'Sale',       category: 'Dresses',  brand: 'Aurelia', size: ['XS','S','M','L'],        color: 'Blue',   img: '/image/women/brand/aurelia/d6.jpg' },
  { id: 103, name: 'Aurelia Block Print Dress',      price: '₹2,099', originalPrice: '₹3,499', rating: 4.3, tag: 'Sale',       category: 'Dresses',  brand: 'Aurelia', size: ['S','M','L','XL'],        color: 'Orange', img: '/image/women/brand/aurelia/d7.jpg' },
  { id: 104, name: 'Aurelia Festive Anarkali Dress', price: '₹3,199', originalPrice: '₹4,999', rating: 4.8, tag: 'New',        category: 'Dresses',  brand: 'Aurelia', size: ['S','M','L','XL','XXL'],  color: 'Red',    img: '/image/women/brand/aurelia/d8.jpg' },

  { id: 105, name: 'Aurelia Printed Kurta Top',      price: '₹899',   originalPrice: '₹1,499', rating: 4.4, tag: 'Bestseller', category: 'Tops',     brand: 'Aurelia', size: ['XS','S','M','L','XL'],   color: 'Pink',   img: '/image/women/brand/aurelia/t1.jpg' },
  { id: 106, name: 'Aurelia Embroidered Top',        price: '₹1,099', originalPrice: '₹1,799', rating: 4.3, tag: 'Trending',   category: 'Tops',     brand: 'Aurelia', size: ['S','M','L','XL'],        color: 'White',  img: '/image/women/brand/aurelia/t2.jpg' },
  { id: 107, name: 'Aurelia Cotton Floral Top',      price: '₹999',   originalPrice: '₹1,699', rating: 4.5, tag: 'New',        category: 'Tops',     brand: 'Aurelia', size: ['XS','S','M','L'],        color: 'Yellow', img: '/image/women/brand/aurelia/t3.jpg' },
  { id: 108, name: 'Aurelia Solid Tunic Top',        price: '₹799',   originalPrice: '₹1,299', rating: 4.2, tag: null,         category: 'Tops',     brand: 'Aurelia', size: ['S','M','L','XL'],        color: 'Blue',   img: '/image/women/brand/aurelia/t4.jpg' },
  { id: 109, name: 'Aurelia Block Print Top',        price: '₹949',   originalPrice: '₹1,599', rating: 4.3, tag: 'Popular',    category: 'Tops',     brand: 'Aurelia', size: ['XS','S','M','L'],        color: 'Orange', img: '/image/women/brand/aurelia/t5.jpg' },
  { id: 110, name: 'Aurelia Ethnic Crop Top',        price: '₹749',   originalPrice: '₹1,249', rating: 4.1, tag: 'Sale',       category: 'Tops',     brand: 'Aurelia', size: ['XS','S','M','L'],        color: 'Red',    img: '/image/women/brand/aurelia/t6.jpg' },
  { id: 111, name: 'Aurelia Rayon Printed Top',      price: '₹1,149', originalPrice: '₹1,899', rating: 4.5, tag: 'New',        category: 'Tops',     brand: 'Aurelia', size: ['S','M','L','XL'],        color: 'Purple', img: '/image/women/brand/aurelia/t7.jpg' },
  { id: 112, name: 'Aurelia Casual Slub Top',        price: '₹849',   originalPrice: '₹1,399', rating: 4.2, tag: 'Sale',       category: 'Tops',     brand: 'Aurelia', size: ['XS','S','M','L'],        color: 'White',  img: '/image/women/brand/aurelia/t8.jpg' },

  { id: 113, name: 'Aurelia Printed Palazzo',        price: '₹1,499', originalPrice: '₹2,499', rating: 4.5, tag: 'Bestseller', category: 'Palazzos', brand: 'Aurelia', size: ['S','M','L','XL'],        color: 'Pink',   img: '/image/women/brand/aurelia/p1.jpg' },
  { id: 114, name: 'Aurelia Wide Leg Pants',         price: '₹1,699', originalPrice: '₹2,799', rating: 4.4, tag: 'Trending',   category: 'Palazzos', brand: 'Aurelia', size: ['S','M','L','XL'],        color: 'White',  img: '/image/women/brand/aurelia/p2.jpg' },
  { id: 115, name: 'Aurelia Cotton Straight Pants',  price: '₹1,299', originalPrice: '₹2,199', rating: 4.3, tag: 'New',        category: 'Palazzos', brand: 'Aurelia', size: ['S','M','L','XL'],        color: 'Blue',   img: '/image/women/brand/aurelia/p3.jpg' },
  { id: 116, name: 'Aurelia Embroidered Pants',      price: '₹1,899', originalPrice: '₹3,099', rating: 4.4, tag: null,         category: 'Palazzos', brand: 'Aurelia', size: ['S','M','L','XL','XXL'],  color: 'Yellow', img: '/image/women/brand/aurelia/p4.jpg' },
  { id: 117, name: 'Aurelia Flared Ethnic Pants',    price: '₹1,599', originalPrice: '₹2,599', rating: 4.6, tag: 'Popular',    category: 'Palazzos', brand: 'Aurelia', size: ['S','M','L','XL'],        color: 'Orange', img: '/image/women/brand/aurelia/p5.jpg' },
  { id: 118, name: 'Aurelia Rayon Slim Pants',       price: '₹1,199', originalPrice: '₹1,999', rating: 4.2, tag: 'Sale',       category: 'Palazzos', brand: 'Aurelia', size: ['XS','S','M','L'],        color: 'Grey',   img: '/image/women/brand/aurelia/p6.jpg' },
  { id: 119, name: 'Aurelia Block Print Pants',      price: '₹1,399', originalPrice: '₹2,299', rating: 4.3, tag: 'New',        category: 'Palazzos', brand: 'Aurelia', size: ['S','M','L','XL'],        color: 'Red',    img: '/image/women/brand/aurelia/p7.jpg' },
  { id: 120, name: 'Aurelia Festive Palazzo',        price: '₹1,799', originalPrice: '₹2,999', rating: 4.5, tag: 'Trending',   category: 'Palazzos', brand: 'Aurelia', size: ['S','M','L','XL','XXL'],  color: 'Purple', img: '/image/women/brand/aurelia/p8.jpg' },

  // Libas Dresses

  { id: 121, name: 'Libas Floral A-Line Dress',    price: '₹1,899', originalPrice: '₹2,999', rating: 4.5, tag: 'Bestseller', category: 'Dresses',  brand: 'Libas', size: ['XS','S','M','L'],        color: 'Pink',   img: '/image/women/brand/libas/d1.jpg' },
  { id: 122, name: 'Libas Ethnic Midi Dress',      price: '₹2,199', originalPrice: '₹3,499', rating: 4.4, tag: 'New',        category: 'Dresses',  brand: 'Libas', size: ['S','M','L','XL'],        color: 'Red',    img: '/image/women/brand/libas/d2.jpg' },
  { id: 123, name: 'Libas Printed Wrap Dress',     price: '₹1,699', originalPrice: '₹2,799', rating: 4.3, tag: 'Trending',   category: 'Dresses',  brand: 'Libas', size: ['XS','S','M','L'],        color: 'Yellow', img: '/image/women/brand/libas/d3.jpg' },
  { id: 124, name: 'Libas Cotton Shirt Dress',     price: '₹1,499', originalPrice: '₹2,499', rating: 4.2, tag: null,         category: 'Dresses',  brand: 'Libas', size: ['S','M','L','XL'],        color: 'White',  img: '/image/women/brand/libas/d4.jpg' },
  { id: 125, name: 'Libas Embroidered Dress',      price: '₹2,499', originalPrice: '₹3,999', rating: 4.6, tag: 'Popular',    category: 'Dresses',  brand: 'Libas', size: ['S','M','L','XL','XXL'],  color: 'Purple', img: '/image/women/brand/libas/d5.jpg' },
  { id: 126, name: 'Libas Rayon Flared Dress',     price: '₹1,399', originalPrice: '₹2,299', rating: 4.2, tag: 'Sale',       category: 'Dresses',  brand: 'Libas', size: ['XS','S','M','L'],        color: 'Blue',   img: '/image/women/brand/libas/d6.jpg' },
  { id: 127, name: 'Libas Block Print Dress',      price: '₹1,799', originalPrice: '₹2,999', rating: 4.3, tag: 'Sale',       category: 'Dresses',  brand: 'Libas', size: ['S','M','L','XL'],        color: 'Orange', img: '/image/women/brand/libas/d7.jpg' },
  { id: 128, name: 'Libas Festive Anarkali Dress', price: '₹2,799', originalPrice: '₹4,499', rating: 4.7, tag: 'New',        category: 'Dresses',  brand: 'Libas', size: ['S','M','L','XL','XXL'],  color: 'Red',    img: '/image/women/brand/libas/d8.jpg' },

  { id: 129, name: 'Libas Printed Kurta Top',      price: '₹799',   originalPrice: '₹1,299', rating: 4.3, tag: 'Bestseller', category: 'Tops',     brand: 'Libas', size: ['XS','S','M','L','XL'],   color: 'Pink',   img: '/image/women/brand/libas/t1.jpg' },
  { id: 130, name: 'Libas Embroidered Top',        price: '₹999',   originalPrice: '₹1,599', rating: 4.2, tag: 'Trending',   category: 'Tops',     brand: 'Libas', size: ['S','M','L','XL'],        color: 'White',  img: '/image/women/brand/libas/t2.jpg' },
  { id: 131, name: 'Libas Cotton Floral Top',      price: '₹899',   originalPrice: '₹1,499', rating: 4.4, tag: 'New',        category: 'Tops',     brand: 'Libas', size: ['XS','S','M','L'],        color: 'Yellow', img: '/image/women/brand/libas/t3.jpg' },
  { id: 132, name: 'Libas Solid Tunic Top',        price: '₹699',   originalPrice: '₹1,149', rating: 4.1, tag: null,         category: 'Tops',     brand: 'Libas', size: ['S','M','L','XL'],        color: 'Blue',   img: '/image/women/brand/libas/t4.jpg' },
  { id: 133, name: 'Libas Block Print Top',        price: '₹849',   originalPrice: '₹1,399', rating: 4.2, tag: 'Popular',    category: 'Tops',     brand: 'Libas', size: ['XS','S','M','L'],        color: 'Orange', img: '/image/women/brand/libas/t5.jpg' },
  { id: 134, name: 'Libas Ethnic Crop Top',        price: '₹649',   originalPrice: '₹1,099', rating: 4.0, tag: 'Sale',       category: 'Tops',     brand: 'Libas', size: ['XS','S','M','L'],        color: 'Red',    img: '/image/women/brand/libas/t6.jpg' },
  { id: 135, name: 'Libas Rayon Printed Top',      price: '₹999',   originalPrice: '₹1,699', rating: 4.4, tag: 'New',        category: 'Tops',     brand: 'Libas', size: ['S','M','L','XL'],        color: 'Purple', img: '/image/women/brand/libas/t7.jpg' },
  { id: 136, name: 'Libas Casual Slub Top',        price: '₹749',   originalPrice: '₹1,249', rating: 4.1, tag: 'Sale',       category: 'Tops',     brand: 'Libas', size: ['XS','S','M','L'],        color: 'White',  img: '/image/women/brand/libas/t8.jpg' },

  { id: 137, name: 'Libas Printed Palazzo',        price: '₹1,299', originalPrice: '₹2,099', rating: 4.4, tag: 'Bestseller', category: 'Palazzos', brand: 'Libas', size: ['S','M','L','XL'],        color: 'Pink',   img: '/image/women/brand/libas/p1.jpg' },
  { id: 138, name: 'Libas Wide Leg Pants',         price: '₹1,499', originalPrice: '₹2,399', rating: 4.3, tag: 'Trending',   category: 'Palazzos', brand: 'Libas', size: ['S','M','L','XL'],        color: 'White',  img: '/image/women/brand/libas/p2.jpg' },
  { id: 139, name: 'Libas Cotton Straight Pants',  price: '₹1,099', originalPrice: '₹1,799', rating: 4.2, tag: 'New',        category: 'Palazzos', brand: 'Libas', size: ['S','M','L','XL'],        color: 'Blue',   img: '/image/women/brand/libas/p3.jpg' },
  { id: 140, name: 'Libas Embroidered Pants',      price: '₹1,699', originalPrice: '₹2,799', rating: 4.3, tag: null,         category: 'Palazzos', brand: 'Libas', size: ['S','M','L','XL','XXL'],  color: 'Yellow', img: '/image/women/brand/libas/p4.jpg' },
  { id: 141, name: 'Libas Flared Ethnic Pants',    price: '₹1,399', originalPrice: '₹2,299', rating: 4.5, tag: 'Popular',    category: 'Palazzos', brand: 'Libas', size: ['S','M','L','XL'],        color: 'Orange', img: '/image/women/brand/libas/p5.jpg' },
  { id: 142, name: 'Libas Rayon Slim Pants',       price: '₹999',   originalPrice: '₹1,699', rating: 4.1, tag: 'Sale',       category: 'Palazzos', brand: 'Libas', size: ['XS','S','M','L'],        color: 'Grey',   img: '/image/women/brand/libas/p6.jpg' },
  { id: 143, name: 'Libas Block Print Pants',      price: '₹1,199', originalPrice: '₹1,999', rating: 4.2, tag: 'New',        category: 'Palazzos', brand: 'Libas', size: ['S','M','L','XL'],        color: 'Red',    img: '/image/women/brand/libas/p7.jpg' },
  { id: 144, name: 'Libas Festive Palazzo',        price: '₹1,599', originalPrice: '₹2,599', rating: 4.4, tag: 'Trending',   category: 'Palazzos', brand: 'Libas', size: ['S','M','L','XL','XXL'],  color: 'Purple', img: '/image/women/brand/libas/p8.jpg' },

  // Nykaa Fashion Dresses

  { id: 145, name: 'Nykaa Fashion Floral Dress',       price: '₹1,999', originalPrice: '₹3,199', rating: 4.5, tag: 'Bestseller', category: 'Dresses',  brand: 'Nykaa Fashion', size: ['XS','S','M','L'],        color: 'Pink',   img: '/image/women/brand/nykaa/d1.jpg' },
  { id: 146, name: 'Nykaa Fashion Satin Dress',        price: '₹2,299', originalPrice: '₹3,699', rating: 4.4, tag: 'New',        category: 'Dresses',  brand: 'Nykaa Fashion', size: ['S','M','L','XL'],        color: 'Black',  img: '/image/women/brand/nykaa/d2.jpg' },
  { id: 147, name: 'Nykaa Fashion Wrap Dress',         price: '₹1,799', originalPrice: '₹2,999', rating: 4.3, tag: 'Trending',   category: 'Dresses',  brand: 'Nykaa Fashion', size: ['XS','S','M','L'],        color: 'Red',    img: '/image/women/brand/nykaa/d3.jpg' },
  { id: 148, name: 'Nykaa Fashion Shirt Dress',        price: '₹1,599', originalPrice: '₹2,599', rating: 4.2, tag: null,         category: 'Dresses',  brand: 'Nykaa Fashion', size: ['S','M','L','XL'],        color: 'White',  img: '/image/women/brand/nykaa/d4.jpg' },
  { id: 149, name: 'Nykaa Fashion Embroidered Dress',  price: '₹2,599', originalPrice: '₹4,199', rating: 4.6, tag: 'Popular',    category: 'Dresses',  brand: 'Nykaa Fashion', size: ['S','M','L','XL','XXL'],  color: 'Purple', img: '/image/women/brand/nykaa/d5.jpg' },
  { id: 150, name: 'Nykaa Fashion Rayon Dress',        price: '₹1,499', originalPrice: '₹2,399', rating: 4.2, tag: 'Sale',       category: 'Dresses',  brand: 'Nykaa Fashion', size: ['XS','S','M','L'],        color: 'Yellow', img: '/image/women/brand/nykaa/d6.jpg' },
  { id: 151, name: 'Nykaa Fashion Printed Dress',      price: '₹1,899', originalPrice: '₹3,099', rating: 4.3, tag: 'Sale',       category: 'Dresses',  brand: 'Nykaa Fashion', size: ['S','M','L','XL'],        color: 'Orange', img: '/image/women/brand/nykaa/d7.jpg' },
  { id: 152, name: 'Nykaa Fashion Festive Dress',      price: '₹2,999', originalPrice: '₹4,799', rating: 4.7, tag: 'New',        category: 'Dresses',  brand: 'Nykaa Fashion', size: ['S','M','L','XL','XXL'],  color: 'Red',    img: '/image/women/brand/nykaa/d8.jpg' },
  
  { id: 153, name: 'Nykaa Fashion Printed Top',        price: '₹849',   originalPrice: '₹1,399', rating: 4.3, tag: 'Bestseller', category: 'Tops',     brand: 'Nykaa Fashion', size: ['XS','S','M','L','XL'],   color: 'Pink',   img: '/image/women/brand/nykaa/t1.jpg' },
  { id: 154, name: 'Nykaa Fashion Embroidered Top',    price: '₹1,049', originalPrice: '₹1,699', rating: 4.2, tag: 'Trending',   category: 'Tops',     brand: 'Nykaa Fashion', size: ['S','M','L','XL'],        color: 'White',  img: '/image/women/brand/nykaa/t2.jpg' },
  { id: 155, name: 'Nykaa Fashion Floral Top',         price: '₹949',   originalPrice: '₹1,549', rating: 4.4, tag: 'New',        category: 'Tops',     brand: 'Nykaa Fashion', size: ['XS','S','M','L'],        color: 'Yellow', img: '/image/women/brand/nykaa/t3.jpg' },
  { id: 156, name: 'Nykaa Fashion Solid Top',          price: '₹749',   originalPrice: '₹1,199', rating: 4.1, tag: null,         category: 'Tops',     brand: 'Nykaa Fashion', size: ['S','M','L','XL'],        color: 'Blue',   img: '/image/women/brand/nykaa/t4.jpg' },
  { id: 157, name: 'Nykaa Fashion Block Print Top',    price: '₹899',   originalPrice: '₹1,499', rating: 4.2, tag: 'Popular',    category: 'Tops',     brand: 'Nykaa Fashion', size: ['XS','S','M','L'],        color: 'Orange', img: '/image/women/brand/nykaa/t5.jpg' },
  { id: 158, name: 'Nykaa Fashion Crop Top',           price: '₹699',   originalPrice: '₹1,149', rating: 4.0, tag: 'Sale',       category: 'Tops',     brand: 'Nykaa Fashion', size: ['XS','S','M','L'],        color: 'Red',    img: '/image/women/brand/nykaa/t6.jpg' },
  { id: 159, name: 'Nykaa Fashion Rayon Top',          price: '₹1,049', originalPrice: '₹1,749', rating: 4.4, tag: 'New',        category: 'Tops',     brand: 'Nykaa Fashion', size: ['S','M','L','XL'],        color: 'Purple', img: '/image/women/brand/nykaa/t7.jpg' },
  { id: 160, name: 'Nykaa Fashion Casual Top',         price: '₹799',   originalPrice: '₹1,299', rating: 4.1, tag: 'Sale',       category: 'Tops',     brand: 'Nykaa Fashion', size: ['XS','S','M','L'],        color: 'White',  img: '/image/women/brand/nykaa/t8.jpg' },

  { id: 161, name: 'Nykaa Fashion Printed Palazzo',    price: '₹1,349', originalPrice: '₹2,199', rating: 4.4, tag: 'Bestseller', category: 'Palazzos', brand: 'Nykaa Fashion', size: ['S','M','L','XL'],        color: 'Pink',   img: '/image/women/brand/nykaa/p1.jpg' },
  { id: 162, name: 'Nykaa Fashion Wide Leg Pants',     price: '₹1,549', originalPrice: '₹2,499', rating: 4.3, tag: 'Trending',   category: 'Palazzos', brand: 'Nykaa Fashion', size: ['S','M','L','XL'],        color: 'White',  img: '/image/women/brand/nykaa/p2.jpg' },
  { id: 163, name: 'Nykaa Fashion Straight Pants',     price: '₹1,149', originalPrice: '₹1,899', rating: 4.2, tag: 'New',        category: 'Palazzos', brand: 'Nykaa Fashion', size: ['S','M','L','XL'],        color: 'Blue',   img: '/image/women/brand/nykaa/p3.jpg' },
  { id: 164, name: 'Nykaa Fashion Embroidered Pants',  price: '₹1,749', originalPrice: '₹2,899', rating: 4.3, tag: null,         category: 'Palazzos', brand: 'Nykaa Fashion', size: ['S','M','L','XL','XXL'],  color: 'Yellow', img: '/image/women/brand/nykaa/p4.jpg' },
  { id: 165, name: 'Nykaa Fashion Flared Pants',       price: '₹1,449', originalPrice: '₹2,399', rating: 4.5, tag: 'Popular',    category: 'Palazzos', brand: 'Nykaa Fashion', size: ['S','M','L','XL'],        color: 'Orange', img: '/image/women/brand/nykaa/p5.jpg' },
  { id: 166, name: 'Nykaa Fashion Slim Pants',         price: '₹1,049', originalPrice: '₹1,749', rating: 4.1, tag: 'Sale',       category: 'Palazzos', brand: 'Nykaa Fashion', size: ['XS','S','M','L'],        color: 'Grey',   img: '/image/women/brand/nykaa/p6.jpg' },
  { id: 167, name: 'Nykaa Fashion Block Print Pants',  price: '₹1,249', originalPrice: '₹2,099', rating: 4.2, tag: 'New',        category: 'Palazzos', brand: 'Nykaa Fashion', size: ['S','M','L','XL'],        color: 'Red',    img: '/image/women/brand/nykaa/p7.jpg' },
  { id: 168, name: 'Nykaa Fashion Festive Palazzo',    price: '₹1,649', originalPrice: '₹2,699', rating: 4.4, tag: 'Trending',   category: 'Palazzos', brand: 'Nykaa Fashion', size: ['S','M','L','XL','XXL'],  color: 'Purple', img: '/image/women/brand/nykaa/p8.jpg' },

  // Biba Dresses

  { id: 169, name: 'Biba Floral A-Line Dress',    price: '₹1,899', originalPrice: '₹2,999', rating: 4.5, tag: 'Bestseller', category: 'Dresses',  brand: 'Biba', size: ['XS','S','M','L'],        color: 'Pink',   img: '/image/women/brand/biba/d1.jpg' },
  { id: 170, name: 'Biba Ethnic Midi Dress',      price: '₹2,199', originalPrice: '₹3,499', rating: 4.4, tag: 'New',        category: 'Dresses',  brand: 'Biba', size: ['S','M','L','XL'],        color: 'Red',    img: '/image/women/brand/biba/d2.jpg' },
  { id: 171, name: 'Biba Printed Wrap Dress',     price: '₹1,699', originalPrice: '₹2,799', rating: 4.3, tag: 'Trending',   category: 'Dresses',  brand: 'Biba', size: ['XS','S','M','L'],        color: 'Yellow', img: '/image/women/brand/biba/d3.jpg' },
  { id: 172, name: 'Biba Cotton Shirt Dress',     price: '₹1,499', originalPrice: '₹2,499', rating: 4.2, tag: null,         category: 'Dresses',  brand: 'Biba', size: ['S','M','L','XL'],        color: 'White',  img: '/image/women/brand/biba/d4.jpg' },
  { id: 173, name: 'Biba Embroidered Dress',      price: '₹2,499', originalPrice: '₹3,999', rating: 4.6, tag: 'Popular',    category: 'Dresses',  brand: 'Biba', size: ['S','M','L','XL','XXL'],  color: 'Purple', img: '/image/women/brand/biba/d5.jpg' },
  { id: 174, name: 'Biba Rayon Flared Dress',     price: '₹1,399', originalPrice: '₹2,299', rating: 4.2, tag: 'Sale',       category: 'Dresses',  brand: 'Biba', size: ['XS','S','M','L'],        color: 'Blue',   img: '/image/women/brand/biba/d6.jpg' },
  { id: 175, name: 'Biba Block Print Dress',      price: '₹1,799', originalPrice: '₹2,999', rating: 4.3, tag: 'Sale',       category: 'Dresses',  brand: 'Biba', size: ['S','M','L','XL'],        color: 'Orange', img: '/image/women/brand/biba/d7.jpg' },
  { id: 176, name: 'Biba Festive Anarkali Dress', price: '₹2,799', originalPrice: '₹4,499', rating: 4.7, tag: 'New',        category: 'Dresses',  brand: 'Biba', size: ['S','M','L','XL','XXL'],  color: 'Red',    img: '/image/women/brand/biba/d8.jpg' },

  { id: 177, name: 'Biba Printed Kurta Top',      price: '₹799',   originalPrice: '₹1,299', rating: 4.3, tag: 'Bestseller', category: 'Tops',     brand: 'Biba', size: ['XS','S','M','L','XL'],   color: 'Pink',   img: '/image/women/brand/biba/t1.jpg' },
  { id: 178, name: 'Biba Embroidered Top',        price: '₹999',   originalPrice: '₹1,599', rating: 4.2, tag: 'Trending',   category: 'Tops',     brand: 'Biba', size: ['S','M','L','XL'],        color: 'White',  img: '/image/women/brand/biba/t2.jpg' },
  { id: 179, name: 'Biba Cotton Floral Top',      price: '₹899',   originalPrice: '₹1,499', rating: 4.4, tag: 'New',        category: 'Tops',     brand: 'Biba', size: ['XS','S','M','L'],        color: 'Yellow', img: '/image/women/brand/biba/t3.jpg' },
  { id: 180, name: 'Biba Solid Tunic Top',        price: '₹699',   originalPrice: '₹1,149', rating: 4.1, tag: null,         category: 'Tops',     brand: 'Biba', size: ['S','M','L','XL'],        color: 'Blue',   img: '/image/women/brand/biba/t4.jpg' },
  { id: 181, name: 'Biba Block Print Top',        price: '₹849',   originalPrice: '₹1,399', rating: 4.2, tag: 'Popular',    category: 'Tops',     brand: 'Biba', size: ['XS','S','M','L'],        color: 'Orange', img: '/image/women/brand/biba/t5.jpg' },
  { id: 182, name: 'Biba Ethnic Crop Top',        price: '₹649',   originalPrice: '₹1,099', rating: 4.0, tag: 'Sale',       category: 'Tops',     brand: 'Biba', size: ['XS','S','M','L'],        color: 'Red',    img: '/image/women/brand/biba/t6.jpg' },
  { id: 183, name: 'Biba Rayon Printed Top',      price: '₹999',   originalPrice: '₹1,699', rating: 4.4, tag: 'New',        category: 'Tops',     brand: 'Biba', size: ['S','M','L','XL'],        color: 'Purple', img: '/image/women/brand/biba/t7.jpg' },
  { id: 184, name: 'Biba Casual Slub Top',        price: '₹749',   originalPrice: '₹1,249', rating: 4.1, tag: 'Sale',       category: 'Tops',     brand: 'Biba', size: ['XS','S','M','L'],        color: 'White',  img: '/image/women/brand/biba/t8.jpg' },

  { id: 185, name: 'Biba Printed Palazzo',        price: '₹1,299', originalPrice: '₹2,099', rating: 4.4, tag: 'Bestseller', category: 'Palazzos', brand: 'Biba', size: ['S','M','L','XL'],        color: 'Pink',   img: '/image/women/brand/biba/p1.jpg' },
  { id: 186, name: 'Biba Wide Leg Pants',         price: '₹1,499', originalPrice: '₹2,399', rating: 4.3, tag: 'Trending',   category: 'Palazzos', brand: 'Biba', size: ['S','M','L','XL'],        color: 'White',  img: '/image/women/brand/biba/p2.jpg' },
  { id: 187, name: 'Biba Cotton Straight Pants',  price: '₹1,099', originalPrice: '₹1,799', rating: 4.2, tag: 'New',        category: 'Palazzos', brand: 'Biba', size: ['S','M','L','XL'],        color: 'Blue',   img: '/image/women/brand/biba/p3.jpg' },
  { id: 188, name: 'Biba Embroidered Pants',      price: '₹1,699', originalPrice: '₹2,799', rating: 4.3, tag: null,         category: 'Palazzos', brand: 'Biba', size: ['S','M','L','XL','XXL'],  color: 'Yellow', img: '/image/women/brand/biba/p4.jpg' },
  { id: 189, name: 'Biba Flared Ethnic Pants',    price: '₹1,399', originalPrice: '₹2,299', rating: 4.5, tag: 'Popular',    category: 'Palazzos', brand: 'Biba', size: ['S','M','L','XL'],        color: 'Orange', img: '/image/women/brand/biba/p5.jpg' },
  { id: 190, name: 'Biba Rayon Slim Pants',       price: '₹999',   originalPrice: '₹1,699', rating: 4.1, tag: 'Sale',       category: 'Palazzos', brand: 'Biba', size: ['XS','S','M','L'],        color: 'Grey',   img: '/image/women/brand/biba/p6.jpg' },
  { id: 191, name: 'Biba Block Print Pants',      price: '₹1,199', originalPrice: '₹1,999', rating: 4.2, tag: 'New',        category: 'Palazzos', brand: 'Biba', size: ['S','M','L','XL'],        color: 'Red',    img: '/image/women/brand/biba/p7.jpg' },
  { id: 192, name: 'Biba Festive Palazzo',        price: '₹1,599', originalPrice: '₹2,599', rating: 4.4, tag: 'Trending',   category: 'Palazzos', brand: 'Biba', size: ['S','M','L','XL','XXL'],  color: 'Purple', img: '/image/women/brand/biba/p8.jpg' },

  // Vero Moda Dresses

  { id: 193, name: 'Vero Moda Floral Midi Dress',        price: '₹2,299', originalPrice: '₹3,699', rating: 4.5, tag: 'Bestseller', category: 'Dresses',  brand: 'Vero Moda', size: ['XS','S','M','L'],        color: 'Pink',   img: '/image/women/brand/vero/d1.jpg' },
  { id: 194, name: 'Vero Moda Satin Wrap Dress',         price: '₹2,599', originalPrice: '₹4,099', rating: 4.4, tag: 'New',        category: 'Dresses',  brand: 'Vero Moda', size: ['XS','S','M','L'],        color: 'Black',  img: '/image/women/brand/vero/d2.jpg' },
  { id: 195, name: 'Vero Moda Printed Mini Dress',       price: '₹1,999', originalPrice: '₹3,299', rating: 4.3, tag: 'Trending',   category: 'Dresses',  brand: 'Vero Moda', size: ['XS','S','M','L'],        color: 'Yellow', img: '/image/women/brand/vero/d3.jpg' },
  { id: 196, name: 'Vero Moda Linen Shirt Dress',        price: '₹1,799', originalPrice: '₹2,999', rating: 4.2, tag: null,         category: 'Dresses',  brand: 'Vero Moda', size: ['S','M','L','XL'],        color: 'White',  img: '/image/women/brand/vero/d4.jpg' },
  { id: 197, name: 'Vero Moda Bodycon Dress',            price: '₹2,799', originalPrice: '₹4,499', rating: 4.6, tag: 'Popular',    category: 'Dresses',  brand: 'Vero Moda', size: ['XS','S','M','L'],        color: 'Black',  img: '/image/women/brand/vero/d5.jpg' },
  { id: 198, name: 'Vero Moda Cotton Sundress',          price: '₹1,599', originalPrice: '₹2,599', rating: 4.2, tag: 'Sale',       category: 'Dresses',  brand: 'Vero Moda', size: ['S','M','L','XL'],        color: 'Pink',   img: '/image/women/brand/vero/d6.jpg' },
  { id: 199, name: 'Vero Moda Ruffle Dress',             price: '₹2,099', originalPrice: '₹3,399', rating: 4.3, tag: 'Sale',       category: 'Dresses',  brand: 'Vero Moda', size: ['XS','S','M'],            color: 'Red',    img: '/image/women/brand/vero/d7.jpg' },
  { id: 200, name: 'Vero Moda Maxi Boho Dress',          price: '₹3,099', originalPrice: '₹4,999', rating: 4.7, tag: 'New',        category: 'Dresses',  brand: 'Vero Moda', size: ['S','M','L','XL'],        color: 'Yellow', img: '/image/women/brand/vero/d8.jpg' },

  { id: 201, name: 'Vero Moda Basic Crop Tee',           price: '₹899',   originalPrice: '₹1,499', rating: 4.3, tag: 'Bestseller', category: 'T-Shirts', brand: 'Vero Moda', size: ['XS','S','M','L'],        color: 'White',  img: '/image/women/brand/vero/t1.jpg' },
  { id: 202, name: 'Vero Moda Graphic Print Tee',        price: '₹1,099', originalPrice: '₹1,799', rating: 4.2, tag: 'Trending',   category: 'T-Shirts', brand: 'Vero Moda', size: ['XS','S','M','L'],        color: 'Grey',   img: '/image/women/brand/vero/t2.jpg' },
  { id: 203, name: 'Vero Moda Oversized Tee',            price: '₹1,199', originalPrice: '₹1,999', rating: 4.4, tag: 'New',        category: 'T-Shirts', brand: 'Vero Moda', size: ['S','M','L','XL'],        color: 'Black',  img: '/image/women/brand/vero/t3.jpg' },
  { id: 204, name: 'Vero Moda Ribbed Slim Tee',          price: '₹799',   originalPrice: '₹1,299', rating: 4.1, tag: null,         category: 'T-Shirts', brand: 'Vero Moda', size: ['XS','S','M','L'],        color: 'White',  img: '/image/women/brand/vero/t4.jpg' },
  { id: 205, name: 'Vero Moda Striped Tee',              price: '₹949',   originalPrice: '₹1,599', rating: 4.2, tag: 'Popular',    category: 'T-Shirts', brand: 'Vero Moda', size: ['XS','S','M'],            color: 'Blue',   img: '/image/women/brand/vero/t5.jpg' },
  { id: 206, name: 'Vero Moda V-Neck Tee',               price: '₹749',   originalPrice: '₹1,249', rating: 4.0, tag: 'Sale',       category: 'T-Shirts', brand: 'Vero Moda', size: ['XS','S','M','L'],        color: 'Grey',   img: '/image/women/brand/vero/t6.jpg' },
  { id: 207, name: 'Vero Moda Knotted Tee',              price: '₹1,049', originalPrice: '₹1,749', rating: 4.5, tag: 'New',        category: 'T-Shirts', brand: 'Vero Moda', size: ['XS','S','M','L'],        color: 'Pink',   img: '/image/women/brand/vero/t7.jpg' },
  { id: 208, name: 'Vero Moda Cotton Round Neck Tee',    price: '₹849',   originalPrice: '₹1,399', rating: 4.1, tag: 'Sale',       category: 'T-Shirts', brand: 'Vero Moda', size: ['XS','S','M','L'],        color: 'White',  img: '/image/women/brand/vero/t8.jpg' },

  { id: 209, name: 'Vero Moda High Waist Skinny Jeans',  price: '₹2,199', originalPrice: '₹3,499', rating: 4.5, tag: 'Bestseller', category: 'Jeans',    brand: 'Vero Moda', size: ['XS','S','M','L'],        color: 'Blue',   img: '/image/women/brand/vero/p1.jpg' },
  { id: 210, name: 'Vero Moda Wide Leg Jeans',           price: '₹2,499', originalPrice: '₹3,999', rating: 4.4, tag: 'Trending',   category: 'Jeans',    brand: 'Vero Moda', size: ['S','M','L','XL'],        color: 'Black',  img: '/image/women/brand/vero/p2.jpg' },
  { id: 211, name: 'Vero Moda Straight Fit Jeans',       price: '₹1,999', originalPrice: '₹3,199', rating: 4.3, tag: 'New',        category: 'Jeans',    brand: 'Vero Moda', size: ['S','M','L','XL'],        color: 'Blue',   img: '/image/women/brand/vero/p3.jpg' },
  { id: 212, name: 'Vero Moda Mom Jeans',                price: '₹2,299', originalPrice: '₹3,699', rating: 4.2, tag: null,         category: 'Jeans',    brand: 'Vero Moda', size: ['XS','S','M','L'],        color: 'Grey',   img: '/image/women/brand/vero/p4.jpg' },
  { id: 213, name: 'Vero Moda Flared Jeans',             price: '₹2,599', originalPrice: '₹4,199', rating: 4.6, tag: 'Popular',    category: 'Jeans',    brand: 'Vero Moda', size: ['XS','S','M','L'],        color: 'Blue',   img: '/image/women/brand/vero/p5.jpg' },
  { id: 214, name: 'Vero Moda Ripped Jeans',             price: '₹1,899', originalPrice: '₹2,999', rating: 4.1, tag: 'Sale',       category: 'Jeans',    brand: 'Vero Moda', size: ['XS','S','M','L'],        color: 'Black',  img: '/image/women/brand/vero/p6.jpg' },
  { id: 215, name: 'Vero Moda Cropped Jeans',            price: '₹2,099', originalPrice: '₹3,399', rating: 4.3, tag: 'New',        category: 'Jeans',    brand: 'Vero Moda', size: ['S','M','L','XL'],        color: 'Blue',   img: '/image/women/brand/vero/p7.jpg' },
  { id: 216, name: 'Vero Moda Boyfriend Jeans',          price: '₹2,399', originalPrice: '₹3,799', rating: 4.4, tag: 'Trending',   category: 'Jeans',    brand: 'Vero Moda', size: ['S','M','L','XL'],        color: 'Grey',   img: '/image/women/brand/vero/p8.jpg' },

  // Shein Dresses

  { id: 217, name: 'Shein Floral Midi Dress',        price: '₹999',   originalPrice: '₹1,799', rating: 4.3, tag: 'Bestseller', category: 'Dresses',  brand: 'Shein', size: ['XS','S','M','L'],        color: 'Pink',   img: '/image/women/brand/shein/d1.jpg' },
  { id: 218, name: 'Shein Satin Wrap Dress',         price: '₹1,199', originalPrice: '₹2,099', rating: 4.2, tag: 'New',        category: 'Dresses',  brand: 'Shein', size: ['XS','S','M','L'],        color: 'Black',  img: '/image/women/brand/shein/d2.jpg' },
  { id: 219, name: 'Shein Printed Mini Dress',       price: '₹899',   originalPrice: '₹1,599', rating: 4.1, tag: 'Trending',   category: 'Dresses',  brand: 'Shein', size: ['XS','S','M','L'],        color: 'Yellow', img: '/image/women/brand/shein/d3.jpg' },
  { id: 220, name: 'Shein Linen Shirt Dress',        price: '₹799',   originalPrice: '₹1,399', rating: 4.0, tag: null,         category: 'Dresses',  brand: 'Shein', size: ['S','M','L','XL'],        color: 'White',  img: '/image/women/brand/shein/d4.jpg' },
  { id: 221, name: 'Shein Bodycon Dress',            price: '₹1,299', originalPrice: '₹2,299', rating: 4.4, tag: 'Popular',    category: 'Dresses',  brand: 'Shein', size: ['XS','S','M','L'],        color: 'Black',  img: '/image/women/brand/shein/d5.jpg' },
  { id: 222, name: 'Shein Cotton Sundress',          price: '₹699',   originalPrice: '₹1,299', rating: 4.1, tag: 'Sale',       category: 'Dresses',  brand: 'Shein', size: ['S','M','L','XL'],        color: 'Pink',   img: '/image/women/brand/shein/d6.jpg' },
  { id: 223, name: 'Shein Ruffle Mini Dress',        price: '₹949',   originalPrice: '₹1,699', rating: 4.2, tag: 'Sale',       category: 'Dresses',  brand: 'Shein', size: ['XS','S','M'],            color: 'Red',    img: '/image/women/brand/shein/d7.jpg' },
  { id: 224, name: 'Shein Maxi Boho Dress',          price: '₹1,499', originalPrice: '₹2,599', rating: 4.5, tag: 'New',        category: 'Dresses',  brand: 'Shein', size: ['S','M','L','XL'],        color: 'Yellow', img: '/image/women/brand/shein/d8.jpg' },

  { id: 225, name: 'Shein Basic Crop Tee',           price: '₹399',   originalPrice: '₹699',   rating: 4.1, tag: 'Bestseller', category: 'T-Shirts', brand: 'Shein', size: ['XS','S','M','L'],        color: 'White',  img: '/image/women/brand/shein/t1.jpg' },
  { id: 226, name: 'Shein Graphic Print Tee',        price: '₹499',   originalPrice: '₹899',   rating: 4.0, tag: 'Trending',   category: 'T-Shirts', brand: 'Shein', size: ['XS','S','M','L'],        color: 'Grey',   img: '/image/women/brand/shein/t2.jpg' },
  { id: 227, name: 'Shein Oversized Tee',            price: '₹549',   originalPrice: '₹999',   rating: 4.2, tag: 'New',        category: 'T-Shirts', brand: 'Shein', size: ['S','M','L','XL'],        color: 'Black',  img: '/image/women/brand/shein/t3.jpg' },
  { id: 228, name: 'Shein Ribbed Slim Tee',          price: '₹349',   originalPrice: '₹649',   rating: 4.0, tag: null,         category: 'T-Shirts', brand: 'Shein', size: ['XS','S','M','L'],        color: 'White',  img: '/image/women/brand/shein/t4.jpg' },
  { id: 229, name: 'Shein Striped Tee',              price: '₹449',   originalPrice: '₹799',   rating: 4.1, tag: 'Popular',    category: 'T-Shirts', brand: 'Shein', size: ['XS','S','M'],            color: 'Blue',   img: '/image/women/brand/shein/t5.jpg' },
  { id: 230, name: 'Shein V-Neck Tee',               price: '₹299',   originalPrice: '₹599',   rating: 3.9, tag: 'Sale',       category: 'T-Shirts', brand: 'Shein', size: ['XS','S','M','L'],        color: 'Grey',   img: '/image/women/brand/shein/t6.jpg' },
  { id: 231, name: 'Shein Knotted Tee',              price: '₹599',   originalPrice: '₹1,099', rating: 4.3, tag: 'New',        category: 'T-Shirts', brand: 'Shein', size: ['XS','S','M','L'],        color: 'Pink',   img: '/image/women/brand/shein/t7.jpg' },
  { id: 232, name: 'Shein Cotton Round Neck Tee',    price: '₹399',   originalPrice: '₹749',   rating: 4.0, tag: 'Sale',       category: 'T-Shirts', brand: 'Shein', size: ['XS','S','M','L'],        color: 'White',  img: '/image/women/brand/shein/t8.jpg' },

  { id: 233, name: 'Shein High Waist Skinny Jeans',  price: '₹999',   originalPrice: '₹1,799', rating: 4.2, tag: 'Bestseller', category: 'Jeans',    brand: 'Shein', size: ['XS','S','M','L'],        color: 'Blue',   img: '/image/women/brand/shein/p1.jpg' },
  { id: 234, name: 'Shein Wide Leg Jeans',           price: '₹1,199', originalPrice: '₹2,099', rating: 4.1, tag: 'Trending',   category: 'Jeans',    brand: 'Shein', size: ['S','M','L','XL'],        color: 'Black',  img: '/image/women/brand/shein/p2.jpg' },
  { id: 235, name: 'Shein Straight Fit Jeans',       price: '₹899',   originalPrice: '₹1,599', rating: 4.0, tag: 'New',        category: 'Jeans',    brand: 'Shein', size: ['S','M','L','XL'],        color: 'Blue',   img: '/image/women/brand/shein/p3.jpg' },
  { id: 236, name: 'Shein Mom Jeans',                price: '₹1,099', originalPrice: '₹1,899', rating: 4.1, tag: null,         category: 'Jeans',    brand: 'Shein', size: ['XS','S','M','L'],        color: 'Grey',   img: '/image/women/brand/shein/p4.jpg' },
  { id: 237, name: 'Shein Flared Jeans',             price: '₹1,299', originalPrice: '₹2,299', rating: 4.3, tag: 'Popular',    category: 'Jeans',    brand: 'Shein', size: ['XS','S','M','L'],        color: 'Blue',   img: '/image/women/brand/shein/p5.jpg' },
  { id: 238, name: 'Shein Ripped Jeans',             price: '₹849',   originalPrice: '₹1,499', rating: 4.0, tag: 'Sale',       category: 'Jeans',    brand: 'Shein', size: ['XS','S','M','L'],        color: 'Black',  img: '/image/women/brand/shein/p6.jpg' },
  { id: 239, name: 'Shein Cropped Jeans',            price: '₹949',   originalPrice: '₹1,699', rating: 4.1, tag: 'New',        category: 'Jeans',    brand: 'Shein', size: ['S','M','L','XL'],        color: 'Blue',   img: '/image/women/brand/shein/p7.jpg' },
  { id: 240, name: 'Shein Boyfriend Jeans',          price: '₹1,149', originalPrice: '₹1,999', rating: 4.2, tag: 'Trending',   category: 'Jeans',    brand: 'Shein', size: ['S','M','L','XL'],        color: 'Grey',   img: '/image/women/brand/shein/p8.jpg' },

  // Fabindia Dresses

  { id: 241, name: 'Fabindia Floral Kurta Dress',    price: '₹2,499', originalPrice: '₹3,999', rating: 4.6, tag: 'Bestseller', category: 'Dresses',  brand: 'Fabindia', size: ['XS','S','M','L'],        color: 'Pink',   img: '/image/women/brand/fabindia/d1.jpg' },
  { id: 242, name: 'Fabindia Block Print Dress',     price: '₹2,799', originalPrice: '₹4,499', rating: 4.5, tag: 'New',        category: 'Dresses',  brand: 'Fabindia', size: ['S','M','L','XL'],        color: 'Blue',   img: '/image/women/brand/fabindia/d2.jpg' },
  { id: 243, name: 'Fabindia Cotton Wrap Dress',     price: '₹2,199', originalPrice: '₹3,499', rating: 4.4, tag: 'Trending',   category: 'Dresses',  brand: 'Fabindia', size: ['XS','S','M','L'],        color: 'Yellow', img: '/image/women/brand/fabindia/d3.jpg' },
  { id: 244, name: 'Fabindia Handloom Shirt Dress',  price: '₹1,999', originalPrice: '₹3,199', rating: 4.3, tag: null,         category: 'Dresses',  brand: 'Fabindia', size: ['S','M','L','XL'],        color: 'White',  img: '/image/women/brand/fabindia/d4.jpg' },
  { id: 245, name: 'Fabindia Embroidered Dress',     price: '₹3,199', originalPrice: '₹4,999', rating: 4.7, tag: 'Popular',    category: 'Dresses',  brand: 'Fabindia', size: ['S','M','L','XL','XXL'],  color: 'Red',    img: '/image/women/brand/fabindia/d5.jpg' },
  { id: 246, name: 'Fabindia Khadi Flared Dress',    price: '₹1,799', originalPrice: '₹2,999', rating: 4.2, tag: 'Sale',       category: 'Dresses',  brand: 'Fabindia', size: ['XS','S','M','L'],        color: 'Orange', img: '/image/women/brand/fabindia/d6.jpg' },
  { id: 247, name: 'Fabindia Ikat Print Dress',      price: '₹2,299', originalPrice: '₹3,699', rating: 4.3, tag: 'Sale',       category: 'Dresses',  brand: 'Fabindia', size: ['S','M','L','XL'],        color: 'Purple', img: '/image/women/brand/fabindia/d7.jpg' },
  { id: 248, name: 'Fabindia Festive Anarkali',      price: '₹3,499', originalPrice: '₹5,499', rating: 4.8, tag: 'New',        category: 'Dresses',  brand: 'Fabindia', size: ['S','M','L','XL','XXL'],  color: 'Red',    img: '/image/women/brand/fabindia/d8.jpg' },

  { id: 249, name: 'Fabindia Printed Kurta Top',     price: '₹999',   originalPrice: '₹1,599', rating: 4.4, tag: 'Bestseller', category: 'Tops',     brand: 'Fabindia', size: ['XS','S','M','L','XL'],   color: 'Pink',   img: '/image/women/brand/fabindia/t1.jpg' },
  { id: 250, name: 'Fabindia Embroidered Top',       price: '₹1,199', originalPrice: '₹1,999', rating: 4.3, tag: 'Trending',   category: 'Tops',     brand: 'Fabindia', size: ['S','M','L','XL'],        color: 'White',  img: '/image/women/brand/fabindia/t2.jpg' },
  { id: 251, name: 'Fabindia Cotton Floral Top',     price: '₹1,099', originalPrice: '₹1,799', rating: 4.5, tag: 'New',        category: 'Tops',     brand: 'Fabindia', size: ['XS','S','M','L'],        color: 'Yellow', img: '/image/women/brand/fabindia/t3.jpg' },
  { id: 252, name: 'Fabindia Solid Khadi Top',       price: '₹899',   originalPrice: '₹1,499', rating: 4.2, tag: null,         category: 'Tops',     brand: 'Fabindia', size: ['S','M','L','XL'],        color: 'White',  img: '/image/women/brand/fabindia/t4.jpg' },
  { id: 253, name: 'Fabindia Block Print Top',       price: '₹1,049', originalPrice: '₹1,699', rating: 4.3, tag: 'Popular',    category: 'Tops',     brand: 'Fabindia', size: ['XS','S','M','L'],        color: 'Blue',   img: '/image/women/brand/fabindia/t5.jpg' },
  { id: 254, name: 'Fabindia Ikat Crop Top',         price: '₹849',   originalPrice: '₹1,399', rating: 4.1, tag: 'Sale',       category: 'Tops',     brand: 'Fabindia', size: ['XS','S','M','L'],        color: 'Orange', img: '/image/women/brand/fabindia/t6.jpg' },
  { id: 255, name: 'Fabindia Handloom Printed Top',  price: '₹1,249', originalPrice: '₹1,999', rating: 4.5, tag: 'New',        category: 'Tops',     brand: 'Fabindia', size: ['S','M','L','XL'],        color: 'Purple', img: '/image/women/brand/fabindia/t7.jpg' },
  { id: 256, name: 'Fabindia Casual Cotton Top',     price: '₹949',   originalPrice: '₹1,549', rating: 4.2, tag: 'Sale',       category: 'Tops',     brand: 'Fabindia', size: ['XS','S','M','L'],        color: 'White',  img: '/image/women/brand/fabindia/t8.jpg' },

  { id: 257, name: 'Fabindia Printed Palazzo',       price: '₹1,599', originalPrice: '₹2,599', rating: 4.5, tag: 'Bestseller', category: 'Palazzos', brand: 'Fabindia', size: ['S','M','L','XL'],        color: 'Pink',   img: '/image/women/brand/fabindia/p1.jpg' },
  { id: 258, name: 'Fabindia Wide Leg Pants',        price: '₹1,799', originalPrice: '₹2,899', rating: 4.4, tag: 'Trending',   category: 'Palazzos', brand: 'Fabindia', size: ['S','M','L','XL'],        color: 'White',  img: '/image/women/brand/fabindia/p2.jpg' },
  { id: 259, name: 'Fabindia Cotton Straight Pants', price: '₹1,399', originalPrice: '₹2,299', rating: 4.3, tag: 'New',        category: 'Palazzos', brand: 'Fabindia', size: ['S','M','L','XL'],        color: 'Blue',   img: '/image/women/brand/fabindia/p3.jpg' },
  { id: 260, name: 'Fabindia Embroidered Pants',     price: '₹1,999', originalPrice: '₹3,199', rating: 4.4, tag: null,         category: 'Palazzos', brand: 'Fabindia', size: ['S','M','L','XL','XXL'],  color: 'Yellow', img: '/image/women/brand/fabindia/p4.jpg' },
  { id: 261, name: 'Fabindia Flared Khadi Pants',    price: '₹1,699', originalPrice: '₹2,799', rating: 4.6, tag: 'Popular',    category: 'Palazzos', brand: 'Fabindia', size: ['S','M','L','XL'],        color: 'Orange', img: '/image/women/brand/fabindia/p5.jpg' },
  { id: 262, name: 'Fabindia Ikat Slim Pants',       price: '₹1,299', originalPrice: '₹2,099', rating: 4.2, tag: 'Sale',       category: 'Palazzos', brand: 'Fabindia', size: ['XS','S','M','L'],        color: 'Grey',   img: '/image/women/brand/fabindia/p6.jpg' },
  { id: 263, name: 'Fabindia Block Print Pants',     price: '₹1,499', originalPrice: '₹2,399', rating: 4.3, tag: 'New',        category: 'Palazzos', brand: 'Fabindia', size: ['S','M','L','XL'],        color: 'Red',    img: '/image/women/brand/fabindia/p7.jpg' },
  { id: 264, name: 'Fabindia Festive Palazzo',       price: '₹1,899', originalPrice: '₹2,999', rating: 4.5, tag: 'Trending',   category: 'Palazzos', brand: 'Fabindia', size: ['S','M','L','XL','XXL'],  color: 'Purple', img: '/image/women/brand/fabindia/p8.jpg' },

  // Only Dresses

  { id: 265, name: 'Only Floral Midi Dress',        price: '₹2,199', originalPrice: '₹3,499', rating: 4.5, tag: 'Bestseller', category: 'Dresses',  brand: 'Only', size: ['XS','S','M','L'],        color: 'Pink',   img: '/image/women/brand/only/d1.jpg' },
  { id: 266, name: 'Only Satin Wrap Dress',         price: '₹2,499', originalPrice: '₹3,999', rating: 4.4, tag: 'New',        category: 'Dresses',  brand: 'Only', size: ['XS','S','M','L'],        color: 'Black',  img: '/image/women/brand/only/d2.jpg' },
  { id: 267, name: 'Only Printed Mini Dress',       price: '₹1,899', originalPrice: '₹2,999', rating: 4.3, tag: 'Trending',   category: 'Dresses',  brand: 'Only', size: ['XS','S','M','L'],        color: 'Yellow', img: '/image/women/brand/only/d3.jpg' },
  { id: 268, name: 'Only Linen Shirt Dress',        price: '₹1,699', originalPrice: '₹2,799', rating: 4.2, tag: null,         category: 'Dresses',  brand: 'Only', size: ['S','M','L','XL'],        color: 'White',  img: '/image/women/brand/only/d4.jpg' },
  { id: 269, name: 'Only Bodycon Dress',            price: '₹2,699', originalPrice: '₹4,299', rating: 4.6, tag: 'Popular',    category: 'Dresses',  brand: 'Only', size: ['XS','S','M','L'],        color: 'Black',  img: '/image/women/brand/only/d5.jpg' },
  { id: 270, name: 'Only Cotton Sundress',          price: '₹1,499', originalPrice: '₹2,399', rating: 4.2, tag: 'Sale',       category: 'Dresses',  brand: 'Only', size: ['S','M','L','XL'],        color: 'Pink',   img: '/image/women/brand/only/d6.jpg' },
  { id: 271, name: 'Only Ruffle Mini Dress',        price: '₹1,999', originalPrice: '₹3,199', rating: 4.3, tag: 'Sale',       category: 'Dresses',  brand: 'Only', size: ['XS','S','M'],            color: 'Red',    img: '/image/women/brand/only/d7.jpg' },
  { id: 272, name: 'Only Maxi Boho Dress',          price: '₹2,899', originalPrice: '₹4,699', rating: 4.7, tag: 'New',        category: 'Dresses',  brand: 'Only', size: ['S','M','L','XL'],        color: 'Yellow', img: '/image/women/brand/only/d8.jpg' },

  { id: 273, name: 'Only Basic Crop Tee',           price: '₹849',   originalPrice: '₹1,399', rating: 4.3, tag: 'Bestseller', category: 'T-Shirts', brand: 'Only', size: ['XS','S','M','L'],        color: 'White',  img: '/image/women/brand/only/t1.jpg' },
  { id: 274, name: 'Only Graphic Print Tee',        price: '₹999',   originalPrice: '₹1,699', rating: 4.2, tag: 'Trending',   category: 'T-Shirts', brand: 'Only', size: ['XS','S','M','L'],        color: 'Grey',   img: '/image/women/brand/only/t2.jpg' },
  { id: 275, name: 'Only Oversized Tee',            price: '₹1,099', originalPrice: '₹1,799', rating: 4.4, tag: 'New',        category: 'T-Shirts', brand: 'Only', size: ['S','M','L','XL'],        color: 'Black',  img: '/image/women/brand/only/t3.jpg' },
  { id: 276, name: 'Only Ribbed Slim Tee',          price: '₹749',   originalPrice: '₹1,249', rating: 4.1, tag: null,         category: 'T-Shirts', brand: 'Only', size: ['XS','S','M','L'],        color: 'White',  img: '/image/women/brand/only/t4.jpg' },
  { id: 277, name: 'Only Striped Tee',              price: '₹899',   originalPrice: '₹1,499', rating: 4.2, tag: 'Popular',    category: 'T-Shirts', brand: 'Only', size: ['XS','S','M'],            color: 'Blue',   img: '/image/women/brand/only/t5.jpg' },
  { id: 278, name: 'Only V-Neck Tee',               price: '₹699',   originalPrice: '₹1,149', rating: 4.0, tag: 'Sale',       category: 'T-Shirts', brand: 'Only', size: ['XS','S','M','L'],        color: 'Grey',   img: '/image/women/brand/only/t6.jpg' },
  { id: 279, name: 'Only Knotted Tee',              price: '₹999',   originalPrice: '₹1,649', rating: 4.4, tag: 'New',        category: 'T-Shirts', brand: 'Only', size: ['XS','S','M','L'],        color: 'Pink',   img: '/image/women/brand/only/t7.jpg' },
  { id: 280, name: 'Only Cotton Round Neck Tee',    price: '₹799',   originalPrice: '₹1,299', rating: 4.1, tag: 'Sale',       category: 'T-Shirts', brand: 'Only', size: ['XS','S','M','L'],        color: 'White',  img: '/image/women/brand/only/t8.jpg' },

  { id: 281, name: 'Only High Waist Skinny Jeans',  price: '₹2,099', originalPrice: '₹3,299', rating: 4.5, tag: 'Bestseller', category: 'Jeans',    brand: 'Only', size: ['XS','S','M','L'],        color: 'Blue',   img: '/image/women/brand/only/p1.jpg' },
  { id: 282, name: 'Only Wide Leg Jeans',           price: '₹2,399', originalPrice: '₹3,799', rating: 4.4, tag: 'Trending',   category: 'Jeans',    brand: 'Only', size: ['S','M','L','XL'],        color: 'Black',  img: '/image/women/brand/only/p2.jpg' },
  { id: 283, name: 'Only Straight Fit Jeans',       price: '₹1,899', originalPrice: '₹2,999', rating: 4.3, tag: 'New',        category: 'Jeans',    brand: 'Only', size: ['S','M','L','XL'],        color: 'Blue',   img: '/image/women/brand/only/p3.jpg' },
  { id: 284, name: 'Only Mom Jeans',                price: '₹2,199', originalPrice: '₹3,499', rating: 4.2, tag: null,         category: 'Jeans',    brand: 'Only', size: ['XS','S','M','L'],        color: 'Grey',   img: '/image/women/brand/only/p4.jpg' },
  { id: 285, name: 'Only Flared Jeans',             price: '₹2,499', originalPrice: '₹3,999', rating: 4.6, tag: 'Popular',    category: 'Jeans',    brand: 'Only', size: ['XS','S','M','L'],        color: 'Blue',   img: '/image/women/brand/only/p5.jpg' },
  { id: 286, name: 'Only Ripped Jeans',             price: '₹1,799', originalPrice: '₹2,899', rating: 4.1, tag: 'Sale',       category: 'Jeans',    brand: 'Only', size: ['XS','S','M','L'],        color: 'Black',  img: '/image/women/brand/only/p6.jpg' },
  { id: 287, name: 'Only Cropped Jeans',            price: '₹1,999', originalPrice: '₹3,199', rating: 4.3, tag: 'New',        category: 'Jeans',    brand: 'Only', size: ['S','M','L','XL'],        color: 'Blue',   img: '/image/women/brand/only/p7.jpg' },
  { id: 288, name: 'Only Boyfriend Jeans',          price: '₹2,299', originalPrice: '₹3,699', rating: 4.4, tag: 'Trending',   category: 'Jeans',    brand: 'Only', size: ['S','M','L','XL'],        color: 'Grey',   img: '/image/women/brand/only/p8.jpg' },
]

  let filteredProducts = [...products]

  if (selectedPrices.length > 0) {
    filteredProducts = filteredProducts.filter(p => {
      const price = parseInt(p.price.replace(/[₹,]/g, ''))
      return selectedPrices.some(range => {
        if (range === 'Under ₹500') return price < 500
        if (range === '₹500 - ₹1000') return price >= 500 && price <= 1000
        if (range === '₹1000 - ₹2000') return price >= 1000 && price <= 2000
        if (range === '₹2000 - ₹3000') return price >= 2000 && price <= 3000
        if (range === 'Above ₹3000') return price > 3000
        return true
      })
    })
  }

  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(p => selectedCategories.includes(p.category))
  }

  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter(p => selectedBrands.includes(p.brand))
  }

  if (selectedSizes.length > 0) {
    filteredProducts = filteredProducts.filter(p => selectedSizes.some(s => p.size.includes(s)))
  }

  if (selectedColors.length > 0) {
    filteredProducts = filteredProducts.filter(p => selectedColors.includes(p.color))
  }

  if (selectedRating) {
    const minRating = parseInt(selectedRating)
    filteredProducts = filteredProducts.filter(p => p.rating >= minRating)
  }

  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => parseInt(a.price.replace(/[₹,]/g, '')) - parseInt(b.price.replace(/[₹,]/g, '')))
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => parseInt(b.price.replace(/[₹,]/g, '')) - parseInt(a.price.replace(/[₹,]/g, '')))
  } else if (sortBy === 'newest') {
    filteredProducts = [...filteredProducts].reverse()
  } else if (sortBy === 'popular') {
    filteredProducts.sort((a, b) => b.rating - a.rating)
  }

  const tagColor = (tag) => {
    if (tag === 'Hot') return '#F5A623'
    if (tag === 'New') return '#E91E8C'
    if (tag === 'Trending') return '#4A90D9'
    return '#00897B'
  }

  return (
    <div className="page">
      <Navbar active="" />
      <div className="wrapper">
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <h1 className="page-title">
            {urlCategory ? decodeURIComponent(urlCategory) : "Women's Fashion"}
          </h1>
        </div>
        <div className={`filter-overlay ${filterOpen ? 'open' : ''}`} onClick={() => setFilterOpen(false)} />
        <div className="common-page-layout">
          <FilterSidebar
            filterOpen={filterOpen} setFilterOpen={setFilterOpen}
            clearFilters={clearFilters}
            selectedPrices={selectedPrices} setSelectedPrices={setSelectedPrices}
            selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
            selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands}
            selectedSizes={selectedSizes} setSelectedSizes={setSelectedSizes}
            selectedColors={selectedColors} setSelectedColors={setSelectedColors}
            selectedRating={selectedRating} setSelectedRating={setSelectedRating}
          />
          <div className="products-section">
            <div className="products-top">
              <div className="products-count">Showing <span>{filteredProducts.length}</span> products</div>
              <div className="sort-wrap">
                <button className="filter-toggle-btn" onClick={() => setFilterOpen(true)}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4"/></svg>
                  Filters
                </button>
                <span className="sort-label">Sort by:</span>
                <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
            <div className="common-product-grid">
              {filteredProducts.map(p => (
                <div key={p.id} className="product-card">
                  <div className="product-img-wrap" style={{ height: '260px' }}>
                    <img src={p.img} alt={p.name} />
                    <button className="wishlist-btn" onClick={() => toggleWishlist(p.id)}>
                      <svg width="16" height="16" fill={wishlist.includes(p.id) ? '#FF4B4B' : 'none'} stroke={wishlist.includes(p.id) ? '#FF4B4B' : '#fff'} strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    </button>
                    <span className="product-tag" style={{ background: tagColor(p.tag) }}>{p.tag}</span>
                  </div>
                  <div className="product-info">
                    <div className="product-name">{p.name}</div>
                    <div className="product-meta">
                      <span className="product-price" style={{ color: '#E91E8C' }}>{p.price}</span>
                      <span className="product-rating">★ {p.rating}</span>
                    </div>
                    <button className="add-to-cart-btn" style={{ background: '#E91E8C' }}>Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.</footer>
    </div>
  )
}