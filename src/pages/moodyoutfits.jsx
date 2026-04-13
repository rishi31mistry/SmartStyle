import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'



// ─── Mood config ──────────────────────────────────────────────────────────────
// Each mood defines what API calls to make to fetch outfit items.
// items: array of { role, label, gender, category, limit }
// role = which slot in the outfit card this product fills
const MOODS = [
  {
    id: 'first-impression-fit',
    name: 'First Impression Fit',
    tagline: 'Psychology-based styling',
    sub: 'Interview · First Date · Meeting',
    badge: 'Most Trusted',
    badgeColor: '#4A90D9',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&q=80',
    // What products make up one outfit in this mood
    slots: [
      { role: 'Top',      label: 'Formal Shirt',    gender: 'Men',       category: 'Shirts',        limit: 15 },
      { role: 'Bottom',   label: 'Slim Trousers',   gender: 'Men',       category: 'Trousers',      limit: 15 },
      { role: 'Footwear', label: 'Formal Shoes',    gender: 'Footwear',  category: 'Formal Shoes',  limit: 15 },
      { role: 'Accessory',label: 'Watch',           gender: 'Accessories',category: 'Watches',      limit: 10 },
    ],
  },
  {
    id: 'comfort-mode',
    name: 'Comfort Mode',
    tagline: 'Relax Fit',
    sub: 'Chilling · Long Days · Low Effort',
    badge: 'Trending',
    badgeColor: '#E91E8C',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
    slots: [
      { role: 'Top',      label: 'Oversized Tee',   gender: 'Men',       category: 'T-Shirts',      limit: 15 },
      { role: 'Bottom',   label: 'Joggers',          gender: 'Men',       category: 'Trousers',      limit: 15 },
      { role: 'Footwear', label: 'Flip Flops',       gender: 'Footwear',  category: 'Flip Flops',    limit: 15 },
      { role: 'Accessory',label: 'Cap',              gender: 'Accessories',category: 'Caps & Hats',  limit: 10 },
    ],
  },
  {
    id: 'statement-fit',
    name: 'Statement Fit',
    tagline: 'Stand Out',
    sub: 'Events · Social Media · Parties',
    badge: 'Fan Favorite',
    badgeColor: '#FF4B4B',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80',
    slots: [
      { role: 'Top',      label: 'Hoodie / Jacket', gender: 'Men',       category: 'Hoodies',       limit: 15 },
      { role: 'Bottom',   label: 'Slim Jeans',      gender: 'Men',       category: 'Jeans',         limit: 15 },
      { role: 'Footwear', label: 'Sneakers',        gender: 'Footwear',  category: 'Sneakers',      limit: 15 },
      { role: 'Accessory',label: 'Sunglasses',      gender: 'Accessories',category: 'Sunglasses',   limit: 10 },
    ],
  },
  {
    id: 'quick-go',
    name: 'Quick Go',
    tagline: 'Lazy Picker',
    sub: 'No-Think · Fast · Effortless',
    badge: 'Smart Pick',
    badgeColor: '#F5A623',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80',
    slots: [
      { role: 'Top',      label: 'Polo / Basic Tee', gender: 'Men',      category: 'T-Shirts',      limit: 15 },
      { role: 'Bottom',   label: 'Chinos / Shorts',  gender: 'Men',      category: 'Shorts',        limit: 15 },
      { role: 'Footwear', label: 'Loafers / Slip-ons',gender: 'Footwear',category: 'Loafers',       limit: 15 },
      { role: 'Accessory',label: 'Belt',             gender: 'Accessories',category: 'Belts',        limit: 10 },
    ],
  },
  {
    id: 'travel-ready',
    name: 'Travel Ready',
    tagline: 'Comfort + Style',
    sub: 'Flights · Trips · Explore',
    badge: 'Modern Pick',
    badgeColor: '#00897B',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&q=80',
    slots: [
      { role: 'Top',      label: 'Linen Shirt',     gender: 'Men',       category: 'Shirts',        limit: 15 },
      { role: 'Bottom',   label: 'Cargo Pants',     gender: 'Men',       category: 'Trousers',      limit: 15 },
      { role: 'Footwear', label: 'Sports Shoes',    gender: 'Footwear',  category: 'Sports Shoes',  limit: 15 },
      { role: 'Accessory',label: 'Backpack',        gender: 'Accessories',category: 'Bags',         limit: 10 },
    ],
  },
]

const MOODY_API = '/api/moodyproducts'
const PRODUCT_API = '/api/products'
const ROLE_ORDER = ['Top', 'Bottom', 'Footwear', 'Accessory']

