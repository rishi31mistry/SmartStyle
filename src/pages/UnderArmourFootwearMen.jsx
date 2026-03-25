import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function UnderArmourFootwearMen() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  const categories = [
    { name: 'All', count: 16 },
    { name: 'Sport Shoes', count: 8 },
    { name: 'Flip-Flops', count: 8 },
  ]

  const sportShoes = [
    { id: 1001, name: 'UA HOVR Sonic 6', price: '₹8,999', originalPrice: '₹12,999', rating: 4.7, tag: 'Bestseller', img: '/image/footwear/men/brand/ua/a1.jpg' },
    { id: 1002, name: 'UA HOVR Machina 3', price: '₹11,999', originalPrice: '₹15,999', rating: 4.8, tag: 'New', img: '/image/footwear/men/brand/ua/a2.jpg' },
    { id: 1003, name: 'UA Charged Pursuit 3', price: '₹4,999', originalPrice: '₹6,999', rating: 4.5, tag: 'Sale', img: '/image/footwear/men/brand/ua/a3.jpg' },
    { id: 1004, name: 'UA Charged Assert 10', price: '₹3,999', originalPrice: '₹5,999', rating: 4.3, tag: null, img: '/image/footwear/men/brand/ua/a4.jpg' },
    { id: 1005, name: 'UA Infinite Elite', price: '₹13,999', originalPrice: '₹18,999', rating: 4.6, tag: 'Trending', img: '/image/footwear/men/brand/ua/a5.jpg' },
    { id: 1006, name: 'UA Charged Rogue 4', price: '₹6,999', originalPrice: '₹9,999', rating: 4.5, tag: 'Popular', img: '/image/footwear/men/brand/ua/a6.jpg' },
    { id: 1007, name: 'UA Project Rock 6', price: '₹12,999', originalPrice: '₹17,999', rating: 4.7, tag: null, img: '/image/footwear/men/brand/ua/a7.jpg' },
    { id: 1008, name: 'UA Charged Breathe 2', price: '₹3,499', originalPrice: '₹5,499', rating: 4.2, tag: 'Sale', img: '/image/footwear/men/brand/ua/a8.jpg' },
  ]

  const flipFlops = [
    { id: 1011, name: 'UA Ansa Fixed Slide', price: '₹1,999', originalPrice: '₹2,999', rating: 4.5, tag: 'Bestseller', img: '/image/footwear/men/brand/ua/b1.jpg' },
    { id: 1012, name: 'UA Ignite Select Slide', price: '₹2,299', originalPrice: '₹3,199', rating: 4.6, tag: 'New', img: '/image/footwear/men/brand/ua/b2.jpg' },
    { id: 1013, name: 'UA Locker IV Slide', price: '₹1,499', originalPrice: '₹2,199', rating: 4.3, tag: 'Sale', img: '/image/footwear/men/brand/ua/b3.jpg' },
    { id: 1014, name: 'UA Ignite Pro Slide', price: '₹1,799', originalPrice: '₹2,599', rating: 4.4, tag: null, img: '/image/footwear/men/brand/ua/b4.jpg' },
    { id: 1015, name: 'UA Ansa Graphic Slide', price: '₹1,699', originalPrice: '₹2,399', rating: 4.2, tag: 'Trending', img: '/image/footwear/men/brand/ua/b5.jpg' },
    { id: 1016, name: 'UA Core Flip Flop', price: '₹1,299', originalPrice: '₹1,899', rating: 4.3, tag: 'Popular', img: '/image/footwear/men/brand/ua/b6.jpg' },
    { id: 1017, name: 'UA Ignite Boundless Slide', price: '₹2,499', originalPrice: '₹3,299', rating: 4.5, tag: 'New', img: '/image/footwear/men/brand/ua/b7.jpg' },
    { id: 1018, name: 'UA Sport Flip Flop', price: '₹999', originalPrice: '₹1,499', rating: 4.1, tag: 'Sale', img: '/image/footwear/men/brand/ua/b8.jpg' },
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
          <h1 className="page-title">Under Armour Footwear</h1>
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
              <h2 className="section-title">Under Armour Sport Shoes 👟</h2>
            </div>
            <div className="product-grid">
              {sportShoes.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="divider" />
          </>
        )}

        {/* Flip-Flops Section */}
        {(activeCategory === 'All' || activeCategory === 'Flip-Flops') && (
          <>
            <div className="section-header">
              <h2 className="section-title">Under Armour Flip-Flops & Slides 🩴</h2>
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