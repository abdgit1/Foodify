import React from 'react'

import Navbar from '../../Components/CommonComponents/Navbar';
import Footer from '../../Components/CommonComponents/Footer';

import HeroBanner from '../../Components/HomeComponents/HeroBanner';
import PopularCategories from '../../Components/HomeComponents/PopularCategories';
import PopularRestaurants from '../../Components/HomeComponents/PopularRestaurants';
import ExclusiveDeals from '../../Components/HomeComponents/ExclusiveDeals';
import DownloadBanner from '../../Components/HomeComponents/DownloadBanner';
import AboutUs from '../../Components/HomeComponents/AboutUs';
import GetStarted from '../../Components/HomeComponents/GetStarted';

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroBanner />
      <div id="menu">
        <ExclusiveDeals />
        <PopularCategories />
        <PopularRestaurants title="Popular Restaurants" />
      </div>
      <div className="mx-auto max-w-6xl space-y-6 p-6">

      <DownloadBanner />
      <GetStarted />
      </div>
      <AboutUs />
      <Footer />
    </div>
  );
};

export default Home;