import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function FootwearWomen() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
  const [brandSlide, setBrandSlide] = useState(0)

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  const categories = [
    { name: 'Heels', count: 267, img: '/image/footwear/women/heels/d1.jpg' },
    { name: 'Flats', count: 198, img: '/image/footwear/women/flats/d1.jpg' },
    { name: 'Sandals', count: 312, img: '/image/footwear/women/sandals/d2.jpg' },
    { name: 'Sneakers', count: 189, img: '/image/footwear/women/sneakers/d1.jpg' },
    { name: 'Boots', count: 134, img: '/image/footwear/women/boots/d1.jpg' },
    { name: 'Wedges', count: 156, img: '/image/footwear/women/wedges/d1.jpg' },
    { name: 'Mules', count: 98, img: '/image/footwear/women/mules/d1.jpg' },
    { name: 'Kolhapuri', count: 112, img: '/image/footwear/women/kolhapuri/d1.jpg' },
    { name: 'Slip-ons', count: 87, img: '/image/footwear/women/slip-ons/d1.jpg' },
    { name: 'Juttis', count: 143, img: '/image/footwear/women/juttis/d2.jpg' },
    { name: 'Flip Flops', count: 234, img: '/image/footwear/women/flip-flops/d1.jpg' },
    { name: 'Sports Shoes', count: 178, img: '/image/footwear/women/sports shoes/d1.jpg' },
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
      'Skechers': '/brand/skechers-footwear-women',
      'Aldo': '/brand/aldo-footwear-women',
      'Inc.5': '/brand/inc5-footwear-women',
      'Adidas': '/brand/adidas-footwear-women',
      'Rocia': '/brand/rocia-footwear-women',
      'New Balance': '/brand/newbalance-footwear-women',
      'Clarks': '/brand/clarks-footwear-women',
      'Hush Puppies': '/brand/hushpuppies-footwear-women',
      'Puma': '/brand/puma-footwear-women',
      'Nike': '/brand/nike-footwear-women',
    }
    return map[name] || `/brand/${name.toLowerCase().replace(/[^a-z0-9]/g, '')}-footwear-women`
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setBrandSlide(prev => (prev + 1) % brandSales.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [brandSales.length])

  const budgetDeals = [
    { id: 101, name: 'Block Heel Sandals', price: '₹499', originalPrice: '₹999', rating: 4.1, img: '/image/footwear/women/sandals/d3.jpg' },
    { id: 102, name: 'Ballet Flats', price: '₹399', originalPrice: '₹799', rating: 4.0, img: '/image/footwear/women/flats/d2.jpg' },
    { id: 103, name: 'Kolhapuri Flats', price: '₹349', originalPrice: '₹699', rating: 4.2, img: '/image/footwear/women/kolhapuri/d2.jpg' },
    { id: 104, name: 'Canvas Sneakers', price: '₹549', originalPrice: '₹1,099', rating: 4.1, img: '/image/footwear/women/sneakers/d2.jpg' },
    { id: 105, name: 'Slip-on Mules', price: '₹449', originalPrice: '₹899', rating: 4.3, img: '/image/footwear/women/mules/d2.jpg' },
    { id: 106, name: 'Ethnic Juttis', price: '₹299', originalPrice: '₹599', rating: 4.2, img: '/image/footwear/women/juttis/d3.jpg' },
    { id: 107, name: 'Casual Flip Flops', price: '₹199', originalPrice: '₹399', rating: 4.0, img: '/image/footwear/women/flip-flops/d2.jpg' },
    { id: 108, name: 'Wedge Sandals', price: '₹599', originalPrice: '₹1,199', rating: 4.4, img: '/image/footwear/women/sandals/d4.jpg' },
  ]

  const newArrivals = [
    { id: 1, name: 'Platform Heels', price: '₹1,799', rating: 4.5, img: '/image/footwear/women/heels/d4.jpg' },
    { id: 2, name: 'Strappy Sandals', price: '₹999', rating: 4.3, img: '/image/footwear/women/sandals/d5.jpg' },
    { id: 3, name: 'Knee High Boots', price: '₹3,299', rating: 4.7, img: '/image/footwear/women/boots/d2.jpg' },
    { id: 4, name: 'Espadrille Wedges', price: '₹1,299', rating: 4.4, img: '/image/footwear/women/wedges/d2.jpg' },
    { id: 5, name: 'Chelsea Boots', price: '₹2,499', rating: 4.6, img: '/image/footwear/women/boots/d3.jpg' },
    { id: 6, name: 'Gladiator Sandals', price: '₹899', rating: 4.2, img: '/image/footwear/women/sandals/d6.jpg' },
    { id: 7, name: 'Kitten Heel Pumps', price: '₹1,599', rating: 4.5, img: '/image/footwear/women/heels/d5.jpg' },
    { id: 8, name: 'Pointed Toe Flats', price: '₹1,099', rating: 4.3, img: '/image/footwear/women/flats/d3.jpg' },
  ]

  const trending = [
    { id: 9, name: 'Square Toe Mules', price: '₹1,299', rating: 4.5, tag: 'Trending', img: '/image/footwear/women/mules/d3.jpg' },
    { id: 10, name: 'Embellished Sandals', price: '₹1,499', rating: 4.4, tag: 'Hot', img: '/image/footwear/women/sandals/d7.jpg' },
    { id: 11, name: 'Ankle Strap Heels', price: '₹1,799', rating: 4.6, tag: 'New', img: '/image/footwear/women/heels/d6.jpg' },
    { id: 12, name: 'Pearl Embroidered Flats', price: '₹1,199', rating: 4.7, tag: 'Popular', img: '/image/footwear/women/flats/d4.jpg' },
    { id: 13, name: 'Chunky Sneakers', price: '₹2,199', rating: 4.3, tag: 'Trending', img: '/image/footwear/women/sneakers/d3.jpg' },
    { id: 14, name: 'Metallic Block Heels', price: '₹1,599', rating: 4.2, tag: 'Hot', img: '/image/footwear/women/heels/d7.jpg' },
    { id: 15, name: 'Tassel Loafers', price: '₹1,399', rating: 4.5, tag: 'New', img: '/image/footwear/women/juttis/d4.jpg' },
    { id: 16, name: 'Bow Flats', price: '₹899', rating: 4.1, tag: 'Popular', img: '/image/footwear/women/flats/d5.jpg' },
  ]

  const forYou = [
    { id: 17, name: 'Party Heels', price: '₹1,999', img: '/image/footwear/women/heels/d8.jpg' },
    { id: 18, name: 'Summer Sandals', price: '₹799', img: '/image/footwear/women/sandals/d8.jpg' },
    { id: 19, name: 'Office Pumps', price: '₹1,599', img: '/image/footwear/women/juttis/d5.jpg' },
    { id: 20, name: 'Festive Juttis', price: '₹999', img: '/image/footwear/women/juttis/d6.jpg' },
    { id: 21, name: 'Gym Shoes', price: '₹1,499', img: '/image/footwear/women/sports shoes/d2.jpg' },
    { id: 22, name: 'Casual Sneakers', price: '₹1,299', img: '/image/footwear/women/sneakers/d4.jpg' },
    { id: 23, name: 'Weekend Sliders', price: '₹499', img: '/image/footwear/women/flats/d6.jpg' },
    { id: 24, name: 'Winter Boots', price: '₹2,799', img: '/image/footwear/women/boots/d4.jpg' },
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
          <span className="product-price product-price-pink">{product.price}</span>
          {product.rating && <span className="product-rating">★ {product.rating}</span>}
        </div>
        <button className="add-to-cart-btn add-to-cart-btn-pink">Add to Cart</button>
      </div>
    </div>
  )

  return (
    <div className="page">
      <Navbar active="" />

      <div className="wrapper_wearwomen">

        {/* Header */}
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <h1 className="page-title">Women's Footwear</h1>
        </div>

        {/* Sale Banner */}
        <div className="sale-banner sale-banner-pink">
          <div className="sale-banner-text">
            <div className="sale-banner-tag">Limited Time</div>
            <h2 className="sale-banner-title">Grand Summer Sale</h2>
            <p className="sale-banner-desc">Up to 60% off on top styles</p>
            <button className="shop-now-btn shop-now-pink">Shop Now</button>
          </div>
          <div className="sale-banner-img">
            <img src="/image/footwear/banner/her_sell.jpg" alt="sale" />
          </div>
        </div>

        {/* Categories */}
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <span className="see-all" onClick={() => navigate('/common/footwear?gender=Women')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="cat-grid">
          {categories.map(cat => (
            <div
              key={cat.name}
              className="cat-card"
              onClick={() => navigate(`/common/footwear?gender=Women&category=${encodeURIComponent(cat.name)}`)}
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
          <span className="see-all see-all-pink">See All <span className="see-all-arrow see-all-arrow-pink">→</span></span>
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
                className={`brand-dot ${i === brandSlide ? 'brand-dot-active brand-dot-active-pink' : ''}`}
                style={{ width: i === brandSlide ? '22px' : '8px' }}
              />
            ))}
          </div>
        </div>

        <div className="divider" />

        {/* Budget Friendly Deals */}
        <div className="section-header">
          <h2 className="section-title">Budget Friendly Deals 💰</h2>
          <span className="see-all see-all-pink" onClick={() => navigate('/products/budget-deals?category=Footwear')}>
            See All <span className="see-all-arrow see-all-arrow-pink">→</span>
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
                    <span className="product-price product-price-pink">{p.price}</span>
                    <span className="original-price"> {p.originalPrice}</span>
                  </div>
                  <span className="product-rating">★ {p.rating}</span>
                </div>
                <button className="add-to-cart-btn add-to-cart-btn-pink">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>

        <div className="divider" />

        {/* New Arrivals */}
        <div className="section-header">
          <h2 className="section-title">New Arrivals</h2>
          <span className="see-all see-all-pink" onClick={() => navigate('/products/new?category=Footwear')}>
            See All <span className="see-all-arrow see-all-arrow-pink">→</span>
          </span>
        </div>
        <div className="product-grid">
          {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        <div className="divider" />

        {/* Trending */}
        <div className="section-header">
          <h2 className="section-title">Trending Now 🔥</h2>
          <span className="see-all see-all-pink" onClick={() => navigate('/products/trending?category=Footwear')}>
            See All <span className="see-all-arrow see-all-arrow-pink">→</span>
          </span>
        </div>
        <div className="product-grid">
          {trending.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        <div className="divider" />

        {/* Just For You */}
        <div className="section-header">
          <h2 className="section-title">Just For You ★</h2>
          <span className="see-all see-all-pink" onClick={() => navigate('/products/just-for-you?category=Footwear')}>
            See All <span className="see-all-arrow see-all-arrow-pink">→</span>
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