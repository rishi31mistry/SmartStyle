import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function CheckoutAddress() {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [address, setAddress] = useState({ street: '', city: '', state: '', pincode: '' })
  const [saving, setSaving] = useState(false)

  const state = location.state || {}
  const items = Array.isArray(state.items) ? state.items : []

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return }
    fetch('/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setAddress({
          street: data.addressStreet || '',
          city: data.addressCity || '',
          state: data.addressState || '',
          pincode: data.addressPincode || ''
        })
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [navigate])

  if (items.length === 0) {
    return (
      <div className="page">
        <Navbar />
        <div style={{ textAlign: 'center', padding: '100px', color: '#888' }}>
          No product selected for checkout.
          <div style={{ marginTop: '12px' }}>
            <button
              style={{ padding: '10px 16px', borderRadius: '10px', border: 'none', background: '#2563EB', color: '#fff', cursor: 'pointer' }}
              onClick={() => navigate('/home')}
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0)

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const token = localStorage.getItem('token')
      await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          addressStreet: address.street,
          addressCity: address.city,
          addressState: address.state,
          addressPincode: address.pincode
        })
      })
      navigate('/checkout/payment', { state: { items } })
    } catch (err) {
      console.log(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="page">
      <Navbar active="" />

      <div className="wrapper">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <h1 className="page-title">Checkout</h1>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '80px', color: '#888' }}>
            Loading address...
          </div>
        )}

        {!loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', minHeight: '70vh' }}>

            <form onSubmit={handlePlaceOrder} style={{ width: '100%', maxWidth: '1200px', background: '#fff', borderRadius: '16px', padding: '18px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '14px' }}>Delivery Address</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#555' }}>
                  Street
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e5e7eb' }}
                  />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#555' }}>
                  City
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e5e7eb' }}
                  />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#555' }}>
                  State
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e5e7eb' }}
                  />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#555' }}>
                  Pincode
                  <input
                    type="text"
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e5e7eb' }}
                  />
                </label>
              </div>
              <button type="submit" disabled={saving} style={{ marginTop: '14px', padding: '12px 16px', borderRadius: '12px', border: 'none', background: '#2563EB', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>
                {saving ? 'Saving...' : 'Next'}
              </button>
            </form>

            <div style={{ width: '100%', maxWidth: '1200px', background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>Order Summary</div>
              {items.map(it => (
                <div key={`${it.productId || it._id}-${it.size}`} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#555' }}>
                  <span>{it.name} {it.size ? `(${it.size})` : ''} × {it.quantity}</span>
                  <span>₹{it.price * it.quantity}</span>
                </div>
              ))}
              <div style={{ height: '1px', background: '#f3f4f6', margin: '12px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '700' }}>
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="footer">
        ® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.
      </footer>
    </div>
  )
}

