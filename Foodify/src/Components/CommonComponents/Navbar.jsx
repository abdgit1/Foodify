import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import logo from "../../assets/OrderUKLogo.png";
import locationIcon from "../../assets/LocationIcon.png";
import basketIcon from "../../assets/Full Shopping Basket.png";
import arrowDownIcon from "../../assets/Forward Button.png";
import aycanAvatar from "../../assets/AycanAvatar.png";
import { Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Browse Menu", path: "/#menu" },
  { label: "Special Offers", path: "/offers" },
  { label: "Restaurants", path: "/restaurants" },
  { label: "Track Order", path: "/orders/track" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      {/* ══════════════════════ DESKTOP (unchanged) ══════════════════════ */}
      <div className="hidden lg:block">
        {/* ── Top promo / utility strip ─────────────────────────── */}
        <div
          className="w-full mx-auto bg-brand-offwhite border-b border-x border-black/10 rounded-b-card overflow-hidden font-body text-black"
          style={{ maxWidth: "1528px" }}
        >
          <div className="h-[70px] flex items-center justify-between px-[137px] gap-0">
            {/* Promo text */}
            <div className="flex items-center gap-2 text-[15px] font-medium">
              <span className="text-[25px] leading-none">🌟</span>
              <p className="leading-snug">
                Get 5% Off your first order,{" "}
                <span className="text-brand-orange font-bold underline cursor-pointer">
                  Promo: ORDER5
                </span>
              </p>
            </div>

            {/* Right side */}
            <div className="flex items-center justify-end gap-9">
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={locationIcon}
                  alt="Location Pin"
                  className="w-[25px] h-[25px] object-contain shrink-0"
                />
                <span className="text-[15px] font-medium text-brand-dark truncate">
                  Regent Street, A4, A4201, London
                </span>
                <button className="text-[14px] font-medium text-brand-orange underline hover:opacity-80 transition-opacity cursor-pointer whitespace-nowrap">
                  Change Location
                </button>
              </div>

              {/* Basket */}
              <div className="flex items-center bg-brand-green border border-black/10 rounded-br-card text-white font-body h-full w-[378px]">
                <div className="flex items-center justify-center px-2 flex-1">
                  <img
                    src={basketIcon}
                    alt="Basket"
                    className="w-[43px] h-[43px] object-contain"
                  />
                </div>

                <div className="h-full w-px bg-white/30" />

                <div className="w-[112px] flex items-center justify-center font-semibold text-[16px]">
                  23 Items
                </div>

                <div className="h-full w-px bg-white/30" />

                <div className="flex items-center justify-center w-[116px] font-semibold text-[16px]">
                  GBP 79.89
                </div>

                <div className="h-full w-px bg-white/30" />

                <button className="flex-1 h-full flex items-center justify-center hover:bg-black/10 transition-colors cursor-pointer rounded-br-card">
                  <img
                    src={arrowDownIcon}
                    alt="Go to checkout"
                    className="w-[38px] h-[38px] object-contain rotate-90"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop nav row */}
        <div
          className="w-full mx-auto"
          style={{ maxWidth: "1528px", marginTop: "38px" }}
        >
          <div className="px-6 flex items-center justify-between">
            <Link to="/">
              <img
                src={logo}
                alt="Order UK Logo"
                className="w-[215px] h-auto object-contain"
              />
            </Link>

            <nav className="flex items-center gap-8 font-nav text-sm font-semibold">
              {navLinks.map((link) =>
                link.label === "Browse Menu" ? (
                  <HashLink
                    key={link.label}
                    smooth
                    to="/#menu"
                    className="w-[127px] h-[45px] text-brand-dark hover:text-brand-orange flex items-center justify-center transition-colors duration-200"
                  >
                    {link.label}
                  </HashLink>
                ) : (
                  <NavLink
                    key={link.label}
                    to={link.path}
                    end={link.path === "/"}
                    className={({ isActive }) =>
                      isActive
                        ? "w-[127px] h-[45px] bg-brand-orange text-white rounded-pill flex items-center justify-center transition-colors duration-200"
                        : "w-[127px] h-[45px] text-brand-dark hover:text-brand-orange flex items-center justify-center transition-colors duration-200"
                    }
                  >
                    {link.label}
                  </NavLink>
                )
              )}
            </nav>

            <div className="flex items-center gap-4">
              <ThemeToggle />

              <Link
                to="/login"
                className="w-[234px] h-[61px] bg-brand-dark text-white rounded-pill flex items-center justify-center gap-3 font-nav text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <div className="w-[30px] h-[30px] bg-brand-orange rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5-4-8-4z" />
                  </svg>
                </div>

                <span>Login/Signup</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════ MOBILE (per Figma "Mobile Home", node 1:347) ══════════════════════ */}
      <div className="lg:hidden w-full relative">
        {/* Row 1: Logo + Theme Toggle + Hamburger */}
        <div className="flex items-center justify-between px-4 pt-[27px] pb-[18px]">
          <Link to="/">
            <img src={logo} alt="Order UK Logo" className="w-[154px] h-[38px] object-contain" />
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              <Menu size={32} className="text-brand-dark" strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {/* Row 2: Promo/basket bar — avatar+name inline in orange segment, basket chip in green segment */}
        <div className="w-full h-[77px] flex items-center">
          {/* Orange segment — rider avatar + name, vertically centered, plain text (no pill bg) */}
          <div className="flex-1 h-full bg-brand-orange flex items-center gap-3 px-5">
            <img
              src={aycanAvatar}
              alt="Aycan"
              className="w-[44px] h-[44px] rounded-full object-cover"
            />
            <span className="text-[16px] font-bold text-brand-dark">Aycan</span>
          </div>

          {/* Green segment — basket icon + price */}
          <div className="flex items-center bg-brand-green h-full w-[220px] justify-center gap-2 shrink-0">
            <img src={basketIcon} alt="Basket" className="w-[38px] h-[38px] object-contain" />
            <span className="text-white font-semibold text-[16px]">GBP 79.89</span>
          </div>
        </div>

        {/* Row 3: Location */}
        <div className="flex items-center gap-2 px-4 pt-[15px] pb-[15px]">
          <img src={locationIcon} alt="Location Pin" className="w-[25px] h-[25px] object-contain shrink-0" />
          <span className="text-[14px] text-black truncate">Lution Street, N4G-00...</span>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="w-full px-4 py-4 flex flex-col gap-4 bg-white border-b border-black/10">
            {navLinks.map((link) =>
              link.label === "Browse Menu" ? (
                <HashLink
                  key={link.label}
                  smooth
                  to="/#menu"
                  onClick={() => setMenuOpen(false)}
                  className="text-brand-dark font-medium"
                >
                  {link.label}
                </HashLink>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "text-brand-orange font-semibold" : "text-brand-dark font-medium"
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-brand-orange font-semibold"
            >
              Login/Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;