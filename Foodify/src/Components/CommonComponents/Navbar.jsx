import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/OrderUKLogo.png";
import locationIcon from "../../assets/LocationIcon.png";
import basketIcon from "../../assets/Full Shopping Basket.png";
import arrowDownIcon from "../../assets/Forward Button.png";
import { Menu, LogOut, ChevronDown, Store, Loader2 } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useAuthModal } from "../../context/AuthModalContext";
import { logout } from "../../features/authSlice";
import { setCartCount } from "../../features/cartSlice";
import { getAllRestaurants } from "../../services/restaurantservices";
import { getCart } from "../../services/cartService";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Browse Menu", path: "/#categories" },
  { label: "Special Offers", path: "/#exclusive-deals" },
  { label: "Restaurants", path: "/restaurants", hasDropdown: true },
  { label: "Track Order", path: "/orders/track" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [restaurantDropdownOpen, setRestaurantDropdownOpen] = useState(false);
  const [mobileRestaurantsOpen, setMobileRestaurantsOpen] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantsLoading, setRestaurantsLoading] = useState(false);
  const dropdownRef = useRef(null);
  const { openLogin } = useAuthModal();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const cartItemCount = useSelector((state) => state.cart.itemCount);

  // Fetch restaurants once on mount for the dropdown
  useEffect(() => {
    let cancelled = false;
    setRestaurantsLoading(true);
    getAllRestaurants()
      .then((data) => { if (!cancelled) setRestaurants(data); })
      .catch(() => { if (!cancelled) setRestaurants([]); })
      .finally(() => { if (!cancelled) setRestaurantsLoading(false); });
    return () => { cancelled = true; };
  }, []);

  // Fetch cart item count whenever auth state changes
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(setCartCount(0));
      return;
    }
    let cancelled = false;
    getCart()
      .then((cart) => {
        if (!cancelled) {
          const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
          dispatch(setCartCount(count));
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [isAuthenticated, dispatch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setRestaurantDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      {/* ══════════════════════ DESKTOP ══════════════════════ */}
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

              {/* Basket – links to /cart */}
              <Link
                to="/cart"
                className="flex items-center bg-brand-green border border-black/10 rounded-br-card text-white font-body h-full w-[378px] hover:brightness-110 transition-all"
              >
                <div className="flex items-center justify-center px-2 flex-1">
                  <img
                    src={basketIcon}
                    alt="Basket"
                    className="w-[43px] h-[43px] object-contain"
                  />
                </div>

                <div className="h-full w-px bg-white/30" />

                <div className="w-[112px] flex items-center justify-center font-semibold text-[16px]">
                  {cartItemCount} {cartItemCount === 1 ? "Item" : "Items"}
                </div>

                <div className="h-full w-px bg-white/30" />

                <div className="flex items-center justify-center w-[116px] font-semibold text-[16px]">
                  $79.89
                </div>

                <div className="h-full w-px bg-white/30" />

                <div className="flex-1 h-full flex items-center justify-center hover:bg-black/10 transition-colors cursor-pointer rounded-br-card">
                  <img
                    src={arrowDownIcon}
                    alt="Go to cart"
                    className="w-[38px] h-[38px] object-contain rotate-90"
                  />
                </div>
              </Link>
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
              {navLinks.map((link) => {
                if (link.path.startsWith("/#")) {
                  return (
                    <HashLink
                      key={link.label}
                      smooth
                      to={link.path}
                      className="w-[127px] h-[45px] text-brand-dark hover:text-brand-orange flex items-center justify-center transition-colors duration-200"
                    >
                      {link.label}
                    </HashLink>
                  );
                }

                if (link.hasDropdown) {
                  return (
                    <div key={link.label} className="relative" ref={dropdownRef}>
                      <button
                        onClick={() => setRestaurantDropdownOpen((o) => !o)}
                        className="w-[127px] h-[45px] text-brand-dark hover:text-brand-orange flex items-center justify-center gap-1.5 transition-colors duration-200"
                      >
                        {link.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${restaurantDropdownOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {/* Dropdown panel */}
                      {restaurantDropdownOpen && (
                        <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[260px] bg-white dark:bg-[#0a0f2e] rounded-[14px] shadow-[0px_8px_30px_0px_rgba(0,0,0,0.12)] border border-black/5 dark:border-white/10 overflow-hidden z-50">
                          <div className="px-4 py-3 border-b border-black/5 dark:border-white/10">
                            <p className="text-[11px] font-bold text-black/40 dark:text-white/40 uppercase tracking-wider">
                              All Restaurants
                            </p>
                          </div>

                          <div className="max-h-[320px] overflow-y-auto py-2">
                            {restaurantsLoading ? (
                              <div className="flex items-center justify-center gap-2 py-6 text-black/40 dark:text-white/40 text-[13px]">
                                <Loader2 size={15} className="animate-spin" />
                                Loading…
                              </div>
                            ) : restaurants.length === 0 ? (
                              <p className="text-[13px] text-black/40 dark:text-white/40 px-4 py-5 text-center">
                                No restaurants found.
                              </p>
                            ) : (
                              restaurants.map((r) => (
                                <Link
                                  key={r.id}
                                  to={`/restaurants/${r.id}`}
                                  onClick={() => setRestaurantDropdownOpen(false)}
                                  className="flex items-center gap-3 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                                >
                                  {r.image ? (
                                    <img
                                      src={r.image}
                                      alt={r.name}
                                      className="w-[38px] h-[38px] rounded-lg object-cover shrink-0"
                                    />
                                  ) : (
                                    <div className="w-[38px] h-[38px] rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0">
                                      <Store size={16} className="text-black/30 dark:text-white/30" />
                                    </div>
                                  )}
                                  <span className="text-[14px] font-medium text-[#03081F] dark:text-white truncate">
                                    {r.name}
                                  </span>
                                </Link>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
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
                );
              })}
            </nav>

            <div className="flex items-center gap-4">
              <ThemeToggle />

              {isAuthenticated ? (
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
                <button
                  type="button"
                  onClick={openLogin}
                  className="w-[234px] h-[61px] bg-brand-dark text-white rounded-pill flex items-center justify-center gap-3 font-nav text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  <div className="w-[30px] h-[30px] bg-brand-orange rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
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

      {/* ══════════════════════ MOBILE ══════════════════════ */}
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

        {/* Row 2: Login/User bar */}
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
            <button
              type="button"
              onClick={openLogin}
              className="flex-1 h-full bg-brand-orange flex items-center gap-3 px-5 hover:bg-brand-orange/90 transition-colors"
            >
              <div className="w-[34px] h-[34px] bg-brand-dark rounded-full flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5-4-8-4z" />
                </svg>
              </div>
              <span className="text-[16px] font-bold text-brand-dark select-none whitespace-nowrap">
                Login/Signup
              </span>
            </button>
          )}

          {/* Green segment */}
          <div className="flex items-center bg-brand-green h-full w-[220px] justify-center gap-2 shrink-0">
            <img src={basketIcon} alt="Basket" className="w-[38px] h-[38px] object-contain" />
            <span className="text-white font-semibold text-[16px]">$79.89</span>
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
            {navLinks.map((link) => {
              if (link.path.startsWith("/#")) {
                return (
                  <HashLink
                    key={link.label}
                    smooth
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="text-brand-dark dark:text-white font-medium"
                  >
                    {link.label}
                  </HashLink>
                );
              }

              if (link.hasDropdown) {
                return (
                  <div key={link.label}>
                    <button
                      onClick={() => setMobileRestaurantsOpen((o) => !o)}
                      className="flex items-center justify-between w-full text-brand-dark dark:text-white font-medium"
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${mobileRestaurantsOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {mobileRestaurantsOpen && (
                      <div className="mt-2 pl-3 border-l-2 border-brand-orange flex flex-col gap-1">
                        {restaurantsLoading ? (
                          <div className="flex items-center gap-2 py-2 text-black/40 dark:text-white/40 text-[13px]">
                            <Loader2 size={13} className="animate-spin" />
                            Loading…
                          </div>
                        ) : restaurants.length === 0 ? (
                          <p className="text-[13px] text-black/40 dark:text-white/40 py-2">
                            No restaurants found.
                          </p>
                        ) : (
                          restaurants.map((r) => (
                            <Link
                              key={r.id}
                              to={`/restaurants/${r.id}`}
                              onClick={() => { setMenuOpen(false); setMobileRestaurantsOpen(false); }}
                              className="flex items-center gap-2 py-2 text-[14px] text-[#03081F] dark:text-white hover:text-brand-orange transition-colors"
                            >
                              {r.image ? (
                                <img
                                  src={r.image}
                                  alt={r.name}
                                  className="w-[28px] h-[28px] rounded-md object-cover shrink-0"
                                />
                              ) : (
                                <div className="w-[28px] h-[28px] rounded-md bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0">
                                  <Store size={13} className="text-black/30 dark:text-white/30" />
                                </div>
                              )}
                              {r.name}
                            </Link>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <NavLink
                  key={link.label}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-brand-orange font-semibold"
                      : "text-brand-dark dark:text-white font-medium"
                  }
                >
                  {link.label}
                </NavLink>
              );
            })}

            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => { setMenuOpen(false); handleLogout(); }}
                className="text-red-500 font-semibold text-left"
              >
                Log Out
              </button>
            ) : (
              <button
                type="button"
                onClick={() => { setMenuOpen(false); openLogin(); }}
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