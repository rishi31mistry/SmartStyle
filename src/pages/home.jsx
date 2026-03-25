import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'
import '../styles/home.css'

export default function Home() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hoveredNav, setHoveredNav] = useState(null)

  const navItems = [
    { label: 'Men', path: '/products/men' },
    { label: 'Women', path: '/products/women' },
    { label: 'Footwear', path: '/products/footwear' },
    { label: 'Accessories', path: '/products/accessories' },
  ]

  const specialItems = [
    { label: 'Custom Outfit', isNew: true },
    { label: 'Moody Outfits', isNew: true },
  ]

  const slides = [
    { title: 'Summer Sale', desc: 'Up to 60% off on all categories', tag: 'Shop Now →', bg: 'linear-gradient(120deg, #1565C0, #42a5f5)' , img: '/image/sale/summer2.jpg' },
    { title: 'New Arrivals', desc: 'Fresh styles just dropped', tag: 'Explore Now →', bg: 'linear-gradient(120deg, #E91E8C, #f472b6)' , img: '/image/sale/arrival.jpg'},
    { title: 'Top Brands', desc: 'Nike, Adidas, Zara & more', tag: 'View All →', bg: 'linear-gradient(120deg, #6a1b9a, #9c27b0)', img: '/image/sale/top.jpg' },
    { title: 'Festive Picks', desc: 'Look your best this season', tag: 'Shop Now →', bg: 'linear-gradient(120deg, #e65100, #f57c00)', img: '/image/sale/festival.jpg' },
    { title: 'Flash Sale', desc: 'Hurry! Limited time offers', tag: 'Grab Now →', bg: 'linear-gradient(120deg, #b71c1c, #e53935)', img: '/image/sale/flash.jpg' },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [slides.length])

  const categories = [
    { name: "Men's Fashion", count: 1240, path: 'men', imgs: ['/image/men/jeans/p5.jpg', '/image/men/t-shirt/t10.jpg'] },
    { name: "Women's Fashion", count: 2340, path: 'women', imgs: ['/image/women/dress/d1.jpg', '/image/women/top/d2.jpg' ] },
    { name: 'Footwear', count: 980, path: 'footwear', imgs: ['/image/footwear/men/sports shoes/d6.jpg', '/image/footwear/women/heels/d1.jpg' ] },
    { name: 'Accessories', count: 760, path: 'accessories', imgs: ['/image/accessories/men/belt/d1.jpg', '/image/accessories/men/watch/d3.jpg',] },
    { name: 'Sportswear', count: 540, path: 'men', imgs: ['/image/men/sport/d5.jpg', '/image//women/sport/d4.jpg'] },
    { name: 'Ethnic Wear', count: 890, path: 'women', imgs: ['/image/men/ethnic/d3.jpg', '/image/women/ethnic/d2.jpg'] },
  ]

  const newItems = [
    { id: 1, name: 'Oversized Hoodie', price: '₹1,299', img:'/image/men/oversized/d1.jpg' },
    { id: 2, name: 'Floral Midi Dress', price: '₹1,499',img:'/image/women/dress/d1.jpg' },
    { id: 3, name: 'Chunky Sneakers', price: '₹2,199' ,img:'/image/footwear/men/sneakers/d1.jpg'},
    { id: 4, name: 'Leather Tote Bag', price: '₹1,799',img:'/image/accessories/women/bags/d1.jpg' },
    { id: 5, name: 'Linen Co-ord Set', price: '₹1,899',img:'/image/men/full/d1.jpg' },
    { id: 6, name: 'Retro Sunglasses', price: '₹899',img:'/image/accessories/women/sunglasses/d1.jpg' },
    { id: 7, name: 'Cargo Pants', price: '₹1,499' ,img:'/image/men/trouser/d1.jpg'},
    { id: 8, name: 'Silk Scarf', price: '₹699',img:'/image/accessories/women/scarf/d1.jpg' },
  ]

  const flashSale = [
    { id: 1, discount: '70%',img:'/image/sale/s1.jpg'},
    { id: 2, discount: '65%',img:'/image/sale/s2.jpg' },
    { id: 3, discount: '60%',img:'/image/sale/s3.jpg' },
    { id: 4, discount: '55%',img:'/image/sale/s4.jpg' },
    { id: 5, discount: '50%',img:'/image/sale/s5.jpg' },
    { id: 6, discount: '45%',img:'/image/sale/s6.jpg' },
  ]

  const mostPopular = [
    { id: 1, name: 'Classic White Tee', likes: '2.4k', tag: 'Hot', tagColor: '#F5A623',img:'/image/men/t-shirt/t2.jpg' },
    { id: 2, name: 'Boho Maxi Dress', likes: '1.8k', tag: 'Trending', tagColor: '#E91E8C',img:'/image/women/dress/d3.jpg' },
    { id: 3, name: 'Air Max Sneakers', likes: '3.1k', tag: 'Popular', tagColor: '#00897B',img:'/image/footwear/men/sneakers/d2.jpg' },
    { id: 4, name: 'Denim Jacket', likes: '2.2k', tag: 'New', tagColor: '#4A90D9',img:'/image/women/jacket/d1.jpg' },
  ]

  const justForYou = [
    { id: 1, name: 'Summer Kurta', price: '₹899',img:'/image/women/kurta/d2.jpg' },
    { id: 2, name: 'Wrap Dress', price: '₹1,299' ,img:'/image/women/dress/d5.jpg' },
    { id: 3, name: 'Slim Fit Chinos', price: '₹1,199' ,img:'/image/men/jeans/p3.jpg'},
    { id: 4, name: 'Block Heel Sandals', price: '₹999',img:'/image/footwear/women/heels/d2.jpg' },
    { id: 5, name: 'Printed Shirt', price: '₹799',img:'/image/men/shirt/s2.jpg' },
    { id: 6, name: 'Co-ord Set', price: '₹1,699',img:'/image/men/full/d2.jpg'  },
    { id: 7, name: 'Canvas Sneakers', price: '₹1,499',img:'/image/footwear/men/sneakers/d3.jpg' },
    { id: 8, name: 'Crossbody Bag', price: '₹1,299' ,img:'/image/accessories/women/bags/d2.jpg' },
  ]

  const dealsOfDay = [
    { id: 1, name: 'Formal Blazer', price: '₹1,999', originalPrice: '₹3,999', discount: '50%',img:'/image/men/suit/d1.jpg' },
    { id: 2, name: 'Silk Saree', price: '₹2,499', originalPrice: '₹4,999', discount: '50%',img:'/image/women/saree/d1.jpg'  },
    { id: 3, name: 'Running Shoes', price: '₹1,499', originalPrice: '₹2,999', discount: '50%',img:'/image/footwear/men/sneakers/d4.jpg' },
    { id: 4, name: 'Leather Watch', price: '₹1,999', originalPrice: '₹3,999', discount: '50%',img:'/image/accessories/men/watch/d3.jpg' },
  ]

  const summerItems = [
    { id: 1, name: 'Linen Shirt', price: '₹999',img:'/image/men/shirt/s3.jpg'  },
    { id: 2, name: 'Floral Dress', price: '₹1,299',img:'/image/women/dress/d6.jpg' },
    { id: 3, name: 'Shorts', price: '₹699',img:'/image/men/short/d1.jpg' },
    { id: 4, name: 'Straw Hat', price: '₹499' ,img:'/image/accessories/men/hat/d1.jpg' },
    { id: 5, name: 'Sandals', price: '₹799' ,img:'/image/footwear/women/sandals/d1.jpg' },
    { id: 6,name: 'Slip Dress', price: '₹1,199',img:'/image/women/dress/d7.jpg'},
    { id: 7, name: 'Ladies Hat', price: '₹1,099' ,img:'/image/accessories/women/hat/d1.jpg' },
    { id: 8, name: 'Sunglasses', price: '₹899',img:'/image/accessories/men/sunglasses/d1.jpg' },
  ]

  return (
    <div className="page">
      <Navbar active="home" />

      <div className="wrapper_home">

        {/* Topbar */}
        <div className="topbar">
        <div className="topbar-row-one">
            <div className="topbar-title">Shop</div>
            <div className="search-bar">
            <svg width="16" height="16" fill="none" stroke="#aaa" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input className="search-input" placeholder="Search..." />
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
                style={{
                  width: `${100 / slides.length}%`,
                  background: slide.bg,
                }}
              >
                <div className="slide-text">
                  <div className="slide-title">{slide.title}</div>
                  <div className="slide-desc">{slide.desc}</div>
                  <div className="slide-tag">{slide.tag}</div>
                </div>
                <div className="slide-img">
                  <img src={slide.img} alt={slide.title} />
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-btn"
            style={{ left: '12px' }}
            onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}
          >
            <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button
            className="carousel-btn"
            style={{ right: '12px' }}
            onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
          >
            <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
          </button>

          <div className="carousel-dots">
            {slides.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrentSlide(i)}
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
                  <div key={i} className="home-cat-img">
                    <img src={img} alt={cat.name} />
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
          {newItems.map(p => (
            <div key={p.id} className="home-product-card">
              <div className="home-product-img">
                <img src={p.img} alt={p.name} />
              </div>
              <div className="home-product-name">{p.name}</div>
              <div className="home-product-price">{p.price}</div>
            </div>
          ))}
        </div>

        <div className="divider" />

        {/* Flash Sale */}
        <div className="flash-header">
          <h2 className="section-title">⚡ Flash Sale</h2>
          <div className="countdown">
            <svg width="16" height="16" fill="none" stroke="#555" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            02:45:30
          </div>
          <span className="see-all" onClick={() => navigate('/products/flash-sale')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="flash-grid">
          {flashSale.map(p => (
            <div key={p.id} className="flash-card">
             <img src={p.img} alt="flash" />
              <span className="flash-badge">-{p.discount}</span>
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
            <div key={p.id} className="popular-card">
              <div className="popular-img">
                <img src={p.img} alt={p.name} />
              </div>
              <div className="popular-meta">
                <span className="popular-likes">♥ {p.likes}</span>
                <span className="popular-tag" style={{ background: p.tagColor }}>{p.tag}</span>
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
          {justForYou.map(p => (
            <div key={p.id} className="home-product-card">
              <div className="home-product-img">
                <img src={p.img} alt={p.name} />
              </div>
              <div className="home-product-name">{p.name}</div>
              <div className="home-product-price">{p.price}</div>
            </div>
          ))}
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
            <div key={p.id} className="home-product-card">
              <div className="home-product-img" style={{ position: 'relative' }}>
                <img src={p.img} alt={p.name} />
                <span className="product-tag" style={{ background: '#FF4B4B' }}>-{p.discount}</span>
              </div>
              <div className="home-product-name">{p.name}</div>
              <div style={{ padding: '0 10px 10px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span className="home-product-price" style={{ padding: 0 }}>{p.price}</span>
                <span className="original-price">{p.originalPrice}</span>
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
          {summerItems.map(p => (
            <div key={p.id} className="home-product-card">
              <div className="home-product-img">
                <img src={p.img} alt={p.name} />
              </div>
              <div className="home-product-name">{p.name}</div>
              <div className="home-product-price">{p.price}</div>
            </div>
          ))}
        </div>

      </div>

      <footer className="footer">
        ® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.
      </footer>
    </div>
  )
}