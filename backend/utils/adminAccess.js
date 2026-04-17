function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function getSuperAdminEmails() {
  return [
    process.env.SUPER_ADMIN_EMAIL,
    process.env.ADMIN_EMAIL,
    ...(process.env.SUPER_ADMIN_EMAILS || '').split(','),
  ]
    .map(normalizeEmail)
    .filter(Boolean);
}

function isSuperAdmin(email) {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) return false;

  return getSuperAdminEmails().includes(normalizedEmail);
}

function getRole(user) {
  if (isSuperAdmin(user?.email)) {
    return 'admin';
  }

  return user?.role === 'admin' ? 'admin' : 'user';
}

module.exports = {
  getRole,
  isSuperAdmin,
};
