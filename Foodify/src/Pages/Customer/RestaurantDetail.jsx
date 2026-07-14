import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Location from "../../Components/RestaurantDetailComponents/Location";
import Navbar from "../../Components/CommonComponents/Navbar";
import Footer from "../../Components/CommonComponents/Footer";
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setLoading(true);
        const data = await getRestaurantById(id);
        setRestaurant(data);
      } catch (error) {
        console.error("Failed to fetch restaurant:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchDeals = async () => {
      try {
        setDealsLoading(true);
        setDealsError(null);
        const allDeals = await getAllDeals();
        const filteredDeals = allDeals.filter(d => d.restaurantId === Number(id));
        setDeals(filteredDeals);
      } catch (error) {
        console.error("Failed to fetch deals:", error);
        setDealsError(error.message);
      } finally {
        setDealsLoading(false);
      }
    };

    if (id) {
      fetchRestaurantData();
      fetchDeals();
    }
  }, [id]);

  // Reset back to "Offers" whenever a different restaurant loads, so an old
  // category selection from a previous restaurant doesn't carry over.
  useEffect(() => {
    setActiveCategory("Offers");
  }, [id]);

  // Real categories, derived from this restaurant's actual menu items —
  // "Offers" is always first (it's a special tab, not a real category).
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
    return <div className="px-6 py-20 text-center text-black/50">Loading restaurant…</div>;
  }

  return (
    <>
      <div className="flex flex-col space-y-16 lg:space-y-24">
        <Navbar />

        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
          <RestaurantHero restaurant={restaurant} />
          <RestaurantOffersHeader restaurantName={restaurant?.name || ''} />
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