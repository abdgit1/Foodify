import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/OrderUKLogo.png";
import locationIcon from "../../assets/LocationIcon.png";
import basketIcon from "../../assets/Full Shopping Basket.png";
import arrowDownIcon from "../../assets/Forward Button.png";
import { Menu, LogOut, ChevronDown, Store, ChevronRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useAuthModal } from "../../context/AuthModalContext";
import { logout } from "../../features/authSlice";
import { getAllRestaurants } from "../../services/restaurantservices";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Browse Menu", path: "/#menu" },
  { label: "Special Offers", path: "/offers" },
  { label: "Track Order", path: "/orders/track" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileRestaurantsOpen, setMobileRestaurantsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [restLoading, setRestLoading] = useState(false);
  const dropdownRef = useRef(null);

  const { openLogin } = useAuthModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch restaurants once on mount for dropdown use
  useEffect(() => {
    setRestLoading(true);
    getAllRestaurants()
      .then(setRestaurants)
      .catch(() => setRestaurants([]))
      .finally(() => setRestLoading(false));
  }, []);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleRestaurantSelect = (id) => {
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate(`/restaurants/${id}`);
  };

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

              {/* ── Restaurants Dropdown ── */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdownOpen((o) => !o)}
                  className="w-[127px] h-[45px] flex items-center justify-center gap-1.5 text-brand-dark hover:text-brand-orange transition-colors duration-200 font-semibold text-sm"
                >
                  Restaurants
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[260px] bg-white dark:bg-[#0a0f2e] rounded-[14px] shadow-[0px_8px_40px_rgba(0,0,0,0.14)] border border-black/5 dark:border-white/5 overflow-hidden z-[9999]">
                    {/* Header with "View All" link */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-black/5 dark:border-white/5">
                      <span className="text-[12px] font-bold text-black/40 dark:text-white/40 uppercase tracking-wider">
                        All Restaurants
                      </span>
                      <HashLink
                        smooth
                        to="/#popular-restaurants"
                        onClick={() => setDropdownOpen(false)}
                        className="text-[12px] text-[#fc8a06] font-semibold hover:underline"
                      >
                        View All
                      </HashLink>
                    </div>

                    {/* Loading */}
                    {restLoading && (
                      <div className="p-4 space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center gap-3 animate-pulse">
                            <div className="w-10 h-10 rounded-lg bg-black/10 dark:bg-white/10 shrink-0" />
                            <div className="h-3 flex-1 rounded bg-black/10 dark:bg-white/10" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Empty */}
                    {!restLoading && restaurants.length === 0 && (
                      <div className="p-6 text-center text-[13px] text-black/40 dark:text-white/40">
                        No restaurants available.
                      </div>
                    )}

                    {/* List */}
                    {!restLoading && restaurants.length > 0 && (
                      <ul className="py-1 max-h-[320px] overflow-y-auto">
                        {restaurants.map((r) => (
                          <li key={r.id}>
                            <button
                              onClick={() => handleRestaurantSelect(r.id)}
                              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors"
                            >
                              {r.image ? (
                                <img
                                  src={r.image}
                                  alt={r.name}
                                  className="w-10 h-10 rounded-lg object-cover shrink-0"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0">
                                  <Store size={18} className="text-black/20 dark:text-white/20" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-semibold text-[#03081F] dark:text-white truncate">
                                  {r.name}
                                </p>
                                {r.address && (
                                  <p className="text-[11px] text-black/40 dark:text-white/40 truncate mt-0.5">
                                    {r.address}
                                  </p>
                                )}
                              </div>
                              <ChevronRight size={14} className="text-black/25 dark:text-white/25 shrink-0" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </nav>

            <div className="flex items-center gap-4">
              <ThemeToggle />

              {isAuthenticated ? (
                /* Logged in — show name + logout instead of Login/Signup */
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 pl-2">
                    <div className="w-[36px] h-[36px] bg-brand-orange rounded-full flex items-center justify-center text-white font-bold text-[14px]">
                      {user?.username?.[0]?.toUpperCase() || "U"}
                    </div>
                    <span className="text-[14px] font-semibold text-brand-dark dark:text-white">
                      {user?.username}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    aria-label="Log out"
                    className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
                  >
                    <LogOut size={18} className="text-brand-dark dark:text-white" />
                  </button>
                </div>
              ) : (
                /* Was: <Link to="/login">. Now opens the AuthModal instead of navigating. */
                <button
                  type="button"
                  onClick={openLogin}
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
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════ MOBILE (Modified Segment Layer) ══════════════════════ */}
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

        {/* Row 2: Promo/basket bar — Login action opens AuthModal, or shows user when logged in */}
        <div className="w-full h-[77px] flex items-center">
          {isAuthenticated ? (
            <div className="flex-1 h-full bg-brand-orange flex items-center justify-between px-5">
              <div className="flex items-center gap-3">
                <div className="w-[34px] h-[34px] bg-brand-dark rounded-full flex items-center justify-center text-white font-bold text-[14px] shrink-0">
                  {user?.username?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="text-[16px] font-bold text-brand-dark truncate">
                  {user?.username}
                </span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                aria-label="Log out"
                className="w-[34px] h-[34px] flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors shrink-0"
              >
                <LogOut size={16} className="text-brand-dark" />
              </button>
            </div>
          ) : (
            /* Was: <Link to="/login">. Now opens the AuthModal instead of navigating. */
            <button
              type="button"
              onClick={openLogin}
              className="flex-1 h-full bg-brand-orange flex items-center gap-3 px-5 hover:bg-brand-orange/90 transition-colors"
            >
              <div className="w-[34px] h-[34px] bg-brand-dark rounded-full flex items-center justify-center shrink-0">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5-4-8-4z" />
                </svg>
              </div>
              <span className="text-[16px] font-bold text-brand-dark select-none whitespace-nowrap">
                Login/Signup
              </span>
            </button>
          )}

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
          <div className="w-full px-4 py-4 flex flex-col gap-4 bg-white dark:bg-[#0a0f2e] border-b border-black/10 dark:border-white/10">
            {navLinks.map((link) =>
              link.label === "Browse Menu" ? (
                <HashLink
                  key={link.label}
                  smooth
                  to="/#menu"
                  onClick={() => setMenuOpen(false)}
                  className="text-brand-dark dark:text-white font-medium"
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
                    isActive ? "text-brand-orange font-semibold" : "text-brand-dark dark:text-white font-medium"
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}

            {/* ── Mobile Restaurants Sub-list ── */}
            <div>
              <button
                onClick={() => setMobileRestaurantsOpen((o) => !o)}
                className="w-full flex items-center justify-between text-brand-dark dark:text-white font-medium"
              >
                <span>Restaurants</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${mobileRestaurantsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {mobileRestaurantsOpen && (
                <div className="mt-2 ml-3 border-l-2 border-[#fc8a06]/30 pl-3 flex flex-col gap-1">
                  {/* View All */}
                  <HashLink
                    smooth
                    to="/#popular-restaurants"
                    onClick={() => {
                      setMenuOpen(false);
                      setMobileRestaurantsOpen(false);
                    }}
                    className="text-[13px] text-[#fc8a06] font-semibold text-left py-1"
                  >
                    View All Restaurants
                  </HashLink>

                  {restLoading && (
                    <p className="text-[12px] text-black/40 dark:text-white/40 py-1">Loading…</p>
                  )}

                  {!restLoading && restaurants.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => handleRestaurantSelect(r.id)}
                      className="flex items-center gap-2 py-1.5 text-left"
                    >
                      {r.image ? (
                        <img src={r.image} alt={r.name} className="w-8 h-8 rounded-md object-cover shrink-0" />
                      ) : (
                        <div className="w-8 h-8 rounded-md bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0">
                          <Store size={14} className="text-black/20 dark:text-white/20" />
                        </div>
                      )}
                      <span className="text-[13px] font-medium text-[#03081F] dark:text-white truncate">
                        {r.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="text-red-500 font-semibold text-left"
              >
                Log Out
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openLogin();
                }}
                className="text-brand-orange font-semibold text-left"
              >
                Login/Signup
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;