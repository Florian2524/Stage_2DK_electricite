// resources/js/lib/api.js
// Wrapper fetch simple pour Laravel Sanctum (SPA) — dev local
const baseURL = 'http://localhost:8080';

// --- Utils ---
function getXsrfFromCookie() {
  // Lit le cookie XSRF-TOKEN pour l'envoyer dans l'en-tête X-XSRF-TOKEN
  const raw = (document.cookie.split('; ').find(c => c.startsWith('XSRF-TOKEN=')) || '').split('=')[1] || '';
  try { return decodeURIComponent(raw); } catch { return raw; }
}

async function ensureCsrf() {
  // Appelle /sanctum/csrf-cookie si le cookie XSRF-TOKEN est absent
  if (!getXsrfFromCookie()) {
    await fetch(`${baseURL}/sanctum/csrf-cookie`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    });
  }
}

async function request(method, path, { body, headers = {}, retryOn419 = true } = {}) {
  const url = path.startsWith('http') ? path : `${baseURL}${path}`;

  // Corps : JSON par défaut sauf si FormData
  const isFormData = (body instanceof FormData);
  const finalHeaders = {
    'X-Requested-With': 'XMLHttpRequest',
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...headers
  };

  // Pour POST/PUT/PATCH/DELETE : s'assurer du CSRF + header X-XSRF-TOKEN
  if (!['GET', 'HEAD', 'OPTIONS'].includes(method.toUpperCase())) {
    await ensureCsrf();
    const xsrf = getXsrfFromCookie();
    if (xsrf) finalHeaders['X-XSRF-TOKEN'] = xsrf;
  }

  const res = await fetch(url, {
    method,
    credentials: 'include',
    headers: finalHeaders,
    body: isFormData ? body : (body !== undefined ? JSON.stringify(body) : undefined)
  });

  // Retry unique si 419 (token CSRF expiré / onglet neuf)
  if (res.status === 419 && retryOn419 && !['GET', 'HEAD', 'OPTIONS'].includes(method.toUpperCase())) {
    await ensureCsrf();
    return request(method, path, { body, headers, retryOn419: false });
  }

  // Tenter de parser JSON (sinon renvoyer vide)
  let data = null;
  const text = await res.text().catch(() => '');
  try { data = text ? JSON.parse(text) : null; } catch { data = text || null; }

  if (!res.ok) {
    const err = new Error(`HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

// --- API publique ---
const api = {
  baseURL,
  ensureCsrf,
  get:  (path)            => request('GET',    path),
  post: (path, body)      => request('POST',   path, { body }),
  put:  (path, body)      => request('PUT',    path, { body }),
  del:  (path)            => request('DELETE', path),

  // Auth helpers
  login:  (credentials)   => api.post('/api/auth/login', credentials),
  logout: ()              => api.post('/api/auth/logout'),
  me:     ()              => api.get('/api/admin/me'),
};

export default api;
