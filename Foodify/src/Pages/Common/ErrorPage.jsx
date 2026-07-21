import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../Components/CommonComponents/Navbar';
import Footer from '../../Components/CommonComponents/Footer';
import { AlertTriangle, RefreshCw, Home, ArrowLeft, ChevronDown, ChevronUp, ShieldAlert, LifeBuoy } from 'lucide-react';

const ErrorPage = ({
  statusCode = 500,
  title = "Something Went Wrong",
  message = "We encountered an unexpected server or kitchen glitch while processing your request.",
  error = null,
  resetErrorBoundary = null,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDetails, setShowDetails] = useState(false);

  // Check if error state was passed via react-router location state
  const locationState = location?.state || {};
  const displayCode = locationState.statusCode || statusCode;
  const displayTitle = locationState.title || title;
  const displayMessage = locationState.message || message;
  const displayError = locationState.error || error;

  const handleRetry = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full text-center space-y-8">
          
          {/* Visual Graphic Badge */}
          <div className="relative inline-block">
            <div className="w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-full bg-red-100 dark:bg-red-950/40 flex items-center justify-center shadow-inner relative overflow-hidden">
              <span className="text-7xl sm:text-8xl font-black text-red-500/20 dark:text-red-400/20 absolute select-none">
                {displayCode}
              </span>
              <div className="relative z-10 flex flex-col items-center justify-center text-red-500 dark:text-red-400 animate-pulse">
                <AlertTriangle className="w-16 h-16 sm:w-20 sm:h-20 stroke-[1.5]" />
              </div>
            </div>
            
            <div className="absolute -bottom-2 right-1/4 bg-[#03081f] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg border border-red-500/30 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
              Kitchen Order Interrupted
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-3">
            <span className="inline-block text-xs uppercase tracking-widest font-bold text-red-600 dark:text-red-400 bg-red-500/10 px-3 py-1 rounded-full">
              System Alert ({displayCode})
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {displayTitle}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
              {displayMessage}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={handleRetry}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-[#fc8a06] hover:bg-[#e07a00] transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Again
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-full text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>

            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-full text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm cursor-pointer"
            >
              <Home className="w-5 h-5 mr-2" />
              Home
            </Link>
          </div>

          {/* Technical Error Details Drawer */}
          {displayError && (
            <div className="pt-4 max-w-lg mx-auto">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="inline-flex items-center text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                <span>{showDetails ? 'Hide' : 'Show'} Technical Details</span>
                {showDetails ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
              </button>

              {showDetails && (
                <div className="mt-3 p-4 bg-red-950/10 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl text-left font-mono text-xs text-red-800 dark:text-red-300 overflow-x-auto max-h-48 scrollbar-thin">
                  <p className="font-bold mb-1">{displayError.name || 'Error'}: {displayError.message || String(displayError)}</p>
                  {displayError.stack && (
                    <pre className="whitespace-pre-wrap text-[11px] opacity-80 mt-2">{displayError.stack}</pre>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Customer Support Notice */}
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1.5">
              <LifeBuoy className="w-4 h-4 text-[#fc8a06]" />
              Need assistance with an active order? Reach out to our customer support.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ErrorPage;
