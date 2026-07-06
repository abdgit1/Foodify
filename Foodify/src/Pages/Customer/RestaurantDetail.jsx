import React from 'react'
import Location from '../../Components/RestaurantDetailComponents/Location';
import Navbar from '../../Components/CommonComponents/Navbar';
import Footer from '../../Components/CommonComponents/Footer';
import Reviews from '../../Components/RestaurantDetailComponents/Reviews';
import PopularRestaurants from '../../Components/HomeComponents/PopularRestaurants';
import OverallRatingImage from '../../assets/OverallRating.png'; 

const RestaurantDetail = () => {
  return (
    <>
      <div className="flex flex-col space-y-16 lg:space-y-24">
        <Navbar />
        <Location />
        
        {/* Relative wrapper specifically encapsulates only the Reviews component */}
        <div className="relative">
          <Reviews />
          
          {/* Overall Rating Badge positioned perfectly centered on the bottom border line */}
          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 z-10">
            <img 
              src={OverallRatingImage} 
              alt="Overall Rating" 
              className="w-[153px] h-[178px] rounded-[12px] bg-white border border-gray-200 shadow-sm" // Dimensions matching {2BA58F3A-382A-4CF4-B27F-C0939466E606}.png exactly
            />
          </div>
        </div> {/* <-- Properly closing the relative wrapper here */}

        <PopularRestaurants title="Similar Restaurants" />
        <Footer />
      </div>
    </>
  )
}

export default RestaurantDetail