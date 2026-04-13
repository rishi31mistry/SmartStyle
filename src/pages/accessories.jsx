import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'
import '../styles/accessories.css'

export default function Accessories() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])

  const parsePrice = (val) => {
    if (val == null) return 0
    const num = String(val).replace(/[^\d.]/g, '')
    return num ? Number(num) : 0
  }

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const res = await fetch('/api/wishlist', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      const ids = Array.isArray(data) ? data.map(i => String(i.productId)) : []
      setWishlist(ids)
    } catch (err) {
      console.log(err)
    }
  }

  const toggleWishlist = async (p) => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return }

    const pid = String(p.id)
    try {
      if (wishlist.includes(pid)) {
        await fetch(`/api/wishlist/remove/${pid}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        })
        setWishlist(prev => prev.filter(id => id !== pid))
      } else {
        await fetch('/api/wishlist/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            productId: pid,
            name: p.name,
            price: parsePrice(p.price),
            image: p.img
          })
        })
        setWishlist(prev => [...prev, pid])
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchWishlist()
  }, [])

  const menCategories = [
    { name: 'Watches', img: '/image/accessories/men/watch/d3.jpg'},
    { name: 'Wallets' ,img: '/image/accessories/men/wallet/d1.jpg'},
    { name: 'Belts', img: '/image/accessories/men/belt/d1.jpg'},
    { name: 'Sunglasses', img: '/image/accessories/men/sunglasses/d1.jpg'},
    { name: 'Caps & Hats',img: '/image/accessories/men/hat/d2.jpg' },
    { name: 'Ties', img: '/image/accessories/men/ties/d1.jpg' },
    { name: 'Cufflinks', img: '/image/accessories/men/cufflinks/d1.jpg'},
    { name: 'Bags & Backpacks', img: '/image/accessories/men/bag/d1.jpg' },
    { name: 'Keychains', img: '/image/accessories/men/keychains/d1.jpg' },
    { name: 'Bracelets',img: '/image/accessories/men/bracelet/d1.jpg'},
    { name: 'Trimmer', img: '/image/accessories/men/trimmer/d1.jpg' },
    { name: 'Perfumes', img: '/image/accessories/men/perfumes/d1.jpg' },
  ]

  const womenCategories = [
    { name: 'Handbags', img: '/image/accessories/women/bags/d1.jpg' },
    { name: 'Jewellery',img: '/image/accessories/women/jewellery/d1.jpg'},
    { name: 'Watches', img: '/image/accessories/women/watch/d1.jpg' },
    { name: 'Sunglasses', img: '/image/accessories/women/sunglasses/d1.jpg'  },
    { name: 'Scarves & Stoles',img: '/image/accessories/women/scarf/d2.jpg' },
    { name: 'Hair Accessories', img: '/image/accessories/women/hair/d1.jpg' },
    { name: 'Earrings', img: '/image/accessories/women/earrings/d1.jpg'},
    { name: 'Necklaces', img: '/image/accessories/women/necklace/d1.jpg'},
    { name: 'Bangles', img: '/image/accessories/women/bangle/d1.jpg' },
    { name: 'Clutches', img: '/image/accessories/women/clutche/d1.jpg'},
    { name: 'Rings',img: '/image/accessories/women/ring/d1.jpg'},
    { name: 'Perfumes', img: '/image/accessories/women/perfume/d1.jpg'},
  ]

  const dealsOfDay = [
    { id: 201, name: 'Leather Wallet', price: '₹499', originalPrice: '₹999', discount: '50%', rating: 4.4 ,img: '/image/accessories/men/wallet/d2.jpg' },
    { id: 202, name: 'Pearl Necklace Set', price: '₹649', originalPrice: '₹1,299', discount: '50%', rating: 4.6 ,img: '/image/accessories/women/necklace/d2.jpg' },
    { id: 203, name: 'Analog Watch', price: '₹1,999', originalPrice: '₹3,999', discount: '50%', rating: 4.7  ,img: '/image/accessories/men/watch/d3.jpg'  },
    { id: 204, name: 'Tote Handbag', price: '₹899', originalPrice: '₹1,799', discount: '50%', rating: 4.3  ,img: '/image/accessories/women/bags/d3.jpg'  },
  ]

  const topPicks = [
    { id: 301, name: 'Chronograph Watch', price: '₹3,499', rating: 4.7, tag: 'Hot'  ,img: '/image/accessories/men/watch/d4.jpg' },
    { id: 302, name: 'Gold Hoop Earrings', price: '₹799', rating: 4.6, tag: 'Popular'  ,img: '/image/accessories/women/earrings/d2.jpg'  },
    { id: 303, name: 'Leather Crossbody Bag', price: '₹1,799', rating: 4.5, tag: 'Trending' ,img: '/image/accessories/women/bags/d4.jpg' },
    { id: 304, name: 'Aviator Sunglasses', price: '₹1,299', rating: 4.8, tag: 'New' ,img: '/image/accessories/men/sunglasses/d3.jpg' },
    { id: 305, name: 'Silk Scarf', price: '₹699', rating: 4.4, tag: 'Hot' ,img: '/image/accessories/women/scarf/d1.jpg' },
    { id: 306, name: 'Beaded Bracelet Set', price: '₹499', rating: 4.5, tag: 'Popular' ,img: '/image/accessories/women/bracelet/d1.jpg' },
    { id: 307, name: 'Canvas Backpack', price: '₹1,499', rating: 4.3, tag: 'Trending' ,img: '/image/accessories/men/bag/d2.jpg' },
    { id: 308, name: 'Minimalist Watch', price: '₹2,999', rating: 4.6, tag: 'New' ,img: '/image/accessories/men/watch/d5.jpg' },
  ]

  const trending = [
    { id: 401, name: 'Smart Watch', price: '₹4,999', rating: 4.7, tag: 'Trending' ,img: '/image/accessories/men/watch/d6.jpg'  },
    { id: 402, name: 'Layered Necklace', price: '₹899', rating: 4.5, tag: 'Hot' ,img: '/image/accessories/women/necklace/d3.jpg' },
    { id: 403, name: 'Bucket Hat', price: '₹599', rating: 4.3, tag: 'New' ,img: '/image/accessories/women/hat/d2.jpg' },
    { id: 404, name: 'Mini Shoulder Bag', price: '₹1,299', rating: 4.6, tag: 'Popular' ,img: '/image/accessories/women/bags/d5.jpg' },
    { id: 405, name: 'Stackable Rings Set', price: '₹699', rating: 4.4, tag: 'Trending' ,img: '/image/accessories/women/ring/d2.jpg' },
    { id: 406, name: 'Printed Tote Bag', price: '₹799', rating: 4.2, tag: 'Hot' ,img: '/image/accessories/women/bags/d6.jpg' },
    { id: 407, name: 'Charm Bracelet', price: '₹549', rating: 4.5, tag: 'New' ,img: '/image/accessories/women/bracelet/d2.jpg' },
    { id: 408, name: 'Polarized Sunglasses', price: '₹1,499', rating: 4.6, tag: 'Popular' ,img: '/image/accessories/men/sunglasses/d4.jpg' },
  ]

  const tagColor = (tag) => {
    if (tag === 'Hot') return '#F5A623'
    if (tag === 'New') return '#4A90D9'
    if (tag === 'Trending') return '#E91E8C'
    return '#00897B'
  }

  const ProductCard = ({ product }) => (
    <div className="product-card">
      <div className="product-img-wrap" style={{ height: '250px' }}>
        <img src={product.img} alt={product.name} />
        <button className="wishlist-btn" onClick={() => toggleWishlist(product)}>
          <svg width="16" height="16" fill={wishlist.includes(String(product.id)) ? '#FF4B4B' : 'none'} stroke={wishlist.includes(String(product.id)) ? '#FF4B4B' : '#fff'} strokeWidth="2" viewBox="0 0 24 24">
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
          <span className="product-price">{product.price}</span>
          {product.rating && <span className="product-rating">★ {product.rating}</span>}
        </div>
        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  )

  return (
    <div className="page">
      <Navbar active="" />

      <div className="wrapper_accessories">

        {/* Header */}
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <h1 className="page-title">Accessories</h1>
        </div>

        {/* Men's Categories */}
        <div className="section-header">
          <div className="section-title-wrap">
            <div className="section-bar-blue" />
            <h2 className="section-title">Men's Accessories</h2>
          </div>
          <span className="see-all" onClick={() => navigate('/common/accessories?gender=Men')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="cat-grid">
          {menCategories.map(cat => (
            <div
              key={cat.name}
              className="cat-card"
              onClick={() => navigate(`/common/accessories?gender=Men&category=${encodeURIComponent(cat.name)}`)}
            >
              <div className="cat-img"><img src={cat.img} alt={cat.name} /></div>
              <div className="cat-name">{cat.name}</div>
            </div>
          ))}
        </div>

        <div className="divider" />

        {/* Women's Categories */}
        <div className="section-header">
          <div className="section-title-wrap">
            <div className="section-bar-pink" />
            <h2 className="section-title">Women's Accessories</h2>
          </div>
          <span className="see-all" onClick={() => navigate('/common/accessories?gender=Women')}>
            See All <span className="see-all-arrow see-all-arrow-pink">→</span>
          </span>
        </div>
        <div className="cat-grid">
          {womenCategories.map(cat => (
            <div
              key={cat.name}
              className="cat-card"
              onClick={() => navigate(`/common/accessories?gender=Women&category=${encodeURIComponent(cat.name)}`)}
            >
              <div className="cat-img"><img src={cat.img} alt={cat.name} /></div>
              <div className="cat-name">{cat.name}</div>
            </div>
          ))}
        </div>

        <div className="divider" />

        {/* Deals of the Day */}
        <div className="section-header">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2 className="section-title">Deals of the Day</h2>
            <span className="deal-timer">⏰ Ends in 02:45:30</span>
          </div>
          <span className="see-all" onClick={() => navigate('/products/deals?category=Accessories')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="product-grid">
          {dealsOfDay.map(p => (
            <div key={p.id} className="product-card">
              <div className="product-img-wrap" style={{ height: '250px' }}>
                <img src={p.img} alt={p.name} />
                <button className="wishlist-btn" onClick={() => toggleWishlist(p)}>
                  <svg width="16" height="16" fill={wishlist.includes(String(p.id)) ? '#FF4B4B' : 'none'} stroke={wishlist.includes(String(p.id)) ? '#FF4B4B' : '#fff'} strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
                <span className="product-tag" style={{ background: '#FF4B4B' }}>-{p.discount}</span>
              </div>
              <div className="product-info">
                <div className="product-name">{p.name}</div>
                <div className="product-meta">
                  <div>
                    <span className="product-price">{p.price}</span>
                    <span className="original-price"> {p.originalPrice}</span>
                  </div>
                  <span className="product-rating">★ {p.rating}</span>
                </div>
                <button className="add-to-cart-btn">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>

        <div className="divider" />

        {/* Most Popular */}
        <div className="section-header">
          <h2 className="section-title">Most Popular✨</h2>
          <span className="see-all" onClick={() => navigate('/products/most-popular?category=Accessories')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="product-grid">
          {topPicks.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        <div className="divider" />

        {/* Trending */}
        <div className="section-header">
          <h2 className="section-title">Trending Now 🔥</h2>
          <span className="see-all" onClick={() => navigate('/products/trending?category=Accessories')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="product-grid">
          {trending.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

      </div>

      <footer className="footer">
        ® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.
      </footer>
    </div>
  )
}

