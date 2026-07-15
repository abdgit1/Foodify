import React, { useMemo } from "react";

import MenuItemCard from "../HomeComponents/Menu/MenuitemCard";

export default function RenderRestaurant({ restaurant }) {
  const categories = useMemo(() => {
    const menuItems = restaurant?.menu_items || [];
    const groups = {};

    menuItems.forEach((item) => {
      const categoryName = item.category?.name || "Other";
      const categoryId = item.category?.id || "other";

      if (!groups[categoryName]) {
        groups[categoryName] = {
          id: categoryId,
          name: categoryName,
          items: [],
        };
      }

      groups[categoryName].items.push(item);
    });

    return Object.values(groups);
  }, [restaurant]);

  if (!restaurant || categories.length === 0) {
    return (
      <div className="px-6 py-8 font-body text-black/50">
        No menu items available for this restaurant.
      </div>
    );
  }

  return (
    <div className="space-y-2 font-body">
      {categories.map((category) => (
        <section
          key={category.id}
          id={`category-section-${category.name}`}
          className="px-6 py-8"
        >
          <h2 className="text-2xl font-bold mb-1">{category.name}</h2>
          <p className="text-black/50 text-sm mb-6">
            {category.items.length} item{category.items.length === 1 ? "" : "s"}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {category.items.map((item) => (
              <MenuItemCard
                key={item.id}
                id={item.id}
                image={item.image}
                name={item.name}
                price={item.price}
                restaurantName={restaurant.name}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}