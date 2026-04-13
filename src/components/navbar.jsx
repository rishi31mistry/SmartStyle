import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function NavItem({ item, active, mobile = false, badge = 0 }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  const isActive = active === item.id

  return (
    <div
      style={{
        ...(mobile ? styles.mobileNavItem : styles.navItem),
        color: isActive ? '#4A90D9' : hovered ? '#4A90D9' : '#bbb',
        background: !mobile && (isActive ? '#F0F5FF' : hovered ? '#F0F5FF' : 'transparent'),
        position: 'relative'
      }}
      onClick={() => navigate(item.path)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {item.icon}
      {badge > 0 && (
        <span style={{
          position: 'absolute',
          top: '2px',
          right: '6px',
          background: '#ef4444',
          color: '#fff',
          fontSize: '10px',
          fontWeight: '700',
          borderRadius: '50%',
          width: '16px',
          height: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {badge}
        </span>
      )}
    </div>
  )
}

export default function Navbar({ active }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    fetch('/api/cart', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setCartCount(data.length))
      .catch(err => console.log(err))
  }, [])

  const isMobile = windowWidth <= 600

  const items = [
    {
      id: 'home',
      path: '/home',
      icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="22" height="22"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>
    },
    {
      id: 'wishlist',
      path: '/wishlist',
      icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="22" height="22"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    },
    {
      id: 'categories',
      path: '/categories',
      icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="22" height="22"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
    },
    {
      id: 'cart',
      path: '/cart',
      icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="22" height="22"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
    },
    {
      id: 'account',
      path: '/account',
      icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="22" height="22"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    },
  ]

  return (
    <>
      {/* Desktop/Tablet top nav */}
      {!isMobile && (
        <div style={styles.brandHeader}>
          <h2 style={styles.brandName}>SMARTSTYLE</h2>
          <nav style={styles.topNav}>
            {items.map(item => (
              <NavItem
                key={item.id}
                item={item}
                active={active}
                badge={item.id === 'cart' ? cartCount : 0}
              />
            ))}
          </nav>
        </div>
      )}

      {/* Mobile — logo only on top */}
      {isMobile && (
        <div style={styles.mobileBrandHeader}>
          <h2 style={styles.brandName}>SMARTSTYLE</h2>
        </div>
      )}

      {/* Mobile — icons fixed at bottom */}
      {isMobile && (
        <div style={styles.mobileNav}>
          {items.map(item => (
            <NavItem
              key={item.id}
              item={item}
              active={active}
              mobile={true}
              badge={item.id === 'cart' ? cartCount : 0}
            />
          ))}
        </div>
      )}
    </>
  )
}

const styles = {
  brandHeader: {
    background: '#fff',
    padding: '14px 48px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mobileBrandHeader: {
    background: '#fff',
    padding: '14px 20px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#4A90D9',
    letterSpacing: '2px',
  },
  topNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '8px 14px',
    borderRadius: '10px',
    transition: 'all 0.2s',
  },
  mobileNav: {
    display: 'flex',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: '#fff',
    borderTop: '1px solid #eee',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px 0 18px',
    zIndex: 1000,
    boxShadow: '0 -4px 16px rgba(0,0,0,0.08)',
  },
  mobileNavItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: '4px 16px',
    borderRadius: '10px',
    transition: 'all 0.2s',
  },
}

