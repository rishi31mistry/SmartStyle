const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || ''

function normalizeBaseUrl(baseUrl) {
  return baseUrl.replace(/\/+$/, '')
}

export const API_BASE_URL = normalizeBaseUrl(rawApiBaseUrl)

export function buildApiUrl(path) {
  if (!path || typeof path !== 'string') {
    return path
  }

  if (!path.startsWith('/api')) {
    return path
  }

  if (!API_BASE_URL) {
    return path
  }

  return `${API_BASE_URL}${path}`
}

export function apiFetch(input, init) {
  if (typeof input === 'string') {
    return window.fetch(buildApiUrl(input), init)
  }

  if (input instanceof Request) {
    return window.fetch(new Request(buildApiUrl(input.url), input), init)
  }

  return window.fetch(input, init)
}

export function installApiFetchInterceptor() {
  if (typeof window === 'undefined' || window.__smartStyleApiFetchInstalled) {
    return
  }

  const nativeFetch = window.fetch.bind(window)

  window.fetch = (input, init) => {
    if (typeof input === 'string') {
      return nativeFetch(buildApiUrl(input), init)
    }

    if (input instanceof Request) {
      return nativeFetch(new Request(buildApiUrl(input.url), input), init)
    }

    return nativeFetch(input, init)
  }

  window.__smartStyleApiFetchInstalled = true
}
