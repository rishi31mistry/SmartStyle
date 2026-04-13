import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function Checkout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  const state = location.state || {}
  const product = state.product
  const quantity = state.quantity || 1
  const size = state.size || ''
  const items = Array.isArray(state.items)
    ? state.items.map(i => ({
        id: i.productId || i._id,
        name: i.name,
        price: i.price,
        image: i.image,
        quantity: i.quantity || 1,
        size: i.size || ''
      }))
    : product
      ? [{
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
          size
        }]
      : []

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return }
    fetch('/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(() => {
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [navigate])

  if (!product && items.length === 0) {
    return (
      <div className="page" >
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
            Loading checkout...
          </div>
        )}

        {!loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', minHeight: '70vh' }}>

            {/* Product */}
            <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>Product</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {items.map(it => (
                    <div key={`${it.id}-${it.size}`} style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <div style={{ width: '90px', height: '110px', borderRadius: '12px', overflow: 'hidden', background: '#f3f4f6' }}>
                        <img src={it.image} alt={it.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '15px', fontWeight: '600' }}>{it.name}</div>
                        <div style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>Size: {it.size || '-'}</div>
                        <div style={{ fontSize: '13px', color: '#888' }}>Qty: {it.quantity}</div>
                        <div style={{ fontSize: '15px', fontWeight: '700', marginTop: '6px' }}>₹{it.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ width: '100%', maxWidth: '1200px', background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>Order Summary</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#555' }}>
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#555', marginTop: '6px' }}>
                <span>Delivery</span>
                <span style={{ color: '#22c55e' }}>FREE</span>
              </div>
              <div style={{ height: '1px', background: '#f3f4f6', margin: '12px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '700' }}>
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>
              <button
                style={{ width: '100%', marginTop: '14px', padding: '14px', borderRadius: '12px', border: 'none', background: '#2563EB', color: '#fff', fontWeight: '600', cursor: 'pointer' }}
                onClick={() => navigate('/checkout/address', { state: { items } })}
              >
                Next
              </button>
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

