import React, { useState } from 'react';
import ReviewsImage from '../../assets/ReviewsImage.png';
import OverallRatingImage from '../../assets/OverallRating.png';

const reviewsData = [
  {
    name: "St Glx",
    location: "South London",
    date: "24th September, 2023",
    rating: 5,
    text: "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard – hot and satisfying.",
    image: ReviewsImage,
  },
  {
    name: "Amara K.",
    location: "Manchester",
    date: "12th October, 2023",
    rating: 4,
    text: "Incredibly fast delivery and the packaging kept everything piping hot! The loaded fries were absolute perfection, though I wish they had included a few extra sauce packets as requested.",
    image: ReviewsImage,
  },
  {
    name: "Marcus Davies",
    location: "Birmingham",
    date: "05th November, 2023",
    rating: 5,
    text: "Super clean presentation and a brilliant selection on the digital menu. The custom burgers tasted remarkably fresh, and ordering via the app made tracking our driver completely seamless.",
    image: ReviewsImage,
  },
];

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = reviewsData.length;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % total);
  };

  const getVisibleReviews = (count) => {
    return Array.from({ length: Math.min(count, total) }, (_, i) => {
      const index = (currentIndex + i) % total;
      return { ...reviewsData[index], key: index };
    });
  };

  const visibleMobile = getVisibleReviews(1);
  const visibleDesktop = getVisibleReviews(3);

  return (
    <div className="relative bg-brand-gray w-full border border-black pb-12 lg:pb-0 h-auto lg:h-[600px]">
      
      {/* ══════════════════════ 1. MOBILE LAYOUT (lg:hidden) ══════════════════════ */}
      <div className="lg:hidden flex flex-col items-center pt-8 px-4 w-full">
        <h2 className="font-heading font-bold text-[32px] text-center text-brand-dark mb-4">
          Customer Reviews
        </h2>

        <div className="mb-6 flex justify-center">
          <img 
            src={OverallRatingImage} 
            alt="Overall Rating" 
            className="w-[153px] h-[178px] rounded-[12px] bg-white border border-gray-200 shadow-sm"
          />
        </div>

        <div className="w-full flex items-center overflow-hidden justify-center px-2">
          {visibleMobile.map((review) => (
            <div
              key={`mobile-${review.key}`}
              className="w-full max-w-[496px] min-h-[274px] border border-black bg-white p-6 flex flex-col justify-between rounded-[4px] shadow-sm animate-fade-in"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full border-b border-gray-100 pb-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-[54px] h-[54px] rounded-full bg-gray-300 overflow-hidden shrink-0">
                    <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="w-[2px] h-[40px] bg-brand-orange"></div>
                  <div className="flex flex-col">
                    <span className="font-heading font-semibold text-[16px] text-[#03081F] leading-tight">{review.name}</span>
                    <span className="font-body font-normal text-[14px] text-brand-orange leading-tight">{review.location}</span>
                  </div>
                </div>

                <div className="flex flex-row sm:flex-col justify-between sm:items-end items-center gap-1">
                  <div className="flex gap-0.5 text-brand-orange text-lg">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-brand-orange text-sm">🕒</span>
                    <span className="font-body font-normal text-[13px] text-black">{review.date}</span>
                  </div>
                </div>
              </div>

              <p className="font-body font-normal text-[15px] leading-[24px] text-black flex-1">
                {review.text}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-6 justify-center">
          <button
            onClick={handlePrev}
            className="w-[60px] h-[60px] bg-brand-orange rounded-full flex items-center justify-center text-white active:scale-95 transition-transform"
          >
            <span className="text-xl font-bold">&lt;</span>
          </button>
          <button
            onClick={handleNext}
            className="w-[60px] h-[60px] bg-brand-orange rounded-full flex items-center justify-center text-white active:scale-95 transition-transform"
          >
            <span className="text-xl font-bold">&gt;</span>
          </button>
        </div>
      </div>

      {/* ══════════════════════ 2. DESKTOP LAYOUT (hidden lg:block) ══════════════════════ */}
      <div className="hidden lg:block w-full h-full">
        <div className="w-full flex items-center justify-between p-12">
          <h2 className="font-heading font-bold text-[44px] leading-none text-brand-dark">Customer Reviews</h2>
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              className="w-[75px] h-[75px] bg-brand-orange rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-brand-orange/90 transition-colors"
            >
              <span className="text-2xl">&lt;</span>
            </button>
            <button
              onClick={handleNext}
              className="w-[75px] h-[75px] bg-brand-orange rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-brand-orange/90 transition-colors"
            >
              <span className="text-2xl">&gt;</span>
            </button>
          </div>
        </div>

        <div className="w-full flex items-center justify-center gap-8 px-6">
          {visibleDesktop.map((review) => (
            <div
              key={`desktop-${review.key}`}
              className="card w-[496px] h-[274px] border border-[#000000] bg-white p-8 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-[54px] h-[54px] rounded-full bg-gray-300 overflow-hidden">
                    <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="w-[2px] h-[50px] bg-brand-orange"></div>
                  <div className="flex flex-col">
                    <span className="font-heading font-semibold text-[18px] text-[#03081F] leading-tight">{review.name}</span>
                    <span className="font-body font-normal text-[16px] text-brand-orange leading-tight">{review.location}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-0.5 text-brand-orange">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-brand-orange text-sm">🕒</span>
                    <span className="font-body font-normal text-[15px] text-black">{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="font-body font-normal text-[16px] leading-[27px] text-black">
                {review.text}
              </p>
            </div>
          ))}
        </div>

        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 z-10 hidden lg:block">
          <img 
            src={OverallRatingImage} 
            alt="Overall Rating" 
            className="w-[153px] h-[178px] rounded-[12px] bg-white border border-gray-200 shadow-sm"
          />
        </div>
      </div>

    </div>
  );
};

export default Reviews;