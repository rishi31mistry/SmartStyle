import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function JustForYou() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [wishlist, setWishlist] = useState([])
  const [activeFilter, setActiveFilter] = useState(searchParams.get('category') || 'All')

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  const filters = ['All', 'Men', 'Women', 'Footwear', 'Accessories']

  const products = [
    { id: 1, name: 'Summer Kurta', price: '₹899', category: 'Women', tag: 'For You', img: '/image/women/kurta/d2.jpg' },
    { id: 2, name: 'Wrap Dress', price: '₹1,299', category: 'Women', tag: 'For You', img: '/image/women/dress/d5.jpg' },
    { id: 3, name: 'Slim Fit Chinos', price: '₹1,199', category: 'Men', tag: 'For You', img: '/image/men/jeans/p3.jpg' },
    { id: 4, name: 'Block Heel Sandals', price: '₹999', category: 'Footwear', tag: 'For You', img: '/image/footwear/women/heels/d2.jpg' },
    { id: 5, name: 'Printed Shirt', price: '₹799', category: 'Men', tag: 'For You', img: '/image/men/shirt/s2.jpg' },
    { id: 6, name: 'Co-ord Set', price: '₹1,699', category: 'Men', tag: 'For You', img: '/image/men/full/d2.jpg' },
    { id: 7, name: 'Canvas Sneakers', price: '₹1,499', category: 'Footwear', tag: 'For You', img: '/image/footwear/men/sneakers/d3.jpg' },
    { id: 8, name: 'Crossbody Bag', price: '₹1,299', category: 'Accessories', tag: 'For You', img: '/image/accessories/women/bags/d2.jpg' },
    { id: 9, name: 'Oversized Hoodie', price: '₹1,299', category: 'Men', tag: 'For You', img: '/image/men/oversized/d1.jpg' },
    { id: 10, name: 'Floral Midi Dress', price: '₹1,499', category: 'Women', tag: 'For You', img: '/image/women/dress/d1.jpg' },
    { id: 11, name: 'Leather Watch', price: '₹1,999', category: 'Accessories', tag: 'For You', img: '/image/accessories/men/watch/d3.jpg' },
    { id: 12, name: 'Running Shoes', price: '₹1,499', category: 'Footwear', tag: 'For You', img: '/image/footwear/men/sneakers/d4.jpg' },
    { id: 13, name: 'Silk Scarf', price: '₹699', category: 'Accessories', tag: 'For You', img: '/image/accessories/women/scarf/d1.jpg' },
    { id: 14, name: 'Linen Shirt', price: '₹999', category: 'Men', tag: 'For You', img: '/image/men/shirt/s3.jpg' },
    { id: 15, name: 'Boho Maxi Dress', price: '₹1,799', category: 'Women', tag: 'For You', img: '/image/women/dress/d3.jpg' },
    { id: 16, name: 'Retro Sunglasses', price: '₹899', category: 'Accessories', tag: 'For You', img: '/image/accessories/women/sunglasses/d1.jpg' },
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
          <h1 className="page-title">Just For You ★</h1>
        </div>

        <div style={{ background: 'linear-gradient(120deg, #6a1b9a, #9c27b0)', borderRadius: '20px', padding: '32px 40px', marginBottom: '28px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: 0, bottom: 0, width: '200px', height: '160px', overflow: 'hidden' }}>
            <img src="/image/women/dress/d5.jpg" alt="for you" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ zIndex: 1, position: 'relative' }}>
            <div style={{ background: 'rgba(255,255,255,0.25)', color: '#fff', fontSize: '11px', fontWeight: '600', padding: '4px 12px', borderRadius: '20px', display: 'inline-block', marginBottom: '10px' }}>Personalised For You</div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#fff', marginBottom: '6px' }}>Your Style Picks ★</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>Curated based on your interests</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              style={{
                padding: '8px 20px', borderRadius: '20px', border: '1.5px solid',
                borderColor: activeFilter === f ? '#9c27b0' : '#ddd',
                background: activeFilter === f ? '#9c27b0' : '#fff',
                color: activeFilter === f ? '#fff' : '#555',
                fontSize: '13px', fontWeight: '500',
                fontFamily: "'Poppins', sans-serif", cursor: 'pointer', transition: 'all 0.2s',
              }}
            >{f}</button>
          ))}
        </div>

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
                <span className="product-tag" style={{ background: '#9c27b0' }}>{p.tag}</span>
              </div>
              <div className="product-info">
                <div className="product-name">{p.name}</div>
                <div className="product-meta">
                  <span className="product-price" style={{ color: '#9c27b0' }}>{p.price}</span>
                  <span style={{ fontSize: '11px', color: '#aaa' }}>{p.category}</span>
                </div>
                <button className="add-to-cart-btn" style={{ background: '#9c27b0' }}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="footer">® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.</footer>
    </div>
  )
}