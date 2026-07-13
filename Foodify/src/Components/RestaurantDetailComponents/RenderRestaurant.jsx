import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Store } from "lucide-react";

export default function RenderRestaurant({ menuItems = [] }) {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    navigate("/cart");
  };

  if (menuItems.length === 0) {
    return (
      <div className="mx-auto lg:px-20 px-4 sm:px-6 md:px-12.5 py-10 flex flex-col items-center justify-center gap-3 text-center">
        <Store size={36} className="text-black/20 dark:text-white/20" />
        <p className="text-[14px] text-black/40 dark:text-white/40">
          No menu items available for this restaurant yet.
        </p>
      </div>
    );
  }

  // Group items by category name for section display
  const grouped = menuItems.reduce((acc, item) => {
    const catName = item.category?.name || "Menu";
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(item);
    return acc;
  }, {});

  return (
    <div className="mx-auto space-y-2 lg:px-20 lg:pb-20 px-4 sm:px-6 md:px-12.5">
      {/* Restaurant Categories With Items */}
      <div className="space-y-14">
        {Object.entries(grouped).map(([categoryName, items]) => (
          <section key={categoryName}>
            <h2 className="mb-6 text-[32px] font-bold text-[#03081F] dark:text-white">
              {categoryName}
            </h2>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="w-full rounded-xl overflow-hidden shadow-sm bg-white dark:bg-[#0a0f2e] font-poppins border border-black/5 dark:border-white/5 hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <div className="w-full h-[160px] overflow-hidden bg-black/5 dark:bg-white/5">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-black/20 dark:text-white/20 text-[13px]">
                        No image
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="px-3 py-3">
                    <p className="text-black dark:text-white font-bold text-base truncate">
                      {item.name}
                    </p>
                    {item.description && (
                      <p className="text-black/50 dark:text-white/50 text-sm truncate mt-0.5">
                        {item.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <p className="text-[#fc8a06] font-bold text-sm">
                        Rs. {item.price}
                      </p>
                      <button
                        type="button"
                        onClick={handleAddToCart}
                        aria-label={`Add ${item.name} to cart`}
                        className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-[#fc8a06] text-white hover:bg-[#e07a00] active:scale-95 transition-all"
                      >
                        <ShoppingCart size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}