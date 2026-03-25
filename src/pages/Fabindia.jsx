import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function Fabindia() {
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
    { id: 1101, name: 'Fabindia Floral Kurta Dress', price: '₹2,499', originalPrice: '₹3,999', rating: 4.6, tag: 'Bestseller', img: '/image/women/brand/fabindia/d1.jpg' },
    { id: 1102, name: 'Fabindia Block Print Dress', price: '₹2,799', originalPrice: '₹4,499', rating: 4.5, tag: 'New', img: '/image/women/brand/fabindia/d2.jpg' },
    { id: 1103, name: 'Fabindia Cotton Wrap Dress', price: '₹2,199', originalPrice: '₹3,499', rating: 4.4, tag: 'Trending', img: '/image/women/brand/fabindia/d3.jpg' },
    { id: 1104, name: 'Fabindia Handloom Shirt Dress', price: '₹1,999', originalPrice: '₹3,199', rating: 4.3, tag: null, img: '/image/women/brand/fabindia/d4.jpg' },
    { id: 1105, name: 'Fabindia Embroidered Dress', price: '₹3,199', originalPrice: '₹4,999', rating: 4.7, tag: 'Popular', img: '/image/women/brand/fabindia/d5.jpg' },
    { id: 1106, name: 'Fabindia Khadi Flared Dress', price: '₹1,799', originalPrice: '₹2,999', rating: 4.2, tag: 'Sale', img: '/image/women/brand/fabindia/d6.jpg' },
    { id: 1107, name: 'Fabindia Ikat Print Dress', price: '₹2,299', originalPrice: '₹3,699', rating: 4.3, tag: 'Sale', img: '/image/women/brand/fabindia/d7.jpg' },
    { id: 1108, name: 'Fabindia Festive Anarkali', price: '₹3,499', originalPrice: '₹5,499', rating: 4.8, tag: 'New', img: '/image/women/brand/fabindia/d8.jpg' },
  ]

  const tshirts = [
    { id: 1111, name: 'Fabindia Printed Kurta Top', price: '₹999', originalPrice: '₹1,599', rating: 4.4, tag: 'Bestseller', img: '/image/women/brand/fabindia/t1.jpg' },
    { id: 1112, name: 'Fabindia Embroidered Top', price: '₹1,199', originalPrice: '₹1,999', rating: 4.3, tag: 'Trending', img: '/image/women/brand/fabindia/t2.jpg' },
    { id: 1113, name: 'Fabindia Cotton Floral Top', price: '₹1,099', originalPrice: '₹1,799', rating: 4.5, tag: 'New', img: '/image/women/brand/fabindia/t3.jpg' },
    { id: 1114, name: 'Fabindia Solid Khadi Top', price: '₹899', originalPrice: '₹1,499', rating: 4.2, tag: null, img: '/image/women/brand/fabindia/t4.jpg' },
    { id: 1115, name: 'Fabindia Block Print Top', price: '₹1,049', originalPrice: '₹1,699', rating: 4.3, tag: 'Popular', img: '/image/women/brand/fabindia/t5.jpg' },
    { id: 1116, name: 'Fabindia Ikat Crop Top', price: '₹849', originalPrice: '₹1,399', rating: 4.1, tag: 'Sale', img: '/image/women/brand/fabindia/t6.jpg' },
    { id: 1117, name: 'Fabindia Handloom Printed Top', price: '₹1,249', originalPrice: '₹1,999', rating: 4.5, tag: 'New', img: '/image/women/brand/fabindia/t7.jpg' },
    { id: 1118, name: 'Fabindia Casual Cotton Top', price: '₹949', originalPrice: '₹1,549', rating: 4.2, tag: 'Sale', img: '/image/women/brand/fabindia/t8.jpg' },
  ]

  const jeans = [
    { id: 1121, name: 'Fabindia Printed Palazzo', price: '₹1,599', originalPrice: '₹2,599', rating: 4.5, tag: 'Bestseller', img: '/image/women/brand/fabindia/p1.jpg' },
    { id: 1122, name: 'Fabindia Wide Leg Pants', price: '₹1,799', originalPrice: '₹2,899', rating: 4.4, tag: 'Trending', img: '/image/women/brand/fabindia/p2.jpg' },
    { id: 1123, name: 'Fabindia Cotton Straight Pants', price: '₹1,399', originalPrice: '₹2,299', rating: 4.3, tag: 'New', img: '/image/women/brand/fabindia/p3.jpg' },
    { id: 1124, name: 'Fabindia Embroidered Pants', price: '₹1,999', originalPrice: '₹3,199', rating: 4.4, tag: null, img: '/image/women/brand/fabindia/p4.jpg' },
    { id: 1125, name: 'Fabindia Flared Khadi Pants', price: '₹1,699', originalPrice: '₹2,799', rating: 4.6, tag: 'Popular', img: '/image/women/brand/fabindia/p5.jpg' },
    { id: 1126, name: 'Fabindia Ikat Slim Pants', price: '₹1,299', originalPrice: '₹2,099', rating: 4.2, tag: 'Sale', img: '/image/women/brand/fabindia/p6.jpg' },
    { id: 1127, name: 'Fabindia Block Print Pants', price: '₹1,499', originalPrice: '₹2,399', rating: 4.3, tag: 'New', img: '/image/women/brand/fabindia/p7.jpg' },
    { id: 1128, name: 'Fabindia Festive Palazzo', price: '₹1,899', originalPrice: '₹2,999', rating: 4.5, tag: 'Trending', img: '/image/women/brand/fabindia/p8.jpg' },
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
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <h1 className="page-title">Fabindia</h1>
        </div>

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

        {(activeCategory === 'All' || activeCategory === 'Dresses') && (
          <>
            <div className="section-header">
              <h2 className="section-title">Fabindia Dresses 👗</h2>
            </div>
            <div className="product-grid">
              {dresses.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="divider" />
          </>
        )}

        {(activeCategory === 'All' || activeCategory === 'T-Shirts') && (
          <>
            <div className="section-header">
              <h2 className="section-title">Fabindia Tops 👚</h2>
            </div>
            <div className="product-grid">
              {tshirts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="divider" />
          </>
        )}

        {(activeCategory === 'All' || activeCategory === 'Jeans') && (
          <>
            <div className="section-header">
              <h2 className="section-title">Fabindia Pants & Palazzos 👖</h2>
            
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