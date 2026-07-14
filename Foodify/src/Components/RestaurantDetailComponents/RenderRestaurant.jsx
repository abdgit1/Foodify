import React, { useMemo } from "react";
import MenuItemCard from "../HomeComponents/Menu/MenuItemCard";
import { Store } from "lucide-react";

export default function RenderRestaurant({ restaurant, menuItems: menuItemsProp }) {
  const menuItems = menuItemsProp ?? restaurant?.menu_items ?? [];

  const categories = useMemo(() => {
    const groups = {};

    menuItems.forEach((item) => {
      const categoryName = item.category?.name || "Other";
      const categoryId = item.category?.id || categoryName;

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
  }, [menuItems]);

  if (!menuItems.length || categories.length === 0) {
    return (
      <div className="mx-auto lg:px-20 px-4 sm:px-6 md:px-12.5 py-10 flex flex-col items-center justify-center gap-3 text-center">
        <Store size={36} className="text-black/20 dark:text-white/20" />
        <p className="text-[14px] text-black/40 dark:text-white/40">
          No menu items available for this restaurant yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto space-y-2 lg:px-20 lg:pb-20 px-4 sm:px-6 md:px-12.5">
      <div className="space-y-14">
        {categories.map((category) => (
          <section key={category.id} id={`category-section-${category.name}`}>
            <h2 className="mb-2 text-[32px] font-bold text-[#03081F] dark:text-white">
              {category.name}
            </h2>
            <p className="mb-6 text-sm text-black/50 dark:text-white/50">
              {category.items.length} item{category.items.length === 1 ? "" : "s"}
            </p>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-5">
              {category.items.map((item) => (
                <MenuItemCard
                  key={item.id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  restaurantName={restaurant?.name || "Restaurant"}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}