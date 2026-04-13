import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/common.css'
import Navbar from '../components/navbar'

const DEPT_DATA = {
  Men: {
    brands:['Nike', 'Adidas', 'H&M', 'Jack & Jones', 'Puma', "Levi's", 'Gap', 'U.S. Polo', 'Wrangler', 'Tommy Hilfiger'],
    categories: ['T-Shirts', 'Shirts', 'Jeans', 'Trousers', 'Kurtas', 'Jackets', 'Hoodies', 'Shorts', 'Suits', 'Ethnic Wear', 'Sportswear'],
    gender: 'Men',
  },
  Women: {
    brands: ['Zara', 'H&M', 'Libas', 'Biba', 'Nykaa Fashion', 'Shein', 'Aurelia', 'Fabindia', 'Only', 'Vero Moda'],
    categories: ['Kurtis', 'Dresses', 'Sarees', 'Tops', 'Jeans', 'Plazzos', 'Lehengas', 'Jackets', 'Skirts', 'Ethnic Wear', 'Sportswear'],
    gender: 'Women',
  },
  Footwear: {
    brands: ['Nike', 'Adidas', 'Puma', 'Woodland', 'New Balance', 'Skechers', 'ASICS', 'Under Armour', 'Bata', 'Lee Cooper', 'Aldo', 'Inc.5', 'Rocia', 'Clarks', 'Hush Puppies', 'Non Brand'],
    categories:  ['Sneakers', 'Sports Shoes', 'Formal Shoes', 'Sandals', 'Boots', 'Loafers', 'Heels', 'Flats', 'Wedges', 'Flip Flops', 'Slip-ons', 'Kolhapuri', 'Juttis', 'Mules', 'Derby Shoes', 'Pumps', 'Stilettos', 'Ballerinas'],
    gender: 'Footwear',
  },
  Accessories: {
    categories:  ['Watches','Sunglasses', 'Belts','Caps & Hats', 'Wallets','Ties','Cufflinks','Bags & Backpacks','Keychains','Trimmer', 'Jewellery','Handbags','Hair Accessories', 'Scarves & Stoles', 'Earrings', 'Necklaces','Bracelets','Bangles','Clutches','Rings', 'Perfumes'],
    gender: 'Accessories',
  },
}

const MAIN_SLOTS = [
  { id: 'topwear', label: 'Top Wear', icon: 'Top' },
  { id: 'bottomwear', label: 'Bottom Wear', icon: 'Bottom' },
  { id: 'footwear', label: 'Footwear', icon: 'Shoes' },
  { id: 'accessory', label: 'Accessories', icon: 'Acc' },
]

let extraCounter = 0
const newExtra = () => ({ id: `extra_${++extraCounter}`, label: 'Extra', product: null })

const tagColor = (tag) => {
  if (tag === 'Hot') return '#F5A623'
  if (tag === 'New') return '#4A90D9'
  if (tag === 'Trending') return '#E91E8C'
  if (tag === 'Sale') return '#FF4B4B'
  if (tag === 'Bestseller') return '#00897B'
  return '#00897B'
}

