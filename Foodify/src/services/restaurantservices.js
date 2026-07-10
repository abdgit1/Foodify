import apiClient from './Apiclient';

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