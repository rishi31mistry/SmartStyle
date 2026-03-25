import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function VeroModa() {
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
    { id: 901, name: 'Vero Moda Floral Midi Dress', price: '₹2,299', originalPrice: '₹3,699', rating: 4.5, tag: 'Bestseller', img: '/image/women/brand/vero/d1.jpg' },
    { id: 902, name: 'Vero Moda Satin Wrap Dress', price: '₹2,599', originalPrice: '₹4,099', rating: 4.4, tag: 'New', img: '/image/women/brand/vero/d2.jpg' },
    { id: 903, name: 'Vero Moda Printed Mini Dress', price: '₹1,999', originalPrice: '₹3,299', rating: 4.3, tag: 'Trending', img: '/image/women/brand/vero/d3.jpg' },
    { id: 904, name: 'Vero Moda Linen Shirt Dress', price: '₹1,799', originalPrice: '₹2,999', rating: 4.2, tag: null, img: '/image/women/brand/vero/d4.jpg' },
    { id: 905, name: 'Vero Moda Bodycon Dress', price: '₹2,799', originalPrice: '₹4,499', rating: 4.6, tag: 'Popular', img: '/image/women/brand/vero/d5.jpg' },
    { id: 906, name: 'Vero Moda Cotton Sundress', price: '₹1,599', originalPrice: '₹2,599', rating: 4.2, tag: 'Sale', img: '/image/women/brand/vero/d6.jpg' },
    { id: 907, name: 'Vero Moda Ruffle Dress', price: '₹2,099', originalPrice: '₹3,399', rating: 4.3, tag: 'Sale', img: '/image/women/brand/vero/d7.jpg' },
    { id: 908, name: 'Vero Moda Maxi Boho Dress', price: '₹3,099', originalPrice: '₹4,999', rating: 4.7, tag: 'New', img: '/image/women/brand/vero/d8.jpg' },
  ]

  const tshirts = [
    { id: 911, name: 'Vero Moda Basic Crop Tee', price: '₹899', originalPrice: '₹1,499', rating: 4.3, tag: 'Bestseller', img: '/image/women/brand/vero/t1.jpg' },
    { id: 912, name: 'Vero Moda Graphic Print Tee', price: '₹1,099', originalPrice: '₹1,799', rating: 4.2, tag: 'Trending', img: '/image/women/brand/vero/t2.jpg' },
    { id: 913, name: 'Vero Moda Oversized Tee', price: '₹1,199', originalPrice: '₹1,999', rating: 4.4, tag: 'New', img: '/image/women/brand/vero/t3.jpg' },
    { id: 914, name: 'Vero Moda Ribbed Slim Tee', price: '₹799', originalPrice: '₹1,299', rating: 4.1, tag: null, img: '/image/women/brand/vero/t4.jpg' },
    { id: 915, name: 'Vero Moda Striped Tee', price: '₹949', originalPrice: '₹1,599', rating: 4.2, tag: 'Popular', img: '/image/women/brand/vero/t5.jpg' },
    { id: 916, name: 'Vero Moda V-Neck Tee', price: '₹749', originalPrice: '₹1,249', rating: 4.0, tag: 'Sale', img: '/image/women/brand/vero/t6.jpg' },
    { id: 917, name: 'Vero Moda Knotted Tee', price: '₹1,049', originalPrice: '₹1,749', rating: 4.5, tag: 'New', img: '/image/women/brand/vero/t7.jpg' },
    { id: 918, name: 'Vero Moda Cotton Round Neck Tee', price: '₹849', originalPrice: '₹1,399', rating: 4.1, tag: 'Sale', img: '/image/women/brand/vero/t8.jpg' },
  ]

  const jeans = [
    { id: 921, name: 'Vero Moda High Waist Skinny Jeans', price: '₹2,199', originalPrice: '₹3,499', rating: 4.5, tag: 'Bestseller', img: '/image/women/brand/vero/p1.jpg' },
    { id: 922, name: 'Vero Moda Wide Leg Jeans', price: '₹2,499', originalPrice: '₹3,999', rating: 4.4, tag: 'Trending', img: '/image/women/brand/vero/p2.jpg' },
    { id: 923, name: 'Vero Moda Straight Fit Jeans', price: '₹1,999', originalPrice: '₹3,199', rating: 4.3, tag: 'New', img: '/image/women/brand/vero/p3.jpg' },
    { id: 924, name: 'Vero Moda Mom Jeans', price: '₹2,299', originalPrice: '₹3,699', rating: 4.2, tag: null, img: '/image/women/brand/vero/p4.jpg' },
    { id: 925, name: 'Vero Moda Flared Jeans', price: '₹2,599', originalPrice: '₹4,199', rating: 4.6, tag: 'Popular', img: '/image/women/brand/vero/p5.jpg' },
    { id: 926, name: 'Vero Moda Ripped Jeans', price: '₹1,899', originalPrice: '₹2,999', rating: 4.1, tag: 'Sale', img: '/image/women/brand/vero/p6.jpg' },
    { id: 927, name: 'Vero Moda Cropped Jeans', price: '₹2,099', originalPrice: '₹3,399', rating: 4.3, tag: 'New', img: '/image/women/brand/vero/p7.jpg' },
    { id: 928, name: 'Vero Moda Boyfriend Jeans', price: '₹2,399', originalPrice: '₹3,799', rating: 4.4, tag: 'Trending', img: '/image/women/brand/vero/p8.jpg' },
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
          <h1 className="page-title">Vero Moda</h1>
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
              <h2 className="section-title">Vero Moda Dresses 👗</h2>
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
              <h2 className="section-title">Vero Moda T-Shirts 👕</h2>
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
              <h2 className="section-title">Vero Moda Jeans 👖</h2>
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