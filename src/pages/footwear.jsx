import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'
import '../styles/footwear.css'

export default function Footwear() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
  const [budgetDeals, setBudgetDeals] = useState([])
  const [dealsOfDay, setDealsOfDay] = useState([])
  const [mostPopular, setMostPopular] = useState([])
  const [trending, setTrending] = useState([])

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const res = await fetch('/api/wishlist', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      const ids = Array.isArray(data) ? data.map(i => i.productId) : []
      setWishlist(ids)
    } catch (err) {
      console.log(err)
    }
  }

  const toggleWishlist = async (p) => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return }

    try {
      if (wishlist.includes(p._id)) {
        await fetch(`/api/wishlist/remove/${p._id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        })
        setWishlist(prev => prev.filter(id => id !== p._id))
      } else {
        await fetch('/api/wishlist/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            productId: p._id,
            name: p.name,
            price: p.price,
            image: p.image
          })
        })
        setWishlist(prev => [...prev, p._id])
      }
    } catch (err) {
      console.log(err)
    }
  }

  const categories = [
    { name: 'Sneakers', count: 423, img: '/image/footwear/women/sneakers/d5.jpg' },
    { name: 'Sports Shoes', count: 312, img: '/image/footwear/women/sports shoes/d3.jpg' },
    { name: 'Formal Shoes', count: 245, img: '/image/footwear/men/formal shoes/d1.jpg' },
    { name: 'Sandals', count: 389, img: '/image/footwear/women/sandals/d9.jpg' },
    { name: 'Boots', count: 198, img: '/image/footwear/men/boots/d1.jpg' },
    { name: 'Loafers', count: 167, img: '/image/footwear/men/loafers/d1.jpg' },
    { name: 'Heels', count: 267, img: '/image/footwear/women/heels/d6.jpg' },
    { name: 'Flats', count: 234, img: '/image/footwear/women/flats/d5.jpg' },
    { name: 'Wedges', count: 156, img: '/image/footwear/women/wedges/d3.jpg' },
    { name: 'Kolhapuri', count: 143, img: '/image/footwear/women/kolhapuri/d1.jpg' },
    { name: 'Flip Flops', count: 312, img: '/image/footwear/men/flip-flops/d1.jpg' },
    { name: 'Slip-ons', count: 198, img: '/image/footwear/men/slip-ons/d1.jpg' },
  ]

  useEffect(() => {
    fetchWishlist()
    const BASE = '/api/products'
    fetch(`${BASE}?gender=Footwear&tag=Sale&limit=8`)
      .then(r => r.json()).then(data => setBudgetDeals(data.slice(0, 8))).catch(console.log)
    fetch(`${BASE}?gender=Footwear&tag=Sale&limit=4`)
      .then(r => r.json()).then(data => setDealsOfDay(data.slice(0, 4))).catch(console.log)
    fetch(`${BASE}?gender=Footwear&sort=popular&limit=8`)
      .then(r => r.json()).then(data => setMostPopular(data.slice(0, 8))).catch(console.log)
    fetch(`${BASE}?gender=Footwear&tag=Trending&limit=8`)
      .then(r => r.json()).then(data => setTrending(data.slice(0, 8))).catch(console.log)
  }, [])

  const tagColor = (tag) => {
    if (tag === 'Hot') return '#F5A623'
    if (tag === 'New') return '#4A90D9'
    if (tag === 'Trending') return '#E91E8C'
    if (tag === 'Sale') return '#FF4B4B'
    return '#00897B'
  }

  const ProductCard = ({ product }) => (
    <div className="product-card"
      onClick={() => navigate(`/product/${product._id}`)}
      style={{ cursor: 'pointer' }}>
      <div className="product-img-wrap" style={{ height: '250px' }}>
        <img src={product.image} alt={product.name} />
        <button className="wishlist-btn"
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product) }}>
          <svg width="16" height="16"
            fill={wishlist.includes(product._id) ? '#FF4B4B' : 'none'}
            stroke={wishlist.includes(product._id) ? '#FF4B4B' : '#fff'}
            strokeWidth="2" viewBox="0 0 24 24">
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
          <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
          {product.rating && <span className="product-rating">★ {product.rating}</span>}
        </div>
        <button className="add-to-cart-btn"
          onClick={(e) => { e.stopPropagation(); navigate(`/product/${product._id}`) }}>
          Add to Cart
        </button>
      </div>
    </div>
  )

  return (
    <div className="page">
      <Navbar active="" />
      <div className="wrapper_footwear">

        <div className="page-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <h1 className="page-title">Footwear</h1>
        </div>

        <div className="gender-grid">
          <div className="gender-card gender-card-him" onClick={() => navigate('/products/footwear/men')}>
            <div className="gender-card-img"><img src="/image/footwear/banner/him.jpg" alt="For Him" /></div>
            <div className="gender-card-overlay">
              <span className="gender-tag">Men's Collection</span>
              <div className="gender-title">For Him</div>
              <div className="gender-desc">Sneakers, Formals, Sports & more</div>
              <button className="gender-btn">Shop Now →</button>
            </div>
          </div>
          <div className="gender-card gender-card-her" onClick={() => navigate('/products/footwear/women')}>
            <div className="gender-card-img"><img src="/image/footwear/banner/her.jpg" alt="For Her" /></div>
            <div className="gender-card-overlay">
              <span className="gender-tag">Women's Collection</span>
              <div className="gender-title">For Her</div>
              <div className="gender-desc">Heels, Flats, Boots & more</div>
              <button className="gender-btn">Shop Now →</button>
            </div>
          </div>
        </div>

        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <span className="see-all" onClick={() => navigate('/common/footwear')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="cat-grid">
          {categories.map(cat => (
            <div key={cat.name} className="cat-card"
              onClick={() => navigate(`/common/footwear?category=${encodeURIComponent(cat.name)}`)}>
              <div className="cat-img"><img src={cat.img} alt={cat.name} /></div>
              <div className="cat-name">{cat.name}</div>
              <div className="cat-count">{cat.count} items</div>
            </div>
          ))}
        </div>

        <div className="divider" />

        <div className="section-header">
          <h2 className="section-title">Budget Friendly Deals 💰</h2>
          <span className="see-all" onClick={() => navigate('/products/budget-deals?category=Footwear')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="product-grid">
          {budgetDeals.map(p => (
            <div key={p._id} className="product-card"
              onClick={() => navigate(`/product/${p._id}`)}
              style={{ cursor: 'pointer' }}>
              <div className="product-img-wrap" style={{ height: '250px' }}>
                <img src={p.image} alt={p.name} />
                <button className="wishlist-btn"
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(p) }}>
                  <svg width="16" height="16"
                    fill={wishlist.includes(p._id) ? '#FF4B4B' : 'none'}
                    stroke={wishlist.includes(p._id) ? '#FF4B4B' : '#fff'}
                    strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
                <span className="product-tag" style={{ background: '#FF4B4B' }}>SALE</span>
              </div>
              <div className="product-info">
                <div className="product-name">{p.name}</div>
                <div className="product-meta">
                  <div>
                    <span className="product-price">₹{p.price.toLocaleString('en-IN')}</span>
                    {p.originalPrice > 0 && <span className="original-price"> ₹{p.originalPrice.toLocaleString('en-IN')}</span>}
                  </div>
                  <span className="product-rating">★ {p.rating}</span>
                </div>
                <button className="add-to-cart-btn"
                  onClick={(e) => { e.stopPropagation(); navigate(`/product/${p._id}`) }}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="divider" />

        <div className="section-header">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2 className="section-title">Deals of the Day</h2>
            <span className="deal-timer">⏰ Ends in 03:15:45</span>
          </div>
          <span className="see-all" onClick={() => navigate('/products/deals?category=Footwear')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="product-grid">
          {dealsOfDay.map(p => <ProductCard key={p._id} product={p} />)}
        </div>

        <div className="divider" />

        <div className="section-header">
          <h2 className="section-title">Most Popular ⭐</h2>
          <span className="see-all" onClick={() => navigate('/products/most-popular?category=Footwear')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="product-grid">
          {mostPopular.map(p => <ProductCard key={p._id} product={p} />)}
        </div>

        <div className="divider" />

        <div className="section-header">
          <h2 className="section-title">Trending Now 🔥</h2>
          <span className="see-all" onClick={() => navigate('/products/trending?category=Footwear')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="product-grid">
          {trending.map(p => <ProductCard key={p._id} product={p} />)}
        </div>

      </div>
      <footer className="footer">® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.</footer>
    </div>
  )
}

