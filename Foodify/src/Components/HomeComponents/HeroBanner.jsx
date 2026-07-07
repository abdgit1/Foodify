import React from 'react';
import orangeShape from "../../assets/OrangeShape.png";
import Hero1 from "../../assets/Hero1.png";
import Hero1Dark from "../../assets/Hero2Dark.png";
import Hero2 from "../../assets/Hero2.png";
import Hero2Dark from "../../assets/Hero1Dark.png";
import orderUkLogo from "../../assets/OrderUKLogo2.png";
import img1 from "../../assets/1.png";
import img2 from "../../assets/2.png";
import img3 from "../../assets/3.png";
import { useTheme } from '../../context/ThemeContext';

const HeroBanner = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className="relative mx-auto mt-8 w-[calc(100%-2rem)] max-w-[1528px] border rounded-[12px] overflow-hidden transition-colors duration-300
                 h-[283px] lg:w-full lg:h-[610px]"
      style={{ 
        backgroundColor: isDark ? '#03081F' : (window.innerWidth < 1024 ? '#E2E2E2' : '#FBFBFB'),
        borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
      }}
    >
      {/* ========================================================================= */}
      {/* 1. MOBILE VERSION (lg:hidden) - Exact Figma Specs                        */}
      {/* ========================================================================= */}
      <div 
        className="lg:hidden absolute inset-0 flex flex-col justify-center items-center px-4 text-center z-50 select-none"
        style={{ color: isDark ? '#FFFFFF' : '#03081F' }}
      >
        <p className="text-[12px] font-normal leading-[18px] m-0 w-full">
          Order Restaurant food, takeaway and groceries.
        </p>

        <h1 className="text-[34px] font-semibold leading-[36px] tracking-tight m-0 mt-2 max-w-[321px]">
          Feast Your Senses,
          <br />
          <span className="text-[#fc8a06]">Fast and Fresh</span>
        </h1>

        <div className="flex flex-col items-center mt-4">
          <label className="text-[13px] font-normal leading-[66px] h-6 flex items-center mb-2.5 m-0 max-w-[298px]">
            Enter a postcode to see what we deliver
          </label>

          {/* Unified Mobile Pill Input */}
          <div className="relative flex items-center bg-white border border-black/40 rounded-full h-[57px] w-[293px]">
            <input
              type="text"
              placeholder="e.g. EC4R 3TE"
              className="w-full h-full bg-transparent text-[15px] text-black placeholder-black/60 font-normal outline-none pl-6 pr-[64px] rounded-full"
            />
            <button
              type="button"
              className="absolute right-0 top-0 h-[57px] w-[57px] flex items-center justify-center bg-[#fc8a06] text-white rounded-full hover:bg-[#e07a00] active:scale-[0.98] transition-all"
            >
              {/* Dark Inner Circle Circle (~1.2x size of chevron icon element) */}
              <span className="flex items-center justify-center w-[24px] h-[24px] bg-[#03081F] rounded-full text-[#fc8a06]">
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 13L7 7L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>


      {/* ========================================================================= */}
      {/* 2. DESKTOP VERSION (hidden lg:block) - Totally Untouched Arrangement      */}
      {/* ========================================================================= */}
      <div className="hidden lg:block">
        {/* Left: text + search — must render ABOVE the hero images (Figma layer order) */}
        <div
          className="absolute left-0 top-0 h-full w-[550px] flex flex-col justify-center pl-[157px] z-50 select-none"
          style={{ color: isDark ? '#FFFFFF' : '#03081F' }}
        >
          <p className="text-[16px] font-normal leading-[24px] m-0">
            Order Restaurant food, takeaway and groceries.
          </p>

          <h1 className="text-[54px] font-semibold leading-[60px] tracking-tight m-0 mt-3 w-[509px]">
            Feast Your Senses,
            <br />
            <span className="text-[#fc8a06]">Fast and Fresh</span>
          </h1>

          <div className="flex flex-col mt-8">
            <label className="text-[13px] font-normal mb-3 m-0">
              Enter a postcode to see what we deliver
            </label>

            <div className="flex items-center gap-3 w-[373px] h-[57px]">
              <input
                type="text"
                placeholder="e.g. EC4R 3TE"
                className="flex-1 h-full bg-white border border-black/40 rounded-full px-6 text-[15px] text-black placeholder-black/60 font-normal outline-none focus:border-[#fc8a06] transition-colors"
              />
              <button
                type="button"
                className="shrink-0 h-[57px] w-[188px] flex items-center justify-center bg-[#fc8a06] text-white font-bold text-[16px] rounded-full hover:bg-[#e07a00] active:scale-[0.98] shadow-md transition-all"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Orange corner shape — identical in both themes */}
        <div className="absolute right-0 bottom-0 w-[626px] h-[565px] overflow-hidden rounded-tl-[282px] rounded-br-[12px] z-0">
          <img
            src={orangeShape}
            alt=""
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        </div>

        {/* Hero1 — people/food photo, theme-dependent asset */}
        <div
          className="absolute top-[73px] w-[805px] h-[537px] overflow-hidden z-20"
          style={{
            left: isDark ? '342px' : '323px',
          }}
        >
          <img
            src={isDark ? Hero1Dark : Hero1}
            alt="Feasting graphics primary"
            className="w-full h-full object-contain select-none pointer-events-none"
          />
        </div>

        {/* Hero2 — notification backdrop image */}
        <div
          className="absolute overflow-hidden rounded-t-[12px] z-10"
          style={
            isDark
              ? { left: '690px', top: '69px', width: '465px', height: '541px' }
              : { left: '860px', top: '155px', width: '377px', height: '455px' }
          }
        >
          <img
            src={isDark ? Hero2Dark : Hero2}
            alt="Feasting graphics secondary notifications"
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        </div>

        {/* Notification overlay cards */}
        <div className="absolute right-[100px] top-[100px] w-[390px] h-[480px] z-50 pointer-events-none">
          <div className="absolute top-0 right-0 flex flex-col items-end">
            <img src={img1} alt="" className="h-[55px] object-contain -mb-3 mr-12 opacity-80" />
            <div className="w-[342px] bg-white rounded-[15px] p-4 shadow-xl border border-black/5">
              <div className="flex justify-between items-center mb-1.5">
                <img src={orderUkLogo} alt="Order.uk" className="h-[16px] object-contain" />
                <span className="text-[12px] text-black/40 font-medium">now</span>
              </div>
              <h4 className="text-[14px] font-bold text-[#03081F] m-0">We've Received your order!</h4>
              <p className="text-[12px] text-black/60 font-medium mt-0.5 m-0">Awaiting Restaurant acceptance📍</p>
            </div>
          </div>

          <div className="absolute top-[145px] right-[-40px] flex flex-col items-end">
            <img src={img2} alt="" className="h-[55px] object-contain -mb-3 mr-12 opacity-80" />
            <div className="w-[342px] bg-white rounded-[15px] p-4 shadow-xl border border-black/5">
              <div className="flex justify-between items-center mb-1.5">
                <img src={orderUkLogo} alt="Order.uk" className="h-[16px] object-contain" />
                <span className="text-[12px] text-black/40 font-medium">now</span>
              </div>
              <h4 className="text-[14px] font-bold text-[#03081F] m-0 flex items-center gap-1">
                Order Accepted! <span className="text-sm">✅</span>
              </h4>
              <p className="text-[12px] text-black/60 font-medium mt-0.5 m-0">Your order will be delivered shortly</p>
            </div>
          </div>

          <div className="absolute top-[290px] right-0 flex flex-col items-end">
            <img src={img3} alt="" className="h-[55px] object-contain -mb-3 mr-14 opacity-80" />
            <div className="w-[342px] bg-white rounded-[15px] p-4 shadow-xl border border-black/5">
              <div className="flex justify-between items-center mb-1.5">
                <img src={orderUkLogo} alt="Order.uk" className="h-[16px] object-contain" />
                <span className="text-[12px] text-black/40 font-medium">now</span>
              </div>
              <h4 className="text-[14px] font-bold text-[#03081F] m-0">Your rider's nearby 🎉</h4>
              <p className="text-[12px] text-black/60 font-medium mt-0.5 m-0">They're almost there – get ready!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;