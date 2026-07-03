// components/menu/DealsGrid.jsx
import { useState } from "react";
import DealCard from "./dealCard";

const tabs = [
  "Vegan",
  "Sushi",
  "Pizza & Fast Food",
  "Others",
];

const dealsData = [
  { id: 1, image: "/src/assets/deal1.png", name: "Deal 1", restaurantLabel: "Restaurant A", discount: "-20%" },
  { id: 2, image: "/src/assets/deal2.png", name: "Deal 2", restaurantLabel: "Restaurant B", discount: "-40%" },
  { id: 3, image: "/src/assets/deal3.png", name: "Deal 3", restaurantLabel: "Restaurant C", discount: "-17%" },
  ];

function DealsGrid() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="px-6 py-8">
      <div className="flex items-center">
        <h2 className="text-2xl font-bold mb-4">Up to -40% 🎊 Order.uk exclusive deals</h2>
        <nav className="hidden lg:flex flex-wrap justify-end gap-1 mb-4 ml-auto">
                {tabs.map((tab, index) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(index)}
                    className={`px-4 sm:px-6 py-2 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap cursor-pointer ${
                      activeTab === index
                        ? "border border-orange-500 bg-white font-bold text-black"
                        : "border border-transparent font-medium text-gray-700 hover:bg-black/5 hover:text-black"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
      </div>
      
      <div className="grid grid-cols-3 gap-5">
        {dealsData.map((deal) => (
          <DealCard key={deal.id} {...deal} />
        ))}
      </div>
    </section>
  );
}

export default DealsGrid;