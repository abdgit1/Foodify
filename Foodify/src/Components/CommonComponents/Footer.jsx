import React from 'react';
import footerLogo from "../../assets/FooterOrderUK.png";
import appStoreBadges from "../../assets/app-store-badges.png";
import FacebookIcon from "../../assets/Facebook.png";
import InstagramIcon from "../../assets/Instagram.png";
import TikTokIcon from "../../assets/TikTok.png";
import SnapchatIcon from "../../assets/Snapchat.png";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col font-body">

      {/* ══════════════════════ DESKTOP (unchanged) ══════════════════════ */}
      <div className="hidden lg:block">
        <div className="w-full h-[371px] bg-[#D9D9D9] text-brand-dark border-b border-black/5">
          <div className="mx-auto max-w-[1528px] h-full px-6 pt-[60px] pb-10 flex justify-between items-start">

            {/* Column 1: Brand Info & App Badges */}
            <div className="flex flex-col gap-5 max-w-[361px]">
              <img
                src={footerLogo}
                alt="Order.uk"
                className="w-[260px] h-[68px] object-contain"
              />
              <img
                src={appStoreBadges}
                alt="Download on App Store and Google Play"
                className="w-[361px] h-[53px] object-contain cursor-pointer"
              />
              <p className="text-[13px] leading-relaxed text-black/70">
                Company # 490039-445, Registered with House of companies.
              </p>
            </div>

            {/* Column 2: Newsletter Intake Input & Socials */}
            <div className="flex flex-col">
              <h4 className="text-[18px] font-bold text-[#03081F] h-[43px] flex items-center">
                Get Exclusive Deals in your Inbox
              </h4>

              <div className="flex items-center mt-3 w-[381px] h-[59px] bg-black/5 rounded-[120px] p-1 border border-black/10">
                <input
                  type="email"
                  placeholder="youremail@gmail.com"
                  className="w-full h-full bg-transparent pl-6 pr-4 border-none outline-none text-[15px] text-brand-dark placeholder-black/40 font-medium"
                />
                <button className="w-[171px] h-[51px] bg-[#FC8A06] text-white font-semibold text-[16px] rounded-[120px] shadow-sm hover:bg-[#e07a00] transition-colors cursor-pointer flex items-center justify-center">
                  Subscribe
                </button>
              </div>

              <p className="text-[13px] mt-2 text-black/60 pl-6">
                we won't spam, read our <span className="underline cursor-pointer hover:text-black">email policy</span>
              </p>

              <div className="flex items-center gap-[18px] mt-6 pl-6">
                <img src={FacebookIcon} alt="Facebook" className="w-[45px] h-[45px] object-contain cursor-pointer hover:opacity-80 transition-opacity" />
                <img src={InstagramIcon} alt="Instagram" className="w-[45px] h-[45px] object-contain cursor-pointer hover:opacity-80 transition-opacity" />
                <img src={TikTokIcon} alt="TikTok" className="w-[45px] h-[45px] object-contain cursor-pointer hover:opacity-80 transition-opacity" />
                <img src={SnapchatIcon} alt="Snapchat" className="w-[45px] h-[45px] object-contain cursor-pointer hover:opacity-80 transition-opacity" />
              </div>
            </div>

            {/* Column 3: Legal Pages */}
            <div className="flex flex-col">
              <h4 className="text-[18px] font-bold text-[#03081F] h-[43px] flex items-center">
                Legal Pages
              </h4>
              <ul className="flex flex-col mt-2 text-[15px] font-medium text-black">
                <li className="h-[43px] flex items-center cursor-pointer underline hover:text-brand-orange transition-colors">Terms and conditions</li>
                <li className="h-[43px] flex items-center cursor-pointer underline hover:text-brand-orange transition-colors">Privacy</li>
                <li className="h-[43px] flex items-center cursor-pointer underline hover:text-brand-orange transition-colors">Cookies</li>
                <li className="h-[43px] flex items-center cursor-pointer underline hover:text-brand-orange transition-colors">Modern Slavery Statement</li>
              </ul>
            </div>

            {/* Column 4: Important Links */}
            <div className="flex flex-col">
              <h4 className="text-[18px] font-bold text-[#03081F] h-[43px] flex items-center">
                Important Links
              </h4>
              <ul className="flex flex-col mt-2 text-[15px] font-medium text-black">
                <li className="h-[43px] flex items-center cursor-pointer underline hover:text-brand-orange transition-colors">Get help</li>
                <li className="h-[43px] flex items-center cursor-pointer underline hover:text-brand-orange transition-colors">Add your restaurant</li>
                <li className="h-[43px] flex items-center cursor-pointer underline hover:text-brand-orange transition-colors">Sign up to deliver</li>
                <li className="h-[43px] flex items-center cursor-pointer underline hover:text-brand-orange transition-colors">Create a business account</li>
              </ul>
            </div>

          </div>
        </div>

        <div className="w-full h-[73px] bg-brand-dark text-white text-sm">
          <div className="mx-auto max-w-[1528px] h-full px-6 flex items-center justify-between">
            <span className="opacity-90">
              Order.uk Copyright 2024, All Rights Reserved.
            </span>
            <div className="flex items-center gap-6 opacity-90">
              <span className="cursor-pointer hover:underline">Privacy Policy</span>
              <span className="cursor-pointer hover:underline">Terms</span>
              <span className="cursor-pointer hover:underline">Pricing</span>
              <span className="cursor-pointer hover:underline">Do not sell or share my personal information</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════ MOBILE (per Figma "Mobile Home", node 1:347) ══════════════════════ */}
      <div className="lg:hidden w-full bg-[#D9D9D9] text-brand-dark">
        <div className="flex flex-col items-center px-6 pt-10 pb-8 gap-4">

          {/* Logo */}
          <img src={footerLogo} alt="Order.uk" className="w-[268px] max-w-full h-[66px] object-contain" />

          {/* App store badges */}
          <img
            src={appStoreBadges}
            alt="Download on App Store and Google Play"
            className="w-[361px] max-w-full h-[53px] object-contain cursor-pointer"
          />

          {/* Company text — centered on mobile */}
          <p className="text-[15px] text-center text-black leading-relaxed">
            Company # 490039-445, Registered with<br />House of companies.
          </p>

          {/* Newsletter */}
          <h4 className="text-[18px] font-bold text-[#03081F] mt-4 self-start">
            Get Exclusive Deals in your Inbox
          </h4>

          <div className="flex items-center w-full h-[59px] bg-black/5 rounded-[120px] p-1 border border-black/10">
            <input
              type="email"
              placeholder="youremail@gmail.com"
              className="w-full h-full bg-transparent pl-6 pr-4 border-none outline-none text-[14px] text-brand-dark placeholder-black/40 font-medium"
            />
            <button className="shrink-0 w-[130px] h-[51px] bg-[#FC8A06] text-white font-semibold text-[15px] rounded-[120px] shadow-sm hover:bg-[#e07a00] transition-colors cursor-pointer flex items-center justify-center">
              Subscribe
            </button>
          </div>

          <p className="text-[13px] text-black/60 self-start">
            we wont spam, read our <span className="underline cursor-pointer hover:text-black">email policy</span>
          </p>

          {/* Socials */}
          <div className="flex items-center gap-[18px] mt-2">
            <img src={FacebookIcon} alt="Facebook" className="w-[45px] h-[45px] object-contain cursor-pointer hover:opacity-80 transition-opacity" />
            <img src={InstagramIcon} alt="Instagram" className="w-[45px] h-[45px] object-contain cursor-pointer hover:opacity-80 transition-opacity" />
            <img src={TikTokIcon} alt="TikTok" className="w-[45px] h-[45px] object-contain cursor-pointer hover:opacity-80 transition-opacity" />
            <img src={SnapchatIcon} alt="Snapchat" className="w-[45px] h-[45px] object-contain cursor-pointer hover:opacity-80 transition-opacity" />
          </div>

          {/* Legal Pages */}
          <h4 className="text-[18px] font-bold text-[#03081F] mt-6 self-start">Legal Pages</h4>
          <ul className="flex flex-col gap-2 text-[15px] font-medium text-black self-start underline">
            <li className="cursor-pointer hover:text-brand-orange transition-colors">Terms and conditions</li>
            <li className="cursor-pointer hover:text-brand-orange transition-colors">Privacy</li>
            <li className="cursor-pointer hover:text-brand-orange transition-colors">Cookies</li>
            <li className="cursor-pointer hover:text-brand-orange transition-colors">Modern Slavery Statement</li>
          </ul>

          {/* Important Links */}
          <h4 className="text-[18px] font-bold text-[#03081F] mt-4 self-start">Important Links</h4>
          <ul className="flex flex-col gap-2 text-[15px] font-medium text-black self-start underline">
            <li className="cursor-pointer hover:text-brand-orange transition-colors">Get help</li>
            <li className="cursor-pointer hover:text-brand-orange transition-colors">Add your restaurant</li>
            <li className="cursor-pointer hover:text-brand-orange transition-colors">Sign up to deliver</li>
            <li className="cursor-pointer hover:text-brand-orange transition-colors">Create a business account</li>
          </ul>
        </div>

        {/* Bottom copyright bar */}
        <div className="w-full bg-brand-dark text-white text-sm">
          <div className="px-6 py-5 flex flex-col items-center gap-2 text-center">
            <span className="opacity-90">Order.uk Copyright 2024, All Rights Reserved.</span>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;