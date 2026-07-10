import React from 'react'
import RestaurantGrid from '../../Components/HomeComponents/Menu/RestaurantGrid';

const PopularRestaurants = ({ title = 'Popular Restaurants' }) => {
  return <RestaurantGrid title={title} />;
};

export default PopularRestaurants;

