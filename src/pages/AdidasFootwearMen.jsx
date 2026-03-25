import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function AdidasFootwearMen() {
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
    { id: 401, name: 'Adidas Ultraboost 24', price: '₹14,999', originalPrice: '₹19,999', rating: 4.8, tag: 'Bestseller', img: '/image/footwear/men/brand/adidas/a1.jpg' },
    { id: 402, name: 'Adidas Runfalcon 3.0', price: '₹3,999', originalPrice: '₹5,999', rating: 4.4, tag: 'Sale', img: '/image/footwear/men/brand/adidas/a2.jpg' },
    { id: 403, name: 'Adidas Response Runner', price: '₹5,499', originalPrice: '₹7,999', rating: 4.5, tag: 'New', img: '/image/footwear/men/brand/adidas/a3.jpg' },
    { id: 404, name: 'Adidas Duramo SL', price: '₹4,499', originalPrice: '₹6,499', rating: 4.3, tag: null, img: '/image/footwear/men/brand/adidas/a4.jpg' },
    { id: 405, name: 'Adidas Solar Glide 6', price: '₹9,999', originalPrice: '₹13,999', rating: 4.6, tag: 'Trending', img: '/image/footwear/men/brand/adidas/a5.jpg' },
    { id: 406, name: 'Adidas Terrex Soulstride', price: '₹7,999', originalPrice: '₹10,999', rating: 4.5, tag: 'Popular', img: '/image/footwear/men/brand/adidas/a6.jpg' },
    { id: 407, name: 'Adidas Adizero Boston 12', price: '₹11,999', originalPrice: '₹15,999', rating: 4.7, tag: null, img: '/image/footwear/men/brand/adidas/a7.jpg' },
    { id: 408, name: 'Adidas Galaxy 6', price: '₹3,499', originalPrice: '₹5,499', rating: 4.2, tag: 'Sale', img: '/image/footwear/men/brand/adidas/a8.jpg' },
  ]

  const sneakers = [
    { id: 411, name: 'Adidas Samba OG', price: '₹8,999', originalPrice: '₹11,999', rating: 4.8, tag: 'Bestseller', img: '/image/footwear/men/brand/adidas/b1.jpg' },
    { id: 412, name: 'Adidas Stan Smith', price: '₹7,499', originalPrice: '₹9,999', rating: 4.7, tag: 'Trending', img: '/image/footwear/men/brand/adidas/b2.jpg' },
    { id: 413, name: 'Adidas Gazelle Bold', price: '₹9,499', originalPrice: '₹12,999', rating: 4.6, tag: 'New', img: '/image/footwear/men/brand/adidas/b3.jpg' },
    { id: 414, name: 'Adidas Forum Low', price: '₹7,999', originalPrice: '₹10,999', rating: 4.5, tag: null, img: '/image/footwear/men/brand/adidas/b4.jpg' },
    { id: 415, name: 'Adidas Campus 00s', price: '₹6,999', originalPrice: '₹9,499', rating: 4.6, tag: 'Popular', img: '/image/footwear/men/brand/adidas/b5.jpg' },
    { id: 416, name: 'Adidas Superstar', price: '₹7,999', originalPrice: '₹10,499', rating: 4.7, tag: 'Bestseller', img: '/image/footwear/men/brand/adidas/b6.jpg' },
    { id: 417, name: 'Adidas NMD R1', price: '₹10,999', originalPrice: '₹14,999', rating: 4.5, tag: 'New', img: '/image/footwear/men/brand/adidas/b7.jpg' },
    { id: 418, name: 'Adidas Handball Spezial', price: '₹8,499', originalPrice: '₹11,499', rating: 4.4, tag: 'Sale', img: '/image/footwear/men/brand/adidas/b8.jpg' },
  ]

  const flipFlops = [
    { id: 421, name: 'Adidas Adilette Aqua', price: '₹1,299', originalPrice: '₹1,999', rating: 4.5, tag: 'Bestseller', img: '/image/footwear/men/brand/adidas/c1.jpg' },
    { id: 422, name: 'Adidas Adilette Comfort', price: '₹1,799', originalPrice: '₹2,599', rating: 4.6, tag: 'New', img: '/image/footwear/men/brand/adidas/c2.jpg' },
    { id: 423, name: 'Adidas Adilette Lite', price: '₹999', originalPrice: '₹1,599', rating: 4.3, tag: 'Sale', img: '/image/footwear/men/brand/adidas/c3.jpg' },
    { id: 424, name: 'Adidas Eezay Flip Flop', price: '₹1,099', originalPrice: '₹1,699', rating: 4.2, tag: null, img: '/image/footwear/men/brand/adidas/c4.jpg' },
    { id: 425, name: 'Adidas Comfort Flip Flop', price: '₹1,299', originalPrice: '₹1,999', rating: 4.4, tag: 'Trending', img: '/image/footwear/men/brand/adidas/c5.jpg' },
    { id: 426, name: 'Adidas Swim Slide', price: '₹1,499', originalPrice: '₹2,199', rating: 4.5, tag: 'Popular', img: '/image/footwear/men/brand/adidas/c6.jpg' },
    { id: 427, name: 'Adidas Alphabounce Slide', price: '₹1,999', originalPrice: '₹2,799', rating: 4.6, tag: 'New', img: '/image/footwear/men/brand/adidas/c7.jpg' },
    { id: 428, name: 'Adidas Adissage Slide', price: '₹899', originalPrice: '₹1,499', rating: 4.1, tag: 'Sale', img: '/image/footwear/men/brand/adidas/c8.jpg' },
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
          <h1 className="page-title">Adidas Footwear</h1>
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
              <h2 className="section-title">Adidas Sport Shoes 👟</h2>
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
              <h2 className="section-title">Adidas Sneakers 🔥</h2>
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
              <h2 className="section-title">Adidas Flip-Flops & Slides 🩴</h2>
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