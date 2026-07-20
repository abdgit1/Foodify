import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { LogOut, User } from 'lucide-react';
import { logout } from '../../features/authSlice';

const PAGE_TITLES = {
  '/admin-dashboard':             { title: 'Overview',     sub: 'Welcome back, Admin 👋' },
  '/admin-dashboard/analytics':   { title: 'Analytics',    sub: 'Revenue trends & performance metrics' },
  '/admin-dashboard/orders':      { title: 'Orders',       sub: 'Manage and update all customer orders' },
  '/admin-dashboard/restaurants': { title: 'Restaurants',  sub: 'Add, edit or remove restaurants' },
  '/admin-dashboard/menu-items':  { title: 'Menu Items',   sub: 'Manage dishes across all restaurants' },
  '/admin-dashboard/categories':  { title: 'Categories',   sub: 'Food categories and classifications' },
  '/admin-dashboard/deals':       { title: 'Deals',        sub: 'Combo offers and promotional bundles' },
};

export default function AdminTopbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const page = PAGE_TITLES[pathname] || { title: 'Admin', sub: '' };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const initials = user?.username?.[0]?.toUpperCase() ?? 'A';

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#0a0f2e]/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 px-6 py-4 flex items-center justify-between gap-4">
      {/* Page title */}
      <div>
        <h1 className="text-[20px] font-bold text-[#03081F] dark:text-white leading-tight">{page.title}</h1>
        <p className="text-[12px] text-black/40 dark:text-white/40 mt-0.5">{page.sub}</p>
      </div>

      {/* Right side — avatar dropdown only */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((o) => !o)}
          className="w-[40px] h-[40px] bg-[#fc8a06] rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 cursor-pointer hover:bg-[#e07a00] transition-colors shadow-md shadow-[#fc8a06]/30"
          aria-label="Open user menu"
        >
          {initials}
        </button>

        {/* Dropdown panel */}
        {dropdownOpen && (
          <div className="absolute right-0 top-[calc(100%+8px)] w-[230px] bg-white dark:bg-[#0a0f2e] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-black/5 dark:border-white/10 overflow-hidden z-50">
            {/* User info */}
            <div className="px-4 py-4 border-b border-black/5 dark:border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#fc8a06] flex items-center justify-center text-white font-bold text-sm shrink-0">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-[14px] font-bold text-[#03081F] dark:text-white truncate">
                  {user?.username ?? 'Admin'}
                </p>
                <p className="text-[11px] text-black/40 dark:text-white/40 truncate">
                  {user?.email ?? 'admin@foodify.com'}
                </p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[#fc8a06]/10 text-[#fc8a06] text-[10px] font-semibold uppercase tracking-wide">
                  Admin
                </span>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
            >
              <LogOut size={15} />
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
