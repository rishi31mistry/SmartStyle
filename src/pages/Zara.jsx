import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function Zara() {
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
    { id: 301, name: 'Zara Floral Midi Dress', price: '₹2,999', originalPrice: '₹4,499', rating: 4.7, tag: 'Bestseller', img: '/image/women/brand/zara/d1.jpg' },
    { id: 302, name: 'Zara Satin Slip Dress', price: '₹2,499', originalPrice: '₹3,999', rating: 4.5, tag: 'New', img: '/image/women/brand/zara/d2.jpg' },
    { id: 303, name: 'Zara Wrap Midi Dress', price: '₹3,199', originalPrice: '₹4,799', rating: 4.6, tag: 'Trending', img: '/image/women/brand/zara/d3.jpg' },
    { id: 304, name: 'Zara Linen Shirt Dress', price: '₹2,699', originalPrice: '₹3,999', rating: 4.4, tag: null, img: '/image/women/brand/zara/d4.jpg' },
    { id: 305, name: 'Zara Puff Sleeve Dress', price: '₹2,799', originalPrice: '₹4,199', rating: 4.5, tag: 'Popular', img: '/image/women/brand/zara/d5.jpg' },
    { id: 306, name: 'Zara Denim Shirt Dress', price: '₹2,299', originalPrice: '₹3,499', rating: 4.3, tag: 'Sale', img: '/image/women/brand/zara/d6.jpg' },
    { id: 307, name: 'Zara Ruffle Mini Dress', price: '₹1,999', originalPrice: '₹2,999', rating: 4.2, tag: 'Sale', img: '/image/women/brand/zara/d7.jpg' },
    { id: 308, name: 'Zara Knit Bodycon Dress', price: '₹3,499', originalPrice: '₹4,999', rating: 4.8, tag: 'New', img: '/image/women/brand/zara/d8.jpg' },
  ]

  const tshirts = [
    { id: 311, name: 'Zara Basic White Tee', price: '₹999', originalPrice: '₹1,599', rating: 4.4, tag: 'Bestseller', img: '/image/women/brand/zara/t1.jpg' },
    { id: 312, name: 'Zara Cropped Graphic Tee', price: '₹1,199', originalPrice: '₹1,899', rating: 4.3, tag: 'Trending', img: '/image/women/brand/zara/t2.jpg' },
    { id: 313, name: 'Zara Oversized Tee', price: '₹1,299', originalPrice: '₹1,999', rating: 4.5, tag: 'New', img: '/image/women/brand/zara/t3.jpg' },
    { id: 314, name: 'Zara Ribbed Tee', price: '₹899', originalPrice: '₹1,399', rating: 4.2, tag: null, img: '/image/women/brand/zara/t4.jpg' },
    { id: 315, name: 'Zara Striped Crop Tee', price: '₹1,099', originalPrice: '₹1,699', rating: 4.3, tag: 'Popular', img: '/image/women/brand/zara/t5.jpg' },
    { id: 316, name: 'Zara Cotton Boxy Tee', price: '₹799', originalPrice: '₹1,299', rating: 4.1, tag: 'Sale', img: '/image/women/brand/zara/t6.jpg' },
    { id: 317, name: 'Zara Printed Logo Tee', price: '₹1,399', originalPrice: '₹2,099', rating: 4.6, tag: 'New', img: '/image/women/brand/zara/t7.jpg' },
    { id: 318, name: 'Zara V-Neck Tee', price: '₹949', originalPrice: '₹1,499', rating: 4.2, tag: 'Sale', img: '/image/women/brand/zara/t8.jpg' },
  ]

  const jeans = [
    { id: 321, name: 'Zara High Waist Skinny Jeans', price: '₹2,499', originalPrice: '₹3,699', rating: 4.6, tag: 'Bestseller', img: '/image/women/brand/zara/p1.jpg' },
    { id: 322, name: 'Zara Wide Leg Jeans', price: '₹2,799', originalPrice: '₹3,999', rating: 4.5, tag: 'Trending', img: '/image/women/brand/zara/p2.jpg' },
    { id: 323, name: 'Zara Straight Cut Jeans', price: '₹2,299', originalPrice: '₹3,499', rating: 4.4, tag: 'New', img: '/image/women/brand/zara/p3.jpg' },
    { id: 324, name: 'Zara Mom Fit Jeans', price: '₹2,599', originalPrice: '₹3,799', rating: 4.3, tag: null, img: '/image/women/brand/zara/p4.jpg' },
    { id: 325, name: 'Zara Flared Denim', price: '₹2,999', originalPrice: '₹4,299', rating: 4.7, tag: 'Popular', img: '/image/women/brand/zara/p5.jpg' },
    { id: 326, name: 'Zara Ripped Skinny Jeans', price: '₹2,199', originalPrice: '₹3,299', rating: 4.2, tag: 'Sale', img: '/image/women/brand/zara/p6.jpg' },
    { id: 327, name: 'Zara Cropped Straight Jeans', price: '₹2,399', originalPrice: '₹3,599', rating: 4.4, tag: 'New', img: '/image/women/brand/zara/p7.jpg' },
    { id: 328, name: 'Zara Paperbag Waist Jeans', price: '₹2,699', originalPrice: '₹3,999', rating: 4.5, tag: 'Trending', img: '/image/women/brand/zara/p8.jpg' },
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
          <h1 className="page-title">Zara</h1>
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
              <h2 className="section-title">Zara Dresses 👗</h2>
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
              <h2 className="section-title">Zara T-Shirts 👕</h2>
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
              <h2 className="section-title">Zara Jeans 👖</h2>
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