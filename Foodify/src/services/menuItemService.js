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