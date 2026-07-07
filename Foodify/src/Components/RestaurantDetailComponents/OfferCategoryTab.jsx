import { useState } from "react";

const categories = [
  "Offers", "Burgers", "Fries", "Snacks", "Salads",
  "Cold drinks", "Happy Meal®", "Desserts", "Hot drinks", "Sauces", "Orbit®"
];

function OfferCategoryTabs({ activeCategory, onSelect }) {
  return (
    <div className="flex items-center justify-between gap-x-4 gap-y-2 px-6 py-2 font-poppins bg-[#f3f3f3]">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full font-bold text-sm md:text-base transition-colors cursor-pointer
            ${activeCategory === cat ? "bg-[#03081f] text-white" : "bg-transparent text-black"}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default OfferCategoryTabs;