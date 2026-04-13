import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'
import '../styles/home.css'

export default function Home() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hoveredNav, setHoveredNav] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // ✅ Wishlist ids from server
  const [wishlist, setWishlist] = useState([])

  // Dynamic product states
  const [newItems, setNewItems] = useState([])
  const [flashSaleItems, setFlashSaleItems] = useState([])
  const [mostPopular, setMostPopular] = useState([])
  const [justForYou, setJustForYou] = useState([])
  const [dealsOfDay, setDealsOfDay] = useState([])
  const [summerItems, setSummerItems] = useState([])

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

  const navItems = [
    { label: 'Men', path: '/products/men' },
    { label: 'Women', path: '/products/women' },
    { label: 'Footwear', path: '/products/footwear' },
    { label: 'Accessories', path: '/products/accessories' },
  ]

  const specialItems = [
    { label: 'Custom Outfit', isNew: true, path: '/custom-outfit'  },
    { label: 'Moody Outfits', isNew: true, path: '/products/moodyoutfits' },
  ]

  const slides = [
    { title: 'Summer Sale', desc: 'Up to 60% off on all categories', tag: 'Shop Now →', bg: 'linear-gradient(120deg, #1565C0, #42a5f5)', img: '/image/sale/summer2.jpg', path: '/products/summer-special' },
    { title: 'New Arrivals', desc: 'Fresh styles just dropped', tag: 'Explore Now →', bg: 'linear-gradient(120deg, #E91E8C, #f472b6)', img: '/image/sale/arrival.jpg', path: '/products/new' },
    { title: 'Most Popular', desc: 'Look your best this season', tag: 'Shop Now →', bg: 'linear-gradient(120deg, #e65100, #f57c00)', img: '/image/sale/most.jpg', path: '/products/most-popular' },
    { title: 'Flash Sale', desc: 'Hurry! Limited time offers', tag: 'Grab Now →', bg: 'linear-gradient(120deg, #b71c1c, #e53935)', img: '/image/sale/flash.jpg', path: '/products/flash-sale' },
  ]

  const categories = [
    { name: "Men's Fashion", count: 1240, path: 'men', imgs: ['/image/men/jeans/p5.jpg', '/image/men/t-shirt/t10.jpg'] },
    { name: "Women's Fashion", count: 2340, path: 'women', imgs: ['/image/women/dress/d1.jpg', '/image/women/top/d2.jpg'] },
    { name: 'Footwear', count: 980, path: 'footwear', imgs: ['/image/footwear/men/sports shoes/d6.jpg', '/image/footwear/women/heels/d1.jpg'] },
    { name: 'Accessories', count: 760, path: 'accessories', imgs: ['/image/accessories/men/belt/d1.jpg', '/image/accessories/men/watch/d3.jpg'] },
    {
      name: 'Sportswear',
      count: 540,
      path: 'men',
      imgs: [
        { src: '/image/men/sport/d5.jpg', path: '/products/men' },
        { src: '/image//women/sport/d4.jpg', path: '/products/women' }
      ]
    },
    {
      name: 'Ethnic Wear',
      count: 890,
      path: 'women',
      imgs: [
        { src: '/image/men/ethnic/d3.jpg', path: '/products/men' },
        { src: '/image/women/ethnic/d2.jpg', path: '/products/women' }
      ]
    },
  ]

  // Fetch all product sections (dedupe across grids)
  useEffect(() => {
    fetchWishlist()
    const BASE = '/api/products'

    const genders = ['Men', 'Women', 'Footwear', 'Accessories']
    const fetchByGender = (query) =>
      Promise.all(genders.map(g => fetch(`${BASE}?gender=${encodeURIComponent(g)}&${query}`).then(r => r.json())))
        .then(results => results.flat())

    const reqs = [
      fetchByGender('tag=New&limit=12'),       // New Items
      fetchByGender('tag=Sale&limit=12'),      // Flash Sale
      fetchByGender('sort=popular&limit=12'),  // Most Popular
      fetchByGender('limit=12'),               // Just For You
      fetchByGender('tag=Sale&limit=12'),      // Deals of Day
      fetchByGender('tag=Trending&limit=12'),  // Summer Special
    ]

    Promise.all(reqs)
      .then(([newData, saleData, popularData, justData, dealsData, summerData]) => {
        const used = new Set()
        const usedImages = new Set()
        const pickUnique = (list, limit) => {
          const out = []
          for (const p of list || []) {
            if (!p || used.has(p._id)) continue
            const imgKey = (p.image || '').trim()
            if (imgKey && usedImages.has(imgKey)) continue
            used.add(p._id)
            if (imgKey) usedImages.add(imgKey)
            out.push(p)
            if (out.length >= limit) break
          }
          return out
        }

        const mixByGender = (list) => {
          const buckets = {
            Men: [],
            Women: [],
            Footwear: [],
            Accessories: []
          }
          for (const p of list || []) {
            if (!p) continue
            const g = p.gender
            if (buckets[g]) buckets[g].push(p)
            else buckets.Men.push(p)
          }
          const out = []
          const keys = ['Men', 'Women', 'Footwear', 'Accessories']
          let added = true
          while (added) {
            added = false
            for (const k of keys) {
              if (buckets[k].length > 0) {
                out.push(buckets[k].shift())
                added = true
              }
            }
          }
          return out
        }

        const allPool = [
          ...(newData || []),
          ...(saleData || []),
          ...(popularData || []),
          ...(justData || []),
          ...(dealsData || []),
          ...(summerData || []),
        ]
        const fillFromPool = (list, limit) => {
          const out = [...list]
          if (out.length >= limit) return out
          for (const p of allPool) {
            if (!p || used.has(p._id)) continue
            const imgKey = (p.image || '').trim()
            if (imgKey && usedImages.has(imgKey)) continue
            used.add(p._id)
            if (imgKey) usedImages.add(imgKey)
            out.push(p)
            if (out.length >= limit) break
          }
          return out
        }

        const newItemsPicked = pickUnique(mixByGender(newData), 8)
        const flashPicked = pickUnique(mixByGender(saleData), 6)
        const popularPicked = pickUnique(mixByGender(popularData), 8)
        const justPicked = pickUnique(mixByGender(justData), 8)
        const dealsPicked = pickUnique(mixByGender(dealsData), 8)
        const summerPicked = pickUnique(mixByGender(summerData), 8)

        setNewItems(fillFromPool(newItemsPicked, 8))
        setFlashSaleItems(fillFromPool(flashPicked, 6))
        setMostPopular(fillFromPool(popularPicked, 8))
        setJustForYou(fillFromPool(justPicked, 8))
        setDealsOfDay(fillFromPool(dealsPicked, 8))
        setSummerItems(fillFromPool(summerPicked, 8))
      })
      .catch(console.log)
  }, [])

  // Carousel auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [slides.length])

  const tagColors = {
    Hot: '#F5A623', New: '#4A90D9',
    Trending: '#E91E8C', Sale: '#FF4B4B',
    Bestseller: '#00897B', Popular: '#00897B'
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  // ✅ HomeProductCard now has the wishlist heart button from men.jsx
  const HomeProductCard = ({ p }) => (
    <div
      className="home-product-card"
      onClick={() => navigate(`/product/${p._id}`)}
      style={{ cursor: 'pointer' }}
    >
      <div className="home-product-img" style={{ position: 'relative' }}>
        <img src={p.image} alt={p.name} />
        {/* ✅ Wishlist button — exact same code as men.jsx */}
        <button
          className="wishlist-btn"
          onClick={(e) => { e.stopPropagation(); toggleWishlist(p) }}
        >
          <svg width="16" height="16"
            fill={wishlist.includes(p._id) ? '#FF4B4B' : 'none'}
            stroke={wishlist.includes(p._id) ? '#FF4B4B' : '#fff'}
            strokeWidth="2" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        {p.tag && (
          <span className="product-tag" style={{ background: tagColors[p.tag] || '#00897B' }}>
            {p.tag}
          </span>
        )}
      </div>
      <div className="home-product-name">{p.name}</div>
      <div className="home-product-price">₹{p.price.toLocaleString('en-IN')}</div>
    </div>
  )

  return (
    <div className="page">
      <Navbar active="home" />

      <div className="wrapper_home">

        {/* Topbar */}
        <div className="topbar">
          <div className="topbar-row-one">
            <div className="topbar-title">Shop</div>
            <div className="search-bar">
              <svg
                width="16" height="16" fill="none" stroke="#aaa" strokeWidth="2"
                viewBox="0 0 24 24" onClick={handleSearch}
                style={{ cursor: 'pointer', flexShrink: 0 }}
              >
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                className="search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch()
                }}
              />
              {searchQuery && (
                <svg
                  onClick={() => setSearchQuery('')}
                  width="14" height="14" fill="none" stroke="#aaa" strokeWidth="2"
                  viewBox="0 0 24 24" style={{ cursor: 'pointer', flexShrink: 0 }}
                >
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              )}
            </div>
          </div>
          <div className="cat-nav">
            {navItems.map(item => (
              <div
                key={item.label}
                className={`cat-nav-item ${hoveredNav === item.label ? 'cat-nav-item-active' : ''}`}
                onMouseEnter={() => setHoveredNav(item.label)}
                onMouseLeave={() => setHoveredNav(null)}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </div>
            ))}
            <div className="cat-nav-special-wrap">
              {specialItems.map(item => (
                <div
                  key={item.label}
                  className={`cat-nav-item cat-nav-item-special ${hoveredNav === item.label ? 'cat-nav-item-active' : ''}`}
                  onMouseEnter={() => setHoveredNav(item.label)}
                  onMouseLeave={() => setHoveredNav(null)}
                  onClick={() => navigate(item.path)}
                >
                  {item.label} {item.isNew && <span className="new-badge">NEW</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="home-carousel">
          <div
            className="home-carousel-track"
            style={{
              width: `${slides.length * 100}%`,
              transform: `translateX(-${currentSlide * (100 / slides.length)}%)`,
            }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className="home-slide"
                style={{ width: `${100 / slides.length}%`, background: slide.bg }}
              >
                <div className="slide-text">
                  <div className="slide-title">{slide.title}</div>
                  <div className="slide-desc">{slide.desc}</div>
                  <div
                    className="slide-tag"
                    onClick={() => navigate(slide.path)}
                    style={{ cursor: 'pointer' }}
                  >
                    {slide.tag}
                  </div>
                </div>
                <div className="slide-img">
                  <img src={slide.img} alt={slide.title} />
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-btn" style={{ left: '12px' }}
            onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}>
            <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button className="carousel-btn" style={{ right: '12px' }}
            onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}>
            <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
          </button>
          <div className="carousel-dots">
            {slides.map((_, i) => (
              <div key={i} onClick={() => setCurrentSlide(i)}
                className={`carousel-dot ${i === currentSlide ? 'carousel-dot-active' : ''}`}
                style={{ width: i === currentSlide ? '22px' : '8px' }}
              />
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <span className="see-all" onClick={() => navigate('/categories')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="home-cat-grid">
          {categories.map(cat => (
            <div key={cat.name} className="home-cat-card" onClick={() => navigate(`/products/${cat.path}`)}>
              <div className="home-cat-img-wrap">
                {cat.imgs.map((img, i) => (
                  <div
                    key={i}
                    className="home-cat-img"
                    onClick={(e) => {
                      if (typeof img === 'object' && img.path) {
                        e.stopPropagation()
                        navigate(img.path)
                      }
                    }}
                    style={{ cursor: typeof img === 'object' && img.path ? 'pointer' : 'default' }}
                  >
                    <img src={typeof img === 'object' ? img.src : img} alt={cat.name} />
                  </div>
                ))}
              </div>
              <div className="home-cat-label">
                {cat.name} <span className="home-cat-count">{cat.count} items</span>
              </div>
            </div>
          ))}
        </div>

        <div className="divider" />

        {/* New Items */}
        <div className="section-header">
          <h2 className="section-title">New Items ✨</h2>
          <span className="see-all" onClick={() => navigate('/products/new')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="product-grid">
          {newItems.map(p => <HomeProductCard key={p._id} p={p} />)}
        </div>

        <div className="divider" />

        {/* Flash Sale */}
        <div className="flash-header">
          <h2 className="section-title">⚡ Flash Sale</h2>
          <div className="countdown">
            <svg width="16" height="16" fill="none" stroke="#555" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
            </svg>
            02:45:30
          </div>
          <span className="see-all" onClick={() => navigate('/products/flash-sale')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="flash-grid">
          {flashSaleItems.map(p => (
            <div
              key={p._id}
              className="flash-card"
              onClick={() => navigate(`/product/${p._id}`)}
              style={{ cursor: 'pointer' }}
            >
              <img src={p.image} alt={p.name} />
              <span className="flash-badge">
                {p.originalPrice > 0
                  ? `-${Math.round((p.originalPrice - p.price) / p.originalPrice * 100)}%`
                  : 'Sale'}
              </span>
            </div>
          ))}
        </div>

        <div className="divider" />

        {/* Most Popular */}
        <div className="section-header">
          <h2 className="section-title">Most Popular ⭐</h2>
          <span className="see-all" onClick={() => navigate('/products/most-popular')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="popular-grid">
          {mostPopular.map(p => (
            <div
              key={p._id}
              className="popular-card"
              onClick={() => navigate(`/product/${p._id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="popular-img" style={{ position: 'relative' }}>
                <img src={p.image} alt={p.name} />
                <button
                  className="wishlist-btn"
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(p) }}
                >
                  <svg width="16" height="16"
                    fill={wishlist.includes(p._id) ? '#FF4B4B' : 'none'}
                    stroke={wishlist.includes(p._id) ? '#FF4B4B' : '#fff'}
                    strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
              </div>
              <div className="popular-meta">
                <span className="popular-likes">★ {p.rating}</span>
                <span className="popular-tag" style={{ background: tagColors[p.tag] || '#00897B' }}>
                  {p.tag}
                </span>
              </div>
              <div className="home-product-name">{p.name}</div>
            </div>
          ))}
        </div>

        <div className="divider" />

        {/* Just For You */}
        <div className="section-header">
          <h2 className="section-title">Just For You ★</h2>
          <span className="see-all" onClick={() => navigate('/products/just-for-you')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="product-grid">
          {justForYou.map(p => <HomeProductCard key={p._id} p={p} />)}
        </div>

        <div className="divider" />

        {/* Deals of the Day */}
        <div className="section-header">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2 className="section-title">Deals of the Day</h2>
            <span className="deal-timer">⏰ Ends in 01:30:00</span>
          </div>
          <span className="see-all" onClick={() => navigate('/products/deals')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="product-grid">
          {dealsOfDay.map(p => (
            <div
              key={p._id}
              className="home-product-card"
              onClick={() => navigate(`/product/${p._id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="home-product-img" style={{ position: 'relative' }}>
                <img src={p.image} alt={p.name} />
                {/* ✅ Wishlist button on deals cards too */}
                <button
                  className="wishlist-btn"
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(p) }}
                >
                  <svg width="16" height="16"
                    fill={wishlist.includes(p._id) ? '#FF4B4B' : 'none'}
                    stroke={wishlist.includes(p._id) ? '#FF4B4B' : '#fff'}
                    strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
                {p.originalPrice > 0 && (
                  <span className="product-tag" style={{ background: '#FF4B4B' }}>
                    -{Math.round((p.originalPrice - p.price) / p.originalPrice * 100)}%
                  </span>
                )}
              </div>
              <div className="home-product-name">{p.name}</div>
              <div style={{ padding: '0 10px 10px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span className="home-product-price" style={{ padding: 0 }}>
                  ₹{p.price.toLocaleString('en-IN')}
                </span>
                {p.originalPrice > 0 && (
                  <span className="original-price">
                    ₹{p.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="divider" />

        {/* Summer Special */}
        <div className="summer-banner">
          <div className="summer-banner-text">
            <div className="summer-banner-sub">☀️ Limited Time</div>
            <div className="summer-banner-title">Summer Special</div>
            <div className="summer-banner-desc">Handpicked styles for the season</div>
            <button className="summer-btn" onClick={() => navigate('/products/summer-special')}>
              Shop Now →
            </button>
          </div>
          <div className="summer-banner-img">
            <img src="/image/sale/summer.jpg" alt="summer" />
          </div>
        </div>
        <div className="product-grid">
          {summerItems.map(p => <HomeProductCard key={p._id} p={p} />)}
        </div>

      </div>

      <footer className="footer">
        ® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.
      </footer>
    </div>
  )
}

