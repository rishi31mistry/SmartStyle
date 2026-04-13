import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function Puma() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/products?gender=Men&brand=Puma')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setError('Failed to load products.')
        setLoading(false)
      })
  }, [])

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  const tshirts = products.filter(p => {
    const cat = Array.isArray(p.category) ? p.category : [p.category]
    return cat.includes('T-Shirts')
  })
  const shorts = products.filter(p => {
    const cat = Array.isArray(p.category) ? p.category : [p.category]
    return cat.includes('Shorts')
  })
  const sportswear = products.filter(p => {
    const cat = Array.isArray(p.category) ? p.category : [p.category]
    return cat.includes('Sportswear') && !cat.includes('Shorts') && !cat.includes('T-Shirts')
  })

  const categories = [
    { name: 'All', count: products.length },
    { name: 'T-Shirts', count: tshirts.length },
    { name: 'Shorts', count: shorts.length },
    { name: 'Sportswear', count: sportswear.length },
  ]

  const tagColor = (tag) => {
    if (tag === 'Sale') return '#FF4B4B'
    if (tag === 'New') return '#4A90D9'
    if (tag === 'Trending') return '#E91E8C'
    if (tag === 'Bestseller') return '#F5A623'
    if (tag === 'Popular') return '#00897B'
    return '#888'
  }

  const ProductCard = ({ product }) => (
    <div className="product-card" onClick={() => navigate(`/product/${product._id}`)} style={{ cursor: 'pointer' }}>
      <div className="product-img-wrap" style={{ height: '420px' }}>
        <img src={product.image} alt={product.name} />
        <button
          className="wishlist-btn"
          onClick={(e) => {
            e.stopPropagation()
            toggleWishlist(product._id)
          }}
        >
          <svg width="16" height="16" fill={wishlist.includes(product._id) ? '#FF4B4B' : 'none'} stroke={wishlist.includes(product._id) ? '#FF4B4B' : '#fff'} strokeWidth="2" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        {product.tag && (
          <span className="product-tag" style={{ background: tagColor(product.tag) }}>{product.tag}</span>
        )}
      </div>
      <div className="product-info">
        <div className="product-name">{product.name}</div>
        <div className="product-meta">
          <div>
            <span className="product-price">{product.price}</span>
            <span className="original-price"> {product.originalPrice}</span>
          </div>
          {product.rating && <span className="product-rating">★ {product.rating}</span>}
        </div>
        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  )

  return (
    <div className="page">
      <Navbar active="" />

      <div className="wrapper_men">

        <div className="page-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <h1 className="page-title">Puma</h1>
        </div>

        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              style={{
                padding: '10px 22px',
                borderRadius: '50px',
                border: activeCategory === cat.name ? 'none' : '1.5px solid #ddd',
                background: activeCategory === cat.name ? '#EF3E23' : '#fff',
                color: activeCategory === cat.name ? '#fff' : '#444',
                fontSize: '13px',
                fontWeight: '600',
                fontFamily: 'Poppins, sans-serif',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {cat.name}
              <span style={{ marginLeft: '6px', fontSize: '11px', opacity: 0.7 }}>({cat.count})</span>
            </button>
          ))}
        </div>

        {loading && <p style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Loading products...</p>}
        {error && <p style={{ textAlign: 'center', padding: '40px', color: '#FF4B4B' }}>{error}</p>}

        {!loading && !error && (
          <>
            {(activeCategory === 'All' || activeCategory === 'T-Shirts') && (
              <>
                <div className="section-header">
                  <h2 className="section-title">Puma T-Shirts</h2>
                </div>
                <div className="product-grid">
                  {tshirts.map(p => <ProductCard key={p._id} product={p} />)}
                </div>
                <div className="divider" />
              </>
            )}

            {(activeCategory === 'All' || activeCategory === 'Shorts') && (
              <>
                <div className="section-header">
                  <h2 className="section-title">Puma Shorts</h2>
                </div>
                <div className="product-grid">
                  {shorts.map(p => <ProductCard key={p._id} product={p} />)}
                </div>
                <div className="divider" />
              </>
            )}

            {(activeCategory === 'All' || activeCategory === 'Sportswear') && (
              <>
                <div className="section-header">
                  <h2 className="section-title">Puma Sportswear</h2>
                </div>
                <div className="product-grid">
                  {sportswear.map(p => <ProductCard key={p._id} product={p} />)}
                </div>
              </>
            )}
          </>
        )}

      </div>

      <footer className="footer">
        ® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.
      </footer>
    </div>
  )
}

