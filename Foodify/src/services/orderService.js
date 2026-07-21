import apiClient from "./apiClient";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Resolves an image path returned by the backend into a full URL.
 */
function resolveImageUrl(path) {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

/**
 * GET /order/orders/
 * Returns all orders for the authenticated user.
 */
export async function getUserOrders() {
  const orders = await apiClient.get('/order/orders/');
  return orders.map((order) => ({
    ...order,
    items: order.items?.map((item) => ({
      ...item,
      image: resolveImageUrl(item.image),
    })),
  }));
}

/**
 * GET /order/order/<order_id>
 * Returns details for a specific order.
 */
export async function getOrderDetails(orderId) {
  const order = await apiClient.get(`/order/order/${orderId}`);
  return {
    ...order,
    items: order.items?.map((item) => ({
      ...item,
      image: resolveImageUrl(item.image),
    })),
  };
}

/**
 * POST /order/order/<order_id>/cancel/
 * Cancels a pending order.
 */
export async function cancelOrder(orderId) {
  return apiClient.post(`/order/order/${orderId}/cancel/`);
}
