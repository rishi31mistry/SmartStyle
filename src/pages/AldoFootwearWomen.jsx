import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function AldoFootwearWomen() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  const categories = [
    { name: 'All', count: 24 },
    { name: 'Heels', count: 8 },
    { name: 'Flats', count: 8 },
    { name: 'Loafers', count: 8 },
  ]

  const heels = [
    { id: 1301, name: 'Aldo Stessy Stiletto Heel', price: '₹5,999', originalPrice: '₹8,499', rating: 4.7, tag: 'Bestseller', img: '/image/footwear/women/brand/aldo/a1.jpg' },
    { id: 1302, name: 'Aldo Criwiel Block Heel', price: '₹4,999', originalPrice: '₹6,999', rating: 4.6, tag: 'New', img: '/image/footwear/women/brand/aldo/a2.jpg' },
    { id: 1303, name: 'Aldo Bowien Ankle Strap Heel', price: '₹5,499', originalPrice: '₹7,499', rating: 4.5, tag: 'Sale', img: '/image/footwear/women/brand/aldo/a3.jpg' },
    { id: 1304, name: 'Aldo Mirayla Kitten Heel', price: '₹3,999', originalPrice: '₹5,499', rating: 4.4, tag: null, img: '/image/footwear/women/brand/aldo/a4.jpg' },
    { id: 1305, name: 'Aldo Kassedy Platform Heel', price: '₹6,499', originalPrice: '₹8,999', rating: 4.6, tag: 'Trending', img: '/image/footwear/women/brand/aldo/a5.jpg' },
    { id: 1306, name: 'Aldo Sevaulle Strappy Heel', price: '₹5,999', originalPrice: '₹7,999', rating: 4.5, tag: 'Popular', img: '/image/footwear/women/brand/aldo/a6.jpg' },
    { id: 1307, name: 'Aldo Brileyy Pointed Toe Heel', price: '₹4,499', originalPrice: '₹6,299', rating: 4.3, tag: null, img: '/image/footwear/women/brand/aldo/a7.jpg' },
    { id: 1308, name: 'Aldo Onardonia Mule Heel', price: '₹4,999', originalPrice: '₹6,999', rating: 4.2, tag: 'Sale', img: '/image/footwear/women/brand/aldo/a8.jpg' },
  ]

  const flats = [
    { id: 1311, name: 'Aldo Balera Ballet Flat', price: '₹2,999', originalPrice: '₹4,299', rating: 4.6, tag: 'Bestseller', img: '/image/footwear/women/brand/aldo/b1.jpg' },
    { id: 1312, name: 'Aldo Ceria Pointed Flat', price: '₹2,499', originalPrice: '₹3,699', rating: 4.5, tag: 'New', img: '/image/footwear/women/brand/aldo/b2.jpg' },
    { id: 1313, name: 'Aldo Ritha Slip-on Flat', price: '₹2,199', originalPrice: '₹3,299', rating: 4.4, tag: 'Sale', img: '/image/footwear/women/brand/aldo/b3.jpg' },
    { id: 1314, name: 'Aldo Flowly Bow Flat', price: '₹1,999', originalPrice: '₹2,999', rating: 4.3, tag: null, img: '/image/footwear/women/brand/aldo/b4.jpg' },
    { id: 1315, name: 'Aldo Crinkle Mary Jane Flat', price: '₹3,299', originalPrice: '₹4,799', rating: 4.5, tag: 'Trending', img: '/image/footwear/women/brand/aldo/b5.jpg' },
    { id: 1316, name: 'Aldo Elenaa Embellished Flat', price: '₹3,499', originalPrice: '₹4,999', rating: 4.6, tag: 'Popular', img: '/image/footwear/women/brand/aldo/b6.jpg' },
    { id: 1317, name: 'Aldo Sophiaa T-Strap Flat', price: '₹1,799', originalPrice: '₹2,699', rating: 4.2, tag: null, img: '/image/footwear/women/brand/aldo/b7.jpg' },
    { id: 1318, name: 'Aldo Rindaa Slingback Flat', price: '₹2,699', originalPrice: '₹3,999', rating: 4.4, tag: 'New', img: '/image/footwear/women/brand/aldo/b8.jpg' },
  ]

  const loafers = [
    { id: 1321, name: 'Aldo Coasta Classic Loafer', price: '₹4,499', originalPrice: '₹6,299', rating: 4.6, tag: 'Bestseller', img: '/image/footwear/women/brand/aldo/c1.jpg' },
    { id: 1322, name: 'Aldo Briellaa Penny Loafer', price: '₹3,999', originalPrice: '₹5,499', rating: 4.5, tag: 'New', img: '/image/footwear/women/brand/aldo/c2.jpg' },
    { id: 1323, name: 'Aldo Moralaa Tassel Loafer', price: '₹4,999', originalPrice: '₹6,999', rating: 4.7, tag: 'Trending', img: '/image/footwear/women/brand/aldo/c3.jpg' },
    { id: 1324, name: 'Aldo Plato Chunky Loafer', price: '₹5,499', originalPrice: '₹7,499', rating: 4.4, tag: null, img: '/image/footwear/women/brand/aldo/c4.jpg' },
    { id: 1325, name: 'Aldo Elowen Slip-on Loafer', price: '₹3,499', originalPrice: '₹4,999', rating: 4.3, tag: 'Sale', img: '/image/footwear/women/brand/aldo/c5.jpg' },
    { id: 1326, name: 'Aldo Clog Mule Loafer', price: '₹3,999', originalPrice: '₹5,499', rating: 4.5, tag: 'Popular', img: '/image/footwear/women/brand/aldo/c6.jpg' },
    { id: 1327, name: 'Aldo Slipper Loafer', price: '₹2,999', originalPrice: '₹4,299', rating: 4.2, tag: null, img: '/image/footwear/women/brand/aldo/c7.jpg' },
    { id: 1328, name: 'Aldo Embossed Loafer', price: '₹5,999', originalPrice: '₹7,999', rating: 4.6, tag: 'New', img: '/image/footwear/women/brand/aldo/c8.jpg' },
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
          <h1 className="page-title">Aldo Women's Footwear</h1>
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

        {/* Heels Section */}
        {(activeCategory === 'All' || activeCategory === 'Heels') && (
          <>
            <div className="section-header">
              <h2 className="section-title">Aldo Heels 👡</h2>
            </div>
            <div className="product-grid">
              {heels.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="divider" />
          </>
        )}

        {/* Flats Section */}
        {(activeCategory === 'All' || activeCategory === 'Flats') && (
          <>
            <div className="section-header">
              <h2 className="section-title">Aldo Flats 🥿</h2>
            </div>
            <div className="product-grid">
              {flats.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="divider" />
          </>
        )}

        {/* Loafers Section */}
        {(activeCategory === 'All' || activeCategory === 'Loafers') && (
          <>
            <div className="section-header">
              <h2 className="section-title">Aldo Loafers 👞</h2>
            </div>
            <div className="product-grid">
              {loafers.map(p => <ProductCard key={p.id} product={p} />)}
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