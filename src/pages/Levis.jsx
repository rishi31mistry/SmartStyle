import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function Levis() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  const categories = [
    { name: 'All', count: 24 },
    { name: 'T-Shirts', count: 8 },
    { name: 'Shirts', count: 8 },
    { name: 'Jeans', count: 8 },
  ]

  const tshirts = [
    { id: 701, name: "Levi's Batwing Logo Tee", price: '₹899', originalPrice: '₹1,499', rating: 4.5, tag: 'Bestseller', img: '/image/men/brand/levis/t1.jpg' },
    { id: 702, name: "Levi's Classic Crew Tee", price: '₹749', originalPrice: '₹1,249', rating: 4.3, tag: 'Sale', img: '/image/men/brand/levis/t2.jpg' },
    { id: 703, name: "Levi's Graphic Tee", price: '₹999', originalPrice: '₹1,699', rating: 4.6, tag: 'New', img: '/image/men/brand/levis/t3.jpg' },
    { id: 704, name: "Levi's Slim Fit Tee", price: '₹849', originalPrice: '₹1,399', rating: 4.4, tag: null, img: '/image/men/brand/levis/t4.jpg' },
    { id: 705, name: "Levi's Housemark Tee", price: '₹799', originalPrice: '₹1,349', rating: 4.3, tag: 'Trending', img: '/image/men/brand/levis/t5.jpg' },
    { id: 706, name: "Levi's Original Tee", price: '₹949', originalPrice: '₹1,599', rating: 4.7, tag: 'Popular', img: '/image/men/brand/levis/t6.jpg' },
    { id: 707, name: "Levi's Vintage Tee", price: '₹879', originalPrice: '₹1,449', rating: 4.2, tag: null, img: '/image/men/brand/levis/t7.jpg' },
    { id: 708, name: "Levi's Sport Tee", price: '₹699', originalPrice: '₹1,149', rating: 4.1, tag: 'Sale', img: '/image/men/brand/levis/t8.jpg' },
  ]

  const shirts = [
    { id: 711, name: "Levi's Classic Oxford Shirt", price: '₹1,799', originalPrice: '₹2,999', rating: 4.5, tag: 'New', img: '/image/men/brand/levis/s1.jpg' },
    { id: 712, name: "Levi's Relaxed Fit Shirt", price: '₹1,499', originalPrice: '₹2,499', rating: 4.4, tag: null, img: '/image/men/brand/levis/s2.jpg' },
    { id: 713, name: "Levi's Check Shirt", price: '₹1,699', originalPrice: '₹2,799', rating: 4.6, tag: 'Trending', img: '/image/men/brand/levis/s3.jpg' },
    { id: 714, name: "Levi's Western Shirt", price: '₹1,999', originalPrice: '₹3,299', rating: 4.4, tag: 'Bestseller', img: '/image/men/brand/levis/s4.jpg' },
    { id: 715, name: "Levi's Sunset Pocket Shirt", price: '₹1,899', originalPrice: '₹3,099', rating: 4.5, tag: 'Popular', img: '/image/men/brand/levis/s5.jpg' },
    { id: 716, name: "Levi's Denim Shirt", price: '₹2,199', originalPrice: '₹3,599', rating: 4.6, tag: 'New', img: '/image/men/brand/levis/s6.jpg' },
    { id: 717, name: "Levi's Flannel Shirt", price: '₹1,599', originalPrice: '₹2,599', rating: 4.2, tag: 'Sale', img: '/image/men/brand/levis/s7.jpg' },
    { id: 718, name: "Levi's Casual Shirt", price: '₹1,399', originalPrice: '₹2,299', rating: 4.3, tag: null, img: '/image/men/brand/levis/s8.jpg' },
  ]

  const jeans = [
    { id: 721, name: "Levi's 501 Original Jeans", price: '₹2,999', originalPrice: '₹4,999', rating: 4.7, tag: 'Bestseller', img: '/image/men/brand/levis/p1.jpg' },
    { id: 722, name: "Levi's 511 Slim Jeans", price: '₹2,799', originalPrice: '₹4,599', rating: 4.6, tag: 'Popular', img: '/image/men/brand/levis/p2.jpg' },
    { id: 723, name: "Levi's 512 Slim Taper Jeans", price: '₹2,599', originalPrice: '₹4,299', rating: 4.5, tag: 'New', img: '/image/men/brand/levis/p3.jpg' },
    { id: 724, name: "Levi's 514 Straight Jeans", price: '₹2,499', originalPrice: '₹3,999', rating: 4.4, tag: 'Trending', img: '/image/men/brand/levis/p4.jpg' },
    { id: 725, name: "Levi's 505 Regular Jeans", price: '₹2,299', originalPrice: '₹3,799', rating: 4.5, tag: 'New', img: '/image/men/brand/levis/p5.jpg' },
    { id: 726, name: "Levi's 519 Extreme Skinny", price: '₹2,099', originalPrice: '₹3,499', rating: 4.2, tag: 'Sale', img: '/image/men/brand/levis/p6.jpg' },
    { id: 727, name: "Levi's 502 Taper Jeans", price: '₹2,699', originalPrice: '₹4,399', rating: 4.4, tag: null, img: '/image/men/brand/levis/p7.jpg' },
    { id: 728, name: "Levi's 541 Athletic Jeans", price: '₹1,999', originalPrice: '₹3,299', rating: 4.1, tag: 'Sale', img: '/image/men/brand/levis/p8.jpg' },
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
      <div className="wrapper_men" >
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <h1 className="page-title">Levi's</h1>
        </div>
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat.name} onClick={() => setActiveCategory(cat.name)} style={{ padding: '10px 22px', borderRadius: '50px', border: activeCategory === cat.name ? 'none' : '1.5px solid #ddd', background: activeCategory === cat.name ? '#C8102E' : '#fff', color: activeCategory === cat.name ? '#fff' : '#444', fontSize: '13px', fontWeight: '600', fontFamily: 'Poppins, sans-serif', cursor: 'pointer', transition: 'all 0.2s' }}>
              {cat.name}<span style={{ marginLeft: '6px', fontSize: '11px', opacity: 0.7 }}>({cat.count})</span>
            </button>
          ))}
        </div>
        {(activeCategory === 'All' || activeCategory === 'T-Shirts') && (
          <><div className="section-header"><h2 className="section-title">Levi's T-Shirts 👕</h2>
          </div>
          <div className="product-grid">{tshirts.map(p => <ProductCard key={p.id} product={p} />)}</div><div className="divider" /></>
        )}
        {(activeCategory === 'All' || activeCategory === 'Shirts') && (
          <><div className="section-header"><h2 className="section-title">Levi's Shirts 🧥</h2>
          </div>
          <div className="product-grid">{shirts.map(p => <ProductCard key={p.id} product={p} />)}</div><div className="divider" /></>
        )}
        {(activeCategory === 'All' || activeCategory === 'Jeans') && (
          <><div className="section-header"><h2 className="section-title">Levi's Jeans 👖</h2>
          </div>
          <div className="product-grid">{jeans.map(p => <ProductCard key={p.id} product={p} />)}</div></>
        )}
      </div>
      <footer className="footer">® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.</footer>
    </div>
  )
}