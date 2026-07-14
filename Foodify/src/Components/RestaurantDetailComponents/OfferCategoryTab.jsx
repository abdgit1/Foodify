import ScrollableTabs from "../CommonComponents/ScrollableTabs";

function OfferCategoryTabs({ activeCategory, onSelect, categories = ["Offers"] }) {
  return (
    <div className="w-full px-4 md:px-6 py-3 font-poppins bg-[#f3f3f3]">
      {/* Mobile: dropdown scales to any number of categories */}
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

      {/* Desktop: scrollable row with arrows when categories overflow */}
      <ScrollableTabs
        tabs={categories}
        activeTab={activeCategory}
        onSelect={onSelect}
        variant="filled"
        ariaLabel="Restaurant menu categories"
        className="hidden md:block"
        buttonClassName="font-bold"
        fadeFrom="#f3f3f3"
      />
    </div>
  );
}

export default OfferCategoryTabs;