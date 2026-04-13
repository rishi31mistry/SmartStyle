import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const COUPONS = { 'STYLE10': 10, 'SMART20': 20 }

export default function Cart() {
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState(0)
  const [couponMsg, setCouponMsg] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return }
    fetchCart()
  }, [navigate])

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      setCart(data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (productId, size, quantity) => {
    if (quantity < 1) return
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/cart/update/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ size, quantity })
      })
      const data = await res.json()
      setCart(data)
    } catch (err) {
      console.log(err)
    }
  }

  const updateSize = async (productId, oldSize, newSize) => {
    try {
      const token = localStorage.getItem('token')
      // remove old size item
      await fetch(`/api/cart/remove/${productId}?size=${oldSize}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      // add with new size
      const item = cart.find(i => i.productId === productId && i.size === oldSize)
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...item, size: newSize })
      })
      const data = await res.json()
      setCart(data)
    } catch (err) {
      console.log(err)
    }
  }

  const removeItem = async (productId, size) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(
        `/api/cart/remove/${productId}?size=${size}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      const data = await res.json()
      setCart(data)
    } catch (err) {
      console.log(err)
    }
  }

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase()
    if (COUPONS[code]) {
      setDiscount(COUPONS[code])
      setCouponMsg(`✅ Coupon applied! ${COUPONS[code]}% off`)
    } else {
      setDiscount(0)
      setCouponMsg('❌ Invalid coupon code')
    }
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmt = Math.round(subtotal * discount / 100)
  const total = subtotal - discountAmt

  return (
    <div className="page">
      <Navbar active="cart" />

      <div className="wrapper">

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.title}>My Cart 🛒</div>
          <div style={styles.count}>
            {cart.length} {cart.length === 1 ? 'item' : 'items'}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div style={styles.emptyBox}>
            <div style={styles.emptyIcon}>⏳</div>
            <div style={styles.emptyText}>Loading your cart...</div>
          </div>
        )}

        {/* Empty State */}
        {!loading && cart.length === 0 && (
          <div style={styles.emptyBox}>
            <div style={styles.emptyIcon}>🛒</div>
            <div style={styles.emptyText}>Your cart is empty</div>
            <div style={styles.emptySub}>Add items to get started!</div>
            <button style={styles.shopBtn} onClick={() => navigate('/home')}>
              Start Shopping
            </button>
          </div>
        )}

        {/* Cart Content */}
        {!loading && cart.length > 0 && (
          <div style={styles.layout}>

            {/* Cart Items */}
            <div style={styles.itemsList}>
              {cart.map(item => (
                <div key={`${item.productId}-${item.size}`} style={styles.card}>

                  {/* Image */}
                  <div style={styles.imgBox}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={styles.img}
                      onError={e => e.target.src = '/image/placeholder.jpg'}
                    />
                  </div>

                  {/* Details */}
                  <div style={styles.details}>
                    <div style={styles.name}>{item.name}</div>
                    <div style={styles.price}>₹{item.price}</div>

                    {/* Size Selector */}
                    <div style={styles.row}>
                      <span style={styles.label}>Size:</span>
                      <select
                        style={styles.select}
                        value={item.size || ''}
                        onChange={e => updateSize(item.productId, item.size, e.target.value)}
                      >
                        {SIZES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Quantity Controls */}
                    <div style={styles.row}>
                      <span style={styles.label}>Qty:</span>
                      <div style={styles.qtyBox}>
                        <button
                          style={styles.qtyBtn}
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                        >−</button>
                        <span style={styles.qtyNum}>{item.quantity}</span>
                        <button
                          style={styles.qtyBtn}
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                        >+</button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div style={styles.itemTotal}>
                      Total: ₹{item.price * item.quantity}
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    style={styles.removeBtn}
                    onClick={() => removeItem(item.productId, item.size)}
                  >✕</button>

                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div style={styles.summary}>
              <div style={styles.summaryTitle}>Order Summary</div>

              <div style={styles.summaryRow}>
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Discount</span>
                <span style={{ color: '#22c55e' }}>− ₹{discountAmt}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Delivery</span>
                <span style={{ color: '#22c55e' }}>FREE</span>
              </div>

              <div style={styles.divider} />

              <div style={{ ...styles.summaryRow, fontWeight: '700', fontSize: '17px' }}>
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              {/* Coupon */}
              <div style={styles.couponBox}>
                <input
                  style={styles.couponInput}
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                />
                <button style={styles.couponBtn} onClick={applyCoupon}>
                  Apply
                </button>
              </div>
              {couponMsg && (
                <div style={styles.couponMsg}>{couponMsg}</div>
              )}

              <button
                style={styles.checkoutBtn}
                onClick={() => navigate('/checkout', { state: { items: cart } })}
              >
                Proceed to Checkout →
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

const styles = {
  header: {
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px', paddingTop: '16px'
  },
  title: { fontSize: '28px', fontWeight: '700', color: '#111' },
  count: {
    fontSize: '14px', color: '#888',
    background: '#f3f4f6', padding: '6px 14px', borderRadius: '20px'
  },
  emptyBox: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: '80px 20px', gap: '12px'
  },
  emptyIcon: { fontSize: '56px' },
  emptyText: { fontSize: '20px', fontWeight: '600', color: '#111' },
  emptySub: { fontSize: '14px', color: '#888', textAlign: 'center' },
  shopBtn: {
    marginTop: '12px', padding: '14px 32px',
    background: '#2563EB', color: '#fff',
    border: 'none', borderRadius: '14px',
    fontSize: '15px', fontWeight: '600', cursor: 'pointer'
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 340px',
    gap: '24px',
    alignItems: 'start'
  },
  itemsList: { display: 'flex', flexDirection: 'column', gap: '16px' },
  card: {
    background: '#fff', borderRadius: '16px',
    padding: '16px', display: 'flex',
    gap: '16px', position: 'relative',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
  },
  imgBox: {
    width: '110px', height: '110px',
    borderRadius: '12px', overflow: 'hidden',
    background: '#f3f4f6', flexShrink: 0
  },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  details: { flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' },
  name: { fontSize: '15px', fontWeight: '600', color: '#111' },
  price: { fontSize: '15px', fontWeight: '700', color: '#2563EB' },
  row: { display: 'flex', alignItems: 'center', gap: '10px' },
  label: { fontSize: '13px', color: '#888', minWidth: '36px' },
  select: {
    padding: '4px 8px', borderRadius: '8px',
    border: '1px solid #e5e7eb', fontSize: '13px',
    background: '#f9fafb', cursor: 'pointer'
  },
  qtyBox: {
    display: 'flex', alignItems: 'center',
    gap: '10px', background: '#f3f4f6',
    borderRadius: '10px', padding: '4px 10px'
  },
  qtyBtn: {
    background: 'none', border: 'none',
    fontSize: '18px', cursor: 'pointer',
    color: '#2563EB', fontWeight: '700',
    lineHeight: 1
  },
  qtyNum: { fontSize: '15px', fontWeight: '600', minWidth: '20px', textAlign: 'center' },
  itemTotal: { fontSize: '13px', color: '#555', fontWeight: '600' },
  removeBtn: {
    position: 'absolute', top: '12px', right: '12px',
    background: '#fee2e2', border: 'none',
    borderRadius: '50%', width: '28px', height: '28px',
    cursor: 'pointer', fontSize: '12px',
    color: '#ef4444', fontWeight: '700'
  },
  summary: {
    background: '#fff', borderRadius: '16px',
    padding: '24px', position: 'sticky',
    top: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    display: 'flex', flexDirection: 'column', gap: '14px'
  },
  summaryTitle: { fontSize: '18px', fontWeight: '700', color: '#111' },
  summaryRow: {
    display: 'flex', justifyContent: 'space-between',
    fontSize: '14px', color: '#555'
  },
  divider: { height: '1px', background: '#f3f4f6' },
  couponBox: { display: 'flex', gap: '8px' },
  couponInput: {
    flex: 1, padding: '10px 14px',
    border: '1px solid #e5e7eb', borderRadius: '10px',
    fontSize: '13px', outline: 'none'
  },
  couponBtn: {
    padding: '10px 16px', background: '#111',
    color: '#fff', border: 'none',
    borderRadius: '10px', fontSize: '13px',
    fontWeight: '600', cursor: 'pointer'
  },
  couponMsg: { fontSize: '12px', color: '#555' },
  checkoutBtn: {
    width: '100%', padding: '16px',
    background: '#2563EB', color: '#fff',
    border: 'none', borderRadius: '14px',
    fontSize: '15px', fontWeight: '600',
    cursor: 'pointer', marginTop: '8px'
  }
}

