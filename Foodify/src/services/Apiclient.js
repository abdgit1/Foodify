import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Pulls a clean, human-readable message out of whatever shape the backend
// sent back. This backend has shown at least these shapes, and mixes them:
//   { "error": "User not Found" }                          ← a single top-level string
//   { "detail": "Authentication credentials were not provided." } ← DRF auth errors
//   { "error": { "detail": "..." } }                        ← DRF auth error, nested under "error"
//   { "email": ["user with this email already exists."] }   ← DRF field errors, array
//   { "email": "user with this email already exists." }     ← DRF field errors, plain string
function extractErrorMessage(data) {
  if (!data) return null;
  if (typeof data === 'string') return data;

  if (Array.isArray(data)) {
    for (const item of data) {
      const found = extractErrorMessage(item);
      if (found) return found;
    }
    return null;
  }

  if (typeof data === 'object') {
    // Prefer these keys, but recurse into them — the value behind any of
    // them might itself be a nested shape rather than a plain string.
    for (const key of ['detail', 'error', 'message']) {
      if (key in data) {
        const found = extractErrorMessage(data[key]);
        if (found) return found;
      }
    }

    // Field-level validation shape — grab the first field that has
    // *something* in it, whatever shape that turns out to be.
    for (const value of Object.values(data)) {
      const found = extractErrorMessage(value);
      if (found) return found;
    }
  }

  return null;
}

apiClient.interceptors.response.use(
  (res) => (res.config.skipUnwrap ? res.data : res.data?.data ?? res.data),
  (err) => {
    const message = extractErrorMessage(err.response?.data) || err.message;
    return Promise.reject(new Error(message));
  }
);

export default apiClient;