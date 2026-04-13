import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState(null)
  //const [selectedImg, setSelectedImg] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [wishlist, setWishlist] = useState(false)
  const [sizeError, setSizeError] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    // Fetch product details
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
        setLoading(false)
        // Fetch suggestions based on category
        //const cat = Array.isArray(data.category) ? data.category[0] : data.category
        const cat = Array.isArray(data.category) ? data.category[0] : data.category
        const genderParam = encodeURIComponent(data.gender)
        const categoryParam = cat ? `&category=${encodeURIComponent(cat)}` : ''

        fetch(`/api/products?gender=${genderParam}${categoryParam}`)
          .then(res => res.json())
          .then(all => {
            let filtered = all.filter(p => p._id !== data._id)
            if (filtered.length < 8) {
              return fetch(`/api/products?gender=${genderParam}`)
                .then(r => r.json())
                .then(all2 => {
                  const more = all2.filter(p => p._id !== data._id)
                  const merged = [...filtered, ...more.filter(p => !filtered.find(x => x._id === p._id))]
                  setSuggestions(merged.slice(0, 8))
                })
            }
            setSuggestions(filtered.slice(0, 8))
          })
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [id])

  const handleAddToCart = async () => {
    if (!selectedSize) { setSizeError(true); return }
    setSizeError(false)
    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return false }

    try {
      await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          size: selectedSize,
          quantity
        })
      })
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  const handleShopNow = async () => {
    if (!selectedSize) { setSizeError(true); return }
    const ok = await handleAddToCart()
    if (!ok) return
    navigate('/checkout', {
      state: {
        product: {
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image
        },
        size: selectedSize,
        quantity
      }
    })
  }

  const handleWishlist = async () => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return }

    if (wishlist) {
      await fetch(`/api/wishlist/remove/${product._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      setWishlist(false)
    } else {
      await fetch('/api/wishlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image
        })
      })
      setWishlist(true)
    }
  }

  if (loading) return (
    <div className="page">
      <Navbar />
      <div style={{ textAlign: 'center', padding: '100px', fontSize: '18px', color: '#888' }}>
        Loading product...
      </div>
    </div>
  )

  if (!product) return (
    <div className="page">
      <Navbar />
      <div style={{ textAlign: 'center', padding: '100px', fontSize: '18px', color: '#888' }}>
        Product not found!
      </div>
    </div>
  )

  return (
    <div className="page">
      <Navbar active="" />
      <div className="wrapper">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={styles.backBtn}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back
        </button>

        {/* Product Main Section */}
        <div style={styles.mainSection}>

          {/* Images */}
          <div style={styles.imgSection}>
            <div style={styles.mainImgBox}>
              <img
                src={product.image}
                alt={product.name}
                style={styles.mainImg}
              />
              {/* Wishlist Button */}
              <button
                style={styles.wishlistBtn}
                onClick={handleWishlist}
              >
                <svg width="22" height="22"
                  fill={wishlist ? '#FF4B4B' : 'none'}
                  stroke={wishlist ? '#FF4B4B' : '#333'}
                  strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
              {/* Tag */}
              {product.tag && (
                <span style={styles.tag}>{product.tag}</span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div style={styles.infoSection}>

            {/* Brand & Name */}
            <div style={styles.brand}>{product.brand}</div>
            <div style={styles.name}>{product.name}</div>

            {/* Rating */}
            <div style={styles.ratingRow}>
              <span style={styles.stars}>{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
              <span style={styles.ratingNum}>{product.rating} / 5</span>
            </div>

            {/* Price */}
            <div style={styles.priceRow}>
              <span style={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice > 0 && (
                <>
                  <span style={styles.originalPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  <span style={styles.discount}>
                    {Math.round((product.originalPrice - product.price) / product.originalPrice * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            

            {/* Size Selector */}
            <div style={styles.section}>
              <div style={styles.sectionLabel}>
                Select Size
                {sizeError && <span style={styles.sizeError}> ← Please select a size!</span>}
              </div>
              <div style={styles.sizesRow}>
                {product.sizes.map(s => (
                  <button
                    key={s}
                    style={{
                      ...styles.sizeBtn,
                      background: selectedSize === s ? '#2563EB' : '#f3f4f6',
                      color: selectedSize === s ? '#fff' : '#111',
                      border: selectedSize === s ? '2px solid #2563EB' : '2px solid transparent',
                    }}
                    onClick={() => { setSelectedSize(s); setSizeError(false) }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div style={styles.section}>
              <div style={styles.sectionLabel}>Quantity</div>
              <div style={styles.qtyRow}>
                <button style={styles.qtyBtn} onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                <span style={styles.qtyNum}>{quantity}</span>
                <button style={styles.qtyBtn} onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={styles.btnsRow}>
              <button
                style={styles.cartBtn}
                onClick={handleAddToCart}
              >
                {addedToCart ? '✅ Added!' : 'Add to Cart'}
              </button>
              <button
                style={styles.shopBtn}
                onClick={handleShopNow}
              >
                Shop Now
              </button>
            </div>

            {/* Product Details */}
            <div style={styles.detailsBox}>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Category</span>
                <span style={styles.detailValue}>
                  {Array.isArray(product.category) ? product.category.join(', ') : product.category}
                </span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Brand</span>
                <span style={styles.detailValue}>{product.brand}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Gender</span>
                <span style={styles.detailValue}>{product.gender}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <>
            <div style={styles.suggestTitle}>You May Also Like</div>
            <div style={styles.suggestGrid}>
              {suggestions.map(p => (
                <div
                  key={p._id}
                  style={styles.suggestCard}
                  onClick={() => navigate(`/product/${p._id}`)}
                >
                  <div style={styles.suggestImgBox}>
                    <img src={p.image} alt={p.name} style={styles.suggestImg} />
                  </div>
                  <div style={styles.suggestName}>{p.name}</div>
                  <div style={styles.suggestPrice}>₹{p.price.toLocaleString('en-IN')}</div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
      <footer className="footer">® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.</footer>
    </div>
  )
}

const styles = {
  backBtn: {
    display: 'flex', alignItems: 'center', gap: '6px',
    background: 'none', border: 'none',
    fontSize: '15px', color: '#555',
    cursor: 'pointer', padding: '16px 0',
    fontWeight: '500'
  },
  mainSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    alignItems: 'start',
    marginBottom: '48px'
  },
  imgSection: { display: 'flex', flexDirection: 'column', gap: '12px' },
  mainImgBox: {
    position: 'relative',
    borderRadius: '20px',
    overflow: 'hidden',
    background: '#f3f4f6',
    aspectRatio: '2/2'
  },
  mainImg: { width: '100%', height: '100%', objectFit: 'cover' },
  wishlistBtn: {
    position: 'absolute', top: '16px', right: '16px',
    background: '#fff', border: 'none',
    borderRadius: '50%', width: '44px', height: '44px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  tag: {
    position: 'absolute', top: '16px', left: '16px',
    background: '#2563EB', color: '#fff',
    padding: '4px 12px', borderRadius: '20px',
    fontSize: '12px', fontWeight: '600'
  },
  infoSection: { display: 'flex', flexDirection: 'column', gap: '16px' },
  brand: { fontSize: '14px', color: '#888', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' },
  name: { fontSize: '28px', fontWeight: '700', color: '#111', lineHeight: '1.3' },
  ratingRow: { display: 'flex', alignItems: 'center', gap: '10px' },
  stars: { fontSize: '18px', color: '#F5A623' },
  ratingNum: { fontSize: '14px', color: '#888' },
  priceRow: { display: 'flex', alignItems: 'center', gap: '12px' },
  price: { fontSize: '28px', fontWeight: '700', color: '#111' },
  originalPrice: { fontSize: '18px', color: '#aaa', textDecoration: 'line-through' },
  discount: { fontSize: '14px', color: '#22c55e', fontWeight: '600', background: '#f0fdf4', padding: '4px 10px', borderRadius: '20px' },
  section: { display: 'flex', flexDirection: 'column', gap: '10px' },
  sectionLabel: { fontSize: '14px', fontWeight: '600', color: '#555' },
  colorDot: { width: '24px', height: '24px', borderRadius: '50%', background: '#111' },
  colorName: { fontSize: '14px', color: '#333' },
  sizesRow: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  sizeBtn: {
    padding: '10px 18px', borderRadius: '10px',
    fontSize: '14px', fontWeight: '600',
    cursor: 'pointer', transition: 'all 0.2s'
  },
  sizeError: { color: '#ef4444', fontSize: '12px', fontWeight: '400' },
  qtyRow: { display: 'flex', alignItems: 'center', gap: '16px', background: '#f3f4f6', borderRadius: '12px', padding: '8px 16px', width: 'fit-content' },
  qtyBtn: { background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#2563EB', fontWeight: '700' },
  qtyNum: { fontSize: '18px', fontWeight: '600', minWidth: '24px', textAlign: 'center' },
  btnsRow: { display: 'flex', gap: '12px', marginTop: '8px' },
  cartBtn: {
    flex: 1, padding: '16px',
    background: '#f3f4f6', color: '#111',
    border: '2px solid #e5e7eb', borderRadius: '14px',
    fontSize: '15px', fontWeight: '600', cursor: 'pointer'
  },
  shopBtn: {
    flex: 1, padding: '16px',
    background: '#2563EB', color: '#fff',
    border: 'none', borderRadius: '14px',
    fontSize: '15px', fontWeight: '600', cursor: 'pointer'
  },
  detailsBox: {
    background: '#f9fafb', borderRadius: '14px',
    padding: '16px', display: 'flex',
    flexDirection: 'column', gap: '10px',
    marginTop: '8px'
  },
  detailRow: { display: 'flex', justifyContent: 'space-between', fontSize: '14px' },
  detailLabel: { color: '#888', fontWeight: '500' },
  detailValue: { color: '#111', fontWeight: '600' },
  suggestTitle: { fontSize: '22px', fontWeight: '700', color: '#111', marginBottom: '16px' },
  suggestGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '16px',
    marginBottom: '40px'
  },
  suggestCard: {
    cursor: 'pointer', borderRadius: '14px',
    overflow: 'hidden', background: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
  },
  suggestImgBox: { aspectRatio: '3/4', overflow: 'hidden', background: '#f3f4f6' },
  suggestImg: { width: '100%', height: '100%', objectFit: 'cover' },
  suggestName: { fontSize: '13px', fontWeight: '600', color: '#111', padding: '8px 10px 4px' },
  suggestPrice: { fontSize: '13px', fontWeight: '700', color: '#2563EB', padding: '0 10px 10px' }
}

