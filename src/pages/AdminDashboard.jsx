import { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'

function formatPrice(value) {
  return `Rs ${Math.round(value || 0).toLocaleString('en-IN')}`
}

export default function AdminDashboard() {
  const token = localStorage.getItem('token')
  const [products, setProducts] = useState([])
  const [analytics, setAnalytics] = useState({
    totalOrders: 0,
    totalUnitsSold: 0,
    topSoldProducts: [],
    soldByCategory: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    Promise.all([
      fetch('http://localhost:5000/api/products').then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Unable to load products')
        return Array.isArray(data) ? data : []
      }),
      fetch('http://localhost:5000/api/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Unable to load dashboard analytics')
        return data
      })
    ])
      .then(([productData, analyticsData]) => {
        if (!active) return
        setProducts(productData)
        setAnalytics({
          totalOrders: Number(analyticsData?.totalOrders || 0),
          totalUnitsSold: Number(analyticsData?.totalUnitsSold || 0),
          topSoldProducts: Array.isArray(analyticsData?.topSoldProducts) ? analyticsData.topSoldProducts : [],
          soldByCategory: Array.isArray(analyticsData?.soldByCategory) ? analyticsData.soldByCategory : [],
        })
        setError('')
      })
      .catch((err) => {
        if (!active) return
        setError(err.message || 'Unable to load dashboard')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [token])

  const totalProducts = products.length
  const averagePrice = totalProducts
    ? products.reduce((sum, p) => sum + (p.price || 0), 0) / totalProducts
    : 0
  const saleProducts = products.filter(p => p.tag === 'Sale').length
  const newProducts = products.filter(p => p.tag === 'New').length

  const genderStats = ['Men', 'Women', 'Footwear', 'Accessories'].map(label => ({
    label,
    value: products.filter(p => p.gender === label).length
  }))

  const topCategories = Object.entries(
    products.reduce((acc, p) => {
      const key = Array.isArray(p.category) ? p.category[0] : p.category || 'Other'
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const topBrands = Object.entries(
    products.reduce((acc, p) => {
      acc[p.brand] = (acc[p.brand] || 0) + 1
      return acc
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 6)

  const maxGenderValue = Math.max(...genderStats.map(item => item.value), 1)
  const maxCategoryValue = Math.max(...topCategories.map(item => item[1]), 1)
  const maxSoldCategoryValue = Math.max(...analytics.soldByCategory.map(item => item[1]), 1)

  return (
    <AdminLayout
      title="Dashboard"
      subtitle="A live overview of products, category mix and store health."
    >
      {error && (
        <div className="admin-form-feedback admin-form-feedback-error" style={{ marginBottom: '14px' }}>
          {error}
        </div>
      )}

      <div className="admin-grid-cards">
        <div className="admin-stat-card admin-stat-card-blue">
          <div className="admin-stat-label">Total Products</div>
          <div className="admin-stat-value">{loading ? '--' : totalProducts}</div>
          <div className="admin-stat-note">Connected to your current product API</div>
        </div>
        <div className="admin-stat-card admin-stat-card-orange">
          <div className="admin-stat-label">Average Price</div>
          <div className="admin-stat-value">{loading ? '--' : formatPrice(averagePrice)}</div>
          <div className="admin-stat-note">Useful for pricing trend checks</div>
        </div>
        <div className="admin-stat-card admin-stat-card-green">
          <div className="admin-stat-label">New Tagged</div>
          <div className="admin-stat-value">{loading ? '--' : newProducts}</div>
          <div className="admin-stat-note">Products marked with the `New` tag</div>
        </div>
        <div className="admin-stat-card admin-stat-card-pink">
          <div className="admin-stat-label">Sale Tagged</div>
          <div className="admin-stat-value">{loading ? '--' : saleProducts}</div>
          <div className="admin-stat-note">Products currently showing sale urgency</div>
        </div>
        <div className="admin-stat-card admin-stat-card-blue">
          <div className="admin-stat-label">Units Sold</div>
          <div className="admin-stat-value">{loading ? '--' : analytics.totalUnitsSold}</div>
          <div className="admin-stat-note">Calculated from paid orders only</div>
        </div>
      </div>

      <div className="admin-two-col">
        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <div className="admin-panel-title">Inventory Mix</div>
              <div className="admin-panel-subtitle">Quick category-by-gender view</div>
            </div>
          </div>
          <div className="admin-bar-list">
            {genderStats.map(item => (
              <div key={item.label} className="admin-bar-row">
                <div className="admin-bar-meta">
                  <span>{item.label}</span>
                  <strong>{loading ? '--' : item.value}</strong>
                </div>
                <div className="admin-bar-track">
                  <div
                    className="admin-bar-fill admin-bar-fill-blue"
                    style={{ width: `${(item.value / maxGenderValue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <div className="admin-panel-title">Top Categories</div>
              <div className="admin-panel-subtitle">Best represented in your catalog</div>
            </div>
          </div>
          <div className="admin-bar-list">
            {topCategories.map(([label, value]) => (
              <div key={label} className="admin-bar-row">
                <div className="admin-bar-meta">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
                <div className="admin-bar-track">
                  <div
                    className="admin-bar-fill admin-bar-fill-pink"
                    style={{ width: `${(value / maxCategoryValue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="admin-two-col">
        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <div className="admin-panel-title">Top Brands</div>
              <div className="admin-panel-subtitle">Strongest brand presence right now</div>
            </div>
          </div>
          <div className="admin-mini-list">
            {topBrands.map(([brand, count], index) => (
              <div key={brand} className="admin-mini-row">
                <span className="admin-rank">{String(index + 1).padStart(2, '0')}</span>
                <span className="admin-mini-name">{brand}</span>
                <strong>{count}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <div className="admin-panel-title">Product Sold Analysis</div>
              <div className="admin-panel-subtitle">Top selling products from paid orders</div>
            </div>
          </div>
          <div className="admin-mini-list">
            {analytics.topSoldProducts.map((product, index) => (
              <div key={product.productId || `${product.name}-${index}`} className="admin-mini-row">
                <span className="admin-rank">{String(index + 1).padStart(2, '0')}</span>
                <span className="admin-mini-name">{product.name}</span>
                <strong>{product.soldUnits} sold</strong>
              </div>
            ))}
            {!loading && analytics.topSoldProducts.length === 0 && (
              <div className="admin-form-feedback">No paid orders yet.</div>
            )}
          </div>
        </section>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <div className="admin-panel-title">Sold Units By Category</div>
            <div className="admin-panel-subtitle">Category demand analysis from paid orders</div>
          </div>
          <div className="admin-inline-pill">
            {loading ? '--' : `${analytics.totalOrders} paid orders`}
          </div>
        </div>
        <div className="admin-bar-list">
          {analytics.soldByCategory.map(([label, value]) => (
            <div key={label} className="admin-bar-row">
              <div className="admin-bar-meta">
                <span>{label}</span>
                <strong>{value} sold</strong>
              </div>
              <div className="admin-bar-track">
                <div
                  className="admin-bar-fill admin-bar-fill-blue"
                  style={{ width: `${(value / maxSoldCategoryValue) * 100}%` }}
                />
              </div>
            </div>
          ))}
          {!loading && analytics.soldByCategory.length === 0 && (
            <div className="admin-form-feedback">No category sales data yet.</div>
          )}
        </div>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <div className="admin-panel-title">Recently Added Products</div>
            <div className="admin-panel-subtitle">Latest records from your current database</div>
          </div>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Brand</th>
                <th>Gender</th>
                <th>Category</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.map(product => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.gender}</td>
                  <td>{Array.isArray(product.category) ? product.category.join(', ') : product.category}</td>
                  <td>{formatPrice(product.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AdminLayout>
  )
}
