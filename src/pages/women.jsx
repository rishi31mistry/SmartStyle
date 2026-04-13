import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function Women() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
  const [brandSlide, setBrandSlide] = useState(0)
  const [budgetDeals, setBudgetDeals] = useState([])
  const [newArrivals, setNewArrivals] = useState([])
  const [trending, setTrending] = useState([])
  const [forYou, setForYou] = useState([])

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
    { name: 'Kurtis', img: '/image/women/kurta/d1.jpg' },
    { name: 'Dresses', img: '/image/women/dress/d1.jpg' },
    { name: 'Sarees', img: '/image/women/saree/d1.jpg' },
    { name: 'Tops', img: '/image/women/top/d1.jpg' },
    { name: 'Jeans', img: '/image/women/jeans/d1.jpg' },
    { name: 'Plazzos', img: '/image/women/plazzo/d1.jpg' },
    { name: 'Lehengas', img: '/image/women/lehenga/d1.jpg' },
    { name: 'Jackets', img: '/image/women/jacket/d1.jpg' },
    { name: 'Skirts', img: '/image/women/skirt/d1.jpg' },
    { name: 'Ethnic Wear', img: '/image/women/ethnic/d1.jpg' },
    { name: 'Sportswear', img: '/image/women/sport/d1.jpg' },
    { name: 'Accessories', img: '/image//accessories/women/bracelet/d2.jpg' },
  ]

  const brandSales = [
    [
      { name: 'Zara', discount: 'Up to 40% off', img: '/image/women/brand/zara/d7.jpg' },
      { name: 'H&M', discount: 'Up to 50% off', img: '/image/women/brand/h&m/d1.jpg' },
      { name: 'Aurelia', discount: 'Up to 30% off', img: '/image/women/brand/aurelia/d5.jpg' },
      { name: 'Libas', discount: 'Up to 45% off', img: '/image/women/brand/libas/d1.jpg' },
      { name: 'Nykaa Fashion', discount: 'Up to 35% off', img: '/image/women/brand/nykaa/d4.jpg' },
    ],
    [
      { name: 'Biba', discount: 'Up to 40% off', img: '/image/women/brand/biba/t1.jpg' },
      { name: 'Vero Moda', discount: 'Up to 45% off', img: '/image/women/brand/vero/d1.jpg' },
      { name: 'Shein', discount: 'Up to 60% off', img: '/image/women/brand/shein/d5.jpg' },
      { name: 'Fabindia', discount: 'Up to 45% off', img: '/image/women/brand/fabindia/d8.jpg' },
      { name: 'Only', discount: 'Up to 40% off', img: '/image/women/brand/only/d8.jpg' },
    ],
  ]

  const brandRoute = (name) => {
    const map = {
      'Zara': '/women/zara', 'H&M': '/women/hm',
      'Aurelia': '/women/aurelia', 'Libas': '/women/libas',
      'Nykaa Fashion': '/women/nykaa', 'Biba': '/women/biba',
      'Vero Moda': '/women/veromoda', 'Shein': '/women/shein',
      'Fabindia': '/women/fabindia', 'Only': '/women/only',
    }
    return map[name] || null
  }

  useEffect(() => {
    fetchWishlist()
    const timer = setInterval(() => {
      setBrandSlide(prev => (prev + 1) % brandSales.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [brandSales.length])

  useEffect(() => {
    const BASE = '/api/products'
    fetch(`${BASE}?gender=Women&tag=Sale&limit=8`)
      .then(r => r.json()).then(data => setBudgetDeals(data.slice(0, 8))).catch(console.log)
    fetch(`${BASE}?gender=Women&tag=New&limit=8`)
      .then(r => r.json()).then(data => setNewArrivals(data.slice(0, 8))).catch(console.log)
    fetch(`${BASE}?gender=Women&tag=Trending&limit=8`)
      .then(r => r.json()).then(data => setTrending(data.slice(0, 8))).catch(console.log)
    fetch(`${BASE}?gender=Women&sort=popular&limit=8`)
      .then(r => r.json()).then(data => setForYou(data.slice(0, 8))).catch(console.log)
  }, [])

  const tagColor = (tag) => {
    if (tag === 'Hot') return '#F5A623'
    if (tag === 'New') return '#4A90D9'
    if (tag === 'Trending') return '#E91E8C'
    if (tag === 'Sale') return '#FF4B4B'
    if (tag === 'Bestseller') return '#00897B'
    return '#00897B'
  }

  const ProductCard = ({ product }) => (
    <div className="product-card"
      onClick={() => navigate(`/product/${product._id}`)}
      style={{ cursor: 'pointer' }}>
      <div className="product-img-wrap" style={{ height: '420px' }}>
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
          <span className="product-price product-price-pink">₹{product.price.toLocaleString('en-IN')}</span>
          {product.rating && <span className="product-rating">★ {product.rating}</span>}
        </div>
        <button className="add-to-cart-btn add-to-cart-btn-pink"
          onClick={(e) => { e.stopPropagation(); navigate(`/product/${product._id}`) }}>
          Add to Cart
        </button>
      </div>
    </div>
  )

  const BudgetCard = ({ p }) => (
    <div className="product-card"
      onClick={() => navigate(`/product/${p._id}`)}
      style={{ cursor: 'pointer' }}>
      <div className="product-img-wrap" style={{ height: '420px' }}>
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
            <span className="product-price product-price-pink">₹{p.price.toLocaleString('en-IN')}</span>
            {p.originalPrice > 0 && <span className="original-price"> ₹{p.originalPrice.toLocaleString('en-IN')}</span>}
          </div>
          <span className="product-rating">★ {p.rating}</span>
        </div>
        <button className="add-to-cart-btn add-to-cart-btn-pink"
          onClick={(e) => { e.stopPropagation(); navigate(`/product/${p._id}`) }}>
          Add to Cart
        </button>
      </div>
    </div>
  )

  return (
    <div className="page">
      <Navbar active="" />
      <div className="wrapper_women">
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <h1 className="page-title">Women's Fashion</h1>
        </div>

        <div className="sale-banner sale-banner-pink">
          <div className="sale-banner-text">
            <div className="sale-banner-tag">Limited Time</div>
            <h2 className="sale-banner-title">Grand Summer Sale</h2>
            <p className="sale-banner-desc">Up to 60% off on top styles</p>
            {/* ✅ ONLY CHANGE: added onClick to navigate with Women filter */}
            <button
              className="shop-now-btn shop-now-pink"
              onClick={() => navigate('/summer-special?filter=Women')}
            >
              Shop Now
            </button>
          </div>
          <div className="sale-banner-img"><img src='/image/sale/women.jpg' alt="sale" /></div>
        </div>

        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <span className="see-all see-all-pink" onClick={() => navigate('/common/women')}>
            See All <span className="see-all-arrow see-all-arrow-pink">→</span>
          </span>
        </div>
        <div className="cat-grid">
          {categories.map(cat => (
            <div key={cat.name} className="cat-card"
              onClick={() => {
                if (cat.name === 'Accessories') navigate('/common/accessories?gender=Women')
                else navigate(`/common/women?category=${encodeURIComponent(cat.name)}`)
              }}>
              <div className="cat-img"><img src={cat.img} alt={cat.name} /></div>
              <div className="cat-name">{cat.name}</div>
            </div>
          ))}
        </div>

        <div className="divider" />

        <div className="section-header">
          <h2 className="section-title">Shop by Your Favourite Brands</h2>
        </div>
        <div className="brand-carousel-wrap">
          <div className="brand-track-outer">
            <div className="brand-track"
              style={{
                width: `${brandSales.length * 100}%`,
                transform: `translateX(-${brandSlide * (100 / brandSales.length)}%)`,
              }}>
              {brandSales.map((slide, si) => (
                <div key={si} className="brand-slide" style={{ width: `${100 / brandSales.length}%` }}>
                  {slide.map(brand => (
                    <div key={brand.name} className="brand-card"
                      onClick={() => brandRoute(brand.name) && navigate(brandRoute(brand.name))}
                      style={{ backgroundImage: `url(${brand.img})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: brandRoute(brand.name) ? 'pointer' : 'default' }}>
                      <div className="brand-card-overlay" />
                      <div className="brand-name">{brand.name}</div>
                      <div className="brand-discount">{brand.discount}</div>
                      <button className="brand-btn"
                        onClick={(e) => { e.stopPropagation(); brandRoute(brand.name) && navigate(brandRoute(brand.name)) }}>
                        Shop Now
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="brand-dots">
            {brandSales.map((_, i) => (
              <div key={i} onClick={() => setBrandSlide(i)}
                className={`brand-dot ${i === brandSlide ? 'brand-dot-active brand-dot-active-pink' : ''}`}
                style={{ width: i === brandSlide ? '22px' : '8px' }} />
            ))}
          </div>
        </div>

        <div className="divider" />

        <div className="section-header">
          <h2 className="section-title">Budget Friendly Deals 💰</h2>
          <span className="see-all see-all-pink" onClick={() => navigate('/products/budget-deals?category=Women')}>
            See All <span className="see-all-arrow see-all-arrow-pink">→</span>
          </span>
        </div>
        <div className="product-grid">
          {budgetDeals.map(p => <BudgetCard key={p._id} p={p} />)}
        </div>

        <div className="divider" />

        <div className="section-header">
          <h2 className="section-title">New Arrivals</h2>
          <span className="see-all see-all-pink" onClick={() => navigate('/products/new?category=Women')}>
            See All <span className="see-all-arrow see-all-arrow-pink">→</span>
          </span>
        </div>
        <div className="product-grid">
          {newArrivals.map(p => <ProductCard key={p._id} product={p} />)}
        </div>

        <div className="divider" />

        <div className="section-header">
          <h2 className="section-title">Trending Now 🔥</h2>
          <span className="see-all see-all-pink" onClick={() => navigate('/products/trending?category=Women')}>
            See All <span className="see-all-arrow see-all-arrow-pink">→</span>
          </span>
        </div>
        <div className="product-grid">
          {trending.map(p => <ProductCard key={p._id} product={p} />)}
        </div>

        <div className="divider" />

        <div className="section-header">
          <h2 className="section-title">Just For You ★</h2>
          <span className="see-all see-all-pink" onClick={() => navigate('/products/just-for-you?category=Women')}>
            See All <span className="see-all-arrow see-all-arrow-pink">→</span>
          </span>
        </div>
        <div className="product-grid">
          {forYou.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      </div>
      <footer className="footer">® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.</footer>
    </div>
  )
}

