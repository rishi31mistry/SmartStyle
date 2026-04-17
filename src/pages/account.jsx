import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'
import '../styles/account.css'

function AccItem({ item, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="acc-item"
      style={{ background: hovered ? '#f9fbff' : '#fff', cursor: onClick ? 'pointer' : 'default' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
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
  const [notificationCount, setNotificationCount] = useState(0)
  const [showPersonalForm, setShowPersonalForm] = useState(false)
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [showPrivacyForm, setShowPrivacyForm] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [addressForm, setAddressForm] = useState({ street: '', city: '', state: '', pincode: '' })
  const [privacyForm, setPrivacyForm] = useState({ twoFactor: false, loginAlerts: true, sessionTimeout: 30 })
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' })
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
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

    fetch('/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setUser(data)
        setForm({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || ''
        })
        setAddressForm({
          street: data.addressStreet || '',
          city: data.addressCity || '',
          state: data.addressState || '',
          pincode: data.addressPincode || ''
        })
        setPrivacyForm({
          twoFactor: !!data.securityTwoFactor,
          loginAlerts: data.securityLoginAlerts !== undefined ? !!data.securityLoginAlerts : true,
          sessionTimeout: data.securitySessionTimeout || 30
        })
        setStats({
          orders: data.orders?.length || 0,
          wishlist: data.wishlist?.length || 0,
          reviews: 0
        })
      })
      .catch(err => console.log(err))

    fetch('/api/notifications', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setNotificationCount(Number(data?.unreadCount || 0))
      })
      .catch(err => console.log(err))
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setSaveMsg('')
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Update failed')
      setUser(data)
      setSaveMsg('Profile updated successfully.')
      setShowPersonalForm(false)
    } catch (err) {
      setSaveMsg(err.message || 'Update failed')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveAddress = async (e) => {
    e.preventDefault()
    setSaving(true)
    setSaveMsg('')
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          addressStreet: addressForm.street,
          addressCity: addressForm.city,
          addressState: addressForm.state,
          addressPincode: addressForm.pincode
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Update failed')
      setUser(data)
      setSaveMsg('Address updated successfully.')
      setShowAddressForm(false)
    } catch (err) {
      setSaveMsg(err.message || 'Update failed')
    } finally {
      setSaving(false)
    }
  }

  const handleSavePrivacy = async (e) => {
    e.preventDefault()
    setSaving(true)
    setSaveMsg('')
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          securityTwoFactor: privacyForm.twoFactor,
          securityLoginAlerts: privacyForm.loginAlerts,
          securitySessionTimeout: Number(privacyForm.sessionTimeout) || 30
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Update failed')
      setUser(data)
      setSaveMsg('Privacy & security updated successfully.')
      setShowPrivacyForm(false)
    } catch (err) {
      setSaveMsg(err.message || 'Update failed')
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setSaving(true)
    setSaveMsg('')
    try {
      if (!passwordForm.current || !passwordForm.next || !passwordForm.confirm) {
        throw new Error('All password fields are required')
      }
      if (passwordForm.next.length < 8) {
        throw new Error('New password must be at least 8 characters')
      }
      if (passwordForm.next !== passwordForm.confirm) {
        throw new Error('New password and confirm password do not match')
      }

      const token = localStorage.getItem('token')
      const res = await fetch('/api/user/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordForm.current,
          newPassword: passwordForm.next
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Update failed')
      setSaveMsg('Password updated successfully.')
      setPasswordForm({ current: '', next: '', confirm: '' })
    } catch (err) {
      setSaveMsg(err.message || 'Update failed')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteAccount = async () => {
    const ok = window.confirm('Are you sure you want to delete your account? This cannot be undone.')
    if (!ok) return

    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/user/delete', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Delete failed')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigate('/login')
    } catch (err) {
      alert(err.message || 'Delete failed')
    }
  }

  const accSections = [
    {
      title: 'My Account',
      items: [
        { icon: '👤', title: 'Personal Information', sub: 'Name, email, phone', onClick: () => setShowPersonalForm(v => !v) },
        { icon: '📍', title: 'Saved Addresses', sub: 'Home, work & more', onClick: () => setShowAddressForm(v => !v) }
      ]
    },
    {
      title: 'My Orders',
      items: [
        { icon: '🛍️', title: 'Order History', sub: 'Track & manage orders', onClick: () => navigate('/account/orders') },
        { icon: '❤️', title: 'Wishlist', sub: `${stats.wishlist} saved items`, onClick: () => navigate('/wishlist') }
      ]
    },
    {
      title: 'Settings',
      items: [
        { icon: '🔔', title: 'Notifications', sub: notificationCount > 0 ? `${notificationCount} new alerts` : 'Order updates & sale alerts', onClick: () => navigate('/account/notifications') },
        { icon: '🔒', title: 'Privacy & Security', sub: 'Password, data settings', onClick: () => setShowPrivacyForm(v => !v) }
      ]
    }
  ]

  return (
    <div className="page">
      <Navbar active="account" />

      <div className="wrapper">
        <div className="profile-card">
          <div className="profile-left">
            <div className="profile-avatar">
              <img
                src={user?.profileImage
                  ? (user.profileImage.startsWith('http')
                    ? user.profileImage
                    : user.profileImage)
                  : '/image/placeholder.jpg'}
                alt="profile"
              />
            </div>
            <div className="profile-info">
              <div className="profile-name">
                {user ? user.name : 'Loading...'}
              </div>
              <div className="profile-email">
                {user ? user.email : ''}
              </div>
              <label className="edit-profile-btn" style={{ cursor: 'pointer' }}>
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    try {
                      const token = localStorage.getItem('token')
                      const formData = new FormData()
                      formData.append('image', file)
                      const res = await fetch('/api/user/profile-image', {
                        method: 'POST',
                        headers: { Authorization: `Bearer ${token}` },
                        body: formData
                      })
                      const data = await res.json()
                      if (!res.ok) throw new Error(data?.message || 'Upload failed')
                      setUser(data)
                    } catch (err) {
                      console.log(err)
                    } finally {
                      e.target.value = ''
                    }
                  }}
                />
              </label>
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

        {showPersonalForm && (
          <form onSubmit={handleSave} style={{ margin: '20px 0', background: '#fff', padding: '18px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '14px' }}>Personal Information</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#555' }}>
                Name
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e5e7eb' }}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#555' }}>
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e5e7eb' }}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#555' }}>
                Phone
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e5e7eb' }}
                />
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '14px' }}>
              <button type="submit" disabled={saving} style={{ padding: '10px 16px', borderRadius: '10px', border: 'none', background: '#2563EB', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              {saveMsg && <span style={{ fontSize: '13px', color: saveMsg.includes('success') ? '#16a34a' : '#dc2626' }}>{saveMsg}</span>}
            </div>
          </form>
        )}

        {showAddressForm && (
          <form onSubmit={handleSaveAddress} style={{ margin: '20px 0', background: '#fff', padding: '18px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '14px' }}>Saved Address</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#555' }}>
                Street
                <input
                  type="text"
                  value={addressForm.street}
                  onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                  style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e5e7eb' }}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#555' }}>
                City
                <input
                  type="text"
                  value={addressForm.city}
                  onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                  style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e5e7eb' }}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#555' }}>
                State
                <input
                  type="text"
                  value={addressForm.state}
                  onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                  style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e5e7eb' }}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#555' }}>
                Pincode
                <input
                  type="text"
                  value={addressForm.pincode}
                  onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                  style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e5e7eb' }}
                />
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '14px' }}>
              <button type="submit" disabled={saving} style={{ padding: '10px 16px', borderRadius: '10px', border: 'none', background: '#2563EB', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>
                {saving ? 'Saving...' : 'Save Address'}
              </button>
              {saveMsg && <span style={{ fontSize: '13px', color: saveMsg.includes('success') ? '#16a34a' : '#dc2626' }}>{saveMsg}</span>}
            </div>
          </form>
        )}

        {showPrivacyForm && (
          <form onSubmit={handleSavePrivacy} style={{ margin: '20px 0', background: '#fff', padding: '18px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '14px' }}>Privacy & Security</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#555' }}>
                <input
                  type="checkbox"
                  checked={privacyForm.twoFactor}
                  onChange={(e) => setPrivacyForm({ ...privacyForm, twoFactor: e.target.checked })}
                />
                Enable Two-Factor Authentication
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#555' }}>
                <input
                  type="checkbox"
                  checked={privacyForm.loginAlerts}
                  onChange={(e) => setPrivacyForm({ ...privacyForm, loginAlerts: e.target.checked })}
                />
                Login Alerts
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#555' }}>
                Session Timeout (minutes)
                <input
                  type="number"
                  min="5"
                  value={privacyForm.sessionTimeout}
                  onChange={(e) => setPrivacyForm({ ...privacyForm, sessionTimeout: e.target.value })}
                  style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e5e7eb' }}
                />
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '14px' }}>
              <button type="submit" disabled={saving} style={{ padding: '10px 16px', borderRadius: '10px', border: 'none', background: '#2563EB', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>
                {saving ? 'Saving...' : 'Save Privacy'}
              </button>
              <button type="button" onClick={handleDeleteAccount} style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid #fecaca', background: '#fff', color: '#dc2626', fontWeight: '600', cursor: 'pointer' }}>
                Delete Account
              </button>
              {saveMsg && <span style={{ fontSize: '13px', color: saveMsg.includes('success') ? '#16a34a' : '#dc2626' }}>{saveMsg}</span>}
            </div>
          </form>
        )}

        {showPrivacyForm && (
          <form onSubmit={handleChangePassword} style={{ margin: '20px 0', background: '#fff', padding: '18px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '14px' }}>Change Password</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#555' }}>
                Current Password
                <input
                  type="password"
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                  style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e5e7eb' }}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#555' }}>
                New Password
                <input
                  type="password"
                  value={passwordForm.next}
                  onChange={(e) => setPasswordForm({ ...passwordForm, next: e.target.value })}
                  style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e5e7eb' }}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#555' }}>
                Confirm New Password
                <input
                  type="password"
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                  style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e5e7eb' }}
                />
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '14px' }}>
              <button type="submit" disabled={saving} style={{ padding: '10px 16px', borderRadius: '10px', border: 'none', background: '#111', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>
                {saving ? 'Updating...' : 'Update Password'}
              </button>
              {saveMsg && <span style={{ fontSize: '13px', color: saveMsg.includes('success') ? '#16a34a' : '#dc2626' }}>{saveMsg}</span>}
            </div>
          </form>
        )}

        <div className="acc-sections">
          {accSections.map(section => (
            <div key={section.title} className="acc-section">
              <div className="acc-section-title">{section.title}</div>
              {section.items.map(item => (
                <AccItem key={item.title} item={item} onClick={item.onClick} />
              ))}
            </div>
          ))}
        </div>

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
        <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.
      </footer>
    </div>
  )
}
