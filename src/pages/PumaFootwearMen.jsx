import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function PumaFootwearMen() {
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
    { id: 501, name: 'Puma Velocity Nitro 3', price: '₹9,999', originalPrice: '₹13,999', rating: 4.7, tag: 'Bestseller', img: '/image/footwear/men/brand/puma/a1.jpg' },
    { id: 502, name: 'Puma Deviate Nitro 2', price: '₹12,999', originalPrice: '₹17,999', rating: 4.8, tag: 'New', img: '/image/footwear/men/brand/puma/a2.jpg' },
    { id: 503, name: 'Puma Electrify Nitro 2', price: '₹7,999', originalPrice: '₹10,999', rating: 4.5, tag: 'Sale', img: '/image/footwear/men/brand/puma/a3.jpg' },
    { id: 504, name: 'Puma Softride Premier', price: '₹4,499', originalPrice: '₹6,499', rating: 4.3, tag: null, img: '/image/footwear/men/brand/puma/a4.jpg' },
    { id: 505, name: 'Puma Magnify Nitro 2', price: '₹10,999', originalPrice: '₹14,999', rating: 4.6, tag: 'Trending', img: '/image/footwear/men/brand/puma/a5.jpg' },
    { id: 506, name: 'Puma Eternity Nitro 2', price: '₹8,499', originalPrice: '₹11,999', rating: 4.5, tag: 'Popular', img: '/image/footwear/men/brand/puma/a6.jpg' },
    { id: 507, name: 'Puma Fast-R Nitro Elite', price: '₹14,999', originalPrice: '₹19,999', rating: 4.7, tag: null, img: '/image/footwear/men/brand/puma/a7.jpg' },
    { id: 508, name: 'Puma Resolve Street', price: '₹3,999', originalPrice: '₹5,999', rating: 4.2, tag: 'Sale', img: '/image/footwear/men/brand/puma/a8.jpg' },
  ]

  const sneakers = [
    { id: 511, name: 'Puma Suede Classic XXI', price: '₹5,999', originalPrice: '₹7,999', rating: 4.7, tag: 'Bestseller', img: '/image/footwear/men/brand/puma/b1.jpg' },
    { id: 512, name: 'Puma RS-X Efekt', price: '₹8,999', originalPrice: '₹11,999', rating: 4.6, tag: 'Trending', img: '/image/footwear/men/brand/puma/b2.jpg' },
    { id: 513, name: 'Puma Clyde All-Pro', price: '₹7,499', originalPrice: '₹9,999', rating: 4.5, tag: 'New', img: '/image/footwear/men/brand/puma/b3.jpg' },
    { id: 514, name: 'Puma Slipstream Lo', price: '₹6,999', originalPrice: '₹9,499', rating: 4.4, tag: null, img: '/image/footwear/men/brand/puma/b4.jpg' },
    { id: 515, name: 'Puma Cali Dream', price: '₹6,499', originalPrice: '₹8,999', rating: 4.5, tag: 'Popular', img: '/image/footwear/men/brand/puma/b5.jpg' },
    { id: 516, name: 'Puma Future Rider Play On', price: '₹5,499', originalPrice: '₹7,499', rating: 4.4, tag: 'Sale', img: '/image/footwear/men/brand/puma/b6.jpg' },
    { id: 517, name: 'Puma Mayze Classic', price: '₹7,999', originalPrice: '₹10,999', rating: 4.6, tag: 'New', img: '/image/footwear/men/brand/puma/b7.jpg' },
    { id: 518, name: 'Puma Smash V2', price: '₹3,999', originalPrice: '₹5,499', rating: 4.3, tag: null, img: '/image/footwear/men/brand/puma/b8.jpg' },
  ]

  const flipFlops = [
    { id: 521, name: 'Puma Popcat 20', price: '₹1,299', originalPrice: '₹1,999', rating: 4.5, tag: 'Bestseller', img: '/image/footwear/men/brand/puma/c1.jpg' },
    { id: 522, name: 'Puma Leadcat 2.0', price: '₹1,499', originalPrice: '₹2,199', rating: 4.4, tag: 'New', img: '/image/footwear/men/brand/puma/c2.jpg' },
    { id: 523, name: 'Puma Divecat v2', price: '₹999', originalPrice: '₹1,599', rating: 4.3, tag: 'Sale', img: '/image/footwear/men/brand/puma/c3.jpg' },
    { id: 524, name: 'Puma Softride Slide', price: '₹1,799', originalPrice: '₹2,499', rating: 4.6, tag: 'Trending', img: '/image/footwear/men/brand/puma/c4.jpg' },
    { id: 525, name: 'Puma Cool Cat 2.0', price: '₹1,199', originalPrice: '₹1,799', rating: 4.2, tag: null, img: '/image/footwear/men/brand/puma/c5.jpg' },
    { id: 526, name: 'Puma Surf Flip Flop', price: '₹899', originalPrice: '₹1,399', rating: 4.1, tag: 'Sale', img: '/image/footwear/men/brand/puma/c6.jpg' },
    { id: 527, name: 'Puma Flop Flip Flop', price: '₹1,099', originalPrice: '₹1,699', rating: 4.3, tag: 'Popular', img: '/image/footwear/men/brand/puma/c7.jpg' },
    { id: 528, name: 'Puma Nitro Slide', price: '₹1,999', originalPrice: '₹2,799', rating: 4.5, tag: 'New', img: '/image/footwear/men/brand/puma/c8.jpg' },
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
          <h1 className="page-title">Puma Footwear</h1>
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
              <h2 className="section-title">Puma Sport Shoes 👟</h2>
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
              <h2 className="section-title">Puma Sneakers 🔥</h2>
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
              <h2 className="section-title">Puma Flip-Flops & Slides 🩴</h2>
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