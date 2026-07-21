import apiClient from "./apiClient";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Resolves an image path returned by the backend into a full URL.
 * Django's ImageField typically returns a relative path like "/media/restaurants/xyz.jpg".
 */
function resolveImageUrl(path) {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

/**
 * GET /restaurants/all-restaurant
 * Public endpoint. apiClient already unwraps the { data: [...] } envelope
 * and normalizes errors — this function just adds the image-URL fix-up.
 */
export async function getAllRestaurants() {
  const restaurants = await apiClient.get('/restaurants/all-restaurant');
  return restaurants.map((r) => ({ ...r, image: resolveImageUrl(r.image) }));
}

/**
 * GET /restaurants/restaurant/<id>
 * Public endpoint — restaurant details + nested menu_items[].
 */
export async function getRestaurantById(id) {
  const restaurant = await apiClient.get(`/restaurants/restaurant/${id}`);
  return {
    ...restaurant,
    image: resolveImageUrl(restaurant.image),
    menu_items: restaurant.menu_items?.map((item) => ({
      ...item,
      image: resolveImageUrl(item.image),
    })),
  };
}

/**
 * POST /restaurants/create-restaurant/ — Admin only.
 * payload: { name, description, address, is_featured, is_active }
 */
export async function createRestaurant(payload) {
  const formData = new FormData();

  formData.append('name', payload.name);
  formData.append('description', payload.description);
  formData.append('address', payload.address);
  formData.append('is_featured', payload.is_featured);
  formData.append('is_active', payload.is_active);

  if (payload.image) {
    formData.append('image', payload.image);
  }

  const restaurant = await apiClient.post(
    '/restaurants/create-restaurant/',
    formData
  );

  return {
    ...restaurant,
    image: resolveImageUrl(restaurant.image),
  };
}
/**
 * PATCH /restaurants/update-restaurant/<id>/ — Admin only. Partial payload.
 * Same FormData approach as createRestaurant, for the same reason: PATCH
 * with a plain JSON body can't carry a File.
 */
export async function updateRestaurant(id, payload) {
  const formData = new FormData();
 
  formData.append('name', payload.name);
  formData.append('description', payload.description);
  formData.append('address', payload.address);
  formData.append('is_featured', payload.is_featured);
  formData.append('is_active', payload.is_active);
 
  // Only attach image if it's an actual new File. After openEdit(), form.image
  // is undefined (it was never set from the fetched restaurant) unless the
  // user actively picks a new file via handleImageChange.
  if (payload.image instanceof File) {
    formData.append('image', payload.image);
  }
 
  const restaurant = await apiClient.patch(
    `/restaurants/update-restaurant/${id}/`,
    formData
  );
 
  return { ...restaurant, image: resolveImageUrl(restaurant.image) };
}


 

/**
 * DELETE /restaurants/delete-restaurant/<id>/ — Admin only.
 */
export async function deleteRestaurant(id) {
  return apiClient.delete(`/restaurants/delete-restaurant/${id}/`);
}
