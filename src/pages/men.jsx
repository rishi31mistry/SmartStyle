import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function Men() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
  const [brandSlide, setBrandSlide] = useState(0)

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  const categories = [
    { name: 'T-Shirts', count: 245, img: '/image/men/t-shirt/t9.jpg' },
    { name: 'Shirts', count: 189, img: '/image/men/shirt/s8.jpg' },
    { name: 'Jeans', count: 156, img: '/image/men/jeans/p4.jpg' },
    { name: 'Trousers', count: 98, img: '/image/men/trouser/d6.jpg' },
    { name: 'Kurtas', count: 134, img: '/image/men/kurta/d8.jpg' },
    { name: 'Jackets', count: 87, img: '/image/men/jacket/d6.jpg' },
    { name: 'Hoodies', count: 112, img: '/image/men/hoodies/d4.jpg' },
    { name: 'Shorts', count: 76, img: '/image/men/short/d4.jpg' },
    { name: 'Suits', count: 54, img: '/image/men/suit/d1.jpg' },
    { name: 'Ethnic Wear', count: 143, img: '/image/men/ethnic/d1.jpg' },
    { name: 'Sportswear', count: 198, img: '/image/men/sport/d4.jpg' },
    { name: 'Accessories', count: 321, img: '/image/accessories/men/watch/d2.jpg' },
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
    const timer = setInterval(() => {
      setBrandSlide(prev => (prev + 1) % brandSales.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [brandSales.length])

  const budgetDeals = [
    { id: 101, name: 'Basic Cotton Tee', price: '₹299', originalPrice: '₹599', rating: 4.1, img: '/image/men/t-shirt/t2.jpg' },
    { id: 102, name: 'Casual Shorts', price: '₹399', originalPrice: '₹799', rating: 4.0, img: '/image/men/short/d2.jpg' },
    { id: 103, name: 'Track Pants', price: '₹449', originalPrice: '₹899', rating: 4.2, img: '/image/men/trouser/d2.jpg' },
    { id: 104, name: 'Printed T-Shirt', price: '₹349', originalPrice: '₹699', rating: 4.1, img: '/image/men/t-shirt/t4.jpg' },
    { id: 105, name: 'Polo T-Shirt', price: '₹499', originalPrice: '₹999', rating: 4.3, img: '/image/men/t-shirt/t5.jpg' },
    { id: 106, name: 'Linen Shirt', price: '₹599', originalPrice: '₹1,199', rating: 4.2, img: '/image/men/shirt/s4.jpg' },
    { id: 107, name: 'Jogger Pants', price: '₹479', originalPrice: '₹949', rating: 4.0, img: '/image/men/trouser/d3.jpg' },
    { id: 108, name: 'Casual Kurta', price: '₹549', originalPrice: '₹1,099', rating: 4.4, img: '/image/men/kurta/d2.jpg' },
  ]

  const newArrivals = [
    { id: 1, name: 'Classic Polo T-Shirt', price: '₹899', rating: 4.2, img: '/image/men/t-shirt/t6.jpg' },
    { id: 2, name: 'Slim Fit Chinos', price: '₹1,299', rating: 4.5, img: '/image/men/jeans/p2.jpg' },
    { id: 3, name: 'Casual Denim Jacket', price: '₹2,199', rating: 4.3, img: '/image/men/jacket/d2.jpg' },
    { id: 4, name: 'Formal Blazer', price: '₹3,499', rating: 4.7, img: '/image/men/suit/d3.jpg' },
    { id: 5, name: 'Graphic Print Hoodie', price: '₹1,199', rating: 4.1, img: '/image/men/hoodies/d3.jpg' },
    { id: 6, name: 'Linen Kurta', price: '₹999', rating: 4.4, img: '/image/men/kurta/d3.jpg' },
    { id: 7, name: 'Jogger Pants', price: '₹799', rating: 4.0, img: '/image/men/trouser/d4.jpg' },
    { id: 8, name: 'Striped Shirt', price: '₹1,099', rating: 4.3, img: '/image/men/shirt/s5.jpg' },
  ]

  const trending = [
    { id: 9, name: 'Oversized Tee', price: '₹699', rating: 4.5, tag: 'Trending', img: '/image/men/oversized/d2.jpg' },
    { id: 10, name: 'Cargo Pants', price: '₹1,499', rating: 4.4, tag: 'Hot', img: '/image/men/trouser/d5.jpg' },
    { id: 11, name: 'Bomber Jacket', price: '₹2,799', rating: 4.6, tag: 'New', img: '/image/men/jacket/d3.jpg' },
    { id: 12, name: 'Ethnic Kurta Set', price: '₹1,899', rating: 4.7, tag: 'Popular', img: '/image/men/kurta/d4.jpg' },
    { id: 13, name: 'Denim Shirt', price: '₹1,199', rating: 4.3, tag: 'Trending', img: '/image/men/shirt/s6.jpg' },
    { id: 14, name: 'Track Suit', price: '₹1,699', rating: 4.2, tag: 'Hot', img: '/image/men/suit/d4.jpg' },
    { id: 15, name: 'Nehru Jacket', price: '₹2,199', rating: 4.5, tag: 'New', img: '/image/men/jacket/d4.jpg' },
    { id: 16, name: 'Printed Shirt', price: '₹999', rating: 4.1, tag: 'Popular', img: '/image/men/shirt/s7.jpg' },
  ]

  const forYou = [
    { id: 17, name: 'Smart Casual Outfit', price: '₹1,599', img: '/image/men/full/d3.jpg' },
    { id: 18, name: 'Summer Linen Set', price: '₹1,299', img: '/image/men/full/d4.jpg' },
    { id: 19, name: 'Party Wear Blazer', price: '₹3,199', img: '/image/men/suit/d5.jpg' },
    { id: 20, name: 'Festive Kurta', price: '₹1,799', img: '/image/men/kurta/d5.jpg' },
    { id: 21, name: 'Workout Set', price: '₹1,099', img: '/image/men/sport/d3.jpg' },
    { id: 22, name: 'Office Formals', price: '₹2,499', img: '/image/men/full/d5.jpg' },
    { id: 23, name: 'Weekend Casuals', price: '₹899', img: '/image/men/full/d6.jpg' },
    { id: 24, name: 'Winter Jacket', price: '₹2,999', img: '/image/men/jacket/d5.jpg' },
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
            <button className="shop-now-btn shop-now-blue">Shop Now</button>
          </div>
          <div className="sale-banner-img">
            <img src='/image/sale/men.jpg' alt="sale" />
          </div>
        </div>

        {/* Categories — clickable with preselection */}
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <span className="see-all" onClick={() => navigate('/common/men')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="cat-grid">
          {categories.map(cat => (
            <div
              key={cat.name}
              className="cat-card"
              onClick={() => {
                if (cat.name === 'Accessories') {
                  navigate('/common/accessories?gender=Men')
                } else {
                  navigate(`/common/men?category=${encodeURIComponent(cat.name)}`)
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
                      onClick={() => navigate(brandRoute(brand.name))}
                      style={{ backgroundImage: `url(${brand.img})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'pointer' }}
                    >
                      <div className="brand-card-overlay" />
                      <div className="brand-name">{brand.name}</div>
                      <div className="brand-discount">{brand.discount}</div>
                      <button className="brand-btn" onClick={(e) => { e.stopPropagation(); navigate(brandRoute(brand.name)) }}>
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
                style={{ width: i === brandSlide ? '22px' : '8px' }}
              />
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

        <div className="section-header">
          <h2 className="section-title">New Arrivals</h2>
          <span className="see-all" onClick={() => navigate('/products/new?category=Men')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="product-grid">
          {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        <div className="divider" />

        <div className="section-header">
          <h2 className="section-title">Trending Now 🔥</h2>
          <span className="see-all" onClick={() => navigate('/products/trending?category=Men')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="product-grid">
          {trending.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        <div className="divider" />

        <div className="section-header">
          <h2 className="section-title">Just For You ★</h2>
          <span className="see-all" onClick={() => navigate('/products/just-for-you?category=Men')}>
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