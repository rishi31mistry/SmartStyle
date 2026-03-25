import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function HM() {
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
    { id: 401, name: 'H&M Slim Fit Tee', price: '₹599', originalPrice: '₹999', rating: 4.3, tag: 'Bestseller', img: '/image/men/brand/h&m/t1.jpg' },
    { id: 402, name: 'H&M Basic Cotton Tee', price: '₹499', originalPrice: '₹899', rating: 4.2, tag: 'Sale', img: '/image/men/brand/h&m/t2.jpg' },
    { id: 403, name: 'H&M Graphic Print Tee', price: '₹699', originalPrice: '₹1,199', rating: 4.5, tag: 'New', img: '/image/men/brand/h&m/t3.jpg' },
    { id: 404, name: 'H&M Relaxed Fit Tee', price: '₹649', originalPrice: '₹1,099', rating: 4.4, tag: null, img: '/image/men/brand/h&m/t4.jpg' },
    { id: 405, name: 'H&M Polo Shirt Tee', price: '₹749', originalPrice: '₹1,299', rating: 4.3, tag: 'Trending', img: '/image/men/brand/h&m/t5.jpg' },
    { id: 406, name: 'H&M Oversized Tee', price: '₹799', originalPrice: '₹1,399', rating: 4.6, tag: 'Popular', img: '/image/men/brand/h&m/t6.jpg' },
    { id: 407, name: 'H&M Striped Tee', price: '₹679', originalPrice: '₹1,149', rating: 4.2, tag: null, img: '/image/men/brand/h&m/t7.jpg' },
    { id: 408, name: 'H&M V-Neck Tee', price: '₹549', originalPrice: '₹949', rating: 4.1, tag: 'Sale', img: '/image/men/brand/h&m/t8.jpg' },
  ]

  const shirts = [
    { id: 411, name: 'H&M Oxford Shirt', price: '₹1,299', originalPrice: '₹2,099', rating: 4.5, tag: 'New', img: '/image/men/brand/h&m/s1.jpg' },
    { id: 412, name: 'H&M Linen Shirt', price: '₹1,099', originalPrice: '₹1,799', rating: 4.4, tag: null, img: '/image/men/brand/h&m/s2.jpg' },
    { id: 413, name: 'H&M Flannel Shirt', price: '₹1,399', originalPrice: '₹2,299', rating: 4.6, tag: 'Trending', img: '/image/men/brand/h&m/s3.jpg' },
    { id: 414, name: 'H&M Regular Fit Shirt', price: '₹999', originalPrice: '₹1,699', rating: 4.3, tag: 'Bestseller', img: '/image/men/brand/h&m/s4.jpg' },
    { id: 415, name: 'H&M Slim Fit Shirt', price: '₹1,199', originalPrice: '₹1,999', rating: 4.5, tag: 'Popular', img: '/image/men/brand/h&m/s5.jpg' },
    { id: 416, name: 'H&M Denim Shirt', price: '₹1,499', originalPrice: '₹2,499', rating: 4.4, tag: 'New', img: '/image/men/brand/h&m/s6.jpg' },
    { id: 417, name: 'H&M Casual Shirt', price: '₹899', originalPrice: '₹1,499', rating: 4.2, tag: 'Sale', img: '/image/men/brand/h&m/s7.jpg' },
    { id: 418, name: 'H&M Printed Shirt', price: '₹1,149', originalPrice: '₹1,899', rating: 4.3, tag: null, img: '/image/men/brand/h&m/s8.jpg' },
  ]

  const jeans = [
    { id: 421, name: 'H&M Slim Jeans', price: '₹1,799', originalPrice: '₹2,999', rating: 4.4, tag: 'New', img: '/image/men/brand/h&m/p1.jpg' },
    { id: 422, name: 'H&M Skinny Jeans', price: '₹1,999', originalPrice: '₹3,299', rating: 4.5, tag: 'Popular', img: '/image/men/brand/h&m/p2.jpg' },
    { id: 423, name: 'H&M Straight Jeans', price: '₹1,699', originalPrice: '₹2,799', rating: 4.3, tag: 'Trending', img: '/image/men/brand/h&m/p3.jpg' },
    { id: 424, name: 'H&M Relaxed Jeans', price: '₹1,899', originalPrice: '₹3,099', rating: 4.6, tag: 'Bestseller', img: '/image/men/brand/h&m/p4.jpg' },
    { id: 425, name: 'H&M Tapered Jeans', price: '₹2,199', originalPrice: '₹3,599', rating: 4.7, tag: 'New', img: '/image/men/brand/h&m/p5.jpg' },
    { id: 426, name: 'H&M Ripped Jeans', price: '₹1,599', originalPrice: '₹2,699', rating: 4.2, tag: 'Sale', img: '/image/men/brand/h&m/p6.jpg' },
    { id: 427, name: 'H&M Cargo Jeans', price: '₹2,099', originalPrice: '₹3,499', rating: 4.4, tag: null, img: '/image/men/brand/h&m/p7.jpg' },
    { id: 428, name: 'H&M Classic Jeans', price: '₹1,499', originalPrice: '₹2,499', rating: 4.1, tag: 'Sale', img: '/image/men/brand/h&m/p8.jpg' },
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
          <h1 className="page-title">H&M</h1>
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
                background: activeCategory === cat.name ? '#E50010' : '#fff',
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
              <h2 className="section-title">H&M T-Shirts 👕</h2>
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
              <h2 className="section-title">H&M Shirts 🧥</h2>
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
              <h2 className="section-title">H&M Jeans 👖</h2>
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