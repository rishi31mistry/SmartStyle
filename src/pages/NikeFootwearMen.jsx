import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function NikeFootwearMen() {
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
    { id: 301, name: 'Nike Air Zoom Pegasus 41', price: '₹8,995', originalPrice: '₹12,995', rating: 4.7, tag: 'Bestseller', img: '/image/footwear/men/brand/nike/a1.jpg' },
    { id: 302, name: 'Nike React Infinity Run FK 4', price: '₹10,495', originalPrice: '₹14,995', rating: 4.8, tag: 'New', img: '/image/footwear/men/brand/nike/a2.jpg' },
    { id: 303, name: 'Nike Revolution 7', price: '₹4,995', originalPrice: '₹6,995', rating: 4.4, tag: 'Sale', img: '/image/footwear/men/brand/nike/a3.jpg' },
    { id: 304, name: 'Nike Downshifter 13', price: '₹3,995', originalPrice: '₹5,995', rating: 4.3, tag: null, img: '/image/footwear/men/brand/nike/a4.jpg' },
    { id: 305, name: 'Nike Air Max 270', price: '₹12,995', originalPrice: '₹17,995', rating: 4.6, tag: 'Trending', img: '/image/footwear/men/brand/nike/a5.jpg' },
    { id: 306, name: 'Nike Free Run 5.0', price: '₹7,495', originalPrice: '₹10,495', rating: 4.5, tag: 'Popular', img: '/image/footwear/men/brand/nike/a6.jpg' },
    { id: 307, name: 'Nike Metcon 9', price: '₹9,995', originalPrice: '₹13,995', rating: 4.7, tag: null, img: '/image/footwear/men/brand/nike/a7.jpg' },
    { id: 308, name: 'Nike Flex Experience RN 12', price: '₹3,595', originalPrice: '₹5,595', rating: 4.2, tag: 'Sale', img: '/image/footwear/men/brand/nike/a8.jpg' },
  ]

  const sneakers = [
    { id: 311, name: 'Nike Air Force 1 Low', price: '₹7,495', originalPrice: '₹9,995', rating: 4.8, tag: 'Bestseller', img: '/image/footwear/men/brand/nike/b1.jpg' },
    { id: 312, name: 'Nike Dunk Low Retro', price: '₹8,495', originalPrice: '₹11,495', rating: 4.7, tag: 'Trending', img: '/image/footwear/men/brand/nike/b2.jpg' },
    { id: 313, name: 'Nike Air Max 90', price: '₹10,995', originalPrice: '₹14,995', rating: 4.6, tag: 'New', img: '/image/footwear/men/brand/nike/b3.jpg' },
    { id: 314, name: 'Nike Blazer Mid 77 Vintage', price: '₹7,995', originalPrice: '₹10,995', rating: 4.5, tag: null, img: '/image/footwear/men/brand/nike/b4.jpg' },
    { id: 315, name: 'Nike Court Vision Low', price: '₹5,595', originalPrice: '₹7,595', rating: 4.4, tag: 'Sale', img: '/image/footwear/men/brand/nike/b5.jpg' },
    { id: 316, name: 'Nike Air Max 97', price: '₹13,995', originalPrice: '₹18,995', rating: 4.8, tag: 'Popular', img: '/image/footwear/men/brand/nike/b6.jpg' },
    { id: 317, name: 'Nike SB Dunk High Pro', price: '₹9,495', originalPrice: '₹12,995', rating: 4.6, tag: 'New', img: '/image/footwear/men/brand/nike/b7.jpg' },
    { id: 318, name: 'Nike Waffle Debut', price: '₹4,995', originalPrice: '₹6,995', rating: 4.3, tag: null, img: '/image/footwear/men/brand/nike/b8.jpg' },
  ]

  const flipFlops = [
    { id: 321, name: 'Nike Victori One Slide', price: '₹1,495', originalPrice: '₹2,195', rating: 4.5, tag: 'Bestseller', img: '/image/footwear/men/brand/nike/c1.jpg' },
    { id: 322, name: 'Nike Benassi JDI Slide', price: '₹1,295', originalPrice: '₹1,995', rating: 4.4, tag: 'Sale', img: '/image/footwear/men/brand/nike/c2.jpg' },
    { id: 323, name: 'Nike Ultra Comfort Thong', price: '₹1,695', originalPrice: '₹2,495', rating: 4.6, tag: 'New', img: '/image/footwear/men/brand/nike/c3.jpg' },
    { id: 324, name: 'Nike Offcourt Slide', price: '₹1,895', originalPrice: '₹2,695', rating: 4.3, tag: null, img: '/image/footwear/men/brand/nike/c4.jpg' },
    { id: 325, name: 'Nike Kawa Shower Slide', price: '₹995', originalPrice: '₹1,595', rating: 4.2, tag: 'Sale', img: '/image/footwear/men/brand/nike/c5.jpg' },
    { id: 326, name: 'Nike Calm Flip Flop', price: '₹2,195', originalPrice: '₹2,995', rating: 4.7, tag: 'Trending', img: '/image/footwear/men/brand/nike/c6.jpg' },
    { id: 327, name: 'Nike Celso Thong Plus', price: '₹1,195', originalPrice: '₹1,795', rating: 4.1, tag: 'Popular', img: '/image/footwear/men/brand/nike/c7.jpg' },
    { id: 328, name: 'Nike Sunray Adjust 6', price: '₹1,795', originalPrice: '₹2,595', rating: 4.5, tag: 'New', img: '/image/footwear/men/brand/nike/c8.jpg' },
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
          <h1 className="page-title">Nike Footwear</h1>
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
              <h2 className="section-title">Nike Sport Shoes 👟</h2>
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
              <h2 className="section-title">Nike Sneakers 🔥</h2>
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
              <h2 className="section-title">Nike Flip-Flops & Slides 🩴</h2>
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