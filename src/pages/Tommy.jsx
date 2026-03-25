import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function Tommy() {
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
    { id: 801, name: 'Tommy Flag Logo Tee', price: '₹1,499', originalPrice: '₹2,499', rating: 4.5, tag: 'Bestseller', img: '/image/men/brand/tommy/t1.jpg' },
    { id: 802, name: 'Tommy Classic Crew Tee', price: '₹1,299', originalPrice: '₹2,099', rating: 4.3, tag: 'Sale', img: '/image/men/brand/tommy/t2.jpg' },
    { id: 803, name: 'Tommy Stripe Tee', price: '₹1,599', originalPrice: '₹2,699', rating: 4.6, tag: 'New', img: '/image/men/brand/tommy/t3.jpg' },
    { id: 804, name: 'Tommy Slim Fit Tee', price: '₹1,399', originalPrice: '₹2,299', rating: 4.4, tag: null, img: '/image/men/brand/tommy/t4.jpg' },
    { id: 805, name: 'Tommy Hilfiger Logo Tee', price: '₹1,349', originalPrice: '₹2,199', rating: 4.3, tag: 'Trending', img: '/image/men/brand/tommy/t5.jpg' },
    { id: 806, name: 'Tommy Essential Tee', price: '₹1,699', originalPrice: '₹2,799', rating: 4.7, tag: 'Popular', img: '/image/men/brand/tommy/t6.jpg' },
    { id: 807, name: 'Tommy Sport Tee', price: '₹1,449', originalPrice: '₹2,399', rating: 4.2, tag: null, img: '/image/men/brand/tommy/t7.jpg' },
    { id: 808, name: 'Tommy Pocket Tee', price: '₹1,199', originalPrice: '₹1,999', rating: 4.1, tag: 'Sale', img: '/image/men/brand/tommy/t8.jpg' },
  ]

  const shirts = [
    { id: 811, name: 'Tommy Oxford Shirt', price: '₹2,499', originalPrice: '₹3,999', rating: 4.5, tag: 'New', img: '/image/men/brand/tommy/s1.jpg' },
    { id: 812, name: 'Tommy Linen Shirt', price: '₹2,199', originalPrice: '₹3,599', rating: 4.4, tag: null, img: '/image/men/brand/tommy/s2.jpg' },
    { id: 813, name: 'Tommy Check Shirt', price: '₹2,699', originalPrice: '₹4,299', rating: 4.6, tag: 'Trending', img: '/image/men/brand/tommy/s3.jpg' },
    { id: 814, name: 'Tommy Slim Shirt', price: '₹2,099', originalPrice: '₹3,399', rating: 4.3, tag: 'Bestseller', img: '/image/men/brand/tommy/s4.jpg' },
    { id: 815, name: 'Tommy Casual Shirt', price: '₹1,999', originalPrice: '₹3,299', rating: 4.5, tag: 'Popular', img: '/image/men/brand/tommy/s5.jpg' },
    { id: 816, name: 'Tommy Stripe Shirt', price: '₹2,899', originalPrice: '₹4,699', rating: 4.4, tag: 'New', img: '/image/men/brand/tommy/s6.jpg' },
    { id: 817, name: 'Tommy Printed Shirt', price: '₹1,799', originalPrice: '₹2,999', rating: 4.2, tag: 'Sale', img: '/image/men/brand/tommy/s7.jpg' },
    { id: 818, name: 'Tommy Regular Shirt', price: '₹1,899', originalPrice: '₹3,099', rating: 4.3, tag: null, img: '/image/men/brand/tommy/s8.jpg' },
  ]

  const jeans = [
    { id: 821, name: 'Tommy Scanton Slim Jeans', price: '₹3,299', originalPrice: '₹5,299', rating: 4.5, tag: 'Bestseller', img: '/image/men/brand/tommy/p1.jpg' },
    { id: 822, name: 'Tommy Bleecker Slim Jeans', price: '₹3,099', originalPrice: '₹4,999', rating: 4.6, tag: 'Popular', img: '/image/men/brand/tommy/p2.jpg' },
    { id: 823, name: 'Tommy Denton Straight Jeans', price: '₹2,899', originalPrice: '₹4,699', rating: 4.4, tag: 'New', img: '/image/men/brand/tommy/p3.jpg' },
    { id: 824, name: 'Tommy Ryan Straight Jeans', price: '₹2,799', originalPrice: '₹4,499', rating: 4.3, tag: 'Trending', img: '/image/men/brand/tommy/p4.jpg' },
    { id: 825, name: 'Tommy Houston Relaxed Jeans', price: '₹3,499', originalPrice: '₹5,599', rating: 4.7, tag: 'New', img: '/image/men/brand/tommy/p5.jpg' },
    { id: 826, name: 'Tommy Steve Slim Tapered', price: '₹2,599', originalPrice: '₹4,199', rating: 4.2, tag: 'Sale', img: '/image/men/brand/tommy/p6.jpg' },
    { id: 827, name: 'Tommy Ronnie Skinny Jeans', price: '₹2,999', originalPrice: '₹4,799', rating: 4.4, tag: null, img: '/image/men/brand/tommy/p7.jpg' },
    { id: 828, name: 'Tommy Classic Denim', price: '₹2,399', originalPrice: '₹3,899', rating: 4.1, tag: 'Sale', img: '/image/men/brand/tommy/p8.jpg' },
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
          <h1 className="page-title">Tommy Hilfiger</h1>
        </div>
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat.name} onClick={() => setActiveCategory(cat.name)} style={{ padding: '10px 22px', borderRadius: '50px', border: activeCategory === cat.name ? 'none' : '1.5px solid #ddd', background: activeCategory === cat.name ? '#CC0000' : '#fff', color: activeCategory === cat.name ? '#fff' : '#444', fontSize: '13px', fontWeight: '600', fontFamily: 'Poppins, sans-serif', cursor: 'pointer', transition: 'all 0.2s' }}>
              {cat.name}<span style={{ marginLeft: '6px', fontSize: '11px', opacity: 0.7 }}>({cat.count})</span>
            </button>
          ))}
        </div>
        {(activeCategory === 'All' || activeCategory === 'T-Shirts') && (
          <><div className="section-header"><h2 className="section-title">Tommy T-Shirts 👕</h2>
          </div>
          <div className="product-grid">{tshirts.map(p => <ProductCard key={p.id} product={p} />)}</div><div className="divider" /></>
        )}
        {(activeCategory === 'All' || activeCategory === 'Shirts') && (
          <><div className="section-header"><h2 className="section-title">Tommy Shirts 🧥</h2>
          </div>
          <div className="product-grid">{shirts.map(p => <ProductCard key={p.id} product={p} />)}</div><div className="divider" /></>
        )}
        {(activeCategory === 'All' || activeCategory === 'Jeans') && (
          <><div className="section-header"><h2 className="section-title">Tommy Jeans 👖</h2>
          </div>
          <div className="product-grid">{jeans.map(p => <ProductCard key={p.id} product={p} />)}</div></>
        )}
      </div>
      <footer className="footer">® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.</footer>
    </div>
  )
}