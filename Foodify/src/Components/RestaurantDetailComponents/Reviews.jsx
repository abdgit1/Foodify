import React, { useState } from 'react'
import ReviewsImage from '../../assets/ReviewsImage.png';

// Move review data into an array so the slider can cycle through it
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
    name: "St Glx",
    location: "South London",
    date: "24th September, 2023",
    rating: 5,
    text: "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard – hot and satisfying.",
    image: ReviewsImage,
  },
  {
    name: "St Glx",
    location: "South London",
    date: "24th September, 2023",
    rating: 5,
    text: "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard – hot and satisfying.",
    image: ReviewsImage,
  },
  // Add more review objects here — the slider will keep cycling through all of them
];

const CARDS_VISIBLE = 3; // how many cards show at once

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = reviewsData.length;

  // Circular shift: wraps around using modulo so it never runs out of cards
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % total);
  };

  // Build the visible slice of cards starting at currentIndex, wrapping circularly
  const visibleReviews = Array.from({ length: Math.min(CARDS_VISIBLE, total) }, (_, i) => {
    const index = (currentIndex + i) % total;
    return { ...reviewsData[index], key: index };
  });

  return (
    <>
    <div className="bg-brand-gray w-full h-[600px] border border-[#000000]">

        {/* Header Row Container */}
        <div className="w-full flex items-center justify-between p-12">
            <h2 className="font-heading font-bold text-[44px] leading-none text-brand-dark">Customer Reviews</h2>
            <div className="flex gap-4">
                <button
                    onClick={handlePrev}
                    className="w-[75px] h-[75px] bg-brand-orange rounded-full flex items-center justify-center text-white cursor-pointer"
                >
                    <span className="text-2xl">&lt;</span>
                </button>
                <button
                    onClick={handleNext}
                    className="w-[75px] h-[75px] bg-brand-orange rounded-full flex items-center justify-center text-white cursor-pointer"
                >
                    <span className="text-2xl">&gt;</span>
                </button>
            </div>
        </div>

        {/* Carousel Cards Viewport Row */}
        <div className="w-full flex items-center justify-center gap-8">

            {visibleReviews.map((review) => (
              <div
                key={review.key}
                className="card w-[496px] h-[274px] border border-[#000000] bg-white p-8 flex flex-col justify-between m-4"
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

    </div>
    </>
  )
}

export default Reviews