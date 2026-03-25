import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function NewBalanceFootwearWomen() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  const categories = [
    { name: 'All', count: 16 },
    { name: 'Sport Shoes', count: 8 },
    { name: 'Flip-Flops', count: 8 },
  ]

  const sportShoes = [
    { id: 1701, name: 'New Balance Fresh Foam X 1080v13 W', price: '₹14,999', originalPrice: '₹18,999', rating: 4.7, tag: 'Bestseller', img: '/image/footwear/women/brand/nb/a1.jpg' },
    { id: 1702, name: 'New Balance 574 Core W', price: '₹6,999', originalPrice: '₹8,999', rating: 4.6, tag: 'New', img: '/image/footwear/women/brand/nb/a2.jpg' },
    { id: 1703, name: 'New Balance FuelCell Rebel v3 W', price: '₹11,999', originalPrice: '₹14,999', rating: 4.5, tag: 'Sale', img: '/image/footwear/women/brand/nb/a3.jpg' },
    { id: 1704, name: 'New Balance 411 Running W', price: '₹3,999', originalPrice: '₹5,499', rating: 4.4, tag: null, img: '/image/footwear/women/brand/nb/a4.jpg' },
    { id: 1705, name: 'New Balance Fresh Foam Arishi v4 W', price: '₹5,999', originalPrice: '₹7,999', rating: 4.6, tag: 'Trending', img: '/image/footwear/women/brand/nb/a5.jpg' },
    { id: 1706, name: 'New Balance 520 v8 W', price: '₹4,999', originalPrice: '₹6,999', rating: 4.5, tag: 'Popular', img: '/image/footwear/women/brand/nb/a6.jpg' },
    { id: 1707, name: 'New Balance DynaSoft Nergize v3 W', price: '₹7,499', originalPrice: '₹9,999', rating: 4.3, tag: null, img: '/image/footwear/women/brand/nb/a7.jpg' },
    { id: 1708, name: 'New Balance 327 Lifestyle W', price: '₹8,999', originalPrice: '₹11,999', rating: 4.2, tag: 'Sale', img: '/image/footwear/women/brand/nb/a8.jpg' },
  ]

  const flipFlops = [
    { id: 1711, name: 'New Balance Recharge Slide W', price: '₹1,999', originalPrice: '₹2,799', rating: 4.6, tag: 'Bestseller', img: '/image/footwear/women/brand/nb/b1.jpg' },
    { id: 1712, name: 'New Balance 200 Slide W', price: '₹1,499', originalPrice: '₹2,199', rating: 4.5, tag: 'New', img: '/image/footwear/women/brand/nb/b2.jpg' },
    { id: 1713, name: 'New Balance Cush+ Slide W', price: '₹1,299', originalPrice: '₹1,999', rating: 4.4, tag: 'Sale', img: '/image/footwear/women/brand/nb/b3.jpg' },
    { id: 1714, name: 'New Balance Softy Slide W', price: '₹999', originalPrice: '₹1,599', rating: 4.3, tag: null, img: '/image/footwear/women/brand/nb/b4.jpg' },
    { id: 1715, name: 'New Balance Fresh Foam Slide W', price: '₹2,499', originalPrice: '₹3,299', rating: 4.5, tag: 'Trending', img: '/image/footwear/women/brand/nb/b5.jpg' },
    { id: 1716, name: 'New Balance Recovery Slide W', price: '₹1,799', originalPrice: '₹2,499', rating: 4.4, tag: 'Popular', img: '/image/footwear/women/brand/nb/b6.jpg' },
    { id: 1717, name: 'New Balance Flip Flop Classic W', price: '₹899', originalPrice: '₹1,399', rating: 4.2, tag: 'Sale', img: '/image/footwear/women/brand/nb/b7.jpg' },
    { id: 1718, name: 'New Balance Comfort Slide W', price: '₹2,199', originalPrice: '₹2,999', rating: 4.3, tag: 'New', img: '/image/footwear/women/brand/nb/b8.jpg' },
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
    <div className="product-card">
      <div className="product-img-wrap" style={{ height: '420px' }}>
        <img src={product.img} alt={product.name} />
        <button className="wishlist-btn" onClick={() => toggleWishlist(product.id)}>
          <svg width="16" height="16" fill={wishlist.includes(product.id) ? '#FF4B4B' : 'none'} stroke={wishlist.includes(product.id) ? '#FF4B4B' : '#fff'} strokeWidth="2" viewBox="0 0 24 24">
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
            <span className="product-price product-price-pink">{product.price}</span>
            <span className="original-price"> {product.originalPrice}</span>
          </div>
          {product.rating && <span className="product-rating">★ {product.rating}</span>}
        </div>
        <button className="add-to-cart-btn add-to-cart-btn-pink">Add to Cart</button>
      </div>
    </div>
  )

  return (
    <div className="page">
      <Navbar active="" />

      <div className="wrapper_women">

        {/* Header */}
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <h1 className="page-title">New Balance Women's Footwear</h1>
        </div>

        {/* Category Filter Tabs */}
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
                background: activeCategory === cat.name ? '#E91E8C' : '#fff',
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

        {/* Sport Shoes Section */}
        {(activeCategory === 'All' || activeCategory === 'Sport Shoes') && (
          <>
            <div className="section-header">
              <h2 className="section-title">New Balance Sport Shoes 👟</h2>
            </div>
            <div className="product-grid">
              {sportShoes.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="divider" />
          </>
        )}

        {/* Flip-Flops Section */}
        {(activeCategory === 'All' || activeCategory === 'Flip-Flops') && (
          <>
            <div className="section-header">
              <h2 className="section-title">New Balance Flip-Flops & Slides 🩴</h2>
            </div>
            <div className="product-grid">
              {flipFlops.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </>
        )}

      </div>

      <footer className="footer">
        ® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.
      </footer>
    </div>
  )
}