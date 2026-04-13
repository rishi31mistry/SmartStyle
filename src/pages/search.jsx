import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'

export default function Search() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchInput, setSearchInput] = useState(query)
  const [sortBy, setSortBy] = useState('')
  const [filterGender, setFilterGender] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    setSearchInput(query)
    setSortBy('')
    setFilterGender('')
  }, [query])

  useEffect(() => {
    if (!query) {
      setLoading(false)
      setProducts([])
      return
    }

    setLoading(true)
    setProducts([])

    // Check if query is a gender term - if so don't send extra gender filter
    const genderTerms = ['men', 'women', 'footwear', 'accessories']
    const isGenderSearch = genderTerms.includes(query.toLowerCase().trim())

    let url = `/api/products?search=${encodeURIComponent(query)}`

    // Only add gender filter if search is NOT a gender term itself
    if (!isGenderSearch && filterGender) {
      url += `&gender=${encodeURIComponent(filterGender)}`
    }

    if (sortBy) url += `&sort=${sortBy}`

    console.log('Fetching:', url) // debug - remove later

    fetch(url)
      .then(r => r.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [query, sortBy, filterGender])

  const handleSearch = () => {
    const trimmed = searchInput.trim()
    if (trimmed) {
      setSearchParams({ q: trimmed })
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  const tagColors = {
    Hot: '#F5A623',
    New: '#4A90D9',
    Trending: '#E91E8C',
    Sale: '#FF4B4B',
    Bestseller: '#00897B',
    Popular: '#00897B'
  }

  const suggestions = ['Men', 'Women', 'T-Shirts', 'Jeans',
    'Sneakers', 'Watches', 'Nike', 'Zara', 'Sale']

  const smartSearchMap = {
    watch: ['Watches', 'Accessories'],
    watches: ['Men Watch', 'Women Watch', 'Accessories'],
    bracelet: ['Bracelets', 'Accessories'],
    bracelets: ['Women Bracelet', 'Men Bracelet', 'Accessories'],
    sneaker: ['Sneakers', 'Footwear'],
    sneakers: ['Men Sneakers', 'Women Sneakers', 'Footwear'],
    shirt: ['Men Shirt', 'Women Shirt', 'Shirts'],
    shirts: ['Men Shirt', 'Women Shirt', 'Shirts'],
    pant: ['Pants', 'Trousers'],
    pants: ['Men Pants', 'Women Pants', 'Trousers'],
    jeans: ['Men Jeans', 'Women Jeans'],
    heel: ['Heels', 'Footwear'],
    heels: ['Women Heels', 'Footwear'],
    bag: ['Bags', 'Accessories'],
    bags: ['Handbags', 'Backpacks', 'Accessories'],
    earring: ['Earrings', 'Accessories'],
    earrings: ['Women Earrings', 'Accessories'],
    wallet: ['Wallets', 'Accessories'],
    wallets: ['Men Wallet', 'Accessories']
  }

  const typoCorrections = {
    watcch: 'watch',
    watche: 'watch',
    braclet: 'bracelet',
    bracelete: 'bracelet',
    sneakres: 'sneakers',
    snikers: 'sneakers',
    sneker: 'sneaker',
    shrit: 'shirt',
    jenas: 'jeans',
    heelss: 'heels'
  }

  const getSmartSuggestions = (searchQuery) => {
    const lowerQuery = searchQuery.toLowerCase().trim()
    if (!lowerQuery) return { correctedQuery: '', smartSuggestions: [] }

    const words = lowerQuery.split(/\s+/).filter(Boolean)
    const correctedWords = words.map(word => typoCorrections[word] || word)
    const correctedQuery = correctedWords.join(' ')
    const related = []

    correctedWords.forEach(word => {
      if (smartSearchMap[word]) related.push(...smartSearchMap[word])
    })

    if (correctedWords.includes('men')) {
      if (correctedWords.includes('watch') || correctedWords.includes('watches') || correctedWords.includes('bracelet') || correctedWords.includes('bracelets')) {
        related.push('Accessories')
      }
      if (correctedWords.includes('sneaker') || correctedWords.includes('sneakers') || correctedWords.includes('heel') || correctedWords.includes('heels')) {
        related.push('Footwear')
      }
    }

    if (correctedWords.includes('women')) {
      if (correctedWords.includes('watch') || correctedWords.includes('watches') || correctedWords.includes('bracelet') || correctedWords.includes('bracelets') || correctedWords.includes('earring') || correctedWords.includes('earrings')) {
        related.push('Accessories')
      }
      if (correctedWords.includes('sneaker') || correctedWords.includes('sneakers') || correctedWords.includes('heel') || correctedWords.includes('heels')) {
        related.push('Footwear')
      }
    }

    return {
      correctedQuery,
      smartSuggestions: [...new Set(related)]
        .filter(item => item.toLowerCase() !== lowerQuery)
        .slice(0, 6)
    }
  }

  const { correctedQuery, smartSuggestions } = getSmartSuggestions(query)

  return (
    <div className="page">
      <Navbar active="" />

      <div className="wrapper">

        {/* Header */}
        <div className="page-header" style={{ marginBottom: '16px' }}>
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="20" height="20" fill="none" stroke="currentColor"
              strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <h1 className="page-title">
            {query ? `Results for "${query}"` : 'Search'}
          </h1>
        </div>

        {/* Search Bar */}
        <div style={{
          display: 'flex', gap: '10px', marginBottom: '20px',
          background: '#f5f5f5', borderRadius: '12px',
          padding: '10px 14px', alignItems: 'center'
        }}>
          <svg width="18" height="18" fill="none" stroke="#aaa" strokeWidth="2"
            viewBox="0 0 24 24" onClick={handleSearch}
            style={{ cursor: 'pointer', flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>

          <input
            ref={inputRef}
            style={{
              flex: 1, border: 'none', background: 'transparent',
              fontSize: '14px', outline: 'none', color: '#333'
            }}
            placeholder="Search products, brands, categories..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {searchInput && (
            <svg
              onClick={() => { setSearchInput(''); inputRef.current?.focus() }}
              width="14" height="14" fill="none" stroke="#aaa" strokeWidth="2"
              viewBox="0 0 24 24" style={{ cursor: 'pointer', flexShrink: 0 }}>
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          )}

          <button onClick={handleSearch} style={{
            background: '#1a1a1a', color: '#fff', border: 'none',
            borderRadius: '8px', padding: '6px 14px', fontSize: '13px',
            cursor: 'pointer', fontWeight: '600', flexShrink: 0
          }}>
            Search
          </button>
        </div>

        {/* Filters Row — only show when results exist */}
        {!loading && query && products.length > 0 && (
          <div style={{
            display: 'flex', gap: '10px', marginBottom: '16px',
            flexWrap: 'wrap', alignItems: 'center'
          }}>
            <span style={{ fontSize: '13px', color: '#888' }}>
              {products.length} results
            </span>

            <div style={{
              marginLeft: 'auto', display: 'flex',
              gap: '8px', flexWrap: 'wrap'
            }}>
              {/* Only show gender filter if search is not a gender term */}
              {!['men','women','footwear','accessories']
                .includes(query.toLowerCase().trim()) && (
                <select
                  value={filterGender}
                  onChange={(e) => setFilterGender(e.target.value)}
                  style={{
                    border: '1.5px solid #e0e0e0', borderRadius: '8px',
                    padding: '6px 10px', fontSize: '13px',
                    background: filterGender ? '#1a1a1a' : '#fff',
                    color: filterGender ? '#fff' : '#333',
                    cursor: 'pointer', outline: 'none'
                  }}
                >
                  <option value="">All Categories</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Accessories">Accessories</option>
                </select>
              )}

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  border: '1.5px solid #e0e0e0', borderRadius: '8px',
                  padding: '6px 10px', fontSize: '13px',
                  background: sortBy ? '#1a1a1a' : '#fff',
                  color: sortBy ? '#fff' : '#333',
                  cursor: 'pointer', outline: 'none'
                }}
              >
                <option value="">Sort By</option>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>

              {/* Clear */}
              {(sortBy || filterGender) && (
                <button
                  onClick={() => { setSortBy(''); setFilterGender('') }}
                  style={{
                    border: '1.5px solid #ff4b4b', borderRadius: '8px',
                    padding: '6px 12px', fontSize: '13px',
                    background: 'transparent', color: '#ff4b4b',
                    cursor: 'pointer', fontWeight: '600'
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '80px', color: '#888' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</div>
            <div style={{ fontSize: '14px' }}>Searching for "{query}"...</div>
          </div>
        )}

        {/* No Query — show suggestions */}
        {!loading && !query && (
          <div style={{ textAlign: 'center', padding: '80px', color: '#888' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
            <div style={{ fontSize: '16px', fontWeight: '600' }}>
              What are you looking for?
            </div>
            <div style={{ fontSize: '13px', color: '#aaa', marginTop: '6px' }}>
              Search by name, brand, category or color
            </div>
            <div style={{
              display: 'flex', gap: '8px', justifyContent: 'center',
              marginTop: '20px', flexWrap: 'wrap'
            }}>
              {suggestions.map(s => (
                <button key={s}
                  onClick={() => setSearchParams({ q: s })}
                  style={{
                    border: '1.5px solid #e0e0e0', borderRadius: '20px',
                    padding: '6px 14px', fontSize: '13px',
                    background: '#f5f5f5', color: '#555', cursor: 'pointer'
                  }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && query && products.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px', color: '#888' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>😕</div>
            <div style={{ fontSize: '16px', fontWeight: '600' }}>
              No results for "{query}"
            </div>
            <div style={{ fontSize: '13px', color: '#aaa', marginTop: '6px' }}>
              Try searching with different keywords
            </div>
            {correctedQuery && correctedQuery !== query.toLowerCase().trim() && (
              <div style={{ marginTop: '18px' }}>
                <div style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>
                  Did you mean
                </div>
                <button
                  onClick={() => setSearchParams({ q: correctedQuery })}
                  style={{
                    border: '1.5px solid #4A90D9', borderRadius: '20px',
                    padding: '7px 16px', fontSize: '13px',
                    background: '#eef5ff', color: '#2d6ecf',
                    cursor: 'pointer', fontWeight: '600'
                  }}>
                  {correctedQuery}
                </button>
              </div>
            )}
            {smartSuggestions.length > 0 && (
              <div style={{ marginTop: '18px' }}>
                <div style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>
                  Try related searches
                </div>
                <div style={{
                  display: 'flex', gap: '8px', justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  {smartSuggestions.map(s => (
                    <button key={s}
                      onClick={() => setSearchParams({ q: s })}
                      style={{
                        border: '1.5px solid #e0e0e0', borderRadius: '20px',
                        padding: '6px 14px', fontSize: '13px',
                        background: '#fff', color: '#555', cursor: 'pointer'
                      }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div style={{
              display: 'flex', gap: '8px', justifyContent: 'center',
              marginTop: '20px', flexWrap: 'wrap'
            }}>
              {suggestions.map(s => (
                <button key={s}
                  onClick={() => setSearchParams({ q: s })}
                  style={{
                    border: '1.5px solid #e0e0e0', borderRadius: '20px',
                    padding: '6px 14px', fontSize: '13px',
                    background: '#f5f5f5', color: '#555', cursor: 'pointer'
                  }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Grid */}
        {!loading && products.length > 0 && (
          <div className="product-grid">
            {products.map(p => (
              <div key={p._id} className="product-card"
                onClick={() => navigate(`/product/${p._id}`)}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}>

                <div className="product-img-wrap" style={{
                  position: 'relative',
                  height: '420px'
                }}>
                  <img src={p.image} alt={p.name} />

                  {p.tag && (
                    <span style={{
                      position: 'absolute', top: '10px', left: '10px',
                      background: tagColors[p.tag] || '#00897B',
                      color: '#fff', fontSize: '10px', fontWeight: '700',
                      padding: '3px 8px', borderRadius: '20px'
                    }}>
                      {p.tag}
                    </span>
                  )}

                  {p.originalPrice > 0 && p.originalPrice > p.price && (
                    <span style={{
                      position: 'absolute', top: '10px', right: '10px',
                      background: '#FF4B4B', color: '#fff',
                      fontSize: '10px', fontWeight: '700',
                      padding: '3px 8px', borderRadius: '20px'
                    }}>
                      -{Math.round((p.originalPrice - p.price) /
                        p.originalPrice * 100)}%
                    </span>
                  )}
                </div>

                <div className="product-info" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1
                }}>
                  <div className="product-name">{p.name}</div>
                  <div style={{ fontSize: '11px', color: '#aaa', marginBottom: '4px' }}>
                    {p.brand} · {p.gender}
                  </div>
                  <div className="product-meta">
                    <span className="product-price">
                      ₹{p.price.toLocaleString('en-IN')}
                    </span>
                    {p.originalPrice > 0 && p.originalPrice > p.price && (
                      <span style={{
                        fontSize: '12px', color: '#aaa',
                        textDecoration: 'line-through', marginLeft: '6px'
                      }}>
                        ₹{p.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <button className="add-to-cart-btn"
                    style={{ marginTop: 'auto' }}
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/product/${p._id}`)
                    }}>
                    View Product
                  </button>
                </div>
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

