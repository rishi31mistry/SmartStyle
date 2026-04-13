import AdminLayout from '../components/AdminLayout'

export default function AdminUsers() {
  const currentUser = JSON.parse(localStorage.getItem('user') || 'null')

  const mockUsers = [
    { name: currentUser?.name || 'Current User', email: currentUser?.email || 'admin@smartstyle.com', role: 'Admin', status: 'Active' },
    { name: 'Aarav Sharma', email: 'aarav@example.com', role: 'User', status: 'Active' },
    { name: 'Riya Kapoor', email: 'riya@example.com', role: 'User', status: 'Active' },
    { name: 'Neha Singh', email: 'neha@example.com', role: 'Editor', status: 'Pending Role API' }
  ]

  return (
    <AdminLayout
      title="Users"
      subtitle="A strong base for role management, access control and user operations."
    >
      <div className="admin-two-col">
        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <div className="admin-panel-title">User Management Base</div>
              <div className="admin-panel-subtitle">Frontend view now, backend role system next.</div>
            </div>
          </div>
          <div className="admin-note-stack">
            <div className="admin-note-card">Add `role` to `User` schema with values like `user`, `editor`, `admin`.</div>
            <div className="admin-note-card">Protect admin APIs with middleware that checks both token and role.</div>
            <div className="admin-note-card">Create endpoints to list users, update roles, and block/unblock accounts.</div>
          </div>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <div className="admin-panel-title">Planned Controls</div>
              <div className="admin-panel-subtitle">Recommended capabilities for your next step</div>
            </div>
          </div>
          <div className="admin-feature-grid">
            <div className="admin-feature-card">Role assignment</div>
            <div className="admin-feature-card">Account status toggle</div>
            <div className="admin-feature-card">Profile activity logs</div>
            <div className="admin-feature-card">Password reset support</div>
          </div>
        </section>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <div className="admin-panel-title">User Table Preview</div>
            <div className="admin-panel-subtitle">A ready UI shell for real admin user APIs</div>
          </div>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map(user => (
                <tr key={user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td><span className="admin-inline-pill">{user.role}</span></td>
                  <td>{user.status}</td>
                  <td>
                    <div className="admin-row-actions">
                      <button className="admin-ghost-btn" type="button">Change Role</button>
                      <button className="admin-ghost-btn" type="button">View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AdminLayout>
  )
}
