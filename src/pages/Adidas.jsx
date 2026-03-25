import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function Adidas() {
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
    { id: 301, name: 'Adidas Essentials Tee', price: '₹1,199', originalPrice: '₹1,799', rating: 4.5, tag: 'Bestseller', img: '/image/men/brand/adidas/t1.jpg' },
    { id: 302, name: 'Adidas Trefoil Tee', price: '₹999', originalPrice: '₹1,599', rating: 4.3, tag: 'Sale', img: '/image/men/brand/adidas/t2.jpg' },
    { id: 303, name: 'Adidas 3-Stripes Tee', price: '₹1,299', originalPrice: '₹1,999', rating: 4.6, tag: 'New', img: '/image/men/brand/adidas/t3.jpg' },
    { id: 304, name: 'Adidas Sport Tee', price: '₹1,099', originalPrice: '₹1,699', rating: 4.4, tag: null, img: '/image/men/brand/adidas/t4.jpg' },
    { id: 305, name: 'Adidas Originals Tee', price: '₹1,149', originalPrice: '₹1,799', rating: 4.2, tag: 'Trending', img: '/image/men/brand/adidas/t5.jpg' },
    { id: 306, name: 'Adidas Run It Tee', price: '₹1,249', originalPrice: '₹1,899', rating: 4.7, tag: 'Popular', img: '/image/men/brand/adidas/t6.jpg' },
    { id: 307, name: 'Adidas Clima Tee', price: '₹1,399', originalPrice: '₹2,099', rating: 4.5, tag: null, img: '/image/men/brand/adidas/t7.jpg' },
    { id: 308, name: 'Adidas Classic Logo Tee', price: '₹849', originalPrice: '₹1,399', rating: 4.1, tag: 'Sale', img: '/image/men/brand/adidas/t8.jpg' },
  ]

  const shirts = [
    { id: 311, name: 'Adidas Woven Short', price: '₹2,299', originalPrice: '₹3,299', rating: 4.5, tag: 'New', img: '/image/men/brand/adidas/s1.jpg' },
    { id: 312, name: 'Adidas Button-Up Short', price: '₹1,899', originalPrice: '₹2,799', rating: 4.3, tag: null, img: '/image/men/brand/adidas/s2.jpg' },
    { id: 313, name: 'Adidas Originals Short', price: '₹2,599', originalPrice: '₹3,799', rating: 4.6, tag: 'Trending', img: '/image/men/brand/adidas/s3.jpg' },
    { id: 314, name: 'Adidas Sport Short', price: '₹1,999', originalPrice: '₹2,999', rating: 4.4, tag: 'Bestseller', img: '/image/men/brand/adidas/s4.jpg' },
    { id: 315, name: 'Adidas Training Short', price: '₹2,899', originalPrice: '₹4,199', rating: 4.7, tag: 'Popular', img: '/image/men/brand/adidas/s5.jpg' },
    { id: 316, name: 'Adidas Tech Short', price: '₹2,799', originalPrice: '₹3,999', rating: 4.5, tag: 'New', img: '/image/men/brand/adidas/s6.jpg' },
    { id: 317, name: 'Adidas Club Short', price: '₹1,699', originalPrice: '₹2,499', rating: 4.2, tag: 'Sale', img: '/image/men/brand/adidas/s7.jpg' },
    { id: 318, name: 'Adidas Casual Short', price: '₹1,499', originalPrice: '₹2,199', rating: 4.3, tag: null, img: '/image/men/brand/adidas/s8.jpg' },
  ]

  const jeans = [
    { id: 321, name: 'Adidas Denim Jogger', price: '₹2,799', originalPrice: '₹3,999', rating: 4.4, tag: 'New', img: '/image/men/brand/adidas/p1.jpg' },
    { id: 322, name: 'Adidas Originals Jeans', price: '₹3,299', originalPrice: '₹4,699', rating: 4.6, tag: 'Popular', img: '/image/men/brand/adidas/p2.jpg' },
    { id: 323, name: 'Adidas Slim Fit Denim', price: '₹2,499', originalPrice: '₹3,699', rating: 4.3, tag: 'Trending', img: '/image/men/brand/adidas/p3.jpg' },
    { id: 324, name: 'Adidas Sport Denim', price: '₹2,999', originalPrice: '₹4,299', rating: 4.5, tag: 'Bestseller', img: '/image/men/brand/adidas/p4.jpg' },
    { id: 325, name: 'Adidas Street Denim', price: '₹3,699', originalPrice: '₹5,199', rating: 4.7, tag: 'New', img: '/image/men/brand/adidas/p5.jpg' },
    { id: 326, name: 'Adidas Classic Denim', price: '₹2,299', originalPrice: '₹3,399', rating: 4.2, tag: 'Sale', img: '/image/men/brand/adidas/p6.jpg' },
    { id: 327, name: 'Adidas Cargo Denim', price: '₹3,099', originalPrice: '₹4,499', rating: 4.4, tag: null, img: '/image/men/brand/adidas/p7.jpg' },
    { id: 328, name: 'Adidas Straight Jeans', price: '₹1,999', originalPrice: '₹2,999', rating: 4.1, tag: 'Sale', img: '/image/men/brand/adidas/p8.jpg' },
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
          <h1 className="page-title">Adidas</h1>
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
                background: activeCategory === cat.name ? '#000' : '#fff',
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
              <h2 className="section-title">Adidas T-Shirts 👕</h2>
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
              <h2 className="section-title">Adidas Shirts 🧥</h2>
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
              <h2 className="section-title">Adidas Jeans 👖</h2>
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