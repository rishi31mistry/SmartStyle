import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'
import '../styles/common-pages.css'

function FilterSidebar({ filterOpen, setFilterOpen, clearFilters,
  selectedPrices, setSelectedPrices,
  selectedGender, setSelectedGender,
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
    { name: 'Beige', hex: '#f5f0e8' }, { name: 'Pink', hex: '#e91e8c' },
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

      {/* Gender Filter */}
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
              style={{ background: c.hex, borderColor: selectedColors.includes(c.name) ? '#4A90D9' : 'transparent' }}
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
      <button className="filter-apply-btn" onClick={() => setFilterOpen(false)}>
        Apply Filters
      </button>
    </div>
  )
}

export default function CommonFootwear() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const urlCategory = searchParams.get('category')
  const urlGender = searchParams.get('gender')

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    fetch('/api/products?gender=Footwear')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  const toggleWishlist = async (productId, product) => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return }
    const isWishlisted = wishlist.includes(productId)
    if (isWishlisted) {
      await fetch(`/api/wishlist/remove/${productId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      setWishlist(prev => prev.filter(id => id !== productId))
    } else {
      await fetch('/api/wishlist/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ productId, name: product.name, price: product.price, image: product.image })
      })
      setWishlist(prev => [...prev, productId])
    }
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

  // Filter by subGender (Men/Women within Footwear)
  let filteredProducts = selectedGender === 'All'
    ? [...products]
    : products.filter(p => p.subGender === selectedGender)

  if (selectedPrices.length > 0) {
    filteredProducts = filteredProducts.filter(p => {
      return selectedPrices.some(range => {
        if (range === 'Under ₹500') return p.price < 500
        if (range === '₹500 - ₹1000') return p.price >= 500 && p.price <= 1000
        if (range === '₹1000 - ₹2000') return p.price >= 1000 && p.price <= 2000
        if (range === '₹2000 - ₹3000') return p.price >= 2000 && p.price <= 3000
        if (range === 'Above ₹3000') return p.price > 3000
        return true
      })
    })
  }

  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(p => {
      if (Array.isArray(p.category)) return selectedCategories.some(c => p.category.includes(c))
      return selectedCategories.includes(p.category)
    })
  }

  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter(p => selectedBrands.includes(p.brand))
  }

  if (selectedSizes.length > 0) {
    filteredProducts = filteredProducts.filter(p => selectedSizes.some(s => p.sizes.includes(s)))
  }

  if (selectedColors.length > 0) {
    filteredProducts = filteredProducts.filter(p => selectedColors.includes(p.color))
  }

  if (selectedRating) {
    const minRating = parseInt(selectedRating)
    filteredProducts = filteredProducts.filter(p => p.rating >= minRating)
  }

  if (sortBy === 'price-low') filteredProducts.sort((a, b) => a.price - b.price)
  else if (sortBy === 'price-high') filteredProducts.sort((a, b) => b.price - a.price)
  else if (sortBy === 'newest') filteredProducts = [...filteredProducts].reverse()
  else if (sortBy === 'popular') filteredProducts.sort((a, b) => b.rating - a.rating)

  const tagColor = (tag) => {
    if (tag === 'Hot') return '#F5A623'
    if (tag === 'New') return '#4A90D9'
    if (tag === 'Trending') return '#E91E8C'
    if (tag === 'Sale') return '#FF4B4B'
    if (tag === 'Bestseller') return '#00897B'
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

            {loading && (
              <div style={{ textAlign: 'center', padding: '60px', fontSize: '18px', color: '#888' }}>
                Loading products...
              </div>
            )}

            {!loading && (
              <div className="common-product-grid">
                {filteredProducts.map(p => (
                  <div
                    key={p._id}
                    className="product-card"
                    onClick={() => navigate(`/product/${p._id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="product-img-wrap" style={{ height: '420px' }}>
                      <img src={p.image} alt={p.name} />
                      <button
                        className="wishlist-btn"
                        onClick={(e) => { e.stopPropagation(); toggleWishlist(p._id, p) }}
                      >
                        <svg width="16" height="16"
                          fill={wishlist.includes(p._id) ? '#FF4B4B' : 'none'}
                          stroke={wishlist.includes(p._id) ? '#FF4B4B' : '#fff'}
                          strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                      </button>
                      {p.tag && (
                        <span className="product-tag" style={{ background: tagColor(p.tag) }}>{p.tag}</span>
                      )}
                    </div>
                    <div className="product-info">
                      <div className="product-name">{p.name}</div>
                      <div className="product-meta">
                        <span className="product-price">₹{p.price.toLocaleString('en-IN')}</span>
                        <span className="product-rating">★ {p.rating}</span>
                      </div>
                      <button
                        className="add-to-cart-btn"
                        onClick={(e) => { e.stopPropagation(); navigate(`/product/${p._id}`) }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className="footer">® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.</footer>
    </div>
  )
}
