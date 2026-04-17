import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'

const genders = ['Men', 'Women', 'Footwear', 'Accessories']
const tags = ['', 'New', 'Sale', 'Trending', 'Hot', 'Popular', 'Bestseller']

export default function AdminAddProduct() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [form, setForm] = useState({
    name: '',
    brand: '',
    gender: 'Men',
    subGender: '',
    category: '',
    price: '',
    originalPrice: '',
    rating: '4.0',
    tag: '',
    color: '',
    image: '',
    sizes: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'gender' && value !== 'Footwear' && value !== 'Accessories'
        ? { subGender: '' }
        : {})
    }))
    setError('')
    setMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (!form.name || !form.brand || !form.category || !form.price || !form.image) {
      setError('Please fill all required fields')
      return
    }

    const payload = {
      name: form.name.trim(),
      brand: form.brand.trim(),
      gender: form.gender,
      category: form.category.includes(',')
        ? form.category.split(',').map(item => item.trim()).filter(Boolean)
        : form.category.trim(),
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      rating: form.rating ? Number(form.rating) : 0,
      tag: form.tag || null,
      color: form.color.trim(),
      image: form.image.trim(),
      sizes: form.sizes
        ? form.sizes.split(',').map(size => size.trim()).filter(Boolean)
        : []
    }

    if ((form.gender === 'Footwear' || form.gender === 'Accessories') && form.subGender) {
      payload.subGender = form.subGender.trim()
    }

    try {
      setLoading(true)
      const res = await fetch('http://localhost:5000/api/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Unable to add product')
        return
      }

      setMessage('Product added successfully')
      setTimeout(() => navigate('/admin/products'), 900)
    } catch (_err) {
      setError('Something went wrong while adding product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout
      title="Add Product"
      subtitle="Create a new product entry for your catalog."
    >
      <section className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <div className="admin-panel-title">New Product Form</div>
            <div className="admin-panel-subtitle">Required fields are enough to get a product live quickly.</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="admin-form-grid">
          <input
            className="admin-input"
            name="name"
            placeholder="Product name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            className="admin-input"
            name="brand"
            placeholder="Brand"
            value={form.brand}
            onChange={handleChange}
          />

          <select className="admin-select" name="gender" value={form.gender} onChange={handleChange}>
            {genders.map(option => <option key={option} value={option}>{option}</option>)}
          </select>
          <input
            className="admin-input"
            name="subGender"
            placeholder="Sub gender (for Footwear/Accessories)"
            value={form.subGender}
            onChange={handleChange}
          />

          <input
            className="admin-input"
            name="category"
            placeholder="Category or comma-separated categories"
            value={form.category}
            onChange={handleChange}
          />
          <input
            className="admin-input"
            name="color"
            placeholder="Color"
            value={form.color}
            onChange={handleChange}
          />

          <input
            className="admin-input"
            name="price"
            type="number"
            min="0"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />
          <input
            className="admin-input"
            name="originalPrice"
            type="number"
            min="0"
            placeholder="Original price"
            value={form.originalPrice}
            onChange={handleChange}
          />

          <input
            className="admin-input"
            name="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            placeholder="Rating"
            value={form.rating}
            onChange={handleChange}
          />
          <select className="admin-select" name="tag" value={form.tag} onChange={handleChange}>
            {tags.map(option => (
              <option key={option || 'none'} value={option}>
                {option || 'No tag'}
              </option>
            ))}
          </select>

          <input
            className="admin-input admin-form-span-2"
            name="image"
            placeholder="Image path or URL"
            value={form.image}
            onChange={handleChange}
          />
          <div className="admin-form-span-2">
            <div className="admin-preview-label">Image Preview</div>
            {form.image ? (
              <div className="admin-image-preview">
                <img src={form.image} alt="Product preview" />
              </div>
            ) : (
              <div className="admin-image-preview admin-image-preview-empty">
                Add an image path to preview it here
              </div>
            )}
          </div>
          <input
            className="admin-input admin-form-span-2"
            name="sizes"
            placeholder="Sizes, comma-separated (example: S, M, L, XL)"
            value={form.sizes}
            onChange={handleChange}
          />

          {error && <div className="admin-form-feedback admin-form-feedback-error">{error}</div>}
          {message && <div className="admin-form-feedback admin-form-feedback-success">{message}</div>}

          <div className="admin-form-actions admin-form-span-2">
            <button type="button" className="admin-ghost-btn" onClick={() => navigate('/admin/products')}>
              Cancel
            </button>
            <button type="submit" className="admin-primary-btn" disabled={loading}>
              {loading ? 'Adding Product...' : 'Add Product'}
            </button>
          </div>
        </form>
      </section>
    </AdminLayout>
  )
}
