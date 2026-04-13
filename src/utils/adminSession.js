export function getAdminUser() {
  try {
    return JSON.parse(localStorage.getItem('adminUser') || 'null')
  } catch {
    return null
  }
}

export function isAdminSessionActive() {
  const adminUser = getAdminUser()
  const hasAdminFlag = localStorage.getItem('adminAuthenticated') === 'true'
  const token = localStorage.getItem('token')

  return Boolean(hasAdminFlag && token && adminUser?.role === 'admin')
}

export function clearAdminSession() {
  localStorage.removeItem('adminAuthenticated')
  localStorage.removeItem('adminUser')
}
