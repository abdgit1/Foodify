import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/CommonComponents/Navbar';
import Footer from '../../Components/CommonComponents/Footer';
import { Home, ArrowLeft, Search, Utensils, RefreshCw, Compass } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full text-center space-y-8">
          
          {/* Visual Graphic Badge */}
          <div className="relative inline-block">
            <div className="w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-full bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center shadow-inner relative overflow-hidden">
              <span className="text-7xl sm:text-8xl font-black text-orange-500/20 dark:text-orange-400/20 absolute select-none">
                404
              </span>
              <div className="relative z-10 flex flex-col items-center justify-center text-[#fc8a06] animate-bounce">
                <Utensils className="w-16 h-16 sm:w-20 sm:h-20 stroke-[1.5]" />
              </div>
            </div>
            
            <div className="absolute -bottom-2 right-1/4 bg-[#03081f] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg border border-orange-500/30">
              Dish Not Found 🍕
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-3">
            <span className="inline-block text-xs uppercase tracking-widest font-bold text-[#fc8a06] bg-orange-500/10 px-3 py-1 rounded-full">
              Error 404
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Oops! Page Lost in the Kitchen
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
              We searched every recipe and menu, but couldn't find the page you're looking for. It might have been moved or eaten!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-full text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>

            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-[#fc8a06] hover:bg-[#e07a00] transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </div>

          {/* Recommended Links */}
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
              Here are some helpful links instead:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-[#fc8a06] transition-colors"
              >
                <Compass className="w-4 h-4 mr-2 text-[#fc8a06]" />
                Explore Restaurants
              </Link>
              <Link
                to="/orders/track"
                className="inline-flex items-center px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-[#fc8a06] transition-colors"
              >
                <Search className="w-4 h-4 mr-2 text-[#fc8a06]" />
                Track Order
              </Link>
              <Link
                to="/cart"
                className="inline-flex items-center px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-[#fc8a06] transition-colors"
              >
                <Utensils className="w-4 h-4 mr-2 text-[#fc8a06]" />
                View Cart
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
