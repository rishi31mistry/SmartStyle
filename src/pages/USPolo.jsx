import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function USPolo() {
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
    { id: 1001, name: 'US Polo Polo Tee', price: '₹899', originalPrice: '₹1,499', rating: 4.5, tag: 'Bestseller', img: '/image/men/brand/us/t1.jpg' },
    { id: 1002, name: 'US Polo Classic Tee', price: '₹749', originalPrice: '₹1,249', rating: 4.3, tag: 'Sale', img: '/image/men/brand/us/t2.jpg' },
    { id: 1003, name: 'US Polo Graphic Tee', price: '₹999', originalPrice: '₹1,699', rating: 4.5, tag: 'New', img: '/image/men/brand/us/t3.jpg' },
    { id: 1004, name: 'US Polo Slim Tee', price: '₹849', originalPrice: '₹1,399', rating: 4.4, tag: null, img: '/image/men/brand/us/t4.jpg' },
    { id: 1005, name: 'US Polo Stripe Tee', price: '₹949', originalPrice: '₹1,599', rating: 4.3, tag: 'Trending', img: '/image/men/brand/us/t5.jpg' },
    { id: 1006, name: 'US Polo Logo Tee', price: '₹1,049', originalPrice: '₹1,749', rating: 4.6, tag: 'Popular', img: '/image/men/brand/us/t6.jpg' },
    { id: 1007, name: 'US Polo Sport Tee', price: '₹799', originalPrice: '₹1,349', rating: 4.2, tag: null, img: '/image/men/brand/us/t7.jpg' },
    { id: 1008, name: 'US Polo Basic Tee', price: '₹649', originalPrice: '₹1,099', rating: 4.1, tag: 'Sale', img: '/image/men/brand/us/t8.jpg' },
  ]

  const shirts = [
    { id: 1011, name: 'US Polo Oxford Shirt', price: '₹1,599', originalPrice: '₹2,699', rating: 4.5, tag: 'New', img: '/image/men/brand/us/s1.jpg' },
    { id: 1012, name: 'US Polo Linen Shirt', price: '₹1,399', originalPrice: '₹2,299', rating: 4.4, tag: null, img: '/image/men/brand/us/s2.jpg' },
    { id: 1013, name: 'US Polo Check Shirt', price: '₹1,699', originalPrice: '₹2,799', rating: 4.6, tag: 'Trending', img: '/image/men/brand/us/s3.jpg' },
    { id: 1014, name: 'US Polo Slim Shirt', price: '₹1,299', originalPrice: '₹2,199', rating: 4.3, tag: 'Bestseller', img: '/image/men/brand/us/s4.jpg' },
    { id: 1015, name: 'US Polo Casual Shirt', price: '₹1,199', originalPrice: '₹1,999', rating: 4.5, tag: 'Popular', img: '/image/men/brand/us/s5.jpg' },
    { id: 1016, name: 'US Polo Printed Shirt', price: '₹1,499', originalPrice: '₹2,499', rating: 4.4, tag: 'New', img: '/image/men/brand/us/s6.jpg' },
    { id: 1017, name: 'US Polo Stripe Shirt', price: '₹1,099', originalPrice: '₹1,799', rating: 4.2, tag: 'Sale', img: '/image/men/brand/us/s7.jpg' },
    { id: 1018, name: 'US Polo Regular Shirt', price: '₹1,149', originalPrice: '₹1,899', rating: 4.3, tag: null, img: '/image/men/brand/us/s8.jpg' },
  ]

  const jeans = [
    { id: 1021, name: 'US Polo Slim Jeans', price: '₹2,099', originalPrice: '₹3,499', rating: 4.5, tag: 'Bestseller', img: '/image/men/brand/us/p1.jpg' },
    { id: 1022, name: 'US Polo Skinny Jeans', price: '₹1,899', originalPrice: '₹3,199', rating: 4.4, tag: 'Popular', img: '/image/men/brand/us/p2.jpg' },
    { id: 1023, name: 'US Polo Straight Jeans', price: '₹1,999', originalPrice: '₹3,299', rating: 4.5, tag: 'New', img: '/image/men/brand/us/p3.jpg' },
    { id: 1024, name: 'US Polo Regular Jeans', price: '₹2,199', originalPrice: '₹3,699', rating: 4.3, tag: 'Trending', img: '/image/men/brand/us/p4.jpg' },
    { id: 1025, name: 'US Polo Relaxed Jeans', price: '₹2,399', originalPrice: '₹3,999', rating: 4.6, tag: 'New', img: '/image/men/brand/us/p5.jpg' },
    { id: 1026, name: 'US Polo Classic Jeans', price: '₹1,799', originalPrice: '₹2,999', rating: 4.2, tag: 'Sale', img: '/image/men/brand/us/p6.jpg' },
    { id: 1027, name: 'US Polo Cargo Jeans', price: '₹2,299', originalPrice: '₹3,799', rating: 4.4, tag: null, img: '/image/men/brand/us/p7.jpg' },
    { id: 1028, name: 'US Polo Tapered Jeans', price: '₹1,699', originalPrice: '₹2,799', rating: 4.1, tag: 'Sale', img: '/image/men/brand/us/p8.jpg' },
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
          <h1 className="page-title">U.S. Polo</h1>
        </div>
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat.name} onClick={() => setActiveCategory(cat.name)} style={{ padding: '10px 22px', borderRadius: '50px', border: activeCategory === cat.name ? 'none' : '1.5px solid #ddd', background: activeCategory === cat.name ? '#003087' : '#fff', color: activeCategory === cat.name ? '#fff' : '#444', fontSize: '13px', fontWeight: '600', fontFamily: 'Poppins, sans-serif', cursor: 'pointer', transition: 'all 0.2s' }}>
              {cat.name}<span style={{ marginLeft: '6px', fontSize: '11px', opacity: 0.7 }}>({cat.count})</span>
            </button>
          ))}
        </div>
        {(activeCategory === 'All' || activeCategory === 'T-Shirts') && (
          <><div className="section-header"><h2 className="section-title">U.S. Polo T-Shirts 👕</h2>
          </div>
          <div className="product-grid">{tshirts.map(p => <ProductCard key={p.id} product={p} />)}</div><div className="divider" /></>
        )}
        {(activeCategory === 'All' || activeCategory === 'Shirts') && (
          <><div className="section-header"><h2 className="section-title">U.S. Polo Shirts 🧥</h2>
          </div>
          <div className="product-grid">{shirts.map(p => <ProductCard key={p.id} product={p} />)}</div><div className="divider" /></>
        )}
        {(activeCategory === 'All' || activeCategory === 'Jeans') && (
          <><div className="section-header"><h2 className="section-title">U.S. Polo Jeans 👖</h2>
          </div>
          <div className="product-grid">{jeans.map(p => <ProductCard key={p.id} product={p} />)}</div></>
        )}
      </div>
      <footer className="footer">® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.</footer>
    </div>
  )
}