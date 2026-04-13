import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function FootwearMen() {
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
    { name: 'Sneakers', img: '/image/footwear/men/sneakers/d1.jpg' },
    { name: 'Sports Shoes', img: '/image/footwear/men/sports shoes/d1.jpg' },
    { name: 'Formal Shoes', img: '/image/footwear/men/formal shoes/d2.jpg' },
    { name: 'Loafers', img: '/image/footwear/men/loafers/d1.jpg' },
    { name: 'Sandals', img: '/image/footwear/men/sandals/d1.jpg' },
    { name: 'Boots', img: '/image/footwear/men/boots/d1.jpg' },
    { name: 'Slip-ons', img: '/image/footwear/men/slip-ons/d1.jpg' },
    { name: 'Flip Flops', img: '/image/footwear/men/flip-flops/d1.jpg' },
    { name: 'Derby Shoes', img: '/image/footwear/men/derby-shoes/d1.jpg' },
    { name: 'Monk Straps', img: '/image/footwear/men/monk-straps/d1.jpg' },
    { name: 'Kolhapuri', img: '/image/footwear/men/kolhapuri/d1.jpg' },
    { name: 'Trail Shoes', img: '/image/footwear/men/trail-shoes/d1.jpg' },
  ]

  const brandSales = [
    [
      { name: 'Nike', discount: 'Up to 40% off', img: '/image/footwear/men/brand/nike/b1.jpg' },
      { name: 'Adidas', discount: 'Up to 35% off', img: '/image/footwear/men/brand/adidas/b1.jpg' },
      { name: 'Puma', discount: 'Up to 45% off', img: '/image/footwear/men/brand/puma/b1.jpg' },
      { name: 'Woodland', discount: 'Up to 40% off', img: '/image/footwear/men/brand/woodland/b1.jpg' },
      { name: 'New Balance', discount: 'Up to 30% off', img: '/image/footwear/men/brand/nb/b1.jpg' },
    ],
    [
      { name: 'Skechers', discount: 'Up to 40% off', img: '/image/footwear/men/brand/skechers/b1.jpg' },
      { name: 'ASICS', discount: 'Up to 35% off', img: '/image/footwear/men/brand/asics/b1.jpg' },
      { name: 'Under Armour', discount: 'Up to 50% off', img: '/image/footwear/men/brand/ua/b1.jpg' },
      { name: 'Bata', discount: 'Up to 45% off', img: '/image/footwear/men/brand/bata/b1.jpg' },
      { name: 'Lee Cooper', discount: 'Up to 45% off', img: '/image/footwear/men/brand/lc/a1.jpg' },
    ],
  ]

  const brandRoute = (name) => {
    const map = {
      'Nike': '/brand/nike-footwear-men', 'Adidas': '/brand/adidas-footwear-men',
      'Puma': '/brand/puma-footwear-men', 'Woodland': '/brand/woodland-footwear-men',
      'New Balance': '/brand/newbalance-footwear-men', 'Skechers': '/brand/skechers-footwear-men',
      'ASICS': '/brand/asics-footwear-men', 'Under Armour': '/brand/underarmour-footwear-men',
      'Bata': '/brand/bata-footwear-men', 'Lee Cooper': '/brand/leecooper-footwear-men',
    }
    return map[name] || `/brand/${name.toLowerCase().replace(/[^a-z0-9]/g, '')}-footwear-men`
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
    fetch(`${BASE}?gender=Footwear&subGender=Men&tag=Sale&limit=8`)
      .then(r => r.json()).then(data => setBudgetDeals(data.slice(0, 8))).catch(console.log)
    fetch(`${BASE}?gender=Footwear&subGender=Men&tag=New&limit=8`)
      .then(r => r.json()).then(data => setNewArrivals(data.slice(0, 8))).catch(console.log)
    fetch(`${BASE}?gender=Footwear&subGender=Men&tag=Trending&limit=8`)
      .then(r => r.json()).then(data => setTrending(data.slice(0, 8))).catch(console.log)
    fetch(`${BASE}?gender=Footwear&subGender=Men&sort=popular&limit=8`)
      .then(r => r.json()).then(data => setForYou(data.slice(0, 8))).catch(console.log)
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
      <div className="product-img-wrap" style={{ height: '350px' }}>
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

  const BudgetCard = ({ p }) => (
    <div className="product-card"
      onClick={() => navigate(`/product/${p._id}`)}
      style={{ cursor: 'pointer' }}>
      <div className="product-img-wrap" style={{ height: '350px' }}>
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
      <div className="wrapper_wearmen">
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <h1 className="page-title">Men's Footwear</h1>
        </div>

        <div className="sale-banner sale-banner-blue">
          <div className="sale-banner-text">
            <div className="sale-banner-tag">Limited Time</div>
            <h2 className="sale-banner-title">Grand Summer Sale</h2>
            <p className="sale-banner-desc">Up to 60% off on top styles</p>
            {/* ✅ ONLY CHANGE: added onClick to navigate with Footwear filter */}
            <button
              className="shop-now-btn shop-now-blue"
              onClick={() => navigate('/summer-special?filter=Footwear')}
            >
              Shop Now
            </button>
          </div>
          <div className="sale-banner-img"><img src="/image/footwear/banner/him_sell.jpg" alt="sale" /></div>
        </div>

        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <span className="see-all" onClick={() => navigate('/common/footwear?gender=Men')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="cat-grid">
          {categories.map(cat => (
            <div key={cat.name} className="cat-card"
              onClick={() => navigate(`/common/footwear?gender=Men&category=${encodeURIComponent(cat.name)}`)}>
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
              style={{ width: `${brandSales.length * 100}%`, transform: `translateX(-${brandSlide * (100 / brandSales.length)}%)` }}>
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
          <span className="see-all" onClick={() => navigate('/products/budget-deals?category=Footwear')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="product-grid">
          {budgetDeals.map(p => <BudgetCard key={p._id} p={p} />)}
        </div>

        <div className="divider" />

        <div className="section-header">
          <h2 className="section-title">New Arrivals</h2>
          <span className="see-all" onClick={() => navigate('/products/new?category=Footwear')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="product-grid">
          {newArrivals.map(p => <ProductCard key={p._id} product={p} />)}
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

        <div className="divider" />

        <div className="section-header">
          <h2 className="section-title">Just For You ★</h2>
          <span className="see-all" onClick={() => navigate('/products/just-for-you?category=Footwear')}>
            See All <span className="see-all-arrow">→</span>
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

