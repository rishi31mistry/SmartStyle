import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function BataFootwearMen() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  const categories = [
    { name: 'All', count: 16 },
    { name: 'Formal Shoes', count: 8 },
    { name: 'Flip-Flops', count: 8 },
  ]

  const formalShoes = [
    { id: 1101, name: 'Bata Classic Oxford Lace-Up', price: '₹2,999', originalPrice: '₹4,499', rating: 4.6, tag: 'Bestseller', img: '/image/footwear/men/brand/bata/a1.jpg' },
    { id: 1102, name: 'Bata Leather Derby Shoe', price: '₹3,499', originalPrice: '₹4,999', rating: 4.5, tag: 'New', img: '/image/footwear/men/brand/bata/a2.jpg' },
    { id: 1103, name: 'Bata Formal Slip-On', price: '₹2,499', originalPrice: '₹3,699', rating: 4.4, tag: 'Sale', img: '/image/footwear/men/brand/bata/a3.jpg' },
    { id: 1104, name: 'Bata Brogue Formal Shoe', price: '₹3,199', originalPrice: '₹4,799', rating: 4.3, tag: null, img: '/image/footwear/men/brand/bata/a4.jpg' },
    { id: 1105, name: 'Bata Patent Leather Shoe', price: '₹3,999', originalPrice: '₹5,499', rating: 4.5, tag: 'Trending', img: '/image/footwear/men/brand/bata/a5.jpg' },
    { id: 1106, name: 'Bata Monk Strap Formal', price: '₹3,699', originalPrice: '₹5,199', rating: 4.6, tag: 'Popular', img: '/image/footwear/men/brand/bata/a6.jpg' },
    { id: 1107, name: 'Bata Textured Cap Toe', price: '₹2,799', originalPrice: '₹3,999', rating: 4.4, tag: null, img: '/image/footwear/men/brand/bata/a7.jpg' },
    { id: 1108, name: 'Bata Budget Formal Lace-Up', price: '₹1,799', originalPrice: '₹2,799', rating: 4.2, tag: 'Sale', img: '/image/footwear/men/brand/bata/a8.jpg' },
  ]

  const flipFlops = [
    { id: 1111, name: 'Bata Comfit Slide', price: '₹599', originalPrice: '₹999', rating: 4.4, tag: 'Bestseller', img: '/image/footwear/men/brand/bata/b1.jpg' },
    { id: 1112, name: 'Bata Hawai Flip Flop', price: '₹299', originalPrice: '₹499', rating: 4.3, tag: 'New', img: '/image/footwear/men/brand/bata/b2.jpg' },
    { id: 1113, name: 'Bata Relaxed Slide', price: '₹499', originalPrice: '₹799', rating: 4.2, tag: 'Sale', img: '/image/footwear/men/brand/bata/b3.jpg' },
    { id: 1114, name: 'Bata EVA Comfort Slide', price: '₹699', originalPrice: '₹1,099', rating: 4.3, tag: null, img: '/image/footwear/men/brand/bata/b4.jpg' },
    { id: 1115, name: 'Bata Cushion Flip Flop', price: '₹399', originalPrice: '₹699', rating: 4.1, tag: 'Trending', img: '/image/footwear/men/brand/bata/b5.jpg' },
    { id: 1116, name: 'Bata Sport Slide', price: '₹799', originalPrice: '₹1,199', rating: 4.4, tag: 'Popular', img: '/image/footwear/men/brand/bata/b6.jpg' },
    { id: 1117, name: 'Bata Classic Thong', price: '₹349', originalPrice: '₹599', rating: 4.0, tag: 'Sale', img: '/image/footwear/men/brand/bata/b7.jpg' },
    { id: 1118, name: 'Bata Arch Support Slide', price: '₹899', originalPrice: '₹1,299', rating: 4.5, tag: 'New', img: '/image/footwear/men/brand/bata/b8.jpg' },
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
          <h1 className="page-title">Bata Footwear</h1>
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

        {/* Formal Shoes Section */}
        {(activeCategory === 'All' || activeCategory === 'Formal Shoes') && (
          <>
            <div className="section-header">
              <h2 className="section-title">Bata Formal Shoes 👞</h2>
            </div>
            <div className="product-grid">
              {formalShoes.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="divider" />
          </>
        )}

        {/* Flip-Flops Section */}
        {(activeCategory === 'All' || activeCategory === 'Flip-Flops') && (
          <>
            <div className="section-header">
              <h2 className="section-title">Bata Flip-Flops & Slides 🩴</h2>
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