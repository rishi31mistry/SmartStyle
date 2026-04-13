import { Navigate, useLocation } from 'react-router-dom'
import { clearAdminSession, isAdminSessionActive } from '../utils/adminSession'

export default function AdminRoute({ children }) {
  const location = useLocation()
  const isAdminAuthed = isAdminSessionActive()

  if (!isAdminAuthed) {
    clearAdminSession()
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return children
}
