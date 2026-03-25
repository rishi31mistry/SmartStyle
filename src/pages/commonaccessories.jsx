import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom' 
import Navbar from '../components/navbar'
import '../styles/common.css'
import '../styles/common-pages.css'

function FilterSidebar({ filterOpen,  clearFilters,
  selectedGender, setSelectedGender,
  selectedPrices, setSelectedPrices,
  selectedCategories, setSelectedCategories,
  selectedBrands, setSelectedBrands,
  selectedColors, setSelectedColors,
  selectedRating, setSelectedRating,
}) {
  const priceRanges = ['Under ₹500', '₹500 - ₹1000', '₹1000 - ₹2000', '₹2000 - ₹3000', 'Above ₹3000']
  const categories = ['Watches', 'Bags', 'Sunglasses', 'Belts', 'Wallets','Ties','Cufflinks','Bags & Backpacks','Keychains','Trimmer', 'Jewellery','Handbags','Hair Accessories', 'Caps & Hats', 'Scarves & Stoles', 'Earrings', 'Necklaces', 'Bracelets&Bangles','Clutches','Rings', 'Perfumes']
  const brands = ['Fossil', 'Casio', 'Titan', 'Fastrack', 'Hidesign', 'Baggit', 'Caprese', 'Ray-Ban', 'Wildcraft', 'Da Milano', 'Lavie', 'Zouk']
  const colors = [
    { name: 'Black', hex: '#111' }, { name: 'Brown', hex: '#6d4c41' },
    { name: 'Gold', hex: '#ffd700' }, { name: 'Silver', hex: '#bdbdbd' },
    { name: 'White', hex: '#f5f5f5' }, { name: 'Red', hex: '#e53935' },
    { name: 'Blue', hex: '#1565C0' }, { name: 'Pink', hex: '#E91E8C' },
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
        <div className="filter-section-title">Color</div>
        <div className="filter-color-options">
          {colors.map(c => (
            <button key={c.name} title={c.name}
              className={`filter-color-btn ${selectedColors.includes(c.name) ? 'active' : ''}`}
              style={{ background: c.hex, borderColor: selectedColors.includes(c.name) ? '#f57c00' : 'transparent' }}
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
    </div>
  )
}

export default function CommonAccessories() {

  const [searchParams] = useSearchParams()
  const urlGender = searchParams.get('gender')
  const urlCategory = searchParams.get('category')
  const [selectedGender, setSelectedGender] = useState(urlGender || 'All')

  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState('popular')
  const [selectedPrices, setSelectedPrices] = useState([])
  const [selectedCategories, setSelectedCategories] = useState(urlCategory ? [decodeURIComponent(urlCategory)] : [])
  const [selectedBrands, setSelectedBrands] = useState([])
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
    setSelectedColors([])
    setSelectedRating(null)
  }

  const products = [
  { id: 1,  name: 'Chronograph Watch',  price: '₹3,499', rating: 4.7, tag: 'Hot',      gender: 'Men',   category: 'Watches',     brand: 'Fossil',   color: 'Black',  img: '/image/accessories/men/watch/d3.jpg' },
  { id: 2,  name: 'Gold Hoop Earrings', price: '₹799',   rating: 4.6, tag: 'Popular',  gender: 'Women', category: 'Earrings',    brand: 'Zouk',     color: 'Gold',   img: '/image/accessories/women/earrings/d1.jpg' },
  { id: 3,  name: 'Leather Wallet',     price: '₹999',   rating: 4.5, tag: 'New',      gender: 'Men',   category: 'Wallets',     brand: 'Hidesign', color: 'Brown',  img: '/image/accessories/men/wallet/d1.jpg' },
  { id: 4,  name: 'Leather Tote Bag',   price: '₹1,799', rating: 4.4, tag: 'Trending', gender: 'Women', category: 'Bags',        brand: 'Lavie',    color: 'Brown',  img: '/image/accessories/women/bags/d2.jpg' },
  { id: 5,  name: 'Aviator Sunglasses', price: '₹1,299', rating: 4.8, tag: 'Hot',      gender: 'Men',   category: 'Sunglasses',  brand: 'Ray-Ban',  color: 'Black',  img: '/image/accessories/men/sunglasses/d1.jpg' },
  { id: 6,  name: 'Silk Scarf',         price: '₹699',   rating: 4.4, tag: 'New',      gender: 'Women', category: 'Scarves',     brand: 'Zouk',     color: 'Pink',   img: '/image/accessories/women/scarf/d1.jpg' },
  { id: 7,  name: 'Canvas Backpack',    price: '₹1,499', rating: 4.3, tag: 'Popular',  gender: 'Men',   category: 'Bags',        brand: 'Wildcraft', color: 'Black', img: '/image/accessories/men/bag/d1.jpg' },
  { id: 8,  name: 'Crossbody Bag',      price: '₹1,299', rating: 4.5, tag: 'Trending', gender: 'Women', category: 'Bags',        brand: 'Caprese',  color: 'Brown',  img: '/image/accessories/women/bags/d3.jpg' },
  { id: 9,  name: 'Leather Belt',       price: '₹599',   rating: 4.2, tag: 'New',      gender: 'Men',   category: 'Belts',       brand: 'Hidesign', color: 'Brown',  img: '/image/accessories/men/belt/d1.jpg' },
  { id: 10, name: 'Pearl Necklace',     price: '₹849',   rating: 4.6, tag: 'Hot',      gender: 'Women', category: 'Necklaces',   brand: 'Zouk',     color: 'White',  img: '/image/accessories/women/necklace/d1.jpg' },
  { id: 11, name: 'Sports Watch',       price: '₹2,499', rating: 4.7, tag: 'Popular',  gender: 'Men',   category: 'Watches',     brand: 'Casio',    color: 'Black',  img: '/image/accessories/men/watch/d2.jpg' },
  { id: 12, name: 'Retro Sunglasses',   price: '₹899',   rating: 4.3, tag: 'New',      gender: 'Women', category: 'Sunglasses',  brand: 'Ray-Ban',  color: 'Black',  img: '/image/accessories/women/sunglasses/d1.jpg' },
  { id: 13, name: 'Straw Hat',          price: '₹499',   rating: 4.1, tag: 'Trending', gender: 'Men',   category: 'Caps & Hats', brand: 'Fastrack', color: 'Beige',  img: '/image/accessories/men/hat/d1.jpg' },
  { id: 14, name: 'Ladies Hat',         price: '₹599',   rating: 4.2, tag: 'Popular',  gender: 'Women', category: 'Caps & Hats', brand: 'Baggit',   color: 'Pink',   img: '/image/accessories/women/hat/d1.jpg' },
  { id: 15, name: 'Minimalist Watch',   price: '₹2,999', rating: 4.6, tag: 'Hot',      gender: 'Men',   category: 'Watches',     brand: 'Titan',    color: 'Silver', img: '/image/accessories/men/watch/d1.jpg' },
  { id: 16, name: 'Charm Bracelet',     price: '₹549',   rating: 4.5, tag: 'New',      gender: 'Women', category: 'Bracelets',   brand: 'Zouk',     color: 'Gold',   img: '/image/accessories/women/bracelet/d1.jpg' },

  { id: 17, name: 'Leather Wallet',    price: '₹499',   originalPrice: '₹999',   discount: '50%', rating: 4.4, tag: null, gender: 'Men',   category: 'Wallets',   brand: 'Non Brand', color: 'Brown',  img: '/image/accessories/men/wallet/d2.jpg' },
  { id: 18, name: 'Pearl Necklace Set',price: '₹649',   originalPrice: '₹1,299', discount: '50%', rating: 4.6, tag: null, gender: 'Women', category: 'Necklaces', brand: 'Non Brand', color: 'White',  img: '/image/accessories/women/necklace/d2.jpg' },
  { id: 19, name: 'Analog Watch',      price: '₹1,999', originalPrice: '₹3,999', discount: '50%', rating: 4.7, tag: null, gender: 'Men',   category: 'Watches',   brand: 'Non Brand', color: 'Black',  img: '/image/accessories/men/watch/d7.jpg' },
  { id: 20, name: 'Tote Handbag',      price: '₹899',   originalPrice: '₹1,799', discount: '50%', rating: 4.3, tag: null, gender: 'Women', category: 'Bags',      brand: 'Non Brand', color: 'Brown',  img: '/image/accessories/women/bags/d7.jpg' },

  { id: 21, name: 'Chronograph Watch',     price: '₹3,499', rating: 4.7, tag: 'Hot',      gender: 'Men',   category: 'Watches',    brand: 'Non Brand', color: 'Black',  img: '/image/accessories/men/watch/d4.jpg' },
  { id: 22, name: 'Gold Hoop Earrings',    price: '₹799',   rating: 4.6, tag: 'Popular',  gender: 'Women', category: 'Earrings',   brand: 'Non Brand', color: 'Gold',   img: '/image/accessories/women/earrings/d2.jpg' },
  { id: 23, name: 'Leather Crossbody Bag', price: '₹1,799', rating: 4.5, tag: 'Trending', gender: 'Women', category: 'Bags',       brand: 'Non Brand', color: 'Brown',  img: '/image/accessories/women/bags/d4.jpg' },
  { id: 24, name: 'Aviator Sunglasses',    price: '₹1,299', rating: 4.8, tag: 'New',      gender: 'Men',   category: 'Sunglasses', brand: 'Non Brand', color: 'Black',  img: '/image/accessories/men/sunglasses/d3.jpg' },
  { id: 25, name: 'Silk Scarf',            price: '₹699',   rating: 4.4, tag: 'Hot',      gender: 'Women', category: 'Scarves',    brand: 'Non Brand', color: 'Pink',   img: '/image/accessories/women/scarf/d2.jpg' },
  { id: 26, name: 'Beaded Bracelet Set',   price: '₹499',   rating: 4.5, tag: 'Popular',  gender: 'Women', category: 'Bracelets',  brand: 'Non Brand', color: 'Gold',   img: '/image/accessories/women/bracelet/d3.jpg' },
  { id: 27, name: 'Canvas Backpack',       price: '₹1,499', rating: 4.3, tag: 'Trending', gender: 'Men',   category: 'Bags',       brand: 'Non Brand', color: 'Black',  img: '/image/accessories/men/bag/d2.jpg' },
  { id: 28, name: 'Minimalist Watch',      price: '₹2,999', rating: 4.6, tag: 'New',      gender: 'Men',   category: 'Watches',    brand: 'Non Brand', color: 'Silver', img: '/image/accessories/men/watch/d5.jpg' },

  { id: 29, name: 'Smart Watch',          price: '₹4,999', rating: 4.7, tag: 'Trending', gender: 'Men',   category: 'Watches',     brand: 'Non Brand', color: 'Black',  img: '/image/accessories/men/watch/d6.jpg' },
  { id: 30, name: 'Layered Necklace',     price: '₹899',   rating: 4.5, tag: 'Hot',      gender: 'Women', category: 'Necklaces',   brand: 'Non Brand', color: 'Gold',   img: '/image/accessories/women/necklace/d3.jpg' },
  { id: 31, name: 'Bucket Hat',           price: '₹599',   rating: 4.3, tag: 'New',      gender: 'Women', category: 'Caps & Hats', brand: 'Non Brand', color: 'Pink',   img: '/image/accessories/women/hat/d2.jpg' },
  { id: 32, name: 'Mini Shoulder Bag',    price: '₹1,299', rating: 4.6, tag: 'Popular',  gender: 'Women', category: 'Bags',        brand: 'Non Brand', color: 'Brown',  img: '/image/accessories/women/bags/d5.jpg' },
  { id: 33, name: 'Stackable Rings Set',  price: '₹699',   rating: 4.4, tag: 'Trending', gender: 'Women', category: 'Rings',       brand: 'Non Brand', color: 'Silver', img: '/image/accessories/women/ring/d2.jpg' },
  { id: 34, name: 'Printed Tote Bag',     price: '₹799',   rating: 4.2, tag: 'Hot',      gender: 'Women', category: 'Bags',        brand: 'Non Brand', color: 'Brown',  img: '/image/accessories/women/bags/d6.jpg' },
  { id: 35, name: 'Charm Bracelet',       price: '₹549',   rating: 4.5, tag: 'New',      gender: 'Women', category: 'Bracelets',   brand: 'Non Brand', color: 'Gold',   img: '/image/accessories/women/bracelet/d2.jpg' },
  { id: 36, name: 'Polarized Sunglasses', price: '₹1,499', rating: 4.6, tag: 'Popular',  gender: 'Men',   category: 'Sunglasses',  brand: 'Non Brand', color: 'Black',  img: '/image/accessories/men/sunglasses/d4.jpg' },

  { id: 37, name: 'Fossil Chronograph',      price: '₹3,499', rating: 4.7, tag: 'Hot',      gender: 'Men', category: 'Watches',         brand: 'Non Brand', color: 'Black',  img: '/image/accessories/men/watch/d8.jpg' },
  { id: 38, name: 'Leather Bifold Wallet',   price: '₹999',   rating: 4.5, tag: 'New',      gender: 'Men', category: 'Wallets',         brand: 'Non Brand', color: 'Brown',  img: ' /image/accessories/men/wallet/d3.jpg' },
  { id: 39, name: 'Formal Leather Belt',     price: '₹599',   rating: 4.2, tag: 'Popular',  gender: 'Men', category: 'Belts',           brand: 'Non Brand', color: 'Brown',  img: '/image/accessories/men/belt/d2.jpg' },
  { id: 40, name: 'Aviator Sunglasses',      price: '₹1,299', rating: 4.8, tag: 'Hot',      gender: 'Men', category: 'Sunglasses',      brand: 'Non Brand', color: 'Black',  img: ' /image/accessories/men/sunglasses/d2.jpg' },
  { id: 41, name: 'Classic Cap',             price: '₹499',   rating: 4.1, tag: 'Trending', gender: 'Men', category: 'Caps & Hats',     brand: 'Non Brand', color: 'Beige',  img: '/image/accessories/men/hat/d2.jpg' },
  { id: 42, name: 'Formal Tie',              price: '₹399',   rating: 4.3, tag: 'New',      gender: 'Men', category: 'Ties',            brand: 'Non Brand', color: 'Black',  img: '/image/accessories/men/ties/d1.jpg' },
  { id: 43, name: 'Silver Cufflinks',        price: '₹699',   rating: 4.4, tag: 'Popular',  gender: 'Men', category: 'Cufflinks',       brand: 'Non Brand', color: 'Silver', img: '/image/accessories/men/cufflinks/d1.jpg' },
  { id: 44, name: 'Canvas Backpack',         price: '₹1,499', rating: 4.3, tag: 'Trending', gender: 'Men', category: 'Bags & Backpacks',brand: 'Non Brand', color: 'Black',  img: '/image/accessories/men/bag/d3.jpg' },
  { id: 45, name: 'Metal Keychain',          price: '₹199',   rating: 4.0, tag: 'New',      gender: 'Men', category: 'Keychains',       brand: 'Non Brand', color: 'Silver', img: '/image/accessories/men/keychains/d1.jpg' },
  { id: 46, name: 'Beaded Bracelet',         price: '₹349',   rating: 4.3, tag: 'Hot',      gender: 'Men', category: 'Bracelets',       brand: 'Non Brand', color: 'Brown',  img: '/image/accessories/men/bracelet/d1.jpg' },
  { id: 47, name: 'Electric Trimmer',        price: '₹1,299', rating: 4.5, tag: 'Popular',  gender: 'Men', category: 'Trimmer',         brand: 'Non Brand', color: 'Black',  img: '/image/accessories/men/trimmer/d1.jpg' },
  { id: 48, name: 'Woody Perfume',           price: '₹1,499', rating: 4.6, tag: 'Trending', gender: 'Men', category: 'Perfumes',        brand: 'Non Brand', color: 'Brown',  img: '/image/accessories/men/perfumes/d1.jpg' },

  { id: 49, name: 'Leather Handbag',         price: '₹1,799', rating: 4.4, tag: 'Trending', gender: 'Women', category: 'Handbags',            brand: 'Non Brand', color: 'Brown',  img: '/image/accessories/women/bags/d1.jpg' },
  { id: 50, name: 'Gold Jewellery Set',      price: '₹1,299', rating: 4.6, tag: 'Hot',      gender: 'Women', category: 'Jewellery',           brand: 'Non Brand', color: 'Gold',   img: '/image/accessories/women/jewellery/d1.jpg' },
  { id: 51, name: 'Elegant Wrist Watch',     price: '₹2,499', rating: 4.5, tag: 'Popular',  gender: 'Women', category: 'Watches',             brand: 'Non Brand', color: 'Silver', img: '/image/accessories/women/watch/d1.jpg' },
  { id: 52, name: 'Retro Sunglasses',        price: '₹899',   rating: 4.3, tag: 'New',      gender: 'Women', category: 'Sunglasses',          brand: 'Non Brand', color: 'Black',  img: '/image/accessories/women/sunglasses/d2.jpg' },
  { id: 53, name: 'Silk Scarf',              price: '₹699',   rating: 4.4, tag: 'New',      gender: 'Women', category: 'Scarves & Stoles',    brand: 'Non Brand', color: 'Pink',   img: '/image/accessories/women/scarf/d2.jpg' },
  { id: 54, name: 'Floral Hair Band',        price: '₹299',   rating: 4.2, tag: 'Trending', gender: 'Women', category: 'Hair Accessories',    brand: 'Non Brand', color: 'Pink',   img: '/image/accessories/women/hair/d1.jpg' },
  { id: 55, name: 'Gold Hoop Earrings',      price: '₹799',   rating: 4.6, tag: 'Popular',  gender: 'Women', category: 'Earrings',            brand: 'Non Brand', color: 'Gold',   img: '/image/accessories/women/earrings/d3.jpg' },
  { id: 56, name: 'Pearl Necklace',          price: '₹849',   rating: 4.6, tag: 'Hot',      gender: 'Women', category: 'Necklaces',           brand: 'Non Brand', color: 'White',  img: '/image/accessories/women/necklace/d4.jpg' },
  { id: 57, name: 'Gold Bangle Set',         price: '₹999',   rating: 4.5, tag: 'Popular',  gender: 'Women', category: 'Bangles & Bracelets', brand: 'Non Brand', color: 'Gold',   img: '/image/accessories/women/bangle/d1.jpg' },
  { id: 58, name: 'Party Clutch',            price: '₹1,099', rating: 4.3, tag: 'Trending', gender: 'Women', category: 'Clutches',            brand: 'Non Brand', color: 'Gold',   img: '/image/accessories/women/clutche/d1.jpg' },
  { id: 59, name: 'Stackable Rings Set',     price: '₹699',   rating: 4.4, tag: 'New',      gender: 'Women', category: 'Rings',               brand: 'Non Brand', color: 'Silver', img: '/image/accessories/women/ring/d1.jpg' },
  { id: 60, name: 'Floral Perfume',          price: '₹1,299', rating: 4.6, tag: 'Hot',      gender: 'Women', category: 'Perfumes',            brand: 'Non Brand', color: 'Pink',   img: '/image/accessories/women/perfume/d1.jpg' },

]

  // Apply filters
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
  filteredProducts = filteredProducts.filter(p =>
    selectedCategories.includes(p.category)
  )
}

if (selectedBrands.length > 0) {
  filteredProducts = filteredProducts.filter(p =>
    selectedBrands.includes(p.brand)
  )
}

if (selectedColors.length > 0) {
  filteredProducts = filteredProducts.filter(p =>
    selectedColors.includes(p.color)
  )
}

  if (selectedRating) {
    const minRating = parseInt(selectedRating)
    filteredProducts = filteredProducts.filter(p => p.rating >= minRating)
  }

  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) =>
      parseInt(a.price.replace(/[₹,]/g, '')) - parseInt(b.price.replace(/[₹,]/g, ''))
    )
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) =>
      parseInt(b.price.replace(/[₹,]/g, '')) - parseInt(a.price.replace(/[₹,]/g, ''))
    )
  } else if (sortBy === 'newest') {
    filteredProducts = [...filteredProducts].reverse()
  } else if (sortBy === 'popular') {
    filteredProducts.sort((a, b) => b.rating - a.rating)
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
            {urlCategory ? decodeURIComponent(urlCategory) : urlGender ? `${urlGender}'s Accessories` : 'Accessories'}
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
                  </div>
                  <div className="product-info">
                    <div className="product-name">{p.name}</div>
                    <div className="product-meta">
                      <span className="product-price" style={{ color: '#f57c00' }}>{p.price}</span>
                      <span className="product-rating">★ {p.rating}</span>
                    </div>
                    <button className="add-to-cart-btn" style={{ background: '#f57c00' }}>Add to Cart</button>
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