import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function Wishlist() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    fetchWishlist()
  }, [navigate])

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('http://localhost:5000/api/wishlist', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      setWishlist(data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async (productId) => {
    try {
      const token = localStorage.getItem('token')
      await fetch(`http://localhost:5000/api/wishlist/remove/${productId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      setWishlist(wishlist.filter(item => item.productId !== productId))
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddToCart = async (item) => {
    try {
      const token = localStorage.getItem('token')
      await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1
        })
      })
      alert(`${item.name} added to cart!`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="page">
      <Navbar active="wishlist" />

      <div className="wrapper">

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.title}>My Wishlist ❤️</div>
          <div style={styles.count}>
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div style={styles.emptyBox}>
            <div style={styles.emptyIcon}>⏳</div>
            <div style={styles.emptyText}>Loading your wishlist...</div>
          </div>
        )}

        {/* Empty State */}
        {!loading && wishlist.length === 0 && (
          <div style={styles.emptyBox}>
            <div style={styles.emptyIcon}>🤍</div>
            <div style={styles.emptyText}>Your wishlist is empty</div>
            <div style={styles.emptySub}>Save items you love and find them here!</div>
            <button
              style={styles.shopBtn}
              onClick={() => navigate('/home')}
            >
              Start Shopping
            </button>
          </div>
        )}

        {/* Wishlist Grid */}
        {!loading && wishlist.length > 0 && (
          <div style={styles.grid}>
            {wishlist.map(item => (
              <div key={item.productId} style={styles.card}>

                {/* Remove Button */}
                <button
                  style={styles.removeBtn}
                  onClick={() => handleRemove(item.productId)}
                >
                  ✕
                </button>

                {/* Product Image */}
                <div style={styles.imgBox}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={styles.img}
                    onError={e => e.target.src = '/image/placeholder.jpg'}
                  />
                </div>

                {/* Product Info */}
                <div style={styles.info}>
                  <div style={styles.name}>{item.name}</div>
                  <div style={styles.price}>₹{item.price}</div>
                </div>

                {/* Add to Cart Button */}
                <button
                  style={styles.cartBtn}
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>

              </div>
            ))}
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px',
    paddingTop: '16px'
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#111'
  },
  count: {
    fontSize: '14px',
    color: '#888',
    background: '#f3f4f6',
    padding: '6px 14px',
    borderRadius: '20px'
  },
  emptyBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 20px',
    gap: '12px'
  },
  emptyIcon: { fontSize: '56px' },
  emptyText: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#111'
  },
  emptySub: {
    fontSize: '14px',
    color: '#888',
    textAlign: 'center'
  },
  shopBtn: {
    marginTop: '12px',
    padding: '14px 32px',
    background: '#2563EB',
    color: '#fff',
    border: 'none',
    borderRadius: '14px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px'
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '16px',
    position: 'relative',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  removeBtn: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: '#fee2e2',
    border: 'none',
    borderRadius: '50%',
    width: '28px',
    height: '28px',
    cursor: 'pointer',
    fontSize: '12px',
    color: '#ef4444',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgBox: {
    width: '100%',
    aspectRatio: '1',
    borderRadius: '12px',
    overflow: 'hidden',
    background: '#f3f4f6'
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  name: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#111',
    lineHeight: '1.3'
  },
  price: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#2563EB'
  },
  cartBtn: {
    width: '100%',
    padding: '10px',
    background: '#2563EB',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: 'auto'
  }
}