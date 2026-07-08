import RestaurantCard from "./RestaurantCard";

const restaurantsData = [
  { id: 1, image: "/src/assets/restaurant1.png", name: "Restaurant 1" },
  { id: 2, image: "/src/assets/restaurant2.png", name: "Restaurant 2" },
  { id: 3, image: "/src/assets/restaurant3.png", name: "Restaurant 3" },
  { id: 4, image: "/src/assets/restaurant4.png", name: "Restaurant 1" },
  { id: 5, image: "/src/assets/restaurant5.png", name: "Restaurant 2" },
  { id: 6, image: "/src/assets/restaurant6.png", name: "Restaurant 3" },
];


function RestaurantGrid({ type }) {
  return (
    <section className="px-6 py-8">
      <h2 className="text-2xl font-bold mb-4">{type} Restaurants</h2>
      
      {/* Mobile: sliding row */}
      <div className="flex lg:hidden gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
        {restaurantsData.map((r) => (
          <div key={r.id} className="flex-shrink-0 w-[160px] snap-start">
            <RestaurantCard {...r} />
          </div>
        ))}
      </div>

      {/* Desktop: unchanged grid */}
      <div className="hidden lg:grid grid-cols-6 gap-5">
        {restaurantsData.map((r) => (
          <RestaurantCard key={r.id} {...r} />
        ))}
      </div>

    </section>
  );
}

export default RestaurantGrid;