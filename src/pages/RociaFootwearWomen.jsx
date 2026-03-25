import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function RociaFootwearWomen() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  const categories = [
    { name: 'All', count: 24 },
    { name: 'Stilettos', count: 8 },
    { name: 'Ballerinas', count: 8 },
    { name: 'Block Heels', count: 8 },
  ]

  const stilettos = [
    { id: 1401, name: 'Rocia Glam Stiletto Pump', price: '₹1,999', originalPrice: '₹2,999', rating: 4.7, tag: 'Bestseller', img: '/image/footwear/women/brand/rocia/a1.jpg' },
    { id: 1402, name: 'Rocia Pointed Toe Stiletto', price: '₹1,799', originalPrice: '₹2,699', rating: 4.6, tag: 'New', img: '/image/footwear/women/brand/rocia/a2.jpg' },
    { id: 1403, name: 'Rocia Ankle Strap Stiletto', price: '₹2,199', originalPrice: '₹3,199', rating: 4.5, tag: 'Sale', img: '/image/footwear/women/brand/rocia/a3.jpg' },
    { id: 1404, name: 'Rocia Peep Toe Stiletto', price: '₹1,599', originalPrice: '₹2,399', rating: 4.4, tag: null, img: '/image/footwear/women/brand/rocia/a4.jpg' },
    { id: 1405, name: 'Rocia Embellished Stiletto', price: '₹2,499', originalPrice: '₹3,699', rating: 4.6, tag: 'Trending', img: '/image/footwear/women/brand/rocia/a5.jpg' },
    { id: 1406, name: 'Rocia Strappy Stiletto Sandal', price: '₹2,299', originalPrice: '₹3,299', rating: 4.5, tag: 'Popular', img: '/image/footwear/women/brand/rocia/a6.jpg' },
    { id: 1407, name: 'Rocia Classic Court Stiletto', price: '₹1,699', originalPrice: '₹2,499', rating: 4.3, tag: null, img: '/image/footwear/women/brand/rocia/a7.jpg' },
    { id: 1408, name: 'Rocia Slingback Stiletto', price: '₹1,999', originalPrice: '₹2,999', rating: 4.2, tag: 'Sale', img: '/image/footwear/women/brand/rocia/a8.jpg' },
  ]

  const ballerinas = [
    { id: 1411, name: 'Rocia Classic Ballet Flat', price: '₹999', originalPrice: '₹1,599', rating: 4.6, tag: 'Bestseller', img: '/image/footwear/women/brand/rocia/b1.jpg' },
    { id: 1412, name: 'Rocia Bow Ballerina Flat', price: '₹1,199', originalPrice: '₹1,799', rating: 4.5, tag: 'New', img: '/image/footwear/women/brand/rocia/b2.jpg' },
    { id: 1413, name: 'Rocia Pointed Ballerina', price: '₹1,099', originalPrice: '₹1,699', rating: 4.4, tag: 'Sale', img: '/image/footwear/women/brand/rocia/b3.jpg' },
    { id: 1414, name: 'Rocia Embroidered Ballerina', price: '₹1,399', originalPrice: '₹2,099', rating: 4.3, tag: null, img: '/image/footwear/women/brand/rocia/b4.jpg' },
    { id: 1415, name: 'Rocia Metallic Ballet Flat', price: '₹1,499', originalPrice: '₹2,199', rating: 4.5, tag: 'Trending', img: '/image/footwear/women/brand/rocia/b5.jpg' },
    { id: 1416, name: 'Rocia Slip-on Ballerina', price: '₹899', originalPrice: '₹1,399', rating: 4.4, tag: 'Popular', img: '/image/footwear/women/brand/rocia/b6.jpg' },
    { id: 1417, name: 'Rocia T-Strap Ballerina', price: '₹1,299', originalPrice: '₹1,999', rating: 4.2, tag: null, img: '/image/footwear/women/brand/rocia/b7.jpg' },
    { id: 1418, name: 'Rocia Printed Ballerina Flat', price: '₹1,199', originalPrice: '₹1,799', rating: 4.3, tag: 'New', img: '/image/footwear/women/brand/rocia/b8.jpg' },
  ]

  const blockHeels = [
    { id: 1421, name: 'Rocia Classic Block Heel', price: '₹1,699', originalPrice: '₹2,499', rating: 4.6, tag: 'Bestseller', img: '/image/footwear/women/brand/rocia/c1.jpg' },
    { id: 1422, name: 'Rocia Ankle Strap Block Heel', price: '₹1,999', originalPrice: '₹2,999', rating: 4.5, tag: 'New', img: '/image/footwear/women/brand/rocia/c2.jpg' },
    { id: 1423, name: 'Rocia Peep Toe Block Heel', price: '₹1,799', originalPrice: '₹2,699', rating: 4.7, tag: 'Trending', img: '/image/footwear/women/brand/rocia/c3.jpg' },
    { id: 1424, name: 'Rocia Mule Block Heel', price: '₹1,499', originalPrice: '₹2,299', rating: 4.4, tag: null, img: '/image/footwear/women/brand/rocia/c4.jpg' },
    { id: 1425, name: 'Rocia Embellished Block Heel', price: '₹2,299', originalPrice: '₹3,299', rating: 4.5, tag: 'Sale', img: '/image/footwear/women/brand/rocia/c5.jpg' },
    { id: 1426, name: 'Rocia Strappy Block Heel Sandal', price: '₹1,999', originalPrice: '₹2,999', rating: 4.6, tag: 'Popular', img: '/image/footwear/women/brand/rocia/c6.jpg' },
    { id: 1427, name: 'Rocia Pointed Block Heel', price: '₹1,599', originalPrice: '₹2,399', rating: 4.3, tag: null, img: '/image/footwear/women/brand/rocia/c7.jpg' },
    { id: 1428, name: 'Rocia Platform Block Heel', price: '₹2,499', originalPrice: '₹3,499', rating: 4.4, tag: 'New', img: '/image/footwear/women/brand/rocia/c8.jpg' },
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
          <h1 className="page-title">Rocia Women's Footwear</h1>
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

        {/* Stilettos Section */}
        {(activeCategory === 'All' || activeCategory === 'Stilettos') && (
          <>
            <div className="section-header">
              <h2 className="section-title">Rocia Stilettos 👠</h2>
            </div>
            <div className="product-grid">
              {stilettos.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="divider" />
          </>
        )}

        {/* Ballerinas Section */}
        {(activeCategory === 'All' || activeCategory === 'Ballerinas') && (
          <>
            <div className="section-header">
              <h2 className="section-title">Rocia Ballerinas 🥿</h2>
            </div>
            <div className="product-grid">
              {ballerinas.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="divider" />
          </>
        )}

        {/* Block Heels Section */}
        {(activeCategory === 'All' || activeCategory === 'Block Heels') && (
          <>
            <div className="section-header">
              <h2 className="section-title">Rocia Block Heels 👡</h2>
            </div>
            <div className="product-grid">
              {blockHeels.map(p => <ProductCard key={p.id} product={p} />)}
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