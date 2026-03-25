import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function HushPuppiesFootwearWomen() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  const categories = [
    { name: 'All', count: 24 },
    { name: 'Heels', count: 8 },
    { name: 'Loafers', count: 8 },
    { name: 'Wide Width & Wedges', count: 8 },
  ]

  const heels = [
    { id: 1501, name: 'Hush Puppies Soft Style Heel', price: '₹3,499', originalPrice: '₹4,999', rating: 4.7, tag: 'Bestseller', img: '/image/footwear/women/brand/hp/a1.jpg' },
    { id: 1502, name: 'Hush Puppies Chaste Heel', price: '₹3,999', originalPrice: '₹5,499', rating: 4.6, tag: 'New', img: '/image/footwear/women/brand/hp/a2.jpg' },
    { id: 1503, name: 'Hush Puppies Kitten Heel Pump', price: '₹2,999', originalPrice: '₹4,299', rating: 4.5, tag: 'Sale', img: '/image/footwear/women/brand/hp/a3.jpg' },
    { id: 1504, name: 'Hush Puppies Ankle Strap Heel', price: '₹3,299', originalPrice: '₹4,799', rating: 4.4, tag: null, img: '/image/footwear/women/brand/hp/a4.jpg' },
    { id: 1505, name: 'Hush Puppies Block Heel Sandal', price: '₹2,799', originalPrice: '₹3,999', rating: 4.6, tag: 'Trending', img: '/image/footwear/women/brand/hp/a5.jpg' },
    { id: 1506, name: 'Hush Puppies Pointed Toe Heel', price: '₹3,799', originalPrice: '₹5,299', rating: 4.5, tag: 'Popular', img: '/image/footwear/women/brand/hp/a6.jpg' },
    { id: 1507, name: 'Hush Puppies Slingback Heel', price: '₹2,999', originalPrice: '₹4,299', rating: 4.3, tag: null, img: '/image/footwear/women/brand/hp/a7.jpg' },
    { id: 1508, name: 'Hush Puppies Peep Toe Heel', price: '₹3,199', originalPrice: '₹4,599', rating: 4.2, tag: 'Sale', img: '/image/footwear/women/brand/hp/a8.jpg' },
  ]

  const loafers = [
    { id: 1511, name: 'Hush Puppies Wren Loafer', price: '₹3,999', originalPrice: '₹5,499', rating: 4.6, tag: 'Bestseller', img: '/image/footwear/women/brand/hp/b1.jpg' },
    { id: 1512, name: 'Hush Puppies Penny Loafer', price: '₹3,499', originalPrice: '₹4,999', rating: 4.5, tag: 'New', img: '/image/footwear/women/brand/hp/b2.jpg' },
    { id: 1513, name: 'Hush Puppies Soft Classic Loafer', price: '₹2,999', originalPrice: '₹4,299', rating: 4.4, tag: 'Sale', img: '/image/footwear/women/brand/hp/b3.jpg' },
    { id: 1514, name: 'Hush Puppies Tassel Loafer', price: '₹3,799', originalPrice: '₹5,299', rating: 4.3, tag: null, img: '/image/footwear/women/brand/hp/b4.jpg' },
    { id: 1515, name: 'Hush Puppies Chowchow Loafer', price: '₹4,299', originalPrice: '₹5,999', rating: 4.5, tag: 'Trending', img: '/image/footwear/women/brand/hp/b5.jpg' },
    { id: 1516, name: 'Hush Puppies Molly Loafer', price: '₹3,199', originalPrice: '₹4,499', rating: 4.6, tag: 'Popular', img: '/image/footwear/women/brand/hp/b6.jpg' },
    { id: 1517, name: 'Hush Puppies Slip-on Loafer', price: '₹2,799', originalPrice: '₹3,999', rating: 4.2, tag: null, img: '/image/footwear/women/brand/hp/b7.jpg' },
    { id: 1518, name: 'Hush Puppies Embossed Loafer', price: '₹4,499', originalPrice: '₹6,299', rating: 4.4, tag: 'New', img: '/image/footwear/women/brand/hp/b8.jpg' },
  ]

  const wideWidthWedges = [
    { id: 1521, name: 'Hush Puppies Soft Style Wedge', price: '₹2,999', originalPrice: '₹4,299', rating: 4.6, tag: 'Bestseller', img: '/image/footwear/women/brand/hp/c1.jpg' },
    { id: 1522, name: 'Hush Puppies Wide Fit Wedge Sandal', price: '₹2,499', originalPrice: '₹3,699', rating: 4.5, tag: 'New', img: '/image/footwear/women/brand/hp/c2.jpg' },
    { id: 1523, name: 'Hush Puppies Espadrille Wedge', price: '₹2,799', originalPrice: '₹3,999', rating: 4.7, tag: 'Trending', img: '/image/footwear/women/brand/hp/c3.jpg' },
    { id: 1524, name: 'Hush Puppies Wide Width Comfort Wedge', price: '₹3,199', originalPrice: '₹4,599', rating: 4.4, tag: null, img: '/image/footwear/women/brand/hp/c4.jpg' },
    { id: 1525, name: 'Hush Puppies Cork Wedge Sandal', price: '₹2,299', originalPrice: '₹3,299', rating: 4.3, tag: 'Sale', img: '/image/footwear/women/brand/hp/c5.jpg' },
    { id: 1526, name: 'Hush Puppies Ankle Strap Wedge', price: '₹2,999', originalPrice: '₹4,299', rating: 4.5, tag: 'Popular', img: '/image/footwear/women/brand/hp/c6.jpg' },
    { id: 1527, name: 'Hush Puppies Wide Fit Slip-on Wedge', price: '₹1,999', originalPrice: '₹2,999', rating: 4.2, tag: null, img: '/image/footwear/women/brand/hp/c7.jpg' },
    { id: 1528, name: 'Hush Puppies Platform Wedge', price: '₹3,499', originalPrice: '₹4,999', rating: 4.4, tag: 'New', img: '/image/footwear/women/brand/hp/c8.jpg' },
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
          <h1 className="page-title">Hush Puppies Women's Footwear</h1>
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

        {/* Heels Section */}
        {(activeCategory === 'All' || activeCategory === 'Heels') && (
          <>
            <div className="section-header">
              <h2 className="section-title">Hush Puppies Heels 👡</h2>
            </div>
            <div className="product-grid">
              {heels.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="divider" />
          </>
        )}

        {/* Loafers Section */}
        {(activeCategory === 'All' || activeCategory === 'Loafers') && (
          <>
            <div className="section-header">
              <h2 className="section-title">Hush Puppies Loafers 🥿</h2>
            </div>
            <div className="product-grid">
              {loafers.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="divider" />
          </>
        )}

        {/* Wide Width & Wedges Section */}
        {(activeCategory === 'All' || activeCategory === 'Wide Width & Wedges') && (
          <>
            <div className="section-header">
              <h2 className="section-title">Hush Puppies Wide Width & Wedges 👠</h2>
            </div>
            <div className="product-grid">
              {wideWidthWedges.map(p => <ProductCard key={p.id} product={p} />)}
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