import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'
import '../styles/common-pages.css'

function FilterSidebar({ filterOpen, setFilterOpen, clearFilters,
  selectedGender, setSelectedGender,
  selectedPrices, setSelectedPrices,
  selectedCategories, setSelectedCategories,
  selectedBrands, setSelectedBrands,
  selectedSizes, setSelectedSizes,
  selectedColors, setSelectedColors,
  selectedRating, setSelectedRating,
}) {
  const priceRanges = ['Under ₹500', '₹500 - ₹1000', '₹1000 - ₹2000', '₹2000 - ₹3000', 'Above ₹3000']
  const categories = ['Sneakers', 'Sports Shoes', 'Formal Shoes', 'Sandals', 'Boots', 'Loafers', 'Heels', 'Flats', 'Wedges', 'Flip Flops', 'Slip-ons', 'Kolhapuri', 'Juttis', 'Mules', 'Derby Shoes', 'Pumps', 'Stilettos', 'Ballerinas']  
  const brands = ['Nike', 'Adidas', 'Puma', 'Woodland', 'New Balance', 'Skechers', 'ASICS', 'Under Armour', 'Bata', 'Lee Cooper', 'Aldo', 'Inc.5', 'Rocia', 'Clarks', 'Hush Puppies', 'Non Brand']  
  const sizes = ['5', '6', '7', '8', '9', '10', '11']
  const colors = [
    { name: 'Black', hex: '#111' }, { name: 'White', hex: '#f5f5f5' },
    { name: 'Brown', hex: '#6d4c41' }, { name: 'Grey', hex: '#9e9e9e' },
    { name: 'Red', hex: '#e53935' }, { name: 'Blue', hex: '#1565C0' },
    { name: 'Pink', hex: '#E91E8C' }, { name: 'Beige', hex: '#d7ccc8' },
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
        <div className="filter-section-title">Gender</div>
        <div className="filter-gender">
          {['All', 'Men', 'Women'].map(g => (
            <button key={g}
              className={`filter-gender-btn ${selectedGender === g ? 'active' : ''}`}
              onClick={() => setSelectedGender(g)}
            >{g}</button>
          ))}
        </div>
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
              style={{ background: c.hex, borderColor: selectedColors.includes(c.name) ? '#388e3c' : 'transparent' }}
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
      <button className="filter-apply-btn" style={{ background: '#388e3c' }}
        onClick={() => setFilterOpen(false)}>
        Apply Filters
      </button>
    </div>
  )
}

