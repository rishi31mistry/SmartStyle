import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function JackAndJones() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  const categories = [
    { name: 'All', count: 24 },
    { name: 'T-Shirts', count: 8 },
    { name: 'Shirts', count: 8 },
    { name: 'Jeans', count: 8 },
  ]

  const tshirts = [
    { id: 501, name: 'J&J Basic Crew Tee', price: '₹699', originalPrice: '₹1,199', rating: 4.3, tag: 'Bestseller', img: '/image/men/brand/j&j/t1.jpg' },
    { id: 502, name: 'J&J Logo Print Tee', price: '₹599', originalPrice: '₹999', rating: 4.2, tag: 'Sale', img: '/image/men/brand/j&j/t2.jpg' },
    { id: 503, name: 'J&J Graphic Tee', price: '₹799', originalPrice: '₹1,399', rating: 4.5, tag: 'New', img: '/image/men/brand/j&j/t3.jpg' },
    { id: 504, name: 'J&J Slim Fit Tee', price: '₹749', originalPrice: '₹1,249', rating: 4.4, tag: null, img: '/image/men/brand/j&j/t4.jpg' },
    { id: 505, name: 'J&J Relaxed Tee', price: '₹849', originalPrice: '₹1,449', rating: 4.3, tag: 'Trending', img: '/image/men/brand/j&j/t5.jpg' },
    { id: 506, name: 'J&J Striped Tee', price: '₹899', originalPrice: '₹1,499', rating: 4.6, tag: 'Popular', img: '/image/men/brand/j&j/t6.jpg' },
    { id: 507, name: 'J&J Pocket Tee', price: '₹679', originalPrice: '₹1,149', rating: 4.2, tag: null, img: '/image/men/brand/j&j/t7.jpg' },
    { id: 508, name: 'J&J Classic Tee', price: '₹649', originalPrice: '₹1,099', rating: 4.1, tag: 'Sale', img: '/image/men/brand/j&j/t8.jpg' },
  ]

  const shirts = [
    { id: 511, name: 'J&J Oxford Shirt', price: '₹1,499', originalPrice: '₹2,399', rating: 4.5, tag: 'New', img: '/image/men/brand/j&j/s1.jpg' },
    { id: 512, name: 'J&J Linen Shirt', price: '₹1,299', originalPrice: '₹2,099', rating: 4.4, tag: null, img: '/image/men/brand/j&j/s2.jpg' },
    { id: 513, name: 'J&J Check Shirt', price: '₹1,599', originalPrice: '₹2,599', rating: 4.6, tag: 'Trending', img: '/image/men/brand/j&j/s3.jpg' },
    { id: 514, name: 'J&J Slim Shirt', price: '₹1,199', originalPrice: '₹1,999', rating: 4.3, tag: 'Bestseller', img: '/image/men/brand/j&j/s4.jpg' },
    { id: 515, name: 'J&J Casual Shirt', price: '₹1,099', originalPrice: '₹1,799', rating: 4.5, tag: 'Popular', img: '/image/men/brand/j&j/s5.jpg' },
    { id: 516, name: 'J&J Denim Shirt', price: '₹1,799', originalPrice: '₹2,899', rating: 4.4, tag: 'New', img: '/image/men/brand/j&j/s6.jpg' },
    { id: 517, name: 'J&J Printed Shirt', price: '₹999', originalPrice: '₹1,699', rating: 4.2, tag: 'Sale', img: '/image/men/brand/j&j/s7.jpg' },
    { id: 518, name: 'J&J Regular Shirt', price: '₹1,149', originalPrice: '₹1,899', rating: 4.3, tag: null, img: '/image/men/brand/j&j/s8.jpg' },
  ]

  const jeans = [
    { id: 521, name: 'J&J Glenn Slim Jeans', price: '₹2,099', originalPrice: '₹3,499', rating: 4.5, tag: 'Bestseller', img: '/image/men/brand/j&j/p1.jpg' },
    { id: 522, name: 'J&J Tim Slim Jeans', price: '₹1,999', originalPrice: '₹3,299', rating: 4.6, tag: 'Popular', img: '/image/men/brand/j&j/p2.jpg' },
    { id: 523, name: 'J&J Mike Cargo Jeans', price: '₹2,299', originalPrice: '₹3,799', rating: 4.4, tag: 'New', img: '/image/men/brand/j&j/p3.jpg' },
    { id: 524, name: 'J&J Chris Loose Jeans', price: '₹2,499', originalPrice: '₹3,999', rating: 4.3, tag: 'Trending', img: '/image/men/brand/j&j/p4.jpg' },
    { id: 525, name: 'J&J Clark Straight Jeans', price: '₹1,899', originalPrice: '₹3,099', rating: 4.7, tag: 'New', img: '/image/men/brand/j&j/p5.jpg' },
    { id: 526, name: 'J&J Liam Skinny Jeans', price: '₹1,799', originalPrice: '₹2,999', rating: 4.2, tag: 'Sale', img: '/image/men/brand/j&j/p6.jpg' },
    { id: 527, name: 'J&J Eddie Tapered Jeans', price: '₹2,199', originalPrice: '₹3,599', rating: 4.4, tag: null, img: '/image/men/brand/j&j/p7.jpg' },
    { id: 528, name: 'J&J Rick Original Jeans', price: '₹1,699', originalPrice: '₹2,799', rating: 4.1, tag: 'Sale', img: '/image/men/brand/j&j/p8.jpg' },
  ]

  const tagColor = (tag) => {
    if (tag === 'Sale') return '#FF4B4B'
    if (tag === 'New') return '#4A90D9'
    if (tag === 'Trending') return '#E91E8C'
    if (tag === 'Bestseller') return '#F5A623'
    if (tag === 'Popular') return '#00897B'
    return '#888'
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
          <div>
            <span className="product-price">{product.price}</span>
            <span className="original-price"> {product.originalPrice}</span>
          </div>
          {product.rating && <span className="product-rating">★ {product.rating}</span>}
        </div>
        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  )

  return (
    <div className="page">
      <Navbar active="" />

      <div className="wrapper_men" >

        {/* Header */}
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <h1 className="page-title">Jack & Jones</h1>
        </div>

        {/* Category Filter Tabs */}
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              style={{
                padding: '10px 22px',
                borderRadius: '50px',
                border: activeCategory === cat.name ? 'none' : '1.5px solid #ddd',
                background: activeCategory === cat.name ? '#1A1A2E' : '#fff',
                color: activeCategory === cat.name ? '#fff' : '#444',
                fontSize: '13px',
                fontWeight: '600',
                fontFamily: 'Poppins, sans-serif',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {cat.name}
              <span style={{ marginLeft: '6px', fontSize: '11px', opacity: 0.7 }}>({cat.count})</span>
            </button>
          ))}
        </div>

        {/* T-Shirts Section */}
        {(activeCategory === 'All' || activeCategory === 'T-Shirts') && (
          <>
            <div className="section-header">
              <h2 className="section-title">Jack & Jones T-Shirts 👕</h2>
            </div>
            <div className="product-grid">
              {tshirts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="divider" />
          </>
        )}

        {/* Shirts Section */}
        {(activeCategory === 'All' || activeCategory === 'Shirts') && (
          <>
            <div className="section-header">
              <h2 className="section-title">Jack & Jones Shirts 🧥</h2>
            </div>
            <div className="product-grid">
              {shirts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="divider" />
          </>
        )}

        {/* Jeans Section */}
        {(activeCategory === 'All' || activeCategory === 'Jeans') && (
          <>
            <div className="section-header">
              <h2 className="section-title">Jack & Jones Jeans 👖</h2>
            </div>
            <div className="product-grid">
              {jeans.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </>
        )}

      </div>

      <footer className="footer">
        ® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.
      </footer>
    </div>
  )
}