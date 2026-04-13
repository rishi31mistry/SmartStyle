import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/admin.css'
import { clearAdminSession } from '../utils/adminSession'

const navItems = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Products', path: '/admin/products' },
  { label: 'Users', path: '/admin/users' },
  { label: 'Settings', path: '/admin/settings' },
  { label: 'Admins', path: '/admin/admins' }
]

export default function AdminLayout({ title, subtitle, children }) {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('adminUser') || localStorage.getItem('user') || 'null')

  const handleAdminLogout = () => {
    clearAdminSession()
    navigate('/admin/login')
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand-block">
          <div className="admin-brand-kicker">SmartStyle Control</div>
          <div className="admin-brand-title">Admin Panel</div>
       
        </div>

        <nav className="admin-nav">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `admin-nav-link${isActive ? ' admin-nav-link-active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-chip">
            <div className="admin-user-avatar">
              {(user?.name || 'A').slice(0, 1).toUpperCase()}
            </div>
            <div>
              <div className="admin-user-name">{user?.name || 'Admin User'}</div>
             
            </div>
          </div>
          <button className="admin-outline-btn" onClick={() => navigate('/home')}>
            Back To Store
          </button>
          <button className="admin-outline-btn" onClick={handleAdminLogout}>
            Admin Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <div className="admin-page-title">{title}</div>
            <div className="admin-page-subtitle">{subtitle}</div>
          </div>

        </header>

        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  )
}
