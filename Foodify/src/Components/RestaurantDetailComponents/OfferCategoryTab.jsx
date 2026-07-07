import { useState } from "react";

const categories = [
  "Offers", "Burgers", "Fries", "Snacks", "Salads",
  "Cold drinks", "Happy Meal®", "Desserts", "Hot drinks", "Sauces", "Orbit®"
];

function OfferCategoryTabs({ activeCategory, onSelect }) {
  return (
    <div className="w-full px-4 md:px-6 py-3 font-poppins bg-[#f3f3f3]">
      
      {/* ══════════════════════ MOBILE VIEWPORT (Dropdown Selection) ══════════════════════ */}
      <div className="md:hidden w-full relative">
        <label htmlFor="category-select" className="sr-only">
          Select Category
        </label>
        <select
          id="category-select"
          value={activeCategory}
          onChange={(e) => onSelect(e.target.value)}
          className="w-full h-[48px] bg-white border border-black/10 rounded-[8px] px-4 font-bold text-sm text-[#03081f] shadow-sm outline-none appearance-none cursor-pointer focus:border-[#03081f] transition-colors"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2303081f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 16px center",
            backgroundSize: "18px"
          }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat} className="font-medium text-black">
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* ══════════════════════ DESKTOP VIEWPORT (Full Inline Row Layout) ══════════════════════ */}
      <div className="hidden md:flex items-center justify-between gap-x-2 gap-y-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`px-5 py-2.5 rounded-full font-bold text-sm lg:text-base transition-colors cursor-pointer whitespace-nowrap
              ${activeCategory === cat ? "bg-[#03081f] text-white" : "bg-transparent text-black hover:bg-black/5"}`}
          >
            {cat}
          </button>
        ))}
      </div>

    </div>
  );
}

export default OfferCategoryTabs;