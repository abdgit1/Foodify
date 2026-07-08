import { FaClock } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import GirlPizza from "../../assets/GirlPizza.png";

import backgroundImage from "../../assets/Group 23.png";
import backgroundDarkImage from "../../assets/Group 23 Dark.png";

import burgerImage from "../../assets/Rectangle 44.png";
import reviewImage from "../../assets/Rectangle review.png";
import Motocross from "../../assets/Motocross.png";
import OrderComplete from "../../assets/Order Completed.png";

export default function RestaurantHero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="px-4 sm:px-6 md:px-10 lg:px-12 -mt-16 pt-8 sm:pt-8 pb-6 sm:pb-8">
      <div className="relative overflow-visible rounded-2xl">
        
        {/* Main Inner Container */}
        <div className="relative overflow-hidden rounded-2xl h-auto min-h-80 sm:min-h-95 lg:min-h-0 lg:h-[420px] flex flex-col lg:block justify-center py-8 lg:py-0">
          
          {/* Background */}
          <img
            src={isDark ? backgroundDarkImage : backgroundImage}
            alt="Restaurant background"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          {/* =========================================
              DESKTOP VIEW IMAGES (Hidden on Mobile)
          ========================================= */}
          <img
            src={burgerImage}
            alt="Burger showcase"
            className="hidden lg:block absolute lg:right-12 top-1/2 -translate-y-1/2 lg:h-80 object-contain z-10 pointer-events-auto"
          />
          <div className="hidden lg:block absolute right-[35%] top-[62%] w-35 bg-white rounded-xl shadow-xl px-6 py-4 z-30">
            <img src={reviewImage} alt="Customer review" className="w-full" />
          </div>


          {/* =========================================
              MOBILE VIEW CONTENT (Flex Stack Layout)
          ========================================= */}
          <div className="relative z-20 flex flex-col items-center lg:items-start lg:block w-full h-full">

            {/* 1. Mobile Top Image Group */}
            <div className="flex justify-center lg:hidden w-full order-1 px-4 mb-6 mt-4 relative">
              <div className="relative inline-flex justify-center items-center">
                <img
                  src={GirlPizza}
                  alt="Showcase"
                  className="h-48 sm:h-60 object-contain rounded-xl relative z-10"
                />
                {/* Overlapping Review Badge */}
                <div className="absolute -left-6 sm:-left-10 top-40 -translate-y-1/2 w-20 sm:w-24 bg-white rounded-xl shadow-xl p-2 z-20">
                  <img src={reviewImage} alt="Review" className="w-full" />
                </div>
              </div>
            </div>

            {/* 2. Mobile Orange Button */}
            <div className="lg:hidden order-2 w-full px-4 sm:px-10 mb-8 flex justify-center">
              <button className="w-full bg-[#FC8A06] hover:bg-orange-600 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg text-base sm:text-lg">
                <FaClock className="text-lg sm:text-xl" />
                <span>Open until 10:30 AM</span>
              </button>
            </div>

            {/* 3. Text & Badges (Shared across Mobile & Desktop) */}
            <div className="relative z-30 flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-4 sm:px-10 lg:px-20 w-full lg:w-1/2 order-3 lg:h-full lg:absolute lg:top-0 lg:left-0">
              
              <p
                className={`text-sm sm:text-base md:text-lg mb-2 sm:mb-3 font-medium ${
                  isDark ? "text-gray-200 lg:text-white" : "text-gray-700"
                }`}
              >
                I'm lovin' it!
              </p>

              <h1
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                McDonald's East
                <span className="hidden lg:inline"> <br /> </span>
                <span className="inline lg:hidden"> </span>
                London
              </h1>

              {/* Info Badges */}
              <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 w-full lg:w-auto">
                <div className="flex items-center justify-center lg:justify-start gap-3 bg-[#03081F] text-white px-5 py-4 lg:py-3 rounded-full text-sm sm:text-base md:text-lg w-full lg:w-auto shadow-md">
                  <img
                    src={Motocross}
                    alt="Minimum Order"
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                  />
                  <span className="whitespace-nowrap font-medium">Minimum Order: 12 GBP</span>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-3 bg-[#03081F] text-white px-5 py-4 lg:py-3 rounded-full text-sm sm:text-base md:text-lg w-full lg:w-auto shadow-md">
                  <img
                    src={OrderComplete}
                    alt="Delivery Time"
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                  />
                  <span className="whitespace-nowrap font-medium">Delivery in 20-25 Min</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* =========================================
            DESKTOP BOTTOM BUTTON (Hidden on Mobile)
        ========================================= */}
        <div className="hidden lg:flex lg:absolute lg:left-0 lg:top-full lg:-translate-y-1/2 lg:z-30">
          <button className="bg-[#FC8A06] hover:bg-orange-600 text-white px-8 py-4 lg:rounded-t-none lg:rounded-tr-xl lg:rounded-br-none lg:rounded-bl-none font-semibold flex items-center justify-start gap-2 transition-colors">
            <FaClock className="text-base" />
            <span className="text-base">Open until 10:30 AM</span>
          </button>
        </div>

      </div>
    </section>
  );
}