import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function NewBalanceFootwearMen() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  const categories = [
    { name: 'All', count: 24 },
    { name: 'Sport Shoes', count: 8 },
    { name: 'Sneakers', count: 8 },
    { name: 'Flip-Flops', count: 8 },
  ]

  const sportShoes = [
    { id: 601, name: 'New Balance Fresh Foam X 1080v13', price: '₹14,999', originalPrice: '₹19,999', rating: 4.8, tag: 'Bestseller', img: '/image/footwear/men/brand/nb/a1.jpg' },
    { id: 602, name: 'New Balance 860v13', price: '₹10,999', originalPrice: '₹14,999', rating: 4.7, tag: 'New', img: '/image/footwear/men/brand/nb/a2.jpg' },
    { id: 603, name: 'New Balance 680v7', price: '₹5,999', originalPrice: '₹8,999', rating: 4.4, tag: 'Sale', img: '/image/footwear/men/brand/nb/a3.jpg' },
    { id: 604, name: 'New Balance 411v3', price: '₹3,999', originalPrice: '₹5,999', rating: 4.3, tag: null, img: '/image/footwear/men/brand/nb/a4.jpg' },
    { id: 605, name: 'New Balance FuelCell Rebel v4', price: '₹12,999', originalPrice: '₹17,999', rating: 4.6, tag: 'Trending', img: '/image/footwear/men/brand/nb/a5.jpg' },
    { id: 606, name: 'New Balance Fresh Foam 880v13', price: '₹9,999', originalPrice: '₹13,999', rating: 4.5, tag: 'Popular', img: '/image/footwear/men/brand/nb/a6.jpg' },
    { id: 607, name: 'New Balance SC Elite v4', price: '₹17,999', originalPrice: '₹22,999', rating: 4.7, tag: null, img: '/image/footwear/men/brand/nb/a7.jpg' },
    { id: 608, name: 'New Balance 520v8', price: '₹4,499', originalPrice: '₹6,499', rating: 4.2, tag: 'Sale', img: '/image/footwear/men/brand/nb/a8.jpg' },
  ]

  const sneakers = [
    { id: 611, name: 'New Balance 574 Core', price: '₹7,499', originalPrice: '₹9,999', rating: 4.8, tag: 'Bestseller', img: '/image/footwear/men/brand/nb/b1.jpg' },
    { id: 612, name: 'New Balance 990v6', price: '₹18,999', originalPrice: '₹24,999', rating: 4.7, tag: 'Trending', img: '/image/footwear/men/brand/nb/b2.jpg' },
    { id: 613, name: 'New Balance 550', price: '₹8,999', originalPrice: '₹11,999', rating: 4.6, tag: 'New', img: '/image/footwear/men/brand/nb/b3.jpg' },
    { id: 614, name: 'New Balance 327', price: '₹7,999', originalPrice: '₹10,999', rating: 4.5, tag: null, img: '/image/footwear/men/brand/nb/b4.jpg' },
    { id: 615, name: 'New Balance 9060', price: '₹11,999', originalPrice: '₹15,999', rating: 4.6, tag: 'Popular', img: '/image/footwear/men/brand/nb/b5.jpg' },
    { id: 616, name: 'New Balance 2002R', price: '₹10,999', originalPrice: '₹14,999', rating: 4.7, tag: 'Bestseller', img: '/image/footwear/men/brand/nb/b6.jpg' },
    { id: 617, name: 'New Balance 1906R', price: '₹12,499', originalPrice: '₹16,999', rating: 4.6, tag: 'New', img: '/image/footwear/men/brand/nb/b7.jpg' },
    { id: 618, name: 'New Balance 373 Core', price: '₹5,499', originalPrice: '₹7,499', rating: 4.3, tag: 'Sale', img: '/image/footwear/men/brand/nb/b8.jpg' },
  ]

  const flipFlops = [
    { id: 621, name: 'New Balance Came Slide', price: '₹1,999', originalPrice: '₹2,999', rating: 4.5, tag: 'Bestseller', img: '/image/footwear/men/brand/nb/c1.jpg' },
    { id: 622, name: 'New Balance 200 Flip Flop', price: '₹1,499', originalPrice: '₹2,199', rating: 4.4, tag: 'New', img: '/image/footwear/men/brand/nb/c2.jpg' },
    { id: 623, name: 'New Balance Piscean Slide', price: '₹1,299', originalPrice: '₹1,999', rating: 4.3, tag: 'Sale', img: '/image/footwear/men/brand/nb/c3.jpg' },
    { id: 624, name: 'New Balance Recharge Slide', price: '₹2,199', originalPrice: '₹2,999', rating: 4.6, tag: 'Trending', img: '/image/footwear/men/brand/nb/c4.jpg' },
    { id: 625, name: 'New Balance Cruz V2 Slide', price: '₹1,799', originalPrice: '₹2,499', rating: 4.4, tag: null, img: '/image/footwear/men/brand/nb/c5.jpg' },
    { id: 626, name: 'New Balance Nubuck Slide', price: '₹2,499', originalPrice: '₹3,299', rating: 4.5, tag: 'Popular', img: '/image/footwear/men/brand/nb/c6.jpg' },
    { id: 627, name: 'New Balance Comfort Thong', price: '₹1,099', originalPrice: '₹1,699', rating: 4.2, tag: 'Sale', img: '/image/footwear/men/brand/nb/c7.jpg' },
    { id: 628, name: 'New Balance Sport Slide', price: '₹1,699', originalPrice: '₹2,399', rating: 4.3, tag: 'New', img: '/image/footwear/men/brand/nb/c8.jpg' },
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

      <div className="wrapper_men">

        {/* Header */}
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <h1 className="page-title">New Balance Footwear</h1>
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
                background: activeCategory === cat.name ? '#111' : '#fff',
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

        {/* Sport Shoes Section */}
        {(activeCategory === 'All' || activeCategory === 'Sport Shoes') && (
          <>
            <div className="section-header">
              <h2 className="section-title">New Balance Sport Shoes 👟</h2>
            </div>
            <div className="product-grid">
              {sportShoes.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="divider" />
          </>
        )}

        {/* Sneakers Section */}
        {(activeCategory === 'All' || activeCategory === 'Sneakers') && (
          <>
            <div className="section-header">
              <h2 className="section-title">New Balance Sneakers 🔥</h2>
            </div>
            <div className="product-grid">
              {sneakers.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="divider" />
          </>
        )}

        {/* Flip-Flops Section */}
        {(activeCategory === 'All' || activeCategory === 'Flip-Flops') && (
          <>
            <div className="section-header">
              <h2 className="section-title">New Balance Flip-Flops & Slides 🩴</h2>
            </div>
            <div className="product-grid">
              {flipFlops.map(p => <ProductCard key={p.id} product={p} />)}
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