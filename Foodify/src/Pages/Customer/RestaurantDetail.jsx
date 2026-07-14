import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Store } from "lucide-react";
import Navbar from "../../Components/CommonComponents/Navbar";
import Footer from "../../Components/CommonComponents/Footer";
import Location from "../../Components/RestaurantDetailComponents/Location";
import Reviews from "../../Components/RestaurantDetailComponents/Reviews";
import PopularRestaurants from "../../Components/HomeComponents/PopularRestaurants";
import RestaurantHero from "../../Components/RestaurantDetailComponents/RestaurantHero";
import RestaurantOffersHeader from "../../Components/RestaurantDetailComponents/RestaurantOffersHeader";
import OfferCategoryTab from "../../Components/RestaurantDetailComponents/OfferCategoryTab";
import OffersGrid from "../../Components/RestaurantDetailComponents/OffersGrid";
import RenderRestaurant from "../../Components/RestaurantDetailComponents/RenderRestaurant";
import { getRestaurantById } from "../../services/restaurantservices";
import { getAllDeals } from "../../services/dealService";

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Offers");
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deals, setDeals] = useState([]);
  const [dealsLoading, setDealsLoading] = useState(true);
  const [dealsError, setDealsError] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("Restaurant not found.");
      setDealsLoading(false);
      return undefined;
    }

    let cancelled = false;

    const fetchRestaurantData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getRestaurantById(id);
        if (!cancelled) {
          setRestaurant(data);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to fetch restaurant:", error);
          setError(error.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    const fetchDeals = async () => {
      try {
        setDealsLoading(true);
        setDealsError(null);
        const allDeals = await getAllDeals();
        const filteredDeals = allDeals.filter(d => d.restaurantId === Number(id));
        if (!cancelled) {
          setDeals(filteredDeals);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to fetch deals:", error);
          setDealsError(error.message);
        }
      } finally {
        if (!cancelled) {
          setDealsLoading(false);
        }
      }
    };

    fetchRestaurantData();
    fetchDeals();

    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    setActiveCategory("Offers");
  }, [id]);

  const categories = useMemo(() => {
    const menuItems = restaurant?.menu_items || [];
    const names = new Set();
    menuItems.forEach((item) => {
      if (item.category?.name) names.add(item.category.name);
    });
    return ["Offers", ...Array.from(names)];
  }, [restaurant]);

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    if (category === "Offers") {
      const element = document.getElementById("offers-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      const element = document.getElementById(`category-section-${category}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-24">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-[#fc8a06] border-t-transparent rounded-full animate-spin" />
            <p className="text-[14px] text-black/50 dark:text-white/50">Loading restaurant…</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-24 gap-4">
          <Store size={48} className="text-black/20 dark:text-white/20" />
          <p className="text-[15px] text-black/50 dark:text-white/50">
            {error || "Restaurant not found."}
          </p>
          <button
            onClick={() => navigate("/#popular-restaurants")}
            className="mt-2 h-[44px] px-7 rounded-full bg-[#fc8a06] text-white font-bold text-[14px] hover:bg-[#e07a00] transition-all"
          >
            Browse All Restaurants
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col space-y-16 lg:space-y-24">
        <Navbar />

        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
          <RestaurantHero restaurant={restaurant} />
          <RestaurantOffersHeader restaurantName={restaurant?.name || ""} />
          <OfferCategoryTab
            activeCategory={activeCategory}
            onSelect={handleCategorySelect}
            categories={categories}
          />
          <div id="offers-section">
            <OffersGrid
              deals={deals}
              loading={dealsLoading}
              error={dealsError}
              onAddOffer={(offer) => console.log(`Added offer: ${offer.name}`)}
              onSelectOffer={(offer) => navigate(`/deals/${offer.id}`)}
            />
          </div>
        </div>

        <RenderRestaurant restaurant={restaurant} />
        <Location />
        <Reviews />
        <PopularRestaurants title="Similar Restaurants" />
        <Footer />
      </div>
    </>
  );
};

export default RestaurantDetail;
