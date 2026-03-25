import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'
import '../styles/account.css'

function AccItem({ item }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="acc-item"
      style={{ background: hovered ? '#f9fbff' : '#fff' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="acc-item-icon">{item.icon}</div>
      <div className="acc-item-text">
        <div className="acc-item-title">{item.title}</div>
        <div className="acc-item-sub">{item.sub}</div>
      </div>
      <div className="acc-item-arrow">›</div>
    </div>
  )
}

export default function Account() {
  const navigate = useNavigate()
  const [logoutHovered, setLogoutHovered] = useState(false)
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({
    orders: 0,
    wishlist: 0,
    reviews: 0
  })

  useEffect(() => {
  const token = localStorage.getItem('token')
  if (!token) {
    navigate('/login')
    return
  }

  fetch('http://localhost:5000/api/user/profile', {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      setUser(data)
      setStats({
        orders: data.orders?.length || 0,
        wishlist: data.wishlist?.length || 0,
        reviews: 0
      })
    })
    .catch(err => console.log(err))
}, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const accSections = [
    {
      title: 'My Account',
      items: [
        { icon: '👤', title: 'Personal Information', sub: 'Name, email, phone' },
        { icon: '📍', title: 'Saved Addresses', sub: 'Home, work & more' },
        { icon: '💳', title: 'Payment Methods', sub: 'Cards, UPI, wallets' },
      ]
    },
    {
      title: 'My Orders',
      items: [
        { icon: '🛍️', title: 'Order History', sub: 'Track & manage orders' },
        { icon: '❤️', title: 'Wishlist', sub: `${stats.wishlist} saved items` },
        { icon: '⭐', title: 'My Reviews', sub: `${stats.reviews} reviews given` },
      ]
    },
    {
      title: 'Settings',
      items: [
        { icon: '🔔', title: 'Notifications', sub: 'Manage alerts & updates' },
        { icon: '🔒', title: 'Privacy & Security', sub: 'Password, data settings' },
        { icon: '⚙️', title: 'App Settings', sub: 'Language, theme' },
      ]
    },
  ]

  return (
    <div className="page">
      <Navbar active="account" />

      <div className="wrapper">

        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-left">
            <div className="profile-avatar">
              <img src="#img" alt="profile" />
            </div>
            <div className="profile-info">
              <div className="profile-name">
                {user ? user.name : 'Loading...'}
              </div>
              <div className="profile-email">
                {user ? user.email : ''}
              </div>
              <button className="edit-profile-btn">✏️ Edit Profile</button>
            </div>
          </div>
          <div className="profile-stats">
            <div className="profile-stat">
              <div className="stat-num">{stats.orders}</div>
              <div className="stat-label">Orders</div>
            </div>
            <div className="profile-stat-divider" />
            <div className="profile-stat">
              <div className="stat-num">{stats.wishlist}</div>
              <div className="stat-label">Wishlist</div>
            </div>
            <div className="profile-stat-divider" />
            <div className="profile-stat">
              <div className="stat-num">{stats.reviews}</div>
              <div className="stat-label">Reviews</div>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="acc-sections">
          {accSections.map(section => (
            <div key={section.title} className="acc-section">
              <div className="acc-section-title">{section.title}</div>
              {section.items.map(item => (
                <AccItem key={item.title} item={item} />
              ))}
            </div>
          ))}
        </div>

        {/* Logout */}
        <button
          className="logout-btn"
          style={{ background: logoutHovered ? '#ffe0e0' : '#FFF0F0' }}
          onMouseEnter={() => setLogoutHovered(true)}
          onMouseLeave={() => setLogoutHovered(false)}
          onClick={handleLogout}
        >
          🚪 Log Out
        </button>

      </div>

      <footer className="footer">
        ® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.
      </footer>
    </div>
  )
}
