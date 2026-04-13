import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'



// Same MOODS + buildOutfits as MoodyOutfits.jsx — copy the config here
// (or move to a shared moods.js file and import from both)
const MOODS = [
  {
    id: 'first-impression-fit',
    name: 'First Impression Fit',
    tagline: 'Psychology-based styling',
    sub: 'Interview · First Date · Meeting',
    slots: [
      { role: 'Top',       label: 'Formal Shirt',    gender: 'Men',        category: 'Shirts',        limit: 15 },
      { role: 'Bottom',    label: 'Slim Trousers',   gender: 'Men',        category: 'Trousers',      limit: 15 },
      { role: 'Footwear',  label: 'Formal Shoes',    gender: 'Footwear',   category: 'Formal Shoes',  limit: 15 },
      { role: 'Accessory', label: 'Watch',           gender: 'Accessories',category: 'Watches',       limit: 10 },
    ],
  },
  {
    id: 'comfort-mode',
    name: 'Comfort Mode',
    tagline: 'Relax Fit',
    sub: 'Chilling · Long Days · Low Effort',
    slots: [
      { role: 'Top',       label: 'Oversized Tee',    gender: 'Men',        category: 'T-Shirts',     limit: 15 },
      { role: 'Bottom',    label: 'Joggers',           gender: 'Men',        category: 'Trousers',     limit: 15 },
      { role: 'Footwear',  label: 'Flip Flops',        gender: 'Footwear',   category: 'Flip Flops',  limit: 15 },
      { role: 'Accessory', label: 'Cap',               gender: 'Accessories',category: 'Caps & Hats', limit: 10 },
    ],
  },
  {
    id: 'statement-fit',
    name: 'Statement Fit',
    tagline: 'Stand Out',
    sub: 'Events · Social Media · Parties',
    slots: [
      { role: 'Top',       label: 'Hoodie / Jacket',  gender: 'Men',        category: 'Hoodies',      limit: 15 },
      { role: 'Bottom',    label: 'Slim Jeans',        gender: 'Men',        category: 'Jeans',        limit: 15 },
      { role: 'Footwear',  label: 'Sneakers',          gender: 'Footwear',   category: 'Sneakers',     limit: 15 },
      { role: 'Accessory', label: 'Sunglasses',        gender: 'Accessories',category: 'Sunglasses',   limit: 10 },
    ],
  },
  {
    id: 'quick-go',
    name: 'Quick Go',
    tagline: 'Lazy Picker',
    sub: 'No-Think · Fast · Effortless',
    slots: [
      { role: 'Top',       label: 'Polo / Basic Tee',  gender: 'Men',        category: 'T-Shirts',    limit: 15 },
      { role: 'Bottom',    label: 'Chinos / Shorts',    gender: 'Men',        category: 'Shorts',      limit: 15 },
      { role: 'Footwear',  label: 'Loafers',            gender: 'Footwear',   category: 'Loafers',     limit: 15 },
      { role: 'Accessory', label: 'Belt',               gender: 'Accessories',category: 'Belts',       limit: 10 },
    ],
  },
  {
    id: 'travel-ready',
    name: 'Travel Ready',
    tagline: 'Comfort + Style',
    sub: 'Flights · Trips · Explore',
    slots: [
      { role: 'Top',       label: 'Linen Shirt',    gender: 'Men',        category: 'Shirts',        limit: 15 },
      { role: 'Bottom',    label: 'Cargo Pants',    gender: 'Men',        category: 'Trousers',      limit: 15 },
      { role: 'Footwear',  label: 'Sports Shoes',   gender: 'Footwear',   category: 'Sports Shoes',  limit: 15 },
      { role: 'Accessory', label: 'Backpack',       gender: 'Accessories',category: 'Bags',          limit: 10 },
    ],
  },
]

const MOODY_API = '/api/moodyproducts'
const PRODUCT_API = '/api/products'
const ROLE_ORDER = ['Top', 'Bottom', 'Footwear', 'Accessory']

