import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '', email: '', password: '', confirmPassword: '', phone: ''
  })
  const [errors, setErrors] = useState({})
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const validate = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^[0-9]{10}$/

    if (form.fullName.trim().length < 2) newErrors.fullName = 'Please enter your full name'
    if (!emailRegex.test(form.email)) newErrors.email = 'Please enter a valid email'
    if (form.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    if (!phoneRegex.test(form.phone)) newErrors.phone = 'Please enter a valid 10-digit number'

    return newErrors
  }

  const handleSubmit = async () => {
  const newErrors = validate()
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors)
    return
  }

  try {
    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.fullName,
        email: form.email,
        password: form.password,
        phone: form.phone
      })
    })

    const data = await res.json()

    if (res.ok) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate('/login')
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
      <div style={styles.blobTR}></div>

      <div style={styles.container}>
        <div style={styles.pageTitle}>Create<br/>Account</div>

        <div style={styles.form}>

          {/* Full Name */}
          <input
            style={{ ...styles.input, ...(errors.fullName ? styles.inputError : {}) }}
            type="text" name="fullName" placeholder="Full Name"
            value={form.fullName} onChange={handleChange}
          />
          {errors.fullName && <span style={styles.errMsg}>{errors.fullName}</span>}

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
            <button style={styles.togglePw} onClick={() => setShowPass(!showPass)}>
              👁
            </button>
          </div>
          {errors.password && <span style={styles.errMsg}>{errors.password}</span>}

          {/* Confirm Password */}
          <div style={styles.inputWrap}>
            <input
              style={{ ...styles.input, ...(errors.confirmPassword ? styles.inputError : {}) }}
              type={showConfirm ? 'text' : 'password'}
              name="confirmPassword" placeholder="Confirm Password"
              value={form.confirmPassword} onChange={handleChange}
            />
            <button style={styles.togglePw} onClick={() => setShowConfirm(!showConfirm)}>
              👁
            </button>
          </div>
          {errors.confirmPassword && <span style={styles.errMsg}>{errors.confirmPassword}</span>}

          {/* Phone */}
          <div style={styles.phoneRow}>
            <div style={styles.countrySelect}>🇮🇳 +91 ▾</div>
            <input
              style={{ ...styles.phoneInput, ...(errors.phone ? styles.inputError : {}) }}
              type="tel" name="phone" placeholder="Your number"
              value={form.phone} onChange={handleChange}
            />
          </div>
          {errors.phone && <span style={styles.errMsg}>{errors.phone}</span>}

          <button style={styles.btnPrimary} onClick={handleSubmit}>Register</button>
          <span style={styles.cancelLink} onClick={() => navigate('/')}>Cancel</span>
          <div style={styles.loginText}>
            Already have an account?{' '}
            <span style={styles.link} onClick={() => navigate('/login')}>Login</span>
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
    height: '95vh',
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    position: 'relative', 
    overflow: 'hidden',
  },
  blobTL: {
    position: 'fixed', top: '-60px', left: '-60px',
    width: '200px', height: '200px',
    background: '#dbeafe', borderRadius: '50%', zIndex: 0,
  },
  blobTR: {
    position: 'fixed', top: '-30px', right: '-40px',
    width: '160px', height: '160px',
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
    fontSize: '40px', fontWeight: '800',
    color: '#111', lineHeight: '1.15', marginBottom: '32px',
  },
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
  phoneRow: { display: 'flex' },
  countrySelect: {
    display: 'flex', alignItems: 'center', gap: '6px',
    background: '#f3f4f6', borderRadius: '14px 0 0 14px',
    padding: '0 14px', fontSize: '14px', color: '#444',
    whiteSpace: 'nowrap', minWidth: '90px',
  },
  phoneInput: {
    flex: 1, padding: '16px 20px',
    background: '#f3f4f6', border: '2px solid transparent',
    borderLeft: 'none', borderRadius: '0 14px 14px 0',
    fontSize: '15px', fontFamily: "'Poppins', sans-serif",
    color: '#111', outline: 'none',
  },
  btnPrimary: {
    width: '100%', padding: '17px',
    background: '#2563EB', color: '#fff',
    border: 'none', borderRadius: '16px',
    fontSize: '16px', fontWeight: '600',
    fontFamily: "'Poppins', sans-serif",
    cursor: 'pointer', marginTop: '10px',
  },
  cancelLink: {
    textAlign: 'center', color: '#888',
    fontSize: '14px', cursor: 'pointer', display: 'block',
  },
  loginText: { textAlign: 'center', fontSize: '13px', color: '#888' },
  link: { color: '#2563EB', fontWeight: '600', cursor: 'pointer' },
}