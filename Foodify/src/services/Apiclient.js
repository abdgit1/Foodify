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
// sent back. This backend has shown at least three different error shapes:
//   { "error": "User not Found" }                        ← a single top-level string
//   { "email": ["user with this email already exists."] } ← DRF field errors, array
//   { "email": "user with this email already exists." }   ← DRF field errors, plain string
function extractErrorMessage(data) {
  if (!data) return null;
  if (typeof data === 'string') return data;
  if (data.error) return data.error;
  if (data.message) return data.message;

  // Field-level validation shape — value can be either a string or an array of strings.
  // Grab the first field that has *something* in it, either way.
  for (const value of Object.values(data)) {
    if (typeof value === 'string' && value.trim()) return value;
    if (Array.isArray(value) && value.length > 0) return value[0];
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