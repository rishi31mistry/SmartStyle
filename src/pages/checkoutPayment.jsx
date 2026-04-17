import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

async function readApiResponse(res) {
  const contentType = res.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const payload = isJson ? await res.json() : await res.text()

  return {
    ok: res.ok,
    status: res.status,
    data: isJson ? payload : null,
    text: isJson ? '' : payload,
  }
}

function getResponseErrorMessage(response, fallbackMessage) {
  if (response.data?.message) {
    return response.data.message
  }

  if (response.text) {
    if (response.text.includes('<!DOCTYPE')) {
      return 'The payment API returned an HTML page instead of JSON. Make sure the backend server is running on port 5000 and then retry.'
    }

    return response.text
  }

  return fallbackMessage
}

function formatInr(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value || 0)
}

function loadRazorpayScript() {
  if (window.Razorpay) {
    return Promise.resolve(true)
  }

  return new Promise((resolve) => {
    const existingScript = document.querySelector('script[data-razorpay-checkout="true"]')
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true), { once: true })
      existingScript.addEventListener('error', () => resolve(false), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.dataset.razorpayCheckout = 'true'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function CheckoutPayment() {
  const navigate = useNavigate()
  const location = useLocation()
  const [method, setMethod] = useState('cod')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const state = location.state || {}
  const items = Array.isArray(state.items) ? state.items : []

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    fetch('/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(async (res) => {
        const response = await readApiResponse(res)
        if (!response.ok) {
          throw new Error(getResponseErrorMessage(response, 'Unable to load profile'))
        }

        setUser(response.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || 'Unable to load profile')
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

  const handleCashOnDelivery = async () => {
    try {
      setSaving(true)
      setError('')
      setMessage('')

      const token = localStorage.getItem('token')
      const res = await fetch('/api/payment/cod', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ items })
      })

      const response = await readApiResponse(res)
      if (!response.ok) {
        throw new Error(getResponseErrorMessage(response, 'Unable to place COD order'))
      }

      setMessage('Cash on delivery order placed successfully.')
      alert('Order placed successfully with Cash on Delivery.')
      navigate('/home')
    } catch (err) {
      setError(err.message || 'Unable to place COD order')
    } finally {
      setSaving(false)
    }
  }

  const handleRazorpayPayment = async () => {
    try {
      setSaving(true)
      setError('')
      setMessage('')

      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        throw new Error('Unable to load Razorpay checkout')
      }

      const token = localStorage.getItem('token')
      const createOrderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ items })
      })

      const createOrderResponse = await readApiResponse(createOrderRes)
      if (!createOrderResponse.ok) {
        throw new Error(getResponseErrorMessage(createOrderResponse, 'Unable to start Razorpay payment'))
      }
      const orderData = createOrderResponse.data

      const razorpay = new window.Razorpay({
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'SmartStyle',
        description: 'SmartStyle order payment',
        order_id: orderData.razorpayOrderId,
        prefill: {
          name: orderData.customer?.name || user?.name || '',
          email: orderData.customer?.email || user?.email || '',
          contact: orderData.customer?.contact || user?.phone || '',
        },
        theme: {
          color: '#2563EB',
        },
        modal: {
          ondismiss: () => {
            setSaving(false)
          },
        },
        handler: async (response) => {
          try {
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({
                internalOrderId: orderData.internalOrderId,
                ...response,
              })
            })

            const verifyResponse = await readApiResponse(verifyRes)
            if (!verifyResponse.ok) {
              throw new Error(getResponseErrorMessage(verifyResponse, 'Payment verification failed'))
            }

            setMessage('Payment completed and verified successfully.')
            alert('Payment successful. Your order has been placed.')
            navigate('/home')
          } catch (err) {
            setError(err.message || 'Payment verification failed')
          } finally {
            setSaving(false)
          }
        }
      })

      razorpay.open()
    } catch (err) {
      setError(err.message || 'Unable to start payment')
      setSaving(false)
    }
  }

  const placeOrder = async () => {
    if (method === 'cod') {
      await handleCashOnDelivery()
      return
    }

    await handleRazorpayPayment()
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
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
              <input type="radio" name="pay" checked={method === 'razorpay'} onChange={() => setMethod('razorpay')} />
              Online Payment via Razorpay
            </label>

            {loading && (
              <div style={{ marginTop: '10px', fontSize: '13px', color: '#888' }}>
                Loading payment details...
              </div>
            )}

            {!loading && method === 'cod' && (
              <div style={{ marginTop: '12px', fontSize: '13px', color: '#555', lineHeight: 1.6 }}>
                Pay when your order is delivered. Best if you want a simple offline option.
              </div>
            )}

            {!loading && method === 'razorpay' && (
              <div style={{ marginTop: '12px', fontSize: '13px', color: '#555', lineHeight: 1.7 }}>
                Razorpay will open a secure payment popup where customers can choose UPI, Cards, Wallets, Netbanking, and more.
                <div style={{ marginTop: '8px', color: '#666' }}>
                  {user?.name ? `Paying as ${user.name}` : 'Your profile details will be used to prefill checkout where possible.'}
                </div>
              </div>
            )}

            {message && (
              <div style={{ marginTop: '14px', padding: '10px 12px', borderRadius: '10px', background: '#ecfdf5', color: '#166534', fontSize: '13px' }}>
                {message}
              </div>
            )}

            {error && (
              <div style={{ marginTop: '14px', padding: '10px 12px', borderRadius: '10px', background: '#fef2f2', color: '#b91c1c', fontSize: '13px' }}>
                {error}
              </div>
            )}

            <button
              style={{ marginTop: '16px', padding: '12px 16px', borderRadius: '12px', border: 'none', background: '#2563EB', color: '#fff', fontWeight: '600', cursor: 'pointer' }}
              onClick={placeOrder}
              disabled={saving || loading}
            >
              {saving ? 'Processing...' : method === 'cod' ? 'Place COD Order' : 'Pay with Razorpay'}
            </button>
          </div>

          <div style={{ width: '100%', maxWidth: '1200px', background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>Order Summary</div>
            {items.map(it => (
              <div key={`${it.productId || it._id}-${it.size}`} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#555' }}>
                <span>{it.name} {it.size ? `(${it.size})` : ''} x {it.quantity}</span>
                <span>{formatInr(it.price * it.quantity)}</span>
              </div>
            ))}
            <div style={{ height: '1px', background: '#f3f4f6', margin: '12px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '700' }}>
              <span>Total</span>
              <span>{formatInr(subtotal)}</span>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.
      </footer>
    </div>
  )
}