function ChevronIcon() {
  return (
    <svg className="co-chevron" viewBox="0 0 16 16" fill="none">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FilterNavbar({ department, setDepartment, brand, setBrand, category, setCategory }) {
  const deptConfig = department ? DEPT_DATA[department] : null
  const brands = Array.isArray(deptConfig?.brands) ? deptConfig.brands : []
  const categories = Array.isArray(deptConfig?.categories) ? deptConfig.categories : []
  const showBrandFilter = department !== 'Accessories'

  const handleDeptChange = (e) => {
    setDepartment(e.target.value || null)
    setBrand('')
    setCategory('')
  }

  return (
    <div className="co-filter-navbar">
      <div className="co-filter-dropdown-wrap">
        <select value={department || ''} onChange={handleDeptChange}>
          <option value="">Catagories</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Footwear">Footwear</option>
          <option value="Accessories">Accessories</option>
        </select>
        <ChevronIcon />
      </div>

      {showBrandFilter && (
        <div className="co-filter-dropdown-wrap">
          <select value={brand} onChange={(e) => setBrand(e.target.value)} disabled={!department}>
            <option value="">All Brands</option>
            {brands.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <ChevronIcon />
        </div>
      )}

      <div className="co-filter-dropdown-wrap">
        <select value={category} onChange={(e) => setCategory(e.target.value)} disabled={!department}>
          <option value="">All Categories</option>
          {categories.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <ChevronIcon />
      </div>
    </div>
  )
}

function resolveOutfitGender(mainSlots, department) {
  const apparelProduct = mainSlots.topwear || mainSlots.bottomwear
  const apparelGender = apparelProduct?.gender

  if (apparelGender === 'Men' || apparelGender === 'Women') return apparelGender
  if (department === 'Men' || department === 'Women') return department
  return null
}

function SlotCard({ slot, isActive, isExtra, onClick, onRemove, onDeleteExtra }) {
  const isEmpty = !slot.product

  return (
    <div
      className={`co-slot ${isEmpty ? 'co-slot--empty' : 'co-slot--filled'} ${isExtra ? 'co-slot--extra' : ''} ${isActive ? 'co-slot-active' : ''}`}
      onClick={onClick}
    >
      {isExtra && (
        <button className="co-slot__x" onClick={(e) => { e.stopPropagation(); onDeleteExtra() }}>
          x
        </button>
      )}

      {isEmpty ? (
        <>
          <div className="co-slot__icon">{slot.icon || '+'}</div>
          <div className="co-slot__label">{slot.label}</div>
          <div className="co-slot__plus">+</div>
        </>
      ) : (
        <>
          <img src={slot.product.image} alt={slot.product.name} className="co-slot__img" />
          <div className="co-slot__filled-name">{slot.product.name}</div>
          <button className="co-slot__remove" onClick={(e) => { e.stopPropagation(); onRemove() }}>
            Remove
          </button>
        </>
      )}
    </div>
  )
}

function InlineProductPicker({ department, brand, category, activeSlotLabel, activeSlotId, outfitGender, onSelect }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    const slotDepartment = activeSlotId === 'footwear'
      ? 'Footwear'
      : activeSlotId === 'accessory' || String(activeSlotId || '').startsWith('extra_')
        ? 'Accessories'
        : department

    const gender = slotDepartment && DEPT_DATA[slotDepartment] ? DEPT_DATA[slotDepartment].gender : ''
    const url = gender
      ? `http://localhost:5000/api/products?gender=${encodeURIComponent(gender)}`
      : 'http://localhost:5000/api/products'

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [department, activeSlotId])

  let filtered = [...products]

  if (brand) {
    filtered = filtered.filter((item) => item.brand === brand)
  }

  if (category) {
    filtered = filtered.filter((item) => {
      if (Array.isArray(item.category)) return item.category.includes(category)
      return item.category === category
    })
  }

  const shouldMatchOutfitGender =
    (activeSlotId === 'footwear' || activeSlotId === 'accessory' || String(activeSlotId || '').startsWith('extra_')) &&
    (outfitGender === 'Men' || outfitGender === 'Women')

  if (shouldMatchOutfitGender) {
    filtered = filtered.filter((item) => item.subGender === outfitGender)
  }

  return (
    <div className="co-products-panel">
      <div className="co-products-panel-top">
        <div>
          <div className="co-products-title">{department ? `${department} Products` : 'All Products'}</div>
          <div className="co-products-sub">
            {activeSlotLabel ? `Choose an item for ${activeSlotLabel}` : 'Select a slot on the left, then choose a product here'}
          </div>
        </div>
        <div className="co-modal-sub">
          {shouldMatchOutfitGender && <span className="co-modal-chip">{outfitGender}</span>}
          {brand && <span className="co-modal-chip">{brand}</span>}
          {category && <span className="co-modal-chip">{category}</span>}
        </div>
      </div>

      <div className="co-modal-count">
        {loading ? 'Loading...' : `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`}
      </div>

      {loading ? (
        <div className="co-modal-loading">Loading products...</div>
      ) : filtered.length === 0 ? (
        <div className="co-modal-empty">No products found. Try changing filters.</div>
      ) : (
        <div className="co-modal-grid">
          {filtered.map((item) => (
            <div
              key={item._id}
              className={`co-modal-card${activeSlotLabel ? '' : ' co-modal-card-disabled'}`}
              onClick={() => activeSlotLabel && onSelect(item)}
            >
              <div className="co-modal-img-wrap">
                <img src={item.image} alt={item.name} className="co-modal-img" />
                {item.tag && (
                  <span className="co-modal-tag" style={{ background: tagColor(item.tag) }}>{item.tag}</span>
                )}
              </div>
              <div className="co-modal-info">
                <div className="co-modal-name">{item.name}</div>
                <div className="co-modal-price">Rs. {item.price?.toLocaleString('en-IN')}</div>
                {item.rating && <div className="co-modal-rating">Rating {item.rating}</div>}
                {!activeSlotLabel && <div className="co-pick-hint">Pick a slot first</div>}
                {activeSlotLabel && <button className="co-pick-btn" type="button">Use For {activeSlotLabel}</button>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function CustomOutfit() {
  const navigate = useNavigate()
  const [department, setDepartment] = useState(null)
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [mainSlots, setMainSlots] = useState(Object.fromEntries(MAIN_SLOTS.map((slot) => [slot.id, null])))
  const [extras, setExtras] = useState([])
  const [activeSlotId, setActiveSlotId] = useState('topwear')
  const [activeIsExtra, setActiveIsExtra] = useState(false)
  const [actionLoading, setActionLoading] = useState('')
  const [actionError, setActionError] = useState('')

  const selectSlot = (slotId, isExtra = false) => {
    setActiveSlotId(slotId)
    setActiveIsExtra(isExtra)
  }

  const handleProductSelect = (product) => {
    setActionError('')
    if (!activeSlotId) return

    if (activeIsExtra) {
      setExtras((prev) => prev.map((item) => (item.id === activeSlotId ? { ...item, product } : item)))
      return
    }

    setMainSlots((prev) => ({ ...prev, [activeSlotId]: product }))
  }

  const removeMain = (id) => setMainSlots((prev) => ({ ...prev, [id]: null }))

  const removeExtra = (id) => {
    setExtras((prev) => prev.filter((item) => item.id !== id))
    if (activeSlotId === id) {
      setActiveSlotId('topwear')
      setActiveIsExtra(false)
    }
  }

  const addExtraSlot = () => {
    const extra = newExtra()
    setExtras((prev) => [...prev, extra])
    setActiveSlotId(extra.id)
    setActiveIsExtra(true)
  }

  const activeSlotLabel = activeIsExtra
    ? extras.find((item) => item.id === activeSlotId)?.label || 'Extra'
    : MAIN_SLOTS.find((slot) => slot.id === activeSlotId)?.label || ''
  const outfitGender = resolveOutfitGender(mainSlots, department)
  const selectedItemCount = Object.values(mainSlots).filter(Boolean).length + extras.filter((item) => item.product).length

  const getSelectedProducts = () => ([
    ...Object.values(mainSlots).filter(Boolean),
    ...extras.map((item) => item.product).filter(Boolean),
  ])

  const getCheckoutItems = () => (
    getSelectedProducts().map((product) => ({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes[0] : '',
    }))
  )

  const addSelectedItemsToCart = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return false
    }

    const selectedProducts = getSelectedProducts()
    if (selectedProducts.length === 0) return false

    setActionError('')

    for (const product of selectedProducts) {
      const payload = {
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes[0] : '',
        quantity: 1,
      }

      const res = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || 'Unable to add outfit items to cart')
      }
    }

    return true
  }

  const handleCartAction = async (target) => {
    try {
      setActionLoading(target)
      const added = await addSelectedItemsToCart()
      if (!added) return
      if (target === 'cart') {
        navigate('/cart')
        return
      }
      navigate('/checkout', { state: { items: getCheckoutItems() } })
    } catch (err) {
      setActionError(err.message || 'Something went wrong while saving your outfit')
    } finally {
      setActionLoading('')
    }
  }

  return (
    <div className="page">
      <Navbar active="home" />

      <style>{`
        .co-wrapper {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 20px 60px;
          background: #f5f5f5;
          min-height: calc(100vh - 60px);
        }
        .co-page-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px 0 20px;
        }
        .co-back-btn {
          background: #fff;
          border: none;
          border-radius: 12px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .co-page-title {
          font-size: 26px;
          font-weight: 700;
          color: #111;
          margin: 0;
        }
        .co-page-sub {
          font-size: 13px;
          color: #888;
          margin-top: 2px;
        }
        .co-layout {
          display: grid;
          grid-template-columns: 320px minmax(0, 1fr);
          gap: 20px;
          align-items: start;
        }
        .co-left,
        .co-right-navbar {
          background: #fff;
          border-radius: 18px;
          padding: 18px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }
        .co-right-navbar {
          max-height: calc(100vh - 120px);
          overflow-y: auto;
          scrollbar-width: auto;
          scrollbar-color: #d6dbe5 transparent;
        }
        .co-right-navbar::-webkit-scrollbar {
          width: 12px;
        }
        .co-right-navbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .co-right-navbar::-webkit-scrollbar-thumb {
          background: #d6dbe5;
          border-radius: 999px;
          border: 3px solid transparent;
          background-clip: padding-box;
        }
        .co-section-label,
        .co-right-filter-title {
          font-size: 11px;
          font-weight: 700;
          color: #bbb;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 12px;
        }
        .co-main-grid,
        .co-extras-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .co-slot {
          background: #fafafa;
          border-radius: 14px;
          border: 1.5px dashed #e0e0e0;
          min-height: 118px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          padding: 12px 8px;
          gap: 5px;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          overflow: hidden;
        }
        .co-slot--empty:hover,
        .co-slot-active {
          border-color: #4A90D9;
          background: #f0f6ff;
          box-shadow: 0 4px 14px rgba(74,144,217,0.1);
        }
        .co-slot--filled {
          border-style: solid;
          border-color: #d0e8ff;
          background: #f8fcff;
          justify-content: flex-start;
          padding: 0;
          gap: 0;
        }
        .co-slot--extra {
          border-color: #f4b8d4;
          background: #fff8fc;
        }
        .co-slot__x {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(0,0,0,0.07);
          border: none;
          cursor: pointer;
          font-size: 11px;
        }
        .co-slot__icon {
          color: #aaa;
          font-size: 15px;
          font-weight: 700;
        }
        .co-slot__label {
          font-size: 11px;
          font-weight: 700;
          color: #777;
          text-align: center;
        }
        .co-slot__plus {
          font-size: 20px;
          color: #ccc;
          line-height: 1;
        }
        .co-slot__img {
          width: 100%;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          display: block;
        }
        .co-slot__filled-name {
          font-size: 10px;
          font-weight: 600;
          color: #222;
          padding: 5px 7px 0;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          box-sizing: border-box;
        }
        .co-slot__remove {
          margin: 4px 7px 7px;
          padding: 4px 8px;
          border-radius: 7px;
          border: 1px solid #eee;
          background: #fff;
          font-size: 10px;
          color: #777;
          cursor: pointer;
        }
        .co-add-extra-btn {
          width: 100%;
          padding: 13px;
          border-radius: 12px;
          border: 1.5px dashed #E91E8C;
          background: #fff0f7;
          color: #E91E8C;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 12px;
          font-family: 'Poppins', sans-serif;
        }
        .co-action-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 14px;
        }
        .co-action-error {
          margin-top: 10px;
          font-size: 12px;
          font-weight: 600;
          color: #dc2626;
        }
        .co-action-btn {
          border: none;
          border-radius: 12px;
          padding: 13px 12px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          transition: transform 0.15s, box-shadow 0.2s, opacity 0.2s;
        }
        .co-action-btn:hover {
          transform: translateY(-1px);
        }
        .co-action-btn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
          transform: none;
        }
        .co-action-btn-cart {
          background: #eef4ff;
          color: #2f5fd1;
          border: 1px solid #d6e3ff;
        }
        .co-action-btn-buy {
          background: #111827;
          color: #fff;
          box-shadow: 0 10px 24px rgba(17, 24, 39, 0.14);
        }
        .co-filter-navbar {
          display: flex;
          gap: 14px;
          flex-wrap: nowrap;
          align-items: center;
        }
        .co-filter-dropdown-wrap {
          position: relative;
          flex: 1 1 0;
          min-width: 0;
        }
        .co-filter-dropdown-wrap select {
          appearance: none;
          -webkit-appearance: none;
          background: #fff;
          border: 1px solid #e6e1da;
          border-radius: 18px;
          padding: 14px 42px 14px 18px;
          font-size: 14px;
          color: #1a1a2e;
          cursor: pointer;
          width: 100%;
          font-family: 'Poppins', sans-serif;
        }
        .co-chevron {
          pointer-events: none;
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 14px;
          height: 14px;
          color: #9c9389;
        }
        .co-products-panel {
          margin-top: 18px;
          border-top: 1px solid #f2eee8;
          padding-top: 18px;
        }
        .co-products-panel-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
        }
        .co-products-title {
          font-size: 17px;
          font-weight: 700;
          color: #111;
        }
        .co-products-sub {
          font-size: 12px;
          color: #888;
          margin-top: 4px;
        }
        .co-modal-sub {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .co-modal-chip {
          font-size: 11px;
          font-weight: 600;
          background: #e8f0fe;
          color: #4A90D9;
          padding: 3px 10px;
          border-radius: 20px;
        }
        .co-modal-search-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          border: 1px solid #eee8df;
          border-radius: 14px;
          background: #fcfbf9;
        }
        .co-modal-search {
          flex: 1;
          border: none;
          outline: none;
          font-size: 14px;
          font-family: 'Poppins', sans-serif;
          background: transparent;
        }
        .co-modal-count {
          padding: 12px 2px 0;
          font-size: 12px;
          color: #888;
          font-weight: 600;
        }
        .co-modal-loading,
        .co-modal-empty {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          font-size: 14px;
          color: #888;
          text-align: center;
        }
        .co-modal-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 12px;
          padding-top: 14px;
        }
        .co-modal-card {
          border-radius: 12px;
          border: 1.5px solid #f0f0f0;
          background: #fafafa;
          cursor: pointer;
          overflow: hidden;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
        }
        .co-modal-card:hover {
          border-color: #4A90D9;
          box-shadow: 0 4px 14px rgba(74,144,217,0.12);
          transform: translateY(-2px);
        }
        .co-modal-card-disabled {
          opacity: 0.88;
        }
        .co-modal-card-disabled:hover {
          border-color: #f0f0f0;
          box-shadow: none;
          transform: none;
        }
        .co-modal-img-wrap {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
        }
        .co-modal-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }
        .co-modal-tag {
          position: absolute;
          top: 6px;
          left: 6px;
          font-size: 9px;
          font-weight: 700;
          color: #fff;
          padding: 2px 7px;
          border-radius: 5px;
          text-transform: uppercase;
        }
        .co-modal-info {
          padding: 8px 10px 10px;
        }
        .co-modal-name {
          font-size: 11px;
          font-weight: 600;
          color: #222;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 3px;
        }
        .co-modal-price {
          font-size: 12px;
          font-weight: 700;
          color: #111;
        }
        .co-modal-rating {
          font-size: 10px;
          color: #F5A623;
          margin-top: 2px;
        }
        .co-pick-hint {
          margin-top: 8px;
          font-size: 10px;
          font-weight: 600;
          color: #999;
        }
        .co-pick-btn {
          margin-top: 8px;
          width: 100%;
          border: none;
          border-radius: 9px;
          padding: 8px 10px;
          background: #4A90D9;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
        }
        @media (max-width: 900px) {
          .co-layout {
            grid-template-columns: 1fr;
          }
          .co-page-title {
            font-size: 20px;
          }
          .co-wrapper {
            padding: 0 14px 80px;
          }
          .co-filter-dropdown-wrap select {
            font-size: 12px;
            padding: 12px 36px 12px 14px;
          }
          .co-modal-grid {
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          }
          .co-modal-img-wrap {
            height: 160px;
          }
          .co-right-navbar {
            max-height: none;
            overflow: visible;
          }
        }
        @media (max-width: 640px) {
          .co-filter-navbar {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>

      <div className="co-wrapper">
        <div className="co-page-header">
          <button className="co-back-btn" onClick={() => navigate(-1)}>
            <svg width="18" height="18" fill="none" stroke="#333" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div>
            <div className="co-page-title">Custom Outfit</div>
            <div className="co-page-sub">
              {department
                ? `Browsing ${department}${category ? ` > ${category}` : ''}${brand ? ` . ${brand}` : ''}`
                : 'Build your perfect look, piece by piece'}
            </div>
          </div>
        </div>

        <div className="co-layout">
          <div className="co-left">
            <div className="co-section-label">Core Pieces</div>

            <div className="co-main-grid">
              {MAIN_SLOTS.map((slot) => (
                <SlotCard
                  key={slot.id}
                  slot={{ ...slot, product: mainSlots[slot.id] }}
                  isActive={!activeIsExtra && activeSlotId === slot.id}
                  isExtra={false}
                  onClick={() => selectSlot(slot.id, false)}
                  onRemove={() => removeMain(slot.id)}
                />
              ))}
            </div>

            {extras.length > 0 && (
              <>
                <div className="co-section-label" style={{ marginTop: 16 }}>Extra Pieces</div>
                <div className="co-extras-grid">
                  {extras.map((extra) => (
                    <SlotCard
                      key={extra.id}
                      slot={{ ...extra, icon: '+' }}
                      isActive={activeIsExtra && activeSlotId === extra.id}
                      isExtra={true}
                      onClick={() => selectSlot(extra.id, true)}
                      onRemove={() => removeExtra(extra.id)}
                      onDeleteExtra={() => removeExtra(extra.id)}
                    />
                  ))}
                </div>
              </>
            )}

            <button className="co-add-extra-btn" onClick={addExtraSlot}>
              + Add Extra Piece
            </button>
            <div className="co-action-row">
              <button
                className="co-action-btn co-action-btn-cart"
                type="button"
                disabled={selectedItemCount === 0}
                onClick={() => handleCartAction('cart')}
              >
                {actionLoading === 'cart' ? 'Adding...' : 'Add To Cart'}
              </button>
              <button
                className="co-action-btn co-action-btn-buy"
                type="button"
                disabled={selectedItemCount === 0}
                onClick={() => handleCartAction('checkout')}
              >
                {actionLoading === 'checkout' ? 'Processing...' : 'Shop Now'}
              </button>
            </div>
            {actionError && <div className="co-action-error">{actionError}</div>}
          </div>

          <div className="co-right-navbar">
            <div className="co-right-filter-title">Filter Products</div>
            <FilterNavbar
              department={department}
              setDepartment={setDepartment}
              brand={brand}
              setBrand={setBrand}
              category={category}
              setCategory={setCategory}
            />
            <InlineProductPicker
              department={department}
              brand={brand}
              category={category}
              activeSlotLabel={activeSlotLabel}
              activeSlotId={activeSlotId}
              outfitGender={outfitGender}
              onSelect={handleProductSelect}
            />
          </div>
        </div>
      </div>

      <footer className="footer">
        SMARTSTYLE 2025. All Rights Reserved.
      </footer>
    </div>
  )
}
