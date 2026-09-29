const API_BASE = '/api';

/**
 * Universal JSON request helper with automatic error handling
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || `HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`[GlowTrack API] Request failed for ${endpoint}:`, error.message);
    throw error;
  }
}

export const api = {
  // Bootstrap data (loads everything in one call)
  getBootstrapData: () => request('/init'),

  // Health check
  checkHealth: () => request('/health'),

  // User profile
  getUserProfile: () => request('/user'),
  updateUserProfile: (userData) => request('/user', { method: 'PUT', body: JSON.stringify(userData) }),
  updateSkinType: (skinType) => request('/user/skintype', { method: 'PUT', body: JSON.stringify({ skinType }) }),
  addConcern: (concern) => request('/user/concerns', { method: 'POST', body: JSON.stringify({ concern }) }),
  removeConcern: (concern) => request(`/user/concerns/${encodeURIComponent(concern)}`, { method: 'DELETE' }),
  updateReminders: (reminders) => request('/user/reminders', { method: 'PUT', body: JSON.stringify(reminders) }),

  // Routines
  getRoutines: () => request('/routines'),
  toggleRoutineStep: (type, id) => request(`/routines/${type}/steps/${id}/toggle`, { method: 'PATCH' }),
  addRoutineStep: (type, step) => request(`/routines/${type}/steps`, { method: 'POST', body: JSON.stringify(step) }),
  deleteRoutineStep: (type, id) => request(`/routines/${type}/steps/${id}`, { method: 'DELETE' }),

  // Hydration
  getHydration: () => request('/hydration'),
  updateHydration: (waterGlasses) => request('/hydration', { method: 'PUT', body: JSON.stringify({ waterGlasses }) }),

  // Diet & Nutrition
  getDiet: () => request('/diet'),
  addFood: (name, category) => request('/diet', { method: 'POST', body: JSON.stringify({ name, category }) }),
  deleteFood: (category, name) => request(`/diet/${category}/${encodeURIComponent(name)}`, { method: 'DELETE' }),

  // Products
  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/products${query ? `?${query}` : ''}`);
  },
  toggleProductFavorite: (id) => request(`/products/${id}/favorite`, { method: 'PATCH' }),
  addProduct: (product) => request('/products', { method: 'POST', body: JSON.stringify(product) }),

  // Progress
  getProgress: () => request('/progress'),
  updateStreaks: (streakDays, longestStreak) => request('/progress/streaks', { method: 'PUT', body: JSON.stringify({ streakDays, longestStreak }) })
};

export default api;
