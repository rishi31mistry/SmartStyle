import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function FootwearWomen() {
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
    { name: 'Heels', img: '/image/footwear/women/heels/d1.jpg' },
    { name: 'Flats', img: '/image/footwear/women/flats/d1.jpg' },
    { name: 'Sandals', img: '/image/footwear/women/sandals/d2.jpg' },
    { name: 'Sneakers', img: '/image/footwear/women/sneakers/d1.jpg' },
    { name: 'Boots', img: '/image/footwear/women/boots/d1.jpg' },
    { name: 'Wedges', img: '/image/footwear/women/wedges/d1.jpg' },
    { name: 'Mules', img: '/image/footwear/women/mules/d1.jpg' },
    { name: 'Kolhapuri', img: '/image/footwear/women/kolhapuri/d1.jpg' },
    { name: 'Slip-ons', img: '/image/footwear/women/slip-ons/d1.jpg' },
    { name: 'Juttis', img: '/image/footwear/women/juttis/d2.jpg' },
    { name: 'Flip Flops', img: '/image/footwear/women/flip-flops/d1.jpg' },
    { name: 'Sports Shoes', img: '/image/footwear/women/sports shoes/d1.jpg' },
  ]

  const brandSales = [
    [
      { name: 'Skechers', discount: 'Up to 40% off', img: '/image/footwear/women/brand/skechers/a1.jpg' },
      { name: 'Aldo', discount: 'Up to 35% off', img: '/image/footwear/women/brand/aldo/a1.jpg' },
      { name: 'Inc.5', discount: 'Up to 50% off', img: '/image/footwear/women/brand/inc/a1.jpg' },
      { name: 'Adidas', discount: 'Up to 30% off', img: '/image/footwear/women/brand/adidas/a1.jpg' },
      { name: 'Rocia', discount: 'Up to 35% off', img: '/image/footwear/women/brand/rocia/a1.jpg' },
    ],
    [
      { name: 'New Balance', discount: 'Up to 45% off', img: '/image/footwear/women/brand/nb/a1.jpg' },
      { name: 'Clarks', discount: 'Up to 35% off', img: '/image/footwear/women/brand/clarks/a1.jpg' },
      { name: 'Hush Puppies', discount: 'Up to 50% off', img: '/image/footwear/women/brand/hp/a3.jpg' },
      { name: 'Puma', discount: 'Up to 35% off', img: '/image/footwear/women/brand/puma/a1.jpg' },
      { name: 'Nike', discount: 'Up to 50% off', img: '/image/footwear/women/brand/nike/a1.jpg' },
    ],
  ]

  const brandRoute = (name) => {
    const map = {
      'Skechers': '/brand/skechers-footwear-women', 'Aldo': '/brand/aldo-footwear-women',
      'Inc.5': '/brand/inc5-footwear-women', 'Adidas': '/brand/adidas-footwear-women',
      'Rocia': '/brand/rocia-footwear-women', 'New Balance': '/brand/newbalance-footwear-women',
      'Clarks': '/brand/clarks-footwear-women', 'Hush Puppies': '/brand/hushpuppies-footwear-women',
      'Puma': '/brand/puma-footwear-women', 'Nike': '/brand/nike-footwear-women',
    }
    return map[name] || `/brand/${name.toLowerCase().replace(/[^a-z0-9]/g, '')}-footwear-women`
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
    fetch(`${BASE}?gender=Footwear&subGender=Women&tag=Sale&limit=8`)
      .then(r => r.json()).then(data => setBudgetDeals(data.slice(0, 8))).catch(console.log)
    fetch(`${BASE}?gender=Footwear&subGender=Women&tag=New&limit=8`)
      .then(r => r.json()).then(data => setNewArrivals(data.slice(0, 8))).catch(console.log)
    fetch(`${BASE}?gender=Footwear&subGender=Women&tag=Trending&limit=8`)
      .then(r => r.json()).then(data => setTrending(data.slice(0, 8))).catch(console.log)
    fetch(`${BASE}?gender=Footwear&subGender=Women&sort=popular&limit=8`)
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
      <div className="wrapper_wearwomen">
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <h1 className="page-title">Women's Footwear</h1>
        </div>

        {/* ✅ Shop Now button navigates to Summer Special with Footwear filter pre-selected */}
        <div className="sale-banner sale-banner-pink">
          <div className="sale-banner-text">
            <div className="sale-banner-tag">Limited Time</div>
            <h2 className="sale-banner-title">Grand Summer Sale</h2>
            <p className="sale-banner-desc">Up to 60% off on top styles</p>
            <button
              className="shop-now-btn shop-now-pink"
              onClick={() => navigate('/products/summer-special?filter=Footwear')}
            >
              Shop Now
            </button>
          </div>
          <div className="sale-banner-img"><img src="/image/footwear/banner/her_sell.jpg" alt="sale" /></div>
        </div>

        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <span className="see-all" onClick={() => navigate('/common/footwear?gender=Women')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="cat-grid">
          {categories.map(cat => (
            <div key={cat.name} className="cat-card"
              onClick={() => navigate(`/common/footwear?gender=Women&category=${encodeURIComponent(cat.name)}`)}>
              <div className="cat-img"><img src={cat.img} alt={cat.name} /></div>
              <div className="cat-name">{cat.name}</div>
            </div>
          ))}
        </div>

        <div className="divider" />

        <div className="section-header">
          <h2 className="section-title">Shop by Your Favourite Brands</h2>
          <span className="see-all see-all-pink">See All <span className="see-all-arrow see-all-arrow-pink">→</span></span>
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
                className={`brand-dot ${i === brandSlide ? 'brand-dot-active brand-dot-active-pink' : ''}`}
                style={{ width: i === brandSlide ? '22px' : '8px' }} />
            ))}
          </div>
        </div>

        <div className="divider" />

        <div className="section-header">
          <h2 className="section-title">Budget Friendly Deals 💰</h2>
          <span className="see-all see-all-pink" onClick={() => navigate('/products/budget-deals?category=Footwear')}>
            See All <span className="see-all-arrow see-all-arrow-pink">→</span>
          </span>
        </div>
        <div className="product-grid">
          {budgetDeals.map(p => <BudgetCard key={p._id} p={p} />)}
        </div>

        <div className="divider" />

        <div className="section-header">
          <h2 className="section-title">New Arrivals</h2>
          <span className="see-all see-all-pink" onClick={() => navigate('/products/new?category=Footwear')}>
            See All <span className="see-all-arrow see-all-arrow-pink">→</span>
          </span>
        </div>
        <div className="product-grid">
          {newArrivals.map(p => <ProductCard key={p._id} product={p} />)}
        </div>

        <div className="divider" />

        <div className="section-header">
          <h2 className="section-title">Trending Now 🔥</h2>
          <span className="see-all see-all-pink" onClick={() => navigate('/products/trending?category=Footwear')}>
            See All <span className="see-all-arrow see-all-arrow-pink">→</span>
          </span>
        </div>
        <div className="product-grid">
          {trending.map(p => <ProductCard key={p._id} product={p} />)}
        </div>

        <div className="divider" />

        <div className="section-header">
          <h2 className="section-title">Just For You ★</h2>
          <span className="see-all see-all-pink" onClick={() => navigate('/products/just-for-you?category=Footwear')}>
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

