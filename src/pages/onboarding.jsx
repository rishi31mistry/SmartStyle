import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Onboarding() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)

  const slides = [
    {
      title: 'Hello',
      desc: 'Discover the latest trends and styles curated just for you. Your fashion journey starts here.',
      bg: '#ffb6c1',
    },
    {
      title: 'Ready?',
      desc: 'Shop the best deals, exclusive collections and curated outfits — all in one place.',
      bg: '#b6d0ff',
    },
  ]

  const handleNext = () => {
    if (current === 0) {
      setCurrent(1)
    } else {
      navigate('/home')
    }
  }

  return (
    <div style={styles.body}>
      <div style={styles.blob}></div>

      <div style={styles.container}>

        {/* Image area */}
        <div style={styles.slideImg}>
          <img
            src="/image/onboarding.jpeg"
            onError={(e) => { e.target.src = 'https://placehold.co/400x400' }}
            alt="onboarding"
            style={styles.img}
          />
        </div>

        {/* Card */}
        <div style={styles.card}>
          <h2 style={styles.title}>{slides[current].title}</h2>
          <p style={styles.desc}>{slides[current].desc}</p>

          {/* Dots */}
          <div style={styles.dots}>
            {slides.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  ...styles.dot,
                  background: i === current ? '#2563EB' : '#dbeafe',
                  width: i === current ? '26px' : '10px',
                  borderRadius: i === current ? '5px' : '50%',
                }}
              />
            ))}
          </div>

          <button style={styles.btnNext} onClick={handleNext}>
            {current === 0 ? 'Next' : "Let's Start"}
          </button>

          {current === 0
            ? <span style={styles.skipLink} onClick={() => navigate('/home')}>Skip</span>
            : <span style={styles.skipLink} onClick={() => navigate('/login')}>Back to Login</span>
          }
        </div>

      </div>
    </div>
  )
}

const styles = {
  body: {
    fontFamily: "'Poppins', sans-serif",
    background: 'lightblue',
    minHeight: '100vh',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  blob: {
    position: 'fixed', top: '-60px', right: '-60px',
    width: '180px', height: '180px',
    background: '#2563EB', borderRadius: '50%', zIndex: 0,
  },
  container: {
    width: '100%', maxWidth: '390px',
    minHeight: '100vh',
    display: 'flex', flexDirection: 'column',
    position: 'relative', zIndex: 1,
  },
  slideImg: {
    flex: 1, margin: '16px 16px 0',
    borderRadius: '0 0 32px 32px',
    overflow: 'hidden', minHeight: '340px',
    background: '#ddd',
  },
  img: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  card: {
    background: '#fff',
    borderRadius: '28px 28px 0 0',
    padding: '32px 28px 40px',
    textAlign: 'center',
    marginTop: '-20px',
    position: 'relative', zIndex: 2,
  },
  title: { fontSize: '28px', fontWeight: '700', color: '#111', marginBottom: '12px' },
  desc: { fontSize: '14px', color: '#888', lineHeight: '1.7', marginBottom: '28px' },
  dots: { display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' },
  dot: { height: '10px', cursor: 'pointer', transition: 'all 0.3s' },
  btnNext: {
    width: '100%', padding: '17px',
    background: '#2563EB', color: '#fff',
    border: 'none', borderRadius: '16px',
    fontSize: '16px', fontWeight: '600',
    fontFamily: "'Poppins', sans-serif",
    cursor: 'pointer', marginBottom: '14px',
  },
  skipLink: {
    display: 'block', textAlign: 'center',
    color: '#aaa', fontSize: '13px', cursor: 'pointer',
  },
}