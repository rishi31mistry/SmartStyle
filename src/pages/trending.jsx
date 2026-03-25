import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function Trending() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [wishlist, setWishlist] = useState([])
  const [activeFilter, setActiveFilter] = useState(searchParams.get('category') || 'All')

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  const filters = ['All', 'Men', 'Women', 'Footwear', 'Accessories']

  const products = [
    { id: 1, name: 'Oversized Tee', price: '₹699', category: 'Men', tag: 'Trending', tagColor: '#E91E8C', img: '/image/men/oversized/d2.jpg' },
    { id: 2, name: 'Cargo Pants', price: '₹1,499', category: 'Men', tag: 'Hot', tagColor: '#F5A623', img: '/image/men/trouser/d5.jpg' },
    { id: 3, name: 'Bomber Jacket', price: '₹2,799', category: 'Men', tag: 'New', tagColor: '#4A90D9', img: '/image/men/jacket/d3.jpg' },
    { id: 4, name: 'Ethnic Kurta Set', price: '₹1,899', category: 'Men', tag: 'Popular', tagColor: '#00897B', img: '/image/men/kurta/d4.jpg' },
    { id: 5, name: 'Oversized Blazer', price: '₹1,999', category: 'Women', tag: 'Trending', tagColor: '#E91E8C', img: '/image/women/suit/d2.jpg' },
    { id: 6, name: 'Wide Leg Pants', price: '₹1,299', category: 'Women', tag: 'Hot', tagColor: '#F5A623', img: '/image/women/jeans/d4.jpg' },
    { id: 7, name: 'Puff Sleeve Dress', price: '₹1,799', category: 'Women', tag: 'New', tagColor: '#4A90D9', img: '/image/women/dress/d6.jpg' },
    { id: 8, name: 'Embroidered Kurta', price: '₹1,599', category: 'Women', tag: 'Popular', tagColor: '#00897B', img: '/image/women/kurta/d6.jpg' },
    { id: 9, name: 'High Top Sneakers', price: '₹2,299', category: 'Footwear', tag: 'Trending', tagColor: '#E91E8C', img: '/image/footwear/men/sneakers/d7.jpg' },
    { id: 10, name: 'Knee High Boots', price: '₹3,299', category: 'Footwear', tag: 'Hot', tagColor: '#F5A623', img: '/image/footwear/women/boots/d7.jpg' },
    { id: 11, name: 'Chunky Sneakers', price: '₹2,199', category: 'Footwear', tag: 'New', tagColor: '#4A90D9', img: '/image/footwear/men/sneakers/d11.jpg' },
    { id: 12, name: 'Square Toe Mules', price: '₹1,299', category: 'Footwear', tag: 'Popular', tagColor: '#00897B', img: '/image/footwear/women/mules/d4.jpg' },
    { id: 13, name: 'Smart Watch', price: '₹4,999', category: 'Accessories', tag: 'Trending', tagColor: '#E91E8C', img: '/image/accessories/men/watch/d6.jpg' },
    { id: 14, name: 'Layered Necklace', price: '₹899', category: 'Accessories', tag: 'Hot', tagColor: '#F5A623', img: '/image/accessories/women/necklace/d3.jpg' },
    { id: 15, name: 'Mini Shoulder Bag', price: '₹1,299', category: 'Accessories', tag: 'New', tagColor: '#4A90D9', img: '/image/accessories/women/bags/d5.jpg' },
    { id: 16, name: 'Polarized Sunglasses', price: '₹1,499', category: 'Accessories', tag: 'Popular', tagColor: '#00897B', img: '/image/accessories/men/sunglasses/d4.jpg' },
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
          <h1 className="page-title">Trending Now 🔥</h1>
        </div>

        {/* Banner */}
        <div style={{ background: 'linear-gradient(120deg, #E91E8C, #f472b6)', borderRadius: '20px', padding: '32px 40px', marginBottom: '28px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: 0, bottom: 0, width: '200px', height: '160px', overflow: 'hidden' }}>
            <img src="/image/sale/arrival.jpg" alt="trending" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ zIndex: 1, position: 'relative' }}>
            <div style={{ background: 'rgba(255,255,255,0.25)', color: '#fff', fontSize: '11px', fontWeight: '600', padding: '4px 12px', borderRadius: '20px', display: 'inline-block', marginBottom: '10px' }}>What's Hot Right Now</div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#fff', marginBottom: '6px' }}>Trending Now 🔥</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>The most talked about styles this season</div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              style={{
                padding: '8px 20px', borderRadius: '20px', border: '1.5px solid',
                borderColor: activeFilter === f ? '#E91E8C' : '#ddd',
                background: activeFilter === f ? '#E91E8C' : '#fff',
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
                <span className="product-tag" style={{ background: p.tagColor }}>{p.tag}</span>
              </div>
              <div className="product-info">
                <div className="product-name">{p.name}</div>
                <div className="product-meta">
                  <span className="product-price" style={{ color: '#E91E8C' }}>{p.price}</span>
                  <span style={{ fontSize: '11px', color: '#aaa' }}>{p.category}</span>
                </div>
                <button className="add-to-cart-btn" style={{ background: '#E91E8C' }}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>

      </div>
      <footer className="footer">® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.</footer>
    </div>
  )
}