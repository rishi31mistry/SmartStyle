import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value || 0)
}

function formatOrderDate(value) {
  if (!value) return ''

  return new Date(value).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function getOrderStatusLabel(status) {
  if (status === 'paid') return 'Paid'
  if (status === 'cod_pending') return 'Cash on Delivery'
  if (status === 'created') return 'Pending Payment'
  if (status === 'failed') return 'Payment Failed'
  if (status === 'cancelled') return 'Cancelled'
  return status || 'Unknown'
}

function canCancelOrder(status) {
  return status === 'paid' || status === 'cod_pending'
}

function getOrderIdentifier(order) {
  return order?._id || order?.id || order?.razorpayOrderId || order?.receipt || ''
}

export default function OrderHistory() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cancellingOrderId, setCancellingOrderId] = useState('')

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
        const { data } = await readApiResponse(res)
        if (!res.ok) {
          throw new Error(data?.message || 'Unable to load orders')
        }

        setOrders(Array.isArray(data.orders) ? data.orders : [])
        setError('')
      })
      .catch((err) => {
        setError(err.message || 'Unable to load orders')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [navigate])

  const handleCancelOrder = async (orderId) => {
    const confirmed = window.confirm('Are you sure you want to cancel this order?')
    if (!confirmed) return

    try {
      setCancellingOrderId(orderId)
      setError('')

      const token = localStorage.getItem('token')
      const res = await fetch(`/api/payment/orders/${orderId}/cancel`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      const { data, text, status } = await readApiResponse(res)
      if (!res.ok) {
        if (status === 404) {
          throw new Error('Cancel order endpoint was not found. Restart the backend server and try again.')
        }

        throw new Error(data?.message || text || 'Unable to cancel order')
      }

      setOrders(prev =>
        prev.map(order =>
          getOrderIdentifier(order) === orderId
            ? { ...order, status: data.order.status, cancelledAt: data.order.cancelledAt, cancelReason: data.order.cancelReason }
            : order
        )
      )
    } catch (err) {
      setError(err.message || 'Unable to cancel order')
    } finally {
      setCancellingOrderId('')
    }
  }

  return (
    <div className="page">
      <Navbar active="account" />

      <div className="wrapper">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <button className="back-btn" onClick={() => navigate('/account')}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <h1 className="page-title">Order History</h1>
        </div>

        <div style={{ background: '#fff', borderRadius: '16px', padding: '18px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          {loading ? (
            <div style={{ fontSize: '14px', color: '#666' }}>Loading your orders...</div>
          ) : error ? (
            <div style={{ fontSize: '14px', color: '#dc2626' }}>{error}</div>
          ) : orders.length === 0 ? (
            <div style={{ fontSize: '14px', color: '#666' }}>
              No orders yet. Your ordered products will appear here.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {orders.map((order, orderIndex) => {
                const orderIdentifier = getOrderIdentifier(order)

                return (
                  <div key={orderIdentifier || `${order.createdAt}-${orderIndex}`} style={{ border: '1px solid #e5e7eb', borderRadius: '14px', padding: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: '700' }}>{formatCurrency(order.amount)}</div>
                        <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
                          {formatOrderDate(order.createdAt)} | {order.paymentMethod === 'razorpay' ? 'Razorpay' : 'COD'}
                        </div>
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: order.status === 'paid' ? '#16a34a' : '#374151' }}>
                        {getOrderStatusLabel(order.status)}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {(order.items || []).map((item, itemIndex) => (
                        <div key={`${item.productId}-${item.size}-${itemIndex}`} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <div style={{ width: '64px', height: '76px', borderRadius: '10px', overflow: 'hidden', background: '#f3f4f6', flexShrink: 0 }}>
                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '14px', fontWeight: '600' }}>{item.name}</div>
                            <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
                              Qty: {item.quantity}{item.size ? ` | Size: ${item.size}` : ''}
                            </div>
                            <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
                              {formatCurrency(item.price)}
                            </div>
                          </div>
                        </div>
                      ))}

                      {canCancelOrder(order.status) && (
                        <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'flex-end' }}>
                          <button
                            type="button"
                            onClick={() => handleCancelOrder(orderIdentifier)}
                            disabled={!orderIdentifier || cancellingOrderId === orderIdentifier}
                            style={{
                              padding: '10px 14px',
                              borderRadius: '10px',
                              border: '1px solid #fecaca',
                              background: '#fff',
                              color: '#dc2626',
                              fontWeight: '600',
                              cursor: !orderIdentifier || cancellingOrderId === orderIdentifier ? 'not-allowed' : 'pointer',
                              opacity: !orderIdentifier || cancellingOrderId === orderIdentifier ? 0.7 : 1,
                            }}
                          >
                            {cancellingOrderId === orderIdentifier ? 'Cancelling...' : 'Cancel Order'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
              </div>
          )}
        </div>
      </div>

      <footer className="footer">
        <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.
      </footer>
    </div>
  )
}
