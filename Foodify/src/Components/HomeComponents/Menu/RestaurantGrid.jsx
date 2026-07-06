import RestaurantCard from "./RestaurantCard";

const restaurantsData = [
  { id: 1, image: "/src/assets/restaurant1.png", name: "Restaurant 1" },
  { id: 2, image: "/src/assets/restaurant2.png", name: "Restaurant 2" },
  { id: 3, image: "/src/assets/restaurant3.png", name: "Restaurant 3" },
  { id: 4, image: "/src/assets/restaurant4.png", name: "Restaurant 1" },
  { id: 5, image: "/src/assets/restaurant5.png", name: "Restaurant 2" },
  { id: 6, image: "/src/assets/restaurant6.png", name: "Restaurant 3" },
];


function RestaurantGrid({ title }) {
  return (
    <section className="px-6 py-8">
      {/* If a custom title is passed, use it. Otherwise, fall back to "Popular Restaurants" */}
      <h2 className="text-2xl font-bold mb-4">{title || "Popular Restaurants"}</h2>
      <div className="grid grid-cols-6 gap-5">
        {restaurantsData.map((r) => (
          <RestaurantCard key={r.id} {...r} />
        ))}
      </div>
    </section>
  );
}

export default RestaurantGrid;