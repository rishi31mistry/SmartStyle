import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function Shein() {
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
    { id: 1001, name: 'Shein Floral Midi Dress', price: '₹999', originalPrice: '₹1,799', rating: 4.3, tag: 'Bestseller', img: '/image/women/brand/shein/d1.jpg' },
    { id: 1002, name: 'Shein Satin Wrap Dress', price: '₹1,199', originalPrice: '₹2,099', rating: 4.2, tag: 'New', img: '/image/women/brand/shein/d2.jpg' },
    { id: 1003, name: 'Shein Printed Mini Dress', price: '₹899', originalPrice: '₹1,599', rating: 4.1, tag: 'Trending', img: '/image/women/brand/shein/d3.jpg' },
    { id: 1004, name: 'Shein Linen Shirt Dress', price: '₹799', originalPrice: '₹1,399', rating: 4.0, tag: null, img: '/image/women/brand/shein/d4.jpg' },
    { id: 1005, name: 'Shein Bodycon Dress', price: '₹1,299', originalPrice: '₹2,299', rating: 4.4, tag: 'Popular', img: '/image/women/brand/shein/d5.jpg' },
    { id: 1006, name: 'Shein Cotton Sundress', price: '₹699', originalPrice: '₹1,299', rating: 4.1, tag: 'Sale', img: '/image/women/brand/shein/d6.jpg' },
    { id: 1007, name: 'Shein Ruffle Mini Dress', price: '₹949', originalPrice: '₹1,699', rating: 4.2, tag: 'Sale', img: '/image/women/brand/shein/d7.jpg' },
    { id: 1008, name: 'Shein Maxi Boho Dress', price: '₹1,499', originalPrice: '₹2,599', rating: 4.5, tag: 'New', img: '/image/women/brand/shein/d8.jpg' },
  ]

  const tshirts = [
    { id: 1011, name: 'Shein Basic Crop Tee', price: '₹399', originalPrice: '₹699', rating: 4.1, tag: 'Bestseller', img: '/image/women/brand/shein/t1.jpg' },
    { id: 1012, name: 'Shein Graphic Print Tee', price: '₹499', originalPrice: '₹899', rating: 4.0, tag: 'Trending', img: '/image/women/brand/shein/t2.jpg' },
    { id: 1013, name: 'Shein Oversized Tee', price: '₹549', originalPrice: '₹999', rating: 4.2, tag: 'New', img: '/image/women/brand/shein/t3.jpg' },
    { id: 1014, name: 'Shein Ribbed Slim Tee', price: '₹349', originalPrice: '₹649', rating: 4.0, tag: null, img: '/image/women/brand/shein/t4.jpg' },
    { id: 1015, name: 'Shein Striped Tee', price: '₹449', originalPrice: '₹799', rating: 4.1, tag: 'Popular', img: '/image/women/brand/shein/t5.jpg' },
    { id: 1016, name: 'Shein V-Neck Tee', price: '₹299', originalPrice: '₹599', rating: 3.9, tag: 'Sale', img: '/image/women/brand/shein/t6.jpg' },
    { id: 1017, name: 'Shein Knotted Tee', price: '₹599', originalPrice: '₹1,099', rating: 4.3, tag: 'New', img: '/image/women/brand/shein/t7.jpg' },
    { id: 1018, name: 'Shein Cotton Round Neck Tee', price: '₹399', originalPrice: '₹749', rating: 4.0, tag: 'Sale', img: '/image/women/brand/shein/t8.jpg' },
  ]

  const jeans = [
    { id: 1021, name: 'Shein High Waist Skinny Jeans', price: '₹999', originalPrice: '₹1,799', rating: 4.2, tag: 'Bestseller', img: '/image/women/brand/shein/p1.jpg' },
    { id: 1022, name: 'Shein Wide Leg Jeans', price: '₹1,199', originalPrice: '₹2,099', rating: 4.1, tag: 'Trending', img: '/image/women/brand/shein/p2.jpg' },
    { id: 1023, name: 'Shein Straight Fit Jeans', price: '₹899', originalPrice: '₹1,599', rating: 4.0, tag: 'New', img: '/image/women/brand/shein/p3.jpg' },
    { id: 1024, name: 'Shein Mom Jeans', price: '₹1,099', originalPrice: '₹1,899', rating: 4.1, tag: null, img: '/image/women/brand/shein/p4.jpg' },
    { id: 1025, name: 'Shein Flared Jeans', price: '₹1,299', originalPrice: '₹2,299', rating: 4.3, tag: 'Popular', img: '/image/women/brand/shein/p5.jpg' },
    { id: 1026, name: 'Shein Ripped Jeans', price: '₹849', originalPrice: '₹1,499', rating: 4.0, tag: 'Sale', img: '/image/women/brand/shein/p6.jpg' },
    { id: 1027, name: 'Shein Cropped Jeans', price: '₹949', originalPrice: '₹1,699', rating: 4.1, tag: 'New', img: '/image/women/brand/shein/p7.jpg' },
    { id: 1028, name: 'Shein Boyfriend Jeans', price: '₹1,149', originalPrice: '₹1,999', rating: 4.2, tag: 'Trending', img: '/image/women/brand/shein/p8.jpg' },
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
          <h1 className="page-title">Shein</h1>
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
              <h2 className="section-title">Shein Dresses 👗</h2>
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
              <h2 className="section-title">Shein T-Shirts 👕</h2>
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
              <h2 className="section-title">Shein Jeans 👖</h2>
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