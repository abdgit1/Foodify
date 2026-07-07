import React from 'react'
import { useState } from 'react';
import Location from '../../Components/RestaurantDetailComponents/Location';
import Navbar from '../../Components/CommonComponents/Navbar';
import Footer from '../../Components/CommonComponents/Footer';
import Reviews from '../../Components/RestaurantDetailComponents/Reviews';
import PopularRestaurants from '../../Components/HomeComponents/PopularRestaurants';
import RestaurantHero from '../../Components/RestaurantDetailComponents/RestaurantHero';
import RestaurantOffersHeader from '../../Components/RestaurantDetailComponents/RestaurantOffersHeader';
import OfferCategoryTab from '../../Components/RestaurantDetailComponents/OfferCategoryTab';
import OffersGrid from '../../Components/RestaurantDetailComponents/OffersGrid';
import RenderRestaurant from '../../Components/RestaurantDetailComponents/RenderRestaurant';

const RestaurantDetail = () => {
  const [activeCategory, setActiveCategory] = useState("Offers");
  
  return (
    <>
      <div className="flex flex-col space-y-16 lg:space-y-24">
        <Navbar />
        
        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
          <RestaurantHero />
          <RestaurantOffersHeader restaurantName="McDolands" />
          <OfferCategoryTab
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
          <OffersGrid
            onAddOffer={(offer) => console.log(`Added offer: ${offer.title}`)}
          />
        </div>

        <RenderRestaurant />
        <Location />
        
        {/* Simplified directly with zero absolute dependencies here */}
        <Reviews />

        <PopularRestaurants title="Similar Restaurants" />
        <Footer />
      </div>
    </>
  )
}

export default RestaurantDetail;