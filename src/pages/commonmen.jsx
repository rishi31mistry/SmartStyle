import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/common.css'
import '../styles/common-pages.css'

function FilterSidebar({ filterOpen, setFilterOpen, clearFilters,
  selectedPrices, setSelectedPrices,
  selectedCategories, setSelectedCategories,
  selectedBrands, setSelectedBrands,
  selectedSizes, setSelectedSizes,
  selectedColors, setSelectedColors,
  selectedRating, setSelectedRating,
}) {
  const priceRanges = ['Under ₹500', '₹500 - ₹1000', '₹1000 - ₹2000', '₹2000 - ₹3000', 'Above ₹3000']
  const categories = ['T-Shirts', 'Shirts', 'Jeans', 'Trousers', 'Kurtas', 'Jackets', 'Hoodies', 'Shorts', 'Suits', 'Ethnic Wear', 'Sportswear']
  const brands = ['Nike', 'Adidas', 'H&M', 'Zara', 'Puma', "Levi's", 'Tommy', 'Arrow', 'U.S. Polo', 'Peter England', 'Van Heusen', 'Raymond']
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const colors = [
    { name: 'Black', hex: '#111' }, { name: 'White', hex: '#f5f5f5' },
    { name: 'Navy', hex: '#1a237e' }, { name: 'Grey', hex: '#9e9e9e' },
    { name: 'Red', hex: '#e53935' }, { name: 'Green', hex: '#2e7d32' },
    { name: 'Brown', hex: '#6d4c41' }, { name: 'Blue', hex: '#1565C0' },
  ]
  const ratings = ['4★ & above', '3★ & above', '2★ & above']

  const toggleArr = (arr, setArr, val) => {
    setArr(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val])
  }

  return (
    <div className={`filter-sidebar ${filterOpen ? 'open' : ''}`}>
      <div className="filter-top">
        <div className="filter-title">🎛️ Filters</div>
        <button className="filter-clear" onClick={clearFilters}>Clear All</button>
      </div>
      <div className="filter-section">
        <div className="filter-section-title">Price Range</div>
        <div className="filter-price-options">
          {priceRanges.map(p => (
            <label key={p} className="filter-checkbox-item">
              <input type="checkbox" checked={selectedPrices.includes(p)}
                onChange={() => toggleArr(selectedPrices, setSelectedPrices, p)} />
              <span className="filter-checkbox-label">{p}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="filter-section">
        <div className="filter-section-title">Category</div>
        <div className="filter-category-options">
          {categories.map(c => (
            <label key={c} className="filter-checkbox-item">
              <input type="checkbox" checked={selectedCategories.includes(c)}
                onChange={() => toggleArr(selectedCategories, setSelectedCategories, c)} />
              <span className="filter-checkbox-label">{c}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="filter-section">
        <div className="filter-section-title">Brand</div>
        <div className="filter-brand-options">
          {brands.map(b => (
            <label key={b} className="filter-checkbox-item">
              <input type="checkbox" checked={selectedBrands.includes(b)}
                onChange={() => toggleArr(selectedBrands, setSelectedBrands, b)} />
              <span className="filter-checkbox-label">{b}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="filter-section">
        <div className="filter-section-title">Size</div>
        <div className="filter-size-options">
          {sizes.map(s => (
            <button key={s}
              className={`filter-size-btn ${selectedSizes.includes(s) ? 'active' : ''}`}
              onClick={() => toggleArr(selectedSizes, setSelectedSizes, s)}
            >{s}</button>
          ))}
        </div>
      </div>
      <div className="filter-section">
        <div className="filter-section-title">Color</div>
        <div className="filter-color-options">
          {colors.map(c => (
            <button key={c.name} title={c.name}
              className={`filter-color-btn ${selectedColors.includes(c.name) ? 'active' : ''}`}
              style={{ background: c.hex, borderColor: selectedColors.includes(c.name) ? '#4A90D9' : 'transparent' }}
              onClick={() => toggleArr(selectedColors, setSelectedColors, c.name)}
            />
          ))}
        </div>
      </div>
      <div className="filter-section">
        <div className="filter-section-title">Rating</div>
        <div className="filter-rating-options">
          {ratings.map(r => (
            <label key={r} className="filter-rating-item">
              <input type="radio" name="rating" checked={selectedRating === r}
                onChange={() => setSelectedRating(r)} />
              <span className="filter-rating-stars">★</span>
              <span className="filter-rating-label">{r}</span>
            </label>
          ))}
        </div>
      </div>
      <button className="filter-apply-btn" onClick={() => setFilterOpen(false)}>
        Apply Filters
      </button>
    </div>
  )
}

export default function CommonMen() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const urlCategory = searchParams.get('category')

  const [wishlist, setWishlist] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState('popular')
  const [selectedPrices, setSelectedPrices] = useState([])
  const [selectedCategories, setSelectedCategories] = useState(
    urlCategory ? [decodeURIComponent(urlCategory)] : []
  )
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedRating, setSelectedRating] = useState(null)

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  const clearFilters = () => {
    setSelectedPrices([])
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedSizes([])
    setSelectedColors([])
    setSelectedRating(null)
  }

  const products = [
  { id: 1,  name: 'Oversized Hoodie',      price: '₹1,299',               rating: 4.5, tag: 'New',      category: 'Hoodies',     brand: 'Nike',        size: ['S','M','L','XL'],        color: 'Black', img: '/image/men/oversized/d1.jpg' },
  { id: 2,  name: 'Slim Fit Chinos',       price: '₹1,199',               rating: 4.3, tag: 'Popular',  category: 'Jeans',       brand: "Levi's",      size: ['M','L','XL'],            color: 'Brown', img: '/image/men/jeans/p3.jpg'     },
  { id: 3,  name: 'Linen Co-ord Set',      price: '₹1,899',               rating: 4.6, tag: 'Trending', category: 'Ethnic Wear', brand: 'Mango',       size: ['S','M','L'],             color: 'White', img: '/image/men/full/d1.jpg'      },
  { id: 4,  name: 'Cargo Pants',           price: '₹1,499',               rating: 4.4, tag: 'Hot',      category: 'Trousers',    brand: 'H&M',         size: ['M','L','XL','XXL'],      color: 'Grey',  img: '/image/men/trouser/d1.jpg'   },
  { id: 5,  name: 'Classic Polo Tee',      price: '₹899',                 rating: 4.2, tag: 'New',      category: 'T-Shirts',    brand: 'U.S. Polo',   size: ['XS','S','M','L'],        color: 'Navy',  img: '/image/men/t-shirt/t2.jpg'   },
  { id: 6,  name: 'Formal Blazer',         price: '₹3,499',               rating: 4.7, tag: 'Popular',  category: 'Suits',       brand: 'Raymond',     size: ['M','L','XL'],            color: 'Black', img: '/image/men/suit/d1.jpg'      },
  { id: 7,  name: 'Printed Shirt',         price: '₹799',                 rating: 4.1, tag: 'New',      category: 'Shirts',      brand: 'H&M',         size: ['S','M','L','XL'],        color: 'Blue',  img: '/image/men/shirt/s2.jpg'     },
  { id: 8,  name: 'Denim Jacket',          price: '₹2,199',               rating: 4.5, tag: 'Trending', category: 'Jackets',     brand: "Levi's",      size: ['S','M','L'],             color: 'Blue',  img: '/image/men/jacket/d2.jpg'    },
  { id: 9,  name: 'Ethnic Kurta',          price: '₹1,299',               rating: 4.6, tag: 'Hot',      category: 'Kurtas',      brand: 'Zara',        size: ['S','M','L','XL'],        color: 'White', img: '/image/men/kurta/d3.jpg'    },
  { id: 10, name: 'Sports Tshirt',         price: '₹699',                 rating: 4.3, tag: 'New',      category: 'Sportswear',  brand: 'Nike',        size: ['XS','S','M','L','XL'],   color: 'Red',   img: '/image/men/sport/d5.jpg'     },
  { id: 11, name: 'Linen Shirt',           price: '₹999',                 rating: 4.4, tag: 'Popular',  category: 'Shirts',      brand: 'Arrow',       size: ['S','M','L'],             color: 'White', img: '/image/men/shirt/s3.jpg'     },
  { id: 12, name: 'Track Suit',            price: '₹1,699',               rating: 4.2, tag: 'Trending', category: 'Sportswear',  brand: 'Adidas',      size: ['S','M','L','XL','XXL'],  color: 'Black', img: '/image/men/sport/d4.jpg'     },
  { id: 13, name: 'Casual Shorts',         price: '₹699',                 rating: 4.1, tag: 'New',      category: 'Shorts',      brand: 'Puma',        size: ['S','M','L','XL'],        color: 'Grey',  img: '/image/men/short/d1.jpg'     },
  { id: 14, name: 'Nehru Jacket',          price: '₹2,199',               rating: 4.5, tag: 'Hot',      category: 'Jackets',     brand: 'Raymond',     size: ['M','L','XL'],            color: 'Navy',  img: '/image/men/jacket/d7.jpg'    },
  { id: 15, name: 'Slim Jeans',            price: '₹1,499',               rating: 4.4, tag: 'Popular',  category: 'Jeans',       brand: "Levi's",      size: ['S','M','L','XL'],        color: 'Blue',  img: '/image/men/jeans/p5.jpg'     },
  { id: 16, name: 'Striped Shirt',         price: '₹1,099',               rating: 4.3, tag: 'New',      category: 'Shirts',      brand: 'Van Heusen',  size: ['S','M','L','XL'],        color: 'White', img: '/image/men/shirt/s2.jpg'     },
  { id: 17, name: 'Basic Cotton Tee',      price: '₹299',  originalPrice: '₹599',  rating: 4.1, tag: 'Sale',     category: 'T-Shirts',    brand: 'Non Brand',   size: ['XS','S','M','L','XL'],   color: 'White', img: '/image/men/t-shirt/t2.jpg'   },
  { id: 18, name: 'Casual Shorts',         price: '₹399',  originalPrice: '₹799',  rating: 4.0, tag: 'Sale',     category: 'Shorts',      brand: 'Non Brand',   size: ['S','M','L','XL'],        color: 'Grey',  img: '/image/men/short/d2.jpg'     },
  { id: 19, name: 'Track Pants',           price: '₹449',  originalPrice: '₹899',  rating: 4.2, tag: 'Sale',     category: 'Trousers',    brand: 'Non Brand',   size: ['S','M','L','XL','XXL'],  color: 'Black', img: '/image/men/trouser/d2.jpg'   },
  { id: 20, name: 'Printed T-Shirt',       price: '₹349',  originalPrice: '₹699',  rating: 4.1, tag: 'Sale',     category: 'T-Shirts',    brand: 'Non Brand',   size: ['XS','S','M','L'],        color: 'Blue',  img: '/image/men/t-shirt/t4.jpg'   },
  { id: 21, name: 'Polo T-Shirt',          price: '₹499',  originalPrice: '₹999',  rating: 4.3, tag: 'Sale',     category: 'T-Shirts',    brand: 'Non Brand',   size: ['S','M','L','XL'],        color: 'Navy',  img: '/image/men/t-shirt/t5.jpg'   },
  { id: 22, name: 'Linen Shirt',           price: '₹599',  originalPrice: '₹1,199',rating: 4.2, tag: 'Sale',     category: 'Shirts',      brand: 'Non Brand',   size: ['S','M','L'],             color: 'White', img: '/image/men/shirt/s4.jpg'     },
  { id: 23, name: 'Jogger Pants',          price: '₹479',  originalPrice: '₹949',  rating: 4.0, tag: 'Sale',     category: 'Trousers',    brand: 'Non Brand',   size: ['S','M','L','XL'],        color: 'Grey',  img: '/image/men/trouser/d3.jpg'   },
  { id: 24, name: 'Casual Kurta',          price: '₹549',  originalPrice: '₹1,099',rating: 4.4, tag: 'Sale',     category: 'Kurtas',      brand: 'Non Brand',   size: ['S','M','L','XL'],        color: 'White', img: '/image/men/kurta/d2.jpg'     },
  { id: 25, name: 'Classic Polo T-Shirt',  price: '₹899',                 rating: 4.2, tag: 'New',      category: 'T-Shirts',    brand: 'Non Brand',   size: ['XS','S','M','L'],        color: 'Navy',  img: '/image/men/t-shirt/t6.jpg'   },
  { id: 26, name: 'Slim Fit Chinos',       price: '₹1,299',               rating: 4.5, tag: 'New',      category: 'Trousers',    brand: 'Non Brand',   size: ['M','L','XL'],            color: 'Brown', img: '/image/men/jeans/p2.jpg'     },
  { id: 27, name: 'Casual Denim Jacket',   price: '₹2,199',               rating: 4.3, tag: 'New',      category: 'Jackets',     brand: 'Non Brand',   size: ['S','M','L'],             color: 'Blue',  img: '/image/men/jacket/d2.jpg'    },
  { id: 28, name: 'Formal Blazer',         price: '₹3,499',               rating: 4.7, tag: 'New',      category: 'Suits',       brand: 'Non Brand',   size: ['M','L','XL'],            color: 'Black', img: '/image/men/suit/d3.jpg'      },
  { id: 29, name: 'Graphic Print Hoodie',  price: '₹1,199',               rating: 4.1, tag: 'New',      category: 'Hoodies',     brand: 'Non Brand',   size: ['S','M','L','XL'],        color: 'Black', img: '/image/men/hoodies/d3.jpg'   },
  { id: 30, name: 'Linen Kurta',           price: '₹999',                 rating: 4.4, tag: 'New',      category: 'Kurtas',      brand: 'Non Brand',   size: ['S','M','L','XL'],        color: 'White', img: '/image/men/kurta/d3.jpg'     },
  { id: 31, name: 'Jogger Pants',          price: '₹799',                 rating: 4.0, tag: 'New',      category: 'Trousers',    brand: 'Non Brand',   size: ['S','M','L','XL'],        color: 'Black', img: '/image/men/trouser/d4.jpg'   },
  { id: 32, name: 'Striped Shirt',         price: '₹1,099',               rating: 4.3, tag: 'New',      category: 'Shirts',      brand: 'Non Brand',   size: ['S','M','L','XL'],        color: 'White', img: '/image/men/shirt/s5.jpg'     },
  { id: 33, name: 'Oversized Tee',         price: '₹699',                 rating: 4.5, tag: 'Trending', category: 'T-Shirts',    brand: 'Non Brand',   size: ['S','M','L','XL'],        color: 'White', img: '/image/men/oversized/d2.jpg' },
  { id: 34, name: 'Cargo Pants',           price: '₹1,499',               rating: 4.4, tag: 'Hot',      category: 'Trousers',    brand: 'Non Brand',   size: ['M','L','XL','XXL'],      color: 'Grey',  img: '/image/men/trouser/d5.jpg'   },
  { id: 35, name: 'Bomber Jacket',         price: '₹2,799',               rating: 4.6, tag: 'New',      category: 'Jackets',     brand: 'Non Brand',   size: ['S','M','L','XL'],        color: 'Black', img: '/image/men/jacket/d3.jpg'    },
  { id: 36, name: 'Ethnic Kurta Set',      price: '₹1,899',               rating: 4.7, tag: 'Popular',  category: 'Kurtas',      brand: 'Non Brand',   size: ['S','M','L'],             color: 'White', img: '/image/men/kurta/d4.jpg'     },
  { id: 37, name: 'Denim Shirt',           price: '₹1,199',               rating: 4.3, tag: 'Trending', category: 'Shirts',      brand: 'Non Brand',   size: ['S','M','L','XL'],        color: 'Blue',  img: '/image/men/shirt/s6.jpg'     },
  { id: 38, name: 'Track Suit',            price: '₹1,699',               rating: 4.2, tag: 'Hot',      category: 'Sportswear',  brand: 'Non Brand',   size: ['S','M','L','XL','XXL'],  color: 'Black', img: '/image/men/sport/d6.jpg'     },
  { id: 39, name: 'Nehru Jacket',          price: '₹2,199',               rating: 4.5, tag: 'New',      category: 'Jackets',     brand: 'Non Brand',   size: ['M','L','XL'],            color: 'Navy',  img: '/image/men/jacket/d4.jpg'    },
  { id: 40, name: 'Printed Shirt',         price: '₹999',                 rating: 4.1, tag: 'Popular',  category: 'Shirts',      brand: 'Non Brand',   size: ['S','M','L','XL'],        color: 'Blue',  img: '/image/men/shirt/s7.jpg'     },
  { id: 41, name: 'Smart Casual Outfit',   price: '₹1,599',               rating: 4.4, tag: 'Popular',  category: 'Ethnic Wear', brand: 'Non Brand',   size: ['S','M','L','XL'],        color: 'Navy',  img: '/image/men/full/d3.jpg'      },
  { id: 42, name: 'Summer Linen Set',      price: '₹1,299',               rating: 4.3, tag: 'Trending', category: 'Ethnic Wear', brand: 'Non Brand',   size: ['S','M','L'],             color: 'White', img: '/image/men/full/d4.jpg'      },
  { id: 43, name: 'Party Wear Blazer',     price: '₹3,199',               rating: 4.6, tag: 'Hot',      category: 'Suits',       brand: 'Non Brand',   size: ['M','L','XL'],            color: 'Black', img: '/image/men/suit/d5.jpg'      },
  { id: 44, name: 'Festive Kurta',         price: '₹1,799',               rating: 4.5, tag: 'Popular',  category: 'Kurtas',      brand: 'Non Brand',   size: ['S','M','L','XL'],        color: 'White', img: '/image/men/kurta/d5.jpg'     },
  { id: 45, name: 'Workout Set',           price: '₹1,099',               rating: 4.2, tag: 'New',      category: 'Sportswear',  brand: 'Non Brand',   size: ['S','M','L','XL','XXL'],  color: 'Black', img: '/image/men/sport/d3.jpg'     },
  { id: 46, name: 'Office Formals',        price: '₹2,499',               rating: 4.6, tag: 'Popular',  category: 'Suits',       brand: 'Non Brand',   size: ['M','L','XL'],            color: 'Navy',  img: '/image/men/suit/d6.jpg'      },
  { id: 47, name: 'Weekend Casuals',       price: '₹899',                 rating: 4.1, tag: 'New',      category: 'Shirts', brand: 'Non Brand',   size: ['S','M','L','XL'],        color: 'Grey',  img: '/image/men/full/d6.jpg'      },
  { id: 48, name: 'Winter Jacket',         price: '₹2,999',               rating: 4.5, tag: 'Hot',      category: 'Jackets',     brand: 'Non Brand',   size: ['S','M','L','XL'],        color: 'Black', img: '/image/men/jacket/d5.jpg'    },
 
  // Nike T-Shirts

  { id: 49,  name: 'Nike Dri-FIT Tee',           price: '₹1,299', originalPrice: '₹1,999', rating: 4.5, tag: 'Bestseller', category: 'T-Shirts',  brand: 'Nike', size: ['XS','S','M','L','XL'],  color: 'Black', img: '/image/men/brand/nike/t1.jpg' },
  { id: 50,  name: 'Nike Sportswear Club Tee',    price: '₹999',   originalPrice: '₹1,599', rating: 4.3, tag: 'Sale',       category: 'T-Shirts',  brand: 'Nike', size: ['XS','S','M','L','XL'],  color: 'White', img: '/image/men/brand/nike/t2.jpg' },
  { id: 51,  name: 'Nike Air Graphic Tee',        price: '₹1,499', originalPrice: '₹2,199', rating: 4.6, tag: 'New',        category: 'T-Shirts',  brand: 'Nike', size: ['S','M','L','XL'],       color: 'Grey',  img: '/image/men/brand/nike/t3.jpg' },
  { id: 52,  name: 'Nike Pro Slim Tee',           price: '₹1,199', originalPrice: '₹1,799', rating: 4.4, tag: null,         category: 'T-Shirts',  brand: 'Nike', size: ['S','M','L','XL'],       color: 'Navy',  img: '/image/men/brand/nike/t4.jpg' },
  { id: 53,  name: 'Nike Futura Icon Tee',        price: '₹1,099', originalPrice: '₹1,699', rating: 4.2, tag: 'Trending',   category: 'T-Shirts',  brand: 'Nike', size: ['XS','S','M','L'],       color: 'Red',   img: '/image/men/brand/nike/t5.jpg' },
  { id: 54,  name: 'Nike Just Do It Tee',         price: '₹1,349', originalPrice: '₹1,999', rating: 4.7, tag: 'Popular',    category: 'T-Shirts',  brand: 'Nike', size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/nike/t6.jpg' },
  { id: 55,  name: 'Nike Performance Tee',        price: '₹1,599', originalPrice: '₹2,399', rating: 4.5, tag: null,         category: 'T-Shirts',  brand: 'Nike', size: ['S','M','L','XL','XXL'], color: 'Blue',  img: '/image/men/brand/nike/t7.jpg' },
  { id: 56,  name: 'Nike Classic Logo Tee',       price: '₹899',   originalPrice: '₹1,499', rating: 4.1, tag: 'Sale',       category: 'T-Shirts',  brand: 'Nike', size: ['XS','S','M','L'],       color: 'White', img: '/image/men/brand/nike/t8.jpg' },

  { id: 57,  name: 'Nike Woven Short',            price: '₹2,499', originalPrice: '₹3,499', rating: 4.5, tag: 'New',        category: 'Shorts',    brand: 'Nike', size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/nike/s1.jpg' },
  { id: 58,  name: 'Nike Button-Up Short',        price: '₹1,999', originalPrice: '₹2,999', rating: 4.3, tag: null,         category: 'Shorts',    brand: 'Nike', size: ['S','M','L','XL'],       color: 'Grey',  img: '/image/men/brand/nike/s2.jpg' },
  { id: 59,  name: 'Nike SB Flannel Short',       price: '₹2,799', originalPrice: '₹3,999', rating: 4.6, tag: 'Trending',   category: 'Shorts',    brand: 'Nike', size: ['S','M','L','XL'],       color: 'Navy',  img: '/image/men/brand/nike/s3.jpg' },
  { id: 60,  name: 'Nike NSW Oxford Short',       price: '₹2,199', originalPrice: '₹3,199', rating: 4.4, tag: 'Bestseller', category: 'Shorts',    brand: 'Nike', size: ['S','M','L','XL'],       color: 'White', img: '/image/men/brand/nike/s4.jpg' },
  { id: 61,  name: 'Nike ACG Short',              price: '₹3,199', originalPrice: '₹4,499', rating: 4.7, tag: 'Popular',    category: 'Shorts',    brand: 'Nike', size: ['S','M','L','XL','XXL'], color: 'Black', img: '/image/men/brand/nike/s5.jpg' },
  { id: 62,  name: 'Nike Tech Pack Short',        price: '₹2,999', originalPrice: '₹4,199', rating: 4.5, tag: 'New',        category: 'Shorts',    brand: 'Nike', size: ['M','L','XL'],           color: 'Grey',  img: '/image/men/brand/nike/s6.jpg' },
  { id: 63,  name: 'Nike Sportswear Short',       price: '₹1,799', originalPrice: '₹2,599', rating: 4.2, tag: 'Sale',       category: 'Shorts',    brand: 'Nike', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/nike/s7.jpg' },
  { id: 64,  name: 'Nike Club Casual Short',      price: '₹1,599', originalPrice: '₹2,299', rating: 4.3, tag: null,         category: 'Shorts',    brand: 'Nike', size: ['S','M','L'],            color: 'White', img: '/image/men/brand/nike/s8.jpg' },

  { id: 65,  name: 'Nike Denim Jogger',           price: '₹2,999', originalPrice: '₹4,199', rating: 4.4, tag: 'New',        category: 'Jeans',     brand: 'Nike', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/nike/p1.jpg' },
  { id: 66,  name: 'Nike SB Skateboard Jeans',    price: '₹3,499', originalPrice: '₹4,999', rating: 4.6, tag: 'Popular',    category: 'Jeans',     brand: 'Nike', size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/nike/p2.jpg' },
  { id: 67,  name: 'Nike Slim Fit Denim',         price: '₹2,699', originalPrice: '₹3,999', rating: 4.3, tag: 'Trending',   category: 'Jeans',     brand: 'Nike', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/nike/p3.jpg' },
  { id: 68,  name: 'Nike NSW Denim Pants',        price: '₹3,199', originalPrice: '₹4,599', rating: 4.5, tag: 'Bestseller', category: 'Jeans',     brand: 'Nike', size: ['M','L','XL'],           color: 'Grey',  img: '/image/men/brand/nike/p4.jpg' },
  { id: 69,  name: 'Nike ACG Trail Denim',        price: '₹3,999', originalPrice: '₹5,499', rating: 4.7, tag: 'New',        category: 'Jeans',     brand: 'Nike', size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/nike/p5.jpg' },
  { id: 70,  name: 'Nike Tech Denim',             price: '₹2,499', originalPrice: '₹3,699', rating: 4.2, tag: 'Sale',       category: 'Jeans',     brand: 'Nike', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/nike/p6.jpg' },
  { id: 71,  name: 'Nike Cargo Denim',            price: '₹3,299', originalPrice: '₹4,799', rating: 4.4, tag: null,         category: 'Jeans',     brand: 'Nike', size: ['S','M','L','XL','XXL'], color: 'Grey',  img: '/image/men/brand/nike/p7.jpg' },
  { id: 72,  name: 'Nike Classic Straight Jeans', price: '₹2,199', originalPrice: '₹3,199', rating: 4.1, tag: 'Sale',       category: 'Jeans',     brand: 'Nike', size: ['S','M','L'],            color: 'Blue',  img: '/image/men/brand/nike/p8.jpg' },

  // Adidas T-Shirts

  { id: 73,  name: 'Adidas Essentials Tee',    price: '₹1,199', originalPrice: '₹1,799', rating: 4.5, tag: 'Bestseller', category: 'T-Shirts', brand: 'Adidas', size: ['XS','S','M','L','XL'],  color: 'Black', img: '/image/men/brand/adidas/t1.jpg' },
  { id: 74,  name: 'Adidas Trefoil Tee',        price: '₹999',   originalPrice: '₹1,599', rating: 4.3, tag: 'Sale',       category: 'T-Shirts', brand: 'Adidas', size: ['XS','S','M','L','XL'],  color: 'White', img: '/image/men/brand/adidas/t2.jpg' },
  { id: 75,  name: 'Adidas 3-Stripes Tee',      price: '₹1,299', originalPrice: '₹1,999', rating: 4.6, tag: 'New',        category: 'T-Shirts', brand: 'Adidas', size: ['S','M','L','XL'],       color: 'Navy',  img: '/image/men/brand/adidas/t3.jpg' },
  { id: 76,  name: 'Adidas Sport Tee',           price: '₹1,099', originalPrice: '₹1,699', rating: 4.4, tag: null,         category: 'T-Shirts', brand: 'Adidas', size: ['S','M','L','XL'],       color: 'Grey',  img: '/image/men/brand/adidas/t4.jpg' },
  { id: 77,  name: 'Adidas Originals Tee',       price: '₹1,149', originalPrice: '₹1,799', rating: 4.2, tag: 'Trending',   category: 'T-Shirts', brand: 'Adidas', size: ['XS','S','M','L'],       color: 'White', img: '/image/men/brand/adidas/t5.jpg' },
  { id: 78,  name: 'Adidas Run It Tee',          price: '₹1,249', originalPrice: '₹1,899', rating: 4.7, tag: 'Popular',    category: 'T-Shirts', brand: 'Adidas', size: ['S','M','L','XL'],       color: 'Red',   img: '/image/men/brand/adidas/t6.jpg' },
  { id: 79,  name: 'Adidas Clima Tee',           price: '₹1,399', originalPrice: '₹2,099', rating: 4.5, tag: null,         category: 'T-Shirts', brand: 'Adidas', size: ['S','M','L','XL','XXL'], color: 'Black', img: '/image/men/brand/adidas/t7.jpg' },
  { id: 80,  name: 'Adidas Classic Logo Tee',    price: '₹849',   originalPrice: '₹1,399', rating: 4.1, tag: 'Sale',       category: 'T-Shirts', brand: 'Adidas', size: ['XS','S','M','L'],       color: 'Blue',  img: '/image/men/brand/adidas/t8.jpg' },

  { id: 81,  name: 'Adidas Woven Shirt',         price: '₹2,299', originalPrice: '₹3,299', rating: 4.5, tag: 'New',        category: 'Shorts',   brand: 'Adidas', size: ['S','M','L','XL'],       color: 'White', img: '/image/men/brand/adidas/s1.jpg' },
  { id: 82,  name: 'Adidas Button-Up Shirt',     price: '₹1,899', originalPrice: '₹2,799', rating: 4.3, tag: null,         category: 'Shorts',   brand: 'Adidas', size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/adidas/s2.jpg' },
  { id: 83,  name: 'Adidas Originals Shirt',     price: '₹2,599', originalPrice: '₹3,799', rating: 4.6, tag: 'Trending',   category: 'Shorts',   brand: 'Adidas', size: ['S','M','L','XL'],       color: 'Navy',  img: '/image/men/brand/adidas/s3.jpg' },
  { id: 84,  name: 'Adidas Sport Shirt',         price: '₹1,999', originalPrice: '₹2,999', rating: 4.4, tag: 'Bestseller', category: 'Shorts',   brand: 'Adidas', size: ['S','M','L','XL'],       color: 'Grey',  img: '/image/men/brand/adidas/s4.jpg' },
  { id: 85,  name: 'Adidas Training Shirt',      price: '₹2,899', originalPrice: '₹4,199', rating: 4.7, tag: 'Popular',    category: 'Shorts',   brand: 'Adidas', size: ['S','M','L','XL','XXL'], color: 'Black', img: '/image/men/brand/adidas/s5.jpg' },
  { id: 86,  name: 'Adidas Tech Shirt',          price: '₹2,799', originalPrice: '₹3,999', rating: 4.5, tag: 'New',        category: 'Shorts',   brand: 'Adidas', size: ['M','L','XL'],           color: 'Blue',  img: '/image/men/brand/adidas/s6.jpg' },
  { id: 87,  name: 'Adidas Club Shirt',          price: '₹1,699', originalPrice: '₹2,499', rating: 4.2, tag: 'Sale',       category: 'Shorts',   brand: 'Adidas', size: ['S','M','L','XL'],       color: 'White', img: '/image/men/brand/adidas/s7.jpg' },
  { id: 88,  name: 'Adidas Casual Shirt',        price: '₹1,499', originalPrice: '₹2,199', rating: 4.3, tag: null,         category: 'Shorts',   brand: 'Adidas', size: ['S','M','L'],            color: 'Grey',  img: '/image/men/brand/adidas/s8.jpg' },

  { id: 89,  name: 'Adidas Denim Jogger',        price: '₹2,799', originalPrice: '₹3,999', rating: 4.4, tag: 'New',        category: 'Jeans',    brand: 'Adidas', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/adidas/p1.jpg' },
  { id: 90,  name: 'Adidas Originals Jeans',     price: '₹3,299', originalPrice: '₹4,699', rating: 4.6, tag: 'Popular',    category: 'Jeans',    brand: 'Adidas', size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/adidas/p2.jpg' },
  { id: 91,  name: 'Adidas Slim Fit Denim',      price: '₹2,499', originalPrice: '₹3,699', rating: 4.3, tag: 'Trending',   category: 'Jeans',    brand: 'Adidas', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/adidas/p3.jpg' },
  { id: 92,  name: 'Adidas Sport Denim',         price: '₹2,999', originalPrice: '₹4,299', rating: 4.5, tag: 'Bestseller', category: 'Jeans',    brand: 'Adidas', size: ['M','L','XL'],           color: 'Grey',  img: '/image/men/brand/adidas/p4.jpg' },
  { id: 93,  name: 'Adidas Street Denim',        price: '₹3,699', originalPrice: '₹5,199', rating: 4.7, tag: 'New',        category: 'Jeans',    brand: 'Adidas', size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/adidas/p5.jpg' },
  { id: 94,  name: 'Adidas Classic Denim',       price: '₹2,299', originalPrice: '₹3,399', rating: 4.2, tag: 'Sale',       category: 'Jeans',    brand: 'Adidas', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/adidas/p6.jpg' },
  { id: 95,  name: 'Adidas Cargo Denim',         price: '₹3,099', originalPrice: '₹4,499', rating: 4.4, tag: null,         category: 'Jeans',    brand: 'Adidas', size: ['S','M','L','XL','XXL'], color: 'Grey',  img: '/image/men/brand/adidas/p7.jpg' },
  { id: 96,  name: 'Adidas Straight Jeans',      price: '₹1,999', originalPrice: '₹2,999', rating: 4.1, tag: 'Sale',       category: 'Jeans',    brand: 'Adidas', size: ['S','M','L'],            color: 'Blue',  img: '/image/men/brand/adidas/p8.jpg' },  
  
  // H&M T-Shirts

  { id: 97,  name: 'H&M Slim Fit Tee',       price: '₹599',   originalPrice: '₹999',   rating: 4.3, tag: 'Bestseller', category: 'T-Shirts', brand: 'H&M', size: ['XS','S','M','L','XL'],  color: 'Black', img: '/image/men/brand/h&m/t1.jpg' },
  { id: 98,  name: 'H&M Basic Cotton Tee',   price: '₹499',   originalPrice: '₹899',   rating: 4.2, tag: 'Sale',       category: 'T-Shirts', brand: 'H&M', size: ['XS','S','M','L','XL'],  color: 'White', img: '/image/men/brand/h&m/t2.jpg' },
  { id: 99,  name: 'H&M Graphic Print Tee',  price: '₹699',   originalPrice: '₹1,199', rating: 4.5, tag: 'New',        category: 'T-Shirts', brand: 'H&M', size: ['S','M','L','XL'],       color: 'Grey',  img: '/image/men/brand/h&m/t3.jpg' },
  { id: 100, name: 'H&M Relaxed Fit Tee',    price: '₹649',   originalPrice: '₹1,099', rating: 4.4, tag: null,         category: 'T-Shirts', brand: 'H&M', size: ['S','M','L','XL'],       color: 'Navy',  img: '/image/men/brand/h&m/t4.jpg' },
  { id: 101, name: 'H&M Polo Shirt Tee',     price: '₹749',   originalPrice: '₹1,299', rating: 4.3, tag: 'Trending',   category: 'T-Shirts', brand: 'H&M', size: ['XS','S','M','L'],       color: 'White', img: '/image/men/brand/h&m/t5.jpg' },
  { id: 102, name: 'H&M Oversized Tee',      price: '₹799',   originalPrice: '₹1,399', rating: 4.6, tag: 'Popular',    category: 'T-Shirts', brand: 'H&M', size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/h&m/t6.jpg' },
  { id: 103, name: 'H&M Striped Tee',        price: '₹679',   originalPrice: '₹1,149', rating: 4.2, tag: null,         category: 'T-Shirts', brand: 'H&M', size: ['S','M','L','XL','XXL'], color: 'Blue',  img: '/image/men/brand/h&m/t7.jpg' },
  { id: 104, name: 'H&M V-Neck Tee',         price: '₹549',   originalPrice: '₹949',   rating: 4.1, tag: 'Sale',       category: 'T-Shirts', brand: 'H&M', size: ['XS','S','M','L'],       color: 'Grey',  img: '/image/men/brand/h&m/t8.jpg' },

  { id: 105, name: 'H&M Oxford Shirt',       price: '₹1,299', originalPrice: '₹2,099', rating: 4.5, tag: 'New',        category: 'Shirts',   brand: 'H&M', size: ['S','M','L','XL'],       color: 'White', img: '/image/men/brand/h&m/s1.jpg' },
  { id: 106, name: 'H&M Linen Shirt',        price: '₹1,099', originalPrice: '₹1,799', rating: 4.4, tag: null,         category: 'Shirts',   brand: 'H&M', size: ['S','M','L','XL'],       color: 'White', img: '/image/men/brand/h&m/s2.jpg' },
  { id: 107, name: 'H&M Flannel Shirt',      price: '₹1,399', originalPrice: '₹2,299', rating: 4.6, tag: 'Trending',   category: 'Shirts',   brand: 'H&M', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/h&m/s3.jpg' },
  { id: 108, name: 'H&M Regular Fit Shirt',  price: '₹999',   originalPrice: '₹1,699', rating: 4.3, tag: 'Bestseller', category: 'Shirts',   brand: 'H&M', size: ['S','M','L','XL'],       color: 'Grey',  img: '/image/men/brand/h&m/s4.jpg' },
  { id: 109, name: 'H&M Slim Fit Shirt',     price: '₹1,199', originalPrice: '₹1,999', rating: 4.5, tag: 'Popular',    category: 'Shirts',   brand: 'H&M', size: ['S','M','L','XL','XXL'], color: 'Navy',  img: '/image/men/brand/h&m/s5.jpg' },
  { id: 110, name: 'H&M Denim Shirt',        price: '₹1,499', originalPrice: '₹2,499', rating: 4.4, tag: 'New',        category: 'Shirts',   brand: 'H&M', size: ['M','L','XL'],           color: 'Blue',  img: '/image/men/brand/h&m/s6.jpg' },
  { id: 111, name: 'H&M Casual Shirt',       price: '₹899',   originalPrice: '₹1,499', rating: 4.2, tag: 'Sale',       category: 'Shirts',   brand: 'H&M', size: ['S','M','L','XL'],       color: 'White', img: '/image/men/brand/h&m/s7.jpg' },
  { id: 112, name: 'H&M Printed Shirt',      price: '₹1,149', originalPrice: '₹1,899', rating: 4.3, tag: null,         category: 'Shirts',   brand: 'H&M', size: ['S','M','L'],            color: 'Blue',  img: '/image/men/brand/h&m/s8.jpg' },

  { id: 113, name: 'H&M Slim Jeans',         price: '₹1,799', originalPrice: '₹2,999', rating: 4.4, tag: 'New',        category: 'Jeans',    brand: 'H&M', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/h&m/p1.jpg' },
  { id: 114, name: 'H&M Skinny Jeans',       price: '₹1,999', originalPrice: '₹3,299', rating: 4.5, tag: 'Popular',    category: 'Jeans',    brand: 'H&M', size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/h&m/p2.jpg' },
  { id: 115, name: 'H&M Straight Jeans',     price: '₹1,699', originalPrice: '₹2,799', rating: 4.3, tag: 'Trending',   category: 'Jeans',    brand: 'H&M', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/h&m/p3.jpg' },
  { id: 116, name: 'H&M Relaxed Jeans',      price: '₹1,899', originalPrice: '₹3,099', rating: 4.6, tag: 'Bestseller', category: 'Jeans',    brand: 'H&M', size: ['M','L','XL'],           color: 'Grey',  img: '/image/men/brand/h&m/p4.jpg' },
  { id: 117, name: 'H&M Tapered Jeans',      price: '₹2,199', originalPrice: '₹3,599', rating: 4.7, tag: 'New',        category: 'Jeans',    brand: 'H&M', size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/h&m/p5.jpg' },
  { id: 118, name: 'H&M Ripped Jeans',       price: '₹1,599', originalPrice: '₹2,699', rating: 4.2, tag: 'Sale',       category: 'Jeans',    brand: 'H&M', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/h&m/p6.jpg' },
  { id: 119, name: 'H&M Cargo Jeans',        price: '₹2,099', originalPrice: '₹3,499', rating: 4.4, tag: null,         category: 'Jeans',    brand: 'H&M', size: ['S','M','L','XL','XXL'], color: 'Grey',  img: '/image/men/brand/h&m/p7.jpg' },
  { id: 120, name: 'H&M Classic Jeans',      price: '₹1,499', originalPrice: '₹2,499', rating: 4.1, tag: 'Sale',       category: 'Jeans',    brand: 'H&M', size: ['S','M','L'],            color: 'Blue',  img: '/image/men/brand/h&m/p8.jpg' },

  // Puma T-Shirts

  { id: 121, name: 'Puma ESS Logo Tee',    price: '₹799',   originalPrice: '₹1,299', rating: 4.4, tag: 'Bestseller', category: 'T-Shirts', brand: 'Puma', size: ['XS','S','M','L','XL'],  color: 'Black', img: '/image/men/brand/puma/t1.jpg' },
  { id: 122, name: 'Puma Active Tee',      price: '₹699',   originalPrice: '₹1,199', rating: 4.2, tag: 'Sale',       category: 'T-Shirts', brand: 'Puma', size: ['XS','S','M','L','XL'],  color: 'White', img: '/image/men/brand/puma/t2.jpg' },
  { id: 123, name: 'Puma Graphic Tee',     price: '₹899',   originalPrice: '₹1,499', rating: 4.5, tag: 'New',        category: 'T-Shirts', brand: 'Puma', size: ['S','M','L','XL'],       color: 'Grey',  img: '/image/men/brand/puma/t3.jpg' },
  { id: 124, name: 'Puma Run Fav Tee',     price: '₹849',   originalPrice: '₹1,399', rating: 4.3, tag: null,         category: 'T-Shirts', brand: 'Puma', size: ['S','M','L','XL'],       color: 'Navy',  img: '/image/men/brand/puma/t4.jpg' },
  { id: 125, name: 'Puma Cat Logo Tee',    price: '₹749',   originalPrice: '₹1,249', rating: 4.3, tag: 'Trending',   category: 'T-Shirts', brand: 'Puma', size: ['XS','S','M','L'],       color: 'Red',   img: '/image/men/brand/puma/t5.jpg' },
  { id: 126, name: 'Puma Classics Tee',    price: '₹949',   originalPrice: '₹1,599', rating: 4.6, tag: 'Popular',    category: 'T-Shirts', brand: 'Puma', size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/puma/t6.jpg' },
  { id: 127, name: 'Puma Fit Tee',         price: '₹799',   originalPrice: '₹1,349', rating: 4.2, tag: null,         category: 'T-Shirts', brand: 'Puma', size: ['S','M','L','XL','XXL'], color: 'White', img: '/image/men/brand/puma/t7.jpg' },
  { id: 128, name: 'Puma Sport Tee',       price: '₹649',   originalPrice: '₹1,099', rating: 4.1, tag: 'Sale',       category: 'T-Shirts', brand: 'Puma', size: ['XS','S','M','L'],       color: 'Blue',  img: '/image/men/brand/puma/t8.jpg' },

  { id: 129, name: 'Puma Woven Short',     price: '₹1,599', originalPrice: '₹2,599', rating: 4.5, tag: 'New',        category: 'Shorts',   brand: 'Puma', size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/puma/s1.jpg' },
  { id: 130, name: 'Puma Casual Short',    price: '₹1,299', originalPrice: '₹2,099', rating: 4.3, tag: null,         category: 'Shorts',   brand: 'Puma', size: ['S','M','L','XL'],       color: 'Grey',  img: '/image/men/brand/puma/s2.jpg' },
  { id: 131, name: 'Puma Active Short',    price: '₹1,699', originalPrice: '₹2,799', rating: 4.6, tag: 'Trending',   category: 'Shorts',   brand: 'Puma', size: ['S','M','L','XL'],       color: 'Navy',  img: '/image/men/brand/puma/s3.jpg' },
  { id: 132, name: 'Puma Sport Short',     price: '₹1,199', originalPrice: '₹1,999', rating: 4.4, tag: 'Bestseller', category: 'Shorts',   brand: 'Puma', size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/puma/s4.jpg' },
  { id: 133, name: 'Puma Training Short',  price: '₹1,899', originalPrice: '₹3,099', rating: 4.5, tag: 'Popular',    category: 'Shorts',   brand: 'Puma', size: ['S','M','L','XL','XXL'], color: 'Red',   img: '/image/men/brand/puma/s5.jpg' },
  { id: 134, name: 'Puma Tech Short',      price: '₹1,799', originalPrice: '₹2,999', rating: 4.4, tag: 'New',        category: 'Shorts',   brand: 'Puma', size: ['M','L','XL'],           color: 'Grey',  img: '/image/men/brand/puma/s6.jpg' },
  { id: 135, name: 'Puma Club Short',      price: '₹1,099', originalPrice: '₹1,799', rating: 4.2, tag: 'Sale',       category: 'Shorts',   brand: 'Puma', size: ['S','M','L','XL'],       color: 'White', img: '/image/men/brand/puma/s7.jpg' },
  { id: 136, name: 'Puma Logo Short',      price: '₹1,399', originalPrice: '₹2,299', rating: 4.3, tag: null,         category: 'Shorts',   brand: 'Puma', size: ['S','M','L'],            color: 'Black', img: '/image/men/brand/puma/s8.jpg' },

  { id: 137, name: 'Puma Denim Jogger',    price: '₹2,299', originalPrice: '₹3,699', rating: 4.4, tag: 'New',        category: 'Jeans',    brand: 'Puma', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/puma/p1.jpg' },
  { id: 138, name: 'Puma Sport Denim',     price: '₹2,599', originalPrice: '₹4,099', rating: 4.5, tag: 'Popular',    category: 'Jeans',    brand: 'Puma', size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/puma/p2.jpg' },
  { id: 139, name: 'Puma Slim Jeans',      price: '₹2,099', originalPrice: '₹3,399', rating: 4.3, tag: 'Trending',   category: 'Jeans',    brand: 'Puma', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/puma/p3.jpg' },
  { id: 140, name: 'Puma Active Jeans',    price: '₹2,399', originalPrice: '₹3,899', rating: 4.6, tag: 'Bestseller', category: 'Jeans',    brand: 'Puma', size: ['M','L','XL'],           color: 'Grey',  img: '/image/men/brand/puma/p4.jpg' },
  { id: 141, name: 'Puma Street Jeans',    price: '₹2,799', originalPrice: '₹4,499', rating: 4.7, tag: 'New',        category: 'Jeans',    brand: 'Puma', size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/puma/p5.jpg' },
  { id: 142, name: 'Puma Classic Denim',   price: '₹1,899', originalPrice: '₹3,099', rating: 4.2, tag: 'Sale',       category: 'Jeans',    brand: 'Puma', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/puma/p6.jpg' },
  { id: 143, name: 'Puma Cargo Jeans',     price: '₹2,499', originalPrice: '₹3,999', rating: 4.4, tag: null,         category: 'Jeans',    brand: 'Puma', size: ['S','M','L','XL','XXL'], color: 'Grey',  img: '/image/men/brand/puma/p7.jpg' },
  { id: 144, name: 'Puma Straight Jeans',  price: '₹1,799', originalPrice: '₹2,899', rating: 4.1, tag: 'Sale',       category: 'Jeans',    brand: 'Puma', size: ['S','M','L'],            color: 'Blue',  img: '/image/men/brand/puma/p8.jpg' },

  // Jack & Jones T-Shirts

  { id: 145, name: 'J&J Basic Crew Tee',       price: '₹699',   originalPrice: '₹1,199', rating: 4.3, tag: 'Bestseller', category: 'T-Shirts', brand: 'Jack & Jones', size: ['XS','S','M','L','XL'],  color: 'Black', img: '/image/men/brand/j&j/t1.jpg' },
  { id: 146, name: 'J&J Logo Print Tee',       price: '₹599',   originalPrice: '₹999',   rating: 4.2, tag: 'Sale',       category: 'T-Shirts', brand: 'Jack & Jones', size: ['XS','S','M','L','XL'],  color: 'White', img: '/image/men/brand/j&j/t2.jpg' },
  { id: 147, name: 'J&J Graphic Tee',          price: '₹799',   originalPrice: '₹1,399', rating: 4.5, tag: 'New',        category: 'T-Shirts', brand: 'Jack & Jones', size: ['S','M','L','XL'],       color: 'Grey',  img: '/image/men/brand/j&j/t3.jpg' },
  { id: 148, name: 'J&J Slim Fit Tee',         price: '₹749',   originalPrice: '₹1,249', rating: 4.4, tag: null,         category: 'T-Shirts', brand: 'Jack & Jones', size: ['S','M','L','XL'],       color: 'Navy',  img: '/image/men/brand/j&j/t4.jpg' },
  { id: 149, name: 'J&J Relaxed Tee',          price: '₹849',   originalPrice: '₹1,449', rating: 4.3, tag: 'Trending',   category: 'T-Shirts', brand: 'Jack & Jones', size: ['XS','S','M','L'],       color: 'White', img: '/image/men/brand/j&j/t5.jpg' },
  { id: 150, name: 'J&J Striped Tee',          price: '₹899',   originalPrice: '₹1,499', rating: 4.6, tag: 'Popular',    category: 'T-Shirts', brand: 'Jack & Jones', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/j&j/t6.jpg' },
  { id: 151, name: 'J&J Pocket Tee',           price: '₹679',   originalPrice: '₹1,149', rating: 4.2, tag: null,         category: 'T-Shirts', brand: 'Jack & Jones', size: ['S','M','L','XL','XXL'], color: 'Grey',  img: '/image/men/brand/j&j/t7.jpg' },
  { id: 152, name: 'J&J Classic Tee',          price: '₹649',   originalPrice: '₹1,099', rating: 4.1, tag: 'Sale',       category: 'T-Shirts', brand: 'Jack & Jones', size: ['XS','S','M','L'],       color: 'Black', img: '/image/men/brand/j&j/t8.jpg' },

  { id: 153, name: 'J&J Oxford Shirt',         price: '₹1,499', originalPrice: '₹2,399', rating: 4.5, tag: 'New',        category: 'Shirts',   brand: 'Jack & Jones', size: ['S','M','L','XL'],       color: 'White', img: '/image/men/brand/j&j/s1.jpg' },
  { id: 154, name: 'J&J Linen Shirt',          price: '₹1,299', originalPrice: '₹2,099', rating: 4.4, tag: null,         category: 'Shirts',   brand: 'Jack & Jones', size: ['S','M','L','XL'],       color: 'White', img: '/image/men/brand/j&j/s2.jpg' },
  { id: 155, name: 'J&J Check Shirt',          price: '₹1,599', originalPrice: '₹2,599', rating: 4.6, tag: 'Trending',   category: 'Shirts',   brand: 'Jack & Jones', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/j&j/s3.jpg' },
  { id: 156, name: 'J&J Slim Shirt',           price: '₹1,199', originalPrice: '₹1,999', rating: 4.3, tag: 'Bestseller', category: 'Shirts',   brand: 'Jack & Jones', size: ['S','M','L','XL'],       color: 'Grey',  img: '/image/men/brand/j&j/s4.jpg' },
  { id: 157, name: 'J&J Casual Shirt',         price: '₹1,099', originalPrice: '₹1,799', rating: 4.5, tag: 'Popular',    category: 'Shirts',   brand: 'Jack & Jones', size: ['S','M','L','XL','XXL'], color: 'Navy',  img: '/image/men/brand/j&j/s5.jpg' },
  { id: 158, name: 'J&J Denim Shirt',          price: '₹1,799', originalPrice: '₹2,899', rating: 4.4, tag: 'New',        category: 'Shirts',   brand: 'Jack & Jones', size: ['M','L','XL'],           color: 'Blue',  img: '/image/men/brand/j&j/s6.jpg' },
  { id: 159, name: 'J&J Printed Shirt',        price: '₹999',   originalPrice: '₹1,699', rating: 4.2, tag: 'Sale',       category: 'Shirts',   brand: 'Jack & Jones', size: ['S','M','L','XL'],       color: 'White', img: '/image/men/brand/j&j/s7.jpg' },
  { id: 160, name: 'J&J Regular Shirt',        price: '₹1,149', originalPrice: '₹1,899', rating: 4.3, tag: null,         category: 'Shirts',   brand: 'Jack & Jones', size: ['S','M','L'],            color: 'Blue',  img: '/image/men/brand/j&j/s8.jpg' },

  { id: 161, name: 'J&J Glenn Slim Jeans',     price: '₹2,099', originalPrice: '₹3,499', rating: 4.5, tag: 'Bestseller', category: 'Jeans',    brand: 'Jack & Jones', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/j&j/p1.jpg' },
  { id: 162, name: 'J&J Tim Slim Jeans',       price: '₹1,999', originalPrice: '₹3,299', rating: 4.6, tag: 'Popular',    category: 'Jeans',    brand: 'Jack & Jones', size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/j&j/p2.jpg' },
  { id: 163, name: 'J&J Mike Cargo Jeans',     price: '₹2,299', originalPrice: '₹3,799', rating: 4.4, tag: 'New',        category: 'Jeans',    brand: 'Jack & Jones', size: ['S','M','L','XL'],       color: 'Grey',  img: '/image/men/brand/j&j/p3.jpg' },
  { id: 164, name: 'J&J Chris Loose Jeans',    price: '₹2,499', originalPrice: '₹3,999', rating: 4.3, tag: 'Trending',   category: 'Jeans',    brand: 'Jack & Jones', size: ['M','L','XL'],           color: 'Blue',  img: '/image/men/brand/j&j/p4.jpg' },
  { id: 165, name: 'J&J Clark Straight Jeans', price: '₹1,899', originalPrice: '₹3,099', rating: 4.7, tag: 'New',        category: 'Jeans',    brand: 'Jack & Jones', size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/j&j/p5.jpg' },
  { id: 166, name: 'J&J Liam Skinny Jeans',    price: '₹1,799', originalPrice: '₹2,999', rating: 4.2, tag: 'Sale',       category: 'Jeans',    brand: 'Jack & Jones', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/j&j/p6.jpg' },
  { id: 167, name: 'J&J Eddie Tapered Jeans',  price: '₹2,199', originalPrice: '₹3,599', rating: 4.4, tag: null,         category: 'Jeans',    brand: 'Jack & Jones', size: ['S','M','L','XL','XXL'], color: 'Grey',  img: '/image/men/brand/j&j/p7.jpg' },
  { id: 168, name: 'J&J Rick Original Jeans',  price: '₹1,699', originalPrice: '₹2,799', rating: 4.1, tag: 'Sale',       category: 'Jeans',    brand: 'Jack & Jones', size: ['S','M','L'],            color: 'Blue',  img: '/image/men/brand/j&j/p8.jpg' },

  // Levi's T-Shirts
  
  { id: 169, name: "Levi's Batwing Logo Tee",      price: '₹899',   originalPrice: '₹1,499', rating: 4.5, tag: 'Bestseller', category: 'T-Shirts', brand: "Levi's", size: ['XS','S','M','L','XL'],  color: 'Black', img: '/image/men/brand/levis/t1.jpg' },
  { id: 170, name: "Levi's Classic Crew Tee",       price: '₹749',   originalPrice: '₹1,249', rating: 4.3, tag: 'Sale',       category: 'T-Shirts', brand: "Levi's", size: ['XS','S','M','L','XL'],  color: 'White', img: '/image/men/brand/levis/t2.jpg' },
  { id: 171, name: "Levi's Graphic Tee",            price: '₹999',   originalPrice: '₹1,699', rating: 4.6, tag: 'New',        category: 'T-Shirts', brand: "Levi's", size: ['S','M','L','XL'],       color: 'Grey',  img: '/image/men/brand/levis/t3.jpg' },
  { id: 172, name: "Levi's Slim Fit Tee",           price: '₹849',   originalPrice: '₹1,399', rating: 4.4, tag: null,         category: 'T-Shirts', brand: "Levi's", size: ['S','M','L','XL'],       color: 'Navy',  img: '/image/men/brand/levis/t4.jpg' },
  { id: 173, name: "Levi's Housemark Tee",          price: '₹799',   originalPrice: '₹1,349', rating: 4.3, tag: 'Trending',   category: 'T-Shirts', brand: "Levi's", size: ['XS','S','M','L'],       color: 'White', img: '/image/men/brand/levis/t5.jpg' },
  { id: 174, name: "Levi's Original Tee",           price: '₹949',   originalPrice: '₹1,599', rating: 4.7, tag: 'Popular',    category: 'T-Shirts', brand: "Levi's", size: ['S','M','L','XL'],       color: 'Red',   img: '/image/men/brand/levis/t6.jpg' },
  { id: 175, name: "Levi's Vintage Tee",            price: '₹879',   originalPrice: '₹1,449', rating: 4.2, tag: null,         category: 'T-Shirts', brand: "Levi's", size: ['S','M','L','XL','XXL'], color: 'Blue',  img: '/image/men/brand/levis/t7.jpg' },
  { id: 176, name: "Levi's Sport Tee",              price: '₹699',   originalPrice: '₹1,149', rating: 4.1, tag: 'Sale',       category: 'T-Shirts', brand: "Levi's", size: ['XS','S','M','L'],       color: 'Black', img: '/image/men/brand/levis/t8.jpg' },

  { id: 177, name: "Levi's Classic Oxford Shirt",   price: '₹1,799', originalPrice: '₹2,999', rating: 4.5, tag: 'New',        category: 'Shirts',   brand: "Levi's", size: ['S','M','L','XL'],       color: 'White', img: '/image/men/brand/levis/s1.jpg' },
  { id: 178, name: "Levi's Relaxed Fit Shirt",      price: '₹1,499', originalPrice: '₹2,499', rating: 4.4, tag: null,         category: 'Shirts',   brand: "Levi's", size: ['S','M','L','XL'],       color: 'White', img: '/image/men/brand/levis/s2.jpg' },
  { id: 179, name: "Levi's Check Shirt",            price: '₹1,699', originalPrice: '₹2,799', rating: 4.6, tag: 'Trending',   category: 'Shirts',   brand: "Levi's", size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/levis/s3.jpg' },
  { id: 180, name: "Levi's Western Shirt",          price: '₹1,999', originalPrice: '₹3,299', rating: 4.4, tag: 'Bestseller', category: 'Shirts',   brand: "Levi's", size: ['S','M','L','XL'],       color: 'Grey',  img: '/image/men/brand/levis/s4.jpg' },
  { id: 181, name: "Levi's Sunset Pocket Shirt",    price: '₹1,899', originalPrice: '₹3,099', rating: 4.5, tag: 'Popular',    category: 'Shirts',   brand: "Levi's", size: ['S','M','L','XL','XXL'], color: 'Navy',  img: '/image/men/brand/levis/s5.jpg' },
  { id: 182, name: "Levi's Denim Shirt",            price: '₹2,199', originalPrice: '₹3,599', rating: 4.6, tag: 'New',        category: 'Shirts',   brand: "Levi's", size: ['M','L','XL'],           color: 'Blue',  img: '/image/men/brand/levis/s6.jpg' },
  { id: 183, name: "Levi's Flannel Shirt",          price: '₹1,599', originalPrice: '₹2,599', rating: 4.2, tag: 'Sale',       category: 'Shirts',   brand: "Levi's", size: ['S','M','L','XL'],       color: 'White', img: '/image/men/brand/levis/s7.jpg' },
  { id: 184, name: "Levi's Casual Shirt",           price: '₹1,399', originalPrice: '₹2,299', rating: 4.3, tag: null,         category: 'Shirts',   brand: "Levi's", size: ['S','M','L'],            color: 'Blue',  img: '/image/men/brand/levis/s8.jpg' },

  { id: 185, name: "Levi's 501 Original Jeans",     price: '₹2,999', originalPrice: '₹4,999', rating: 4.7, tag: 'Bestseller', category: 'Jeans',    brand: "Levi's", size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/levis/p1.jpg' },
  { id: 186, name: "Levi's 511 Slim Jeans",         price: '₹2,799', originalPrice: '₹4,599', rating: 4.6, tag: 'Popular',    category: 'Jeans',    brand: "Levi's", size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/levis/p2.jpg' },
  { id: 187, name: "Levi's 512 Slim Taper Jeans",   price: '₹2,599', originalPrice: '₹4,299', rating: 4.5, tag: 'New',        category: 'Jeans',    brand: "Levi's", size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/levis/p3.jpg' },
  { id: 188, name: "Levi's 514 Straight Jeans",     price: '₹2,499', originalPrice: '₹3,999', rating: 4.4, tag: 'Trending',   category: 'Jeans',    brand: "Levi's", size: ['M','L','XL'],           color: 'Grey',  img: '/image/men/brand/levis/p4.jpg' },
  { id: 189, name: "Levi's 505 Regular Jeans",      price: '₹2,299', originalPrice: '₹3,799', rating: 4.5, tag: 'New',        category: 'Jeans',    brand: "Levi's", size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/levis/p5.jpg' },
  { id: 190, name: "Levi's 519 Extreme Skinny",     price: '₹2,099', originalPrice: '₹3,499', rating: 4.2, tag: 'Sale',       category: 'Jeans',    brand: "Levi's", size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/levis/p6.jpg' },
  { id: 191, name: "Levi's 502 Taper Jeans",        price: '₹2,699', originalPrice: '₹4,399', rating: 4.4, tag: null,         category: 'Jeans',    brand: "Levi's", size: ['S','M','L','XL','XXL'], color: 'Grey',  img: '/image/men/brand/levis/p7.jpg' },
  { id: 192, name: "Levi's 541 Athletic Jeans",     price: '₹1,999', originalPrice: '₹3,299', rating: 4.1, tag: 'Sale',       category: 'Jeans',    brand: "Levi's", size: ['S','M','L'],            color: 'Blue',  img: '/image/men/brand/levis/p8.jpg' },

  // Tommy Hilfiger T-Shirts

  { id: 193, name: 'Tommy Flag Logo Tee',          price: '₹1,499', originalPrice: '₹2,499', rating: 4.5, tag: 'Bestseller', category: 'T-Shirts', brand: 'Tommy Hilfiger', size: ['XS','S','M','L','XL'],  color: 'White', img: '/image/men/brand/tommy/t1.jpg' },
  { id: 194, name: 'Tommy Classic Crew Tee',        price: '₹1,299', originalPrice: '₹2,099', rating: 4.3, tag: 'Sale',       category: 'T-Shirts', brand: 'Tommy Hilfiger', size: ['XS','S','M','L','XL'],  color: 'Navy',  img: '/image/men/brand/tommy/t2.jpg' },
  { id: 195, name: 'Tommy Stripe Tee',              price: '₹1,599', originalPrice: '₹2,699', rating: 4.6, tag: 'New',        category: 'T-Shirts', brand: 'Tommy Hilfiger', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/tommy/t3.jpg' },
  { id: 196, name: 'Tommy Slim Fit Tee',            price: '₹1,399', originalPrice: '₹2,299', rating: 4.4, tag: null,         category: 'T-Shirts', brand: 'Tommy Hilfiger', size: ['S','M','L','XL'],       color: 'White', img: '/image/men/brand/tommy/t4.jpg' },
  { id: 197, name: 'Tommy Hilfiger Logo Tee',       price: '₹1,349', originalPrice: '₹2,199', rating: 4.3, tag: 'Trending',   category: 'T-Shirts', brand: 'Tommy Hilfiger', size: ['XS','S','M','L'],       color: 'Grey',  img: '/image/men/brand/tommy/t5.jpg' },
  { id: 198, name: 'Tommy Essential Tee',           price: '₹1,699', originalPrice: '₹2,799', rating: 4.7, tag: 'Popular',    category: 'T-Shirts', brand: 'Tommy Hilfiger', size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/tommy/t6.jpg' },
  { id: 199, name: 'Tommy Sport Tee',               price: '₹1,449', originalPrice: '₹2,399', rating: 4.2, tag: null,         category: 'T-Shirts', brand: 'Tommy Hilfiger', size: ['S','M','L','XL','XXL'], color: 'Red',   img: '/image/men/brand/tommy/t7.jpg' },
  { id: 200, name: 'Tommy Pocket Tee',              price: '₹1,199', originalPrice: '₹1,999', rating: 4.1, tag: 'Sale',       category: 'T-Shirts', brand: 'Tommy Hilfiger', size: ['XS','S','M','L'],       color: 'Navy',  img: '/image/men/brand/tommy/t8.jpg' },

  { id: 201, name: 'Tommy Oxford Shirt',            price: '₹2,499', originalPrice: '₹3,999', rating: 4.5, tag: 'New',        category: 'Shirts',   brand: 'Tommy Hilfiger', size: ['S','M','L','XL'],       color: 'White', img: '/image/men/brand/tommy/s1.jpg' },
  { id: 202, name: 'Tommy Linen Shirt',             price: '₹2,199', originalPrice: '₹3,599', rating: 4.4, tag: null,         category: 'Shirts',   brand: 'Tommy Hilfiger', size: ['S','M','L','XL'],       color: 'White', img: '/image/men/brand/tommy/s2.jpg' },
  { id: 203, name: 'Tommy Check Shirt',             price: '₹2,699', originalPrice: '₹4,299', rating: 4.6, tag: 'Trending',   category: 'Shirts',   brand: 'Tommy Hilfiger', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/tommy/s3.jpg' },
  { id: 204, name: 'Tommy Slim Shirt',              price: '₹2,099', originalPrice: '₹3,399', rating: 4.3, tag: 'Bestseller', category: 'Shirts',   brand: 'Tommy Hilfiger', size: ['S','M','L','XL'],       color: 'Grey',  img: '/image/men/brand/tommy/s4.jpg' },
  { id: 205, name: 'Tommy Casual Shirt',            price: '₹1,999', originalPrice: '₹3,299', rating: 4.5, tag: 'Popular',    category: 'Shirts',   brand: 'Tommy Hilfiger', size: ['S','M','L','XL','XXL'], color: 'Navy',  img: '/image/men/brand/tommy/s5.jpg' },
  { id: 206, name: 'Tommy Stripe Shirt',            price: '₹2,899', originalPrice: '₹4,699', rating: 4.4, tag: 'New',        category: 'Shirts',   brand: 'Tommy Hilfiger', size: ['M','L','XL'],           color: 'Blue',  img: '/image/men/brand/tommy/s6.jpg' },
  { id: 207, name: 'Tommy Printed Shirt',           price: '₹1,799', originalPrice: '₹2,999', rating: 4.2, tag: 'Sale',       category: 'Shirts',   brand: 'Tommy Hilfiger', size: ['S','M','L','XL'],       color: 'White', img: '/image/men/brand/tommy/s7.jpg' },
  { id: 208, name: 'Tommy Regular Shirt',           price: '₹1,899', originalPrice: '₹3,099', rating: 4.3, tag: null,         category: 'Shirts',   brand: 'Tommy Hilfiger', size: ['S','M','L'],            color: 'Blue',  img: '/image/men/brand/tommy/s8.jpg' },

  { id: 209, name: 'Tommy Scanton Slim Jeans',      price: '₹3,299', originalPrice: '₹5,299', rating: 4.5, tag: 'Bestseller', category: 'Jeans',    brand: 'Tommy Hilfiger', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/tommy/p1.jpg' },
  { id: 210, name: 'Tommy Bleecker Slim Jeans',     price: '₹3,099', originalPrice: '₹4,999', rating: 4.6, tag: 'Popular',    category: 'Jeans',    brand: 'Tommy Hilfiger', size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/tommy/p2.jpg' },
  { id: 211, name: 'Tommy Denton Straight Jeans',   price: '₹2,899', originalPrice: '₹4,699', rating: 4.4, tag: 'New',        category: 'Jeans',    brand: 'Tommy Hilfiger', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/tommy/p3.jpg' },
  { id: 212, name: 'Tommy Ryan Straight Jeans',     price: '₹2,799', originalPrice: '₹4,499', rating: 4.3, tag: 'Trending',   category: 'Jeans',    brand: 'Tommy Hilfiger', size: ['M','L','XL'],           color: 'Grey',  img: '/image/men/brand/tommy/p4.jpg' },
  { id: 213, name: 'Tommy Houston Relaxed Jeans',   price: '₹3,499', originalPrice: '₹5,599', rating: 4.7, tag: 'New',        category: 'Jeans',    brand: 'Tommy Hilfiger', size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/tommy/p5.jpg' },
  { id: 214, name: 'Tommy Steve Slim Tapered',      price: '₹2,599', originalPrice: '₹4,199', rating: 4.2, tag: 'Sale',       category: 'Jeans',    brand: 'Tommy Hilfiger', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/tommy/p6.jpg' },
  { id: 215, name: 'Tommy Ronnie Skinny Jeans',     price: '₹2,999', originalPrice: '₹4,799', rating: 4.4, tag: null,         category: 'Jeans',    brand: 'Tommy Hilfiger', size: ['S','M','L','XL','XXL'], color: 'Grey',  img: '/image/men/brand/tommy/p7.jpg' },
  { id: 216, name: 'Tommy Classic Denim',           price: '₹2,399', originalPrice: '₹3,899', rating: 4.1, tag: 'Sale',       category: 'Jeans',    brand: 'Tommy Hilfiger', size: ['S','M','L'],            color: 'Blue',  img: '/image/men/brand/tommy/p8.jpg' },

  // Gap T-Shirts

  { id: 217, name: 'Gap Logo Tee',              price: '₹799',   originalPrice: '₹1,399', rating: 4.4, tag: 'Bestseller', category: 'T-Shirts', brand: 'Gap', size: ['XS','S','M','L','XL'],  color: 'Black', img: '/image/men/brand/gap/t1.jpg' },
  { id: 218, name: 'Gap Classic Crew Tee',      price: '₹699',   originalPrice: '₹1,199', rating: 4.2, tag: 'Sale',       category: 'T-Shirts', brand: 'Gap', size: ['XS','S','M','L','XL'],  color: 'White', img: '/image/men/brand/gap/t2.jpg' },
  { id: 219, name: 'Gap Graphic Tee',           price: '₹899',   originalPrice: '₹1,499', rating: 4.5, tag: 'New',        category: 'T-Shirts', brand: 'Gap', size: ['S','M','L','XL'],       color: 'Grey',  img: '/image/men/brand/gap/t3.jpg' },
  { id: 220, name: 'Gap Essential Tee',         price: '₹749',   originalPrice: '₹1,249', rating: 4.3, tag: null,         category: 'T-Shirts', brand: 'Gap', size: ['S','M','L','XL'],       color: 'Navy',  img: '/image/men/brand/gap/t4.jpg' },
  { id: 221, name: 'Gap Vintage Wash Tee',      price: '₹849',   originalPrice: '₹1,449', rating: 4.4, tag: 'Trending',   category: 'T-Shirts', brand: 'Gap', size: ['XS','S','M','L'],       color: 'Blue',  img: '/image/men/brand/gap/t5.jpg' },
  { id: 222, name: 'Gap Pocket Tee',            price: '₹949',   originalPrice: '₹1,599', rating: 4.6, tag: 'Popular',    category: 'T-Shirts', brand: 'Gap', size: ['S','M','L','XL'],       color: 'White', img: '/image/men/brand/gap/t6.jpg' },
  { id: 223, name: 'Gap Relaxed Tee',           price: '₹799',   originalPrice: '₹1,349', rating: 4.2, tag: null,         category: 'T-Shirts', brand: 'Gap', size: ['S','M','L','XL','XXL'], color: 'Black', img: '/image/men/brand/gap/t7.jpg' },
  { id: 224, name: 'Gap Stripe Tee',            price: '₹649',   originalPrice: '₹1,099', rating: 4.1, tag: 'Sale',       category: 'T-Shirts', brand: 'Gap', size: ['XS','S','M','L'],       color: 'Grey',  img: '/image/men/brand/gap/t8.jpg' },

  { id: 225, name: 'Gap Oxford Shirt',          price: '₹1,499', originalPrice: '₹2,499', rating: 4.5, tag: 'New',        category: 'Shirts',   brand: 'Gap', size: ['S','M','L','XL'],       color: 'White', img: '/image/men/brand/gap/s1.jpg' },
  { id: 226, name: 'Gap Linen Shirt',           price: '₹1,299', originalPrice: '₹2,199', rating: 4.4, tag: null,         category: 'Shirts',   brand: 'Gap', size: ['S','M','L','XL'],       color: 'White', img: '/image/men/brand/gap/s2.jpg' },
  { id: 227, name: 'Gap Poplin Shirt',          price: '₹1,399', originalPrice: '₹2,299', rating: 4.5, tag: 'Trending',   category: 'Shirts',   brand: 'Gap', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/gap/s3.jpg' },
  { id: 228, name: 'Gap Slim Fit Shirt',        price: '₹1,199', originalPrice: '₹1,999', rating: 4.3, tag: 'Bestseller', category: 'Shirts',   brand: 'Gap', size: ['S','M','L','XL'],       color: 'Grey',  img: '/image/men/brand/gap/s4.jpg' },
  { id: 229, name: 'Gap Standard Shirt',        price: '₹1,099', originalPrice: '₹1,799', rating: 4.4, tag: 'Popular',    category: 'Shirts',   brand: 'Gap', size: ['S','M','L','XL','XXL'], color: 'Navy',  img: '/image/men/brand/gap/s5.jpg' },
  { id: 230, name: 'Gap Denim Shirt',           price: '₹1,699', originalPrice: '₹2,799', rating: 4.5, tag: 'New',        category: 'Shirts',   brand: 'Gap', size: ['M','L','XL'],           color: 'Blue',  img: '/image/men/brand/gap/s6.jpg' },
  { id: 231, name: 'Gap Flannel Shirt',         price: '₹1,149', originalPrice: '₹1,899', rating: 4.2, tag: 'Sale',       category: 'Shirts',   brand: 'Gap', size: ['S','M','L','XL'],       color: 'White', img: '/image/men/brand/gap/s7.jpg' },
  { id: 232, name: 'Gap Check Shirt',           price: '₹1,349', originalPrice: '₹2,249', rating: 4.3, tag: null,         category: 'Shirts',   brand: 'Gap', size: ['S','M','L'],            color: 'Blue',  img: '/image/men/brand/gap/s8.jpg' },

  { id: 233, name: 'Gap Slim Jeans',            price: '₹2,199', originalPrice: '₹3,699', rating: 4.5, tag: 'Bestseller', category: 'Jeans',    brand: 'Gap', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/gap/p1.jpg' },
  { id: 234, name: 'Gap Skinny Jeans',          price: '₹1,999', originalPrice: '₹3,299', rating: 4.4, tag: 'Popular',    category: 'Jeans',    brand: 'Gap', size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/gap/p2.jpg' },
  { id: 235, name: 'Gap Straight Jeans',        price: '₹2,099', originalPrice: '₹3,499', rating: 4.5, tag: 'New',        category: 'Jeans',    brand: 'Gap', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/gap/p3.jpg' },
  { id: 236, name: 'Gap Loose Jeans',           price: '₹2,299', originalPrice: '₹3,799', rating: 4.3, tag: 'Trending',   category: 'Jeans',    brand: 'Gap', size: ['M','L','XL'],           color: 'Grey',  img: '/image/men/brand/gap/p4.jpg' },
  { id: 237, name: 'Gap Relaxed Jeans',         price: '₹2,499', originalPrice: '₹4,099', rating: 4.6, tag: 'New',        category: 'Jeans',    brand: 'Gap', size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/gap/p5.jpg' },
  { id: 238, name: 'Gap Athletic Taper Jeans',  price: '₹1,899', originalPrice: '₹3,099', rating: 4.2, tag: 'Sale',       category: 'Jeans',    brand: 'Gap', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/gap/p6.jpg' },
  { id: 239, name: 'Gap Vintage Jeans',         price: '₹2,399', originalPrice: '₹3,999', rating: 4.4, tag: null,         category: 'Jeans',    brand: 'Gap', size: ['S','M','L','XL','XXL'], color: 'Grey',  img: '/image/men/brand/gap/p7.jpg' },
  { id: 240, name: 'Gap Classic Denim',         price: '₹1,799', originalPrice: '₹2,999', rating: 4.1, tag: 'Sale',       category: 'Jeans',    brand: 'Gap', size: ['S','M','L'],            color: 'Blue',  img: '/image/men/brand/gap/p8.jpg' },

  // US Polo T-Shirts

  { id: 241, name: 'US Polo Polo Tee',        price: '₹899',   originalPrice: '₹1,499', rating: 4.5, tag: 'Bestseller', category: 'T-Shirts', brand: 'U.S. Polo', size: ['XS','S','M','L','XL'],  color: 'White', img: '/image/men/brand/us/t1.jpg' },
  { id: 242, name: 'US Polo Classic Tee',     price: '₹749',   originalPrice: '₹1,249', rating: 4.3, tag: 'Sale',       category: 'T-Shirts', brand: 'U.S. Polo', size: ['XS','S','M','L','XL'],  color: 'Navy',  img: '/image/men/brand/us/t2.jpg' },
  { id: 243, name: 'US Polo Graphic Tee',     price: '₹999',   originalPrice: '₹1,699', rating: 4.5, tag: 'New',        category: 'T-Shirts', brand: 'U.S. Polo', size: ['S','M','L','XL'],       color: 'Grey',  img: '/image/men/brand/us/t3.jpg' },
  { id: 244, name: 'US Polo Slim Tee',        price: '₹849',   originalPrice: '₹1,399', rating: 4.4, tag: null,         category: 'T-Shirts', brand: 'U.S. Polo', size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/us/t4.jpg' },
  { id: 245, name: 'US Polo Stripe Tee',      price: '₹949',   originalPrice: '₹1,599', rating: 4.3, tag: 'Trending',   category: 'T-Shirts', brand: 'U.S. Polo', size: ['XS','S','M','L'],       color: 'Blue',  img: '/image/men/brand/us/t5.jpg' },
  { id: 246, name: 'US Polo Logo Tee',        price: '₹1,049', originalPrice: '₹1,749', rating: 4.6, tag: 'Popular',    category: 'T-Shirts', brand: 'U.S. Polo', size: ['S','M','L','XL'],       color: 'White', img: '/image/men/brand/us/t6.jpg' },
  { id: 247, name: 'US Polo Sport Tee',       price: '₹799',   originalPrice: '₹1,349', rating: 4.2, tag: null,         category: 'T-Shirts', brand: 'U.S. Polo', size: ['S','M','L','XL','XXL'], color: 'Red',   img: '/image/men/brand/us/t7.jpg' },
  { id: 248, name: 'US Polo Basic Tee',       price: '₹649',   originalPrice: '₹1,099', rating: 4.1, tag: 'Sale',       category: 'T-Shirts', brand: 'U.S. Polo', size: ['XS','S','M','L'],       color: 'Grey',  img: '/image/men/brand/us/t8.jpg' },

  { id: 249, name: 'US Polo Oxford Shirt',    price: '₹1,599', originalPrice: '₹2,699', rating: 4.5, tag: 'New',        category: 'Shirts',   brand: 'U.S. Polo', size: ['S','M','L','XL'],       color: 'White', img: '/image/men/brand/us/s1.jpg' },
  { id: 250, name: 'US Polo Linen Shirt',     price: '₹1,399', originalPrice: '₹2,299', rating: 4.4, tag: null,         category: 'Shirts',   brand: 'U.S. Polo', size: ['S','M','L','XL'],       color: 'White', img: '/image/men/brand/us/s2.jpg' },
  { id: 251, name: 'US Polo Check Shirt',     price: '₹1,699', originalPrice: '₹2,799', rating: 4.6, tag: 'Trending',   category: 'Shirts',   brand: 'U.S. Polo', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/us/s3.jpg' },
  { id: 252, name: 'US Polo Slim Shirt',      price: '₹1,299', originalPrice: '₹2,199', rating: 4.3, tag: 'Bestseller', category: 'Shirts',   brand: 'U.S. Polo', size: ['S','M','L','XL'],       color: 'Grey',  img: '/image/men/brand/us/s4.jpg' },
  { id: 253, name: 'US Polo Casual Shirt',    price: '₹1,199', originalPrice: '₹1,999', rating: 4.5, tag: 'Popular',    category: 'Shirts',   brand: 'U.S. Polo', size: ['S','M','L','XL','XXL'], color: 'Navy',  img: '/image/men/brand/us/s5.jpg' },
  { id: 254, name: 'US Polo Printed Shirt',   price: '₹1,499', originalPrice: '₹2,499', rating: 4.4, tag: 'New',        category: 'Shirts',   brand: 'U.S. Polo', size: ['M','L','XL'],           color: 'Blue',  img: '/image/men/brand/us/s6.jpg' },
  { id: 255, name: 'US Polo Stripe Shirt',    price: '₹1,099', originalPrice: '₹1,799', rating: 4.2, tag: 'Sale',       category: 'Shirts',   brand: 'U.S. Polo', size: ['S','M','L','XL'],       color: 'White', img: '/image/men/brand/us/s7.jpg' },
  { id: 256, name: 'US Polo Regular Shirt',   price: '₹1,149', originalPrice: '₹1,899', rating: 4.3, tag: null,         category: 'Shirts',   brand: 'U.S. Polo', size: ['S','M','L'],            color: 'Blue',  img: '/image/men/brand/us/s8.jpg' },

  { id: 257, name: 'US Polo Slim Jeans',      price: '₹2,099', originalPrice: '₹3,499', rating: 4.5, tag: 'Bestseller', category: 'Jeans',    brand: 'U.S. Polo', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/us/p1.jpg' },
  { id: 258, name: 'US Polo Skinny Jeans',    price: '₹1,899', originalPrice: '₹3,199', rating: 4.4, tag: 'Popular',    category: 'Jeans',    brand: 'U.S. Polo', size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/us/p2.jpg' },
  { id: 259, name: 'US Polo Straight Jeans',  price: '₹1,999', originalPrice: '₹3,299', rating: 4.5, tag: 'New',        category: 'Jeans',    brand: 'U.S. Polo', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/us/p3.jpg' },
  { id: 260, name: 'US Polo Regular Jeans',   price: '₹2,199', originalPrice: '₹3,699', rating: 4.3, tag: 'Trending',   category: 'Jeans',    brand: 'U.S. Polo', size: ['M','L','XL'],           color: 'Grey',  img: '/image/men/brand/us/p4.jpg' },
  { id: 261, name: 'US Polo Relaxed Jeans',   price: '₹2,399', originalPrice: '₹3,999', rating: 4.6, tag: 'New',        category: 'Jeans',    brand: 'U.S. Polo', size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/us/p5.jpg' },
  { id: 262, name: 'US Polo Classic Jeans',   price: '₹1,799', originalPrice: '₹2,999', rating: 4.2, tag: 'Sale',       category: 'Jeans',    brand: 'U.S. Polo', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/us/p6.jpg' },
  { id: 263, name: 'US Polo Cargo Jeans',     price: '₹2,299', originalPrice: '₹3,799', rating: 4.4, tag: null,         category: 'Jeans',    brand: 'U.S. Polo', size: ['S','M','L','XL','XXL'], color: 'Grey',  img: '/image/men/brand/us/p7.jpg' },
  { id: 264, name: 'US Polo Tapered Jeans',   price: '₹1,699', originalPrice: '₹2,799', rating: 4.1, tag: 'Sale',       category: 'Jeans',    brand: 'U.S. Polo', size: ['S','M','L'],            color: 'Blue',  img: '/image/men/brand/us/p8.jpg' },

  // Wrangler T-Shirts

  { id: 265, name: 'Wrangler Logo Tee',          price: '₹699',   originalPrice: '₹1,199', rating: 4.4, tag: 'Bestseller', category: 'T-Shirts', brand: 'Wrangler', size: ['XS','S','M','L','XL'],  color: 'Black', img: '/image/men/brand/wrangler/t1.jpg' },
  { id: 266, name: 'Wrangler Classic Tee',        price: '₹599',   originalPrice: '₹999',   rating: 4.2, tag: 'Sale',       category: 'T-Shirts', brand: 'Wrangler', size: ['XS','S','M','L','XL'],  color: 'White', img: '/image/men/brand/wrangler/t2.jpg' },
  { id: 267, name: 'Wrangler Graphic Tee',        price: '₹799',   originalPrice: '₹1,399', rating: 4.5, tag: 'New',        category: 'T-Shirts', brand: 'Wrangler', size: ['S','M','L','XL'],       color: 'Grey',  img: '/image/men/brand/wrangler/t3.jpg' },
  { id: 268, name: 'Wrangler Relaxed Tee',        price: '₹749',   originalPrice: '₹1,249', rating: 4.3, tag: null,         category: 'T-Shirts', brand: 'Wrangler', size: ['S','M','L','XL'],       color: 'Navy',  img: '/image/men/brand/wrangler/t4.jpg' },
  { id: 269, name: 'Wrangler Vintage Tee',        price: '₹849',   originalPrice: '₹1,449', rating: 4.3, tag: 'Trending',   category: 'T-Shirts', brand: 'Wrangler', size: ['XS','S','M','L'],       color: 'Brown', img: '/image/men/brand/wrangler/t5.jpg' },
  { id: 270, name: 'Wrangler Western Tee',        price: '₹899',   originalPrice: '₹1,499', rating: 4.6, tag: 'Popular',    category: 'T-Shirts', brand: 'Wrangler', size: ['S','M','L','XL'],       color: 'Red',   img: '/image/men/brand/wrangler/t6.jpg' },
  { id: 271, name: 'Wrangler Pocket Tee',         price: '₹679',   originalPrice: '₹1,149', rating: 4.2, tag: null,         category: 'T-Shirts', brand: 'Wrangler', size: ['S','M','L','XL','XXL'], color: 'White', img: '/image/men/brand/wrangler/t7.jpg' },
  { id: 272, name: 'Wrangler Sport Tee',          price: '₹649',   originalPrice: '₹1,099', rating: 4.1, tag: 'Sale',       category: 'T-Shirts', brand: 'Wrangler', size: ['XS','S','M','L'],       color: 'Black', img: '/image/men/brand/wrangler/t8.jpg' },

  { id: 273, name: 'Wrangler Western Shirt',      price: '₹1,499', originalPrice: '₹2,499', rating: 4.6, tag: 'Bestseller', category: 'Shirts',   brand: 'Wrangler', size: ['S','M','L','XL'],       color: 'Brown', img: '/image/men/brand/wrangler/s1.jpg' },
  { id: 274, name: 'Wrangler Flannel Shirt',      price: '₹1,299', originalPrice: '₹2,199', rating: 4.4, tag: null,         category: 'Shirts',   brand: 'Wrangler', size: ['S','M','L','XL'],       color: 'Grey',  img: '/image/men/brand/wrangler/s2.jpg' },
  { id: 275, name: 'Wrangler Check Shirt',        price: '₹1,399', originalPrice: '₹2,299', rating: 4.5, tag: 'Trending',   category: 'Shirts',   brand: 'Wrangler', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/wrangler/s3.jpg' },
  { id: 276, name: 'Wrangler Denim Shirt',        price: '₹1,599', originalPrice: '₹2,699', rating: 4.4, tag: 'New',        category: 'Shirts',   brand: 'Wrangler', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/wrangler/s4.jpg' },
  { id: 277, name: 'Wrangler Casual Shirt',       price: '₹1,099', originalPrice: '₹1,799', rating: 4.3, tag: 'Popular',    category: 'Shirts',   brand: 'Wrangler', size: ['S','M','L','XL','XXL'], color: 'White', img: '/image/men/brand/wrangler/s5.jpg' },
  { id: 278, name: 'Wrangler Printed Shirt',      price: '₹1,199', originalPrice: '₹1,999', rating: 4.4, tag: 'New',        category: 'Shirts',   brand: 'Wrangler', size: ['M','L','XL'],           color: 'Navy',  img: '/image/men/brand/wrangler/s6.jpg' },
  { id: 279, name: 'Wrangler Regular Shirt',      price: '₹999',   originalPrice: '₹1,699', rating: 4.2, tag: 'Sale',       category: 'Shirts',   brand: 'Wrangler', size: ['S','M','L','XL'],       color: 'White', img: '/image/men/brand/wrangler/s7.jpg' },
  { id: 280, name: 'Wrangler Slim Shirt',         price: '₹1,149', originalPrice: '₹1,899', rating: 4.3, tag: null,         category: 'Shirts',   brand: 'Wrangler', size: ['S','M','L'],            color: 'Grey',  img: '/image/men/brand/wrangler/s8.jpg' },

  { id: 281, name: 'Wrangler Cowboy Cut Jeans',   price: '₹2,299', originalPrice: '₹3,799', rating: 4.6, tag: 'Bestseller', category: 'Jeans',    brand: 'Wrangler', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/wrangler/p1.jpg' },
  { id: 282, name: 'Wrangler Bootcut Jeans',      price: '₹2,099', originalPrice: '₹3,499', rating: 4.5, tag: 'Popular',    category: 'Jeans',    brand: 'Wrangler', size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/wrangler/p2.jpg' },
  { id: 283, name: 'Wrangler Slim Fit Jeans',     price: '₹1,999', originalPrice: '₹3,299', rating: 4.4, tag: 'New',        category: 'Jeans',    brand: 'Wrangler', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/wrangler/p3.jpg' },
  { id: 284, name: 'Wrangler Regular Fit Jeans',  price: '₹1,899', originalPrice: '₹3,099', rating: 4.3, tag: 'Trending',   category: 'Jeans',    brand: 'Wrangler', size: ['M','L','XL'],           color: 'Grey',  img: '/image/men/brand/wrangler/p4.jpg' },
  { id: 285, name: 'Wrangler Relaxed Fit Jeans',  price: '₹2,199', originalPrice: '₹3,699', rating: 4.7, tag: 'New',        category: 'Jeans',    brand: 'Wrangler', size: ['S','M','L','XL'],       color: 'Black', img: '/image/men/brand/wrangler/p5.jpg' },
  { id: 286, name: 'Wrangler Straight Jeans',     price: '₹1,799', originalPrice: '₹2,999', rating: 4.2, tag: 'Sale',       category: 'Jeans',    brand: 'Wrangler', size: ['S','M','L','XL'],       color: 'Blue',  img: '/image/men/brand/wrangler/p6.jpg' },
  { id: 287, name: 'Wrangler Vintage Jeans',      price: '₹2,399', originalPrice: '₹3,999', rating: 4.4, tag: null,         category: 'Jeans',    brand: 'Wrangler', size: ['S','M','L','XL','XXL'], color: 'Grey',  img: '/image/men/brand/wrangler/p7.jpg' },
  { id: 288, name: 'Wrangler Classic Denim',      price: '₹1,699', originalPrice: '₹2,799', rating: 4.1, tag: 'Sale',       category: 'Jeans',    brand: 'Wrangler', size: ['S','M','L'],            color: 'Blue',  img: '/image/men/brand/wrangler/p8.jpg' },
]

  let filteredProducts = [...products]

  if (selectedPrices.length > 0) {
    filteredProducts = filteredProducts.filter(p => {
      const price = parseInt(p.price.replace(/[₹,]/g, ''))
      return selectedPrices.some(range => {
        if (range === 'Under ₹500') return price < 500
        if (range === '₹500 - ₹1000') return price >= 500 && price <= 1000
        if (range === '₹1000 - ₹2000') return price >= 1000 && price <= 2000
        if (range === '₹2000 - ₹3000') return price >= 2000 && price <= 3000
        if (range === 'Above ₹3000') return price > 3000
        return true
      })
    })
  }

  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(p => selectedCategories.includes(p.category))
  }

  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter(p => selectedBrands.includes(p.brand))
  }

  if (selectedSizes.length > 0) {
    filteredProducts = filteredProducts.filter(p => selectedSizes.some(s => p.size.includes(s)))
  }

  if (selectedColors.length > 0) {
    filteredProducts = filteredProducts.filter(p => selectedColors.includes(p.color))
  }

  if (selectedRating) {
    const minRating = parseInt(selectedRating)
    filteredProducts = filteredProducts.filter(p => p.rating >= minRating)
  }

  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => parseInt(a.price.replace(/[₹,]/g, '')) - parseInt(b.price.replace(/[₹,]/g, '')))
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => parseInt(b.price.replace(/[₹,]/g, '')) - parseInt(a.price.replace(/[₹,]/g, '')))
  } else if (sortBy === 'newest') {
    filteredProducts = [...filteredProducts].reverse()
  } else if (sortBy === 'popular') {
    filteredProducts.sort((a, b) => b.rating - a.rating)
  }

  const tagColor = (tag) => {
    if (tag === 'Hot') return '#F5A623'
    if (tag === 'New') return '#4A90D9'
    if (tag === 'Trending') return '#E91E8C'
    return '#00897B'
  }

  return (
    <div className="page">
      <Navbar active="" />
      <div className="wrapper">
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <h1 className="page-title">
            {urlCategory ? decodeURIComponent(urlCategory) : "Men's Fashion"}
          </h1>
        </div>

        <div className={`filter-overlay ${filterOpen ? 'open' : ''}`} onClick={() => setFilterOpen(false)} />

        <div className="common-page-layout">
          <FilterSidebar
            filterOpen={filterOpen} setFilterOpen={setFilterOpen}
            clearFilters={clearFilters}
            selectedPrices={selectedPrices} setSelectedPrices={setSelectedPrices}
            selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
            selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands}
            selectedSizes={selectedSizes} setSelectedSizes={setSelectedSizes}
            selectedColors={selectedColors} setSelectedColors={setSelectedColors}
            selectedRating={selectedRating} setSelectedRating={setSelectedRating}
          />
          <div className="products-section">
            <div className="products-top">
              <div className="products-count">Showing <span>{filteredProducts.length}</span> products</div>
              <div className="sort-wrap">
                <button className="filter-toggle-btn" onClick={() => setFilterOpen(true)}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4"/></svg>
                  Filters
                </button>
                <span className="sort-label">Sort by:</span>
                <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
            <div className="common-product-grid">
              {filteredProducts.map(p => (
                <div key={p.id} className="product-card">
                  <div className="product-img-wrap" style={{ height: '260px' }}>
                    <img src={p.img} alt={p.name} />
                    <button className="wishlist-btn" onClick={() => toggleWishlist(p.id)}>
                      <svg width="16" height="16" fill={wishlist.includes(p.id) ? '#FF4B4B' : 'none'} stroke={wishlist.includes(p.id) ? '#FF4B4B' : '#fff'} strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    </button>
                    <span className="product-tag" style={{ background: tagColor(p.tag) }}>{p.tag}</span>
                  </div>
                  <div className="product-info">
                    <div className="product-name">{p.name}</div>
                    <div className="product-meta">
                      <span className="product-price">{p.price}</span>
                      <span className="product-rating">★ {p.rating}</span>
                    </div>
                    <button className="add-to-cart-btn">Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">® <span className="footer-brand">SMARTSTYLE</span> 2025. All Rights Reserved.</footer>
    </div>
  )
}