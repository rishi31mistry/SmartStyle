import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function FootwearMen() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
  const [brandSlide, setBrandSlide] = useState(0)

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  const categories = [
    { name: 'Sneakers', count: 234, img: '/image/footwear/men/sneakers/d1.jpg' },
    { name: 'Sports Shoes', count: 189, img: '/image/footwear/men/sports shoes/d1.jpg' },
    { name: 'Formal Shoes', count: 156, img: '/image/footwear/men/formal shoes/d2.jpg' },
    { name: 'Loafers', count: 98, img: '/image/footwear/men/loafers/d1.jpg' },
    { name: 'Sandals', count: 134, img: '/image/footwear/men/sandals/d1.jpg' },
    { name: 'Boots', count: 87, img: '/image/footwear/men/boots/d1.jpg' },
    { name: 'Slip-ons', count: 112, img: '/image/footwear/men/slip-ons/d1.jpg' },
    { name: 'Flip Flops', count: 76, img: '/image/footwear/men/flip-flops/d1.jpg' },
    { name: 'Derby Shoes', count: 54, img: '/image/footwear/men/derby-shoes/d1.jpg' },
    { name: 'Monk Straps', count: 43, img: '/image/footwear/men/monk-straps/d1.jpg' },
    { name: 'Kolhapuri', count: 98, img: '/image/footwear/men/kolhapuri/d1.jpg' },
    { name: 'Trail Shoes', count: 121, img: '/image/footwear/men/trail-shoes/d1.jpg' },
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
      'Nike': '/brand/nike-footwear-men',
      'Adidas': '/brand/adidas-footwear-men',
      'Puma': '/brand/puma-footwear-men',
      'Woodland': '/brand/woodland-footwear-men',
      'New Balance': '/brand/newbalance-footwear-men',
      'Skechers': '/brand/skechers-footwear-men',
      'ASICS': '/brand/asics-footwear-men',
      'Under Armour': '/brand/underarmour-footwear-men',
      'Bata': '/brand/bata-footwear-men',
      'Lee Cooper': '/brand/leecooper-footwear-men',
    }
    return map[name] || `/brand/${name.toLowerCase().replace(/[^a-z0-9]/g, '')}-footwear-men`
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setBrandSlide(prev => (prev + 1) % brandSales.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [brandSales.length])

  const budgetDeals = [
    { id: 101, name: 'Canvas Sneakers', price: '₹499', originalPrice: '₹999', rating: 4.1, img: '/image/footwear/men/sneakers/d3.jpg' },
    { id: 102, name: 'Casual Loafers', price: '₹599', originalPrice: '₹1,199', rating: 4.0, img: '/image/footwear/men/loafers/d2.jpg' },
    { id: 103, name: 'Basic Flip Flops', price: '₹199', originalPrice: '₹399', rating: 4.2, img: '/image/footwear/men/flip-flops/d2.jpg' },
    { id: 104, name: 'Sports Sandals', price: '₹399', originalPrice: '₹799', rating: 4.1, img: '/image/footwear/men/sandals/d2.jpg' },
    { id: 105, name: 'Mesh Running Shoes', price: '₹799', originalPrice: '₹1,599', rating: 4.3, img: '/image/footwear/men/sports shoes/d2.jpg' },
    { id: 106, name: 'Slip-on Shoes', price: '₹549', originalPrice: '₹1,099', rating: 4.2, img: '/image/footwear/men/slip-ons/d2.jpg' },
    { id: 107, name: 'Kolhapuri Sandals', price: '₹449', originalPrice: '₹899', rating: 4.0, img: '/image/footwear/men/kolhapuri/d2.jpg' },
    { id: 108, name: 'Ethnic Juttis', price: '₹349', originalPrice: '₹699', rating: 4.4, img: '/image/footwear/men/loafers/d3.jpg' },
  ]

  const newArrivals = [
    { id: 1, name: 'Air Cushion Sneakers', price: '₹2,499', rating: 4.7, img: '/image/footwear/men/sneakers/d5.jpg' },
    { id: 2, name: 'Leather Oxford Shoes', price: '₹3,199', rating: 4.6, img: '/image/footwear/men/derby-shoes/d2.jpg' },
    { id: 3, name: 'Trail Running Shoes', price: '₹3,499', rating: 4.8, img: '/image/footwear/men/sports shoes/d3.jpg' },
    { id: 4, name: 'Chelsea Boots', price: '₹2,799', rating: 4.6, img: '/image/footwear/men/boots/d2.jpg' },
    { id: 5, name: 'Chunky Sneakers', price: '₹2,199', rating: 4.5, img: '/image/footwear/men/sneakers/d2.jpg' },
    { id: 6, name: 'Derby Shoes', price: '₹2,499', rating: 4.4, img: '/image/footwear/men/derby-shoes/d3.jpg' },
    { id: 7, name: 'Monk Strap Shoes', price: '₹2,799', rating: 4.5, img: '/image/footwear/men/loafers/d4.jpg' },
    { id: 8, name: 'Retro Sneakers', price: '₹1,899', rating: 4.3, img: '/image/footwear/men/sneakers/d6.jpg' },
  ]

  const trending = [
    { id: 9, name: 'High Top Sneakers', price: '₹2,299', rating: 4.5, tag: 'Trending', img: '/image/footwear/men/sneakers/d7.jpg' },
    { id: 10, name: 'Suede Loafers', price: '₹1,999', rating: 4.4, tag: 'Hot', img: '/image/footwear/men/loafers/d5.jpg' },
    { id: 11, name: 'Waterproof Boots', price: '₹3,299', rating: 4.6, tag: 'New', img: '/image/footwear/men/boots/d3.jpg' },
    { id: 12, name: 'Formal Derbies', price: '₹2,199', rating: 4.7, tag: 'Popular', img: '/image/footwear/men/derby-shoes/d4.jpg' },
    { id: 13, name: 'Lightweight Runners', price: '₹1,799', rating: 4.3, tag: 'Trending', img: '/image/footwear/men/sports shoes/d4.jpg' },
    { id: 14, name: 'Driving Shoes', price: '₹1,599', rating: 4.2, tag: 'Hot', img: '/image/footwear/men/loafers/d6.jpg' },
    { id: 15, name: 'Brogue Shoes', price: '₹2,599', rating: 4.5, tag: 'New', img: '/image/footwear/men/derby-shoes/d5.jpg' },
    { id: 16, name: 'Boat Shoes', price: '₹1,699', rating: 4.1, tag: 'Popular', img: '/image/footwear/men/loafers/d7.jpg' },
  ]

  const forYou = [
    { id: 17, name: 'Party Wear Shoes', price: '₹2,999', img: '/image/footwear/men/derby-shoes/d6.jpg' },
    { id: 18, name: 'Summer Sandals', price: '₹899', img: '/image/footwear/men/sandals/d3.jpg' },
    { id: 19, name: 'Office Formals', price: '₹2,499', img: '/image/footwear/men/derby-shoes/d7.jpg' },
    { id: 20, name: 'Festive Juttis', price: '₹1,299', img: '/image/footwear/men/loafers/d8.jpg' },
    { id: 21, name: 'Gym Shoes', price: '₹1,799', img: '/image/footwear/men/sports shoes/d5.jpg' },
    { id: 22, name: 'Casual Sneakers', price: '₹1,499', img: '/image/footwear/men/sneakers/d8.jpg' },
    { id: 23, name: 'Weekend Sliders', price: '₹599', img: '/image/footwear/men/flip-flops/d3.jpg' },
    { id: 24, name: 'Winter Boots', price: '₹3,199', img: '/image/footwear/men/boots/d4.jpg' },
  ]

  const tagColor = (tag) => {
    if (tag === 'Hot') return '#F5A623'
    if (tag === 'New') return '#4A90D9'
    if (tag === 'Trending') return '#E91E8C'
    return '#00897B'
  }

  const ProductCard = ({ product }) => (
    <div className="product-card">
      <div className="product-img-wrap" style={{ height: '350px' }}>
        <img src={product.img} alt={product.name} />
        <button className="wishlist-btn" onClick={() => toggleWishlist(product.id)}>
          <svg width="16" height="16" fill={wishlist.includes(product.id) ? '#FF4B4B' : 'none'} stroke={wishlist.includes(product.id) ? '#FF4B4B' : '#fff'} strokeWidth="2" viewBox="0 0 24 24">
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
          <span className="product-price">{product.price}</span>
          {product.rating && <span className="product-rating">★ {product.rating}</span>}
        </div>
        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  )

  return (
    <div className="page">
      <Navbar active="" />

      <div className="wrapper_wearmen">

        {/* Header */}
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <h1 className="page-title">Men's Footwear</h1>
        </div>

        {/* Sale Banner */}
        <div className="sale-banner sale-banner-blue">
          <div className="sale-banner-text">
            <div className="sale-banner-tag">Limited Time</div>
            <h2 className="sale-banner-title">Grand Summer Sale</h2>
            <p className="sale-banner-desc">Up to 60% off on top styles</p>
            <button className="shop-now-btn shop-now-blue">Shop Now</button>
          </div>
          <div className="sale-banner-img">
            <img src="/image/footwear/banner/him_sell.jpg" alt="sale" />
          </div>
        </div>

        {/* Categories */}
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <span className="see-all" onClick={() => navigate('/common/footwear?gender=Men')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="cat-grid">
          {categories.map(cat => (
            <div
              key={cat.name}
              className="cat-card"
              onClick={() => navigate(`/common/footwear?gender=Men&category=${encodeURIComponent(cat.name)}`)}
            >
              <div className="cat-img"><img src={cat.img} alt={cat.name} /></div>
              <div className="cat-name">{cat.name}</div>
              <div className="cat-count">{cat.count} items</div>
            </div>
          ))}
        </div>

        <div className="divider" />

        {/* Brand Carousel */}
        <div className="section-header">
          <h2 className="section-title">Shop by Your Favourite Brands</h2>
        </div>
        <div className="brand-carousel-wrap">
          <div className="brand-track-outer">
            <div
              className="brand-track"
              style={{
                width: `${brandSales.length * 100}%`,
                transform: `translateX(-${brandSlide * (100 / brandSales.length)}%)`,
              }}
            >
              {brandSales.map((slide, si) => (
                <div key={si} className="brand-slide" style={{ width: `${100 / brandSales.length}%` }}>
                  {slide.map(brand => (
                    <div
                      key={brand.name}
                      className="brand-card"
                      onClick={() => navigate(brandRoute(brand.name))}
                      style={{
                        backgroundImage: `url(${brand.img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <div className="brand-card-overlay" />
                      <div className="brand-name">{brand.name}</div>
                      <div className="brand-discount">{brand.discount}</div>
                      <button
                        className="brand-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(brandRoute(brand.name))
                        }}
                      >
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
              <div
                key={i}
                onClick={() => setBrandSlide(i)}
                className={`brand-dot ${i === brandSlide ? 'brand-dot-active' : ''}`}
                style={{ width: i === brandSlide ? '22px' : '8px' }}
              />
            ))}
          </div>
        </div>

        <div className="divider" />

        {/* Budget Friendly Deals */}
        <div className="section-header">
          <h2 className="section-title">Budget Friendly Deals 💰</h2>
          <span className="see-all" onClick={() => navigate('/products/budget-deals?category=Footwear')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="product-grid">
          {budgetDeals.map(p => (
            <div key={p.id} className="product-card">
              <div className="product-img-wrap" style={{ height: '350px' }}>
                <img src={p.img} alt={p.name} />
                <button className="wishlist-btn" onClick={() => toggleWishlist(p.id)}>
                  <svg width="16" height="16" fill={wishlist.includes(p.id) ? '#FF4B4B' : 'none'} stroke={wishlist.includes(p.id) ? '#FF4B4B' : '#fff'} strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
                <span className="product-tag" style={{ background: '#FF4B4B' }}>SALE</span>
              </div>
              <div className="product-info">
                <div className="product-name">{p.name}</div>
                <div className="product-meta">
                  <div>
                    <span className="product-price">{p.price}</span>
                    <span className="original-price"> {p.originalPrice}</span>
                  </div>
                  <span className="product-rating">★ {p.rating}</span>
                </div>
                <button className="add-to-cart-btn">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>

        <div className="divider" />

        {/* New Arrivals */}
        <div className="section-header">
          <h2 className="section-title">New Arrivals</h2>
          <span className="see-all" onClick={() => navigate('/products/new?category=Footwear')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="product-grid">
          {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        <div className="divider" />

        {/* Trending */}
        <div className="section-header">
          <h2 className="section-title">Trending Now 🔥</h2>
          <span className="see-all" onClick={() => navigate('/products/trending?category=Footwear')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="product-grid">
          {trending.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        <div className="divider" />

        {/* Just For You */}
        <div className="section-header">
          <h2 className="section-title">Just For You ★</h2>
          <span className="see-all" onClick={() => navigate('/products/just-for-you?category=Footwear')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="product-grid">
          {forYou.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

      </div>

      <footer className="footer">
        ® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.
      </footer>
    </div>
  )
}