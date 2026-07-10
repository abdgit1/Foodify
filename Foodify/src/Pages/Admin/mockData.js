// ============================================================
// MOCK DATA — mirrors exact shapes from BACKEND_DOCUMENTATION.md
// Replace these with real API calls when integrating the backend
// ============================================================

// GET /order/admin/analytics/overview/
export const mockOverview = {
  total_orders: 142,
  total_revenue: 3840.50,
  active_restaurants: 12,
  total_users: 98,
};

// GET /order/admin/analytics/orders-by-status/
export const mockOrdersByStatus = [
  { current_status: 'pending',          count: 5  },
  { current_status: 'accepted',         count: 12 },
  { current_status: 'preparing',        count: 8  },
  { current_status: 'out_for_delivery', count: 7  },
  { current_status: 'delivered',        count: 105},
  { current_status: 'cancelled',        count: 5  },
];

// GET /order/admin/analytics/revenue-over-time/?range=daily
export const mockRevenueOverTime = [
  { period: '2026-07-03', total_revenue: 310.50, total_orders: 8  },
  { period: '2026-07-04', total_revenue: 420.00, total_orders: 11 },
  { period: '2026-07-05', total_revenue: 580.75, total_orders: 15 },
  { period: '2026-07-06', total_revenue: 390.00, total_orders: 10 },
  { period: '2026-07-07', total_revenue: 670.25, total_orders: 18 },
  { period: '2026-07-08', total_revenue: 450.00, total_orders: 12 },
  { period: '2026-07-09', total_revenue: 520.00, total_orders: 14 },
];

// GET /order/admin/analytics/popular-items/
export const mockPopularItems = [
  { menu_item__id: 10, menu_item__name: 'Kung Pao Chicken',    menu_item__price: '13.99', menu_item__restaurant_id__name: 'Golden Dragon',    total_sold: 48, total_revenue: 671.52 },
  { menu_item__id: 11, menu_item__name: 'Margherita Pizza',    menu_item__price: '11.50', menu_item__restaurant_id__name: 'Pizza Piazza',       total_sold: 37, total_revenue: 425.50 },
  { menu_item__id: 12, menu_item__name: 'Grilled Chicken',     menu_item__price: '14.99', menu_item__restaurant_id__name: 'The Grill House',    total_sold: 31, total_revenue: 464.69 },
  { menu_item__id: 13, menu_item__name: 'Beef Burger',         menu_item__price: '10.99', menu_item__restaurant_id__name: 'Burger Barn',         total_sold: 29, total_revenue: 318.71 },
  { menu_item__id: 14, menu_item__name: 'Spicy Ramen',         menu_item__price: '12.50', menu_item__restaurant_id__name: 'Noodle Nook',         total_sold: 25, total_revenue: 312.50 },
];

// GET /order/admin/analytics/popular-deals/
export const mockPopularDeals = [
  { deal__id: 3, deal__name: 'Dragon Feast for Two',   deal__combo_price: '23.00', deal__restaurant_id__name: 'Golden Dragon',   total_sold: 15, total_revenue: 345.00 },
  { deal__id: 4, deal__name: 'Pizza Party Pack',        deal__combo_price: '35.00', deal__restaurant_id__name: 'Pizza Piazza',    total_sold: 11, total_revenue: 385.00 },
  { deal__id: 5, deal__name: 'Grill Combo',             deal__combo_price: '28.00', deal__restaurant_id__name: 'The Grill House', total_sold: 9,  total_revenue: 252.00 },
];

// GET /order/admin/analytics/revenue-by-restaurant/
export const mockRevenueByRestaurant = [
  { restaurant__id: 2, restaurant__name: 'Golden Dragon',   total_revenue: 1016.52, total_orders: 63 },
  { restaurant__id: 3, restaurant__name: 'Pizza Piazza',    total_revenue: 810.50,  total_orders: 51 },
  { restaurant__id: 4, restaurant__name: 'The Grill House', total_revenue: 716.69,  total_orders: 44 },
  { restaurant__id: 5, restaurant__name: 'Burger Barn',     total_revenue: 636.71,  total_orders: 39 },
  { restaurant__id: 6, restaurant__name: 'Noodle Nook',     total_revenue: 312.50,  total_orders: 22 },
];

