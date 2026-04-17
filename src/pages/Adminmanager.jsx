import { useState, useEffect, useCallback } from 'react'

const BASE = 'http://localhost:5000/api/auth'

export default function AdminManager() {
  const [admins, setAdmins]     = useState([])
  const [email, setEmail]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [message, setMessage]   = useState({ text: '', type: '' })

  const token = localStorage.getItem('token')
  // Load all current admins
  const fetchAdmins = useCallback(async () => {
    try {
      const res  = await fetch(`${BASE}/admins`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      const data = await res.json()
      setAdmins(data)
    } catch {
      setAdmins([])
    }
  }, [token])

  useEffect(() => { fetchAdmins() }, [fetchAdmins])

  const showMsg = (text, type = 'success') => {
    setMessage({ text, type })
    setTimeout(() => setMessage({ text: '', type: '' }), 3000)
  }

  const handleMakeAdmin = async () => {
    if (!email.trim()) return
    setLoading(true)
    try {
      const res  = await fetch(`${BASE}/make-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ email: email.trim() })
      })
      const data = await res.json()
      if (res.ok) {
        showMsg(data.message, 'success')
        setEmail('')
        fetchAdmins()
      } else {
        showMsg(data.message, 'error')
      }
    } catch {
      showMsg('Something went wrong', 'error')
    }
    setLoading(false)
  }

  const handleRemoveAdmin = async (targetEmail) => {
    if (!window.confirm(`Remove admin access from ${targetEmail}?`)) return
    try {
      const res  = await fetch(`${BASE}/remove-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ email: targetEmail })
      })
      const data = await res.json()
      if (res.ok) {
        showMsg(data.message, 'success')
        fetchAdmins()
      } else {
        showMsg(data.message, 'error')
      }
    } catch {
      showMsg('Something went wrong', 'error')
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Access Manager</h2>
      <p style={styles.sub}>
        Users must sign up first before you can grant them admin access.
      </p>

      {/* Message toast */}
      {message.text && (
        <div style={{
          ...styles.toast,
          background: message.type === 'success' ? '#f0fdf4' : '#fef2f2',
          color:      message.type === 'success' ? '#15803d' : '#dc2626',
          border:     `1px solid ${message.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
        }}>
          {message.text}
        </div>
      )}

      {/* Grant admin form */}
      <div style={styles.card}>
        <div style={styles.cardTitle}>Grant Admin Access</div>
        <div style={styles.inputRow}>
          <input
            style={styles.input}
            type="email"
            placeholder="Enter user email..."
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleMakeAdmin()}
          />
          <button
            style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
            onClick={handleMakeAdmin}
            disabled={loading}
          >
            {loading ? 'Granting...' : 'Make Admin'}
          </button>
        </div>
      </div>

      {/* Current admins list */}
      <div style={styles.card}>
        <div style={styles.cardTitle}>
          Current Admins
          <span style={styles.badge}>{admins.length}</span>
        </div>

        {admins.length === 0 ? (
          <div style={styles.empty}>No admins found</div>
        ) : (
          <div style={styles.list}>
            {admins.map(admin => (
              <div key={admin._id} style={styles.adminRow}>
                <div style={styles.adminInfo}>
                  <div style={styles.avatar}>
                    {admin.name?.charAt(0)?.toUpperCase() || 'A'}
                  </div>
                  <div>
                    <div style={styles.adminName}>{admin.name}</div>
                    <div style={styles.adminEmail}>{admin.email}</div>
                  </div>
                </div>
                <button
                  style={styles.removeBtn}
                  onClick={() => handleRemoveAdmin(admin.email)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: 600,
    margin: '0 auto',
    padding: '0 0 40px',
    fontFamily: "'Poppins', sans-serif",
  },
  heading: {
    fontSize: 22, fontWeight: 700, color: '#111', marginBottom: 4,
  },
  sub: {
    fontSize: 13, color: '#888', marginBottom: 24,
  },
  toast: {
    padding: '12px 16px',
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 500,
    marginBottom: 16,
  },
  card: {
    background: '#fff',
    borderRadius: 16,
    padding: '20px 24px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 15, fontWeight: 700, color: '#111',
    marginBottom: 16,
    display: 'flex', alignItems: 'center', gap: 8,
  },
  badge: {
    background: '#f0f6ff', color: '#4A90D9',
    fontSize: 11, fontWeight: 700,
    padding: '2px 8px', borderRadius: 20,
  },
  inputRow: {
    display: 'flex', gap: 10,
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    borderRadius: 10,
    border: '1.5px solid #e0e0e0',
    fontSize: 13,
    fontFamily: "'Poppins', sans-serif",
    outline: 'none',
  },
  btn: {
    padding: '10px 20px',
    background: '#4A90D9',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 600,
    fontFamily: "'Poppins', sans-serif",
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  list: {
    display: 'flex', flexDirection: 'column', gap: 12,
  },
  adminRow: {
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #f5f5f5',
  },
  adminInfo: {
    display: 'flex', alignItems: 'center', gap: 12,
  },
  avatar: {
    width: 40, height: 40, borderRadius: '50%',
    background: '#f0f6ff', color: '#4A90D9',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 16, fontWeight: 700, flexShrink: 0,
  },
  adminName: {
    fontSize: 14, fontWeight: 600, color: '#111',
  },
  adminEmail: {
    fontSize: 12, color: '#888', marginTop: 1,
  },
  removeBtn: {
    padding: '6px 14px',
    background: '#fff0f0',
    color: '#dc2626',
    border: '1.5px solid #fecaca',
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 600,
    fontFamily: "'Poppins', sans-serif",
    cursor: 'pointer',
  },
  empty: {
    fontSize: 13, color: '#aaa', textAlign: 'center', padding: '20px 0',
  },
}
