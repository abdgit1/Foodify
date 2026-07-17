import apiClient from './apiClient';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const resolveImage = (path) =>
  !path ? null : path.startsWith('http') ? path : `${BASE_URL}${path}`;

export async function getAllMenuItems() {
  const items = await apiClient.get('/restaurants/all-menuitem');

  return items.map((item) => ({
    ...item,
    image: resolveImage(item.image),
    restaurant: { ...item.restaurant, image: resolveImage(item.restaurant.image) },
  }));
}
 
/**
 * GET /restaurants/menuitem/<id>
 * Public — full detail, same fields as Create's response.
 */
export async function getMenuItemById(id) {
  const item = await apiClient.get(`/restaurants/menuitem/${id}`);
  return { ...item, image: resolveImage(item.image) };
}
 
/**
 * POST /restaurants/create-menuitem/ — Admin only.
 * payload: { restaurant_id, category_id, name, description, price, is_available, is_featured, image? }
 */
export async function createMenuItem(payload) {
  const formData = new FormData();
  formData.append('restaurant_id', payload.restaurant_id);
  formData.append('category_id', payload.category_id);
  formData.append('name', payload.name);
  formData.append('description', payload.description);
  formData.append('price', payload.price);
  formData.append('is_available', payload.is_available);
  formData.append('is_featured', payload.is_featured);
  if (payload.image instanceof File) {
    formData.append('image', payload.image);
  }
 
  const item = await apiClient.post('/restaurants/create-menuitem/', formData);
  return { ...item, image: resolveImage(item.image) };
}
 
/**
 * PATCH /restaurants/update-menuitem/<id>/ — Admin only. Partial payload.
 */
export async function updateMenuItem(id, payload) {
  const formData = new FormData();
  formData.append('restaurant_id', payload.restaurant_id);
  formData.append('category_id', payload.category_id);
  formData.append('name', payload.name);
  formData.append('description', payload.description);
  formData.append('price', payload.price);
  formData.append('is_available', payload.is_available);
  formData.append('is_featured', payload.is_featured);
  if (payload.image instanceof File) {
    formData.append('image', payload.image);
  }
 
  const item = await apiClient.patch(`/restaurants/update-menuitem/${id}/`, formData);
  return { ...item, image: resolveImage(item.image) };
}
 
/**
 * DELETE /restaurants/delete-menuitem/<id>/ — Admin only.
 */
export async function deleteMenuItem(id) {
  return apiClient.delete(`/restaurants/delete-menuitem/${id}/`);
}
