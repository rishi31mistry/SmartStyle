import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function SummerSpecial() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  const filters = ['All', 'Men', 'Women', 'Footwear', 'Accessories']

  const products = [
    { id: 1, name: 'Linen Shirt', price: '₹999', category: 'Men', tag: 'Summer', img: '/image/men/shirt/s3.jpg' },
    { id: 2, name: 'Floral Dress', price: '₹1,299', category: 'Women', tag: 'Summer', img: '/image/women/dress/d6.jpg' },
    { id: 3, name: 'Shorts', price: '₹699', category: 'Men', tag: 'Summer', img: '/image/men/short/d1.jpg' },
    { id: 4, name: 'Straw Hat', price: '₹499', category: 'Accessories', tag: 'Summer', img: '/image/accessories/men/hat/d1.jpg' },
    { id: 5, name: 'Sandals', price: '₹799', category: 'Footwear', tag: 'Summer', img: '/image/footwear/women/sandals/d1.jpg' },
    { id: 6, name: 'Slip Dress', price: '₹1,199', category: 'Women', tag: 'Summer', img: '/image/women/dress/d7.jpg' },
    { id: 7, name: 'Ladies Hat', price: '₹1,099', category: 'Accessories', tag: 'Summer', img: '/image/accessories/women/hat/d1.jpg' },
    { id: 8, name: 'Sunglasses', price: '₹899', category: 'Accessories', tag: 'Summer', img: '/image/accessories/men/sunglasses/d1.jpg' },
    { id: 9, name: 'Oversized Tee', price: '₹799', category: 'Men', tag: 'Summer', img: '/image/men/oversized/d1.jpg' },
    { id: 10, name: 'Midi Skirt', price: '₹999', category: 'Women', tag: 'Summer', img: '/image/women/dress/d5.jpg' },
    { id: 11, name: 'Flip Flops', price: '₹399', category: 'Footwear', tag: 'Summer', img: '/image/footwear/women/sandals/d1.jpg' },
    { id: 12, name: 'Silk Scarf', price: '₹699', category: 'Accessories', tag: 'Summer', img: '/image/accessories/women/scarf/d1.jpg' },
    { id: 13, name: 'Linen Trousers', price: '₹1,199', category: 'Men', tag: 'Summer', img: '/image/men/trouser/d1.jpg' },
    { id: 14, name: 'Co-ord Set', price: '₹1,699', category: 'Women', tag: 'Summer', img: '/image/men/full/d2.jpg' },
    { id: 15, name: 'Sports Sandals', price: '₹899', category: 'Footwear', tag: 'Summer', img: '/image/footwear/men/sneakers/d3.jpg' },
    { id: 16, name: 'Crossbody Bag', price: '₹1,299', category: 'Accessories', tag: 'Summer', img: '/image/accessories/women/bags/d2.jpg' },
  ]

  const filtered = activeFilter === 'All' ? products : products.filter(p => p.category === activeFilter)

  return (
    <div className="page">
      <Navbar active="" />
      <div className="wrapper">

        <div className="page-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <h1 className="page-title">☀️ Summer Special</h1>
        </div>

        {/* Banner */}
        <div style={{ background: 'linear-gradient(120deg, #F5A623, #f7c948)', borderRadius: '20px', padding: '32px 40px', marginBottom: '28px', position: 'relative', overflow: 'hidden', minHeight: '180px' }}>
          <div style={{ position: 'absolute', right: 0, bottom: 0, width: '220px', height: '180px', overflow: 'hidden' }}>
            <img src="/image/sale/summer.jpg" alt="summer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ zIndex: 1, position: 'relative' }}>
            <div style={{ background: 'rgba(255,255,255,0.3)', color: '#fff', fontSize: '11px', fontWeight: '600', padding: '4px 12px', borderRadius: '20px', display: 'inline-block', marginBottom: '10px' }}>☀️ Limited Time</div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#fff', marginBottom: '6px' }}>Summer Special</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>Handpicked styles for the season</div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              style={{
                padding: '8px 20px', borderRadius: '20px', border: '1.5px solid',
                borderColor: activeFilter === f ? '#F5A623' : '#ddd',
                background: activeFilter === f ? '#F5A623' : '#fff',
                color: activeFilter === f ? '#fff' : '#555',
                fontSize: '13px', fontWeight: '500',
                fontFamily: "'Poppins', sans-serif", cursor: 'pointer', transition: 'all 0.2s',
              }}
            >{f}</button>
          ))}
        </div>

        {/* Products */}
        <div className="product-grid">
          {filtered.map(p => (
            <div key={p.id} className="product-card">
              <div className="product-img-wrap" style={{ height: '260px' }}>
                <img src={p.img} alt={p.name} />
                <button className="wishlist-btn" onClick={() => toggleWishlist(p.id)}>
                  <svg width="16" height="16" fill={wishlist.includes(p.id) ? '#FF4B4B' : 'none'} stroke={wishlist.includes(p.id) ? '#FF4B4B' : '#fff'} strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
                <span className="product-tag" style={{ background: '#F5A623' }}>{p.tag}</span>
              </div>
              <div className="product-info">
                <div className="product-name">{p.name}</div>
                <div className="product-meta">
                  <span className="product-price" style={{ color: '#F5A623' }}>{p.price}</span>
                  <span style={{ fontSize: '11px', color: '#aaa' }}>{p.category}</span>
                </div>
                <button className="add-to-cart-btn" style={{ background: '#F5A623' }}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>

      </div>
      <footer className="footer">® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.</footer>
    </div>
  )
}