// GET /order/admin/orders
export const mockOrders = [
  {
    order_id: 1, restaurant: { id: 2, name: 'Golden Dragon' },
    items: [{ id: 8, name: 'Kung Pao Chicken', type: 'menu_item', quantity: 3, price_at_order: '13.99', subtotal: 41.97 }],
    total_price: '41.97', current_status: 'delivered',
    delivery_address: 'Flat 302, Green Apartments, Lahore',
    created_at: '2026-07-08T11:05:00Z', updated_at: '2026-07-08T13:00:00Z',
    user: { id: 5, username: 'johndoe', email: 'john@example.com' },
  },
  {
    order_id: 2, restaurant: { id: 3, name: 'Pizza Piazza' },
    items: [{ id: 9, name: 'Margherita Pizza', type: 'menu_item', quantity: 2, price_at_order: '11.50', subtotal: 23.00 }],
    total_price: '23.00', current_status: 'preparing',
    delivery_address: '12 Baker St, London',
    created_at: '2026-07-09T09:15:00Z', updated_at: '2026-07-09T09:20:00Z',
    user: { id: 6, username: 'janedoe', email: 'jane@example.com' },
  },
  {
    order_id: 3, restaurant: { id: 4, name: 'The Grill House' },
    items: [{ id: 10, name: 'Grilled Chicken', type: 'menu_item', quantity: 1, price_at_order: '14.99', subtotal: 14.99 }],
    total_price: '14.99', current_status: 'pending',
    delivery_address: '99 Oak Lane, Manchester',
    created_at: '2026-07-09T09:30:00Z', updated_at: '2026-07-09T09:30:00Z',
    user: { id: 7, username: 'alexk', email: 'alex@example.com' },
  },
  {
    order_id: 4, restaurant: { id: 2, name: 'Golden Dragon' },
    items: [{ id: 11, name: 'Dragon Feast for Two', type: 'deal', quantity: 1, price_at_order: '23.00', subtotal: 23.00 }],
    total_price: '23.00', current_status: 'accepted',
    delivery_address: '5 High St, Birmingham',
    created_at: '2026-07-09T08:00:00Z', updated_at: '2026-07-09T08:10:00Z',
    user: { id: 8, username: 'sara_m', email: 'sara@example.com' },
  },
  {
    order_id: 5, restaurant: { id: 5, name: 'Burger Barn' },
    items: [{ id: 12, name: 'Beef Burger', type: 'menu_item', quantity: 2, price_at_order: '10.99', subtotal: 21.98 }],
    total_price: '21.98', current_status: 'out_for_delivery',
    delivery_address: '7 Park Ave, Leeds',
    created_at: '2026-07-09T07:45:00Z', updated_at: '2026-07-09T08:30:00Z',
    user: { id: 9, username: 'tomw', email: 'tom@example.com' },
  },
  {
    order_id: 6, restaurant: { id: 3, name: 'Pizza Piazza' },
    items: [{ id: 13, name: 'Pizza Party Pack', type: 'deal', quantity: 1, price_at_order: '35.00', subtotal: 35.00 }],
    total_price: '35.00', current_status: 'cancelled',
    delivery_address: '45 Station Rd, Liverpool',
    created_at: '2026-07-08T18:00:00Z', updated_at: '2026-07-08T18:05:00Z',
    user: { id: 10, username: 'emilyr', email: 'emily@example.com' },
  },
];

// GET /restaurants/all-restaurant
export const mockRestaurants = [
  { id: 2, name: 'Golden Dragon',   description: 'Premium Chinese & Szechuan Cuisine',          address: '45 Main Blvd, Lahore',      is_featured: true,  is_active: true,  image: null, created_at: '2026-07-01T10:00:00Z' },
  { id: 3, name: 'Pizza Piazza',    description: 'Authentic Italian wood-fired pizzas',           address: '12 Baker St, London',       is_featured: true,  is_active: true,  image: null, created_at: '2026-07-02T11:00:00Z' },
  { id: 4, name: 'The Grill House', description: 'Award-winning BBQ & grilled mains',             address: '99 Oak Lane, Manchester',   is_featured: false, is_active: true,  image: null, created_at: '2026-07-03T09:00:00Z' },
  { id: 5, name: 'Burger Barn',     description: 'Juicy handcrafted burgers & loaded fries',      address: '7 Park Ave, Leeds',         is_featured: false, is_active: false, image: null, created_at: '2026-07-04T12:00:00Z' },
  { id: 6, name: 'Noodle Nook',     description: 'Japanese & Korean noodle bowls',                address: '31 Canal St, Nottingham',   is_featured: false, is_active: true,  image: null, created_at: '2026-07-05T14:00:00Z' },
];

