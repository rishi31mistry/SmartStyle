import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

function formatDate(value) {
  if (!value) return ''

  return new Date(value).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function getAccent(notification) {
  if (notification.type === 'order' && notification.event === 'cancellation') {
    return {
      bg: '#fff1f2',
      border: '#fecdd3',
      title: '#be123c',
      badge: '#ffe4e6',
      badgeText: '#be123c',
      icon: '↩',
      label: 'Order',
    }
  }

  if (notification.type === 'order') {
    return {
      bg: '#ecfdf5',
      border: '#bbf7d0',
      title: '#15803d',
      badge: '#dcfce7',
      badgeText: '#15803d',
      icon: '✓',
      label: 'Order',
    }
  }

  if (notification.type === 'promotion') {
    return {
      bg: '#eff6ff',
      border: '#bfdbfe',
      title: '#1d4ed8',
      badge: '#dbeafe',
      badgeText: '#1d4ed8',
      icon: '%',
      label: 'Promo',
    }
  }

  return {
    bg: '#f8fafc',
    border: '#e2e8f0',
    title: '#334155',
    badge: '#e2e8f0',
    badgeText: '#334155',
    icon: '•',
    label: 'Account',
  }
}

export default function NotificationsPage() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    fetch('/api/notifications', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data?.message || 'Unable to load notifications')
        setNotifications(Array.isArray(data.notifications) ? data.notifications : [])
        setError('')

        return fetch('/api/notifications/read-all', {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` }
        }).catch(() => null)
      })
      .catch((err) => {
        setError(err.message || 'Unable to load notifications')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [navigate])

  return (
    <div className="page">
      <Navbar active="account" />

      <div className="wrapper">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <button className="back-btn" onClick={() => navigate('/account')}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <div>
            <h1 className="page-title" style={{ marginBottom: '4px' }}>Notifications</h1>
            <div style={{ fontSize: '14px', color: '#64748b' }}>Order updates, account alerts, and sale announcements</div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: '18px', padding: '18px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          {loading ? (
            <div style={{ fontSize: '14px', color: '#666' }}>Loading notifications...</div>
          ) : error ? (
            <div style={{ fontSize: '14px', color: '#dc2626' }}>{error}</div>
          ) : notifications.length === 0 ? (
            <div style={{ fontSize: '14px', color: '#666' }}>No notifications yet.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {notifications.map((notification) => {
                const accent = getAccent(notification)

                return (
                  <div
                    key={notification._id}
                    style={{
                      background: accent.bg,
                      border: `1px solid ${accent.border}`,
                      borderRadius: '16px',
                      padding: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '12px',
                          background: '#fff',
                          border: `1px solid ${accent.border}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '700',
                          color: accent.title,
                          flexShrink: 0,
                        }}>
                          {accent.icon}
                        </div>
                        <div>
                          <div style={{ fontSize: '15px', fontWeight: '700', color: accent.title }}>{notification.title}</div>
                          <div style={{ fontSize: '14px', color: '#475569', marginTop: '6px', lineHeight: 1.5 }}>{notification.message}</div>
                          {notification.metadata?.link && (
                            <button
                              type="button"
                              onClick={() => navigate(notification.metadata.link)}
                              style={{
                                marginTop: '12px',
                                padding: '8px 12px',
                                borderRadius: '10px',
                                border: 'none',
                                background: accent.title,
                                color: '#fff',
                                fontWeight: '600',
                                cursor: 'pointer',
                              }}
                            >
                              View Now
                            </button>
                          )}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '6px 10px',
                          borderRadius: '999px',
                          background: accent.badge,
                          color: accent.badgeText,
                          fontSize: '12px',
                          fontWeight: '700',
                        }}>
                          {accent.label}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '10px' }}>{formatDate(notification.createdAt)}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <footer className="footer">
        <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.
      </footer>
    </div>
  )
}
