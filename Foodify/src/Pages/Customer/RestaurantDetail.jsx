import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/CommonComponents/Navbar';
import Footer from '../../Components/CommonComponents/Footer';
import { getRestaurantById } from '../../services/restaurantservices';
import RenderRestaurant from '../../Components/RestaurantDetailComponents/RenderRestaurant';
import Location from '../../Components/RestaurantDetailComponents/Location';
import Reviews from '../../Components/RestaurantDetailComponents/Reviews';
import PopularRestaurants from '../../Components/HomeComponents/PopularRestaurants';
import RestaurantHero from '../../Components/RestaurantDetailComponents/RestaurantHero';
import RestaurantOffersHeader from '../../Components/RestaurantDetailComponents/RestaurantOffersHeader';
import OfferCategoryTab from '../../Components/RestaurantDetailComponents/OfferCategoryTab';
import OffersGrid from '../../Components/RestaurantDetailComponents/OffersGrid';
import { Store } from 'lucide-react';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Offers");

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    getRestaurantById(id)
      .then((data) => { if (!cancelled) setRestaurant(data); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

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
          <p className="text-[15px] text-black/50 dark:text-white/50">{error || 'Restaurant not found.'}</p>
          <button
            onClick={() => navigate('/#popular-restaurants')}
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
          <RestaurantOffersHeader restaurantName={restaurant.name} />
          <OfferCategoryTab
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
          <OffersGrid
            onAddOffer={(offer) => console.log(`Added offer: ${offer.title}`)}
          />
        </div>

        <RenderRestaurant menuItems={restaurant.menu_items || []} />
        <Location />
        <Reviews />
        <PopularRestaurants title="Similar Restaurants" />
        <Footer />
      </div>
    </>
  );
};

export default RestaurantDetail;
