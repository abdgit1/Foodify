/**
 * Derives category cards (with restaurant counts + a representative image)
 * directly from the full menu-items list — no dedicated category-with-count
 * endpoint exists on the backend, so this is computed client-side.
 */
export function deriveCategories(menuItems) {
  const categoryMap = {};

  menuItems.forEach((item) => {
    const cat = item.category;
    if (!cat) return; // skip items with no category assigned

    if (!categoryMap[cat.id]) {
      categoryMap[cat.id] = {
        id: cat.id,
        name: cat.name,
        restaurantIds: new Set(),
        itemImages: [],       // this category's own menu item images
        fallbackImage: null,  // used only if no item in this category has an image
      };
    }

    const entry = categoryMap[cat.id];
    entry.restaurantIds.add(item.restaurant.id);

    if (item.image) entry.itemImages.push(item.image);
    if (!entry.fallbackImage && item.restaurant.image) {
      entry.fallbackImage = item.restaurant.image;
    }
  });

  return Object.values(categoryMap).map((cat) => {
    // Pick a random menu-item image from this category, if any exist
    const randomImage =
      cat.itemImages.length > 0
        ? cat.itemImages[Math.floor(Math.random() * cat.itemImages.length)]
        : cat.fallbackImage; // fall back to a restaurant image if no item images exist

    return {
      id: cat.id,
      name: cat.name,
      image: randomImage,
      restaurantCount: `${cat.restaurantIds.size} Restaurant${cat.restaurantIds.size === 1 ? '' : 's'}`,
    };
  });
}