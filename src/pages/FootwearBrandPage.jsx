import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function FootwearBrandPage({
  brand,
  title,
  categoryNames,
  subGender = 'Men',
  wrapperClass = 'wrapper_men',
  activeColor = '#111',
}) {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const normalizedSubGender = subGender.toLowerCase()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `/api/products?gender=Footwear&subGender=${encodeURIComponent(subGender)}&brand=${encodeURIComponent(brand)}`
        )

        if (!res.ok) {
          throw new Error(`Failed to fetch ${brand} footwear`)
        }

        const data = await res.json()
        setProducts(data)
      } catch (err) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [brand, subGender])

  const filteredProducts = products.filter((product) => {
    if (product.subGender === subGender) {
      return true
    }

    return product.image?.toLowerCase().includes(`/footwear/${normalizedSubGender}/`) || false
  })

  const sections = categoryNames.map((name) => ({
    name,
    products: filteredProducts.filter((product) => product.category === name),
  }))

  const allProducts = sections.flatMap((section) => section.products)

  const categories = [
    { name: 'All', count: allProducts.length },
    ...sections.map((section) => ({ name: section.name, count: section.products.length })),
  ]

  const toggleWishlist = (id) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const tagColor = (tag) => {
    if (tag === 'Sale') return '#FF4B4B'
    if (tag === 'New') return '#4A90D9'
    if (tag === 'Trending') return '#E91E8C'
    if (tag === 'Bestseller') return '#F5A623'
    if (tag === 'Popular') return '#00897B'
    return '#888'
  }

  const formatSectionTitle = (name) => {
    if (name === 'Sports Shoes') return `${brand} Sports Shoes`
    if (name === 'Sneakers') return `${brand} Sneakers`
    if (name === 'Flip Flops') return `${brand} Flip Flops & Slides`
    if (name === 'Formal Shoes') return `${brand} Formal Shoes`
    if (name === 'Boots') return `${brand} Boots`
    return `${brand} ${name}`
  }

  const ProductCard = ({ product }) => (
    <div className="product-card" onClick={() => navigate(`/product/${product._id}`)} style={{ cursor: 'pointer' }}>
      <div className="product-img-wrap" style={{ height: '420px' }}>
        <img src={product.image} alt={product.name} />
        <button
          className="wishlist-btn"
          onClick={(event) => {
            event.stopPropagation()
            toggleWishlist(product._id)
          }}
        >
          <svg
            width="16"
            height="16"
            fill={wishlist.includes(product._id) ? '#FF4B4B' : 'none'}
            stroke={wishlist.includes(product._id) ? '#FF4B4B' : '#fff'}
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        {product.tag && <span className="product-tag" style={{ background: tagColor(product.tag) }}>{product.tag}</span>}
      </div>
      <div className="product-info">
        <div className="product-name">{product.name}</div>
        <div className="product-meta">
          <div>
            <span className="product-price">Rs. {product.price}</span>
            {product.originalPrice > 0 && <span className="original-price"> Rs. {product.originalPrice}</span>}
          </div>
          {product.rating && <span className="product-rating">* {product.rating}</span>}
        </div>
        <button className="add-to-cart-btn" onClick={(event) => event.stopPropagation()}>
          Add to Cart
        </button>
      </div>
    </div>
  )

  return (
    <div className="page">
      <Navbar active="" />
      <div className={wrapperClass}>
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <h1 className="page-title">{title}</h1>
        </div>

        {categoryNames.length > 1 && (
          <>
            <div className="section-header">
              <h2 className="section-title">Shop by Category</h2>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  style={{
                    padding: '10px 22px',
                    borderRadius: '50px',
                    border: activeCategory === cat.name ? 'none' : '1.5px solid #ddd',
                    background: activeCategory === cat.name ? activeColor : '#fff',
                    color: activeCategory === cat.name ? '#fff' : '#444',
                    fontSize: '13px',
                    fontWeight: '600',
                    fontFamily: 'Poppins, sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat.name}
                  <span style={{ marginLeft: '6px', fontSize: '11px', opacity: 0.7 }}>({cat.count})</span>
                </button>
              ))}
            </div>
          </>
        )}

        {loading && <p>Loading products...</p>}
        {error && <p>{error}</p>}

        {!loading &&
          !error &&
          sections.map((section, index) =>
            (categoryNames.length === 1 || activeCategory === 'All' || activeCategory === section.name) &&
            section.products.length > 0 ? (
              <div key={section.name}>
                <div className="section-header">
                  <h2 className="section-title">{formatSectionTitle(section.name)}</h2>
                </div>
                <div className="product-grid">
                  {section.products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
                {index !== sections.length - 1 && <div className="divider" />}
              </div>
            ) : null
          )}
      </div>

      <footer className="footer">
        (R) <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.
      </footer>
    </div>
  )
}

