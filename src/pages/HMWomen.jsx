import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function HMWomen() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  const categories = [
    { name: 'All', count: 24 },
    { name: 'Dresses', count: 8 },
    { name: 'T-Shirts', count: 8 },
    { name: 'Jeans', count: 8 },
  ]

  const dresses = [
    { id: 401, name: 'H&M Floral Wrap Dress', price: '₹1,999', originalPrice: '₹3,499', rating: 4.5, tag: 'Bestseller', img: '/image/women/brand/h&m/d1.jpg' },
    { id: 402, name: 'H&M Puff Sleeve Dress', price: '₹1,799', originalPrice: '₹2,999', rating: 4.3, tag: 'New', img: '/image/women/brand/h&m/d2.jpg' },
    { id: 403, name: 'H&M Linen Midi Dress', price: '₹2,199', originalPrice: '₹3,699', rating: 4.6, tag: 'Trending', img: '/image/women/brand/h&m/d3.jpg' },
    { id: 404, name: 'H&M Shirt Dress', price: '₹1,699', originalPrice: '₹2,799', rating: 4.2, tag: null, img: '/image/women/brand/h&m/d4.jpg' },
    { id: 405, name: 'H&M Satin Mini Dress', price: '₹2,299', originalPrice: '₹3,999', rating: 4.4, tag: 'Popular', img: '/image/women/brand/h&m/d5.jpg' },
    { id: 406, name: 'H&M Cotton Sundress', price: '₹1,499', originalPrice: '₹2,499', rating: 4.3, tag: 'Sale', img: '/image/women/brand/h&m/d6.jpg' },
    { id: 407, name: 'H&M Bodycon Dress', price: '₹1,599', originalPrice: '₹2,699', rating: 4.1, tag: 'Sale', img: '/image/women/brand/h&m/d7.jpg' },
    { id: 408, name: 'H&M Maxi Boho Dress', price: '₹2,499', originalPrice: '₹3,999', rating: 4.7, tag: 'New', img: '/image/women/brand/h&m/d8.jpg' },
  ]

  const tshirts = [
    { id: 411, name: 'H&M Basic Crop Tee', price: '₹699', originalPrice: '₹1,199', rating: 4.3, tag: 'Bestseller', img: '/image/women/brand/h&m/t1.jpg' },
    { id: 412, name: 'H&M Graphic Print Tee', price: '₹799', originalPrice: '₹1,399', rating: 4.2, tag: 'Trending', img: '/image/women/brand/h&m/t2.jpg' },
    { id: 413, name: 'H&M Oversized Tee', price: '₹899', originalPrice: '₹1,499', rating: 4.4, tag: 'New', img: '/image/women/brand/h&m/t3.jpg' },
    { id: 414, name: 'H&M Ribbed Slim Tee', price: '₹599', originalPrice: '₹999', rating: 4.1, tag: null, img: '/image/women/brand/h&m/t4.jpg' },
    { id: 415, name: 'H&M Striped Tee', price: '₹749', originalPrice: '₹1,299', rating: 4.2, tag: 'Popular', img: '/image/women/brand/h&m/t5.jpg' },
    { id: 416, name: 'H&M V-Neck Tee', price: '₹549', originalPrice: '₹949', rating: 4.0, tag: 'Sale', img: '/image/women/brand/h&m/t6.jpg' },
    { id: 417, name: 'H&M Knotted Tee', price: '₹849', originalPrice: '₹1,499', rating: 4.5, tag: 'New', img: '/image/women/brand/h&m/t7.jpg' },
    { id: 418, name: 'H&M Cotton Round Neck Tee', price: '₹649', originalPrice: '₹1,099', rating: 4.1, tag: 'Sale', img: '/image/women/brand/h&m/t8.jpg' },
  ]

  const jeans = [
    { id: 421, name: 'H&M High Waist Skinny Jeans', price: '₹1,999', originalPrice: '₹3,199', rating: 4.5, tag: 'Bestseller', img: '/image/women/brand/h&m/p1.jpg' },
    { id: 422, name: 'H&M Wide Leg Jeans', price: '₹2,299', originalPrice: '₹3,699', rating: 4.4, tag: 'Trending', img: '/image/women/brand/h&m/p2.jpg' },
    { id: 423, name: 'H&M Straight Fit Jeans', price: '₹1,799', originalPrice: '₹2,999', rating: 4.3, tag: 'New', img: '/image/women/brand/h&m/p3.jpg' },
    { id: 424, name: 'H&M Mom Jeans', price: '₹2,099', originalPrice: '₹3,399', rating: 4.2, tag: null, img: '/image/women/brand/h&m/p4.jpg' },
    { id: 425, name: 'H&M Flared Jeans', price: '₹2,399', originalPrice: '₹3,799', rating: 4.6, tag: 'Popular', img: '/image/women/brand/h&m/p5.jpg' },
    { id: 426, name: 'H&M Ripped Jeans', price: '₹1,699', originalPrice: '₹2,799', rating: 4.1, tag: 'Sale', img: '/image/women/brand/h&m/p6.jpg' },
    { id: 427, name: 'H&M Cropped Jeans', price: '₹1,899', originalPrice: '₹3,099', rating: 4.3, tag: 'New', img: '/image/women/brand/h&m/p7.jpg' },
    { id: 428, name: 'H&M Boyfriend Jeans', price: '₹2,199', originalPrice: '₹3,499', rating: 4.4, tag: 'Trending', img: '/image/women/brand/h&m/p8.jpg' },
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
            <span className="product-price product-price-pink">{product.price}</span>
            <span className="original-price"> {product.originalPrice}</span>
          </div>
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
                background: activeCategory === cat.name ? '#E91E8C' : '#fff',
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

        {/* Dresses Section */}
        {(activeCategory === 'All' || activeCategory === 'Dresses') && (
          <>
            <div className="section-header">
              <h2 className="section-title">H&M Dresses 👗</h2>
            </div>
            <div className="product-grid">
              {dresses.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="divider" />
          </>
        )}

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