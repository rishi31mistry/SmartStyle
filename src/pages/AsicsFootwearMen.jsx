import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function AsicsFootwearMen() {
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
    { id: 701, name: 'ASICS Gel-Nimbus 26', price: '₹15,999', originalPrice: '₹20,999', rating: 4.8, tag: 'Bestseller', img: '/image/footwear/men/brand/asics/a1.jpg' },
    { id: 702, name: 'ASICS Gel-Kayano 31', price: '₹14,999', originalPrice: '₹19,999', rating: 4.7, tag: 'New', img: '/image/footwear/men/brand/asics/a2.jpg' },
    { id: 703, name: 'ASICS Gel-Cumulus 26', price: '₹11,999', originalPrice: '₹15,999', rating: 4.6, tag: 'Sale', img: '/image/footwear/men/brand/asics/a3.jpg' },
    { id: 704, name: 'ASICS Gel-Contend 9', price: '₹4,999', originalPrice: '₹6,999', rating: 4.3, tag: null, img: '/image/footwear/men/brand/asics/a4.jpg' },
    { id: 705, name: 'ASICS GT-2000 13', price: '₹9,999', originalPrice: '₹13,999', rating: 4.6, tag: 'Trending', img: '/image/footwear/men/brand/asics/a5.jpg' },
    { id: 706, name: 'ASICS Gel-Excite 10', price: '₹5,999', originalPrice: '₹8,499', rating: 4.4, tag: 'Popular', img: '/image/footwear/men/brand/asics/a6.jpg' },
    { id: 707, name: 'ASICS Metaspeed Sky+', price: '₹19,999', originalPrice: '₹25,999', rating: 4.9, tag: null, img: '/image/footwear/men/brand/asics/a7.jpg' },
    { id: 708, name: 'ASICS Gel-Venture 9', price: '₹3,999', originalPrice: '₹5,999', rating: 4.2, tag: 'Sale', img: '/image/footwear/men/brand/asics/a8.jpg' },
  ]

  const sneakers = [
    { id: 711, name: 'ASICS Gel-1130', price: '₹8,999', originalPrice: '₹11,999', rating: 4.8, tag: 'Bestseller', img: '/image/footwear/men/brand/asics/b1.jpg' },
    { id: 712, name: 'ASICS Gel-NYC', price: '₹9,999', originalPrice: '₹13,499', rating: 4.7, tag: 'Trending', img: '/image/footwear/men/brand/asics/b2.jpg' },
    { id: 713, name: 'ASICS Gel-Lyte III OG', price: '₹7,999', originalPrice: '₹10,999', rating: 4.5, tag: 'New', img: '/image/footwear/men/brand/asics/b3.jpg' },
    { id: 714, name: 'ASICS Gel-Terrain', price: '₹8,499', originalPrice: '₹11,499', rating: 4.4, tag: null, img: '/image/footwear/men/brand/asics/b4.jpg' },
    { id: 715, name: 'ASICS Gel-1090v2', price: '₹7,499', originalPrice: '₹9,999', rating: 4.5, tag: 'Popular', img: '/image/footwear/men/brand/asics/b5.jpg' },
    { id: 716, name: 'ASICS Gel-Quantum 360 VIII', price: '₹12,999', originalPrice: '₹16,999', rating: 4.6, tag: 'Bestseller', img: '/image/footwear/men/brand/asics/b6.jpg' },
    { id: 717, name: 'ASICS Gel-PTG', price: '₹6,999', originalPrice: '₹9,499', rating: 4.4, tag: 'New', img: '/image/footwear/men/brand/asics/b7.jpg' },
    { id: 718, name: 'ASICS Japan S', price: '₹5,999', originalPrice: '₹7,999', rating: 4.3, tag: 'Sale', img: '/image/footwear/men/brand/asics/b8.jpg' },
  ]

  const flipFlops = [
    { id: 721, name: 'ASICS Gel-Slide Sandal', price: '₹1,999', originalPrice: '₹2,999', rating: 4.5, tag: 'Bestseller', img: '/image/footwear/men/brand/asics/c1.jpg' },
    { id: 722, name: 'ASICS Flip Flop SP', price: '₹1,299', originalPrice: '₹1,999', rating: 4.4, tag: 'New', img: '/image/footwear/men/brand/asics/c2.jpg' },
    { id: 723, name: 'ASICS Gel-Relaxed Slide', price: '₹1,499', originalPrice: '₹2,199', rating: 4.3, tag: 'Sale', img: '/image/footwear/men/brand/asics/c3.jpg' },
    { id: 724, name: 'ASICS Recover Slide', price: '₹2,299', originalPrice: '₹3,199', rating: 4.6, tag: 'Trending', img: '/image/footwear/men/brand/asics/c4.jpg' },
    { id: 725, name: 'ASICS Gel-Mossa Flip', price: '₹1,199', originalPrice: '₹1,799', rating: 4.2, tag: null, img: '/image/footwear/men/brand/asics/c5.jpg' },
    { id: 726, name: 'ASICS Gel-Comfort Slide', price: '₹2,499', originalPrice: '₹3,299', rating: 4.5, tag: 'Popular', img: '/image/footwear/men/brand/asics/c6.jpg' },
    { id: 727, name: 'ASICS Sport Thong', price: '₹999', originalPrice: '₹1,499', rating: 4.1, tag: 'Sale', img: '/image/footwear/men/brand/asics/c7.jpg' },
    { id: 728, name: 'ASICS Gel-Bright Slide', price: '₹1,799', originalPrice: '₹2,499', rating: 4.4, tag: 'New', img: '/image/footwear/men/brand/asics/c8.jpg' },
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
          <h1 className="page-title">ASICS Footwear</h1>
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
              <h2 className="section-title">ASICS Sport Shoes 👟</h2>
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
              <h2 className="section-title">ASICS Sneakers 🔥</h2>
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
              <h2 className="section-title">ASICS Flip-Flops & Slides 🩴</h2>
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