import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'
import '../styles/footwear.css'

export default function Footwear() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  const categories = [
    { name: 'Sneakers', count: 423 , img:'/image/footwear/women/sneakers/d5.jpg' },
    { name: 'Sports Shoes', count: 312 , img:'/image/footwear/women/sports shoes/d3.jpg' },
    { name: 'Formal Shoes', count: 245 , img:'/image/footwear/men/formal shoes/d1.jpg' },
    { name: 'Sandals', count: 389 , img:'/image/footwear/women/sandals/d9.jpg' },
    { name: 'Boots', count: 198 , img:'/image/footwear/men/boots/d1.jpg' },
    { name: 'Loafers', count: 167 , img:'/image/footwear/men/loafers/d1.jpg' },
    { name: 'Heels', count: 267 , img:'/image/footwear/women/heels/d6.jpg' },
    { name: 'Flats', count: 234 , img:'/image/footwear/women/flats/d5.jpg' },
    { name: 'Wedges', count: 156 , img:'/image/footwear/women/wedges/d3.jpg' },
    { name: 'Kolhapuri', count: 143 , img:'/image/footwear/women/kolhapuri/d1.jpg' },
    { name: 'Flip Flops', count: 312 , img:'/image/footwear/men/flip-flops/d1.jpg' },
    { name: 'Slip-ons', count: 198 , img:'/image/footwear/men/slip-ons/d1.jpg' },
  ]

  const budgetDeals = [
    { id: 101, name: 'Canvas Sneakers', price: '₹499', originalPrice: '₹999', rating: 4.1 , img: '/image/footwear/men/sneakers/d9.jpg' },
    { id: 102, name: 'Basic Sandals', price: '₹299', originalPrice: '₹599', rating: 4.0 , img: '/image/footwear/men/sandals/d4.jpg' },
    { id: 103, name: 'Casual Loafers', price: '₹599', originalPrice: '₹1,199', rating: 4.2 , img: '/image/footwear/men/loafers/d9.jpg' },
    { id: 104, name: 'Ethnic Juttis', price: '₹349', originalPrice: '₹699', rating: 4.1 , img: '/image/footwear/women/juttis/d7.jpg' },
    { id: 105, name: 'Flip Flops', price: '₹199', originalPrice: '₹399', rating: 4.3 , img: '/image/footwear/men/flip-flops/d2.jpg' },
    { id: 106, name: 'Slip-on Shoes', price: '₹449', originalPrice: '₹899', rating: 4.2 , img: '/image/footwear/women/slip-ons/d2.jpg' },
    { id: 107, name: 'Sports Sandals', price: '₹399', originalPrice: '₹799', rating: 4.0 , img: '/image/footwear/women/sandals/d10.jpg' },
    { id: 108, name: 'Kolhapuri Flats', price: '₹379', originalPrice: '₹749', rating: 4.4 , img: '/image/footwear/women/kolhapuri/d3.jpg' },
  ]

  const dealsOfDay = [
    { id: 201, name: 'Running Shoes', price: '₹1,499', originalPrice: '₹2,999', discount: '50%', rating: 4.6 ,img:'/image/footwear/women/sports shoes/d4.jpg'},
    { id: 202, name: 'Leather Boots', price: '₹1,999', originalPrice: '₹3,999', discount: '50%', rating: 4.7 ,img:'/image/footwear/women/boots/d5.jpg'},
    { id: 203, name: 'Block Heel Sandals', price: '₹899', originalPrice: '₹1,799', discount: '50%', rating: 4.5 ,img: '/image/footwear/women/sandals/d11.jpg' },
    { id: 204, name: 'Formal Oxford Shoes', price: '₹1,799', originalPrice: '₹3,599', discount: '50%', rating: 4.8,img: '/image/footwear/women/boots/d6.jpg' },
  ]

  const mostPopular = [
    { id: 301, name: 'Air Cushion Sneakers', price: '₹2,499', rating: 4.7, tag: 'Hot' ,img:'/image/footwear/women/sneakers/d6.jpg' },
    { id: 302, name: 'Platform Heels', price: '₹1,799', rating: 4.5, tag: 'Trending' ,img:'/image/footwear/women/heels/d8.jpg'},
    { id: 303, name: 'Chelsea Boots', price: '₹2,799', rating: 4.6, tag: 'Popular' ,img:'/image/footwear/men/boots/d5.jpg'},
    { id: 304, name: 'Strappy Sandals', price: '₹999', rating: 4.4, tag: 'New' ,img:'/image/footwear/men/sandals/d2.jpg'},
    { id: 305, name: 'Derby Shoes', price: '₹2,199', rating: 4.5, tag: 'Hot' ,img:'/image/footwear/men/derby-shoes/d3.jpg'},
    { id: 306, name: 'Wedge Sandals', price: '₹1,299', rating: 4.3, tag: 'Trending' ,img:'/image/footwear/women/sandals/d7.jpg'},
    { id: 307, name: 'High Top Sneakers', price: '₹2,299', rating: 4.6, tag: 'Popular' ,img:'/image/footwear/men/sneakers/d10.jpg'},
    { id: 308, name: 'Ankle Strap Heels', price: '₹1,599', rating: 4.4, tag: 'New' ,img:'/image/footwear/women/heels/d6.jpg'},
  ]

  const trending = [
    { id: 401, name: 'Chunky Sneakers', price: '₹2,199', rating: 4.5, tag: 'Trending' ,img:'/image/footwear/men/sneakers/d11.jpg'},
    { id: 402, name: 'Knee High Boots', price: '₹3,299', rating: 4.7, tag: 'Hot', img: '/image/footwear/women/boots/d7.jpg' },
    { id: 403, name: 'Espadrille Wedges', price: '₹1,299', rating: 4.4, tag: 'New' ,img:'/image/footwear/women/wedges/d1.jpg'},
    { id: 404, name: 'Loafer Mules', price: '₹1,499', rating: 4.3, tag: 'Popular' ,img:'/image/footwear/women/juttis/d8.jpg'},
    { id: 405, name: 'Retro Sneakers', price: '₹1,899', rating: 4.6, tag: 'Trending' ,img:'/image/footwear/men/sneakers/d2.jpg'},
    { id: 406, name: 'Gladiator Sandals', price: '₹899', rating: 4.2, tag: 'Hot' ,img:'/image/footwear/women/sandals/d8.jpg'},
    { id: 407, name: 'Suede Loafers', price: '₹1,999', rating: 4.5, tag: 'New' ,img:'/image/footwear/men/loafers/d3.jpg'},
    { id: 408, name: 'Square Toe Mules', price: '₹1,299', rating: 4.4, tag: 'Popular' ,img:'/image/footwear/women/mules/d4.jpg'},
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

      <div className="wrapper_footwear">

        {/* Header */}
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <h1 className="page-title">Footwear</h1>
        </div>

        {/* Gender Cards */}
        <div className="gender-grid">

          {/* For Him */}
          <div className="gender-card gender-card-him" onClick={() => navigate('/products/footwear/men')}>
            <div className="gender-card-img">
              <img src="/image/footwear/banner/him.jpg" alt="For Him" />
            </div>
            <div className="gender-card-overlay">
              <span className="gender-tag">Men's Collection</span>
              <div className="gender-title">For Him</div>
              <div className="gender-desc">Sneakers, Formals, Sports & more</div>
              <button className="gender-btn">Shop Now →</button>
            </div>
          </div>

          {/* For Her */}
          <div className="gender-card gender-card-her" onClick={() => navigate('/products/footwear/women')}>
            <div className="gender-card-img">
              <img src="/image/footwear/banner/her.jpg" alt="For Her" />
            </div>
            <div className="gender-card-overlay">
              <span className="gender-tag">Women's Collection</span>
              <div className="gender-title">For Her</div>
              <div className="gender-desc">Heels, Flats, Boots & more</div>
              <button className="gender-btn">Shop Now →</button>
            </div>
          </div>

        </div>

        {/* Categories */}
        {/* Categories */}
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <span className="see-all" onClick={() => navigate('/common/footwear')}>
              See All <span className="see-all-arrow">→</span>
            </span>
          </div>
          <div className="cat-grid">
            {categories.map(cat => (
              <div
                key={cat.name}
                className="cat-card"
                onClick={() => navigate(`/common/footwear?category=${encodeURIComponent(cat.name)}`)}
              >
                <div className="cat-img"><img src={cat.img} alt={cat.name} /></div>
                <div className="cat-name">{cat.name}</div>
                <div className="cat-count">{cat.count} items</div>
              </div>
            ))}
          </div>

        <div className="divider" />

        {/* Budget Friendly Deals */}
        <div className="section-header">
          <h2 className="section-title">Budget Friendly Deals 💰</h2>
          <span className="see-all" onClick={() => navigate('/products/budget-deals?category=Footwear')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="product-grid">
          {budgetDeals.map(p => (
            <div key={p.id} className="product-card">
              <div className="product-img-wrap" style={{ height: '250px' }}>
                <img src={p.img} alt={p.name} />
                <button className="wishlist-btn" onClick={() => toggleWishlist(p.id)}>
                  <svg width="16" height="16" fill={wishlist.includes(p.id) ? '#FF4B4B' : 'none'} stroke={wishlist.includes(p.id) ? '#FF4B4B' : '#fff'} strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
                <span className="product-tag" style={{ background: '#FF4B4B' }}>SALE</span>
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

        {/* Deals of the Day */}
        <div className="section-header">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2 className="section-title">Deals of the Day</h2>
            <span className="deal-timer">⏰ Ends in 03:15:45</span>
          </div>
          <span className="see-all" onClick={() => navigate('/products/deals?category=Footwear')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="product-grid">
          {dealsOfDay.map(p => (
            <div key={p.id} className="product-card">
              <div className="product-img-wrap" style={{ height: '250px' }}>
                <img src={p.img} alt={p.name} />
                <button className="wishlist-btn" onClick={() => toggleWishlist(p.id)}>
                  <svg width="16" height="16" fill={wishlist.includes(p.id) ? '#FF4B4B' : 'none'} stroke={wishlist.includes(p.id) ? '#FF4B4B' : '#fff'} strokeWidth="2" viewBox="0 0 24 24">
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
          <h2 className="section-title">Most Popular ⭐</h2>
          <span className="see-all" onClick={() => navigate('/products/most-popular?category=Footwear')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="product-grid">
          {mostPopular.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        <div className="divider" />

        {/* Trending */}
        <div className="section-header">
          <h2 className="section-title">Trending Now 🔥</h2>
          <span className="see-all" onClick={() => navigate('/products/trending?category=Footwear')}>
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