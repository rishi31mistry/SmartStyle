import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPass, setShowPass] = useState(false)

  const validate = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) newErrors.email = 'Please enter a valid email'
    if (form.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
    return newErrors
  }

  const handleSubmit = async () => {
  const newErrors = validate()
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors)
    return
  }

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

    if (res.ok) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate('/onboarding')
    } else {
      setErrors({ email: data.message })
    }
  } catch (err) {
    console.log(err)
    setErrors({ email: 'Something went wrong. Try again!' })
  }
}

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  return (
    <div style={styles.body}>
      <div style={styles.blobTL}></div>
      <div style={styles.blobTLLight}></div>
      <div style={styles.blobBR}></div>

      <div style={styles.container}>
        <div style={styles.pageTitle}>Login</div>
        <div style={styles.subtitle}>Good to see you back! 🖤</div>

        <div style={styles.form}>

          {/* Email */}
          <input
            style={{ ...styles.input, ...(errors.email ? styles.inputError : {}) }}
            type="email" name="email" placeholder="Email"
            value={form.email} onChange={handleChange}
          />
          {errors.email && <span style={styles.errMsg}>{errors.email}</span>}

          {/* Password */}
          <div style={styles.inputWrap}>
            <input
              style={{ ...styles.input, ...(errors.password ? styles.inputError : {}) }}
              type={showPass ? 'text' : 'password'}
              name="password" placeholder="Password"
              value={form.password} onChange={handleChange}
            />
            <button style={styles.togglePw} onClick={() => setShowPass(!showPass)}>👁</button>
          </div>
          {errors.password && <span style={styles.errMsg}>{errors.password}</span>}

          <div style={styles.forgot} onClick={() => navigate('/forgot-password')}>Forgot password?</div>

          <button style={styles.btnPrimary} onClick={handleSubmit}>Login</button>
          <span style={styles.cancelLink} onClick={() => navigate('/')}>Cancel</span>
          <div style={styles.signupText}>
            Don't have an account?{' '}
            <span style={styles.link} onClick={() => navigate('/signup')}>Sign Up</span>
          </div>

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
    position: 'relative', 
    overflow: 'hidden',
  },
  blobTL: {
    position: 'fixed', top: '-80px', left: '-80px',
    width: '260px', height: '260px',
    background: '#2563EB', borderRadius: '50%', zIndex: 0,
  },
  blobTLLight: {
    position: 'fixed', top: '80px', left: '-40px',
    width: '200px', height: '180px',
    background: '#dbeafe', borderRadius: '50%', zIndex: 0,
  },
  blobBR: {
    position: 'fixed', bottom: '60px', right: '-50px',
    width: '140px', height: '140px',
    background: '#2563EB', borderRadius: '50%', zIndex: 0,
  },
 container: {
    width: '100%', maxWidth: '420px',
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'center',
    padding: '40px 32px', 
    position: 'relative', 
    zIndex: 1,
  },
  pageTitle: {
    fontSize: '44px', fontWeight: '800',
    color: '#111', marginBottom: '6px',
  },
  subtitle: { fontSize: '15px', color: '#555', marginBottom: '28px' },
  form: { display: 'flex', flexDirection: 'column', gap: '14px' },
  inputWrap: { position: 'relative' },
  input: {
    width: '100%', padding: '16px 20px',
    background: '#f3f4f6', border: '2px solid transparent',
    borderRadius: '14px', fontSize: '15px',
    fontFamily: "'Poppins', sans-serif", color: '#111', outline: 'none',
  },
  inputError: { border: '2px solid #ef4444' },
  errMsg: { fontSize: '11px', color: '#ef4444', paddingLeft: '4px' },
  togglePw: {
    position: 'absolute', right: '16px', top: '50%',
    transform: 'translateY(-50%)',
    background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px',
  },
  forgot: {
    textAlign: 'right', fontSize: '13px',
    color: '#2563EB', cursor: 'pointer',
  },
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
  signupText: { textAlign: 'center', fontSize: '13px', color: '#888' },
  link: { color: '#2563EB', fontWeight: '600', cursor: 'pointer' },
}

