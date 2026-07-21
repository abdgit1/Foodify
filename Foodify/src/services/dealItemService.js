import apiClient from "./apiClient";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const resolveImage = (path) =>
  !path ? null : path.startsWith('http') ? path : `${BASE_URL}${path}`;

function normalizeDealItem(item) {
  return {
    ...item,
    menu_item: item.menu_item
      ? { ...item.menu_item, image: resolveImage(item.menu_item.image) }
      : null,
  };
}

/**
 * GET /restaurants/all-deal-item/ — Public.
 * Each item includes deal_id, menu_item_id, quantity, and the full
 * nested menu_item object (name, price, image, restaurant, category).
 */
export async function getAllDealItems() {
  const items = await apiClient.get('/restaurants/all-deal-item/');
  return items.map(normalizeDealItem);
}

/**
 * GET /restaurants/deal-item/<id>/ — Public.
 */
export async function getDealItemById(id) {
  const item = await apiClient.get(`/restaurants/deal-item/${id}/`);
  return normalizeDealItem(item);
}

/**
 * POST /restaurants/create-deal-item/ — Admin only.
 * payload: { deal_id, menu_item_id, quantity }
 * Plain JSON — no image involved at the deal-item level.
 */
export async function createDealItem(payload) {
  const item = await apiClient.post('/restaurants/create-deal-item/', payload);
  return normalizeDealItem(item);
}

/**
 * PATCH /restaurants/update-deal-item/<id>/ — Admin only.
 * Only quantity is realistically editable — swapping deal_id/menu_item_id
 * on an existing row doesn't make much sense; delete + re-add instead.
 * payload: { quantity }
 */
export async function updateDealItem(id, payload) {
  const item = await apiClient.patch(`/restaurants/update-deal-item/${id}/`, payload);
  return normalizeDealItem(item);
}

/**
 * DELETE /restaurants/delete-deal-item/<id>/ — Admin only.
 */
export async function deleteDealItem(id) {
  return apiClient.delete(`/restaurants/delete-deal-item/${id}/`);
}
