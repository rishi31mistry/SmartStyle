import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', confirm: '' })
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
    setMsg('')
  }

  const handleSubmit = async () => {
    if (!form.email || !form.password || !form.confirm) {
      setError('All fields are required')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match')
      return
    }
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          newPassword: form.password
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Update failed')
      setMsg('Password updated successfully. Please login.')
      setTimeout(() => navigate('/login'), 1200)
    } catch (err) {
      setError(err.message || 'Update failed')
    }
  }

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.pageTitle}>Forgot Password</div>
        <div style={styles.subtitle}>Reset your password using your email</div>

        <div style={styles.form}>
          <input
            style={{ ...styles.input, ...(error ? styles.inputError : {}) }}
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            style={{ ...styles.input, ...(error ? styles.inputError : {}) }}
            type="password"
            name="password"
            placeholder="New Password"
            value={form.password}
            onChange={handleChange}
          />
          <input
            style={{ ...styles.input, ...(error ? styles.inputError : {}) }}
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            value={form.confirm}
            onChange={handleChange}
          />

          {error && <div style={styles.errMsg}>{error}</div>}
          {msg && <div style={styles.okMsg}>{msg}</div>}

          <button style={styles.btnPrimary} onClick={handleSubmit}>Update Password</button>
          <span style={styles.cancelLink} onClick={() => navigate('/login')}>Back to Login</span>
        </div>
      </div>
    </div>
  )
}

const styles = {
  body: {
    fontFamily: "'Poppins', sans-serif",
    background: 'lightblue',
    height: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%', maxWidth: '420px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '40px 32px',
  },
  pageTitle: { fontSize: '36px', fontWeight: '800', color: '#111', marginBottom: '6px' },
  subtitle: { fontSize: '14px', color: '#555', marginBottom: '24px' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  input: {
    width: '100%', padding: '16px 20px',
    background: '#f3f4f6', border: '2px solid transparent',
    borderRadius: '14px', fontSize: '15px',
    fontFamily: "'Poppins', sans-serif", color: '#111', outline: 'none',
  },
  inputError: { border: '2px solid #ef4444' },
  errMsg: { fontSize: '12px', color: '#ef4444' },
  okMsg: { fontSize: '12px', color: '#16a34a' },
  btnPrimary: {
    width: '100%', padding: '17px',
    background: '#2563EB', color: '#fff',
    border: 'none', borderRadius: '16px',
    fontSize: '16px', fontWeight: '600',
    fontFamily: "'Poppins', sans-serif", cursor: 'pointer',
  },
  cancelLink: {
    textAlign: 'center', color: '#888',
    fontSize: '14px', cursor: 'pointer', display: 'block',
  },
}