// outfitIndex 0-5 = men outfit 1-6, index 6-11 = women outfit 1-6
function indexToGenderNum(idx) {
  if (idx < 6) return { outfitGender: 'Men',   outfitNum: idx + 1 }
  return               { outfitGender: 'Women', outfitNum: idx - 5 }
}

const tagColors = {
  Hot: '#F5A623', New: '#4A90D9', Trending: '#E91E8C',
  Sale: '#FF4B4B', Bestseller: '#00897B', Popular: '#00897B',
}

export default function OutfitDetail() {
  const { moodId, outfitIndex } = useParams()
  const navigate = useNavigate()
  const idx = parseInt(outfitIndex, 10)

  const mood = MOODS.find(m => m.id === moodId)

  const [outfit, setOutfit] = useState(null)
  const [loading, setLoading] = useState(true)
  // checked = set of item roles that are selected
  const [checked, setChecked] = useState(new Set())
  const [addedToCart, setAddedToCart] = useState(false)
  const [selectedSizes, setSelectedSizes] = useState({}) // { role: size }
  const [sizeErrorRoles, setSizeErrorRoles] = useState([])

  // Fetch outfit items from DB by moodId + outfitGender + outfitNum
  useEffect(() => {
    if (!mood) return
    setLoading(true)
    const { outfitGender, outfitNum } = indexToGenderNum(idx)
    const primaryUrl = `${MOODY_API}?moodId=${mood.id}&outfitGender=${outfitGender}&outfitNum=${outfitNum}&isMoodyOutfit=true`
    const fallbackUrl = `${PRODUCT_API}?moodId=${mood.id}&outfitGender=${outfitGender}&outfitNum=${outfitNum}&isMoodyOutfit=true`
    const fetchJson = async (url) => {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      return response.json()
    }

    fetchJson(primaryUrl)
      .catch(err => {
        console.warn('Moody API unavailable, falling back to products API:', err)
        return fetchJson(fallbackUrl)
      })
      .then(products => {
        console.log('Outfit products fetched:', products.length, primaryUrl)
        const items = ROLE_ORDER.map(role => products.find(p => p.outfitRole === role)).filter(Boolean)
        const found = items.length > 0
          ? { id: `${outfitGender}-${outfitNum}`, gender: outfitGender, num: outfitNum, items }
          : null
        setOutfit(found)
        if (found) setChecked(new Set(found.items.map(it => it.outfitRole)))
        setLoading(false)
      })
      .catch(e => { console.error('Outfit fetch error:', e); setLoading(false) })
  }, [moodId, idx,mood])

  const toggleCheck = (role) => {
    setChecked(prev => {
      const next = new Set(prev)
      if (next.has(role)) {
        // Must keep at least 1 checked
        if (next.size > 1) next.delete(role)
      } else {
        next.add(role)
      }
      return next
    })
  }

  const selectedItems = outfit?.items.filter(it => checked.has(it.outfitRole)) || []
  const totalPrice = selectedItems.reduce((s, it) => s + it.price, 0)
  const rolesMissingSizes = selectedItems
    .filter(it => Array.isArray(it.sizes) && it.sizes.length > 0 && !selectedSizes[it.outfitRole])
    .map(it => it.outfitRole)

  const validateSelectedItems = () => {
    if (selectedItems.length === 0) return false

    setSizeErrorRoles(rolesMissingSizes)
    return rolesMissingSizes.length === 0
  }

  const handleAddToCart = async () => {
    if (!validateSelectedItems()) return false

    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return false }

    // Add outfit as one cart item — description carries what's included
    const outfitName = `${mood.name} — Outfit ${idx + 1}`
    const itemsDesc = selectedItems.map(it => `${it.outfitRole}: ${it.name}`).join(' | ')

    try {
      await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: selectedItems[0]._id,
          name: outfitName,
          price: totalPrice,
          image: selectedItems[0].image,
          size: selectedSizes[selectedItems[0].outfitRole] || selectedItems[0].sizes?.[0] || '',
          quantity: 1,
          outfitItems: selectedItems.map(it => ({
            _id: it._id,
            name: it.name,
            role: it.outfitRole,
            price: it.price,
            image: it.image,
            size: selectedSizes[it.outfitRole] || it.sizes?.[0] || '',
          })),
          description: itemsDesc,
        }),
      })
      setSizeErrorRoles([])
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2500)
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }

  const handleBuyNow = async () => {
    if (!validateSelectedItems()) return

    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return }

    navigate('/checkout', {
      state: {
        items: selectedItems.map(it => ({
          _id: it._id,
          name: it.name,
          price: it.price,
          image: it.image,
          size: selectedSizes[it.outfitRole] || '',
          quantity: 1,
        }))
      }
    })
  }

  if (!mood) return (
    <div className="page"><Navbar /><div style={{ padding: 60, textAlign: 'center', color: '#888' }}>Mood not found.</div></div>
  )

  return (
    <div className="page">
      <Navbar active="" />

      <style>{`
        .outfit-wrapper {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px 60px;
          background: #f5f5f5;
        }
        .outfit-header {
          display: flex; align-items: center; gap: 14px;
          padding: 20px 0 16px;
        }
        .outfit-back-btn {
          background: #fff; border: none; border-radius: 12px;
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          flex-shrink: 0;
        }
        .outfit-title { font-size: 22px; font-weight: 700; color: #111; }
        .outfit-subtitle { font-size: 13px; color: #aaa; margin-top: 2px; }

        .outfit-main {
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 28px;
          align-items: start;
        }

        /* Left: 2x2 photo grid */
        .outfit-photo-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          border-radius: 18px;
          overflow: hidden;
        }
        .outfit-photo-cell {
          position: relative; overflow: hidden;
          background: #eee; aspect-ratio: 3/4;
          opacity: 1; transition: opacity 0.3s;
        }
        .outfit-photo-cell.dimmed { opacity: 0.35; }
        .outfit-photo-cell img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: top; display: block;
        }
        .outfit-photo-role-tag {
          position: absolute; bottom: 10px; left: 10px;
          background: rgba(0,0,0,0.6); color: #fff;
          font-size: 10px; font-weight: 700;
          padding: 3px 8px; border-radius: 6px;
          text-transform: uppercase; letter-spacing: .05em;
        }
        .outfit-photo-tag {
          position: absolute; top: 10px; left: 10px;
          color: #fff; font-size: 10px; font-weight: 700;
          padding: 3px 8px; border-radius: 6px;
        }

        /* Right: info panel */
        .outfit-info-panel {
          background: #fff;
          border-radius: 18px;
          padding: 24px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          position: sticky;
          top: 80px;
        }
        .outfit-info-mood-tag {
          display: inline-block;
          background: #f0f6ff; color: #4A90D9;
          font-size: 11px; font-weight: 600;
          padding: 4px 10px; border-radius: 20px;
          margin-bottom: 10px;
        }
        .outfit-info-title {
          font-size: 20px; font-weight: 700; color: #111;
          margin-bottom: 4px;
        }
        .outfit-info-sub {
          font-size: 13px; color: #aaa; margin-bottom: 20px;
        }

        /* Items checklist */
        .outfit-items-label {
          font-size: 13px; font-weight: 600; color: #555;
          margin-bottom: 12px;
        }
        .outfit-item-row {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid #f0f0f0;
          cursor: pointer;
          transition: background 0.15s;
          border-radius: 8px;
        }
        .outfit-item-row:last-child { border-bottom: none; }
        .outfit-item-row:hover { background: #fafafa; }

        .outfit-item-check {
          width: 18px; height: 18px; border-radius: 5px;
          border: 2px solid #4A90D9;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 2px;
          transition: background 0.2s;
        }
        .outfit-item-check.on { background: #4A90D9; }

        .outfit-item-img {
          width: 52px; height: 64px; border-radius: 8px;
          overflow: hidden; background: #f5f5f5; flex-shrink: 0;
        }
        .outfit-item-img img {
          width: 100%; height: 100%; object-fit: cover; object-position: top;
        }

        .outfit-item-meta { flex: 1; min-width: 0; }
        .outfit-item-role {
          font-size: 10px; font-weight: 600; color: #4A90D9;
          text-transform: uppercase; letter-spacing: .05em; margin-bottom: 2px;
        }
        .outfit-item-name {
          font-size: 13px; font-weight: 500; color: #222;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          margin-bottom: 4px;
        }
        .outfit-item-price {
          font-size: 13px; font-weight: 700; color: #4A90D9;
        }

        /* Size selector per item */
        .outfit-size-row { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 6px; }
        .outfit-size-btn {
          padding: 3px 8px;
          border-radius: 6px;
          font-size: 10px; font-weight: 600;
          cursor: pointer;
          border: 1.5px solid #e0e0e0;
          background: #f5f5f5; color: #555;
          font-family: 'Poppins', sans-serif;
          transition: all 0.15s;
        }
        .outfit-size-btn.selected {
          background: #4A90D9; color: #fff; border-color: #4A90D9;
        }

        /* Price total */
        .outfit-price-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 0 4px;
          border-top: 1px solid #f0f0f0;
          margin-top: 8px;
        }
        .outfit-total-label { font-size: 13px; color: #888; font-weight: 500; }
        .outfit-total-price { font-size: 22px; font-weight: 700; color: #111; }
        .outfit-selected-note { font-size: 11px; color: #aaa; margin-bottom: 16px; }

        /* Buttons */
        .outfit-btns { display: flex; gap: 10px; }
        .outfit-cart-btn {
          flex: 1; padding: 13px;
          background: #f0f6ff; color: #4A90D9;
          border: 1.5px solid #4A90D9;
          border-radius: 12px;
          font-size: 14px; font-weight: 600;
          font-family: 'Poppins', sans-serif;
          cursor: pointer; transition: all 0.2s;
        }
        .outfit-cart-btn:hover { background: #4A90D9; color: #fff; }
        .outfit-buy-btn {
          flex: 1; padding: 13px;
          background: #4A90D9; color: #fff;
          border: none; border-radius: 12px;
          font-size: 14px; font-weight: 600;
          font-family: 'Poppins', sans-serif;
          cursor: pointer; transition: opacity 0.2s;
        }
        .outfit-buy-btn:hover { opacity: 0.88; }

        /* What's included pill list */
        .outfit-includes {
          margin-top: 18px;
          padding: 14px;
          background: #f9f9f9;
          border-radius: 12px;
        }
        .outfit-includes-title { font-size: 12px; font-weight: 600; color: #555; margin-bottom: 8px; }
        .outfit-includes-list { display: flex; flex-direction: column; gap: 4px; }
        .outfit-includes-row {
          display: flex; justify-content: space-between;
          font-size: 12px; color: #777;
        }
        .outfit-includes-row span:last-child { font-weight: 600; color: #333; }

        /* Responsive */
        @media (max-width: 900px) {
          .outfit-main { grid-template-columns: 1fr; }
          .outfit-info-panel { position: static; }
        }
        @media (max-width: 480px) {
          .outfit-photo-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="outfit-wrapper">

        {/* Header */}
        <div className="outfit-header">
          <button className="outfit-back-btn" onClick={() => navigate(-1)}>
            <svg width="18" height="18" fill="none" stroke="#333" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <div>
            <div className="outfit-title">{mood.name}</div>
            <div className="outfit-subtitle">Outfit {idx + 1} · {mood.sub}</div>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#aaa', fontSize: 15 }}>
            Loading outfit...
          </div>
        ) : !outfit ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#aaa', fontSize: 15 }}>
            Outfit not found.
          </div>
        ) : (
          <div className="outfit-main">

            {/* LEFT — 2x2 photo grid */}
            <div className="outfit-photo-grid">
              {outfit.items.slice(0, 4).map((item, i) => (
                <div
                  key={i}
                  className={`outfit-photo-cell ${!checked.has(item.outfitRole) ? 'dimmed' : ''}`}
                  onClick={() => toggleCheck(item.outfitRole)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={e => { e.target.src = 'https://placehold.co/300x400?text=No+Image' }}
                  />
                  {item.tag && (
                    <span className="outfit-photo-tag" style={{ background: tagColors[item.tag] || '#888' }}>
                      {item.tag}
                    </span>
                  )}
                  <span className="outfit-photo-role-tag">{item.outfitRole}</span>
                </div>
              ))}
            </div>

            {/* RIGHT — info panel */}
            <div className="outfit-info-panel">
              <span className="outfit-info-mood-tag">{mood.tagline}</span>
              <div className="outfit-info-title">Outfit {idx + 1}</div>
              <div className="outfit-info-sub">Choose the items you want in your outfit</div>

              <div className="outfit-items-label">Select Items (min. 1)</div>

              {outfit.items.map((item) => {
                const isOn = checked.has(item.outfitRole)
                return (
                  <div key={item.outfitRole} className="outfit-item-row" onClick={() => toggleCheck(item.outfitRole)}>
                    {/* Checkbox */}
                    <div className={`outfit-item-check ${isOn ? 'on' : ''}`}>
                      {isOn && (
                        <svg width="10" height="10" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                      )}
                    </div>

                    {/* Thumbnail */}
                    <div className="outfit-item-img">
                      <img src={item.image} alt={item.name}
                        onError={e => { e.target.src = 'https://placehold.co/52x64?text=?' }} />
                    </div>

                    {/* Meta */}
                    <div className="outfit-item-meta" onClick={e => e.stopPropagation()}>
                      <div className="outfit-item-role">{item.outfitRole}</div>
                      <div className="outfit-item-name">{item.name}</div>
                      <div className="outfit-item-price">₹{item.price.toLocaleString('en-IN')}</div>

                      {/* Size selector (only shown if item is checked) */}
                      {isOn && item.sizes && item.sizes.length > 0 && (
                        <div className="outfit-size-row">
                          {item.sizes.map(sz => (
                            <button
                              key={sz}
                              className={`outfit-size-btn ${selectedSizes[item.outfitRole] === sz ? 'selected' : ''}`}
                              onClick={e => {
                                e.stopPropagation()
                                setSelectedSizes(prev => ({ ...prev, [item.outfitRole]: sz }))
                                setSizeErrorRoles(prev => prev.filter(role => role !== item.outfitRole))
                              }}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      )}
                      {isOn && sizeErrorRoles.includes(item.outfitRole) && (
                        <div style={{ marginTop: '6px', fontSize: '11px', color: '#ef4444', fontWeight: '500' }}>
                          Select a size before continuing
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}

              {/* Price total */}
              <div className="outfit-price-row">
                <div className="outfit-total-label">Total</div>
                <div className="outfit-total-price">₹{totalPrice.toLocaleString('en-IN')}</div>
              </div>
              <div className="outfit-selected-note">
                {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
              </div>

              {/* Action buttons */}
              <div className="outfit-btns">
                <button className="outfit-cart-btn" onClick={handleAddToCart}>
                  {addedToCart ? '✓ Added!' : 'Add to Cart'}
                </button>
                <button className="outfit-buy-btn" onClick={handleBuyNow}>
                  Buy Now
                </button>
              </div>

              {/* What's included */}
              <div className="outfit-includes">
                <div className="outfit-includes-title">What's in this outfit</div>
                <div className="outfit-includes-list">
                  {selectedItems.map(it => (
                    <div key={it.outfitRole} className="outfit-includes-row">
                      <span>{it.outfitRole} — {it.name}</span>
                      <span>₹{it.price.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
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

