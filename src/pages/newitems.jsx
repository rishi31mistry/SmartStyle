import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function NewItems() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [wishlist, setWishlist] = useState([])
  const [activeFilter, setActiveFilter] = useState(searchParams.get('category') || 'All')

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  const filters = ['All', 'Men', 'Women', 'Footwear', 'Accessories']

  const products = [
    { id: 1, name: 'Oversized Hoodie', price: '₹1,299', category: 'Men', tag: 'New', img: '/image/men/oversized/d1.jpg' },
    { id: 2, name: 'Floral Midi Dress', price: '₹1,499', category: 'Women', tag: 'New', img: '/image/women/dress/d1.jpg' },
    { id: 3, name: 'Chunky Sneakers', price: '₹2,199', category: 'Footwear', tag: 'New', img: '/image/footwear/women/sneakers/d1.jpg' },
    { id: 4, name: 'Leather Tote Bag', price: '₹1,799', category: 'Accessories', tag: 'New', img: '/image/accessories/women/bags/d1.jpg' },
    { id: 5, name: 'Linen Co-ord Set', price: '₹1,899', category: 'Men', tag: 'New', img: '/image/men/full/d1.jpg' },
    { id: 6, name: 'Retro Sunglasses', price: '₹899', category: 'Accessories', tag: 'New', img: '/image/accessories/women/sunglasses/d1.jpg' },
    { id: 7, name: 'Cargo Pants', price: '₹1,499', category: 'Men', tag: 'New', img: '/image/men/trouser/d1.jpg' },
    { id: 8, name: 'Silk Scarf', price: '₹699', category: 'Accessories', tag: 'New', img: '/image/accessories/women/scarf/d1.jpg' },
    { id: 9, name: 'Wrap Maxi Dress', price: '₹1,799', category: 'Women', tag: 'New', img: '/image/women/dress/d5.jpg' },
    { id: 10, name: 'Canvas Sneakers', price: '₹1,499', category: 'Footwear', tag: 'New', img: '/image/footwear/men/sneakers/d3.jpg' },
    { id: 11, name: 'Slim Fit Chinos', price: '₹1,199', category: 'Men', tag: 'New', img: '/image/men/jeans/p3.jpg' },
    { id: 12, name: 'Crossbody Bag', price: '₹1,299', category: 'Accessories', tag: 'New', img: '/image/accessories/women/bags/d2.jpg' },
    { id: 13, name: 'Boho Kurta Set', price: '₹1,399', category: 'Women', tag: 'New', img: '/image/women/kurta/d2.jpg' },
    { id: 14, name: 'Derby Shoes', price: '₹2,499', category: 'Footwear', tag: 'New', img: '/image/footwear/men/sports shoes/d1.jpg' },
    { id: 15, name: 'Denim Jacket', price: '₹2,199', category: 'Women', tag: 'New', img: '/image/women/jacket/d1.jpg' },
    { id: 16, name: 'Printed Shirt', price: '₹799', category: 'Men', tag: 'New', img: '/image/men/shirt/s2.jpg' },
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
          <h1 className="page-title">New Items ✨</h1>
        </div>

        <div style={{ background: 'linear-gradient(120deg, #4A90D9, #6fb3f5)', borderRadius: '20px', padding: '32px 40px', marginBottom: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
          <div>
            <div style={{ background: 'rgba(255,255,255,0.25)', color: '#fff', fontSize: '11px', fontWeight: '600', padding: '4px 12px', borderRadius: '20px', display: 'inline-block', marginBottom: '10px' }}>Just Dropped</div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#fff', marginBottom: '6px' }}>Fresh Arrivals</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>Brand new styles added daily</div>
          </div>
          <div style={{ position: 'absolute', right: 0, bottom: 0, width: '200px', height: '160px', overflow: 'hidden' }}>
            <img src="/image/sale/arrival.jpg" alt="new" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              style={{
                padding: '8px 20px', borderRadius: '20px', border: '1.5px solid',
                borderColor: activeFilter === f ? '#4A90D9' : '#ddd',
                background: activeFilter === f ? '#4A90D9' : '#fff',
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
                <span className="product-tag" style={{ background: '#4A90D9' }}>NEW</span>
              </div>
              <div className="product-info">
                <div className="product-name">{p.name}</div>
                <div className="product-meta">
                  <span className="product-price">{p.price}</span>
                  <span style={{ fontSize: '11px', color: '#aaa' }}>{p.category}</span>
                </div>
                <button className="add-to-cart-btn">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="footer">® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.</footer>
    </div>
  )
}