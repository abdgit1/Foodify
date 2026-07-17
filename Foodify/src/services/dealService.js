import apiClient from './Apiclient';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const resolveImage = (path) =>
  !path ? null : path.startsWith('http') ? path : `${BASE_URL}${path}`;

function normalizeDeal(deal) {
  const items = deal.items || [];
  const firstItem = items[0]?.menu_item;

  // A deal can include items from more than one category in theory —
  // collect all of them so tab-filtering matches on any of them.
  const categoryNames = [
    ...new Set(items.map((i) => i.menu_item?.category?.name).filter(Boolean)),
  ];

  return {
    id: deal.id,
    restaurantId: deal.restaurant_id || firstItem?.restaurant?.id,
    name: deal.name,
    description: deal.description,
    comboPrice: deal.combo_price,
    image: resolveImage(deal.image) || resolveImage(firstItem?.restaurant?.image),
    restaurantLabel: firstItem?.restaurant?.name || 'Order.uk Exclusive',
    categoryNames,
    items: items.map((i) => ({
      id: i.id,
      quantity: i.quantity,
      name: i.menu_item?.name,
      price: i.menu_item?.price,
      image: resolveImage(i.menu_item?.image) || resolveImage(i.menu_item?.restaurant?.image),
      restaurantName: i.menu_item?.restaurant?.name,
      categoryName: i.menu_item?.category?.name,
    })),
  };
}

export async function getAllDeals() {
  const deals = await apiClient.get('/restaurants/all-deal/');
  return deals
    .filter((d) => d.is_active)
    .map(normalizeDeal)
    .filter((deal) => deal.items.length > 0); // hide deals with no item breakdown
}

export async function getDealById(id) {
  const deal = await apiClient.get(`/restaurants/deal/${id}/`);
  return normalizeDeal(deal);
}

// --- Admin-facing functions below ---
// The customer-facing getAllDeals()/getDealById() above filter out inactive
// deals and re-shape fields to camelCase for display. Admin needs the raw,
// unfiltered data (including inactive deals and deals with 0 items — those
// are exactly the ones an admin needs to see and fix) and the original
// snake_case field names, since those match what the backend actually
// accepts back on create/update.

/**
 * GET /restaurants/all-deal/ — admin view, unfiltered, raw shape.
 * Confirmed NOT thin: full items[] with nested menu_item objects come back
 * on the list call, unlike restaurants/menu-items.
 */
export async function getAllDealsRaw() {
  const deals = await apiClient.get('/restaurants/all-deal/');
  return deals.map((d) => ({ ...d, image: resolveImage(d.image) }));
}

/**
 * GET /restaurants/deal/<id>/ — admin view, raw shape.
 */
export async function getDealByIdRaw(id) {
  const deal = await apiClient.get(`/restaurants/deal/${id}/`);
  return { ...deal, image: resolveImage(deal.image) };
}

/**
 * POST /restaurants/create-deal/ — Admin only.
 * payload: { restaurant_id, name, description, combo_price, is_active, is_featured, image? }
 * restaurant_id is required here but the backend never echoes it back on
 * any subsequent read — it's create-only, not a field you can rely on for
 * editing later. See dealItemService.js for adding items to the deal
 * afterward (this endpoint does NOT accept items).
 */
export async function createDeal(payload) {
  const formData = new FormData();
  formData.append('restaurant_id', payload.restaurant_id);
  formData.append('name', payload.name);
  formData.append('description', payload.description);
  formData.append('combo_price', payload.combo_price);
  formData.append('is_active', payload.is_active);
  formData.append('is_featured', payload.is_featured);
  if (payload.image instanceof File) {
    formData.append('image', payload.image);
  }

  const deal = await apiClient.post('/restaurants/create-deal/', formData);
  return { ...deal, image: resolveImage(deal.image) };
}

/**
 * PATCH /restaurants/update-deal/<id>/ — Admin only. Partial payload.
 * Deliberately does NOT send restaurant_id — the docs' update example never
 * includes it, and there's nowhere for it to be echoed back on reads either.
 */
export async function updateDeal(id, payload) {
  const formData = new FormData();
  formData.append('name', payload.name);
  formData.append('description', payload.description);
  formData.append('combo_price', payload.combo_price);
  formData.append('is_active', payload.is_active);
  formData.append('is_featured', payload.is_featured);
  formData.append('restaurant_id', payload.restaurant_id);
  if (payload.image instanceof File) {
    formData.append('image', payload.image);
  }

  const deal = await apiClient.patch(`/restaurants/update-deal/${id}/`, formData);
  return { ...deal, image: resolveImage(deal.image) };
}

/**
 * DELETE /restaurants/delete-deal/<id>/ — Admin only.
 */
export async function deleteDeal(id) {
  return apiClient.delete(`/restaurants/delete-deal/${id}/`);
}