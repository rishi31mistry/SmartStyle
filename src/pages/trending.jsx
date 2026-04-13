import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function Trending() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [wishlist, setWishlist] = useState([])
  const [activeFilter, setActiveFilter] = useState(searchParams.get('category') || 'All')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  useEffect(() => {
    fetch('/api/products?tag=Trending')
      .then(r => r.json())
      .then(data => { setProducts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filters = ['All', 'Men', 'Women', 'Footwear', 'Accessories']

  const filtered = activeFilter === 'All'
    ? products
    : products.filter(p => p.gender === activeFilter)

  const tagColor = (tag) => {
    if (tag === 'Hot') return '#F5A623'
    if (tag === 'New') return '#4A90D9'
    if (tag === 'Trending') return '#E91E8C'
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
          <h1 className="page-title">Trending Now 🔥</h1>
        </div>

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

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              style={{ padding: '8px 20px', borderRadius: '20px', border: '1.5px solid', borderColor: activeFilter === f ? '#E91E8C' : '#ddd', background: activeFilter === f ? '#E91E8C' : '#fff', color: activeFilter === f ? '#fff' : '#555', fontSize: '13px', fontWeight: '500', fontFamily: "'Poppins', sans-serif", cursor: 'pointer' }}
            >{f}</button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>Loading...</div>
        ) : (
          <div className="product-grid">
            {filtered.map(p => (
              <div key={p._id} className="product-card"
                onClick={() => navigate(`/product/${p._id}`)}
                style={{ cursor: 'pointer' }}>
                <div className="product-img-wrap" style={{ height: '420px' }}>
                  <img src={p.image} alt={p.name} />
                  <button className="wishlist-btn" onClick={(e) => { e.stopPropagation(); toggleWishlist(p._id) }}>
                    <svg width="16" height="16" fill={wishlist.includes(p._id) ? '#FF4B4B' : 'none'} stroke={wishlist.includes(p._id) ? '#FF4B4B' : '#fff'} strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                  {p.tag && <span className="product-tag" style={{ background: tagColor(p.tag) }}>{p.tag}</span>}
                </div>
                <div className="product-info">
                  <div className="product-name">{p.name}</div>
                  <div className="product-meta">
                    <span className="product-price" style={{ color: '#E91E8C' }}>₹{p.price.toLocaleString('en-IN')}</span>
                    <span style={{ fontSize: '11px', color: '#aaa' }}>{p.gender}</span>
                  </div>
                  <button className="add-to-cart-btn" style={{ background: '#E91E8C' }}
                    onClick={(e) => { e.stopPropagation(); navigate(`/product/${p._id}`) }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <footer className="footer">® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.</footer>
    </div>
  )
}
