import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function SummerSpecial() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [wishlist, setWishlist] = useState([])
  const [activeFilter, setActiveFilter] = useState(searchParams.get('filter') || 'All')
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

  // ✅ Re-reads URL param whenever it changes (e.g. arriving from footwearwomen banner)
  useEffect(() => {
    const filterParam = searchParams.get('filter')
    if (filterParam) setActiveFilter(filterParam)
  }, [searchParams])

  const filters = ['All', 'Men', 'Women', 'Footwear', 'Accessories']

  // ✅ Footwear products use gender='Footwear' in your DB — this matches correctly
  const filtered = activeFilter === 'All'
    ? products
    : activeFilter === 'Footwear'
      ? products.filter(p => p.gender === 'Footwear' ||
          p.category === 'Footwear' ||
          (Array.isArray(p.category) && p.category.includes('Footwear')))
      : products.filter(p => p.gender === activeFilter)

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

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              style={{ padding: '8px 20px', borderRadius: '20px', border: '1.5px solid', borderColor: activeFilter === f ? '#F5A623' : '#ddd', background: activeFilter === f ? '#F5A623' : '#fff', color: activeFilter === f ? '#fff' : '#555', fontSize: '13px', fontWeight: '500', fontFamily: "'Poppins', sans-serif", cursor: 'pointer' }}
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
                  <span className="product-tag" style={{ background: '#F5A623' }}>Summer</span>
                </div>
                <div className="product-info">
                  <div className="product-name">{p.name}</div>
                  <div className="product-meta">
                    <span className="product-price" style={{ color: '#F5A623' }}>₹{p.price.toLocaleString('en-IN')}</span>
                    <span style={{ fontSize: '11px', color: '#aaa' }}>{p.gender}</span>
                  </div>
                  <button className="add-to-cart-btn" style={{ background: '#F5A623' }}
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
