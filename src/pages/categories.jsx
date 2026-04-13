import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'
import '../styles/categories.css'

export default function Categories() {
  const navigate = useNavigate()

  const mainCategories = [
    {
      id: 1,
      title: "Men's Fashion",
      desc: 'Shirts, Tees, Jeans, Kurtas & more',
      path: '/common/men',
      bg: 'linear-gradient(135deg, #1565C0, #42a5f5)',
      img: '/image/men/jeans/p5.jpg',
    },
    {
      id: 2,
      title: "Women's Fashion",
      desc: 'Dresses, Kurtas, Sarees, Tops & more',
      path: '/common/women',
      bg: 'linear-gradient(135deg, #E91E8C, #f472b6)',
      img: '/image/women/dress/d13.jpg',
    },
    {
      id: 3,
      title: 'Footwear',
      desc: 'Sneakers, Heels, Sports, Formals & more',
      path: '/common/footwear',
      bg: 'linear-gradient(135deg, #1b5e20, #388e3c)',
      img: '/image/footwear/men/sneakers/d2.jpg',
    },
    {
      id: 4,
      title: 'Accessories',
      desc: 'Watches, Bags, Jewellery, Belts & more',
      path: '/common/accessories',
      bg: 'linear-gradient(135deg, #e65100, #f57c00)',
      img: '/image/accessories/men/watch/d3.jpg',
    },
  ]

  const saleBanners = [
    {
      id: 1,
      label: 'Up to 50% Off',
      desc: 'On selected fashion',
      bg: 'linear-gradient(135deg, #1565C0, #42a5f5)',
      path: '/products/flash-sale?discount=Up to 50%',
    },
    {
      id: 2,
      label: 'Up to 60% Off',
      desc: 'On top brands',
      bg: 'linear-gradient(135deg, #E91E8C, #f472b6)',
      path: '/products/flash-sale?discount=Up to 60%',
    },
    {
      id: 3,
      label: 'Up to 70% Off',
      desc: 'Flash deals today',
      bg: 'linear-gradient(135deg, #b71c1c, #e53935)',
      path: '/products/flash-sale?discount=Up to 70%',
    },
  ]


  return (
    <div className="page">
      <Navbar active="categories" />

      <div className="wrapper">

        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">All Categories</h1>
        </div>

        {/* Main Categories */}
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
        </div>
        <div className="cat-main-grid">
          {mainCategories.map(cat => (
            <div
              key={cat.id}
              className="cat-main-card"
              style={{ background: cat.bg }}
              onClick={() => navigate(cat.path)}
            >
              <div className="cat-main-img">
                <img src={cat.img} alt={cat.title} />
              </div>
              <div className="cat-main-info">
                <div className="cat-main-title">{cat.title}</div>
                <div className="cat-main-desc">{cat.desc}</div>
                <div className="cat-main-count">{cat.count}</div>
                <button className="cat-main-btn">Shop Now →</button>
              </div>
            </div>
          ))}
        </div>

        <div className="divider" />

        {/* Summer Sale Banner */}
        <div
          className="summer-sale-banner"
          onClick={() => navigate('/products/summer-special')}
        >
          <div className="summer-sale-text">
            <div className="summer-sale-tag">☀️ Limited Time</div>
            <div className="summer-sale-title">Summer Sale</div>
            <div className="summer-sale-desc">Biggest sale of the season — shop now before it ends!</div>
            <button className="summer-sale-btn">Shop Now →</button>
          </div>
          <div className="summer-sale-img">
            <img src="/image/sale/summer.jpg" alt="summer sale" />
          </div>
        </div>

        {/* Flash Sale */}
        <div className="divider" />

        <div className="section-header">
          <h2 className="section-title">⚡ Flash Sale</h2>
          <span className="see-all" onClick={() => navigate('/products/flash-sale')}>
            See All <span className="see-all-arrow">→</span>
          </span>
        </div>
        <div className="sale-banner-grid">
          {saleBanners.map(b => (
            <div
              key={b.id}
              className="sale-banner-card"
              style={{ background: b.bg }}
              onClick={() => navigate(b.path)}
            >
              <div className="sale-banner-label">{b.label}</div>
              <div className="sale-banner-desc">{b.desc}</div>
              <button className="sale-banner-btn">Shop Now →</button>
            </div>
          ))}
        </div>

       {/* Section Cards Grid */}
        <div className="divider" />
        <div className="section-header">
          <h2 className="section-title">Explore More</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '8px' }}>

          {/* Deals of the Day */}
          <div
            onClick={() => navigate('/products/deals')}
            style={{
              background: 'linear-gradient(135deg, #e65100, #f57c00)',
              borderRadius: '20px', padding: '32px 36px',
              cursor: 'pointer', position: 'relative',
              overflow: 'hidden', minHeight: '160px',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>⏰</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: '#fff', marginBottom: '6px' }}>Deals of the Day</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', marginBottom: '16px' }}>Special discounts refreshed every day</div>
            <button style={{ background: 'rgba(255,255,255,0.25)', border: '1.5px solid rgba(255,255,255,0.5)', color: '#fff', borderRadius: '10px', padding: '8px 18px', fontSize: '12px', fontWeight: '600', fontFamily: "'Poppins', sans-serif", cursor: 'pointer', width: 'fit-content' }}>
              Shop Now →
            </button>
          </div>

          {/* New Arrivals */}
          <div
            onClick={() => navigate('/products/new')}
            style={{
              background: 'linear-gradient(135deg, #1565C0, #42a5f5)',
              borderRadius: '20px', padding: '32px 36px',
              cursor: 'pointer', position: 'relative',
              overflow: 'hidden', minHeight: '160px',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>✨</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: '#fff', marginBottom: '6px' }}>New Arrivals</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', marginBottom: '16px' }}>Brand new styles added daily</div>
            <button style={{ background: 'rgba(255,255,255,0.25)', border: '1.5px solid rgba(255,255,255,0.5)', color: '#fff', borderRadius: '10px', padding: '8px 18px', fontSize: '12px', fontWeight: '600', fontFamily: "'Poppins', sans-serif", cursor: 'pointer', width: 'fit-content' }}>
              Shop Now →
            </button>
          </div>

          {/* Most Popular */}
          <div
            onClick={() => navigate('/products/most-popular')}
            style={{
              background: 'linear-gradient(135deg, #F5A623, #f7c948)',
              borderRadius: '20px', padding: '32px 36px',
              cursor: 'pointer', position: 'relative',
              overflow: 'hidden', minHeight: '160px',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>⭐</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: '#fff', marginBottom: '6px' }}>Most Popular</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', marginBottom: '16px' }}>Top picks loved by thousands</div>
            <button style={{ background: 'rgba(255,255,255,0.25)', border: '1.5px solid rgba(255,255,255,0.5)', color: '#fff', borderRadius: '10px', padding: '8px 18px', fontSize: '12px', fontWeight: '600', fontFamily: "'Poppins', sans-serif", cursor: 'pointer', width: 'fit-content' }}>
              Shop Now →
            </button>
          </div>

          {/* Just For You */}
          <div
            onClick={() => navigate('/products/just-for-you')}
            style={{
              background: 'linear-gradient(135deg, #6a1b9a, #9c27b0)',
              borderRadius: '20px', padding: '32px 36px',
              cursor: 'pointer', position: 'relative',
              overflow: 'hidden', minHeight: '160px',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>★</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: '#fff', marginBottom: '6px' }}>Just For You</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', marginBottom: '16px' }}>Curated based on your interests</div>
            <button style={{ background: 'rgba(255,255,255,0.25)', border: '1.5px solid rgba(255,255,255,0.5)', color: '#fff', borderRadius: '10px', padding: '8px 18px', fontSize: '12px', fontWeight: '600', fontFamily: "'Poppins', sans-serif", cursor: 'pointer', width: 'fit-content' }}>
              Shop Now →
            </button>
          </div>

          {/* Budget Friendly */}
          <div
            onClick={() => navigate('/products/budget-deals')}
            style={{
              background: 'linear-gradient(135deg, #2e7d32, #66bb6a)',
              borderRadius: '20px', padding: '32px 36px',
              cursor: 'pointer', position: 'relative',
              overflow: 'hidden', minHeight: '160px',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>💰</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: '#fff', marginBottom: '6px' }}>Budget Friendly Deals</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', marginBottom: '16px' }}>Great styles that won't break the bank</div>
            <button style={{ background: 'rgba(255,255,255,0.25)', border: '1.5px solid rgba(255,255,255,0.5)', color: '#fff', borderRadius: '10px', padding: '8px 18px', fontSize: '12px', fontWeight: '600', fontFamily: "'Poppins', sans-serif", cursor: 'pointer', width: 'fit-content' }}>
              Shop Now →
            </button>
          </div>

          {/* Trending Now */}
          <div
            onClick={() => navigate('/products/trending')}
            style={{
              background: 'linear-gradient(135deg, #E91E8C, #f472b6)',
              borderRadius: '20px', padding: '32px 36px',
              cursor: 'pointer', position: 'relative',
              overflow: 'hidden', minHeight: '160px',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔥</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: '#fff', marginBottom: '6px' }}>Trending Now</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', marginBottom: '16px' }}>The most talked about styles this season</div>
            <button style={{ background: 'rgba(255,255,255,0.25)', border: '1.5px solid rgba(255,255,255,0.5)', color: '#fff', borderRadius: '10px', padding: '8px 18px', fontSize: '12px', fontWeight: '600', fontFamily: "'Poppins', sans-serif", cursor: 'pointer', width: 'fit-content' }}>
              Shop Now →
            </button>
          </div>

        </div>

      </div>
      

      <footer className="footer">
        ® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.
      </footer>
    </div>
  )
}