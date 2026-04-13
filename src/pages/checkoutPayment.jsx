import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function CheckoutPayment() {
  const navigate = useNavigate()
  const location = useLocation()
  const [method, setMethod] = useState('cod')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [cardInput, setCardInput] = useState({ name: '', number: '', expiry: '' })
  const [upiInput, setUpiInput] = useState('')

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
        setUser(data)
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

  const placeOrder = async () => {
    try {
      setSaving(true)
      const token = localStorage.getItem('token')
      if (!token) { navigate('/login'); return }

      if (method === 'card' && !user?.paymentCardLast4) {
        const last4 = cardInput.number.replace(/\D/g, '').slice(-4)
        if (!cardInput.name || !cardInput.number || !cardInput.expiry || !last4) {
          alert('Please enter card holder name, card number, and expiry.')
          return
        }
        const res = await fetch('/api/user/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            paymentCardName: cardInput.name,
            paymentCardLast4: last4,
            paymentCardExpiry: cardInput.expiry
          })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data?.message || 'Payment save failed')
        setUser(data)
      }

      if (method === 'upi' && !user?.paymentUpiId) {
        if (!upiInput) {
          alert('Please enter UPI ID.')
          return
        }
        const res = await fetch('/api/user/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            paymentUpiId: upiInput
          })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data?.message || 'Payment save failed')
        setUser(data)
      }

      alert('Order placed!')
      navigate('/home')
    } catch (err) {
      alert(err.message || 'Order failed')
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
          <h1 className="page-title">Payment</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', minHeight: '70vh' }}>
          <div style={{ width: '100%', maxWidth: '1200px', background: '#fff', borderRadius: '16px', padding: '18px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '14px' }}>Choose Payment Method</div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', fontSize: '14px' }}>
              <input type="radio" name="pay" checked={method === 'cod'} onChange={() => setMethod('cod')} />
              Cash on Delivery
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', fontSize: '14px' }}>
              <input type="radio" name="pay" checked={method === 'card'} onChange={() => setMethod('card')} />
              Card Payment (Online)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
              <input type="radio" name="pay" checked={method === 'upi'} onChange={() => setMethod('upi')} />
              UPI (Online)
            </label>
            {loading && (
              <div style={{ marginTop: '10px', fontSize: '13px', color: '#888' }}>
                Loading payment details...
              </div>
            )}
            {!loading && method === 'card' && (
              <div style={{ marginTop: '10px', fontSize: '13px', color: '#555' }}>
                {user?.paymentCardLast4 ? (
                  <div>
                    <div>Card: **** **** **** {user.paymentCardLast4}</div>
                    {user.paymentCardExpiry && <div>Expiry: {user.paymentCardExpiry}</div>}
                    {user.paymentCardName && <div>Name: {user.paymentCardName}</div>}
                  </div>
                ) : (
                  <div>
                    <div style={{ marginBottom: '8px' }}>No saved card. Please add details below.</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                      <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        Card Holder Name
                        <input
                          type="text"
                          value={cardInput.name}
                          onChange={(e) => setCardInput({ ...cardInput, name: e.target.value })}
                          style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e5e7eb' }}
                        />
                      </label>
                      <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        Card Number
                        <input
                          type="text"
                          value={cardInput.number}
                          onChange={(e) => setCardInput({ ...cardInput, number: e.target.value })}
                          style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e5e7eb' }}
                        />
                      </label>
                      <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        Expiry (MM/YY)
                        <input
                          type="text"
                          value={cardInput.expiry}
                          onChange={(e) => setCardInput({ ...cardInput, expiry: e.target.value })}
                          style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e5e7eb' }}
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            )}
            {!loading && method === 'upi' && (
              <div style={{ marginTop: '10px', fontSize: '13px', color: '#555' }}>
                {user?.paymentUpiId ? (
                  <div>UPI: {user.paymentUpiId}</div>
                ) : (
                  <div>
                    <div style={{ marginBottom: '8px' }}>No saved UPI. Please add UPI ID.</div>
                    <input
                      type="text"
                      value={upiInput}
                      onChange={(e) => setUpiInput(e.target.value)}
                      style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e5e7eb', width: '100%' }}
                    />
                  </div>
                )}
              </div>
            )}
            <button
              style={{ marginTop: '16px', padding: '12px 16px', borderRadius: '12px', border: 'none', background: '#2563EB', color: '#fff', fontWeight: '600', cursor: 'pointer' }}
              onClick={placeOrder}
            >
              {saving ? 'Placing...' : 'Place Order'}
            </button>
          </div>

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
      </div>

      <footer className="footer">
        ® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.
      </footer>
    </div>
  )
}

