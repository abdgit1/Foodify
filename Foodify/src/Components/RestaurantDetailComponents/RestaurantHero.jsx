import { FaClock } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

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
        <div className="relative overflow-hidden rounded-2xl h-auto min-h-[320px] sm:min-h-[380px] lg:min-h-0 lg:h-[420px] flex flex-col justify-center py-8 lg:py-0">
          {/* Background */}
          <img
            src={isDark ? backgroundDarkImage : backgroundImage}
            alt="Restaurant background"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          {/* Burger Image */}
          <img
            src={burgerImage}
            alt="Burger showcase"
            className="absolute -right-16 hidden md:block opacity-30 sm:-right-4 sm:opacity-100 md:right-12 top-1/2 -translate-y-1/2 h-48 sm:h-64 md:h-72 lg:h-80 object-contain z-10 pointer-events-none sm:pointer-events-auto"
          />

          {/* Review Card  */}
          <div className="hidden md:block absolute md:right-32 md:top-12 lg:right-[485px] lg:top-65 w-28 sm:w-32 md:w-36 bg-white rounded-xl shadow-xl px-3 sm:px-4 md:px-6 py-3 sm:py-4 z-30">
            <img src={reviewImage} alt="Customer review" className="w-full" />
          </div>

          <div className="relative z-30 h-full flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-12 w-full md:w-3/4 lg:w-1/2">
            <p
              className={`text-sm sm:text-base md:text-lg mb-2 sm:mb-3 ${
                isDark ? "text-white" : "text-gray-700"
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
              <br className="hidden sm:block" />
              London
            </h1>

            {/* Info Badges */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 sm:gap-4 mt-6 sm:mt-8">
              <div className="flex items-center gap-2 sm:gap-3 bg-[#03081F] text-white px-4 sm:px-5 py-2 sm:py-3 rounded-full text-xs sm:text-sm md:text-base">
                <img
                  src={Motocross}
                  alt="Minimum Order"
                  className="w-5 h-5 sm:w-auto object-contain"
                />
                <span className="whitespace-nowrap">Minimum Order: 12 GBP</span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 bg-[#03081F] text-white px-4 sm:px-5 py-2 sm:py-3 rounded-full text-xs sm:text-sm md:text-base">
                <img
                  src={OrderComplete}
                  alt="Delivery Time"
                  className="w-5 h-5 sm:w-auto object-contain"
                />
                <span className="whitespace-nowrap">Delivery in 20-25 Min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="mt-4 sm:mt-5 md:mt-6 lg:mt-0 lg:absolute lg:left-0 lg:top-full lg:-translate-y-1/2 lg:z-30">
          <button className="w-full sm:w-auto bg-[#FC8A06] hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl lg:rounded-t-none lg:rounded-tr-xl lg:rounded-br-none lg:rounded-bl-none font-semibold flex items-center justify-center sm:justify-start gap-2 transition-colors">
            <FaClock className="text-sm sm:text-base" />
            <span className="text-sm sm:text-base">Open until 10:30 AM</span>
          </button>
        </div>
      </div>
    </section>
  );
}