// Groups flat product list from API into outfit objects
function groupIntoOutfits(products) {
  const map = {}
  for (const p of products) {
    const gender = (p.outfitGender || 'Men').toLowerCase()
    const num = p.outfitNum || 1
    const key = `${gender}-${num}`
    if (!map[key]) map[key] = { id: key, gender, num, items: [] }
    map[key].items.push(p)
  }
  return Object.values(map)
    .map(o => ({
      ...o,
      items: ROLE_ORDER
        .map(role => o.items.find(it => it.outfitRole === role))
        .filter(Boolean)
    }))
    .filter(o => o.items.length > 0)
    .sort((a, b) => a.gender.localeCompare(b.gender) || a.num - b.num)
}

// ─── Outfit Card — Hero image + thumbnail strip ───────────────────────────
const TAG_COLORS = { Hot:'#F5A623', New:'#4A90D9', Trending:'#E91E8C', Sale:'#FF4B4B', Bestseller:'#00897B', Popular:'#00897B' }

function OutfitCard({ outfit, moodId, index, navigate }) {
  const totalPrice = outfit.items.reduce((s, it) => s + it.price, 0)
  const heroItem = outfit.items[0]

  return (
    <div
      className="moody-outfit-card"
      onClick={() => navigate(`/products/moodyoutfits/${moodId}/outfit/${index}`)}
    >
      {/* Hero image */}
      <div className="moody-outfit-hero">
        <img
          src={heroItem?.image}
          alt={heroItem?.name}
          onError={e => { e.target.src = 'https://placehold.co/400x300?text=No+Image' }}
        />
        {heroItem?.tag && (
          <span className="moody-outfit-hero-badge" style={{ background: TAG_COLORS[heroItem.tag] || '#888' }}>
            {heroItem.tag}
          </span>
        )}
        <span className="moody-outfit-hero-role">{heroItem?.outfitRole}</span>
      </div>

      {/* Thumbnail strip */}
      <div className="moody-outfit-strip">
        {outfit.items.slice(1).map((item, i) => (
          <div key={i} className="moody-outfit-thumb">
            <img src={item.image} alt={item.name}
              onError={e => { e.target.src = 'https://placehold.co/80x80?text=?' }} />
            <span className="moody-outfit-thumb-label">{item.outfitRole}</span>
          </div>
        ))}
      </div>

      {/* Info body */}
      <div className="moody-outfit-body">
        <div className="moody-outfit-name">Outfit {index + 1}</div>
        <div className="moody-outfit-items-list">
          {outfit.items.map((it, i) => (
            <span key={i} className="moody-outfit-chip">{it.outfitRole}</span>
          ))}
        </div>
        <div className="moody-outfit-price-row">
          <span className="moody-outfit-price">₹{totalPrice.toLocaleString('en-IN')}</span>
          <span className="moody-outfit-count">{outfit.items.length} items</span>
        </div>
        <button className="moody-explore-btn">View Outfit →</button>
      </div>
    </div>
  )
}
// ─── Mood Detail Page (outfit grid for one mood) ──────────────────────────────
function MoodPage({ mood, navigate }) {
  const [outfits, setOutfits] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [error, setError] = useState('')
  const [productCount, setProductCount] = useState(0)

  useEffect(() => {
    setLoading(true)
    setError('')
    const fetchJson = async (url) => {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      return response.json()
    }

    fetchJson(`${MOODY_API}?moodId=${mood.id}&isMoodyOutfit=true`)
      .catch(err => {
        console.warn('Moody API unavailable, falling back to products API:', err)
        return fetchJson(`${PRODUCT_API}?moodId=${mood.id}&isMoodyOutfit=true`)
      })
      .then(data => {
        if (!Array.isArray(data)) {
          throw new Error('Invalid moody products response')
        }
        setProductCount(data.length)
        setOutfits(groupIntoOutfits(data))
        setLoading(false)
      })
      .catch(e => {
        console.error('Moody outfits fetch failed:', e)
        setProductCount(0)
        setOutfits([])
        setError(e.message || 'Unable to load outfits')
        setLoading(false)
      })
  }, [mood.id])

  const filtered = filter === 'all' ? outfits : outfits.filter(o => o.gender === filter)

  return (
    <div>
      {/* Mood hero banner */}
      <div className="moody-hero" style={{ backgroundImage: `url(${mood.image})` }}>
        <div className="moody-hero-overlay" />
        <div className="moody-hero-text">
          <div className="moody-hero-sub">{mood.sub}</div>
          <div className="moody-hero-title">{mood.name}</div>
          <div className="moody-hero-tag">{mood.tagline}</div>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 0 16px' }}>
        <h2 className="section-title">Curated Outfits</h2>
        <div style={{ display:'flex', gap:6 }}>
          {['all','men','women'].map(f => (
            <button key={f}
              onClick={() => setFilter(f)}
              style={{
                padding:'6px 16px', borderRadius:20, border:'1.5px solid',
                fontSize:12, fontWeight:600, fontFamily:"'Poppins',sans-serif", cursor:'pointer',
                background: filter===f ? '#4A90D9' : '#fff',
                color: filter===f ? '#fff' : '#555',
                borderColor: filter===f ? '#4A90D9' : '#ddd',
                transition:'all 0.2s'
              }}>
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase()+f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign:'center', padding:'60px 0', color:'#aaa', fontSize:15 }}>
          Loading outfits...
        </div>
      ) : error ? (
        <div style={{ textAlign:'center', padding:'60px 0', color:'#c62828', fontSize:15 }}>
          {error}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign:'center', padding:'60px 0', color:'#777', fontSize:15 }}>
          No outfits found for this mood.
          <div style={{ marginTop: 8, fontSize: 13, color: '#999' }}>
            API returned {productCount} product{productCount !== 1 ? 's' : ''}.
          </div>
        </div>
      ) : (
        <div className="moody-outfits-grid">
          {filtered.map((outfit) => (
            <OutfitCard
              key={outfit.id}
              outfit={outfit}
              moodId={mood.id}
              index={outfits.indexOf(outfit)}
              navigate={navigate}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Main MoodyOutfits Page ───────────────────────────────────────────────────
export default function MoodyOutfits() {
  const { moodId } = useParams()   // undefined on /moody-outfits, set on /moody-outfits/:moodId
  const navigate = useNavigate()

  const activeMood = MOODS.find(m => m.id === moodId)

  return (
    <div className="page">
      <Navbar active="home" />

      <style>{`
        /* ── Wrapper ── */
        .moody-wrapper {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 20px 60px;
          background: #f5f5f5;
        }

        /* ── Page header ── */
        .moody-page-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px 0 20px;
        }
        .moody-back-btn {
          background: #fff;
          border: none;
          border-radius: 12px;
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          flex-shrink: 0;
        }
        .moody-page-title { font-size: 26px; font-weight: 700; color: #111; }
        .moody-page-sub   { font-size: 13px; color: #aaa; margin-top: 2px; }

        /* ── Category cards grid ── */
        .moody-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }
        .moody-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          cursor: pointer;
          transition: transform 0.2s;
        }
        .moody-card:hover { transform: translateY(-4px); }
        .moody-card-img {
          height: 300px; overflow: hidden;
          background: #eee; position: relative;
        }
        .moody-card-img img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: top;
          transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .moody-card:hover .moody-card-img img { transform: scale(1.05); }
        .moody-badge {
          position: absolute; top: 10px; left: 10px;
          color: #fff; font-size: 10px; font-weight: 700;
          padding: 3px 8px; border-radius: 6px;
        }
        .moody-card-body { padding: 12px 14px 16px; }
        .moody-card-sub  { font-size: 10px; font-weight: 600; color: #bbb; letter-spacing: .05em; text-transform: uppercase; margin-bottom: 4px; }
        .moody-card-name { font-size: 14px; font-weight: 700; color: #111; margin-bottom: 2px; }
        .moody-card-tag  { font-size: 12px; color: #aaa; margin-bottom: 10px; }
        .moody-explore-btn {
          width: 100%; padding: 10px;
          background: #4A90D9; color: #fff;
          border: none; border-radius: 10px;
          font-size: 13px; font-weight: 600;
          font-family: 'Poppins', sans-serif;
          cursor: pointer; transition: opacity 0.2s;
        }
        .moody-explore-btn:hover { opacity: 0.85; }

        /* ── Mood hero banner ── */
        .moody-hero {
          border-radius: 18px; overflow: hidden;
          height: 200px; position: relative;
          background-size: cover; background-position: top center;
          margin-bottom: 8px;
        }
        .moody-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(120deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 100%);
        }
        .moody-hero-text { position: absolute; bottom: 24px; left: 28px; color: #fff; }
        .moody-hero-sub  { font-size: 11px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; opacity: .8; margin-bottom: 4px; }
        .moody-hero-title{ font-size: 28px; font-weight: 700; line-height: 1.2; }
        .moody-hero-tag  { font-size: 13px; opacity: .75; margin-top: 2px; }

        /* ── Outfit cards grid (2 per row) ── */
        .moody-outfits-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .moody-outfit-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          cursor: pointer;
          transition: transform 0.2s;
        }
        .moody-outfit-card:hover { transform: translateY(-4px); }

        /* Hero image */
        .moody-outfit-hero {
          position: relative; overflow: hidden;
          height: 420px; background: #eee;
        }
        .moody-outfit-hero img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: top;
          transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
          display: block;
        }
        .moody-outfit-card:hover .moody-outfit-hero img { transform: scale(1.05); }
        .moody-outfit-hero-badge {
          position: absolute; top: 10px; left: 10px;
          color: #fff; font-size: 10px; font-weight: 700;
          padding: 3px 8px; border-radius: 6px;
        }
        .moody-outfit-hero-role {
          position: absolute; bottom: 10px; left: 10px;
          background: rgba(0,0,0,0.55); color: #fff;
          font-size: 9px; font-weight: 700;
          padding: 3px 8px; border-radius: 5px;
          text-transform: uppercase; letter-spacing: .06em;
        }

        /* Thumbnail strip */
        .moody-outfit-strip {
          display: flex; gap: 4px;
          padding: 8px 8px 0;
        }
        .moody-outfit-thumb {
          flex: 1; height: 150px;
          border-radius: 8px; overflow: hidden;
          background: #f0f0f0; position: relative;
        }
        .moody-outfit-thumb img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: top; display: block;
        }
        .moody-outfit-thumb-label {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: rgba(0,0,0,0.5); color: #fff;
          font-size: 7px; font-weight: 700;
          text-align: center; padding: 2px 0;
          text-transform: uppercase; letter-spacing: .04em;
        }

        /* Outfit card body */
        .moody-outfit-body { padding: 12px 14px 16px; }
        .moody-outfit-name {
          font-size: 14px; font-weight: 600; color: #111;
          margin-bottom: 8px;
        }
        .moody-outfit-items-list { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px; }
        .moody-outfit-chip {
          background: #f0f6ff; color: #4A90D9;
          font-size: 10px; font-weight: 600;
          padding: 3px 8px; border-radius: 20px;
        }
        .moody-outfit-price-row {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 12px;
        }
        .moody-outfit-price { font-size: 16px; font-weight: 700; color: #4A90D9; }
        .moody-outfit-count { font-size: 12px; color: #aaa; }

                /* ── Responsive ── */
        @media (max-width: 1024px) {
          .moody-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .moody-grid { grid-template-columns: repeat(3, 1fr); gap: 12px; }
          .moody-card-img { height: 220px; }
          .moody-page-title { font-size: 20px; }
          .moody-wrapper { padding: 0 14px 80px; }
          .moody-outfits-grid { grid-template-columns: repeat(2, 1fr); }
          .moody-outfit-hero { height: 180px; }
        }
        @media (max-width: 480px) {
          .moody-grid { grid-template-columns: repeat(3, 1fr); gap: 10px; }
          .moody-card-img { height: 180px; }
        }
      `}</style>

      <div className="moody-wrapper">
        {/* Header */}
        <div className="moody-page-header">
          <button className="moody-back-btn" onClick={() => navigate(-1)}>
            <svg width="18" height="18" fill="none" stroke="#333" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <div>
            <div className="moody-page-title">
              {activeMood ? activeMood.name : 'Moody Outfits'}
            </div>
            <div className="moody-page-sub">
              {activeMood ? activeMood.sub : 'Pick your vibe, we\'ll style the rest'}
            </div>
          </div>
        </div>

        {/* If no mood selected → show the 5 mood category cards */}
        {!activeMood && (
          <div className="moody-grid">
            {MOODS.map(mood => (
              <div
                key={mood.id}
                className="moody-card"
                onClick={() => navigate(`/products/moodyoutfits/${mood.id}`)}
              >
                <div className="moody-card-img">
                  <img src={mood.image} alt={mood.name} />
                  <span className="moody-badge" style={{ background: mood.badgeColor }}>
                    {mood.badge}
                  </span>
                </div>
                <div className="moody-card-body">
                  <div className="moody-card-sub">{mood.sub}</div>
                  <div className="moody-card-name">{mood.name}</div>
                  <div className="moody-card-tag">{mood.tagline}</div>
                  <button className="moody-explore-btn">Explore Outfits →</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* If mood selected → show outfit grid */}
        {activeMood && (
          <MoodPage mood={activeMood} navigate={navigate} />
        )}
      </div>

      <footer className="footer">
        ® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.
      </footer>
    </div>
  )
}

