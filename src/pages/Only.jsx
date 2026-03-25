import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function Only() {
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
    { id: 1201, name: 'Only Floral Midi Dress', price: '₹2,199', originalPrice: '₹3,499', rating: 4.5, tag: 'Bestseller', img: '/image/women/brand/only/d1.jpg' },
    { id: 1202, name: 'Only Satin Wrap Dress', price: '₹2,499', originalPrice: '₹3,999', rating: 4.4, tag: 'New', img: '/image/women/brand/only/d2.jpg' },
    { id: 1203, name: 'Only Printed Mini Dress', price: '₹1,899', originalPrice: '₹2,999', rating: 4.3, tag: 'Trending', img: '/image/women/brand/only/d3.jpg' },
    { id: 1204, name: 'Only Linen Shirt Dress', price: '₹1,699', originalPrice: '₹2,799', rating: 4.2, tag: null, img: '/image/women/brand/only/d4.jpg' },
    { id: 1205, name: 'Only Bodycon Dress', price: '₹2,699', originalPrice: '₹4,299', rating: 4.6, tag: 'Popular', img: '/image/women/brand/only/d5.jpg' },
    { id: 1206, name: 'Only Cotton Sundress', price: '₹1,499', originalPrice: '₹2,399', rating: 4.2, tag: 'Sale', img: '/image/women/brand/only/d6.jpg' },
    { id: 1207, name: 'Only Ruffle Mini Dress', price: '₹1,999', originalPrice: '₹3,199', rating: 4.3, tag: 'Sale', img: '/image/women/brand/only/d7.jpg' },
    { id: 1208, name: 'Only Maxi Boho Dress', price: '₹2,899', originalPrice: '₹4,699', rating: 4.7, tag: 'New', img: '/image/women/brand/only/d8.jpg' },
  ]

  const tshirts = [
    { id: 1211, name: 'Only Basic Crop Tee', price: '₹849', originalPrice: '₹1,399', rating: 4.3, tag: 'Bestseller', img: '/image/women/brand/only/t1.jpg' },
    { id: 1212, name: 'Only Graphic Print Tee', price: '₹999', originalPrice: '₹1,699', rating: 4.2, tag: 'Trending', img: '/image/women/brand/only/t2.jpg' },
    { id: 1213, name: 'Only Oversized Tee', price: '₹1,099', originalPrice: '₹1,799', rating: 4.4, tag: 'New', img: '/image/women/brand/only/t3.jpg' },
    { id: 1214, name: 'Only Ribbed Slim Tee', price: '₹749', originalPrice: '₹1,249', rating: 4.1, tag: null, img: '/image/women/brand/only/t4.jpg' },
    { id: 1215, name: 'Only Striped Tee', price: '₹899', originalPrice: '₹1,499', rating: 4.2, tag: 'Popular', img: '/image/women/brand/only/t5.jpg' },
    { id: 1216, name: 'Only V-Neck Tee', price: '₹699', originalPrice: '₹1,149', rating: 4.0, tag: 'Sale', img: '/image/women/brand/only/t6.jpg' },
    { id: 1217, name: 'Only Knotted Tee', price: '₹999', originalPrice: '₹1,649', rating: 4.4, tag: 'New', img: '/image/women/brand/only/t7.jpg' },
    { id: 1218, name: 'Only Cotton Round Neck Tee', price: '₹799', originalPrice: '₹1,299', rating: 4.1, tag: 'Sale', img: '/image/women/brand/only/t8.jpg' },
  ]

  const jeans = [
    { id: 1221, name: 'Only High Waist Skinny Jeans', price: '₹2,099', originalPrice: '₹3,299', rating: 4.5, tag: 'Bestseller', img: '/image/women/brand/only/p1.jpg' },
    { id: 1222, name: 'Only Wide Leg Jeans', price: '₹2,399', originalPrice: '₹3,799', rating: 4.4, tag: 'Trending', img: '/image/women/brand/only/p2.jpg' },
    { id: 1223, name: 'Only Straight Fit Jeans', price: '₹1,899', originalPrice: '₹2,999', rating: 4.3, tag: 'New', img: '/image/women/brand/only/p3.jpg' },
    { id: 1224, name: 'Only Mom Jeans', price: '₹2,199', originalPrice: '₹3,499', rating: 4.2, tag: null, img: '/image/women/brand/only/p4.jpg' },
    { id: 1225, name: 'Only Flared Jeans', price: '₹2,499', originalPrice: '₹3,999', rating: 4.6, tag: 'Popular', img: '/image/women/brand/only/p5.jpg' },
    { id: 1226, name: 'Only Ripped Jeans', price: '₹1,799', originalPrice: '₹2,899', rating: 4.1, tag: 'Sale', img: '/image/women/brand/only/p6.jpg' },
    { id: 1227, name: 'Only Cropped Jeans', price: '₹1,999', originalPrice: '₹3,199', rating: 4.3, tag: 'New', img: '/image/women/brand/only/p7.jpg' },
    { id: 1228, name: 'Only Boyfriend Jeans', price: '₹2,299', originalPrice: '₹3,699', rating: 4.4, tag: 'Trending', img: '/image/women/brand/only/p8.jpg' },
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
          <h1 className="page-title">Only</h1>
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
              <h2 className="section-title">Only Dresses 👗</h2>
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
              <h2 className="section-title">Only T-Shirts 👕</h2>
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
              <h2 className="section-title">Only Jeans 👖</h2>
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