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

function normalizeCartItem(item) {
  return {
    id: item.id,
    name: item.name,
    price: item.price,
    image: resolveImageUrl(item.image),
    type: item.type, // "menu_item" | "deal"
    restaurant: item.restaurant,
    quantity: item.quantity,
    subtotal: item.subtotal,
  };
}

function normalizeCart(cart) {
  return {
    id: cart.id,
    items: (cart.items || []).map(normalizeCartItem),
    totalPrice: cart.total_price,
    updatedAt: cart.updated_at,
  };
}

/**
 * GET /order/cart/
 * Returns the authenticated user's cart.
 */
export async function getCart() {
  const cart = await apiClient.get('/order/cart/');
  return normalizeCart(cart);
}

/**
 * POST /order/cart/add/
 * Adds a menu item or deal to the cart (send exactly one id).
 * Returns the full, updated cart.
 */
export async function addToCart({ menuItemId, dealId } = {}) {
  if (!menuItemId && !dealId) {
    throw new Error('addToCart requires either a menuItemId or a dealId.');
  }
  const payload = menuItemId
    ? { menu_item_id: menuItemId }
    : { deal_id: dealId };

  const cart = await apiClient.post('/order/cart/add/', payload);
  return normalizeCart(cart);
}

/**
 * PATCH /order/cart/update-item/<item_id>/
 * Updates the quantity of a single cart item.
 * Returns just that item (not the whole cart).
 */
export async function updateCartItemQuantity(itemId, quantity) {
  const item = await apiClient.patch(`/order/cart/update-item/${itemId}/`, {
    quantity,
  });
  return normalizeCartItem(item);
}

/**
 * DELETE /order/cart/delete-item/<item_id>/
 * Removes a single item from the cart.
 */
export async function removeCartItem(itemId) {
  return apiClient.delete(`/order/cart/delete-item/${itemId}/`);
}

/**
 * POST /order/checkout/
 * Places an order for everything currently in the cart (grouped by
 * restaurant on the backend). transactionId is required unless
 * paymentMethod is "cash".
 * Returns { message, successful_orders, failed_orders, payment }.
 */
export async function checkout({ deliveryAddress, paymentMethod, transactionId }) {
  return apiClient.post('/order/checkout/', {
    delivery_address: deliveryAddress,
    payment_method: paymentMethod,
    transaction_id: transactionId || '',
  });
}