// GET /restaurants/all-category
export const mockCategories = [
  { id: 1, name: 'Chinese',  slug: 'chinese',  created_at: '2026-07-01T10:00:00Z' },
  { id: 2, name: 'Italian',  slug: 'italian',  created_at: '2026-07-01T10:05:00Z' },
  { id: 3, name: 'BBQ',      slug: 'bbq',      created_at: '2026-07-01T10:10:00Z' },
  { id: 4, name: 'Burgers',  slug: 'burgers',  created_at: '2026-07-01T10:15:00Z' },
  { id: 5, name: 'Japanese', slug: 'japanese', created_at: '2026-07-01T10:20:00Z' },
  { id: 6, name: 'Desserts', slug: 'desserts', created_at: '2026-07-01T10:25:00Z' },
];

// GET /restaurants/all-menuitem
export const mockMenuItems = [
  { id: 10, name: 'Kung Pao Chicken',  price: '13.99', is_available: true,  is_featured: true,  restaurant: { id: 2, name: 'Golden Dragon'   }, category: { id: 1, name: 'Chinese'  }, description: 'Spicy stir-fried chicken with peanuts', image: null, created_at: '2026-07-05T10:00:00Z' },
  { id: 11, name: 'Margherita Pizza',  price: '11.50', is_available: true,  is_featured: true,  restaurant: { id: 3, name: 'Pizza Piazza'    }, category: { id: 2, name: 'Italian'  }, description: 'Classic tomato & mozzarella pizza', image: null, created_at: '2026-07-05T10:05:00Z' },
  { id: 12, name: 'Grilled Chicken',   price: '14.99', is_available: true,  is_featured: false, restaurant: { id: 4, name: 'The Grill House' }, category: { id: 3, name: 'BBQ'      }, description: 'Flame-grilled whole chicken breast', image: null, created_at: '2026-07-05T10:10:00Z' },
  { id: 13, name: 'Beef Burger',       price: '10.99', is_available: false, is_featured: false, restaurant: { id: 5, name: 'Burger Barn'     }, category: { id: 4, name: 'Burgers'  }, description: 'Double patty with cheese and pickles', image: null, created_at: '2026-07-05T10:15:00Z' },
  { id: 14, name: 'Spicy Ramen',       price: '12.50', is_available: true,  is_featured: true,  restaurant: { id: 6, name: 'Noodle Nook'     }, category: { id: 5, name: 'Japanese' }, description: 'Rich broth with noodles and soft egg', image: null, created_at: '2026-07-05T10:20:00Z' },
  { id: 15, name: 'Spring Rolls',      price: '5.99',  is_available: true,  is_featured: false, restaurant: { id: 2, name: 'Golden Dragon'   }, category: { id: 1, name: 'Chinese'  }, description: 'Crispy vegetable spring rolls', image: null, created_at: '2026-07-05T10:25:00Z' },
];

// GET /restaurants/all-deal/
export const mockDeals = [
  { id: 3, name: 'Dragon Feast for Two',  description: 'Get 2 Mains and a side at a discount.', combo_price: '23.00', is_active: true,  is_featured: true,  restaurant: { id: 2, name: 'Golden Dragon'   }, image: null, created_at: '2026-07-06T10:00:00Z', items: [{ id: 1, menu_item: { id: 10, name: 'Kung Pao Chicken' }, quantity: 2 }] },
  { id: 4, name: 'Pizza Party Pack',       description: '2 large pizzas + garlic bread + drinks.', combo_price: '35.00', is_active: true,  is_featured: true,  restaurant: { id: 3, name: 'Pizza Piazza'    }, image: null, created_at: '2026-07-06T10:05:00Z', items: [{ id: 2, menu_item: { id: 11, name: 'Margherita Pizza' }, quantity: 2 }] },
  { id: 5, name: 'Grill Combo',            description: 'Grilled chicken + fries + soft drink.', combo_price: '28.00', is_active: true,  is_featured: false, restaurant: { id: 4, name: 'The Grill House' }, image: null, created_at: '2026-07-06T10:10:00Z', items: [{ id: 3, menu_item: { id: 12, name: 'Grilled Chicken'  }, quantity: 1 }] },
  { id: 6, name: 'Burger Bonanza',         description: '3 burgers + 3 sides for a steal.',     combo_price: '29.99', is_active: false, is_featured: false, restaurant: { id: 5, name: 'Burger Barn'     }, image: null, created_at: '2026-07-06T10:15:00Z', items: [{ id: 4, menu_item: { id: 13, name: 'Beef Burger'      }, quantity: 3 }] },
];
