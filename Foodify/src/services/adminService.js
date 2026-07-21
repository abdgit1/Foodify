import apiClient from "./apiClient";

/**
 * GET /order/admin/orders
 * All orders in the system (admin view). Same shape as the user's
 * order list — { order_id, restaurant, items, total_price,
 * current_status, delivery_address, status_history, created_at,
 * updated_at }, plus a `user` field identifying who placed it.
 */
export async function getAllOrders() {
  const orders = await apiClient.get('/order/admin/orders');
  return orders;
}

/**
 * PATCH /order/admin/orders/<order_id>/status/
 * Valid statuses: pending, accepted, preparing, out_for_delivery,
 * delivered, cancelled.
 * Returns the full, updated order (including its status_history).
 */
export async function updateOrderStatus(orderId, status) {
    const order = await apiClient.patch(`/order/admin/orders/${orderId}/status/`, { status });
    return order;
}

/**
 * GET /order/admin/analytics/popular-items/?limit=<n>
 * Array of { menu_item__id, menu_item__name, menu_item__price,
 * menu_item__restaurant_id__name, total_sold, total_revenue }
 */

export async function getPopularItems(limit = 10) {
    const items = await apiClient.get(`/order/admin/analytics/popular-items/?limit=${limit}`);
    return items;
}

/**
 * GET /order/admin/analytics/popular-deals/?limit=<n>
 * Array of { deal__id, deal__name, deal__combo_price,
 * deal__restaurant_id__name, total_sold, total_revenue }
 */

export async function getPopularDeals(limit = 10) {
    const deals = await apiClient.get(`/order/admin/analytics/popular-deals/?limit=${limit}`);
    return deals;
}

/**
 * GET /order/admin/analytics/revenue-by-restaurant/
 * Array of { restaurant__id, restaurant__name, total_revenue, total_orders }
 */

export async function getRevenueByRestaurant() {
    const revenue = await apiClient.get('/order/admin/analytics/revenue-by-restaurant/');
    return revenue;
}

/**
 * GET /order/admin/analytics/revenue-over-time/?range=<daily|weekly|monthly>
 * Array of { period, total_revenue, total_orders }
 */

export async function getRevenueOverTime(range = 'daily') {
    const revenue = await apiClient.get(`/order/admin/analytics/revenue-over-time/?range=${range}`);
    return revenue;
}

/**
 * GET /order/admin/analytics/orders-by-status/
 * Array of { current_status, count }
 */

export async function getOrdersByStatus() {
    const orders = await apiClient.get('/order/admin/analytics/orders-by-status/');
    return orders;
}


