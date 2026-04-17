import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'

function formatPrice(value) {
  return `₹${Math.round(value || 0).toLocaleString('en-IN')}`
}

export default function AdminProducts() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [genderFilter, setGenderFilter] = useState('')
  const [brandFilter, setBrandFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [tagFilter, setTagFilter] = useState('')
  const [actionError, setActionError] = useState('')
  const [fetchError, setFetchError] = useState('')
  const [filterOptions, setFilterOptions] = useState({ brands: [], categories: [], tags: [] })
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  })

  const fetchProducts = async ({
    searchValue = '',
    genderValue = '',
    brandValue = '',
    categoryValue = '',
    tagValue = '',
    pageValue = 1,
  } = {}) => {
    setLoading(true)
    setFetchError('')

    const params = new URLSearchParams()
    const trimmedSearch = searchValue.trim()

    if (trimmedSearch) params.set('search', trimmedSearch)
    if (genderValue) params.set('gender', genderValue)
    if (brandValue) params.set('brand', brandValue)
    if (categoryValue) params.set('category', categoryValue)
    if (tagValue) params.set('tag', tagValue)
    params.set('page', String(pageValue))
    params.set('limit', '10')
    params.set('includeMeta', '1')

    try {
      const url = params.toString()
        ? `http://localhost:5000/api/products?${params.toString()}`
        : 'http://localhost:5000/api/products'

      const res = await fetch(url)
      const data = await res.json()

      if (!res.ok) {
        setFetchError(data.message || 'Unable to load products')
        setProducts([])
        return
      }

      setProducts(Array.isArray(data?.items) ? data.items : [])
      setPagination(data?.pagination || {
        page: pageValue,
        limit: 10,
        totalItems: 0,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
      })
      setFilterOptions(data?.filters || { brands: [], categories: [], tags: [] })
    } catch (_err) {
      setFetchError('Something went wrong while loading products')
      setProducts([])
      setPagination(prev => ({ ...prev, totalItems: 0, totalPages: 1, hasNextPage: false, hasPrevPage: false }))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      fetchProducts({
        searchValue: search,
        genderValue: genderFilter,
        brandValue: brandFilter,
        categoryValue: categoryFilter,
        tagValue: tagFilter,
        pageValue: 1,
      })
    }, 250)
    return () => window.clearTimeout(timeoutId)
  }, [search, genderFilter, brandFilter, categoryFilter, tagFilter])

  useEffect(() => {
    if (brandFilter && !filterOptions.brands.includes(brandFilter)) {
      setBrandFilter('')
    }
  }, [brandFilter, filterOptions.brands])

  const goToPage = (nextPage) => {
    if (nextPage < 1 || nextPage > pagination.totalPages || nextPage === pagination.page) return
    fetchProducts({
      searchValue: search,
      genderValue: genderFilter,
      brandValue: brandFilter,
      categoryValue: categoryFilter,
      tagValue: tagFilter,
      pageValue: nextPage,
    })
  }

  const handleDelete = async (productId) => {
    const shouldDelete = window.confirm('Do you want to delete this product?')
    if (!shouldDelete) return

    try {
      setActionError('')
      const res = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (!res.ok) {
        setActionError(data.message || 'Unable to delete product')
        return
      }
      const nextPage = products.length === 1 && pagination.page > 1
        ? pagination.page - 1
        : pagination.page

      fetchProducts({
        searchValue: search,
        genderValue: genderFilter,
        brandValue: brandFilter,
        categoryValue: categoryFilter,
        tagValue: tagFilter,
        pageValue: nextPage,
      })
    } catch (_err) {
      setActionError('Something went wrong while deleting the product')
    }
  }

  return (
    <AdminLayout
      title="Products"
      subtitle="A clean management base for your catalog with search and filtering."
    >
      <section className="admin-panel">
        <div className="admin-panel-header admin-panel-header-stack">
          <div>
            <div className="admin-panel-title">Catalog Control</div>
            <div className="admin-panel-subtitle">Browse current products .</div>
          </div>
          <div className="admin-toolbar">
            <input
              className="admin-input"
              placeholder="Search by name, brand or category"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="admin-select"
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <option value="">All Departments</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Footwear">Footwear</option>
              <option value="Accessories">Accessories</option>
            </select>
            <select
              className="admin-select"
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
            >
              <option value="">All Brands</option>
              {filterOptions.brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
            <select
              className="admin-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {filterOptions.categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              className="admin-select"
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
            >
              <option value="">All Tags</option>
              {filterOptions.tags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
            <button className="admin-primary-btn" type="button" onClick={() => navigate('/admin/products/new')}>
              Add Product
            </button>
          </div>
        </div>

        <div className="admin-stat-strip">
          <div><strong>{loading ? '--' : pagination.totalItems}</strong><span>Matching products</span></div>
          <div><strong>{genderFilter || 'All'}</strong><span>Current department</span></div>
          <div><strong>{brandFilter || tagFilter || categoryFilter || 'Any filter'}</strong><span>Extra admin filters</span></div>
          <div><strong>Page {pagination.page} / {pagination.totalPages}</strong><span>Live API with pagination</span></div>
        </div>

        {fetchError && (
          <div className="admin-form-feedback admin-form-feedback-error" style={{ marginBottom: '14px' }}>
            {fetchError}
          </div>
        )}

        {actionError && (
          <div className="admin-form-feedback admin-form-feedback-error" style={{ marginBottom: '14px' }}>
            {actionError}
          </div>
        )}

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Department</th>
                <th>Category</th>
                <th>Price</th>
                <th>Tag</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {!loading && products.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '28px 12px', color: '#64748b' }}>
                    No products found for the current search and department filter.
                  </td>
                </tr>
              )}

              {products.map(product => (
                <tr key={product._id}>
                  <td>
                    <img className="admin-table-thumb" src={product.image} alt={product.name} />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.gender}</td>
                  <td>{Array.isArray(product.category) ? product.category.join(', ') : product.category}</td>
                  <td>{formatPrice(product.price)}</td>
                  <td>
                    <span className="admin-inline-pill">{product.tag || 'None'}</span>
                  </td>
                  <td>
                    <div className="admin-row-actions">
                      <button className="admin-ghost-btn" type="button" onClick={() => navigate(`/admin/products/${product._id}/edit`)}>
                        Edit
                      </button>
                      <button className="admin-ghost-btn admin-ghost-btn-danger" type="button" onClick={() => handleDelete(product._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-pagination">
          <div className="admin-pagination-copy">
            Showing {products.length} of {loading ? '--' : pagination.totalItems} products
          </div>
          <div className="admin-pagination-actions">
            <button
              className="admin-ghost-btn"
              type="button"
              onClick={() => goToPage(pagination.page - 1)}
              disabled={loading || !pagination.hasPrevPage}
            >
              Previous
            </button>
            <span className="admin-pagination-page">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              className="admin-ghost-btn"
              type="button"
              onClick={() => goToPage(pagination.page + 1)}
              disabled={loading || !pagination.hasNextPage}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </AdminLayout>
  )
}
