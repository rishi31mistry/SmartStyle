import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function DealsOfDay() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [wishlist, setWishlist] = useState([])
  const [activeFilter, setActiveFilter] = useState(searchParams.get('category') || 'All')
  const [timeLeft, setTimeLeft] = useState({ hours: 1, minutes: 30, seconds: 0 })

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const pad = (n) => String(n).padStart(2, '0')
  const filters = ['All', 'Men', 'Women', 'Footwear', 'Accessories']

  const products = [
    { id: 1, name: 'Formal Blazer', price: '₹1,999', originalPrice: '₹3,999', discount: '50%', category: 'Men', img: '/image/men/suit/d1.jpg' },
    { id: 2, name: 'Silk Saree', price: '₹2,499', originalPrice: '₹4,999', discount: '50%', category: 'Women', img: '/image/women/saree/d1.jpg' },
    { id: 3, name: 'Running Shoes', price: '₹1,499', originalPrice: '₹2,999', discount: '50%', category: 'Footwear', img: '/image/footwear/men/sneakers/d4.jpg' },
    { id: 4, name: 'Leather Watch', price: '₹1,999', originalPrice: '₹3,999', discount: '50%', category: 'Accessories', img: '/image/accessories/men/watch/d3.jpg' },
    { id: 5, name: 'Linen Co-ord Set', price: '₹949', originalPrice: '₹1,899', discount: '50%', category: 'Men', img: '/image/men/full/d1.jpg' },
    { id: 6, name: 'Floral Midi Dress', price: '₹749', originalPrice: '₹1,499', discount: '50%', category: 'Women', img: '/image/women/dress/d1.jpg' },
    { id: 7, name: 'Block Heel Sandals', price: '₹499', originalPrice: '₹999', discount: '50%', category: 'Footwear', img: '/image/footwear/women/heels/d2.jpg' },
    { id: 8, name: 'Leather Tote Bag', price: '₹899', originalPrice: '₹1,799', discount: '50%', category: 'Accessories', img: '/image/accessories/women/bags/d1.jpg' },
    { id: 9, name: 'Slim Fit Chinos', price: '₹599', originalPrice: '₹1,199', discount: '50%', category: 'Men', img: '/image/men/jeans/p3.jpg' },
    { id: 10, name: 'Wrap Maxi Dress', price: '₹899', originalPrice: '₹1,799', discount: '50%', category: 'Women', img: '/image/women/dress/d5.jpg' },
    { id: 11, name: 'Canvas Sneakers', price: '₹749', originalPrice: '₹1,499', discount: '50%', category: 'Footwear', img: '/image/footwear/men/sneakers/d3.jpg' },
    { id: 12, name: 'Retro Sunglasses', price: '₹449', originalPrice: '₹899', discount: '50%', category: 'Accessories', img: '/image/accessories/women/sunglasses/d1.jpg' },
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
          <h1 className="page-title">Deals of the Day ⏰</h1>
        </div>

        <div style={{ background: 'linear-gradient(120deg, #e65100, #f57c00)', borderRadius: '20px', padding: '32px 40px', marginBottom: '28px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: 0, bottom: 0, width: '200px', height: '160px', overflow: 'hidden' }}>
            <img src="/image/sale/festival.jpg" alt="deals" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ zIndex: 1, position: 'relative' }}>
            <div style={{ background: 'rgba(255,255,255,0.25)', color: '#fff', fontSize: '11px', fontWeight: '600', padding: '4px 12px', borderRadius: '20px', display: 'inline-block', marginBottom: '10px' }}>Today Only</div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#fff', marginBottom: '6px' }}>Deals of the Day ⏰</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', marginBottom: '20px' }}>Special discounts refreshed every day!</div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              {[{ val: pad(timeLeft.hours), label: 'Hours' }, { val: pad(timeLeft.minutes), label: 'Mins' }, { val: pad(timeLeft.seconds), label: 'Secs' }].map((t, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '28px', fontWeight: '800', padding: '8px 16px', borderRadius: '12px', minWidth: '60px', textAlign: 'center' }}>{t.val}</div>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', marginTop: '4px' }}>{t.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              style={{
                padding: '8px 20px', borderRadius: '20px', border: '1.5px solid',
                borderColor: activeFilter === f ? '#f57c00' : '#ddd',
                background: activeFilter === f ? '#f57c00' : '#fff',
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
                <span className="product-tag" style={{ background: '#f57c00' }}>-{p.discount}</span>
              </div>
              <div className="product-info">
                <div className="product-name">{p.name}</div>
                <div className="product-meta">
                  <div>
                    <span className="product-price" style={{ color: '#f57c00' }}>{p.price}</span>
                    <span className="original-price"> {p.originalPrice}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#aaa' }}>{p.category}</span>
                </div>
                <button className="add-to-cart-btn" style={{ background: '#f57c00' }}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="footer">® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.</footer>
    </div>
  )
}