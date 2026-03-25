import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function FlashSale() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [wishlist, setWishlist] = useState([])
  const [activeFilter, setActiveFilter] = useState(searchParams.get('category') || 'All')
  const [activeDiscount, setActiveDiscount] = useState(searchParams.get('discount') || 'All')
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 30 })

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
  const discountFilters = ['All', 'Up to 50%', 'Up to 60%', 'Up to 70%']

  const products = [
    { id: 1, name: 'Classic White Tee', price: '₹399', originalPrice: '₹799', discount: '50%', discountNum: 50, category: 'Men', img: '/image/men/t-shirt/t2.jpg' },
    { id: 2, name: 'Floral Wrap Dress', price: '₹749', originalPrice: '₹1,499', discount: '50%', discountNum: 50, category: 'Women', img: '/image/women/dress/d3.jpg' },
    { id: 3, name: 'Running Shoes', price: '₹1,499', originalPrice: '₹2,999', discount: '50%', discountNum: 50, category: 'Footwear', img: '/image/footwear/men/sneakers/d4.jpg' },
    { id: 4, name: 'Leather Watch', price: '₹1,999', originalPrice: '₹3,999', discount: '50%', discountNum: 50, category: 'Accessories', img: '/image/accessories/men/watch/d3.jpg' },
    { id: 5, name: 'Cargo Pants', price: '₹599', originalPrice: '₹1,499', discount: '60%', discountNum: 60, category: 'Men', img: '/image/men/trouser/d1.jpg' },
    { id: 6, name: 'Silk Saree', price: '₹1,999', originalPrice: '₹4,999', discount: '60%', discountNum: 60, category: 'Women', img: '/image/women/saree/d1.jpg' },
    { id: 7, name: 'Block Heel Sandals', price: '₹399', originalPrice: '₹999', discount: '60%', discountNum: 60, category: 'Footwear', img: '/image/footwear/women/heels/d2.jpg' },
    { id: 8, name: 'Crossbody Bag', price: '₹519', originalPrice: '₹1,299', discount: '60%', discountNum: 60, category: 'Accessories', img: '/image/accessories/women/bags/d2.jpg' },
    { id: 9, name: 'Linen Shirt', price: '₹299', originalPrice: '₹999', discount: '70%', discountNum: 70, category: 'Men', img: '/image/men/shirt/s3.jpg' },
    { id: 10, name: 'Co-ord Set', price: '₹509', originalPrice: '₹1,699', discount: '70%', discountNum: 70, category: 'Women', img: '/image/men/full/d2.jpg' },
    { id: 11, name: 'Canvas Sneakers', price: '₹449', originalPrice: '₹1,499', discount: '70%', discountNum: 70, category: 'Footwear', img: '/image/footwear/men/sneakers/d3.jpg' },
    { id: 12, name: 'Retro Sunglasses', price: '₹269', originalPrice: '₹899', discount: '70%', discountNum: 70, category: 'Accessories', img: '/image/accessories/women/sunglasses/d1.jpg' },
    { id: 13, name: 'Denim Jacket', price: '₹1,099', originalPrice: '₹2,199', discount: '50%', discountNum: 50, category: 'Women', img: '/image/women/jacket/d1.jpg' },
    { id: 14, name: 'Formal Blazer', price: '₹999', originalPrice: '₹1,999', discount: '50%', discountNum: 50, category: 'Men', img: '/image/men/suit/d1.jpg' },
    { id: 15, name: 'Kolhapuri Sandals', price: '₹269', originalPrice: '₹899', discount: '70%', discountNum: 70, category: 'Footwear', img: '/image/footwear/women/sandals/d1.jpg' },
    { id: 16, name: 'Silk Scarf', price: '₹209', originalPrice: '₹699', discount: '70%', discountNum: 70, category: 'Accessories', img: '/image/accessories/women/scarf/d1.jpg' },
  ]

  // Apply both filters
  let filtered = [...products]

  if (activeFilter !== 'All') {
    filtered = filtered.filter(p => p.category === activeFilter)
  }

  if (activeDiscount !== 'All') {
    const discountValue = parseInt(activeDiscount.replace('Up to ', '').replace('%', ''))
    filtered = filtered.filter(p => p.discountNum >= discountValue)
  }

  return (
    <div className="page">
      <Navbar active="" />
      <div className="wrapper">

        <div className="page-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <h1 className="page-title">⚡ Flash Sale</h1>
        </div>

        {/* Banner */}
        <div style={{ background: 'linear-gradient(120deg, #b71c1c, #e53935)', borderRadius: '20px', padding: '32px 40px', marginBottom: '28px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: 0, bottom: 0, width: '200px', height: '160px', overflow: 'hidden' }}>
            <img src="/image/sale/flash.jpg" alt="flash" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ zIndex: 1, position: 'relative' }}>
            <div style={{ background: 'rgba(255,255,255,0.25)', color: '#fff', fontSize: '11px', fontWeight: '600', padding: '4px 12px', borderRadius: '20px', display: 'inline-block', marginBottom: '10px' }}>Limited Time Only</div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#fff', marginBottom: '6px' }}>Flash Sale ⚡</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', marginBottom: '20px' }}>Up to 70% off — Hurry before it ends!</div>
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

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              style={{
                padding: '8px 20px', borderRadius: '20px', border: '1.5px solid',
                borderColor: activeFilter === f ? '#e53935' : '#ddd',
                background: activeFilter === f ? '#e53935' : '#fff',
                color: activeFilter === f ? '#fff' : '#555',
                fontSize: '13px', fontWeight: '500',
                fontFamily: "'Poppins', sans-serif", cursor: 'pointer', transition: 'all 0.2s',
              }}
            >{f}</button>
          ))}
        </div>

        {/* Discount Filters */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {discountFilters.map(d => (
            <button key={d} onClick={() => setActiveDiscount(d)}
              style={{
                padding: '7px 18px', borderRadius: '20px', border: '1.5px solid',
                borderColor: activeDiscount === d ? '#FF4B4B' : '#ddd',
                background: activeDiscount === d ? '#FF4B4B' : '#fff5f5',
                color: activeDiscount === d ? '#fff' : '#FF4B4B',
                fontSize: '12px', fontWeight: '600',
                fontFamily: "'Poppins', sans-serif", cursor: 'pointer', transition: 'all 0.2s',
              }}
            >{d === 'All' ? '🏷️ All Discounts' : `🔥 ${d}`}</button>
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
                <span className="product-tag" style={{ background: '#e53935' }}>-{p.discount}</span>
              </div>
              <div className="product-info">
                <div className="product-name">{p.name}</div>
                <div className="product-meta">
                  <div>
                    <span className="product-price" style={{ color: '#e53935' }}>{p.price}</span>
                    <span className="original-price"> {p.originalPrice}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#aaa' }}>{p.category}</span>
                </div>
                <button className="add-to-cart-btn" style={{ background: '#e53935' }}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>

      </div>
      <footer className="footer">® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.</footer>
    </div>
  )
}