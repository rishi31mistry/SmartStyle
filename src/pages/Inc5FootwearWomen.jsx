import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function Inc5FootwearWomen() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  const categories = [
    { name: 'All', count: 24 },
    { name: 'Wedges', count: 8 },
    { name: 'Platform Heels', count: 8 },
    { name: 'Pumps', count: 8 },
  ]

  const wedges = [
    { id: 1001, name: 'Inc.5 Espadrille Wedge', price: '₹1,999', originalPrice: '₹3,199', rating: 4.7, tag: 'Bestseller', img: '/image/footwear/women/brand/inc/a1.jpg' },
    { id: 1002, name: 'Inc.5 Jute Wedge Sandal', price: '₹1,799', originalPrice: '₹2,999', rating: 4.6, tag: 'New', img: '/image/footwear/women/brand/inc/a2.jpg' },
    { id: 1003, name: 'Inc.5 Block Wedge Heel', price: '₹2,199', originalPrice: '₹3,499', rating: 4.5, tag: 'Sale', img: '/image/footwear/women/brand/inc/a3.jpg' },
    { id: 1004, name: 'Inc.5 Strappy Wedge Sandal', price: '₹1,599', originalPrice: '₹2,599', rating: 4.4, tag: null, img: '/image/footwear/women/brand/inc/a4.jpg' },
    { id: 1005, name: 'Inc.5 Cork Wedge Slip-on', price: '₹2,499', originalPrice: '₹3,799', rating: 4.6, tag: 'Trending', img: '/image/footwear/women/brand/inc/a5.jpg' },
    { id: 1006, name: 'Inc.5 Ankle Strap Wedge', price: '₹2,299', originalPrice: '₹3,499', rating: 4.5, tag: 'Popular', img: '/image/footwear/women/brand/inc/a6.jpg' },
    { id: 1007, name: 'Inc.5 Casual Wedge Mule', price: '₹1,499', originalPrice: '₹2,399', rating: 4.3, tag: null, img: '/image/footwear/women/brand/inc/a7.jpg' },
    { id: 1008, name: 'Inc.5 Embellished Wedge', price: '₹2,799', originalPrice: '₹4,199', rating: 4.2, tag: 'Sale', img: '/image/footwear/women/brand/inc/a8.jpg' },
  ]

  const platformHeels = [
    { id: 1011, name: 'Inc.5 Classic Platform Heel', price: '₹2,499', originalPrice: '₹3,799', rating: 4.6, tag: 'Bestseller', img: '/image/footwear/women/brand/inc/b1.jpg' },
    { id: 1012, name: 'Inc.5 Chunky Platform Sandal', price: '₹2,199', originalPrice: '₹3,299', rating: 4.5, tag: 'New', img: '/image/footwear/women/brand/inc/b2.jpg' },
    { id: 1013, name: 'Inc.5 Platform Ankle Boot', price: '₹3,499', originalPrice: '₹4,999', rating: 4.7, tag: 'Trending', img: '/image/footwear/women/brand/inc/b3.jpg' },
    { id: 1014, name: 'Inc.5 Strappy Platform Heel', price: '₹1,999', originalPrice: '₹2,999', rating: 4.4, tag: null, img: '/image/footwear/women/brand/inc/b4.jpg' },
    { id: 1015, name: 'Inc.5 Block Platform Mule', price: '₹2,699', originalPrice: '₹3,999', rating: 4.5, tag: 'Sale', img: '/image/footwear/women/brand/inc/b5.jpg' },
    { id: 1016, name: 'Inc.5 Embossed Platform Heel', price: '₹2,999', originalPrice: '₹4,499', rating: 4.6, tag: 'Popular', img: '/image/footwear/women/brand/inc/b6.jpg' },
    { id: 1017, name: 'Inc.5 Peep Toe Platform', price: '₹1,799', originalPrice: '₹2,799', rating: 4.3, tag: null, img: '/image/footwear/women/brand/inc/b7.jpg' },
    { id: 1018, name: 'Inc.5 Glitter Platform Heel', price: '₹3,199', originalPrice: '₹4,799', rating: 4.4, tag: 'New', img: '/image/footwear/women/brand/inc/b8.jpg' },
  ]

  const pumps = [
    { id: 1021, name: 'Inc.5 Classic Stiletto Pump', price: '₹1,999', originalPrice: '₹2,999', rating: 4.6, tag: 'Bestseller', img: '/image/footwear/women/brand/inc/c1.jpg' },
    { id: 1022, name: 'Inc.5 Pointed Toe Pump', price: '₹1,799', originalPrice: '₹2,699', rating: 4.5, tag: 'New', img: '/image/footwear/women/brand/inc/c2.jpg' },
    { id: 1023, name: 'Inc.5 Block Heel Pump', price: '₹2,299', originalPrice: '₹3,499', rating: 4.7, tag: 'Trending', img: '/image/footwear/women/brand/inc/c3.jpg' },
    { id: 1024, name: 'Inc.5 Kitten Heel Pump', price: '₹1,599', originalPrice: '₹2,399', rating: 4.4, tag: null, img: '/image/footwear/women/brand/inc/c4.jpg' },
    { id: 1025, name: 'Inc.5 Embellished Court Pump', price: '₹2,699', originalPrice: '₹3,999', rating: 4.5, tag: 'Sale', img: '/image/footwear/women/brand/inc/c5.jpg' },
    { id: 1026, name: 'Inc.5 Slingback Pump', price: '₹2,199', originalPrice: '₹3,299', rating: 4.6, tag: 'Popular', img: '/image/footwear/women/brand/inc/c6.jpg' },
    { id: 1027, name: 'Inc.5 Ankle Strap Pump', price: '₹1,899', originalPrice: '₹2,899', rating: 4.3, tag: null, img: '/image/footwear/women/brand/inc/c7.jpg' },
    { id: 1028, name: 'Inc.5 Peep Toe Stiletto', price: '₹2,499', originalPrice: '₹3,699', rating: 4.4, tag: 'New', img: '/image/footwear/women/brand/inc/c8.jpg' },
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
          <h1 className="page-title">Inc.5 Women's Footwear</h1>
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

        {/* Wedges Section */}
        {(activeCategory === 'All' || activeCategory === 'Wedges') && (
          <>
            <div className="section-header">
              <h2 className="section-title">Inc.5 Wedges 👠</h2>
            </div>
            <div className="product-grid">
              {wedges.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="divider" />
          </>
        )}

        {/* Platform Heels Section */}
        {(activeCategory === 'All' || activeCategory === 'Platform Heels') && (
          <>
            <div className="section-header">
              <h2 className="section-title">Inc.5 Platform Heels 👡</h2>
            </div>
            <div className="product-grid">
              {platformHeels.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="divider" />
          </>
        )}

        {/* Pumps Section */}
        {(activeCategory === 'All' || activeCategory === 'Pumps') && (
          <>
            <div className="section-header">
              <h2 className="section-title">Inc.5 Pumps 💃</h2>
            </div>
            <div className="product-grid">
              {pumps.map(p => <ProductCard key={p.id} product={p} />)}
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