import { useState } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { clearAdminSession, isAdminSessionActive } from '../utils/adminSession'

export default function AdminLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const isAdminAuthed = isAdminSessionActive()
  const fromPath = location.state?.from?.pathname

  if (isAdminAuthed && fromPath && fromPath !== '/admin' && fromPath !== '/admin/login') {
    return <Navigate to="/admin/dashboard" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Unable to login')
        setLoading(false)
        return
      }

      if (data.user?.role !== 'admin') {
        clearAdminSession()
        setError('This account does not have admin access')
        setLoading(false)
        return
      }

      localStorage.setItem('adminAuthenticated', 'true')
      localStorage.setItem('adminUser', JSON.stringify(data.user))
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      const nextPath = location.state?.from?.pathname || '/admin/dashboard'
      navigate(nextPath, { replace: true })
    } catch (_err) {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.glowLeft} />
      <div style={styles.glowRight} />

      <div style={styles.card}>
        <div style={styles.kicker}>SmartStyle Control</div>
        <h1 style={styles.title}>Admin Login</h1>
        <p style={styles.subtitle}>Use your real backend admin account to access the control panel.</p>

        <div style={styles.demoBox}>
          <div style={styles.demoTitle}>Admin access rule</div>
          <div style={styles.demoLine}>Only accounts with `role: admin` can continue.</div>
          <div style={styles.demoLine}>Default admin email fallback: `mistryrishi31052004@gmail.com`</div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Admin email"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value })
              setError('')
            }}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value })
              setError('')
            }}
            style={styles.input}
          />

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" style={styles.primaryBtn}>
            {loading ? 'Logging In...' : 'Login To Admin'}
          </button>
          <button type="button" style={styles.secondaryBtn} onClick={() => navigate('/home')}>
            Back To Store
          </button>
        </form>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    background: 'linear-gradient(135deg, #eff6ff 0%, #fff7ed 100%)',
    fontFamily: "'Poppins', sans-serif",
    position: 'relative',
    overflow: 'hidden'
  },
  glowLeft: {
    position: 'absolute',
    width: '320px',
    height: '320px',
    borderRadius: '50%',
    background: 'rgba(14, 165, 233, 0.18)',
    top: '-80px',
    left: '-60px'
  },
  glowRight: {
    position: 'absolute',
    width: '280px',
    height: '280px',
    borderRadius: '50%',
    background: 'rgba(249, 115, 22, 0.14)',
    bottom: '-70px',
    right: '-40px'
  },
  card: {
    width: '100%',
    maxWidth: '460px',
    background: 'rgba(255,255,255,0.95)',
    border: '1px solid rgba(15, 23, 42, 0.08)',
    borderRadius: '28px',
    padding: '32px',
    boxShadow: '0 20px 60px rgba(15, 23, 42, 0.12)',
    position: 'relative',
    zIndex: 1
  },
  kicker: {
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1.4px',
    color: '#0ea5e9',
    marginBottom: '10px'
  },
  title: {
    fontSize: '36px',
    lineHeight: 1.1,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: '8px'
  },
  subtitle: {
    fontSize: '14px',
    color: '#64748b',
    marginBottom: '20px'
  },
  demoBox: {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '18px',
    padding: '14px 16px',
    marginBottom: '18px'
  },
  demoTitle: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '8px'
  },
  demoLine: {
    fontSize: '13px',
    color: '#475569'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  input: {
    width: '100%',
    padding: '15px 16px',
    borderRadius: '16px',
    border: '1.5px solid #dbe3ee',
    fontSize: '14px',
    outline: 'none',
    background: '#fff',
    color: '#0f172a',
    fontFamily: "'Poppins', sans-serif"
  },
  error: {
    fontSize: '12px',
    color: '#e11d48'
  },
  primaryBtn: {
    border: 'none',
    borderRadius: '16px',
    padding: '15px 16px',
    background: 'linear-gradient(135deg, #0ea5e9, #2563eb)',
    color: '#fff',
    fontWeight: '700',
    fontSize: '14px',
    cursor: 'pointer',
    fontFamily: "'Poppins', sans-serif"
  },
  secondaryBtn: {
    border: '1px solid #dbe3ee',
    borderRadius: '16px',
    padding: '14px 16px',
    background: '#fff',
    color: '#334155',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    fontFamily: "'Poppins', sans-serif"
  }
}

