import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function LeeCooperFootwearMen() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  const formalShoes = [
    { id: 1101, name: 'Lee Cooper Oxford Lace-Up', price: '₹2,499', originalPrice: '₹3,499', rating: 4.6, tag: 'Bestseller', img: '/image/footwear/men/brand/lc/a1.jpg' },
    { id: 1102, name: 'Lee Cooper Derby Formal', price: '₹2,199', originalPrice: '₹3,199', rating: 4.5, tag: 'New', img: '/image/footwear/men/brand/lc/a2.jpg' },
    { id: 1103, name: 'Lee Cooper Monk Strap Shoe', price: '₹2,799', originalPrice: '₹3,999', rating: 4.4, tag: 'Sale', img: '/image/footwear/men/brand/lc/a3.jpg' },
    { id: 1104, name: 'Lee Cooper Brogue Shoe', price: '₹2,599', originalPrice: '₹3,699', rating: 4.3, tag: null, img: '/image/footwear/men/brand/lc/a4.jpg' },
    { id: 1105, name: 'Lee Cooper Slip-On Formal', price: '₹1,999', originalPrice: '₹2,999', rating: 4.5, tag: 'Trending', img: '/image/footwear/men/brand/lc/a5.jpg' },
    { id: 1106, name: 'Lee Cooper Chelsea Boot', price: '₹3,199', originalPrice: '₹4,499', rating: 4.6, tag: 'Popular', img: '/image/footwear/men/brand/lc/a6.jpg' },
    { id: 1107, name: 'Lee Cooper Cap Toe Oxford', price: '₹2,699', originalPrice: '₹3,799', rating: 4.4, tag: null, img: '/image/footwear/men/brand/lc/a7.jpg' },
    { id: 1108, name: 'Lee Cooper Wing Tip Brogue', price: '₹2,899', originalPrice: '₹3,999', rating: 4.3, tag: 'Sale', img: '/image/footwear/men/brand/lc/a8.jpg' },
    { id: 1109, name: 'Lee Cooper Pointed Toe Formal', price: '₹2,349', originalPrice: '₹3,299', rating: 4.5, tag: 'New', img: '/image/footwear/men/brand/lc/a9.jpg' },
    { id: 1110, name: 'Lee Cooper Double Monk Shoe', price: '₹3,099', originalPrice: '₹4,299', rating: 4.6, tag: 'Bestseller', img: '/image/footwear/men/brand/lc/a10.jpg' },
    { id: 1111, name: 'Lee Cooper Leather Derby', price: '₹2,499', originalPrice: '₹3,499', rating: 4.4, tag: 'Trending', img: '/image/footwear/men/brand/lc/a11.jpg' },
    { id: 1112, name: 'Lee Cooper Classic Office Shoe', price: '₹1,899', originalPrice: '₹2,799', rating: 4.2, tag: 'Sale', img: '/image/footwear/men/brand/lc/a12.jpg' },
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
          <h1 className="page-title">Lee Cooper Footwear</h1>
        </div>

        {/* Formal Shoes Section */}
        <div className="section-header">
          <h2 className="section-title">Lee Cooper Formal Shoes 👞</h2>
        </div>
        <div className="product-grid">
          {formalShoes.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

      </div>

      <footer className="footer">
        ® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.
      </footer>
    </div>
  )
}