import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <div style={styles.body}>
      <div style={styles.container}>

        {/* Logo */}
        <div style={styles.logoWrap}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <rect x="10" y="20" width="44" height="36" rx="6" fill="#93c5fd"/>
            <rect x="16" y="26" width="32" height="24" rx="4" fill="#2563EB"/>
            <path d="M22 20c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#2563EB" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Brand */}
        <div style={styles.brand}>SMARTSTYLE</div>
        <div style={styles.tagline}>A smart fashion e-commerce platform<br/>with personalised styling</div>

        {/* Buttons */}
        <button style={styles.btnPrimary} onClick={() => navigate('/signup')}>
          Let's get started
        </button>

        <div style={styles.loginLink} onClick={() => navigate('/login')}>
          I already have an account
          <span style={styles.arrow}>
            <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </div>

      </div>
    </div>
  )
}

const styles = {
  body: {
    fontFamily: "'Poppins', sans-serif",
    background: '#fff',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    maxWidth: '420px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 32px 50px',
    textAlign: 'center',
  },
  logoWrap: {
    width: '120px', height: '120px',
    background: '#f0f4ff',
    borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: '28px',
  },
  brand: {
    fontSize: '36px', fontWeight: '800',
    color: '#111', letterSpacing: '2px', marginBottom: '12px',
  },
  tagline: {
    fontSize: '15px', color: '#888',
    lineHeight: '1.6', marginBottom: '60px',
  },
  btnPrimary: {
    width: '100%', padding: '17px',
    background: '#2563EB', color: '#fff',
    border: 'none', borderRadius: '16px',
    fontSize: '16px', fontWeight: '600',
    fontFamily: "'Poppins', sans-serif",
    cursor: 'pointer', marginBottom: '20px',
  },
  loginLink: {
    display: 'flex', alignItems: 'center',
    justifyContent: 'center', gap: '10px',
    color: '#888', fontSize: '14px', cursor: 'pointer',
  },
  arrow: {
    width: '34px', height: '34px',
    background: '#2563EB', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
}