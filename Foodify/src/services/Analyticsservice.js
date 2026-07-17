 import apiClient from './Apiclient';

/**
 * GET /order/admin/analytics/overview/
 * → { total_orders, total_revenue, active_restaurants, total_users }
 */
export async function getOverview() {
  return apiClient.get('/order/admin/analytics/overview/');
}

/**
 * GET /order/admin/analytics/revenue-over-time/?range=daily|weekly|monthly
 * → [{ period, total_revenue, total_orders }, ...]
 * `range` defaults to 'daily' to match Overview.jsx's fixed "last 7 days" view;
 * Analytics.jsx's selector should pass the user's chosen range explicitly.
 */
export async function getRevenueOverTime(range = 'weekly') {
  return apiClient.get(`/order/admin/analytics/revenue-over-time/?range=${range}`);
}

/**
 * GET /order/admin/analytics/popular-items/
 * → [{ menu_item__id, menu_item__name, menu_item__price,
 *      menu_item__restaurant_id__name, total_sold, total_revenue }, ...]
 */
export async function getPopularItems() {
  return apiClient.get('/order/admin/analytics/popular-items/');
}

/**
 * GET /order/admin/analytics/popular-deals/
 * → [{ deal__id, deal__name, deal__combo_price,
 *      deal__restaurant_id__name, total_sold, total_revenue }, ...]
 */
export async function getPopularDeals() {
  return apiClient.get('/order/admin/analytics/popular-deals/');
}

/**
 * GET /order/admin/analytics/revenue-by-restaurant/
 * → [{ restaurant__id, restaurant__name, total_revenue, total_orders }, ...]
 */
export async function getRevenueByRestaurant() {
  return apiClient.get('/order/admin/analytics/revenue-by-restaurant/');
}

/**
 * GET /order/admin/analytics/orders-by-status/
 * → [{ current_status, count }, ...]
 * NOTE: unconfirmed whether the backend returns all 6 statuses even when a
 * status has zero orders, or only statuses with count > 0. Chart rendering
 * should not assume all 6 keys are always present.
 */
export async function getOrdersByStatus() {
  return apiClient.get('/order/admin/analytics/orders-by-status/');
}