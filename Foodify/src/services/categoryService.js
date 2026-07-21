import apiClient from "./apiClient";

/**
 * GET /restaurants/all-category
 * Public. { id, name, created_by, created_at }
 */
export async function getAllCategories() {
  return apiClient.get('/restaurants/all-category');
}

/**
 * POST /restaurants/create-category/ — Admin only.
 * payload: { name }
 */
export async function createCategory(payload) {
  return apiClient.post('/restaurants/create-category/', payload);
}

/**
 * PATCH /restaurants/update-category/<id>/ — Admin only.
 * payload: { name }
 */
export async function updateCategory(id, payload) {
  return apiClient.patch(`/restaurants/update-category/${id}/`, payload);
}

/**
 * DELETE /restaurants/delete-category/<id>/ — Admin only.
 */
export async function deleteCategory(id) {
  return apiClient.delete(`/restaurants/delete-category/${id}/`);
}
