import { useState } from 'react'
import AdminLayout from '../components/AdminLayout'

export default function AdminSettings() {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setMessage('')
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setError('Please fill all password fields')
      return
    }

    if (form.newPassword.length < 8) {
      setError('New password must be at least 8 characters')
      return
    }

    if (form.newPassword !== form.confirmPassword) {
      setError('New password and confirm password do not match')
      return
    }

    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const res = await fetch('/api/user/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Unable to change password')
        return
      }

      setMessage(data.message || 'Password updated successfully')
      setForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    } catch (_err) {
      setError('Something went wrong while updating password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout
      title="Settings"
      subtitle="Manage your admin account security from one place."
    >
      <section className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <div className="admin-panel-title">Change Password</div>
            <div className="admin-panel-subtitle">Update your admin password using your current login credentials.</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ maxWidth: '520px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <input
            className="admin-input"
            type="password"
            name="currentPassword"
            placeholder="Current password"
            value={form.currentPassword}
            onChange={handleChange}
          />

          <input
            className="admin-input"
            type="password"
            name="newPassword"
            placeholder="New password"
            value={form.newPassword}
            onChange={handleChange}
          />

          <input
            className="admin-input"
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          {error && (
            <div style={{ color: '#e11d48', fontSize: '13px', fontWeight: '600' }}>
              {error}
            </div>
          )}

          {message && (
            <div style={{ color: '#059669', fontSize: '13px', fontWeight: '600' }}>
              {message}
            </div>
          )}

          <div style={{ fontSize: '12px', color: '#64748b' }}>
            Your new password must be at least 8 characters long.
          </div>

          <button className="admin-primary-btn" type="submit" disabled={loading}>
            {loading ? 'Updating Password...' : 'Update Password'}
          </button>
        </form>
      </section>
    </AdminLayout>
  )
}

