import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import { getAllRestaurants }  from "../../../services/restaurantservices";

function RestaurantGrid({ title }) {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const loadRestaurants = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllRestaurants();
        if (!isCancelled) setRestaurants(data);
      } catch (err) {
        if (!isCancelled) setError(err.message);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    loadRestaurants();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <section className="px-6 py-8">
      <h2 className="text-2xl font-bold mb-4">{title} </h2>

      {loading && (
        <p className="text-black/50 text-[15px]">Loading restaurants…</p>
      )}

      {error && (
        <p className="text-red-500 text-[15px]">
          Couldn't load restaurants right now. ({error})
        </p>
      )}

      {!loading && !error && restaurants.length === 0 && (
        <p className="text-black/50 text-[15px]">No restaurants available yet.</p>
      )}

      {!loading && !error && restaurants.length > 0 && (
        <>
          {/* Mobile: sliding row */}
          <div className="flex lg:hidden gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
            {restaurants.map((r) => (
              <div key={r.id} className="flex-shrink-0 w-[160px] snap-start">
                <RestaurantCard
                  image={r.image}
                  name={r.name}
                  onClick={() => navigate(`/restaurant/${r.id}`)}
                />
              </div>
            ))}
          </div>

          {/* Desktop: unchanged grid */}
          <div className="hidden lg:grid grid-cols-6 gap-5">
            {restaurants.map((r) => (
              <RestaurantCard
                key={r.id}
                image={r.image}
                name={r.name}
                onClick={() => navigate(`/restaurant/${r.id}`)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default RestaurantGrid;