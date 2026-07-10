import apiClient from './apiClient';

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