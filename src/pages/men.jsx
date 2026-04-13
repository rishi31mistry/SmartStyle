import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function Men() {
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
    { name: 'T-Shirts', img: '/image/men/t-shirt/t9.jpg' },
    { name: 'Shirts', img: '/image/men/shirt/s8.jpg' },
    { name: 'Jeans', img: '/image/men/jeans/p4.jpg' },
    { name: 'Trousers', img: '/image/men/trouser/d6.jpg' },
    { name: 'Kurtas', img: '/image/men/kurta/d8.jpg' },
    { name: 'Jackets', img: '/image/men/jacket/d6.jpg' },
    { name: 'Hoodies', img: '/image/men/hoodies/d4.jpg' },
    { name: 'Shorts', img: '/image/men/short/d4.jpg' },
    { name: 'Suits', img: '/image/men/suit/d1.jpg' },
    { name: 'Ethnic Wear', img: '/image/men/ethnic/d1.jpg' },
    { name: 'Sportswear', img: '/image/men/sport/d4.jpg' },
    { name: 'Accessories', img: '/image/accessories/men/watch/d2.jpg' },
  ]

  const brandSales = [
    [
      { name: 'Nike', discount: 'Up to 40% off', img: '/image/men/brand/nike/t2.jpg' },
      { name: 'Adidas', discount: 'Up to 35% off', img: '/image/men/brand/adidas/p1.jpg' },
      { name: 'H&M', discount: 'Up to 50% off', img: '/image/men/brand/h&m/s1.jpg' },
      { name: 'Jack & Jones', discount: 'Up to 35% off', img: '/image/men/brand/j&j/p7.jpg' },
      { name: 'Puma', discount: 'Up to 45% off', img: '/image/men/brand/puma/t3.jpg' },
    ],
    [
      { name: "Levi's", discount: 'Up to 40% off', img: '/image/men/brand/levis/s8.jpg' },
      { name: 'Tommy', discount: 'Up to 35% off', img: '/image/men/brand/tommy/s4.jpg' },
      { name: 'Gap', discount: 'Up to 50% off', img: '/image/men/brand/gap/t4.jpg' },
      { name: 'U.S. Polo', discount: 'Up to 50% off', img: '/image/men/brand/us/s3.jpg' },
      { name: 'Wrangler', discount: 'Up to 35% off', img: '/image/men/brand/wrangler/s6.jpg' },
    ],
  ]

  const brandRoute = (name) => {
    const map = {
      'Nike': '/brand/nike',
      'Adidas': '/brand/adidas',
      'H&M': '/brand/hm',
      'Jack & Jones': '/brand/jackandjones',
      'Puma': '/brand/puma',
      "Levi's": '/brand/levis',
      'Tommy': '/brand/tommy',
      'Gap': '/brand/gap',
      'U.S. Polo': '/brand/uspolo',
      'Wrangler': '/brand/wrangler',
    }
    return map[name] || `/brand/${name.toLowerCase().replace(/[^a-z0-9]/g, '')}`
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
    fetch(`${BASE}?gender=Men&tag=Sale&limit=8`)
      .then(r => r.json()).then(data => setBudgetDeals(data.slice(0, 8))).catch(console.log)
    fetch(`${BASE}?gender=Men&tag=New&limit=8`)
      .then(r => r.json()).then(data => setNewArrivals(data.slice(0, 8))).catch(console.log)
    fetch(`${BASE}?gender=Men&tag=Trending&limit=8`)
      .then(r => r.json()).then(data => setTrending(data.slice(0, 8))).catch(console.log)
    fetch(`${BASE}?gender=Men&sort=popular&limit=8`)
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
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product._id}`)}
      style={{ cursor: 'pointer' }}
    >
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
          <span className="product-tag" style={{ background: tagColor(product.tag) }}>
            {product.tag}
          </span>
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

  const BudgetCard = ({ p }) => (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${p._id}`)}
      style={{ cursor: 'pointer' }}
    >
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
  )

  return (
    <div className="page">
      <Navbar active="" />
      <div className="wrapper_men">
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <h1 className="page-title">Men's Fashion</h1>
        </div>

        <div className="sale-banner sale-banner-blue">
          <div className="sale-banner-text">
            <div className="sale-banner-tag">Limited Time</div>
            <h2 className="sale-banner-title">Grand Summer Sale</h2>
            <p className="sale-banner-desc">Up to 60% off on top styles</p>
            {/* ✅ ONLY CHANGE: added onClick to navigate with Men filter */}
            <button
              className="shop-now-btn shop-now-blue"
              onClick={() => navigate('/summer-special?filter=Men')}
            >
              Shop Now
            </button>
          </div>
          <div className="sale-banner-img">
            <img src='/image/sale/men.jpg' alt="sale" />
          </div>
        </div>

        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <span className="see-all" onClick={() => navigate('/common/men')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="cat-grid">
          {categories.map(cat => (
            <div key={cat.name} className="cat-card"
              onClick={() => {
                if (cat.name === 'Accessories') navigate('/common/accessories?gender=Men')
                else navigate(`/common/men?category=${encodeURIComponent(cat.name)}`)
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
                      onClick={() => navigate(brandRoute(brand.name))}
                      style={{ backgroundImage: `url(${brand.img})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'pointer' }}>
                      <div className="brand-card-overlay" />
                      <div className="brand-name">{brand.name}</div>
                      <div className="brand-discount">{brand.discount}</div>
                      <button className="brand-btn"
                        onClick={(e) => { e.stopPropagation(); navigate(brandRoute(brand.name)) }}>
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
                className={`brand-dot ${i === brandSlide ? 'brand-dot-active' : ''}`}
                style={{ width: i === brandSlide ? '22px' : '8px' }} />
            ))}
          </div>
        </div>

        <div className="divider" />

        <div className="section-header">
          <h2 className="section-title">Budget Friendly Deals 💰</h2>
          <span className="see-all" onClick={() => navigate('/products/budget-deals?category=Men')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="product-grid">
          {budgetDeals.map(p => <BudgetCard key={p._id} p={p} />)}
        </div>

        <div className="divider" />

        <div className="section-header">
          <h2 className="section-title">New Arrivals</h2>
          <span className="see-all" onClick={() => navigate('/products/new?category=Men')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="product-grid">
          {newArrivals.map(p => <ProductCard key={p._id} product={p} />)}
        </div>

        <div className="divider" />

        <div className="section-header">
          <h2 className="section-title">Trending Now 🔥</h2>
          <span className="see-all" onClick={() => navigate('/products/trending?category=Men')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="product-grid">
          {trending.map(p => <ProductCard key={p._id} product={p} />)}
        </div>

        <div className="divider" />

        <div className="section-header">
          <h2 className="section-title">Just For You ★</h2>
          <span className="see-all" onClick={() => navigate('/products/just-for-you?category=Men')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="product-grid">
          {forYou.map(p => <ProductCard key={p._id} product={p} />)}
        </div>

      </div>
      <footer className="footer">
        ® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.
      </footer>
    </div>
  )
}

