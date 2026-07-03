import React from 'react'
import ReviewsImage from '../../assets/ReviewsImage.png';

const Reviews = () => {
  return (
    <>
    <div className="bg-brand-gray w-full h-[600px] border border-[#000000]">
        
        {/* Header Row Container */}
        <div className="w-full flex items-center justify-between p-12">
            <h2 className="font-heading font-bold text-[44px] leading-none text-brand-dark">Customer Reviews</h2>
            <div className="flex gap-4">
                <button className="w-[75px] h-[75px] bg-brand-orange rounded-full flex items-center justify-center text-white cursor-pointer">
                    <span className="text-2xl">&lt;</span>
                </button>
                <button className="w-[75px] h-[75px] bg-brand-orange rounded-full flex items-center justify-center text-white cursor-pointer">
                    <span className="text-2xl">&gt;</span>
                </button>
            </div>
        </div>

        {/* Carousel Cards Viewport Row - Cleared of empty placeholder duplicate frames */}
        <div className="w-full flex items-center justify-center gap-8">

            {/* Card Frame 1 */}
            <div className="card w-[496px] h-[274px] border border-[#000000] bg-white p-8 flex flex-col justify-between m-4">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-[54px] h-[54px] rounded-full bg-gray-300 overflow-hidden">
                    <img src={ReviewsImage} alt="St Glx" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-[2px] h-[50px] bg-brand-orange"></div>
                  <div className="flex flex-col">
                    <span className="font-heading font-semibold text-[18px] text-[#03081F] leading-tight">St Glx</span>
                    <span className="font-body font-normal text-[16px] text-brand-orange leading-tight">South London</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-0.5 text-brand-orange">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-brand-orange text-sm">🕒</span>
                    <span className="font-body font-normal text-[15px] text-black">24th September, 2023</span>
                  </div>
                </div>
              </div>
              <p className="font-body font-normal text-[16px] leading-[27px] text-black">
                The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, 
                the staff was friendly, and the food was up to the usual McDonald's standard – hot and satisfying.
              </p>
            </div>

            {/* Card Frame 2 */}
            <div className="card w-[496px] h-[274px] border border-[#000000] bg-white p-8 flex flex-col justify-between m-4">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-[54px] h-[54px] rounded-full bg-gray-300 overflow-hidden">
                    <img src={ReviewsImage} alt="St Glx" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-[2px] h-[50px] bg-brand-orange"></div>
                  <div className="flex flex-col">
                    <span className="font-heading font-semibold text-[18px] text-[#03081F] leading-tight">St Glx</span>
                    <span className="font-body font-normal text-[16px] text-brand-orange leading-tight">South London</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-0.5 text-brand-orange">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-brand-orange text-sm">🕒</span>
                    <span className="font-body font-normal text-[15px] text-black">24th September, 2023</span>
                  </div>
                </div>
              </div>
              <p className="font-body font-normal text-[16px] leading-[27px] text-black">
                The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, 
                the staff was friendly, and the food was up to the usual McDonald's standard – hot and satisfying.
              </p>
            </div>

            {/* Card Frame 3 */}
            <div className="card w-[496px] h-[274px] border border-[#000000] bg-white p-8 flex flex-col justify-between m-4">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-[54px] h-[54px] rounded-full bg-gray-300 overflow-hidden">
                    <img src={ReviewsImage} alt="St Glx" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-[2px] h-[50px] bg-brand-orange"></div>
                  <div className="flex flex-col">
                    <span className="font-heading font-semibold text-[18px] text-[#03081F] leading-tight">St Glx</span>
                    <span className="font-body font-normal text-[16px] text-brand-orange leading-tight">South London</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-0.5 text-brand-orange">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-brand-orange text-sm">🕒</span>
                    <span className="font-body font-normal text-[15px] text-black">24th September, 2023</span>
                  </div>
                </div>
              </div>
              <p className="font-body font-normal text-[16px] leading-[27px] text-black">
                The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, 
                the staff was friendly, and the food was up to the usual McDonald's standard – hot and satisfying.
              </p>
            </div>

        </div>

    </div>
    </>
  )
}

export default Reviews