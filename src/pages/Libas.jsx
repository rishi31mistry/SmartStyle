import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function Libas() {
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
    { id: 601, name: 'Libas Floral A-Line Dress', price: '₹1,899', originalPrice: '₹2,999', rating: 4.5, tag: 'Bestseller', img: '/image/women/brand/libas/d1.jpg' },
    { id: 602, name: 'Libas Ethnic Midi Dress', price: '₹2,199', originalPrice: '₹3,499', rating: 4.4, tag: 'New', img: '/image/women/brand/libas/d2.jpg' },
    { id: 603, name: 'Libas Printed Wrap Dress', price: '₹1,699', originalPrice: '₹2,799', rating: 4.3, tag: 'Trending', img: '/image/women/brand/libas/d3.jpg' },
    { id: 604, name: 'Libas Cotton Shirt Dress', price: '₹1,499', originalPrice: '₹2,499', rating: 4.2, tag: null, img: '/image/women/brand/libas/d4.jpg' },
    { id: 605, name: 'Libas Embroidered Dress', price: '₹2,499', originalPrice: '₹3,999', rating: 4.6, tag: 'Popular', img: '/image/women/brand/libas/d5.jpg' },
    { id: 606, name: 'Libas Rayon Flared Dress', price: '₹1,399', originalPrice: '₹2,299', rating: 4.2, tag: 'Sale', img: '/image/women/brand/libas/d6.jpg' },
    { id: 607, name: 'Libas Block Print Dress', price: '₹1,799', originalPrice: '₹2,999', rating: 4.3, tag: 'Sale', img: '/image/women/brand/libas/d7.jpg' },
    { id: 608, name: 'Libas Festive Anarkali Dress', price: '₹2,799', originalPrice: '₹4,499', rating: 4.7, tag: 'New', img: '/image/women/brand/libas/d8.jpg' },
  ]

  const tshirts = [
    { id: 611, name: 'Libas Printed Kurta Top', price: '₹799', originalPrice: '₹1,299', rating: 4.3, tag: 'Bestseller', img: '/image/women/brand/libas/t1.jpg' },
    { id: 612, name: 'Libas Embroidered Top', price: '₹999', originalPrice: '₹1,599', rating: 4.2, tag: 'Trending', img: '/image/women/brand/libas/t2.jpg' },
    { id: 613, name: 'Libas Cotton Floral Top', price: '₹899', originalPrice: '₹1,499', rating: 4.4, tag: 'New', img: '/image/women/brand/libas/t3.jpg' },
    { id: 614, name: 'Libas Solid Tunic Top', price: '₹699', originalPrice: '₹1,149', rating: 4.1, tag: null, img: '/image/women/brand/libas/t4.jpg' },
    { id: 615, name: 'Libas Block Print Top', price: '₹849', originalPrice: '₹1,399', rating: 4.2, tag: 'Popular', img: '/image/women/brand/libas/t5.jpg' },
    { id: 616, name: 'Libas Ethnic Crop Top', price: '₹649', originalPrice: '₹1,099', rating: 4.0, tag: 'Sale', img: '/image/women/brand/libas/t6.jpg' },
    { id: 617, name: 'Libas Rayon Printed Top', price: '₹999', originalPrice: '₹1,699', rating: 4.4, tag: 'New', img: '/image/women/brand/libas/t7.jpg' },
    { id: 618, name: 'Libas Casual Slub Top', price: '₹749', originalPrice: '₹1,249', rating: 4.1, tag: 'Sale', img: '/image/women/brand/libas/t8.jpg' },
  ]

  const jeans = [
    { id: 621, name: 'Libas Printed Palazzo', price: '₹1,299', originalPrice: '₹2,099', rating: 4.4, tag: 'Bestseller', img: '/image/women/brand/libas/p1.jpg' },
    { id: 622, name: 'Libas Wide Leg Pants', price: '₹1,499', originalPrice: '₹2,399', rating: 4.3, tag: 'Trending', img: '/image/women/brand/libas/p2.jpg' },
    { id: 623, name: 'Libas Cotton Straight Pants', price: '₹1,099', originalPrice: '₹1,799', rating: 4.2, tag: 'New', img: '/image/women/brand/libas/p3.jpg' },
    { id: 624, name: 'Libas Embroidered Pants', price: '₹1,699', originalPrice: '₹2,799', rating: 4.3, tag: null, img: '/image/women/brand/libas/p4.jpg' },
    { id: 625, name: 'Libas Flared Ethnic Pants', price: '₹1,399', originalPrice: '₹2,299', rating: 4.5, tag: 'Popular', img: '/image/women/brand/libas/p5.jpg' },
    { id: 626, name: 'Libas Rayon Slim Pants', price: '₹999', originalPrice: '₹1,699', rating: 4.1, tag: 'Sale', img: '/image/women/brand/libas/p6.jpg' },
    { id: 627, name: 'Libas Block Print Pants', price: '₹1,199', originalPrice: '₹1,999', rating: 4.2, tag: 'New', img: '/image/women/brand/libas/p7.jpg' },
    { id: 628, name: 'Libas Festive Palazzo', price: '₹1,599', originalPrice: '₹2,599', rating: 4.4, tag: 'Trending', img: '/image/women/brand/libas/p8.jpg' },
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
          <h1 className="page-title">Libas</h1>
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
              <h2 className="section-title">Libas Dresses 👗</h2>
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
              <h2 className="section-title">Libas Tops 👚</h2>
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
              <h2 className="section-title">Libas Pants & Palazzos 👖</h2>
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