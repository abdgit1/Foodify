import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import { getAllMenuItems } from "../../../services/menuItemService";
import { deriveCategories } from "../../../utils/deriveCategories";

function CategoryGrid() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const loadCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const menuItems = await getAllMenuItems();
        if (!isCancelled) setCategories(deriveCategories(menuItems));
      } catch (err) {
        if (!isCancelled) setError(err.message);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    loadCategories();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <section className="px-6 py-8">
      <h2 className="text-2xl font-bold mb-4">Order.uk Popular Categories 🤩</h2>

      {loading && (
        <p className="text-black/50 text-[15px]">Loading categories…</p>
      )}

      {error && (
        <p className="text-red-500 text-[15px]">
          Couldn't load categories right now. ({error})
        </p>
      )}

      {!loading && !error && categories.length === 0 && (
        <p className="text-black/50 text-[15px]">No categories available yet.</p>
      )}

      {!loading && !error && categories.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              image={cat.image}
              name={cat.name}
              restaurantCount={cat.restaurantCount}
              onClick={() => navigate(`/category/${cat.id}`)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default CategoryGrid;