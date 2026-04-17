import { useCallback, useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'

const API_BASE = 'http://localhost:5000/api/user/admin/users'

async function readApiResponse(res) {
  const raw = await res.text()

  try {
    return raw ? JSON.parse(raw) : {}
  } catch {
    return { message: raw }
  }
}

function getApiErrorMessage(res, data, fallback) {
  if (res.status === 404) {
    return 'Admin users API not found. Restart the backend server once.'
  }

  if (res.status === 401) {
    return 'Your admin session expired. Please login again.'
  }

  if (res.status === 403) {
    return data?.message || 'This account does not have admin access.'
  }

  return data?.message || fallback
}

function formatDate(value) {
  if (!value) return 'Unknown'

  try {
    return new Date(value).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  } catch {
    return 'Unknown'
  }
}

export default function AdminUsers() {
  const token = localStorage.getItem('token')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [busyKey, setBusyKey] = useState('')

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const res = await fetch(API_BASE, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      const data = await readApiResponse(res)

      if (!res.ok) {
        setError(getApiErrorMessage(res, data, 'Unable to load users'))
        setUsers([])
        return
      }

      setUsers(Array.isArray(data) ? data : [])
    } catch (_err) {
      setError('Something went wrong while loading users')
      setUsers([])
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  const showMessage = (nextMessage, type = 'success') => {
    if (type === 'error') {
      setError(nextMessage)
      setMessage('')
      return
    }

    setMessage(nextMessage)
    setError('')
  }

  const updateRole = async (user, role) => {
    setBusyKey(`role-${user.id}`)
    showMessage('')

    try {
      const res = await fetch(`${API_BASE}/${user.id}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ role })
      })
      const data = await readApiResponse(res)

      if (!res.ok) {
        showMessage(getApiErrorMessage(res, data, 'Unable to update role'), 'error')
        return
      }

      showMessage(data.message || 'Role updated successfully')
      loadUsers()
    } catch (_err) {
      showMessage('Something went wrong while updating role', 'error')
    } finally {
      setBusyKey('')
    }
  }

  const toggleStatus = async (user) => {
    const nextBlocked = !user.isBlocked
    setBusyKey(`status-${user.id}`)
    showMessage('')

    try {
      const res = await fetch(`${API_BASE}/${user.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isBlocked: nextBlocked })
      })
      const data = await readApiResponse(res)

      if (!res.ok) {
        showMessage(getApiErrorMessage(res, data, 'Unable to update status'), 'error')
        return
      }

      showMessage(data.message || 'Status updated successfully')
      loadUsers()
    } catch (_err) {
      showMessage('Something went wrong while updating status', 'error')
    } finally {
      setBusyKey('')
    }
  }

  const totalAdmins = users.filter(user => user.role === 'admin').length
  const blockedUsers = users.filter(user => user.isBlocked).length

  return (
    <AdminLayout
      title="Users"
      subtitle="Manage real user accounts, admin roles and account status."
    >
      <section className="admin-panel">
        <div className="admin-panel-header admin-panel-header-stack">
          <div>
            <div className="admin-panel-title">User Management</div>
            <div className="admin-panel-subtitle">Live data from your backend with role and block controls.</div>
          </div>
          <button className="admin-ghost-btn" type="button" onClick={loadUsers} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        <div className="admin-stat-strip">
          <div><strong>{loading ? '--' : users.length}</strong><span>Total users</span></div>
          <div><strong>{loading ? '--' : totalAdmins}</strong><span>Admins</span></div>
          <div><strong>{loading ? '--' : blockedUsers}</strong><span>Blocked</span></div>
          <div><strong>{loading ? '--' : users.length - blockedUsers}</strong><span>Active</span></div>
        </div>

        {error && (
          <div className="admin-form-feedback admin-form-feedback-error" style={{ marginBottom: '14px' }}>
            {error}
          </div>
        )}

        {message && (
          <div className="admin-form-feedback admin-form-feedback-success" style={{ marginBottom: '14px' }}>
            {message}
          </div>
        )}

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {!loading && users.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '28px 12px', color: '#64748b' }}>
                    No users found in the database.
                  </td>
                </tr>
              )}

              {users.map(user => {
                const roleBusy = busyKey === `role-${user.id}`
                const statusBusy = busyKey === `status-${user.id}`

                return (
                  <tr key={user.id}>
                    <td>{user.name || 'Unnamed User'}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className="admin-inline-pill">
                        {user.role}{user.isSuperAdmin ? ' / super' : ''}
                      </span>
                    </td>
                    <td>{user.isBlocked ? 'Blocked' : 'Active'}</td>
                    <td>{formatDate(user.createdAt)}</td>
                    <td>
                      <div className="admin-row-actions">
                        <button
                          className="admin-ghost-btn"
                          type="button"
                          disabled={roleBusy || user.isSuperAdmin}
                          onClick={() => updateRole(user, user.role === 'admin' ? 'user' : 'admin')}
                        >
                          {roleBusy ? 'Saving...' : user.role === 'admin' ? 'Make User' : 'Make Admin'}
                        </button>
                        <button
                          className={`admin-ghost-btn${user.isBlocked ? '' : ' admin-ghost-btn-danger'}`}
                          type="button"
                          disabled={statusBusy || user.isSuperAdmin}
                          onClick={() => toggleStatus(user)}
                        >
                          {statusBusy ? 'Saving...' : user.isBlocked ? 'Unblock' : 'Block'}
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </AdminLayout>
  )
}