export default function CommonFootwear() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const urlGender = searchParams.get('gender')
  const urlCategory = searchParams.get('category')

  const [wishlist, setWishlist] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState('popular')
  const [selectedGender, setSelectedGender] = useState(urlGender || 'All')
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
    setSelectedGender('All')
    setSelectedPrices([])
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedSizes([])
    setSelectedColors([])
    setSelectedRating(null)
  }

  const products = [
  { id: 1,  name: 'Air Cushion Sneakers',  price: '₹2,499', rating: 4.7, tag: 'Hot',      gender: 'Men',   category: 'Sneakers',     brand: 'Non Brand',   size: ['7', '8', '9', '10'],       color: 'White',  img: '/image/footwear/men/sneakers/d1.jpg' },
  { id: 2,  name: 'Platform Heels',        price: '₹1,799', rating: 4.5, tag: 'Trending', gender: 'Women', category: 'Heels',        brand: 'Non Brand',   size: ['5', '6', '7', '8'],        color: 'Black',  img: '/image/footwear/women/heels/d1.jpg' },
  { id: 3,  name: 'Trail Running Shoes',   price: '₹3,499', rating: 4.8, tag: 'Popular',  gender: 'Men',   category: 'Sneakers',     brand: 'Non Brand',   size: ['7', '8', '9', '10', '11'], color: 'Grey',   img: '/image/footwear/men/sneakers/d2.jpg' },
  { id: 4,  name: 'Block Heel Sandals',    price: '₹999',   rating: 4.3, tag: 'New',      gender: 'Women', category: 'Heels',        brand: 'Non Brand',   size: ['5', '6', '7', '8'],        color: 'Brown',  img: '/image/footwear/women/heels/d2.jpg' },
  { id: 5,  name: 'Chelsea Boots',         price: '₹2,799', rating: 4.6, tag: 'Hot',      gender: 'Men',   category: 'Boots',        brand: 'Non Brand',   size: ['7', '8', '9', '10'],       color: 'Brown',  img: '/image/footwear/men/boots/d5.jpg' },
  { id: 6,  name: 'Strappy Sandals',       price: '₹899',   rating: 4.2, tag: 'New',      gender: 'Women', category: 'Sandals',      brand: 'Non Brand',   size: ['5', '6', '7'],             color: 'Beige',  img: '/image/footwear/women/sandals/d1.jpg' },
  { id: 7,  name: 'Suede Loafers',         price: '₹1,999', rating: 4.4, tag: 'Popular',  gender: 'Men',   category: 'Loafers',      brand: 'Non Brand',   size: ['7', '8', '9', '10', '11'], color: 'Brown',  img: '/image/footwear/men/loafers/d1.jpg' },
  { id: 8,  name: 'Chunky Sneakers',       price: '₹2,199', rating: 4.5, tag: 'Trending', gender: 'Women', category: 'Sneakers',     brand: 'Non Brand',   size: ['5', '6', '7', '8'],        color: 'White',  img: '/image/footwear/women/sneakers/d1.jpg' },
  { id: 9,  name: 'Sports Boots',          price: '₹799',   rating: 4.1, tag: 'New',      gender: 'Men',   category: 'Sports Shoes', brand: 'Non Brand',   size: ['7', '8', '9', '10'],       color: 'Black',  img: '/image/footwear/men/sports shoes/d3.jpg' },
  { id: 10, name: 'Kolhapuri Flats',       price: '₹599',   rating: 4.3, tag: 'Popular',  gender: 'Women', category: 'Flats',        brand: 'Non Brand',   size: ['5', '6', '7', '8'],        color: 'Brown',  img: '/image/footwear/women/flats/d1.jpg' },
  { id: 11, name: 'Derby Shoes',           price: '₹2,199', rating: 4.5, tag: 'Hot',      gender: 'Men',   category: 'Sneakers',     brand: 'Non Brand',   size: ['7', '8', '9', '10'],       color: 'Black',  img: '/image/footwear/men/sneakers/d4.jpg' },
  { id: 12, name: 'Wedge Sandals',         price: '₹1,299', rating: 4.4, tag: 'Trending', gender: 'Women', category: 'Wedges',brand: 'Non Brand',   size: ['5', '6', '7', '8'],        color: 'Beige',  img: '/image/footwear/women/wedges/d1.jpg' },
  { id: 13, name: 'Flip Flops',            price: '₹399',   rating: 4.0, tag: 'New',      gender: 'Men',   category: 'Flip Flops',   brand: 'Non Brand',   size: ['7', '8', '9', '10', '11'], color: 'Blue',   img: '/image/footwear/men/flip-flops/d3.jpg' },
  { id: 14, name: 'Ankle Strap Heels',     price: '₹1,599', rating: 4.6, tag: 'Popular',  gender: 'Women', category: 'Heels',        brand: 'Non Brand',   size: ['5', '6', '7', '8'],        color: 'Pink',   img: '/image/footwear/women/heels/d3.jpg' },
  { id: 15, name: 'Canvas Sneakers',       price: '₹1,499', rating: 4.3, tag: 'Hot',      gender: 'Men',   category: 'Sneakers',     brand: 'Non Brand',   size: ['7', '8', '9', '10'],       color: 'White',  img: '/image/footwear/men/sneakers/d12.jpg' },
  { id: 16, name: 'Ballet Flats',          price: '₹799',   rating: 4.2, tag: 'New',      gender: 'Women', category: 'Flats',        brand: 'Non Brand',   size: ['5', '6', '7', '8'],        color: 'Beige',  img: '/image/footwear/women/flats/d2.jpg' },
  { id: 17, name: 'Canvas Sneakers',       price: '₹499',   originalPrice: '₹999',   rating: 4.1, tag: 'New',      gender: 'Men',   category: 'Sneakers',     brand: 'Non Brand',   size: ['7', '8', '9', '10'],       color: 'White',  img: '/image/footwear/men/sneakers/d9.jpg' },
  { id: 18, name: 'Basic Sandals',         price: '₹299',   originalPrice: '₹599',   rating: 4.0, tag: 'New',      gender: 'Men',   category: 'Sandals',      brand: 'Non Brand',   size: ['7', '8', '9', '10'],       color: 'Brown',  img: '/image/footwear/men/sandals/d4.jpg' },
  { id: 19, name: 'Casual Loafers',        price: '₹599',   originalPrice: '₹1,199', rating: 4.2, tag: 'New',      gender: 'Men',   category: 'Loafers',      brand: 'Non Brand',   size: ['7', '8', '9', '10', '11'], color: 'Brown',  img: '/image/footwear/men/loafers/d9.jpg' },
  { id: 20, name: 'Ethnic Juttis',         price: '₹349',   originalPrice: '₹699',   rating: 4.1, tag: 'New',      gender: 'Women', category: 'Juttis',       brand: 'Non Brand',   size: ['5', '6', '7', '8'],        color: 'Brown',  img: '/image/footwear/women/juttis/d7.jpg' },
  { id: 21, name: 'Flip Flops',            price: '₹199',   originalPrice: '₹399',   rating: 4.3, tag: 'New',      gender: 'Men',   category: 'Flip Flops',   brand: 'Non Brand',   size: ['7', '8', '9', '10', '11'], color: 'Blue',   img: '/image/footwear/men/flip-flops/d2.jpg' },
  { id: 22, name: 'Slip-on Shoes',         price: '₹449',   originalPrice: '₹899',   rating: 4.2, tag: 'New',      gender: 'Women', category: 'Slip-ons',     brand: 'Non Brand',   size: ['5', '6', '7', '8'],        color: 'Black',  img: '/image/footwear/women/slip-ons/d2.jpg' },
  { id: 23, name: 'Sports Sandals',        price: '₹399',   originalPrice: '₹799',   rating: 4.0, tag: 'New',      gender: 'Women', category: 'Sandals',      brand: 'Non Brand',   size: ['5', '6', '7', '8'],        color: 'Black',  img: '/image/footwear/women/sandals/d10.jpg' },
  { id: 24, name: 'Kolhapuri Flats',       price: '₹379',   originalPrice: '₹749',   rating: 4.4, tag: 'Popular',  gender: 'Women', category: 'Kolhapuri',    brand: 'Non Brand',   size: ['5', '6', '7', '8'],        color: 'Brown',  img: '/image/footwear/women/kolhapuri/d3.jpg' },
  { id: 25, name: 'Running Shoes',         price: '₹1,499', originalPrice: '₹2,999', discount: '50%', rating: 4.6, tag: 'Hot',      gender: 'Women', category: 'Sports Shoes', brand: 'Non Brand',   size: ['5', '6', '7', '8'],        color: 'Grey',   img: '/image/footwear/women/sports shoes/d4.jpg' },
  { id: 26, name: 'Leather Boots',         price: '₹1,999', originalPrice: '₹3,999', discount: '50%', rating: 4.7, tag: 'Trending', gender: 'Women', category: 'Boots',        brand: 'Non Brand',   size: ['5', '6', '7', '8'],        color: 'Brown',  img: '/image/footwear/women/boots/d5.jpg' },
  { id: 27, name: 'Block Heel Sandals',    price: '₹899',   originalPrice: '₹1,799', discount: '50%', rating: 4.5, tag: 'Popular',  gender: 'Women', category: 'Sandals',      brand: 'Non Brand',   size: ['5', '6', '7', '8'],        color: 'Beige',  img: '/image/footwear/women/sandals/d11.jpg' },
  { id: 28, name: 'Formal Oxford Shoes',   price: '₹1,799', originalPrice: '₹3,599', discount: '50%', rating: 4.8, tag: 'Hot',      gender: 'Women', category: 'Boots',        brand: 'Non Brand',   size: ['5', '6', '7', '8'],        color: 'Black',  img: '/image/footwear/women/boots/d6.jpg' },
  { id: 29, name: 'Air Cushion Sneakers',  price: '₹2,499', rating: 4.7, tag: 'Hot',      gender: 'Women', category: 'Sneakers',     brand: 'Non Brand',   size: ['5', '6', '7', '8'],        color: 'White',  img: '/image/footwear/women/sneakers/d6.jpg' },
  { id: 30, name: 'Platform Heels',        price: '₹1,799', rating: 4.5, tag: 'Trending', gender: 'Women', category: 'Heels',        brand: 'Non Brand',   size: ['5', '6', '7', '8'],        color: 'Black',  img: '/image/footwear/women/heels/d8.jpg' },
  { id: 31, name: 'Chelsea Boots',         price: '₹2,799', rating: 4.6, tag: 'Popular',  gender: 'Men',   category: 'Boots',        brand: 'Non Brand',   size: ['7', '8', '9', '10'],       color: 'Brown',  img: '/image/footwear/men/boots/d5.jpg' },
  { id: 32, name: 'Strappy Sandals',       price: '₹999',   rating: 4.4, tag: 'New',      gender: 'Men',   category: 'Sandals',      brand: 'Non Brand',   size: ['7', '8', '9', '10'],       color: 'Brown',  img: '/image/footwear/men/sandals/d2.jpg' },
  { id: 33, name: 'Derby Shoes',           price: '₹2,199', rating: 4.5, tag: 'Hot',      gender: 'Men',   category: 'Derby Shoes',  brand: 'Non Brand',   size: ['7', '8', '9', '10'],       color: 'Black',  img: '/image/footwear/men/derby-shoes/d3.jpg' },
  { id: 34, name: 'Wedge Sandals',         price: '₹1,299', rating: 4.3, tag: 'Trending', gender: 'Women', category: 'Sandals',      brand: 'Non Brand',   size: ['5', '6', '7', '8'],        color: 'Beige',  img: '/image/footwear/women/sandals/d7.jpg' },
  { id: 35, name: 'High Top Sneakers',     price: '₹2,299', rating: 4.6, tag: 'Popular',  gender: 'Men',   category: 'Sneakers',     brand: 'Non Brand',   size: ['7', '8', '9', '10'],       color: 'White',  img: '/image/footwear/men/sneakers/d10.jpg' },
  { id: 36, name: 'Ankle Strap Heels',     price: '₹1,599', rating: 4.4, tag: 'New',      gender: 'Women', category: 'Heels',        brand: 'Non Brand',   size: ['5', '6', '7', '8'],        color: 'Pink',   img: '/image/footwear/women/heels/d6.jpg' },
  { id: 37, name: 'Chunky Sneakers',       price: '₹2,199', rating: 4.5, tag: 'Trending', gender: 'Men',   category: 'Sneakers',     brand: 'Non Brand',   size: ['7', '8', '9', '10'],       color: 'White',  img: '/image/footwear/men/sneakers/d11.jpg' },
  { id: 38, name: 'Knee High Boots',       price: '₹3,299', rating: 4.7, tag: 'Hot',      gender: 'Women', category: 'Boots',        brand: 'Non Brand',   size: ['5', '6', '7', '8'],        color: 'Black',  img: '/image/footwear/women/boots/d7.jpg' },
  { id: 39, name: 'Espadrille Wedges',     price: '₹1,299', rating: 4.4, tag: 'New',      gender: 'Women', category: 'Wedges ',brand: 'Non Brand',   size: ['5', '6', '7', '8'],        color: 'Beige',  img: '/image/footwear/women/wedges/d2.jpg' },
  { id: 40, name: 'Loafer Mules',          price: '₹1,499', rating: 4.3, tag: 'Popular',  gender: 'Women', category: 'Juttis',       brand: 'Non Brand',   size: ['5', '6', '7', '8'],        color: 'Brown',  img: '/image/footwear/women/juttis/d8.jpg' },
  { id: 41, name: 'Retro Sneakers',        price: '₹1,899', rating: 4.6, tag: 'Trending', gender: 'Men',   category: 'Sneakers',     brand: 'Non Brand',   size: ['7', '8', '9', '10'],       color: 'White',  img: '/image/footwear/men/sneakers/d13.jpg' },
  { id: 42, name: 'Gladiator Sandals',     price: '₹899',   rating: 4.2, tag: 'Hot',      gender: 'Women', category: 'Sandals',      brand: 'Non Brand',   size: ['5', '6', '7', '8'],        color: 'Brown',  img: '/image/footwear/women/sandals/d8.jpg' },
  { id: 43, name: 'Suede Loafers',         price: '₹1,999', rating: 4.5, tag: 'New',      gender: 'Men',   category: 'Loafers',      brand: 'Non Brand',   size: ['7', '8', '9', '10', '11'], color: 'Brown',  img: '/image/footwear/men/loafers/d3.jpg' },
  { id: 44, name: 'Square Toe Mules',      price: '₹1,299', rating: 4.4, tag: 'Popular',  gender: 'Women', category: 'Mules',        brand: 'Non Brand',   size: ['5', '6', '7', '8'],        color: 'Beige',  img: '/image/footwear/women/mules/d4.jpg' },

  // Nike Men
  { id: 45, name: 'Nike Air Zoom Pegasus 41',     price: '₹8,995',  originalPrice: '₹12,995', rating: 4.7, tag: 'Bestseller', gender: 'Men', category: 'Sports Shoes', brand: 'Nike', size: ['7', '8', '9', '10'], color: 'White',  img: '/image/footwear/men/brand/nike/a1.jpg' },
  { id: 46, name: 'Nike React Infinity Run FK 4',  price: '₹10,495', originalPrice: '₹14,995', rating: 4.8, tag: 'New',        gender: 'Men', category: 'Sports Shoes', brand: 'Nike', size: ['7', '8', '9', '10'], color: 'Black',  img: '/image/footwear/men/brand/nike/a2.jpg' },
  { id: 47, name: 'Nike Revolution 7',             price: '₹4,995',  originalPrice: '₹6,995',  rating: 4.4, tag: 'Sale',       gender: 'Men', category: 'Sports Shoes', brand: 'Nike', size: ['7', '8', '9', '10'], color: 'Grey',   img: '/image/footwear/men/brand/nike/a3.jpg' },
  { id: 48, name: 'Nike Downshifter 13',           price: '₹3,995',  originalPrice: '₹5,995',  rating: 4.3, tag: null,         gender: 'Men', category: 'Sports Shoes', brand: 'Nike', size: ['7', '8', '9', '10'], color: 'Blue',   img: '/image/footwear/men/brand/nike/a4.jpg' },
  { id: 49, name: 'Nike Air Max 270',              price: '₹12,995', originalPrice: '₹17,995', rating: 4.6, tag: 'Trending',   gender: 'Men', category: 'Sports Shoes', brand: 'Nike', size: ['7', '8', '9', '10'], color: 'Black',  img: '/image/footwear/men/brand/nike/a5.jpg' },
  { id: 50, name: 'Nike Free Run 5.0',             price: '₹7,495',  originalPrice: '₹10,495', rating: 4.5, tag: 'Popular',    gender: 'Men', category: 'Sports Shoes', brand: 'Nike', size: ['7', '8', '9', '10'], color: 'White',  img: '/image/footwear/men/brand/nike/a6.jpg' },
  { id: 51, name: 'Nike Metcon 9',                 price: '₹9,995',  originalPrice: '₹13,995', rating: 4.7, tag: null,         gender: 'Men', category: 'Sports Shoes', brand: 'Nike', size: ['7', '8', '9', '10'], color: 'Grey',   img: '/image/footwear/men/brand/nike/a7.jpg' },
  { id: 52, name: 'Nike Flex Experience RN 12',    price: '₹3,595',  originalPrice: '₹5,595',  rating: 4.2, tag: 'Sale',       gender: 'Men', category: 'Sports Shoes', brand: 'Nike', size: ['7', '8', '9', '10'], color: 'Black',  img: '/image/footwear/men/brand/nike/a8.jpg' },
  { id: 53, name: 'Nike Air Force 1 Low',          price: '₹7,495',  originalPrice: '₹9,995',  rating: 4.8, tag: 'Bestseller', gender: 'Men', category: 'Sneakers',     brand: 'Nike', size: ['7', '8', '9', '10'], color: 'White',  img: '/image/footwear/men/brand/nike/b1.jpg' },
  { id: 54, name: 'Nike Dunk Low Retro',           price: '₹8,495',  originalPrice: '₹11,495', rating: 4.7, tag: 'Trending',   gender: 'Men', category: 'Sneakers',     brand: 'Nike', size: ['7', '8', '9', '10'], color: 'Black',  img: '/image/footwear/men/brand/nike/b2.jpg' },
  { id: 55, name: 'Nike Air Max 90',               price: '₹10,995', originalPrice: '₹14,995', rating: 4.6, tag: 'New',        gender: 'Men', category: 'Sneakers',     brand: 'Nike', size: ['7', '8', '9', '10'], color: 'Grey',   img: '/image/footwear/men/brand/nike/b3.jpg' },
  { id: 56, name: 'Nike Blazer Mid 77 Vintage',    price: '₹7,995',  originalPrice: '₹10,995', rating: 4.5, tag: null,         gender: 'Men', category: 'Sneakers',     brand: 'Nike', size: ['7', '8', '9', '10'], color: 'White',  img: '/image/footwear/men/brand/nike/b4.jpg' },
  { id: 57, name: 'Nike Court Vision Low',         price: '₹5,595',  originalPrice: '₹7,595',  rating: 4.4, tag: 'Sale',       gender: 'Men', category: 'Sneakers',     brand: 'Nike', size: ['7', '8', '9', '10'], color: 'White',  img: '/image/footwear/men/brand/nike/b5.jpg' },
  { id: 58, name: 'Nike Air Max 97',               price: '₹13,995', originalPrice: '₹18,995', rating: 4.8, tag: 'Popular',    gender: 'Men', category: 'Sneakers',     brand: 'Nike', size: ['7', '8', '9', '10'], color: 'Silver', img: '/image/footwear/men/brand/nike/b6.jpg' },
  { id: 59, name: 'Nike SB Dunk High Pro',         price: '₹9,495',  originalPrice: '₹12,995', rating: 4.6, tag: 'New',        gender: 'Men', category: 'Sneakers',     brand: 'Nike', size: ['7', '8', '9', '10'], color: 'Black',  img: '/image/footwear/men/brand/nike/b7.jpg' },
  { id: 60, name: 'Nike Waffle Debut',             price: '₹4,995',  originalPrice: '₹6,995',  rating: 4.3, tag: null,         gender: 'Men', category: 'Sneakers',     brand: 'Nike', size: ['7', '8', '9', '10'], color: 'Brown',  img: '/image/footwear/men/brand/nike/b8.jpg' },
  { id: 61, name: 'Nike Victori One Slide',        price: '₹1,495',  originalPrice: '₹2,195',  rating: 4.5, tag: 'Bestseller', gender: 'Men', category: 'Flip Flops',   brand: 'Nike', size: ['7', '8', '9', '10'], color: 'Black',  img: '/image/footwear/men/brand/nike/c1.jpg' },
  { id: 62, name: 'Nike Benassi JDI Slide',        price: '₹1,295',  originalPrice: '₹1,995',  rating: 4.4, tag: 'Sale',       gender: 'Men', category: 'Flip Flops',   brand: 'Nike', size: ['7', '8', '9', '10'], color: 'White',  img: '/image/footwear/men/brand/nike/c2.jpg' },
  { id: 63, name: 'Nike Ultra Comfort Thong',      price: '₹1,695',  originalPrice: '₹2,495',  rating: 4.6, tag: 'New',        gender: 'Men', category: 'Flip Flops',   brand: 'Nike', size: ['7', '8', '9', '10'], color: 'Grey',   img: '/image/footwear/men/brand/nike/c3.jpg' },
  { id: 64, name: 'Nike Offcourt Slide',           price: '₹1,895',  originalPrice: '₹2,695',  rating: 4.3, tag: null,         gender: 'Men', category: 'Flip Flops',   brand: 'Nike', size: ['7', '8', '9', '10'], color: 'Black',  img: '/image/footwear/men/brand/nike/c4.jpg' },
  { id: 65, name: 'Nike Kawa Shower Slide',        price: '₹995',    originalPrice: '₹1,595',  rating: 4.2, tag: 'Sale',       gender: 'Men', category: 'Flip Flops',   brand: 'Nike', size: ['7', '8', '9', '10'], color: 'Blue',   img: '/image/footwear/men/brand/nike/c5.jpg' },
  { id: 66, name: 'Nike Calm Flip Flop',           price: '₹2,195',  originalPrice: '₹2,995',  rating: 4.7, tag: 'Trending',   gender: 'Men', category: 'Flip Flops',   brand: 'Nike', size: ['7', '8', '9', '10'], color: 'Brown',  img: '/image/footwear/men/brand/nike/c6.jpg' },
  { id: 67, name: 'Nike Celso Thong Plus',         price: '₹1,195',  originalPrice: '₹1,795',  rating: 4.1, tag: 'Popular',    gender: 'Men', category: 'Flip Flops',   brand: 'Nike', size: ['7', '8', '9', '10'], color: 'White',  img: '/image/footwear/men/brand/nike/c7.jpg' },
  { id: 68, name: 'Nike Sunray Adjust 6',          price: '₹1,795',  originalPrice: '₹2,595',  rating: 4.5, tag: 'New',        gender: 'Men', category: 'Flip Flops',   brand: 'Nike', size: ['7', '8', '9', '10'], color: 'Black',  img: '/image/footwear/men/brand/nike/c8.jpg' },
 
  // nike women
  { id: 69,  name: 'Nike Air Zoom Pegasus 40 W',    price: '₹9,999',  originalPrice: '₹12,999', rating: 4.7, tag: 'Bestseller', gender: 'Women', category: 'Sports Shoes', brand: 'Nike', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/nike/a1.jpg' },
  { id: 70,  name: 'Nike React Infinity Run FK 3 W', price: '₹11,999', originalPrice: '₹14,999', rating: 4.6, tag: 'New',        gender: 'Women', category: 'Sports Shoes', brand: 'Nike', size: ['5', '6', '7', '8'], color: 'Black', img: '/image/footwear/women/brand/nike/a2.jpg' },
  { id: 71,  name: 'Nike Air Max 270 W',             price: '₹10,999', originalPrice: '₹13,999', rating: 4.5, tag: 'Sale',       gender: 'Women', category: 'Sports Shoes', brand: 'Nike', size: ['5', '6', '7', '8'], color: 'Grey',  img: '/image/footwear/women/brand/nike/a3.jpg' },
  { id: 72,  name: 'Nike Downshifter 12 W',          price: '₹4,999',  originalPrice: '₹6,999',  rating: 4.4, tag: null,         gender: 'Women', category: 'Sports Shoes', brand: 'Nike', size: ['5', '6', '7', '8'], color: 'Blue',  img: '/image/footwear/women/brand/nike/a4.jpg' },
  { id: 73,  name: 'Nike Revolution 6 W',            price: '₹4,499',  originalPrice: '₹5,999',  rating: 4.6, tag: 'Trending',   gender: 'Women', category: 'Sports Shoes', brand: 'Nike', size: ['5', '6', '7', '8'], color: 'Pink',  img: '/image/footwear/women/brand/nike/a5.jpg' },
  { id: 74,  name: 'Nike Free RN 5.0 W',             price: '₹7,999',  originalPrice: '₹9,999',  rating: 4.5, tag: 'Popular',    gender: 'Women', category: 'Sports Shoes', brand: 'Nike', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/nike/a6.jpg' },
  { id: 75,  name: 'Nike Winflo 10 W',               price: '₹6,999',  originalPrice: '₹8,999',  rating: 4.3, tag: null,         gender: 'Women', category: 'Sports Shoes', brand: 'Nike', size: ['5', '6', '7', '8'], color: 'Grey',  img: '/image/footwear/women/brand/nike/a7.jpg' },
  { id: 76,  name: 'Nike Quest 5 W',                 price: '₹3,999',  originalPrice: '₹5,499',  rating: 4.2, tag: 'Sale',       gender: 'Women', category: 'Sports Shoes', brand: 'Nike', size: ['5', '6', '7', '8'], color: 'Black', img: '/image/footwear/women/brand/nike/a8.jpg' },
  { id: 77,  name: 'Nike Bella Kai Thong W',         price: '₹1,499',  originalPrice: '₹2,199',  rating: 4.5, tag: 'Bestseller', gender: 'Women', category: 'Flip Flops',   brand: 'Nike', size: ['5', '6', '7', '8'], color: 'Pink',  img: '/image/footwear/women/brand/nike/b1.jpg' },
  { id: 78,  name: 'Nike Victori One Slide W',       price: '₹1,799',  originalPrice: '₹2,499',  rating: 4.4, tag: 'New',        gender: 'Women', category: 'Flip Flops',   brand: 'Nike', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/nike/b2.jpg' },
  { id: 79,  name: 'Nike Kawa Shower Slide W',       price: '₹999',    originalPrice: '₹1,599',  rating: 4.3, tag: 'Sale',       gender: 'Women', category: 'Flip Flops',   brand: 'Nike', size: ['5', '6', '7', '8'], color: 'Grey',  img: '/image/footwear/women/brand/nike/b3.jpg' },
  { id: 80,  name: 'Nike Offcourt Slide W',          price: '₹1,299',  originalPrice: '₹1,999',  rating: 4.2, tag: null,         gender: 'Women', category: 'Flip Flops',   brand: 'Nike', size: ['5', '6', '7', '8'], color: 'Black', img: '/image/footwear/women/brand/nike/b4.jpg' },
  { id: 81,  name: 'Nike Calm Slide W',              price: '₹2,299',  originalPrice: '₹2,999',  rating: 4.5, tag: 'Trending',   gender: 'Women', category: 'Flip Flops',   brand: 'Nike', size: ['5', '6', '7', '8'], color: 'Beige', img: '/image/footwear/women/brand/nike/b5.jpg' },
  { id: 82,  name: 'Nike Ultra Comfort Thong W',     price: '₹1,699',  originalPrice: '₹2,399',  rating: 4.4, tag: 'Popular',    gender: 'Women', category: 'Flip Flops',   brand: 'Nike', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/nike/b6.jpg' },
  { id: 83,  name: 'Nike Aqua Swoosh Slide W',       price: '₹899',    originalPrice: '₹1,399',  rating: 4.1, tag: 'Sale',       gender: 'Women', category: 'Flip Flops',   brand: 'Nike', size: ['5', '6', '7', '8'], color: 'Blue',  img: '/image/footwear/women/brand/nike/b7.jpg' },
  { id: 84,  name: 'Nike Air Max Cirro Slide W',     price: '₹2,499',  originalPrice: '₹3,299',  rating: 4.3, tag: 'New',        gender: 'Women', category: 'Flip Flops',   brand: 'Nike', size: ['5', '6', '7', '8'], color: 'Pink',  img: '/image/footwear/women/brand/nike/b8.jpg' },
  { id: 85,  name: 'Nike Air Force 1 07 W',          price: '₹7,999',  originalPrice: '₹9,999',  rating: 4.7, tag: 'Bestseller', gender: 'Women', category: 'Sneakers',     brand: 'Nike', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/nike/c1.jpg' },
  { id: 86,  name: 'Nike Blazer Mid 77 W',           price: '₹6,999',  originalPrice: '₹8,999',  rating: 4.6, tag: 'New',        gender: 'Women', category: 'Sneakers',     brand: 'Nike', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/nike/c2.jpg' },
  { id: 87,  name: 'Nike Court Vision Low W',        price: '₹5,499',  originalPrice: '₹7,499',  rating: 4.5, tag: 'Trending',   gender: 'Women', category: 'Sneakers',     brand: 'Nike', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/nike/c3.jpg' },
  { id: 88,  name: 'Nike Dunk Low W',                price: '₹8,999',  originalPrice: '₹11,999', rating: 4.8, tag: null,         gender: 'Women', category: 'Sneakers',     brand: 'Nike', size: ['5', '6', '7', '8'], color: 'Black', img: '/image/footwear/women/brand/nike/c4.jpg' },
  { id: 89,  name: 'Nike Air Max 90 W',              price: '₹9,499',  originalPrice: '₹12,499', rating: 4.6, tag: 'Sale',       gender: 'Women', category: 'Sneakers',     brand: 'Nike', size: ['5', '6', '7', '8'], color: 'Grey',  img: '/image/footwear/women/brand/nike/c5.jpg' },
  { id: 90,  name: 'Nike Killshot 2 W',              price: '₹5,999',  originalPrice: '₹7,999',  rating: 4.5, tag: 'Popular',    gender: 'Women', category: 'Sneakers',     brand: 'Nike', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/nike/c6.jpg' },
  { id: 91,  name: 'Nike Court Legacy W',            price: '₹4,499',  originalPrice: '₹5,999',  rating: 4.3, tag: null,         gender: 'Women', category: 'Sneakers',     brand: 'Nike', size: ['5', '6', '7', '8'], color: 'Beige', img: '/image/footwear/women/brand/nike/c7.jpg' },
  { id: 92,  name: 'Nike Waffle Debut W',            price: '₹5,499',  originalPrice: '₹7,499',  rating: 4.4, tag: 'New',        gender: 'Women', category: 'Sneakers',     brand: 'Nike', size: ['5', '6', '7', '8'], color: 'Brown', img: '/image/footwear/women/brand/nike/c8.jpg' },

  //adidas men
  { id: 93,  name: 'Adidas Ultraboost 24',        price: '₹14,999', originalPrice: '₹19,999', rating: 4.8, tag: 'Bestseller', gender: 'Men', category: 'Sports Shoes', brand: 'Adidas', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/adidas/a1.jpg' },
  { id: 94,  name: 'Adidas Runfalcon 3.0',        price: '₹3,999',  originalPrice: '₹5,999',  rating: 4.4, tag: 'Sale',       gender: 'Men', category: 'Sports Shoes', brand: 'Adidas', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/adidas/a2.jpg' },
  { id: 95,  name: 'Adidas Response Runner',      price: '₹5,499',  originalPrice: '₹7,999',  rating: 4.5, tag: 'New',        gender: 'Men', category: 'Sports Shoes', brand: 'Adidas', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/adidas/a3.jpg' },
  { id: 96,  name: 'Adidas Duramo SL',            price: '₹4,499',  originalPrice: '₹6,499',  rating: 4.3, tag: null,         gender: 'Men', category: 'Sports Shoes', brand: 'Adidas', size: ['7', '8', '9', '10'], color: 'Blue',  img: '/image/footwear/men/brand/adidas/a4.jpg' },
  { id: 97,  name: 'Adidas Solar Glide 6',        price: '₹9,999',  originalPrice: '₹13,999', rating: 4.6, tag: 'Trending',   gender: 'Men', category: 'Sports Shoes', brand: 'Adidas', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/adidas/a5.jpg' },
  { id: 98,  name: 'Adidas Terrex Soulstride',    price: '₹7,999',  originalPrice: '₹10,999', rating: 4.5, tag: 'Popular',    gender: 'Men', category: 'Sports Shoes', brand: 'Adidas', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/adidas/a6.jpg' },
  { id: 99,  name: 'Adidas Adizero Boston 12',    price: '₹11,999', originalPrice: '₹15,999', rating: 4.7, tag: null,         gender: 'Men', category: 'Sports Shoes', brand: 'Adidas', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/adidas/a7.jpg' },
  { id: 100, name: 'Adidas Galaxy 6',             price: '₹3,499',  originalPrice: '₹5,499',  rating: 4.2, tag: 'Sale',       gender: 'Men', category: 'Sports Shoes', brand: 'Adidas', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/adidas/a8.jpg' },
  { id: 101, name: 'Adidas Samba OG',             price: '₹8,999',  originalPrice: '₹11,999', rating: 4.8, tag: 'Bestseller', gender: 'Men', category: 'Sneakers',     brand: 'Adidas', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/adidas/b1.jpg' },
  { id: 102, name: 'Adidas Stan Smith',           price: '₹7,499',  originalPrice: '₹9,999',  rating: 4.7, tag: 'Trending',   gender: 'Men', category: 'Sneakers',     brand: 'Adidas', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/adidas/b2.jpg' },
  { id: 103, name: 'Adidas Gazelle Bold',         price: '₹9,499',  originalPrice: '₹12,999', rating: 4.6, tag: 'New',        gender: 'Men', category: 'Sneakers',     brand: 'Adidas', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/adidas/b3.jpg' },
  { id: 104, name: 'Adidas Forum Low',            price: '₹7,999',  originalPrice: '₹10,999', rating: 4.5, tag: null,         gender: 'Men', category: 'Sneakers',     brand: 'Adidas', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/adidas/b4.jpg' },
  { id: 105, name: 'Adidas Campus 00s',           price: '₹6,999',  originalPrice: '₹9,499',  rating: 4.6, tag: 'Popular',    gender: 'Men', category: 'Sneakers',     brand: 'Adidas', size: ['7', '8', '9', '10'], color: 'Brown', img: '/image/footwear/men/brand/adidas/b5.jpg' },
  { id: 106, name: 'Adidas Superstar',            price: '₹7,999',  originalPrice: '₹10,499', rating: 4.7, tag: 'Bestseller', gender: 'Men', category: 'Sneakers',     brand: 'Adidas', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/adidas/b6.jpg' },
  { id: 107, name: 'Adidas NMD R1',              price: '₹10,999', originalPrice: '₹14,999', rating: 4.5, tag: 'New',        gender: 'Men', category: 'Sneakers',     brand: 'Adidas', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/adidas/b7.jpg' },
  { id: 108, name: 'Adidas Handball Spezial',     price: '₹8,499',  originalPrice: '₹11,499', rating: 4.4, tag: 'Sale',       gender: 'Men', category: 'Sneakers',     brand: 'Adidas', size: ['7', '8', '9', '10'], color: 'Brown', img: '/image/footwear/men/brand/adidas/b8.jpg' },
  { id: 109, name: 'Adidas Adilette Aqua',        price: '₹1,299',  originalPrice: '₹1,999',  rating: 4.5, tag: 'Bestseller', gender: 'Men', category: 'Flip Flops',   brand: 'Adidas', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/adidas/c1.jpg' },
  { id: 110, name: 'Adidas Adilette Comfort',     price: '₹1,799',  originalPrice: '₹2,599',  rating: 4.6, tag: 'New',        gender: 'Men', category: 'Flip Flops',   brand: 'Adidas', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/adidas/c2.jpg' },
  { id: 111, name: 'Adidas Adilette Lite',        price: '₹999',    originalPrice: '₹1,599',  rating: 4.3, tag: 'Sale',       gender: 'Men', category: 'Flip Flops',   brand: 'Adidas', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/adidas/c3.jpg' },
  { id: 112, name: 'Adidas Eezay Flip Flop',      price: '₹1,099',  originalPrice: '₹1,699',  rating: 4.2, tag: null,         gender: 'Men', category: 'Flip Flops',   brand: 'Adidas', size: ['7', '8', '9', '10'], color: 'Blue',  img: '/image/footwear/men/brand/adidas/c4.jpg' },
  { id: 113, name: 'Adidas Comfort Flip Flop',    price: '₹1,299',  originalPrice: '₹1,999',  rating: 4.4, tag: 'Trending',   gender: 'Men', category: 'Flip Flops',   brand: 'Adidas', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/adidas/c5.jpg' },
  { id: 114, name: 'Adidas Swim Slide',           price: '₹1,499',  originalPrice: '₹2,199',  rating: 4.5, tag: 'Popular',    gender: 'Men', category: 'Flip Flops',   brand: 'Adidas', size: ['7', '8', '9', '10'], color: 'Blue',  img: '/image/footwear/men/brand/adidas/c6.jpg' },
  { id: 115, name: 'Adidas Alphabounce Slide',    price: '₹1,999',  originalPrice: '₹2,799',  rating: 4.6, tag: 'New',        gender: 'Men', category: 'Flip Flops',   brand: 'Adidas', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/adidas/c7.jpg' },
  { id: 116, name: 'Adidas Adissage Slide',       price: '₹899',    originalPrice: '₹1,499',  rating: 4.1, tag: 'Sale',       gender: 'Men', category: 'Flip Flops',   brand: 'Adidas', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/adidas/c8.jpg' },

  // adidas women
  { id: 117, name: 'Adidas Ultraboost 23 W',          price: '₹14,999', originalPrice: '₹18,999', rating: 4.7, tag: 'Bestseller', gender: 'Women', category: 'Sports Shoes', brand: 'Adidas', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/adidas/a1.jpg' },
  { id: 118, name: 'Adidas Runfalcon 3.0 W',          price: '₹4,999',  originalPrice: '₹6,999',  rating: 4.6, tag: 'New',        gender: 'Women', category: 'Sports Shoes', brand: 'Adidas', size: ['5', '6', '7', '8'], color: 'Black', img: '/image/footwear/women/brand/adidas/a2.jpg' },
  { id: 119, name: 'Adidas Pureboost 23 W',           price: '₹9,999',  originalPrice: '₹12,999', rating: 4.5, tag: 'Sale',       gender: 'Women', category: 'Sports Shoes', brand: 'Adidas', size: ['5', '6', '7', '8'], color: 'Grey',  img: '/image/footwear/women/brand/adidas/a3.jpg' },
  { id: 120, name: 'Adidas Supernova 3 W',            price: '₹7,999',  originalPrice: '₹10,999', rating: 4.4, tag: null,         gender: 'Women', category: 'Sports Shoes', brand: 'Adidas', size: ['5', '6', '7', '8'], color: 'Blue',  img: '/image/footwear/women/brand/adidas/a4.jpg' },
  { id: 121, name: 'Adidas Swift Run 23 W',           price: '₹5,999',  originalPrice: '₹7,999',  rating: 4.6, tag: 'Trending',   gender: 'Women', category: 'Sports Shoes', brand: 'Adidas', size: ['5', '6', '7', '8'], color: 'Pink',  img: '/image/footwear/women/brand/adidas/a5.jpg' },
  { id: 122, name: 'Adidas Duramo SL W',              price: '₹3,999',  originalPrice: '₹5,499',  rating: 4.5, tag: 'Popular',    gender: 'Women', category: 'Sports Shoes', brand: 'Adidas', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/adidas/a6.jpg' },
  { id: 123, name: 'Adidas Galaxy 6 W',               price: '₹3,499',  originalPrice: '₹4,999',  rating: 4.3, tag: null,         gender: 'Women', category: 'Sports Shoes', brand: 'Adidas', size: ['5', '6', '7', '8'], color: 'Grey',  img: '/image/footwear/women/brand/adidas/a7.jpg' },
  { id: 124, name: 'Adidas Cloudfoam Pure W',         price: '₹4,499',  originalPrice: '₹6,299',  rating: 4.2, tag: 'Sale',       gender: 'Women', category: 'Sports Shoes', brand: 'Adidas', size: ['5', '6', '7', '8'], color: 'Black', img: '/image/footwear/women/brand/adidas/a8.jpg' },
  { id: 125, name: 'Adidas Adilette Aqua Slide W',    price: '₹1,299',  originalPrice: '₹1,999',  rating: 4.6, tag: 'Bestseller', gender: 'Women', category: 'Flip Flops',   brand: 'Adidas', size: ['5', '6', '7', '8'], color: 'Black', img: '/image/footwear/women/brand/adidas/b1.jpg' },
  { id: 126, name: 'Adidas Adilette Comfort Slide W', price: '₹1,799',  originalPrice: '₹2,499',  rating: 4.5, tag: 'New',        gender: 'Women', category: 'Flip Flops',   brand: 'Adidas', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/adidas/b2.jpg' },
  { id: 127, name: 'Adidas Adilette Lite Slide W',    price: '₹999',    originalPrice: '₹1,599',  rating: 4.4, tag: 'Sale',       gender: 'Women', category: 'Flip Flops',   brand: 'Adidas', size: ['5', '6', '7', '8'], color: 'Pink',  img: '/image/footwear/women/brand/adidas/b3.jpg' },
  { id: 128, name: 'Adidas Shower Slide W',           price: '₹899',    originalPrice: '₹1,399',  rating: 4.3, tag: null,         gender: 'Women', category: 'Flip Flops',   brand: 'Adidas', size: ['5', '6', '7', '8'], color: 'Grey',  img: '/image/footwear/women/brand/adidas/b4.jpg' },
  { id: 129, name: 'Adidas Alphabounce Slide W',      price: '₹2,299',  originalPrice: '₹3,199',  rating: 4.5, tag: 'Trending',   gender: 'Women', category: 'Flip Flops',   brand: 'Adidas', size: ['5', '6', '7', '8'], color: 'Beige', img: '/image/footwear/women/brand/adidas/b5.jpg' },
  { id: 130, name: 'Adidas Comfort Flip Flop W',      price: '₹1,499',  originalPrice: '₹2,199',  rating: 4.4, tag: 'Popular',    gender: 'Women', category: 'Flip Flops',   brand: 'Adidas', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/adidas/b6.jpg' },
  { id: 131, name: 'Adidas Eezay Flip Flop W',        price: '₹799',    originalPrice: '₹1,299',  rating: 4.2, tag: 'Sale',       gender: 'Women', category: 'Flip Flops',   brand: 'Adidas', size: ['5', '6', '7', '8'], color: 'Blue',  img: '/image/footwear/women/brand/adidas/b7.jpg' },
  { id: 132, name: 'Adidas Softswim Slide W',         price: '₹1,999',  originalPrice: '₹2,799',  rating: 4.3, tag: 'New',        gender: 'Women', category: 'Flip Flops',   brand: 'Adidas', size: ['5', '6', '7', '8'], color: 'Pink',  img: '/image/footwear/women/brand/adidas/b8.jpg' },

  //puma men
  { id: 133, name: 'Puma Velocity Nitro 3',     price: '₹9,999',  originalPrice: '₹13,999', rating: 4.7, tag: 'Bestseller', gender: 'Men', category: 'Sports Shoes', brand: 'Puma', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/puma/a1.jpg' },
  { id: 134, name: 'Puma Deviate Nitro 2',      price: '₹12,999', originalPrice: '₹17,999', rating: 4.8, tag: 'New',        gender: 'Men', category: 'Sports Shoes', brand: 'Puma', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/puma/a2.jpg' },
  { id: 135, name: 'Puma Electrify Nitro 2',    price: '₹7,999',  originalPrice: '₹10,999', rating: 4.5, tag: 'Sale',       gender: 'Men', category: 'Sports Shoes', brand: 'Puma', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/puma/a3.jpg' },
  { id: 136, name: 'Puma Softride Premier',      price: '₹4,499',  originalPrice: '₹6,499',  rating: 4.3, tag: null,         gender: 'Men', category: 'Sports Shoes', brand: 'Puma', size: ['7', '8', '9', '10'], color: 'Blue',  img: '/image/footwear/men/brand/puma/a4.jpg' },
  { id: 137, name: 'Puma Magnify Nitro 2',      price: '₹10,999', originalPrice: '₹14,999', rating: 4.6, tag: 'Trending',   gender: 'Men', category: 'Sports Shoes', brand: 'Puma', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/puma/a5.jpg' },
  { id: 138, name: 'Puma Eternity Nitro 2',     price: '₹8,499',  originalPrice: '₹11,999', rating: 4.5, tag: 'Popular',    gender: 'Men', category: 'Sports Shoes', brand: 'Puma', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/puma/a6.jpg' },
  { id: 139, name: 'Puma Fast-R Nitro Elite',   price: '₹14,999', originalPrice: '₹19,999', rating: 4.7, tag: null,         gender: 'Men', category: 'Sports Shoes', brand: 'Puma', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/puma/a7.jpg' },
  { id: 140, name: 'Puma Resolve Street',        price: '₹3,999',  originalPrice: '₹5,999',  rating: 4.2, tag: 'Sale',       gender: 'Men', category: 'Sports Shoes', brand: 'Puma', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/puma/a8.jpg' },
  { id: 141, name: 'Puma Suede Classic XXI',     price: '₹5,999',  originalPrice: '₹7,999',  rating: 4.7, tag: 'Bestseller', gender: 'Men', category: 'Sneakers',     brand: 'Puma', size: ['7', '8', '9', '10'], color: 'Brown', img: '/image/footwear/men/brand/puma/b1.jpg' },
  { id: 142, name: 'Puma RS-X Efekt',           price: '₹8,999',  originalPrice: '₹11,999', rating: 4.6, tag: 'Trending',   gender: 'Men', category: 'Sneakers',     brand: 'Puma', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/puma/b2.jpg' },
  { id: 143, name: 'Puma Clyde All-Pro',         price: '₹7,499',  originalPrice: '₹9,999',  rating: 4.5, tag: 'New',        gender: 'Men', category: 'Sneakers',     brand: 'Puma', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/puma/b3.jpg' },
  { id: 144, name: 'Puma Slipstream Lo',         price: '₹6,999',  originalPrice: '₹9,499',  rating: 4.4, tag: null,         gender: 'Men', category: 'Sneakers',     brand: 'Puma', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/puma/b4.jpg' },
  { id: 145, name: 'Puma Cali Dream',            price: '₹6,499',  originalPrice: '₹8,999',  rating: 4.5, tag: 'Popular',    gender: 'Men', category: 'Sneakers',     brand: 'Puma', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/puma/b5.jpg' },
  { id: 146, name: 'Puma Future Rider Play On',  price: '₹5,499',  originalPrice: '₹7,499',  rating: 4.4, tag: 'Sale',       gender: 'Men', category: 'Sneakers',     brand: 'Puma', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/puma/b6.jpg' },
  { id: 147, name: 'Puma Mayze Classic',         price: '₹7,999',  originalPrice: '₹10,999', rating: 4.6, tag: 'New',        gender: 'Men', category: 'Sneakers',     brand: 'Puma', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/puma/b7.jpg' },
  { id: 148, name: 'Puma Smash V2',              price: '₹3,999',  originalPrice: '₹5,499',  rating: 4.3, tag: null,         gender: 'Men', category: 'Sneakers',     brand: 'Puma', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/puma/b8.jpg' },
  { id: 149, name: 'Puma Popcat 20',             price: '₹1,299',  originalPrice: '₹1,999',  rating: 4.5, tag: 'Bestseller', gender: 'Men', category: 'Flip Flops',   brand: 'Puma', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/puma/c1.jpg' },
  { id: 150, name: 'Puma Leadcat 2.0',           price: '₹1,499',  originalPrice: '₹2,199',  rating: 4.4, tag: 'New',        gender: 'Men', category: 'Flip Flops',   brand: 'Puma', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/puma/c2.jpg' },
  { id: 151, name: 'Puma Divecat v2',            price: '₹999',    originalPrice: '₹1,599',  rating: 4.3, tag: 'Sale',       gender: 'Men', category: 'Flip Flops',   brand: 'Puma', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/puma/c3.jpg' },
  { id: 152, name: 'Puma Softride Slide',        price: '₹1,799',  originalPrice: '₹2,499',  rating: 4.6, tag: 'Trending',   gender: 'Men', category: 'Flip Flops',   brand: 'Puma', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/puma/c4.jpg' },
  { id: 153, name: 'Puma Cool Cat 2.0',          price: '₹1,199',  originalPrice: '₹1,799',  rating: 4.2, tag: null,         gender: 'Men', category: 'Flip Flops',   brand: 'Puma', size: ['7', '8', '9', '10'], color: 'Blue',  img: '/image/footwear/men/brand/puma/c5.jpg' },
  { id: 154, name: 'Puma Surf Flip Flop',        price: '₹899',    originalPrice: '₹1,399',  rating: 4.1, tag: 'Sale',       gender: 'Men', category: 'Flip Flops',   brand: 'Puma', size: ['7', '8', '9', '10'], color: 'Blue',  img: '/image/footwear/men/brand/puma/c6.jpg' },
  { id: 155, name: 'Puma Flop Flip Flop',        price: '₹1,099',  originalPrice: '₹1,699',  rating: 4.3, tag: 'Popular',    gender: 'Men', category: 'Flip Flops',   brand: 'Puma', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/puma/c7.jpg' },
  { id: 156, name: 'Puma Nitro Slide',           price: '₹1,999',  originalPrice: '₹2,799',  rating: 4.5, tag: 'New',        gender: 'Men', category: 'Flip Flops',   brand: 'Puma', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/puma/c8.jpg' },

  //puma women
  { id: 157, name: 'Puma Velocity Nitro 2 W',      price: '₹7,999',  originalPrice: '₹10,999', rating: 4.7, tag: 'Bestseller', gender: 'Women', category: 'Sports Shoes', brand: 'Puma', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/puma/a1.jpg' },
  { id: 158, name: 'Puma Deviate Nitro 2 W',        price: '₹9,999',  originalPrice: '₹13,999', rating: 4.6, tag: 'New',        gender: 'Women', category: 'Sports Shoes', brand: 'Puma', size: ['5', '6', '7', '8'], color: 'Black', img: '/image/footwear/women/brand/puma/a2.jpg' },
  { id: 159, name: 'Puma Electrify Nitro 2 W',      price: '₹6,999',  originalPrice: '₹9,499',  rating: 4.5, tag: 'Sale',       gender: 'Women', category: 'Sports Shoes', brand: 'Puma', size: ['5', '6', '7', '8'], color: 'Grey',  img: '/image/footwear/women/brand/puma/a3.jpg' },
  { id: 160, name: 'Puma Softride Enzo Evo W',      price: '₹4,999',  originalPrice: '₹6,999',  rating: 4.4, tag: null,         gender: 'Women', category: 'Sports Shoes', brand: 'Puma', size: ['5', '6', '7', '8'], color: 'Pink',  img: '/image/footwear/women/brand/puma/a4.jpg' },
  { id: 161, name: 'Puma Flyer Flex W',             price: '₹3,999',  originalPrice: '₹5,499',  rating: 4.6, tag: 'Trending',   gender: 'Women', category: 'Sports Shoes', brand: 'Puma', size: ['5', '6', '7', '8'], color: 'Blue',  img: '/image/footwear/women/brand/puma/a5.jpg' },
  { id: 162, name: 'Puma Resolve Modern W',         price: '₹5,499',  originalPrice: '₹7,499',  rating: 4.5, tag: 'Popular',    gender: 'Women', category: 'Sports Shoes', brand: 'Puma', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/puma/a6.jpg' },
  { id: 163, name: 'Puma Better Foam Prowl W',      price: '₹4,499',  originalPrice: '₹6,299',  rating: 4.3, tag: null,         gender: 'Women', category: 'Sports Shoes', brand: 'Puma', size: ['5', '6', '7', '8'], color: 'Grey',  img: '/image/footwear/women/brand/puma/a7.jpg' },
  { id: 164, name: 'Puma Tazon Modern SL W',        price: '₹3,499',  originalPrice: '₹4,999',  rating: 4.2, tag: 'Sale',       gender: 'Women', category: 'Sports Shoes', brand: 'Puma', size: ['5', '6', '7', '8'], color: 'Black', img: '/image/footwear/women/brand/puma/a8.jpg' },
  { id: 165, name: 'Puma Epic Flip v2 W',           price: '₹999',    originalPrice: '₹1,599',  rating: 4.5, tag: 'Bestseller', gender: 'Women', category: 'Flip Flops',   brand: 'Puma', size: ['5', '6', '7', '8'], color: 'Pink',  img: '/image/footwear/women/brand/puma/b1.jpg' },
  { id: 166, name: 'Puma Popcat 20 W',              price: '₹1,299',  originalPrice: '₹1,999',  rating: 4.4, tag: 'New',        gender: 'Women', category: 'Flip Flops',   brand: 'Puma', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/puma/b2.jpg' },
  { id: 167, name: 'Puma Leadcat 2.0 W',            price: '₹1,499',  originalPrice: '₹2,199',  rating: 4.3, tag: 'Sale',       gender: 'Women', category: 'Flip Flops',   brand: 'Puma', size: ['5', '6', '7', '8'], color: 'Grey',  img: '/image/footwear/women/brand/puma/b3.jpg' },
  { id: 168, name: 'Puma Divecat v2 W',             price: '₹899',    originalPrice: '₹1,399',  rating: 4.2, tag: null,         gender: 'Women', category: 'Flip Flops',   brand: 'Puma', size: ['5', '6', '7', '8'], color: 'Blue',  img: '/image/footwear/women/brand/puma/b4.jpg' },
  { id: 169, name: 'Puma Softride Slide W',         price: '₹1,699',  originalPrice: '₹2,399',  rating: 4.5, tag: 'Trending',   gender: 'Women', category: 'Flip Flops',   brand: 'Puma', size: ['5', '6', '7', '8'], color: 'Pink',  img: '/image/footwear/women/brand/puma/b5.jpg' },
  { id: 170, name: 'Puma Surf Slide W',             price: '₹1,199',  originalPrice: '₹1,799',  rating: 4.4, tag: 'Popular',    gender: 'Women', category: 'Flip Flops',   brand: 'Puma', size: ['5', '6', '7', '8'], color: 'Beige', img: '/image/footwear/women/brand/puma/b6.jpg' },
  { id: 171, name: 'Puma Cool Cat 2.0 W',           price: '₹799',    originalPrice: '₹1,299',  rating: 4.1, tag: 'Sale',       gender: 'Women', category: 'Flip Flops',   brand: 'Puma', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/puma/b7.jpg' },
  { id: 172, name: 'Puma Wildcat Slide W',          price: '₹1,399',  originalPrice: '₹1,999',  rating: 4.3, tag: 'New',        gender: 'Women', category: 'Flip Flops',   brand: 'Puma', size: ['5', '6', '7', '8'], color: 'Black', img: '/image/footwear/women/brand/puma/b8.jpg' },
  { id: 173, name: 'Puma Suede Classic XXI W',      price: '₹5,999',  originalPrice: '₹7,999',  rating: 4.6, tag: 'Bestseller', gender: 'Women', category: 'Sneakers',     brand: 'Puma', size: ['5', '6', '7', '8'], color: 'Brown', img: '/image/footwear/women/brand/puma/c1.jpg' },
  { id: 174, name: 'Puma Cali Dream W',             price: '₹6,999',  originalPrice: '₹9,499',  rating: 4.5, tag: 'New',        gender: 'Women', category: 'Sneakers',     brand: 'Puma', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/puma/c2.jpg' },
  { id: 175, name: 'Puma RS-X Reinvention W',       price: '₹7,499',  originalPrice: '₹9,999',  rating: 4.7, tag: 'Trending',   gender: 'Women', category: 'Sneakers',     brand: 'Puma', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/puma/c3.jpg' },
  { id: 176, name: 'Puma Mayze Classic W',          price: '₹5,499',  originalPrice: '₹7,499',  rating: 4.4, tag: null,         gender: 'Women', category: 'Sneakers',     brand: 'Puma', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/puma/c4.jpg' },
  { id: 177, name: 'Puma Smash v2 W',              price: '₹3,999',  originalPrice: '₹5,499',  rating: 4.3, tag: 'Sale',       gender: 'Women', category: 'Sneakers',     brand: 'Puma', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/puma/c5.jpg' },
  { id: 178, name: 'Puma Basket Classic W',         price: '₹4,999',  originalPrice: '₹6,999',  rating: 4.5, tag: 'Popular',    gender: 'Women', category: 'Sneakers',     brand: 'Puma', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/puma/c6.jpg' },
  { id: 179, name: 'Puma Softride Remi W',          price: '₹3,499',  originalPrice: '₹4,999',  rating: 4.2, tag: null,         gender: 'Women', category: 'Sneakers',     brand: 'Puma', size: ['5', '6', '7', '8'], color: 'Pink',  img: '/image/footwear/women/brand/puma/c7.jpg' },
  { id: 180, name: 'Puma Cruise Rider Silk Road W', price: '₹6,499',  originalPrice: '₹8,999',  rating: 4.6, tag: 'New',        gender: 'Women', category: 'Sneakers',     brand: 'Puma', size: ['5', '6', '7', '8'], color: 'Beige', img: '/image/footwear/women/brand/puma/c8.jpg' },

  //woodland men
  { id: 181, name: 'Woodland Waterproof Hiking Boot', price: '₹4,999', originalPrice: '₹6,999', rating: 4.7, tag: 'Bestseller', gender: 'Men', category: 'Boots',      brand: 'Woodland', size: ['7', '8', '9', '10'], color: 'Brown', img: '/image/footwear/men/brand/woodland/a1.jpg' },
  { id: 182, name: 'Woodland Leather Trek Shoe',      price: '₹3,999', originalPrice: '₹5,999', rating: 4.6, tag: 'New',        gender: 'Men', category: 'Boots',      brand: 'Woodland', size: ['7', '8', '9', '10'], color: 'Brown', img: '/image/footwear/men/brand/woodland/a2.jpg' },
  { id: 183, name: 'Woodland Camel Outdoor Shoe',     price: '₹3,499', originalPrice: '₹4,999', rating: 4.5, tag: 'Sale',       gender: 'Men', category: 'Boots',      brand: 'Woodland', size: ['7', '8', '9', '10'], color: 'Camel', img: '/image/footwear/men/brand/woodland/a3.jpg' },
  { id: 184, name: 'Woodland Casual Lace-Up',         price: '₹2,999', originalPrice: '₹4,499', rating: 4.3, tag: null,         gender: 'Men', category: 'Boots',      brand: 'Woodland', size: ['7', '8', '9', '10'], color: 'Brown', img: '/image/footwear/men/brand/woodland/a4.jpg' },
  { id: 185, name: 'Woodland Full Grain Derby',       price: '₹4,499', originalPrice: '₹6,499', rating: 4.6, tag: 'Trending',   gender: 'Men', category: 'Boots',      brand: 'Woodland', size: ['7', '8', '9', '10'], color: 'Tan',   img: '/image/footwear/men/brand/woodland/a5.jpg' },
  { id: 186, name: 'Woodland Canvas Sneaker',         price: '₹2,499', originalPrice: '₹3,499', rating: 4.4, tag: 'Popular',    gender: 'Men', category: 'Boots',      brand: 'Woodland', size: ['7', '8', '9', '10'], color: 'Olive', img: '/image/footwear/men/brand/woodland/a6.jpg' },
  { id: 187, name: 'Woodland High Ankle Boot',        price: '₹5,499', originalPrice: '₹7,499', rating: 4.7, tag: null,         gender: 'Men', category: 'Boots',      brand: 'Woodland', size: ['7', '8', '9', '10'], color: 'Brown', img: '/image/footwear/men/brand/woodland/a7.jpg' },
  { id: 188, name: 'Woodland Nubuck Casual Shoe',     price: '₹3,199', originalPrice: '₹4,699', rating: 4.2, tag: 'Sale',       gender: 'Men', category: 'Boots',      brand: 'Woodland', size: ['7', '8', '9', '10'], color: 'Tan',   img: '/image/footwear/men/brand/woodland/a8.jpg' },
  { id: 189, name: 'Woodland Comfort Flip Flop',      price: '₹799',   originalPrice: '₹1,299', rating: 4.4, tag: 'Bestseller', gender: 'Men', category: 'Flip Flops', brand: 'Woodland', size: ['7', '8', '9', '10'], color: 'Brown', img: '/image/footwear/men/brand/woodland/b1.jpg' },
  { id: 190, name: 'Woodland Rubber Slide',           price: '₹699',   originalPrice: '₹1,099', rating: 4.3, tag: 'New',        gender: 'Men', category: 'Flip Flops', brand: 'Woodland', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/woodland/b2.jpg' },
  { id: 191, name: 'Woodland EVA Flip Flop',          price: '₹599',   originalPrice: '₹999',   rating: 4.2, tag: 'Sale',       gender: 'Men', category: 'Flip Flops', brand: 'Woodland', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/woodland/b3.jpg' },
  { id: 192, name: 'Woodland Sport Slide',            price: '₹899',   originalPrice: '₹1,399', rating: 4.5, tag: 'Trending',   gender: 'Men', category: 'Flip Flops', brand: 'Woodland', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/woodland/b4.jpg' },
  { id: 193, name: 'Woodland Casual Thong',           price: '₹749',   originalPrice: '₹1,199', rating: 4.1, tag: null,         gender: 'Men', category: 'Flip Flops', brand: 'Woodland', size: ['7', '8', '9', '10'], color: 'Brown', img: '/image/footwear/men/brand/woodland/b5.jpg' },
  { id: 194, name: 'Woodland Outdoor Slide',          price: '₹999',   originalPrice: '₹1,499', rating: 4.4, tag: 'Popular',    gender: 'Men', category: 'Flip Flops', brand: 'Woodland', size: ['7', '8', '9', '10'], color: 'Olive', img: '/image/footwear/men/brand/woodland/b6.jpg' },
  { id: 195, name: 'Woodland Memory Foam Slide',      price: '₹1,199', originalPrice: '₹1,799', rating: 4.5, tag: 'New',        gender: 'Men', category: 'Flip Flops', brand: 'Woodland', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/woodland/b7.jpg' },
  { id: 196, name: 'Woodland Basic Flip Flop',        price: '₹499',   originalPrice: '₹799',   rating: 4.0, tag: 'Sale',       gender: 'Men', category: 'Flip Flops', brand: 'Woodland', size: ['7', '8', '9', '10'], color: 'Brown', img: '/image/footwear/men/brand/woodland/b8.jpg' },

  //nb men
  { id: 197, name: 'New Balance Fresh Foam X 1080v13', price: '₹14,999', originalPrice: '₹19,999', rating: 4.8, tag: 'Bestseller', gender: 'Men', category: 'Sports Shoes', brand: 'New Balance', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/nb/a1.jpg' },
  { id: 198, name: 'New Balance 860v13',                price: '₹10,999', originalPrice: '₹14,999', rating: 4.7, tag: 'New',        gender: 'Men', category: 'Sports Shoes', brand: 'New Balance', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/nb/a2.jpg' },
  { id: 199, name: 'New Balance 680v7',                 price: '₹5,999',  originalPrice: '₹8,999',  rating: 4.4, tag: 'Sale',       gender: 'Men', category: 'Sports Shoes', brand: 'New Balance', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/nb/a3.jpg' },
  { id: 200, name: 'New Balance 411v3',                 price: '₹3,999',  originalPrice: '₹5,999',  rating: 4.3, tag: null,         gender: 'Men', category: 'Sports Shoes', brand: 'New Balance', size: ['7', '8', '9', '10'], color: 'Blue',  img: '/image/footwear/men/brand/nb/a4.jpg' },
  { id: 201, name: 'New Balance FuelCell Rebel v4',     price: '₹12,999', originalPrice: '₹17,999', rating: 4.6, tag: 'Trending',   gender: 'Men', category: 'Sports Shoes', brand: 'New Balance', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/nb/a5.jpg' },
  { id: 202, name: 'New Balance Fresh Foam 880v13',     price: '₹9,999',  originalPrice: '₹13,999', rating: 4.5, tag: 'Popular',    gender: 'Men', category: 'Sports Shoes', brand: 'New Balance', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/nb/a6.jpg' },
  { id: 203, name: 'New Balance SC Elite v4',           price: '₹17,999', originalPrice: '₹22,999', rating: 4.7, tag: null,         gender: 'Men', category: 'Sports Shoes', brand: 'New Balance', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/nb/a7.jpg' },
  { id: 204, name: 'New Balance 520v8',                 price: '₹4,499',  originalPrice: '₹6,499',  rating: 4.2, tag: 'Sale',       gender: 'Men', category: 'Sports Shoes', brand: 'New Balance', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/nb/a8.jpg' },
  { id: 205, name: 'New Balance 574 Core',              price: '₹7,499',  originalPrice: '₹9,999',  rating: 4.8, tag: 'Bestseller', gender: 'Men', category: 'Sneakers',     brand: 'New Balance', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/nb/b1.jpg' },
  { id: 206, name: 'New Balance 990v6',                 price: '₹18,999', originalPrice: '₹24,999', rating: 4.7, tag: 'Trending',   gender: 'Men', category: 'Sneakers',     brand: 'New Balance', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/nb/b2.jpg' },
  { id: 207, name: 'New Balance 550',                   price: '₹8,999',  originalPrice: '₹11,999', rating: 4.6, tag: 'New',        gender: 'Men', category: 'Sneakers',     brand: 'New Balance', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/nb/b3.jpg' },
  { id: 208, name: 'New Balance 327',                   price: '₹7,999',  originalPrice: '₹10,999', rating: 4.5, tag: null,         gender: 'Men', category: 'Sneakers',     brand: 'New Balance', size: ['7', '8', '9', '10'], color: 'Beige', img: '/image/footwear/men/brand/nb/b4.jpg' },
  { id: 209, name: 'New Balance 9060',                  price: '₹11,999', originalPrice: '₹15,999', rating: 4.6, tag: 'Popular',    gender: 'Men', category: 'Sneakers',     brand: 'New Balance', size: ['7', '8', '9', '10'], color: 'Brown', img: '/image/footwear/men/brand/nb/b5.jpg' },
  { id: 210, name: 'New Balance 2002R',                 price: '₹10,999', originalPrice: '₹14,999', rating: 4.7, tag: 'Bestseller', gender: 'Men', category: 'Sneakers',     brand: 'New Balance', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/nb/b6.jpg' },
  { id: 211, name: 'New Balance 1906R',                 price: '₹12,499', originalPrice: '₹16,999', rating: 4.6, tag: 'New',        gender: 'Men', category: 'Sneakers',     brand: 'New Balance', size: ['7', '8', '9', '10'], color: 'Silver',img: '/image/footwear/men/brand/nb/b7.jpg' },
  { id: 212, name: 'New Balance 373 Core',              price: '₹5,499',  originalPrice: '₹7,499',  rating: 4.3, tag: 'Sale',       gender: 'Men', category: 'Sneakers',     brand: 'New Balance', size: ['7', '8', '9', '10'], color: 'Navy',  img: '/image/footwear/men/brand/nb/b8.jpg' },
  { id: 213, name: 'New Balance Came Slide',            price: '₹1,999',  originalPrice: '₹2,999',  rating: 4.5, tag: 'Bestseller', gender: 'Men', category: 'Flip Flops',   brand: 'New Balance', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/nb/c1.jpg' },
  { id: 214, name: 'New Balance 200 Flip Flop',         price: '₹1,499',  originalPrice: '₹2,199',  rating: 4.4, tag: 'New',        gender: 'Men', category: 'Flip Flops',   brand: 'New Balance', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/nb/c2.jpg' },
  { id: 215, name: 'New Balance Piscean Slide',         price: '₹1,299',  originalPrice: '₹1,999',  rating: 4.3, tag: 'Sale',       gender: 'Men', category: 'Flip Flops',   brand: 'New Balance', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/nb/c3.jpg' },
  { id: 216, name: 'New Balance Recharge Slide',        price: '₹2,199',  originalPrice: '₹2,999',  rating: 4.6, tag: 'Trending',   gender: 'Men', category: 'Flip Flops',   brand: 'New Balance', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/nb/c4.jpg' },
  { id: 217, name: 'New Balance Cruz V2 Slide',         price: '₹1,799',  originalPrice: '₹2,499',  rating: 4.4, tag: null,         gender: 'Men', category: 'Flip Flops',   brand: 'New Balance', size: ['7', '8', '9', '10'], color: 'Blue',  img: '/image/footwear/men/brand/nb/c5.jpg' },
  { id: 218, name: 'New Balance Nubuck Slide',          price: '₹2,499',  originalPrice: '₹3,299',  rating: 4.5, tag: 'Popular',    gender: 'Men', category: 'Flip Flops',   brand: 'New Balance', size: ['7', '8', '9', '10'], color: 'Brown', img: '/image/footwear/men/brand/nb/c6.jpg' },
  { id: 219, name: 'New Balance Comfort Thong',         price: '₹1,099',  originalPrice: '₹1,699',  rating: 4.2, tag: 'Sale',       gender: 'Men', category: 'Flip Flops',   brand: 'New Balance', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/nb/c7.jpg' },
  { id: 220, name: 'New Balance Sport Slide',           price: '₹1,699',  originalPrice: '₹2,399',  rating: 4.3, tag: 'New',        gender: 'Men', category: 'Flip Flops',   brand: 'New Balance', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/nb/c8.jpg' },

  //nb women
  { id: 221, name: 'New Balance Fresh Foam X 1080v13 W', price: '₹14,999', originalPrice: '₹18,999', rating: 4.7, tag: 'Bestseller', gender: 'Women', category: 'Sports Shoes', brand: 'New Balance', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/nb/a1.jpg' },
  { id: 222, name: 'New Balance 574 Core W',              price: '₹6,999',  originalPrice: '₹8,999',  rating: 4.6, tag: 'New',        gender: 'Women', category: 'Sports Shoes', brand: 'New Balance', size: ['5', '6', '7', '8'], color: 'Grey',  img: '/image/footwear/women/brand/nb/a2.jpg' },
  { id: 223, name: 'New Balance FuelCell Rebel v3 W',     price: '₹11,999', originalPrice: '₹14,999', rating: 4.5, tag: 'Sale',       gender: 'Women', category: 'Sports Shoes', brand: 'New Balance', size: ['5', '6', '7', '8'], color: 'Pink',  img: '/image/footwear/women/brand/nb/a3.jpg' },
  { id: 224, name: 'New Balance 411 Running W',           price: '₹3,999',  originalPrice: '₹5,499',  rating: 4.4, tag: null,         gender: 'Women', category: 'Sports Shoes', brand: 'New Balance', size: ['5', '6', '7', '8'], color: 'Black', img: '/image/footwear/women/brand/nb/a4.jpg' },
  { id: 225, name: 'New Balance Fresh Foam Arishi v4 W',  price: '₹5,999',  originalPrice: '₹7,999',  rating: 4.6, tag: 'Trending',   gender: 'Women', category: 'Sports Shoes', brand: 'New Balance', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/nb/a5.jpg' },
  { id: 226, name: 'New Balance 520 v8 W',                price: '₹4,999',  originalPrice: '₹6,999',  rating: 4.5, tag: 'Popular',    gender: 'Women', category: 'Sports Shoes', brand: 'New Balance', size: ['5', '6', '7', '8'], color: 'Blue',  img: '/image/footwear/women/brand/nb/a6.jpg' },
  { id: 227, name: 'New Balance DynaSoft Nergize v3 W',   price: '₹7,499',  originalPrice: '₹9,999',  rating: 4.3, tag: null,         gender: 'Women', category: 'Sports Shoes', brand: 'New Balance', size: ['5', '6', '7', '8'], color: 'Grey',  img: '/image/footwear/women/brand/nb/a7.jpg' },
  { id: 228, name: 'New Balance 327 Lifestyle W',         price: '₹8,999',  originalPrice: '₹11,999', rating: 4.2, tag: 'Sale',       gender: 'Women', category: 'Sports Shoes', brand: 'New Balance', size: ['5', '6', '7', '8'], color: 'Beige', img: '/image/footwear/women/brand/nb/a8.jpg' },
  { id: 229, name: 'New Balance Recharge Slide W',        price: '₹1,999',  originalPrice: '₹2,799',  rating: 4.6, tag: 'Bestseller', gender: 'Women', category: 'Flip Flops',   brand: 'New Balance', size: ['5', '6', '7', '8'], color: 'Black', img: '/image/footwear/women/brand/nb/b1.jpg' },
  { id: 230, name: 'New Balance 200 Slide W',             price: '₹1,499',  originalPrice: '₹2,199',  rating: 4.5, tag: 'New',        gender: 'Women', category: 'Flip Flops',   brand: 'New Balance', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/nb/b2.jpg' },
  { id: 231, name: 'New Balance Cush+ Slide W',           price: '₹1,299',  originalPrice: '₹1,999',  rating: 4.4, tag: 'Sale',       gender: 'Women', category: 'Flip Flops',   brand: 'New Balance', size: ['5', '6', '7', '8'], color: 'Pink',  img: '/image/footwear/women/brand/nb/b3.jpg' },
  { id: 232, name: 'New Balance Softy Slide W',           price: '₹999',    originalPrice: '₹1,599',  rating: 4.3, tag: null,         gender: 'Women', category: 'Flip Flops',   brand: 'New Balance', size: ['5', '6', '7', '8'], color: 'Grey',  img: '/image/footwear/women/brand/nb/b4.jpg' },
  { id: 233, name: 'New Balance Fresh Foam Slide W',      price: '₹2,499',  originalPrice: '₹3,299',  rating: 4.5, tag: 'Trending',   gender: 'Women', category: 'Flip Flops',   brand: 'New Balance', size: ['5', '6', '7', '8'], color: 'Beige', img: '/image/footwear/women/brand/nb/b5.jpg' },
  { id: 234, name: 'New Balance Recovery Slide W',        price: '₹1,799',  originalPrice: '₹2,499',  rating: 4.4, tag: 'Popular',    gender: 'Women', category: 'Flip Flops',   brand: 'New Balance', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/nb/b6.jpg' },
  { id: 235, name: 'New Balance Flip Flop Classic W',     price: '₹899',    originalPrice: '₹1,399',  rating: 4.2, tag: 'Sale',       gender: 'Women', category: 'Flip Flops',   brand: 'New Balance', size: ['5', '6', '7', '8'], color: 'Blue',  img: '/image/footwear/women/brand/nb/b7.jpg' },
  { id: 236, name: 'New Balance Comfort Slide W',         price: '₹2,199',  originalPrice: '₹2,999',  rating: 4.3, tag: 'New',        gender: 'Women', category: 'Flip Flops',   brand: 'New Balance', size: ['5', '6', '7', '8'], color: 'Pink',  img: '/image/footwear/women/brand/nb/b8.jpg' },

  //skechers men
  { id: 237, name: 'Skechers Go Run Pulse 2.0',        price: '₹4,999', originalPrice: '₹6,999', rating: 4.7, tag: 'Bestseller', gender: 'Men', category: 'Sports Shoes', brand: 'Skechers', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/skechers/a1.jpg' },
  { id: 238, name: 'Skechers Arch Fit Orvan',           price: '₹5,999', originalPrice: '₹7,999', rating: 4.6, tag: 'New',        gender: 'Men', category: 'Sports Shoes', brand: 'Skechers', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/skechers/a2.jpg' },
  { id: 239, name: 'Skechers Max Cushioning Elite',     price: '₹6,499', originalPrice: '₹8,999', rating: 4.5, tag: 'Sale',       gender: 'Men', category: 'Sports Shoes', brand: 'Skechers', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/skechers/a3.jpg' },
  { id: 240, name: 'Skechers Go Walk 7',                price: '₹3,999', originalPrice: '₹5,499', rating: 4.4, tag: null,         gender: 'Men', category: 'Sports Shoes', brand: 'Skechers', size: ['7', '8', '9', '10'], color: 'Navy',  img: '/image/footwear/men/brand/skechers/a4.jpg' },
  { id: 241, name: 'Skechers Summits High Range',       price: '₹4,499', originalPrice: '₹6,499', rating: 4.6, tag: 'Trending',   gender: 'Men', category: 'Sports Shoes', brand: 'Skechers', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/skechers/a5.jpg' },
  { id: 242, name: 'Skechers Glide-Step Trail',         price: '₹5,499', originalPrice: '₹7,499', rating: 4.5, tag: 'Popular',    gender: 'Men', category: 'Sports Shoes', brand: 'Skechers', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/skechers/a6.jpg' },
  { id: 243, name: 'Skechers Go Run Consistent 2.0',    price: '₹4,299', originalPrice: '₹5,999', rating: 4.3, tag: null,         gender: 'Men', category: 'Sports Shoes', brand: 'Skechers', size: ['7', '8', '9', '10'], color: 'Blue',  img: '/image/footwear/men/brand/skechers/a7.jpg' },
  { id: 244, name: 'Skechers Equalizer 5.0',            price: '₹3,499', originalPrice: '₹4,999', rating: 4.2, tag: 'Sale',       gender: 'Men', category: 'Sports Shoes', brand: 'Skechers', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/skechers/a8.jpg' },
  { id: 245, name: 'Skechers Hyper Slide Sandal',       price: '₹1,499', originalPrice: '₹2,199', rating: 4.5, tag: 'Bestseller', gender: 'Men', category: 'Flip Flops',   brand: 'Skechers', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/skechers/b1.jpg' },
  { id: 246, name: 'Skechers Relaxed Fit Slide',        price: '₹1,299', originalPrice: '₹1,999', rating: 4.4, tag: 'New',        gender: 'Men', category: 'Flip Flops',   brand: 'Skechers', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/skechers/b2.jpg' },
  { id: 247, name: 'Skechers Go Consistent Sandal',     price: '₹999',   originalPrice: '₹1,599', rating: 4.3, tag: 'Sale',       gender: 'Men', category: 'Flip Flops',   brand: 'Skechers', size: ['7', '8', '9', '10'], color: 'Navy',  img: '/image/footwear/men/brand/skechers/b3.jpg' },
  { id: 248, name: 'Skechers Foamies Creston',          price: '₹1,199', originalPrice: '₹1,799', rating: 4.2, tag: null,         gender: 'Men', category: 'Flip Flops',   brand: 'Skechers', size: ['7', '8', '9', '10'], color: 'Blue',  img: '/image/footwear/men/brand/skechers/b4.jpg' },
  { id: 249, name: 'Skechers Go Walk Flex Sandal',      price: '₹1,699', originalPrice: '₹2,399', rating: 4.5, tag: 'Trending',   gender: 'Men', category: 'Flip Flops',   brand: 'Skechers', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/skechers/b5.jpg' },
  { id: 250, name: 'Skechers Arch Fit Slide',           price: '₹1,999', originalPrice: '₹2,799', rating: 4.6, tag: 'Popular',    gender: 'Men', category: 'Flip Flops',   brand: 'Skechers', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/skechers/b6.jpg' },
  { id: 251, name: 'Skechers Melbo Journeyman Flip',    price: '₹899',   originalPrice: '₹1,399', rating: 4.1, tag: 'Sale',       gender: 'Men', category: 'Flip Flops',   brand: 'Skechers', size: ['7', '8', '9', '10'], color: 'Brown', img: '/image/footwear/men/brand/skechers/b7.jpg' },
  { id: 252, name: 'Skechers Max Cushioning Slide',     price: '₹1,799', originalPrice: '₹2,499', rating: 4.4, tag: 'New',        gender: 'Men', category: 'Flip Flops',   brand: 'Skechers', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/skechers/b8.jpg' },

  //skechers women
  { id: 253, name: 'Skechers Go Run Consistent 2.0',       price: '₹4,499', originalPrice: '₹6,499', rating: 4.7, tag: 'Bestseller', gender: 'Women', category: 'Sports Shoes', brand: 'Skechers', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/skechers/a1.jpg' },
  { id: 254, name: 'Skechers Arch Fit Uplift',             price: '₹5,499', originalPrice: '₹7,499', rating: 4.6, tag: 'New',        gender: 'Women', category: 'Sports Shoes', brand: 'Skechers', size: ['5', '6', '7', '8'], color: 'Grey',  img: '/image/footwear/women/brand/skechers/a2.jpg' },
  { id: 255, name: 'Skechers Max Cushioning Premier',      price: '₹5,999', originalPrice: '₹8,499', rating: 4.5, tag: 'Sale',       gender: 'Women', category: 'Sports Shoes', brand: 'Skechers', size: ['5', '6', '7', '8'], color: 'Black', img: '/image/footwear/women/brand/skechers/a3.jpg' },
  { id: 256, name: 'Skechers Go Walk Joy',                 price: '₹3,799', originalPrice: '₹5,299', rating: 4.4, tag: null,         gender: 'Women', category: 'Sports Shoes', brand: 'Skechers', size: ['5', '6', '7', '8'], color: 'Navy',  img: '/image/footwear/women/brand/skechers/a4.jpg' },
  { id: 257, name: 'Skechers Summits Crown Jewel',         price: '₹4,299', originalPrice: '₹5,999', rating: 4.6, tag: 'Trending',   gender: 'Women', category: 'Sports Shoes', brand: 'Skechers', size: ['5', '6', '7', '8'], color: 'Pink',  img: '/image/footwear/women/brand/skechers/a5.jpg' },
  { id: 258, name: 'Skechers Glide Step Swift',            price: '₹4,999', originalPrice: '₹6,999', rating: 4.5, tag: 'Popular',    gender: 'Women', category: 'Sports Shoes', brand: 'Skechers', size: ['5', '6', '7', '8'], color: 'Grey',  img: '/image/footwear/women/brand/skechers/a6.jpg' },
  { id: 259, name: 'Skechers Go Run Pulse 2.0 W',         price: '₹3,999', originalPrice: '₹5,499', rating: 4.3, tag: null,         gender: 'Women', category: 'Sports Shoes', brand: 'Skechers', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/skechers/a7.jpg' },
  { id: 260, name: 'Skechers Equalizer 5.0 Trrizn',       price: '₹3,299', originalPrice: '₹4,799', rating: 4.2, tag: 'Sale',       gender: 'Women', category: 'Sports Shoes', brand: 'Skechers', size: ['5', '6', '7', '8'], color: 'Black', img: '/image/footwear/women/brand/skechers/a8.jpg' },
  { id: 261, name: 'Skechers Street Bobs Squad',          price: '₹2,999', originalPrice: '₹4,299', rating: 4.6, tag: 'Bestseller', gender: 'Women', category: 'Sneakers',     brand: 'Skechers', size: ['5', '6', '7', '8'], color: 'Black', img: '/image/footwear/women/brand/skechers/b1.jpg' },
  { id: 262, name: 'Skechers Bobs Bamina',                price: '₹2,499', originalPrice: '₹3,699', rating: 4.5, tag: 'New',        gender: 'Women', category: 'Sneakers',     brand: 'Skechers', size: ['5', '6', '7', '8'], color: 'Grey',  img: '/image/footwear/women/brand/skechers/b2.jpg' },
  { id: 263, name: 'Skechers Uno Stand On Air',           price: '₹3,299', originalPrice: '₹4,799', rating: 4.7, tag: 'Trending',   gender: 'Women', category: 'Sneakers',     brand: 'Skechers', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/skechers/b3.jpg' },
  { id: 264, name: "Skechers D'Lites Fresh Start",        price: '₹2,799', originalPrice: '₹3,999', rating: 4.4, tag: null,         gender: 'Women', category: 'Sneakers',     brand: 'Skechers', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/skechers/b4.jpg' },
  { id: 265, name: 'Skechers Breathe Easy Sweet Jamz',    price: '₹2,299', originalPrice: '₹3,299', rating: 4.3, tag: 'Sale',       gender: 'Women', category: 'Sneakers',     brand: 'Skechers', size: ['5', '6', '7', '8'], color: 'Pink',  img: '/image/footwear/women/brand/skechers/b5.jpg' },
  { id: 266, name: 'Skechers Graceful Get Connected',     price: '₹2,599', originalPrice: '₹3,799', rating: 4.5, tag: 'Popular',    gender: 'Women', category: 'Sneakers',     brand: 'Skechers', size: ['5', '6', '7', '8'], color: 'Grey',  img: '/image/footwear/women/brand/skechers/b6.jpg' },
  { id: 267, name: 'Skechers Bobs Plush Be Loved',        price: '₹1,999', originalPrice: '₹2,999', rating: 4.2, tag: null,         gender: 'Women', category: 'Sneakers',     brand: 'Skechers', size: ['5', '6', '7', '8'], color: 'Black', img: '/image/footwear/women/brand/skechers/b7.jpg' },
  { id: 268, name: 'Skechers Street Flex Appeal 4.0',     price: '₹3,499', originalPrice: '₹4,999', rating: 4.6, tag: 'New',        gender: 'Women', category: 'Sneakers',     brand: 'Skechers', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/skechers/b8.jpg' },
  { id: 269, name: 'Skechers Cali Breeze 2.0',           price: '₹1,299', originalPrice: '₹1,999', rating: 4.6, tag: 'Bestseller', gender: 'Women', category: 'Flip Flops',   brand: 'Skechers', size: ['5', '6', '7', '8'], color: 'Beige', img: '/image/footwear/women/brand/skechers/c1.jpg' },
  { id: 270, name: 'Skechers Meditation Rock Crown',      price: '₹1,099', originalPrice: '₹1,699', rating: 4.4, tag: 'New',        gender: 'Women', category: 'Flip Flops',   brand: 'Skechers', size: ['5', '6', '7', '8'], color: 'Pink',  img: '/image/footwear/women/brand/skechers/c2.jpg' },
  { id: 271, name: 'Skechers Go Consistent Sandal W',     price: '₹899',   originalPrice: '₹1,499', rating: 4.3, tag: 'Sale',       gender: 'Women', category: 'Flip Flops',   brand: 'Skechers', size: ['5', '6', '7', '8'], color: 'Grey',  img: '/image/footwear/women/brand/skechers/c3.jpg' },
  { id: 272, name: 'Skechers Foamies Arch Fit',          price: '₹1,199', originalPrice: '₹1,799', rating: 4.2, tag: null,         gender: 'Women', category: 'Flip Flops',   brand: 'Skechers', size: ['5', '6', '7', '8'], color: 'White', img: '/image/footwear/women/brand/skechers/c4.jpg' },
  { id: 273, name: 'Skechers Hyper Slide Luxe',          price: '₹1,599', originalPrice: '₹2,299', rating: 4.5, tag: 'Trending',   gender: 'Women', category: 'Flip Flops',   brand: 'Skechers', size: ['5', '6', '7', '8'], color: 'Pink',  img: '/image/footwear/women/brand/skechers/c5.jpg' },
  { id: 274, name: 'Skechers Arch Fit Slide W',          price: '₹1,899', originalPrice: '₹2,699', rating: 4.6, tag: 'Popular',    gender: 'Women', category: 'Flip Flops',   brand: 'Skechers', size: ['5', '6', '7', '8'], color: 'Black', img: '/image/footwear/women/brand/skechers/c6.jpg' },
  { id: 275, name: 'Skechers Cali Gear Slide',           price: '₹799',   originalPrice: '₹1,299', rating: 4.1, tag: 'Sale',       gender: 'Women', category: 'Flip Flops',   brand: 'Skechers', size: ['5', '6', '7', '8'], color: 'Blue',  img: '/image/footwear/women/brand/skechers/c7.jpg' },
  { id: 276, name: 'Skechers Max Cushioning Luxe Slide', price: '₹1,699', originalPrice: '₹2,399', rating: 4.4, tag: 'New',        gender: 'Women', category: 'Flip Flops',   brand: 'Skechers', size: ['5', '6', '7', '8'], color: 'Grey',  img: '/image/footwear/women/brand/skechers/c8.jpg' },

  //asics men
  { id: 277, name: 'ASICS Gel-Nimbus 26',          price: '₹15,999', originalPrice: '₹20,999', rating: 4.8, tag: 'Bestseller', gender: 'Men', category: 'Sports Shoes', brand: 'ASICS', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/asics/a1.jpg' },
  { id: 278, name: 'ASICS Gel-Kayano 31',           price: '₹14,999', originalPrice: '₹19,999', rating: 4.7, tag: 'New',        gender: 'Men', category: 'Sports Shoes', brand: 'ASICS', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/asics/a2.jpg' },
  { id: 279, name: 'ASICS Gel-Cumulus 26',          price: '₹11,999', originalPrice: '₹15,999', rating: 4.6, tag: 'Sale',       gender: 'Men', category: 'Sports Shoes', brand: 'ASICS', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/asics/a3.jpg' },
  { id: 280, name: 'ASICS Gel-Contend 9',           price: '₹4,999',  originalPrice: '₹6,999',  rating: 4.3, tag: null,         gender: 'Men', category: 'Sports Shoes', brand: 'ASICS', size: ['7', '8', '9', '10'], color: 'Blue',  img: '/image/footwear/men/brand/asics/a4.jpg' },
  { id: 281, name: 'ASICS GT-2000 13',              price: '₹9,999',  originalPrice: '₹13,999', rating: 4.6, tag: 'Trending',   gender: 'Men', category: 'Sports Shoes', brand: 'ASICS', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/asics/a5.jpg' },
  { id: 282, name: 'ASICS Gel-Excite 10',           price: '₹5,999',  originalPrice: '₹8,499',  rating: 4.4, tag: 'Popular',    gender: 'Men', category: 'Sports Shoes', brand: 'ASICS', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/asics/a6.jpg' },
  { id: 283, name: 'ASICS Metaspeed Sky+',          price: '₹19,999', originalPrice: '₹25,999', rating: 4.9, tag: null,         gender: 'Men', category: 'Sports Shoes', brand: 'ASICS', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/asics/a7.jpg' },
  { id: 284, name: 'ASICS Gel-Venture 9',           price: '₹3,999',  originalPrice: '₹5,999',  rating: 4.2, tag: 'Sale',       gender: 'Men', category: 'Sports Shoes', brand: 'ASICS', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/asics/a8.jpg' },
  { id: 285, name: 'ASICS Gel-1130',                price: '₹8,999',  originalPrice: '₹11,999', rating: 4.8, tag: 'Bestseller', gender: 'Men', category: 'Sneakers',     brand: 'ASICS', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/asics/b1.jpg' },
  { id: 286, name: 'ASICS Gel-NYC',                 price: '₹9,999',  originalPrice: '₹13,499', rating: 4.7, tag: 'Trending',   gender: 'Men', category: 'Sneakers',     brand: 'ASICS', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/asics/b2.jpg' },
  { id: 287, name: 'ASICS Gel-Lyte III OG',         price: '₹7,999',  originalPrice: '₹10,999', rating: 4.5, tag: 'New',        gender: 'Men', category: 'Sneakers',     brand: 'ASICS', size: ['7', '8', '9', '10'], color: 'Cream', img: '/image/footwear/men/brand/asics/b3.jpg' },
  { id: 288, name: 'ASICS Gel-Terrain',             price: '₹8,499',  originalPrice: '₹11,499', rating: 4.4, tag: null,         gender: 'Men', category: 'Sneakers',     brand: 'ASICS', size: ['7', '8', '9', '10'], color: 'Olive', img: '/image/footwear/men/brand/asics/b4.jpg' },
  { id: 289, name: 'ASICS Gel-1090v2',              price: '₹7,499',  originalPrice: '₹9,999',  rating: 4.5, tag: 'Popular',    gender: 'Men', category: 'Sneakers',     brand: 'ASICS', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/asics/b5.jpg' },
  { id: 290, name: 'ASICS Gel-Quantum 360 VIII',    price: '₹12,999', originalPrice: '₹16,999', rating: 4.6, tag: 'Bestseller', gender: 'Men', category: 'Sneakers',     brand: 'ASICS', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/asics/b6.jpg' },
  { id: 291, name: 'ASICS Gel-PTG',                 price: '₹6,999',  originalPrice: '₹9,499',  rating: 4.4, tag: 'New',        gender: 'Men', category: 'Sneakers',     brand: 'ASICS', size: ['7', '8', '9', '10'], color: 'Navy',  img: '/image/footwear/men/brand/asics/b7.jpg' },
  { id: 292, name: 'ASICS Japan S',                 price: '₹5,999',  originalPrice: '₹7,999',  rating: 4.3, tag: 'Sale',       gender: 'Men', category: 'Sneakers',     brand: 'ASICS', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/asics/b8.jpg' },
  { id: 293, name: 'ASICS Gel-Slide Sandal',        price: '₹1,999',  originalPrice: '₹2,999',  rating: 4.5, tag: 'Bestseller', gender: 'Men', category: 'Flip Flops',   brand: 'ASICS', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/asics/c1.jpg' },
  { id: 294, name: 'ASICS Flip Flop SP',            price: '₹1,299',  originalPrice: '₹1,999',  rating: 4.4, tag: 'New',        gender: 'Men', category: 'Flip Flops',   brand: 'ASICS', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/asics/c2.jpg' },
  { id: 295, name: 'ASICS Gel-Relaxed Slide',       price: '₹1,499',  originalPrice: '₹2,199',  rating: 4.3, tag: 'Sale',       gender: 'Men', category: 'Flip Flops',   brand: 'ASICS', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/asics/c3.jpg' },
  { id: 296, name: 'ASICS Recover Slide',           price: '₹2,299',  originalPrice: '₹3,199',  rating: 4.6, tag: 'Trending',   gender: 'Men', category: 'Flip Flops',   brand: 'ASICS', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/asics/c4.jpg' },
  { id: 297, name: 'ASICS Gel-Mossa Flip',          price: '₹1,199',  originalPrice: '₹1,799',  rating: 4.2, tag: null,         gender: 'Men', category: 'Flip Flops',   brand: 'ASICS', size: ['7', '8', '9', '10'], color: 'Blue',  img: '/image/footwear/men/brand/asics/c5.jpg' },
  { id: 298, name: 'ASICS Gel-Comfort Slide',       price: '₹2,499',  originalPrice: '₹3,299',  rating: 4.5, tag: 'Popular',    gender: 'Men', category: 'Flip Flops',   brand: 'ASICS', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/asics/c6.jpg' },
  { id: 299, name: 'ASICS Sport Thong',             price: '₹999',    originalPrice: '₹1,499',  rating: 4.1, tag: 'Sale',       gender: 'Men', category: 'Flip Flops',   brand: 'ASICS', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/asics/c7.jpg' },
  { id: 300, name: 'ASICS Gel-Bright Slide',        price: '₹1,799',  originalPrice: '₹2,499',  rating: 4.4, tag: 'New',        gender: 'Men', category: 'Flip Flops',   brand: 'ASICS', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/asics/c8.jpg' },

  //ua men
  { id: 301, name: 'UA HOVR Sonic 6',           price: '₹8,999',  originalPrice: '₹12,999', rating: 4.7, tag: 'Bestseller', gender: 'Men', category: 'Sports Shoes', brand: 'Under Armour', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/ua/a1.jpg' },
  { id: 302, name: 'UA HOVR Machina 3',         price: '₹11,999', originalPrice: '₹15,999', rating: 4.8, tag: 'New',        gender: 'Men', category: 'Sports Shoes', brand: 'Under Armour', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/ua/a2.jpg' },
  { id: 303, name: 'UA Charged Pursuit 3',      price: '₹4,999',  originalPrice: '₹6,999',  rating: 4.5, tag: 'Sale',       gender: 'Men', category: 'Sports Shoes', brand: 'Under Armour', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/ua/a3.jpg' },
  { id: 304, name: 'UA Charged Assert 10',      price: '₹3,999',  originalPrice: '₹5,999',  rating: 4.3, tag: null,         gender: 'Men', category: 'Sports Shoes', brand: 'Under Armour', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/ua/a4.jpg' },
  { id: 305, name: 'UA Infinite Elite',         price: '₹13,999', originalPrice: '₹18,999', rating: 4.6, tag: 'Trending',   gender: 'Men', category: 'Sports Shoes', brand: 'Under Armour', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/ua/a5.jpg' },
  { id: 306, name: 'UA Charged Rogue 4',        price: '₹6,999',  originalPrice: '₹9,999',  rating: 4.5, tag: 'Popular',    gender: 'Men', category: 'Sports Shoes', brand: 'Under Armour', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/ua/a6.jpg' },
  { id: 307, name: 'UA Project Rock 6',         price: '₹12,999', originalPrice: '₹17,999', rating: 4.7, tag: null,         gender: 'Men', category: 'Sports Shoes', brand: 'Under Armour', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/ua/a7.jpg' },
  { id: 308, name: 'UA Charged Breathe 2',      price: '₹3,499',  originalPrice: '₹5,499',  rating: 4.2, tag: 'Sale',       gender: 'Men', category: 'Sports Shoes', brand: 'Under Armour', size: ['7', '8', '9', '10'], color: 'Blue',  img: '/image/footwear/men/brand/ua/a8.jpg' },
  { id: 309, name: 'UA Ansa Fixed Slide',       price: '₹1,999',  originalPrice: '₹2,999',  rating: 4.5, tag: 'Bestseller', gender: 'Men', category: 'Flip Flops',   brand: 'Under Armour', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/ua/b1.jpg' },
  { id: 310, name: 'UA Ignite Select Slide',    price: '₹2,299',  originalPrice: '₹3,199',  rating: 4.6, tag: 'New',        gender: 'Men', category: 'Flip Flops',   brand: 'Under Armour', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/ua/b2.jpg' },
  { id: 311, name: 'UA Locker IV Slide',        price: '₹1,499',  originalPrice: '₹2,199',  rating: 4.3, tag: 'Sale',       gender: 'Men', category: 'Flip Flops',   brand: 'Under Armour', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/ua/b3.jpg' },
  { id: 312, name: 'UA Ignite Pro Slide',       price: '₹1,799',  originalPrice: '₹2,599',  rating: 4.4, tag: null,         gender: 'Men', category: 'Flip Flops',   brand: 'Under Armour', size: ['7', '8', '9', '10'], color: 'White', img: '/image/footwear/men/brand/ua/b4.jpg' },
  { id: 313, name: 'UA Ansa Graphic Slide',     price: '₹1,699',  originalPrice: '₹2,399',  rating: 4.2, tag: 'Trending',   gender: 'Men', category: 'Flip Flops',   brand: 'Under Armour', size: ['7', '8', '9', '10'], color: 'Blue',  img: '/image/footwear/men/brand/ua/b5.jpg' },
  { id: 314, name: 'UA Core Flip Flop',         price: '₹1,299',  originalPrice: '₹1,899',  rating: 4.3, tag: 'Popular',    gender: 'Men', category: 'Flip Flops',   brand: 'Under Armour', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/ua/b6.jpg' },
  { id: 315, name: 'UA Ignite Boundless Slide', price: '₹2,499',  originalPrice: '₹3,299',  rating: 4.5, tag: 'New',        gender: 'Men', category: 'Flip Flops',   brand: 'Under Armour', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/ua/b7.jpg' },
  { id: 316, name: 'UA Sport Flip Flop',        price: '₹999',    originalPrice: '₹1,499',  rating: 4.1, tag: 'Sale',       gender: 'Men', category: 'Flip Flops',   brand: 'Under Armour', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/ua/b8.jpg' },

  //bata men 
  { id: 317, name: 'Bata Classic Oxford Lace-Up', price: '₹2,999', originalPrice: '₹4,499', rating: 4.6, tag: 'Bestseller', gender: 'Men', category: 'Formal Shoes', brand: 'Bata', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/bata/a1.jpg' },
  { id: 318, name: 'Bata Leather Derby Shoe',     price: '₹3,499', originalPrice: '₹4,999', rating: 4.5, tag: 'New',        gender: 'Men', category: 'Formal Shoes', brand: 'Bata', size: ['7', '8', '9', '10'], color: 'Brown', img: '/image/footwear/men/brand/bata/a2.jpg' },
  { id: 319, name: 'Bata Formal Slip-On',         price: '₹2,499', originalPrice: '₹3,699', rating: 4.4, tag: 'Sale',       gender: 'Men', category: 'Formal Shoes', brand: 'Bata', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/bata/a3.jpg' },
  { id: 320, name: 'Bata Brogue Formal Shoe',     price: '₹3,199', originalPrice: '₹4,799', rating: 4.3, tag: null,         gender: 'Men', category: 'Formal Shoes', brand: 'Bata', size: ['7', '8', '9', '10'], color: 'Tan',   img: '/image/footwear/men/brand/bata/a4.jpg' },
  { id: 321, name: 'Bata Patent Leather Shoe',    price: '₹3,999', originalPrice: '₹5,499', rating: 4.5, tag: 'Trending',   gender: 'Men', category: 'Formal Shoes', brand: 'Bata', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/bata/a5.jpg' },
  { id: 322, name: 'Bata Monk Strap Formal',      price: '₹3,699', originalPrice: '₹5,199', rating: 4.6, tag: 'Popular',    gender: 'Men', category: 'Formal Shoes', brand: 'Bata', size: ['7', '8', '9', '10'], color: 'Brown', img: '/image/footwear/men/brand/bata/a6.jpg' },
  { id: 323, name: 'Bata Textured Cap Toe',       price: '₹2,799', originalPrice: '₹3,999', rating: 4.4, tag: null,         gender: 'Men', category: 'Formal Shoes', brand: 'Bata', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/bata/a7.jpg' },
  { id: 324, name: 'Bata Budget Formal Lace-Up',  price: '₹1,799', originalPrice: '₹2,799', rating: 4.2, tag: 'Sale',       gender: 'Men', category: 'Formal Shoes', brand: 'Bata', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/bata/a8.jpg' },
  { id: 325, name: 'Bata Comfit Slide',           price: '₹599',   originalPrice: '₹999',   rating: 4.4, tag: 'Bestseller', gender: 'Men', category: 'Flip Flops',   brand: 'Bata', size: ['7', '8', '9', '10'], color: 'Brown', img: '/image/footwear/men/brand/bata/b1.jpg' },
  { id: 326, name: 'Bata Hawai Flip Flop',        price: '₹299',   originalPrice: '₹499',   rating: 4.3, tag: 'New',        gender: 'Men', category: 'Flip Flops',   brand: 'Bata', size: ['7', '8', '9', '10'], color: 'Blue',  img: '/image/footwear/men/brand/bata/b2.jpg' },
  { id: 327, name: 'Bata Relaxed Slide',          price: '₹499',   originalPrice: '₹799',   rating: 4.2, tag: 'Sale',       gender: 'Men', category: 'Flip Flops',   brand: 'Bata', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/bata/b3.jpg' },
  { id: 328, name: 'Bata EVA Comfort Slide',      price: '₹699',   originalPrice: '₹1,099', rating: 4.3, tag: null,         gender: 'Men', category: 'Flip Flops',   brand: 'Bata', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/bata/b4.jpg' },
  { id: 329, name: 'Bata Cushion Flip Flop',      price: '₹399',   originalPrice: '₹699',   rating: 4.1, tag: 'Trending',   gender: 'Men', category: 'Flip Flops',   brand: 'Bata', size: ['7', '8', '9', '10'], color: 'Brown', img: '/image/footwear/men/brand/bata/b5.jpg' },
  { id: 330, name: 'Bata Sport Slide',            price: '₹799',   originalPrice: '₹1,199', rating: 4.4, tag: 'Popular',    gender: 'Men', category: 'Flip Flops',   brand: 'Bata', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/bata/b6.jpg' },
  { id: 331, name: 'Bata Classic Thong',          price: '₹349',   originalPrice: '₹599',   rating: 4.0, tag: 'Sale',       gender: 'Men', category: 'Flip Flops',   brand: 'Bata', size: ['7', '8', '9', '10'], color: 'Brown', img: '/image/footwear/men/brand/bata/b7.jpg' },
  { id: 332, name: 'Bata Arch Support Slide',     price: '₹899',   originalPrice: '₹1,299', rating: 4.5, tag: 'New',        gender: 'Men', category: 'Flip Flops',   brand: 'Bata', size: ['7', '8', '9', '10'], color: 'Grey',  img: '/image/footwear/men/brand/bata/b8.jpg' },

  //lee cooper men
  { id: 333, name: 'Lee Cooper Oxford Lace-Up',       price: '₹2,499', originalPrice: '₹3,499', rating: 4.6, tag: 'Bestseller', gender: 'Men', category: 'Formal Shoes', brand: 'Lee Cooper', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/lc/a1.jpg' },
  { id: 334, name: 'Lee Cooper Derby Formal',          price: '₹2,199', originalPrice: '₹3,199', rating: 4.5, tag: 'New',        gender: 'Men', category: 'Formal Shoes', brand: 'Lee Cooper', size: ['7', '8', '9', '10'], color: 'Brown', img: '/image/footwear/men/brand/lc/a2.jpg' },
  { id: 335, name: 'Lee Cooper Monk Strap Shoe',       price: '₹2,799', originalPrice: '₹3,999', rating: 4.4, tag: 'Sale',       gender: 'Men', category: 'Formal Shoes', brand: 'Lee Cooper', size: ['7', '8', '9', '10'], color: 'Tan',   img: '/image/footwear/men/brand/lc/a3.jpg' },
  { id: 336, name: 'Lee Cooper Brogue Shoe',           price: '₹2,599', originalPrice: '₹3,699', rating: 4.3, tag: null,         gender: 'Men', category: 'Formal Shoes', brand: 'Lee Cooper', size: ['7', '8', '9', '10'], color: 'Brown', img: '/image/footwear/men/brand/lc/a4.jpg' },
  { id: 337, name: 'Lee Cooper Slip-On Formal',        price: '₹1,999', originalPrice: '₹2,999', rating: 4.5, tag: 'Trending',   gender: 'Men', category: 'Formal Shoes', brand: 'Lee Cooper', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/lc/a5.jpg' },
  { id: 338, name: 'Lee Cooper Chelsea Boot',          price: '₹3,199', originalPrice: '₹4,499', rating: 4.6, tag: 'Popular',    gender: 'Men', category: 'Formal Shoes', brand: 'Lee Cooper', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/lc/a6.jpg' },
  { id: 339, name: 'Lee Cooper Cap Toe Oxford',        price: '₹2,699', originalPrice: '₹3,799', rating: 4.4, tag: null,         gender: 'Men', category: 'Formal Shoes', brand: 'Lee Cooper', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/lc/a7.jpg' },
  { id: 340, name: 'Lee Cooper Wing Tip Brogue',       price: '₹2,899', originalPrice: '₹3,999', rating: 4.3, tag: 'Sale',       gender: 'Men', category: 'Formal Shoes', brand: 'Lee Cooper', size: ['7', '8', '9', '10'], color: 'Brown', img: '/image/footwear/men/brand/lc/a8.jpg' },
  { id: 341, name: 'Lee Cooper Pointed Toe Formal',    price: '₹2,349', originalPrice: '₹3,299', rating: 4.5, tag: 'New',        gender: 'Men', category: 'Formal Shoes', brand: 'Lee Cooper', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/lc/a9.jpg' },
  { id: 342, name: 'Lee Cooper Double Monk Shoe',      price: '₹3,099', originalPrice: '₹4,299', rating: 4.6, tag: 'Bestseller', gender: 'Men', category: 'Formal Shoes', brand: 'Lee Cooper', size: ['7', '8', '9', '10'], color: 'Tan',   img: '/image/footwear/men/brand/lc/a10.jpg' },
  { id: 343, name: 'Lee Cooper Leather Derby',         price: '₹2,499', originalPrice: '₹3,499', rating: 4.4, tag: 'Trending',   gender: 'Men', category: 'Formal Shoes', brand: 'Lee Cooper', size: ['7', '8', '9', '10'], color: 'Brown', img: '/image/footwear/men/brand/lc/a11.jpg' },
  { id: 344, name: 'Lee Cooper Classic Office Shoe',   price: '₹1,899', originalPrice: '₹2,799', rating: 4.2, tag: 'Sale',       gender: 'Men', category: 'Formal Shoes', brand: 'Lee Cooper', size: ['7', '8', '9', '10'], color: 'Black', img: '/image/footwear/men/brand/lc/a12.jpg' },

  //aldo women
{ id: 345, name: 'Aldo Stessy Stiletto Heel',          price: '₹5,999', originalPrice: '₹8,499', rating: 4.7, tag: 'Bestseller', gender: 'Women', category: 'Heels',      brand: 'Aldo',         size: ['5', '6', '7', '8'], color: 'Black',  img: '/image/footwear/women/brand/aldo/a1.jpg' },
  { id: 346, name: 'Aldo Criwiel Block Heel',             price: '₹4,999', originalPrice: '₹6,999', rating: 4.6, tag: 'New',        gender: 'Women', category: 'Heels',      brand: 'Aldo',         size: ['5', '6', '7', '8'], color: 'Nude',   img: '/image/footwear/women/brand/aldo/a2.jpg' },
  { id: 347, name: 'Aldo Bowien Ankle Strap Heel',        price: '₹5,499', originalPrice: '₹7,499', rating: 4.5, tag: 'Sale',       gender: 'Women', category: 'Heels',      brand: 'Aldo',         size: ['5', '6', '7', '8'], color: 'Brown',  img: '/image/footwear/women/brand/aldo/a3.jpg' },
  { id: 348, name: 'Aldo Mirayla Kitten Heel',            price: '₹3,999', originalPrice: '₹5,499', rating: 4.4, tag: null,         gender: 'Women', category: 'Heels',      brand: 'Aldo',         size: ['5', '6', '7', '8'], color: 'Beige',  img: '/image/footwear/women/brand/aldo/a4.jpg' },
  { id: 349, name: 'Aldo Kassedy Platform Heel',          price: '₹6,499', originalPrice: '₹8,999', rating: 4.6, tag: 'Trending',   gender: 'Women', category: 'Heels',      brand: 'Aldo',         size: ['5', '6', '7', '8'], color: 'Black',  img: '/image/footwear/women/brand/aldo/a5.jpg' },
  { id: 350, name: 'Aldo Sevaulle Strappy Heel',          price: '₹5,999', originalPrice: '₹7,999', rating: 4.5, tag: 'Popular',    gender: 'Women', category: 'Heels',      brand: 'Aldo',         size: ['5', '6', '7', '8'], color: 'Gold',   img: '/image/footwear/women/brand/aldo/a6.jpg' },
  { id: 351, name: 'Aldo Brileyy Pointed Toe Heel',       price: '₹4,499', originalPrice: '₹6,299', rating: 4.3, tag: null,         gender: 'Women', category: 'Heels',      brand: 'Aldo',         size: ['5', '6', '7', '8'], color: 'Red',    img: '/image/footwear/women/brand/aldo/a7.jpg' },
  { id: 352, name: 'Aldo Onardonia Mule Heel',            price: '₹4,999', originalPrice: '₹6,999', rating: 4.2, tag: 'Sale',       gender: 'Women', category: 'Heels',      brand: 'Aldo',         size: ['5', '6', '7', '8'], color: 'White',  img: '/image/footwear/women/brand/aldo/a8.jpg' },
  { id: 353, name: 'Aldo Balera Ballet Flat',             price: '₹2,999', originalPrice: '₹4,299', rating: 4.6, tag: 'Bestseller', gender: 'Women', category: 'Flats',      brand: 'Aldo',         size: ['5', '6', '7', '8'], color: 'Pink',   img: '/image/footwear/women/brand/aldo/b1.jpg' },
  { id: 354, name: 'Aldo Ceria Pointed Flat',             price: '₹2,499', originalPrice: '₹3,699', rating: 4.5, tag: 'New',        gender: 'Women', category: 'Flats',      brand: 'Aldo',         size: ['5', '6', '7', '8'], color: 'Black',  img: '/image/footwear/women/brand/aldo/b2.jpg' },
  { id: 355, name: 'Aldo Ritha Slip-on Flat',             price: '₹2,199', originalPrice: '₹3,299', rating: 4.4, tag: 'Sale',       gender: 'Women', category: 'Flats',      brand: 'Aldo',         size: ['5', '6', '7', '8'], color: 'Beige',  img: '/image/footwear/women/brand/aldo/b3.jpg' },
  { id: 356, name: 'Aldo Flowly Bow Flat',                price: '₹1,999', originalPrice: '₹2,999', rating: 4.3, tag: null,         gender: 'Women', category: 'Flats',      brand: 'Aldo',         size: ['5', '6', '7', '8'], color: 'Red',    img: '/image/footwear/women/brand/aldo/b4.jpg' },
  { id: 357, name: 'Aldo Crinkle Mary Jane Flat',         price: '₹3,299', originalPrice: '₹4,799', rating: 4.5, tag: 'Trending',   gender: 'Women', category: 'Flats',      brand: 'Aldo',         size: ['5', '6', '7', '8'], color: 'Black',  img: '/image/footwear/women/brand/aldo/b5.jpg' },
  { id: 358, name: 'Aldo Elenaa Embellished Flat',        price: '₹3,499', originalPrice: '₹4,999', rating: 4.6, tag: 'Popular',    gender: 'Women', category: 'Flats',      brand: 'Aldo',         size: ['5', '6', '7', '8'], color: 'Gold',   img: '/image/footwear/women/brand/aldo/b6.jpg' },
  { id: 359, name: 'Aldo Sophiaa T-Strap Flat',           price: '₹1,799', originalPrice: '₹2,699', rating: 4.2, tag: null,         gender: 'Women', category: 'Flats',      brand: 'Aldo',         size: ['5', '6', '7', '8'], color: 'Nude',   img: '/image/footwear/women/brand/aldo/b7.jpg' },
  { id: 360, name: 'Aldo Rindaa Slingback Flat',          price: '₹2,699', originalPrice: '₹3,999', rating: 4.4, tag: 'New',        gender: 'Women', category: 'Flats',      brand: 'Aldo',         size: ['5', '6', '7', '8'], color: 'Beige',  img: '/image/footwear/women/brand/aldo/b8.jpg' },
  { id: 361, name: 'Aldo Coasta Classic Loafer',          price: '₹4,499', originalPrice: '₹6,299', rating: 4.6, tag: 'Bestseller', gender: 'Women', category: 'Loafers',    brand: 'Aldo',         size: ['5', '6', '7', '8'], color: 'Brown',  img: '/image/footwear/women/brand/aldo/c1.jpg' },
  { id: 362, name: 'Aldo Briellaa Penny Loafer',          price: '₹3,999', originalPrice: '₹5,499', rating: 4.5, tag: 'New',        gender: 'Women', category: 'Loafers',    brand: 'Aldo',         size: ['5', '6', '7', '8'], color: 'Tan',    img: '/image/footwear/women/brand/aldo/c2.jpg' },
  { id: 363, name: 'Aldo Moralaa Tassel Loafer',          price: '₹4,999', originalPrice: '₹6,999', rating: 4.7, tag: 'Trending',   gender: 'Women', category: 'Loafers',    brand: 'Aldo',         size: ['5', '6', '7', '8'], color: 'Black',  img: '/image/footwear/women/brand/aldo/c3.jpg' },
  { id: 364, name: 'Aldo Plato Chunky Loafer',            price: '₹5,499', originalPrice: '₹7,499', rating: 4.4, tag: null,         gender: 'Women', category: 'Loafers',    brand: 'Aldo',         size: ['5', '6', '7', '8'], color: 'White',  img: '/image/footwear/women/brand/aldo/c4.jpg' },
  { id: 365, name: 'Aldo Elowen Slip-on Loafer',          price: '₹3,499', originalPrice: '₹4,999', rating: 4.3, tag: 'Sale',       gender: 'Women', category: 'Loafers',    brand: 'Aldo',         size: ['5', '6', '7', '8'], color: 'Beige',  img: '/image/footwear/women/brand/aldo/c5.jpg' },
  { id: 366, name: 'Aldo Clog Mule Loafer',               price: '₹3,999', originalPrice: '₹5,499', rating: 4.5, tag: 'Popular',    gender: 'Women', category: 'Loafers',    brand: 'Aldo',         size: ['5', '6', '7', '8'], color: 'Brown',  img: '/image/footwear/women/brand/aldo/c6.jpg' },
  { id: 367, name: 'Aldo Slipper Loafer',                 price: '₹2,999', originalPrice: '₹4,299', rating: 4.2, tag: null,         gender: 'Women', category: 'Loafers',    brand: 'Aldo',         size: ['5', '6', '7', '8'], color: 'Black',  img: '/image/footwear/women/brand/aldo/c7.jpg' },
  { id: 368, name: 'Aldo Embossed Loafer',                price: '₹5,999', originalPrice: '₹7,999', rating: 4.6, tag: 'New',        gender: 'Women', category: 'Loafers',    brand: 'Aldo',         size: ['5', '6', '7', '8'], color: 'Gold',   img: '/image/footwear/women/brand/aldo/c8.jpg' },

  //inc women
  { id: 369, name: 'Inc.5 Espadrille Wedge',              price: '₹1,999', originalPrice: '₹3,199', rating: 4.7, tag: 'Bestseller', gender: 'Women', category: 'Wedges',     brand: 'Inc.5',        size: ['5', '6', '7', '8'], color: 'Beige',  img: '/image/footwear/women/brand/inc/a1.jpg' },
  { id: 370, name: 'Inc.5 Jute Wedge Sandal',             price: '₹1,799', originalPrice: '₹2,999', rating: 4.6, tag: 'New',        gender: 'Women', category: 'Wedges',     brand: 'Inc.5',        size: ['5', '6', '7', '8'], color: 'Brown',  img: '/image/footwear/women/brand/inc/a2.jpg' },
  { id: 371, name: 'Inc.5 Block Wedge Heel',              price: '₹2,199', originalPrice: '₹3,499', rating: 4.5, tag: 'Sale',       gender: 'Women', category: 'Wedges',     brand: 'Inc.5',        size: ['5', '6', '7', '8'], color: 'Black',  img: '/image/footwear/women/brand/inc/a3.jpg' },
  { id: 372, name: 'Inc.5 Strappy Wedge Sandal',          price: '₹1,599', originalPrice: '₹2,599', rating: 4.4, tag: null,         gender: 'Women', category: 'Wedges',     brand: 'Inc.5',        size: ['5', '6', '7', '8'], color: 'Tan',    img: '/image/footwear/women/brand/inc/a4.jpg' },
  { id: 373, name: 'Inc.5 Cork Wedge Slip-on',            price: '₹2,499', originalPrice: '₹3,799', rating: 4.6, tag: 'Trending',   gender: 'Women', category: 'Wedges',     brand: 'Inc.5',        size: ['5', '6', '7', '8'], color: 'Brown',  img: '/image/footwear/women/brand/inc/a5.jpg' },
  { id: 374, name: 'Inc.5 Ankle Strap Wedge',             price: '₹2,299', originalPrice: '₹3,499', rating: 4.5, tag: 'Popular',    gender: 'Women', category: 'Wedges',     brand: 'Inc.5',        size: ['5', '6', '7', '8'], color: 'Nude',   img: '/image/footwear/women/brand/inc/a6.jpg' },
  { id: 375, name: 'Inc.5 Casual Wedge Mule',             price: '₹1,499', originalPrice: '₹2,399', rating: 4.3, tag: null,         gender: 'Women', category: 'Wedges',     brand: 'Inc.5',        size: ['5', '6', '7', '8'], color: 'Beige',  img: '/image/footwear/women/brand/inc/a7.jpg' },
  { id: 376, name: 'Inc.5 Embellished Wedge',             price: '₹2,799', originalPrice: '₹4,199', rating: 4.2, tag: 'Sale',       gender: 'Women', category: 'Wedges',     brand: 'Inc.5',        size: ['5', '6', '7', '8'], color: 'Gold',   img: '/image/footwear/women/brand/inc/a8.jpg' },
  { id: 377, name: 'Inc.5 Classic Platform Heel',         price: '₹2,499', originalPrice: '₹3,799', rating: 4.6, tag: 'Bestseller', gender: 'Women', category: 'Heels',      brand: 'Inc.5',        size: ['5', '6', '7', '8'], color: 'Black',  img: '/image/footwear/women/brand/inc/b1.jpg' },
  { id: 378, name: 'Inc.5 Chunky Platform Sandal',        price: '₹2,199', originalPrice: '₹3,299', rating: 4.5, tag: 'New',        gender: 'Women', category: 'Heels',      brand: 'Inc.5',        size: ['5', '6', '7', '8'], color: 'White',  img: '/image/footwear/women/brand/inc/b2.jpg' },
  { id: 379, name: 'Inc.5 Platform Ankle Boot',           price: '₹3,499', originalPrice: '₹4,999', rating: 4.7, tag: 'Trending',   gender: 'Women', category: 'Heels',      brand: 'Inc.5',        size: ['5', '6', '7', '8'], color: 'Black',  img: '/image/footwear/women/brand/inc/b3.jpg' },
  { id: 380, name: 'Inc.5 Strappy Platform Heel',         price: '₹1,999', originalPrice: '₹2,999', rating: 4.4, tag: null,         gender: 'Women', category: 'Heels',      brand: 'Inc.5',        size: ['5', '6', '7', '8'], color: 'Nude',   img: '/image/footwear/women/brand/inc/b4.jpg' },
  { id: 381, name: 'Inc.5 Block Platform Mule',           price: '₹2,699', originalPrice: '₹3,999', rating: 4.5, tag: 'Sale',       gender: 'Women', category: 'Heels',      brand: 'Inc.5',        size: ['5', '6', '7', '8'], color: 'Brown',  img: '/image/footwear/women/brand/inc/b5.jpg' },
  { id: 382, name: 'Inc.5 Embossed Platform Heel',        price: '₹2,999', originalPrice: '₹4,499', rating: 4.6, tag: 'Popular',    gender: 'Women', category: 'Heels',      brand: 'Inc.5',        size: ['5', '6', '7', '8'], color: 'Black',  img: '/image/footwear/women/brand/inc/b6.jpg' },
  { id: 383, name: 'Inc.5 Peep Toe Platform',             price: '₹1,799', originalPrice: '₹2,799', rating: 4.3, tag: null,         gender: 'Women', category: 'Heels',      brand: 'Inc.5',        size: ['5', '6', '7', '8'], color: 'Pink',   img: '/image/footwear/women/brand/inc/b7.jpg' },
  { id: 384, name: 'Inc.5 Glitter Platform Heel',         price: '₹3,199', originalPrice: '₹4,799', rating: 4.4, tag: 'New',        gender: 'Women', category: 'Heels',      brand: 'Inc.5',        size: ['5', '6', '7', '8'], color: 'Gold',   img: '/image/footwear/women/brand/inc/b8.jpg' },
  { id: 385, name: 'Inc.5 Classic Stiletto Pump',         price: '₹1,999', originalPrice: '₹2,999', rating: 4.6, tag: 'Bestseller', gender: 'Women', category: 'Pumps',      brand: 'Inc.5',        size: ['5', '6', '7', '8'], color: 'Black',  img: '/image/footwear/women/brand/inc/c1.jpg' },
  { id: 386, name: 'Inc.5 Pointed Toe Pump',              price: '₹1,799', originalPrice: '₹2,699', rating: 4.5, tag: 'New',        gender: 'Women', category: 'Pumps',      brand: 'Inc.5',        size: ['5', '6', '7', '8'], color: 'Nude',   img: '/image/footwear/women/brand/inc/c2.jpg' },
  { id: 387, name: 'Inc.5 Block Heel Pump',               price: '₹2,299', originalPrice: '₹3,499', rating: 4.7, tag: 'Trending',   gender: 'Women', category: 'Pumps',      brand: 'Inc.5',        size: ['5', '6', '7', '8'], color: 'Red',    img: '/image/footwear/women/brand/inc/c3.jpg' },
  { id: 388, name: 'Inc.5 Kitten Heel Pump',              price: '₹1,599', originalPrice: '₹2,399', rating: 4.4, tag: null,         gender: 'Women', category: 'Pumps',      brand: 'Inc.5',        size: ['5', '6', '7', '8'], color: 'Beige',  img: '/image/footwear/women/brand/inc/c4.jpg' },
  { id: 389, name: 'Inc.5 Embellished Court Pump',        price: '₹2,699', originalPrice: '₹3,999', rating: 4.5, tag: 'Sale',       gender: 'Women', category: 'Pumps',      brand: 'Inc.5',        size: ['5', '6', '7', '8'], color: 'Gold',   img: '/image/footwear/women/brand/inc/c5.jpg' },
  { id: 390, name: 'Inc.5 Slingback Pump',                price: '₹2,199', originalPrice: '₹3,299', rating: 4.6, tag: 'Popular',    gender: 'Women', category: 'Pumps',      brand: 'Inc.5',        size: ['5', '6', '7', '8'], color: 'Black',  img: '/image/footwear/women/brand/inc/c6.jpg' },
  { id: 391, name: 'Inc.5 Ankle Strap Pump',              price: '₹1,899', originalPrice: '₹2,899', rating: 4.3, tag: null,         gender: 'Women', category: 'Pumps',      brand: 'Inc.5',        size: ['5', '6', '7', '8'], color: 'Pink',   img: '/image/footwear/women/brand/inc/c7.jpg' },
  { id: 392, name: 'Inc.5 Peep Toe Stiletto',             price: '₹2,499', originalPrice: '₹3,699', rating: 4.4, tag: 'New',        gender: 'Women', category: 'Pumps',      brand: 'Inc.5',        size: ['5', '6', '7', '8'], color: 'Red',    img: '/image/footwear/women/brand/inc/c8.jpg' },

  //rocia
  { id: 393, name: 'Rocia Glam Stiletto Pump',            price: '₹1,999', originalPrice: '₹2,999', rating: 4.7, tag: 'Bestseller', gender: 'Women', category: 'Stilettos',  brand: 'Rocia',        size: ['5', '6', '7', '8'], color: 'Black',  img: '/image/footwear/women/brand/rocia/a1.jpg' },
  { id: 394, name: 'Rocia Pointed Toe Stiletto',          price: '₹1,799', originalPrice: '₹2,699', rating: 4.6, tag: 'New',        gender: 'Women', category: 'Stilettos',  brand: 'Rocia',        size: ['5', '6', '7', '8'], color: 'Nude',   img: '/image/footwear/women/brand/rocia/a2.jpg' },
  { id: 395, name: 'Rocia Ankle Strap Stiletto',          price: '₹2,199', originalPrice: '₹3,199', rating: 4.5, tag: 'Sale',       gender: 'Women', category: 'Stilettos',  brand: 'Rocia',        size: ['5', '6', '7', '8'], color: 'Red',    img: '/image/footwear/women/brand/rocia/a3.jpg' },
  { id: 396, name: 'Rocia Peep Toe Stiletto',             price: '₹1,599', originalPrice: '₹2,399', rating: 4.4, tag: null,         gender: 'Women', category: 'Stilettos',  brand: 'Rocia',        size: ['5', '6', '7', '8'], color: 'Pink',   img: '/image/footwear/women/brand/rocia/a4.jpg' },
  { id: 397, name: 'Rocia Embellished Stiletto',          price: '₹2,499', originalPrice: '₹3,699', rating: 4.6, tag: 'Trending',   gender: 'Women', category: 'Stilettos',  brand: 'Rocia',        size: ['5', '6', '7', '8'], color: 'Gold',   img: '/image/footwear/women/brand/rocia/a5.jpg' },
  { id: 398, name: 'Rocia Strappy Stiletto Sandal',       price: '₹2,299', originalPrice: '₹3,299', rating: 4.5, tag: 'Popular',    gender: 'Women', category: 'Stilettos',  brand: 'Rocia',        size: ['5', '6', '7', '8'], color: 'Silver', img: '/image/footwear/women/brand/rocia/a6.jpg' },
  { id: 399, name: 'Rocia Classic Court Stiletto',        price: '₹1,699', originalPrice: '₹2,499', rating: 4.3, tag: null,         gender: 'Women', category: 'Stilettos',  brand: 'Rocia',        size: ['5', '6', '7', '8'], color: 'Black',  img: '/image/footwear/women/brand/rocia/a7.jpg' },
  { id: 400, name: 'Rocia Slingback Stiletto',            price: '₹1,999', originalPrice: '₹2,999', rating: 4.2, tag: 'Sale',       gender: 'Women', category: 'Stilettos',  brand: 'Rocia',        size: ['5', '6', '7', '8'], color: 'Beige',  img: '/image/footwear/women/brand/rocia/a8.jpg' },
  { id: 401, name: 'Rocia Classic Ballet Flat',           price: '₹999',   originalPrice: '₹1,599', rating: 4.6, tag: 'Bestseller', gender: 'Women', category: 'Ballerinas', brand: 'Rocia',        size: ['5', '6', '7', '8'], color: 'Pink',   img: '/image/footwear/women/brand/rocia/b1.jpg' },
  { id: 402, name: 'Rocia Bow Ballerina Flat',            price: '₹1,199', originalPrice: '₹1,799', rating: 4.5, tag: 'New',        gender: 'Women', category: 'Ballerinas', brand: 'Rocia',        size: ['5', '6', '7', '8'], color: 'Red',    img: '/image/footwear/women/brand/rocia/b2.jpg' },
  { id: 403, name: 'Rocia Pointed Ballerina',             price: '₹1,099', originalPrice: '₹1,699', rating: 4.4, tag: 'Sale',       gender: 'Women', category: 'Ballerinas', brand: 'Rocia',        size: ['5', '6', '7', '8'], color: 'Black',  img: '/image/footwear/women/brand/rocia/b3.jpg' },
  { id: 404, name: 'Rocia Embroidered Ballerina',         price: '₹1,399', originalPrice: '₹2,099', rating: 4.3, tag: null,         gender: 'Women', category: 'Ballerinas', brand: 'Rocia',        size: ['5', '6', '7', '8'], color: 'Beige',  img: '/image/footwear/women/brand/rocia/b4.jpg' },
  { id: 405, name: 'Rocia Metallic Ballet Flat',          price: '₹1,499', originalPrice: '₹2,199', rating: 4.5, tag: 'Trending',   gender: 'Women', category: 'Ballerinas', brand: 'Rocia',        size: ['5', '6', '7', '8'], color: 'Gold',   img: '/image/footwear/women/brand/rocia/b5.jpg' },
  { id: 406, name: 'Rocia Slip-on Ballerina',             price: '₹899',   originalPrice: '₹1,399', rating: 4.4, tag: 'Popular',    gender: 'Women', category: 'Ballerinas', brand: 'Rocia',        size: ['5', '6', '7', '8'], color: 'Nude',   img: '/image/footwear/women/brand/rocia/b6.jpg' },
  { id: 407, name: 'Rocia T-Strap Ballerina',             price: '₹1,299', originalPrice: '₹1,999', rating: 4.2, tag: null,         gender: 'Women', category: 'Ballerinas', brand: 'Rocia',        size: ['5', '6', '7', '8'], color: 'White',  img: '/image/footwear/women/brand/rocia/b7.jpg' },
  { id: 408, name: 'Rocia Printed Ballerina Flat',        price: '₹1,199', originalPrice: '₹1,799', rating: 4.3, tag: 'New',        gender: 'Women', category: 'Ballerinas', brand: 'Rocia',        size: ['5', '6', '7', '8'], color: 'Pink',   img: '/image/footwear/women/brand/rocia/b8.jpg' },
  { id: 409, name: 'Rocia Classic Block Heel',            price: '₹1,699', originalPrice: '₹2,499', rating: 4.6, tag: 'Bestseller', gender: 'Women', category: 'Heels',      brand: 'Rocia',        size: ['5', '6', '7', '8'], color: 'Black',  img: '/image/footwear/women/brand/rocia/c1.jpg' },
  { id: 410, name: 'Rocia Ankle Strap Block Heel',        price: '₹1,999', originalPrice: '₹2,999', rating: 4.5, tag: 'New',        gender: 'Women', category: 'Heels',      brand: 'Rocia',        size: ['5', '6', '7', '8'], color: 'Brown',  img: '/image/footwear/women/brand/rocia/c2.jpg' },
  { id: 411, name: 'Rocia Peep Toe Block Heel',           price: '₹1,799', originalPrice: '₹2,699', rating: 4.7, tag: 'Trending',   gender: 'Women', category: 'Heels',      brand: 'Rocia',        size: ['5', '6', '7', '8'], color: 'Nude',   img: '/image/footwear/women/brand/rocia/c3.jpg' },
  { id: 412, name: 'Rocia Mule Block Heel',               price: '₹1,499', originalPrice: '₹2,299', rating: 4.4, tag: null,         gender: 'Women', category: 'Heels',      brand: 'Rocia',        size: ['5', '6', '7', '8'], color: 'Beige',  img: '/image/footwear/women/brand/rocia/c4.jpg' },
  { id: 413, name: 'Rocia Embellished Block Heel',        price: '₹2,299', originalPrice: '₹3,299', rating: 4.5, tag: 'Sale',       gender: 'Women', category: 'Heels',      brand: 'Rocia',        size: ['5', '6', '7', '8'], color: 'Gold',   img: '/image/footwear/women/brand/rocia/c5.jpg' },
  { id: 414, name: 'Rocia Strappy Block Heel Sandal',     price: '₹1,999', originalPrice: '₹2,999', rating: 4.6, tag: 'Popular',    gender: 'Women', category: 'Heels',      brand: 'Rocia',        size: ['5', '6', '7', '8'], color: 'Silver', img: '/image/footwear/women/brand/rocia/c6.jpg' },
  { id: 415, name: 'Rocia Pointed Block Heel',            price: '₹1,599', originalPrice: '₹2,399', rating: 4.3, tag: null,         gender: 'Women', category: 'Heels',      brand: 'Rocia',        size: ['5', '6', '7', '8'], color: 'Black',  img: '/image/footwear/women/brand/rocia/c7.jpg' },
  { id: 416, name: 'Rocia Platform Block Heel',           price: '₹2,499', originalPrice: '₹3,499', rating: 4.4, tag: 'New',        gender: 'Women', category: 'Heels',      brand: 'Rocia',        size: ['5', '6', '7', '8'], color: 'White',  img: '/image/footwear/women/brand/rocia/c8.jpg' },

  //clarks
  { id: 417, name: 'Clarks Coral Reef Sandal',            price: '₹3,999', originalPrice: '₹5,999', rating: 4.7, tag: 'Bestseller', gender: 'Women', category: 'Sandals',    brand: 'Clarks',       size: ['5', '6', '7', '8'], color: 'Beige',  img: '/image/footwear/women/brand/clarks/a1.jpg' },
  { id: 418, name: 'Clarks Brinkley Jazz Sandal',         price: '₹4,499', originalPrice: '₹6,499', rating: 4.6, tag: 'New',        gender: 'Women', category: 'Sandals',    brand: 'Clarks',       size: ['5', '6', '7', '8'], color: 'Brown',  img: '/image/footwear/women/brand/clarks/a2.jpg' },
  { id: 419, name: 'Clarks Arla Glison Sandal',           price: '₹3,799', originalPrice: '₹5,499', rating: 4.5, tag: 'Sale',       gender: 'Women', category: 'Sandals',    brand: 'Clarks',       size: ['5', '6', '7', '8'], color: 'Tan',    img: '/image/footwear/women/brand/clarks/a3.jpg' },
  { id: 420, name: 'Clarks Lacono Strap Sandal',          price: '₹3,299', originalPrice: '₹4,799', rating: 4.4, tag: null,         gender: 'Women', category: 'Sandals',    brand: 'Clarks',       size: ['5', '6', '7', '8'], color: 'Black',  img: '/image/footwear/women/brand/clarks/a4.jpg' },
  { id: 421, name: 'Clarks Roseville Cove Sandal',        price: '₹4,999', originalPrice: '₹6,999', rating: 4.6, tag: 'Trending',   gender: 'Women', category: 'Sandals',    brand: 'Clarks',       size: ['5', '6', '7', '8'], color: 'White',  img: '/image/footwear/women/brand/clarks/a5.jpg' },
  { id: 422, name: 'Clarks Willow Gild Sandal',           price: '₹5,499', originalPrice: '₹7,499', rating: 4.5, tag: 'Popular',    gender: 'Women', category: 'Sandals',    brand: 'Clarks',       size: ['5', '6', '7', '8'], color: 'Gold',   img: '/image/footwear/women/brand/clarks/a6.jpg' },
  { id: 423, name: 'Clarks Merliah Karli Sandal',         price: '₹3,499', originalPrice: '₹4,999', rating: 4.3, tag: null,         gender: 'Women', category: 'Sandals',    brand: 'Clarks',       size: ['5', '6', '7', '8'], color: 'Beige',  img: '/image/footwear/women/brand/clarks/a7.jpg' },
  { id: 424, name: 'Clarks Annadel Eirwyn Sandal',        price: '₹2,999', originalPrice: '₹4,299', rating: 4.2, tag: 'Sale',       gender: 'Women', category: 'Sandals',    brand: 'Clarks',       size: ['5', '6', '7', '8'], color: 'Brown',  img: '/image/footwear/women/brand/clarks/a8.jpg' },
  { id: 425, name: 'Clarks Breeze Sea Flip',              price: '₹1,499', originalPrice: '₹2,199', rating: 4.6, tag: 'Bestseller', gender: 'Women', category: 'Flip Flops', brand: 'Clarks',       size: ['5', '6', '7', '8'], color: 'Blue',   img: '/image/footwear/women/brand/clarks/b1.jpg' },
  { id: 426, name: 'Clarks Arla Glison Slide',            price: '₹1,299', originalPrice: '₹1,999', rating: 4.4, tag: 'New',        gender: 'Women', category: 'Flip Flops', brand: 'Clarks',       size: ['5', '6', '7', '8'], color: 'Tan',    img: '/image/footwear/women/brand/clarks/b2.jpg' },
  { id: 427, name: 'Clarks Breeze Shore Flip',            price: '₹999',   originalPrice: '₹1,599', rating: 4.3, tag: 'Sale',       gender: 'Women', category: 'Flip Flops', brand: 'Clarks',       size: ['5', '6', '7', '8'], color: 'White',  img: '/image/footwear/women/brand/clarks/b3.jpg' },
  { id: 428, name: 'Clarks Coral Mist Slide',             price: '₹1,199', originalPrice: '₹1,799', rating: 4.2, tag: null,         gender: 'Women', category: 'Flip Flops', brand: 'Clarks',       size: ['5', '6', '7', '8'], color: 'Pink',   img: '/image/footwear/women/brand/clarks/b4.jpg' },
  { id: 429, name: 'Clarks Step Cali Cove Flip',          price: '₹1,699', originalPrice: '₹2,399', rating: 4.5, tag: 'Trending',   gender: 'Women', category: 'Flip Flops', brand: 'Clarks',       size: ['5', '6', '7', '8'], color: 'Beige',  img: '/image/footwear/women/brand/clarks/b5.jpg' },
  { id: 430, name: 'Clarks Arla Shaylie Slide',           price: '₹1,899', originalPrice: '₹2,699', rating: 4.6, tag: 'Popular',    gender: 'Women', category: 'Flip Flops', brand: 'Clarks',       size: ['5', '6', '7', '8'], color: 'Brown',  img: '/image/footwear/women/brand/clarks/b6.jpg' },
  { id: 431, name: 'Clarks Breeze Pebble Flip',           price: '₹899',   originalPrice: '₹1,399', rating: 4.1, tag: 'Sale',       gender: 'Women', category: 'Flip Flops', brand: 'Clarks',       size: ['5', '6', '7', '8'], color: 'Grey',   img: '/image/footwear/women/brand/clarks/b7.jpg' },
  { id: 432, name: 'Clarks Reedly Salene Slide',          price: '₹1,599', originalPrice: '₹2,299', rating: 4.4, tag: 'New',        gender: 'Women', category: 'Flip Flops', brand: 'Clarks',       size: ['5', '6', '7', '8'], color: 'Tan',    img: '/image/footwear/women/brand/clarks/b8.jpg' },
  { id: 433, name: 'Clarks Step Rose Moon Sneaker',       price: '₹4,299', originalPrice: '₹5,999', rating: 4.6, tag: 'Bestseller', gender: 'Women', category: 'Sneakers',   brand: 'Clarks',       size: ['5', '6', '7', '8'], color: 'White',  img: '/image/footwear/women/brand/clarks/c1.jpg' },
  { id: 434, name: 'Clarks Cloudsteppers Sillian',        price: '₹3,799', originalPrice: '₹5,299', rating: 4.5, tag: 'New',        gender: 'Women', category: 'Sneakers',   brand: 'Clarks',       size: ['5', '6', '7', '8'], color: 'Grey',   img: '/image/footwear/women/brand/clarks/c2.jpg' },
  { id: 435, name: 'Clarks Un Rio Lace Sneaker',          price: '₹5,499', originalPrice: '₹7,499', rating: 4.7, tag: 'Trending',   gender: 'Women', category: 'Sneakers',   brand: 'Clarks',       size: ['5', '6', '7', '8'], color: 'White',  img: '/image/footwear/women/brand/clarks/c3.jpg' },
  { id: 436, name: 'Clarks Tri Spark Sneaker',            price: '₹4,999', originalPrice: '₹6,999', rating: 4.4, tag: null,         gender: 'Women', category: 'Sneakers',   brand: 'Clarks',       size: ['5', '6', '7', '8'], color: 'Black',  img: '/image/footwear/women/brand/clarks/c4.jpg' },
  { id: 437, name: 'Clarks Step Allena Go Sneaker',       price: '₹3,499', originalPrice: '₹4,999', rating: 4.3, tag: 'Sale',       gender: 'Women', category: 'Sneakers',   brand: 'Clarks',       size: ['5', '6', '7', '8'], color: 'Navy',   img: '/image/footwear/women/brand/clarks/c5.jpg' },
  { id: 438, name: 'Clarks Sillian 2.0 Pace Sneaker',    price: '₹3,999', originalPrice: '₹5,499', rating: 4.5, tag: 'Popular',    gender: 'Women', category: 'Sneakers',   brand: 'Clarks',       size: ['5', '6', '7', '8'], color: 'White',  img: '/image/footwear/women/brand/clarks/c6.jpg' },
  { id: 439, name: 'Clarks Breeze Sprint Sneaker',        price: '₹2,999', originalPrice: '₹4,299', rating: 4.2, tag: null,         gender: 'Women', category: 'Sneakers',   brand: 'Clarks',       size: ['5', '6', '7', '8'], color: 'Grey',   img: '/image/footwear/women/brand/clarks/c7.jpg' },
  { id: 440, name: 'Clarks Aceley Lace Sneaker',          price: '₹5,999', originalPrice: '₹7,999', rating: 4.6, tag: 'New',        gender: 'Women', category: 'Sneakers',   brand: 'Clarks',       size: ['5', '6', '7', '8'], color: 'White',  img: '/image/footwear/women/brand/clarks/c8.jpg' },

  //Hush Puppies
  { id: 441, name: 'Hush Puppies Soft Style Heel',        price: '₹3,499', originalPrice: '₹4,999', rating: 4.7, tag: 'Bestseller', gender: 'Women', category: 'Heels',      brand: 'Hush Puppies', size: ['5', '6', '7', '8'], color: 'Black',  img: '/image/footwear/women/brand/hp/a1.jpg' },
  { id: 442, name: 'Hush Puppies Chaste Heel',            price: '₹3,999', originalPrice: '₹5,499', rating: 4.6, tag: 'New',        gender: 'Women', category: 'Heels',      brand: 'Hush Puppies', size: ['5', '6', '7', '8'], color: 'Nude',   img: '/image/footwear/women/brand/hp/a2.jpg' },
  { id: 443, name: 'Hush Puppies Kitten Heel Pump',       price: '₹2,999', originalPrice: '₹4,299', rating: 4.5, tag: 'Sale',       gender: 'Women', category: 'Heels',      brand: 'Hush Puppies', size: ['5', '6', '7', '8'], color: 'Beige',  img: '/image/footwear/women/brand/hp/a3.jpg' },
  { id: 444, name: 'Hush Puppies Ankle Strap Heel',       price: '₹3,299', originalPrice: '₹4,799', rating: 4.4, tag: null,         gender: 'Women', category: 'Heels',      brand: 'Hush Puppies', size: ['5', '6', '7', '8'], color: 'Brown',  img: '/image/footwear/women/brand/hp/a4.jpg' },
  { id: 445, name: 'Hush Puppies Block Heel Sandal',      price: '₹2,799', originalPrice: '₹3,999', rating: 4.6, tag: 'Trending',   gender: 'Women', category: 'Heels',      brand: 'Hush Puppies', size: ['5', '6', '7', '8'], color: 'Tan',    img: '/image/footwear/women/brand/hp/a5.jpg' },
  { id: 446, name: 'Hush Puppies Pointed Toe Heel',       price: '₹3,799', originalPrice: '₹5,299', rating: 4.5, tag: 'Popular',    gender: 'Women', category: 'Heels',      brand: 'Hush Puppies', size: ['5', '6', '7', '8'], color: 'Black',  img: '/image/footwear/women/brand/hp/a6.jpg' },
  { id: 447, name: 'Hush Puppies Slingback Heel',         price: '₹2,999', originalPrice: '₹4,299', rating: 4.3, tag: null,         gender: 'Women', category: 'Heels',      brand: 'Hush Puppies', size: ['5', '6', '7', '8'], color: 'Nude',   img: '/image/footwear/women/brand/hp/a7.jpg' },
  { id: 448, name: 'Hush Puppies Peep Toe Heel',          price: '₹3,199', originalPrice: '₹4,599', rating: 4.2, tag: 'Sale',       gender: 'Women', category: 'Heels',      brand: 'Hush Puppies', size: ['5', '6', '7', '8'], color: 'Pink',   img: '/image/footwear/women/brand/hp/a8.jpg' },
  { id: 449, name: 'Hush Puppies Wren Loafer',            price: '₹3,999', originalPrice: '₹5,499', rating: 4.6, tag: 'Bestseller', gender: 'Women', category: 'Loafers',    brand: 'Hush Puppies', size: ['5', '6', '7', '8'], color: 'Brown',  img: '/image/footwear/women/brand/hp/b1.jpg' },
  { id: 450, name: 'Hush Puppies Penny Loafer',           price: '₹3,499', originalPrice: '₹4,999', rating: 4.5, tag: 'New',        gender: 'Women', category: 'Loafers',    brand: 'Hush Puppies', size: ['5', '6', '7', '8'], color: 'Tan',    img: '/image/footwear/women/brand/hp/b2.jpg' },
  { id: 451, name: 'Hush Puppies Soft Classic Loafer',    price: '₹2,999', originalPrice: '₹4,299', rating: 4.4, tag: 'Sale',       gender: 'Women', category: 'Loafers',    brand: 'Hush Puppies', size: ['5', '6', '7', '8'], color: 'Black',  img: '/image/footwear/women/brand/hp/b3.jpg' },
  { id: 452, name: 'Hush Puppies Tassel Loafer',          price: '₹3,799', originalPrice: '₹5,299', rating: 4.3, tag: null,         gender: 'Women', category: 'Loafers',    brand: 'Hush Puppies', size: ['5', '6', '7', '8'], color: 'Brown',  img: '/image/footwear/women/brand/hp/b4.jpg' },
  { id: 453, name: 'Hush Puppies Chowchow Loafer',        price: '₹4,299', originalPrice: '₹5,999', rating: 4.5, tag: 'Trending',   gender: 'Women', category: 'Loafers',    brand: 'Hush Puppies', size: ['5', '6', '7', '8'], color: 'Tan',    img: '/image/footwear/women/brand/hp/b5.jpg' },
  { id: 454, name: 'Hush Puppies Molly Loafer',           price: '₹3,199', originalPrice: '₹4,499', rating: 4.6, tag: 'Popular',    gender: 'Women', category: 'Loafers',    brand: 'Hush Puppies', size: ['5', '6', '7', '8'], color: 'Black',  img: '/image/footwear/women/brand/hp/b6.jpg' },
  { id: 455, name: 'Hush Puppies Slip-on Loafer',         price: '₹2,799', originalPrice: '₹3,999', rating: 4.2, tag: null,         gender: 'Women', category: 'Loafers',    brand: 'Hush Puppies', size: ['5', '6', '7', '8'], color: 'Beige',  img: '/image/footwear/women/brand/hp/b7.jpg' },
  { id: 456, name: 'Hush Puppies Embossed Loafer',        price: '₹4,499', originalPrice: '₹6,299', rating: 4.4, tag: 'New',        gender: 'Women', category: 'Loafers',    brand: 'Hush Puppies', size: ['5', '6', '7', '8'], color: 'Brown',  img: '/image/footwear/women/brand/hp/b8.jpg' },
  { id: 457, name: 'Hush Puppies Soft Style Wedge',       price: '₹2,999', originalPrice: '₹4,299', rating: 4.6, tag: 'Bestseller', gender: 'Women', category: 'Wedges',     brand: 'Hush Puppies', size: ['5', '6', '7', '8'], color: 'Beige',  img: '/image/footwear/women/brand/hp/c1.jpg' },
  { id: 458, name: 'Hush Puppies Wide Fit Wedge Sandal',  price: '₹2,499', originalPrice: '₹3,699', rating: 4.5, tag: 'New',        gender: 'Women', category: 'Wedges',     brand: 'Hush Puppies', size: ['5', '6', '7', '8'], color: 'Tan',    img: '/image/footwear/women/brand/hp/c2.jpg' },
  { id: 459, name: 'Hush Puppies Espadrille Wedge',       price: '₹2,799', originalPrice: '₹3,999', rating: 4.7, tag: 'Trending',   gender: 'Women', category: 'Wedges',     brand: 'Hush Puppies', size: ['5', '6', '7', '8'], color: 'Brown',  img: '/image/footwear/women/brand/hp/c3.jpg' },
  { id: 460, name: 'Hush Puppies Wide Width Comfort Wedge',price: '₹3,199',originalPrice: '₹4,599', rating: 4.4, tag: null,         gender: 'Women', category: 'Wedges',     brand: 'Hush Puppies', size: ['5', '6', '7', '8'], color: 'Black',  img: '/image/footwear/women/brand/hp/c4.jpg' },
  { id: 461, name: 'Hush Puppies Cork Wedge Sandal',      price: '₹2,299', originalPrice: '₹3,299', rating: 4.3, tag: 'Sale',       gender: 'Women', category: 'Wedges',     brand: 'Hush Puppies', size: ['5', '6', '7', '8'], color: 'Beige',  img: '/image/footwear/women/brand/hp/c5.jpg' },
  { id: 462, name: 'Hush Puppies Ankle Strap Wedge',      price: '₹2,999', originalPrice: '₹4,299', rating: 4.5, tag: 'Popular',    gender: 'Women', category: 'Wedges',     brand: 'Hush Puppies', size: ['5', '6', '7', '8'], color: 'Nude',   img: '/image/footwear/women/brand/hp/c6.jpg' },
  { id: 463, name: 'Hush Puppies Wide Fit Slip-on Wedge', price: '₹1,999', originalPrice: '₹2,999', rating: 4.2, tag: null,         gender: 'Women', category: 'Wedges',     brand: 'Hush Puppies', size: ['5', '6', '7', '8'], color: 'Brown',  img: '/image/footwear/women/brand/hp/c7.jpg' },
  { id: 464, name: 'Hush Puppies Platform Wedge',         price: '₹3,499', originalPrice: '₹4,999', rating: 4.4, tag: 'New',        gender: 'Women', category: 'Wedges',     brand: 'Hush Puppies', size: ['5', '6', '7', '8'], color: 'Black',  img: '/image/footwear/women/brand/hp/c8.jpg' },
]

  let filteredProducts = selectedGender === 'All' ? [...products] : products.filter(p => p.gender === selectedGender)

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
    if (tag === 'New') return '#4A90D9'
    if (tag === 'Trending') return '#E91E8C'
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
            {urlCategory ? decodeURIComponent(urlCategory) : urlGender ? `${urlGender}'s Footwear` : 'Footwear'}
          </h1>
        </div>
        <div className={`filter-overlay ${filterOpen ? 'open' : ''}`} onClick={() => setFilterOpen(false)} />
        <div className="common-page-layout">
          <FilterSidebar
            filterOpen={filterOpen} setFilterOpen={setFilterOpen}
            clearFilters={clearFilters}
            selectedGender={selectedGender} setSelectedGender={setSelectedGender}
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
                    <span style={{ position: 'absolute', bottom: '10px', left: '10px', background: p.gender === 'Men' ? '#1565C0' : '#E91E8C', color: '#fff', fontSize: '10px', fontWeight: '600', padding: '2px 8px', borderRadius: '6px' }}>{p.gender}</span>
                  </div>
                  <div className="product-info">
                    <div className="product-name">{p.name}</div>
                    <div className="product-meta">
                      <span className="product-price" style={{ color: '#388e3c' }}>{p.price}</span>
                      <span className="product-rating">★ {p.rating}</span>
                    </div>
                    <button className="add-to-cart-btn" style={{ background: '#388e3c' }}>Add to Cart</button>
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