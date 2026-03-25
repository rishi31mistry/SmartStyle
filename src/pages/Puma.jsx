import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function Puma() {
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
    { id: 601, name: 'Puma ESS Logo Tee', price: '₹799', originalPrice: '₹1,299', rating: 4.4, tag: 'Bestseller', img: '/image/men/brand/puma/t1.jpg' },
    { id: 602, name: 'Puma Active Tee', price: '₹699', originalPrice: '₹1,199', rating: 4.2, tag: 'Sale', img: '/image/men/brand/puma/t2.jpg' },
    { id: 603, name: 'Puma Graphic Tee', price: '₹899', originalPrice: '₹1,499', rating: 4.5, tag: 'New', img: '/image/men/brand/puma/t3.jpg' },
    { id: 604, name: 'Puma Run Fav Tee', price: '₹849', originalPrice: '₹1,399', rating: 4.3, tag: null, img: '/image/men/brand/puma/t4.jpg' },
    { id: 605, name: 'Puma Cat Logo Tee', price: '₹749', originalPrice: '₹1,249', rating: 4.3, tag: 'Trending', img: '/image/men/brand/puma/t5.jpg' },
    { id: 606, name: 'Puma Classics Tee', price: '₹949', originalPrice: '₹1,599', rating: 4.6, tag: 'Popular', img: '/image/men/brand/puma/t6.jpg' },
    { id: 607, name: 'Puma Fit Tee', price: '₹799', originalPrice: '₹1,349', rating: 4.2, tag: null, img: '/image/men/brand/puma/t7.jpg' },
    { id: 608, name: 'Puma Sport Tee', price: '₹649', originalPrice: '₹1,099', rating: 4.1, tag: 'Sale', img: '/image/men/brand/puma/t8.jpg' },
  ]

  const shirts = [
    { id: 611, name: 'Puma Woven Short', price: '₹1,599', originalPrice: '₹2,599', rating: 4.5, tag: 'New', img: '/image/men/brand/puma/s1.jpg' },
    { id: 612, name: 'Puma Casual Short', price: '₹1,299', originalPrice: '₹2,099', rating: 4.3, tag: null, img: '/image/men/brand/puma/s2.jpg' },
    { id: 613, name: 'Puma Active Short', price: '₹1,699', originalPrice: '₹2,799', rating: 4.6, tag: 'Trending', img: '/image/men/brand/puma/s3.jpg' },
    { id: 614, name: 'Puma Sport Short', price: '₹1,199', originalPrice: '₹1,999', rating: 4.4, tag: 'Bestseller', img: '/image/men/brand/puma/s4.jpg' },
    { id: 615, name: 'Puma Training Short', price: '₹1,899', originalPrice: '₹3,099', rating: 4.5, tag: 'Popular', img: '/image/men/brand/puma/s5.jpg' },
    { id: 616, name: 'Puma Tech Short', price: '₹1,799', originalPrice: '₹2,999', rating: 4.4, tag: 'New', img: '/image/men/brand/puma/s6.jpg' },
    { id: 617, name: 'Puma Club Short', price: '₹1,099', originalPrice: '₹1,799', rating: 4.2, tag: 'Sale', img: '/image/men/brand/puma/s7.jpg' },
    { id: 618, name: 'Puma Logo Short', price: '₹1,399', originalPrice: '₹2,299', rating: 4.3, tag: null, img: '/image/men/brand/puma/s8.jpg' },
  ]

  const jeans = [
    { id: 621, name: 'Puma Denim Jogger', price: '₹2,299', originalPrice: '₹3,699', rating: 4.4, tag: 'New', img: '/image/men/brand/puma/p1.jpg' },
    { id: 622, name: 'Puma Sport Denim', price: '₹2,599', originalPrice: '₹4,099', rating: 4.5, tag: 'Popular', img: '/image/men/brand/puma/p2.jpg' },
    { id: 623, name: 'Puma Slim Jeans', price: '₹2,099', originalPrice: '₹3,399', rating: 4.3, tag: 'Trending', img: '/image/men/brand/puma/p3.jpg' },
    { id: 624, name: 'Puma Active Jeans', price: '₹2,399', originalPrice: '₹3,899', rating: 4.6, tag: 'Bestseller', img: '/image/men/brand/puma/p4.jpg' },
    { id: 625, name: 'Puma Street Jeans', price: '₹2,799', originalPrice: '₹4,499', rating: 4.7, tag: 'New', img: '/image/men/brand/puma/p5.jpg' },
    { id: 626, name: 'Puma Classic Denim', price: '₹1,899', originalPrice: '₹3,099', rating: 4.2, tag: 'Sale', img: '/image/men/brand/puma/p6.jpg' },
    { id: 627, name: 'Puma Cargo Jeans', price: '₹2,499', originalPrice: '₹3,999', rating: 4.4, tag: null, img: '/image/men/brand/puma/p7.jpg' },
    { id: 628, name: 'Puma Straight Jeans', price: '₹1,799', originalPrice: '₹2,899', rating: 4.1, tag: 'Sale', img: '/image/men/brand/puma/p8.jpg' },
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
          <h1 className="page-title">Puma</h1>
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
                background: activeCategory === cat.name ? '#EF3E23' : '#fff',
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
              <h2 className="section-title">Puma T-Shirts 👕</h2>
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
              <h2 className="section-title">Puma Shirts 🧥</h2>
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
              <h2 className="section-title">Puma Jeans 👖</h2>
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