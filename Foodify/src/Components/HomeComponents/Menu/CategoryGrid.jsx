import CategoryCard from "./CategoryCard";

const categoriesData = [
  { id: 1, image: "/src/assets/category1.png", name: "Category 1", restaurantCount: "5 Restaurants" },
  { id: 2, image: "/src/assets/category2.png", name: "Category 2", restaurantCount: "12 Restaurants" },
  { id: 3, image: "/src/assets/category3.png", name: "Category 3", restaurantCount: "8 Restaurants" },
  { id: 4, image: "/src/assets/category4.png", name: "Category 1", restaurantCount: "5 Restaurants" },
  { id: 5, image: "/src/assets/category5.png", name: "Category 2", restaurantCount: "12 Restaurants" },
  { id: 6, image: "/src/assets/category6.png", name: "Category 3", restaurantCount: "8 Restaurants" },
];

function CategoryGrid() {
  return (
    <section className="px-6 py-8">
      <h2 className="text-2xl font-bold mb-4">Order.uk Popular Categories 🤩</h2>
      <div className="grid grid-cols-6 gap-5">
        {categoriesData.map((cat) => (
          <CategoryCard key={cat.id} {...cat} />
        ))}
      </div>
    </section>
  );
}

export default CategoryGrid;