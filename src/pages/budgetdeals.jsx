import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function BudgetDeals() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [wishlist, setWishlist] = useState([])
  const [activeFilter, setActiveFilter] = useState(searchParams.get('category') || 'All')

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  const filters = ['All', 'Men', 'Women', 'Footwear', 'Accessories']

  const products = [
    { id: 1, name: 'Basic Cotton Tee', price: '₹299', originalPrice: '₹599', category: 'Men', img: '/image/men/t-shirt/t2.jpg' },
    { id: 2, name: 'Casual Shorts', price: '₹399', originalPrice: '₹799', category: 'Men', img: '/image/men/short/d2.jpg' },
    { id: 3, name: 'Track Pants', price: '₹449', originalPrice: '₹899', category: 'Men', img: '/image/men/trouser/d2.jpg' },
    { id: 4, name: 'Casual Kurta', price: '₹549', originalPrice: '₹1,099', category: 'Men', img: '/image/men/kurta/d2.jpg' },
    { id: 5, name: 'Printed Kurta', price: '₹299', originalPrice: '₹599', category: 'Women', img: '/image/women/kurta/d3.jpg' },
    { id: 6, name: 'Casual Top', price: '₹399', originalPrice: '₹799', category: 'Women', img: '/image/women/top/d2.jpg' },
    { id: 7, name: 'Flared Palazzo', price: '₹449', originalPrice: '₹899', category: 'Women', img: '/image/women/plazzo/d2.jpg' },
    { id: 8, name: 'Floral Dress', price: '₹349', originalPrice: '₹699', category: 'Women', img: '/image/women/dress/d2.jpg' },
    { id: 9, name: 'Canvas Sneakers', price: '₹499', originalPrice: '₹999', category: 'Footwear', img: '/image/footwear/men/sneakers/d9.jpg' },
    { id: 10, name: 'Basic Sandals', price: '₹299', originalPrice: '₹599', category: 'Footwear', img: '/image/footwear/men/sandals/d4.jpg' },
    { id: 11, name: 'Flip Flops', price: '₹199', originalPrice: '₹399', category: 'Footwear', img: '/image/footwear/men/flip-flops/d2.jpg' },
    { id: 12, name: 'Kolhapuri Flats', price: '₹379', originalPrice: '₹749', category: 'Footwear', img: '/image/footwear/women/kolhapuri/d3.jpg' },
    { id: 13, name: 'Leather Wallet', price: '₹499', originalPrice: '₹999', category: 'Accessories', img: '/image/accessories/men/wallet/d2.jpg' },
    { id: 14, name: 'Silk Scarf', price: '₹349', originalPrice: '₹699', category: 'Accessories', img: '/image/accessories/women/scarf/d1.jpg' },
    { id: 15, name: 'Straw Hat', price: '₹499', originalPrice: '₹999', category: 'Accessories', img: '/image/accessories/men/hat/d1.jpg' },
    { id: 16, name: 'Beaded Bracelet', price: '₹299', originalPrice: '₹599', category: 'Accessories', img: '/image/accessories/women/bracelet/d1.jpg' },
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
          <h1 className="page-title">Budget Friendly Deals 💰</h1>
        </div>

        {/* Banner */}
        <div style={{ background: 'linear-gradient(120deg, #2e7d32, #66bb6a)', borderRadius: '20px', padding: '32px 40px', marginBottom: '28px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: 0, bottom: 0, width: '200px', height: '160px', overflow: 'hidden' }}>
            <img src="/image/sale/summer.jpg" alt="budget" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ zIndex: 1, position: 'relative' }}>
            <div style={{ background: 'rgba(255,255,255,0.25)', color: '#fff', fontSize: '11px', fontWeight: '600', padding: '4px 12px', borderRadius: '20px', display: 'inline-block', marginBottom: '10px' }}>Best Value Picks</div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#fff', marginBottom: '6px' }}>Budget Friendly 💰</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>Great styles that won't break the bank</div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              style={{
                padding: '8px 20px', borderRadius: '20px', border: '1.5px solid',
                borderColor: activeFilter === f ? '#2e7d32' : '#ddd',
                background: activeFilter === f ? '#2e7d32' : '#fff',
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
                <span className="product-tag" style={{ background: '#FF4B4B' }}>SALE</span>
              </div>
              <div className="product-info">
                <div className="product-name">{p.name}</div>
                <div className="product-meta">
                  <div>
                    <span className="product-price" style={{ color: '#2e7d32' }}>{p.price}</span>
                    <span className="original-price"> {p.originalPrice}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#aaa' }}>{p.category}</span>
                </div>
                <button className="add-to-cart-btn" style={{ background: '#2e7d32' }}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>

      </div>
      <footer className="footer">® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.</footer>
    </div>
  )
}