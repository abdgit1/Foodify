import React from 'react'
import Location from '../../Components/RestaurantDetailComponents/Location';

import Navbar from '../../Components/CommonComponents/Navbar';
import Footer from '../../Components/CommonComponents/Footer';
import Reviews from '../../Components/RestaurantDetailComponents/Reviews';

const RestaurantDetail = () => {
  return (
    <>
      <Navbar />
      <Location />
      <Reviews />
      <Footer />
    </>
  )
}

export default RestaurantDetail