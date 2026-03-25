import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function SkechersFootwearWomen() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  const categories = [
    { name: 'All', count: 24 },
    { name: 'Sport Shoes', count: 8 },
    { name: 'Casual Shoes', count: 8 },
    { name: 'Flip-Flops', count: 8 },
  ]

  const sportShoes = [
    { id: 801, name: 'Skechers Go Run Consistent 2.0', price: '₹4,499', originalPrice: '₹6,499', rating: 4.7, tag: 'Bestseller', img: '/image/footwear/women/brand/skechers/a1.jpg' },
    { id: 802, name: 'Skechers Arch Fit Uplift', price: '₹5,499', originalPrice: '₹7,499', rating: 4.6, tag: 'New', img: '/image/footwear/women/brand/skechers/a2.jpg' },
    { id: 803, name: 'Skechers Max Cushioning Premier', price: '₹5,999', originalPrice: '₹8,499', rating: 4.5, tag: 'Sale', img: '/image/footwear/women/brand/skechers/a3.jpg' },
    { id: 804, name: 'Skechers Go Walk Joy', price: '₹3,799', originalPrice: '₹5,299', rating: 4.4, tag: null, img: '/image/footwear/women/brand/skechers/a4.jpg' },
    { id: 805, name: 'Skechers Summits Crown Jewel', price: '₹4,299', originalPrice: '₹5,999', rating: 4.6, tag: 'Trending', img: '/image/footwear/women/brand/skechers/a5.jpg' },
    { id: 806, name: 'Skechers Glide Step Swift', price: '₹4,999', originalPrice: '₹6,999', rating: 4.5, tag: 'Popular', img: '/image/footwear/women/brand/skechers/a6.jpg' },
    { id: 807, name: 'Skechers Go Run Pulse 2.0 W', price: '₹3,999', originalPrice: '₹5,499', rating: 4.3, tag: null, img: '/image/footwear/women/brand/skechers/a7.jpg' },
    { id: 808, name: 'Skechers Equalizer 5.0 Trrizn', price: '₹3,299', originalPrice: '₹4,799', rating: 4.2, tag: 'Sale', img: '/image/footwear/women/brand/skechers/a8.jpg' },
  ]

  const casualShoes = [
    { id: 821, name: 'Skechers Street Bobs Squad', price: '₹2,999', originalPrice: '₹4,299', rating: 4.6, tag: 'Bestseller', img: '/image/footwear/women/brand/skechers/b1.jpg' },
    { id: 822, name: 'Skechers Bobs Bamina', price: '₹2,499', originalPrice: '₹3,699', rating: 4.5, tag: 'New', img: '/image/footwear/women/brand/skechers/b2.jpg' },
    { id: 823, name: 'Skechers Uno Stand On Air', price: '₹3,299', originalPrice: '₹4,799', rating: 4.7, tag: 'Trending', img: '/image/footwear/women/brand/skechers/b3.jpg' },
    { id: 824, name: "Skechers D'Lites Fresh Start", price: '₹2,799', originalPrice: '₹3,999', rating: 4.4, tag: null, img: '/image/footwear/women/brand/skechers/b4.jpg' },
    { id: 825, name: 'Skechers Breathe Easy Sweet Jamz', price: '₹2,299', originalPrice: '₹3,299', rating: 4.3, tag: 'Sale', img: '/image/footwear/women/brand/skechers/b5.jpg' },
    { id: 826, name: 'Skechers Graceful Get Connected', price: '₹2,599', originalPrice: '₹3,799', rating: 4.5, tag: 'Popular', img: '/image/footwear/women/brand/skechers/b6.jpg' },
    { id: 827, name: 'Skechers Bobs Plush Be Loved', price: '₹1,999', originalPrice: '₹2,999', rating: 4.2, tag: null, img: '/image/footwear/women/brand/skechers/b7.jpg' },
    { id: 828, name: 'Skechers Street Flex Appeal 4.0', price: '₹3,499', originalPrice: '₹4,999', rating: 4.6, tag: 'New', img: '/image/footwear/women/brand/skechers/b8.jpg' },
  ]

  const flipFlops = [
    { id: 811, name: 'Skechers Cali Breeze 2.0', price: '₹1,299', originalPrice: '₹1,999', rating: 4.6, tag: 'Bestseller', img: '/image/footwear/women/brand/skechers/c1.jpg' },
    { id: 812, name: 'Skechers Meditation Rock Crown', price: '₹1,099', originalPrice: '₹1,699', rating: 4.4, tag: 'New', img: '/image/footwear/women/brand/skechers/c2.jpg' },
    { id: 813, name: 'Skechers Go Consistent Sandal W', price: '₹899', originalPrice: '₹1,499', rating: 4.3, tag: 'Sale', img: '/image/footwear/women/brand/skechers/c3.jpg' },
    { id: 814, name: 'Skechers Foamies Arch Fit', price: '₹1,199', originalPrice: '₹1,799', rating: 4.2, tag: null, img: '/image/footwear/women/brand/skechers/c4.jpg' },
    { id: 815, name: 'Skechers Hyper Slide Luxe', price: '₹1,599', originalPrice: '₹2,299', rating: 4.5, tag: 'Trending', img: '/image/footwear/women/brand/skechers/c5.jpg' },
    { id: 816, name: 'Skechers Arch Fit Slide W', price: '₹1,899', originalPrice: '₹2,699', rating: 4.6, tag: 'Popular', img: '/image/footwear/women/brand/skechers/c6.jpg' },
    { id: 817, name: 'Skechers Cali Gear Slide', price: '₹799', originalPrice: '₹1,299', rating: 4.1, tag: 'Sale', img: '/image/footwear/women/brand/skechers/c7.jpg' },
    { id: 818, name: 'Skechers Max Cushioning Luxe Slide', price: '₹1,699', originalPrice: '₹2,399', rating: 4.4, tag: 'New', img: '/image/footwear/women/brand/skechers/c8.jpg' },
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
          <h1 className="page-title">Skechers Women's Footwear</h1>
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
              <h2 className="section-title">Skechers Sport Shoes 👟</h2>
            </div>
            <div className="product-grid">
              {sportShoes.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="divider" />
          </>
        )}

        {/* Casual Shoes Section */}
        {(activeCategory === 'All' || activeCategory === 'Casual Shoes') && (
          <>
            <div className="section-header">
              <h2 className="section-title">Skechers Casual Shoes 👠</h2>
            </div>
            <div className="product-grid">
              {casualShoes.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="divider" />
          </>
        )}

        {/* Flip-Flops Section */}
        {(activeCategory === 'All' || activeCategory === 'Flip-Flops') && (
          <>
            <div className="section-header">
              <h2 className="section-title">Skechers Flip-Flops & Slides 🩴</h2>
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