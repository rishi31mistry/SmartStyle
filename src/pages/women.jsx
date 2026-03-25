import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function Women() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
  const [brandSlide, setBrandSlide] = useState(0)

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  const categories = [
    { name: 'Kurtas', count: 312, img: '/image/women/kurta/d1.jpg' },
    { name: 'Dresses', count: 245, img: '/image/women/dress/d1.jpg' },
    { name: 'Sarees', count: 189, img: '/image/women/saree/d1.jpg' },
    { name: 'Tops', count: 421, img: '/image/women/top/d1.jpg' },
    { name: 'Jeans', count: 156, img: '/image/women/jeans/d1.jpg' },
    { name: 'Plazzo', count: 98, img: '/image/women/plazzo/d1.jpg' },
    { name: 'Lehengas', count: 134, img: '/image/women/lehenga/d1.jpg' },
    { name: 'Jackets', count: 76, img: '/image/women/jacket/d1.jpg' },
    { name: 'Skirts', count: 112, img: '/image/women/skirt/d1.jpg' },
    { name: 'Ethnic Wear', count: 267, img: '/image/women/ethnic/d1.jpg' },
    { name: 'Sportswear', count: 143, img: '/image/women/sport/d1.jpg' },
    { name: 'Accessories', count: 389, img: '/image//accessories/women/bracelet/d2.jpg' },
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
      'Zara': '/women/zara',
      'H&M': '/women/hm',
      'Aurelia': '/women/aurelia',
      'Libas': '/women/libas',
      'Nykaa Fashion': '/women/nykaa',
      'Biba': '/women/biba',
      'Vero Moda': '/women/veromoda',
      'Shein': '/women/shein',
      'Fabindia': '/women/fabindia',
      'Only': '/women/only',
    }
    return map[name] || null
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setBrandSlide(prev => (prev + 1) % brandSales.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [brandSales.length])

  const budgetDeals = [
    { id: 101, name: 'Printed Kurta', price: '₹299', originalPrice: '₹599', rating: 4.1, img: '/image/women/kurta/d3.jpg' },
    { id: 102, name: 'Casual Top', price: '₹399', originalPrice: '₹799', rating: 4.0, img: '/image/women/top/d2.jpg' },
    { id: 103, name: 'Flared Palazzo', price: '₹449', originalPrice: '₹899', rating: 4.2, img: '/image/women/plazzo/d2.jpg' },
    { id: 104, name: 'Floral Dress', price: '₹349', originalPrice: '₹699', rating: 4.1, img: '/image/women/dress/d2.jpg' },
    { id: 105, name: 'Cotton Jeans', price: '₹199', originalPrice: '₹399', rating: 4.3, img: '/image/women/jeans/d2.jpg' },
    { id: 106, name: 'Linen Kurti', price: '₹499', originalPrice: '₹999', rating: 4.2, img: '/image/women/kurta/d4.jpg' },
    { id: 107, name: 'Rayon Skirt', price: '₹379', originalPrice: '₹749', rating: 4.0, img: '/image/women/skirt/d2.jpg' },
    { id: 108, name: 'Denim Jacket', price: '₹249', originalPrice: '₹499', rating: 4.4, img: '/image/women/jacket/d3.jpg' },
  ]

  const newArrivals = [
    { id: 1, name: 'Floral Midi Dress', price: '₹1,499', rating: 4.6, img: '/image/women/dress/d3.jpg' },
    { id: 2, name: 'Black Jeans', price: '₹1,899', rating: 4.5, img: '/image/women/jeans/d3.jpg' },
    { id: 3, name: 'Boho Kurta Set', price: '₹1,299', rating: 4.3, img: '/image/women/kurta/d5.jpg' },
    { id: 4, name: 'Wrap Maxi Dress', price: '₹1,799', rating: 4.7, img: '/image/women/dress/d8.jpg' },
    { id: 5, name: 'Crop Top & Palazzo', price: '₹1,099', rating: 4.2, img: '/image/women/plazzo/d3.jpg' },
    { id: 6, name: 'Anarkali Suit', price: '₹2,199', rating: 4.8, img: '/image/women/suit/d1.jpg' },
    { id: 7, name: 'Denim Skirt', price: '₹899', rating: 4.1, img: '/image/women/skirt/d3.jpg' },
    { id: 8, name: 'Satin Slip Dress', price: '₹1,699', rating: 4.4, img: '/image/women/dress/d5.jpg' },
  ]

  const trending = [
    { id: 9, name: 'Oversized Blazer', price: '₹1,999', rating: 4.5, tag: 'Trending', img: '/image/women/suit/d2.jpg' },
    { id: 10, name: 'Wide Leg Pants', price: '₹1,299', rating: 4.4, tag: 'Hot', img: '/image/women/jeans/d4.jpg' },
    { id: 11, name: 'Puff Sleeve Dress', price: '₹1,799', rating: 4.6, tag: 'New', img: '/image/women/dress/d6.jpg' },
    { id: 12, name: 'Embroidered Kurta', price: '₹1,599', rating: 4.7, tag: 'Popular', img: '/image/women/kurta/d6.jpg' },
    { id: 13, name: 'Linen Shirt Dress', price: '₹1,399', rating: 4.3, tag: 'Trending', img: '/image/women/dress/d9.jpg' },
    { id: 14, name: 'Ruffle Midi Skirt', price: '₹999', rating: 4.2, tag: 'Hot', img: '/image/women/skirt/d4.jpg' },
    { id: 15, name: 'Silk Saree', price: '₹3,499', rating: 4.8, tag: 'New', img: '/image/women/saree/d3.jpg' },
    { id: 16, name: 'Tie-dye Jumpsuit', price: '₹1,199', rating: 4.1, tag: 'Popular', img: '/image/women/suit/d3.jpg' },
  ]

  const forYou = [
    { id: 17, name: 'Party Wear Lehenga', price: '₹4,999', img: '/image/women/lehenga/d2.jpg' },
    { id: 18, name: 'Summer Sundress', price: '₹1,299', img: '/image/women/dress/d10.jpg' },
    { id: 19, name: 'Office Blazer Set', price: '₹2,799', img: '/image/women/suit/d4.jpg' },
    { id: 20, name: 'Festive Saree', price: '₹2,499', img: '/image/women/saree/d4.jpg' },
    { id: 21, name: 'Yoga Set', price: '₹999', img: '/image/women/sport/d3.jpg' },
    { id: 22, name: 'Formal Trousers', price: '₹1,499', img: '/image/women/jeans/d5.jpg' },
    { id: 23, name: 'Casual Denim Dress', price: '₹1,199', img: '/image/women/dress/d12.jpg' },
    { id: 24, name: 'Winter Shrug', price: '₹1,799', img: '/image/women/top/d3.jpg' },
  ]

  const tagColor = (tag) => {
    if (tag === 'Hot') return '#F5A623'
    if (tag === 'New') return '#4A90D9'
    if (tag === 'Trending') return '#E91E8C'
    return '#00897B'
  }

  const ProductCard = ({ product }) => (
    <div className="product-card">
      <div className="product-img-wrap" style={{ height: '420px' }}>
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
            <button className="shop-now-btn shop-now-pink">Shop Now</button>
          </div>
          <div className="sale-banner-img">
            <img src='/image/sale/women.jpg' alt="sale" />
          </div>
        </div>

        {/* Categories — clickable with preselection */}
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <span className="see-all see-all-pink" onClick={() => navigate('/common/women')}>
            See All <span className="see-all-arrow see-all-arrow-pink">→</span>
          </span>
        </div>
        <div className="cat-grid">
          {categories.map(cat => (
            <div
              key={cat.name}
              className="cat-card"
              onClick={() => {
                if (cat.name === 'Accessories') {
                  navigate('/common/accessories?gender=Women')
                } else {
                  navigate(`/common/women?category=${encodeURIComponent(cat.name)}`)
                }
              }}
            >
              <div className="cat-img"><img src={cat.img} alt={cat.name} /></div>
              <div className="cat-name">{cat.name}</div>
              <div className="cat-count">{cat.count} items</div>
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
              }}
            >
              {brandSales.map((slide, si) => (
                <div key={si} className="brand-slide" style={{ width: `${100 / brandSales.length}%` }}>
                  {slide.map(brand => (
                    <div key={brand.name} className="brand-card"
                      onClick={() => brandRoute(brand.name) && navigate(brandRoute(brand.name))}
                      style={{ backgroundImage: `url(${brand.img})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: brandRoute(brand.name) ? 'pointer' : 'default' }}
                    >
                      <div className="brand-card-overlay" />
                      <div className="brand-name">{brand.name}</div>
                      <div className="brand-discount">{brand.discount}</div>
                      <button className="brand-btn" onClick={(e) => { e.stopPropagation(); brandRoute(brand.name) && navigate(brandRoute(brand.name)) }}>
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
                style={{ width: i === brandSlide ? '22px' : '8px' }}
              />
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
          {budgetDeals.map(p => (
            <div key={p.id} className="product-card">
              <div className="product-img-wrap" style={{ height: '420px' }}>
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

        <div className="section-header">
          <h2 className="section-title">New Arrivals</h2>
          <span className="see-all see-all-pink" onClick={() => navigate('/products/new?category=Women')}>
            See All <span className="see-all-arrow see-all-arrow-pink">→</span>
          </span>
        </div>
        <div className="product-grid">
          {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        <div className="divider" />

        <div className="section-header">
          <h2 className="section-title">Trending Now 🔥</h2>
          <span className="see-all see-all-pink" onClick={() => navigate('/products/trending?category=Women')}>
            See All <span className="see-all-arrow see-all-arrow-pink">→</span>
          </span>
        </div>
        <div className="product-grid">
          {trending.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        <div className="divider" />

        <div className="section-header">
          <h2 className="section-title">Just For You ★</h2>
          <span className="see-all see-all-pink" onClick={() => navigate('/products/just-for-you?category=Women')}>
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