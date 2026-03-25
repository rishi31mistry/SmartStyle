import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function NikeFootwearWomen() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  const categories = [
    { name: 'All', count: 24 },
    { name: 'Sport Shoes', count: 8 },
    { name: 'Flip-Flops', count: 8 },
    { name: 'Casual Shoes', count: 8 },
  ]

  const sportShoes = [
    { id: 1201, name: 'Nike Air Zoom Pegasus 40 W', price: '₹9,999', originalPrice: '₹12,999', rating: 4.7, tag: 'Bestseller', img: '/image/footwear/women/brand/nike/a1.jpg' },
    { id: 1202, name: 'Nike React Infinity Run FK 3 W', price: '₹11,999', originalPrice: '₹14,999', rating: 4.6, tag: 'New', img: '/image/footwear/women/brand/nike/a2.jpg' },
    { id: 1203, name: 'Nike Air Max 270 W', price: '₹10,999', originalPrice: '₹13,999', rating: 4.5, tag: 'Sale', img: '/image/footwear/women/brand/nike/a3.jpg' },
    { id: 1204, name: 'Nike Downshifter 12 W', price: '₹4,999', originalPrice: '₹6,999', rating: 4.4, tag: null, img: '/image/footwear/women/brand/nike/a4.jpg' },
    { id: 1205, name: 'Nike Revolution 6 W', price: '₹4,499', originalPrice: '₹5,999', rating: 4.6, tag: 'Trending', img: '/image/footwear/women/brand/nike/a5.jpg' },
    { id: 1206, name: 'Nike Free RN 5.0 W', price: '₹7,999', originalPrice: '₹9,999', rating: 4.5, tag: 'Popular', img: '/image/footwear/women/brand/nike/a6.jpg' },
    { id: 1207, name: 'Nike Winflo 10 W', price: '₹6,999', originalPrice: '₹8,999', rating: 4.3, tag: null, img: '/image/footwear/women/brand/nike/a7.jpg' },
    { id: 1208, name: 'Nike Quest 5 W', price: '₹3,999', originalPrice: '₹5,499', rating: 4.2, tag: 'Sale', img: '/image/footwear/women/brand/nike/a8.jpg' },
  ]

  const flipFlops = [
    { id: 1211, name: 'Nike Bella Kai Thong W', price: '₹1,499', originalPrice: '₹2,199', rating: 4.5, tag: 'Bestseller', img: '/image/footwear/women/brand/nike/b1.jpg' },
    { id: 1212, name: 'Nike Victori One Slide W', price: '₹1,799', originalPrice: '₹2,499', rating: 4.4, tag: 'New', img: '/image/footwear/women/brand/nike/b2.jpg' },
    { id: 1213, name: 'Nike Kawa Shower Slide W', price: '₹999', originalPrice: '₹1,599', rating: 4.3, tag: 'Sale', img: '/image/footwear/women/brand/nike/b3.jpg' },
    { id: 1214, name: 'Nike Offcourt Slide W', price: '₹1,299', originalPrice: '₹1,999', rating: 4.2, tag: null, img: '/image/footwear/women/brand/nike/b4.jpg' },
    { id: 1215, name: 'Nike Calm Slide W', price: '₹2,299', originalPrice: '₹2,999', rating: 4.5, tag: 'Trending', img: '/image/footwear/women/brand/nike/b5.jpg' },
    { id: 1216, name: 'Nike Ultra Comfort Thong W', price: '₹1,699', originalPrice: '₹2,399', rating: 4.4, tag: 'Popular', img: '/image/footwear/women/brand/nike/b6.jpg' },
    { id: 1217, name: 'Nike Aqua Swoosh Slide W', price: '₹899', originalPrice: '₹1,399', rating: 4.1, tag: 'Sale', img: '/image/footwear/women/brand/nike/b7.jpg' },
    { id: 1218, name: 'Nike Air Max Cirro Slide W', price: '₹2,499', originalPrice: '₹3,299', rating: 4.3, tag: 'New', img: '/image/footwear/women/brand/nike/b8.jpg' },
  ]

  const casualShoes = [
    { id: 1221, name: 'Nike Air Force 1 07 W', price: '₹7,999', originalPrice: '₹9,999', rating: 4.7, tag: 'Bestseller', img: '/image/footwear/women/brand/nike/c1.jpg' },
    { id: 1222, name: 'Nike Blazer Mid 77 W', price: '₹6,999', originalPrice: '₹8,999', rating: 4.6, tag: 'New', img: '/image/footwear/women/brand/nike/c2.jpg' },
    { id: 1223, name: 'Nike Court Vision Low W', price: '₹5,499', originalPrice: '₹7,499', rating: 4.5, tag: 'Trending', img: '/image/footwear/women/brand/nike/c3.jpg' },
    { id: 1224, name: 'Nike Dunk Low W', price: '₹8,999', originalPrice: '₹11,999', rating: 4.8, tag: null, img: '/image/footwear/women/brand/nike/c4.jpg' },
    { id: 1225, name: 'Nike Air Max 90 W', price: '₹9,499', originalPrice: '₹12,499', rating: 4.6, tag: 'Sale', img: '/image/footwear/women/brand/nike/c5.jpg' },
    { id: 1226, name: 'Nike Killshot 2 W', price: '₹5,999', originalPrice: '₹7,999', rating: 4.5, tag: 'Popular', img: '/image/footwear/women/brand/nike/c6.jpg' },
    { id: 1227, name: 'Nike Court Legacy W', price: '₹4,499', originalPrice: '₹5,999', rating: 4.3, tag: null, img: '/image/footwear/women/brand/nike/c7.jpg' },
    { id: 1228, name: 'Nike Waffle Debut W', price: '₹5,499', originalPrice: '₹7,499', rating: 4.4, tag: 'New', img: '/image/footwear/women/brand/nike/c8.jpg' },
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
          <h1 className="page-title">Nike Women's Footwear</h1>
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

        {/* Flip-Flops Section */}
        {(activeCategory === 'All' || activeCategory === 'Flip-Flops') && (
          <>
            <div className="section-header">
              <h2 className="section-title">Nike Flip-Flops & Slides 🩴</h2>
            </div>
            <div className="product-grid">
              {flipFlops.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="divider" />
          </>
        )}

        {/* Casual Shoes Section */}
        {(activeCategory === 'All' || activeCategory === 'Casual Shoes') && (
          <>
            <div className="section-header">
              <h2 className="section-title">Nike Casual Shoes 👠</h2>
            </div>
            <div className="product-grid">
              {casualShoes.map(p => <ProductCard key={p.id} product={p} />)}
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