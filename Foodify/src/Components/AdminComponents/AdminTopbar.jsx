import { Bell, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

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
  const page = PAGE_TITLES[pathname] || { title: 'Admin', sub: '' };

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#0a0f2e]/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 px-6 py-4 flex items-center justify-between gap-4">
      {/* Page title */}
      <div>
        <h1 className="text-[20px] font-bold text-[#03081F] dark:text-white leading-tight">{page.title}</h1>
        <p className="text-[12px] text-black/40 dark:text-white/40 mt-0.5">{page.sub}</p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Search bar */}
        <div className="hidden sm:flex items-center gap-2 bg-black/5 dark:bg-white/5 rounded-xl px-4 h-[40px] w-[220px] border border-black/5 dark:border-white/10">
          <Search size={14} className="text-black/30 dark:text-white/30 shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-[13px] text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none w-full"
          />
        </div>

        {/* Notifications */}
        <button className="relative w-[40px] h-[40px] bg-black/5 dark:bg-white/5 rounded-xl flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer">
          <Bell size={16} className="text-black/60 dark:text-white/60" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#fc8a06] rounded-full"></span>
        </button>

        {/* Admin avatar */}
        <div className="w-[40px] h-[40px] bg-[#fc8a06] rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 cursor-pointer hover:opacity-90 transition-opacity">
          A
        </div>
      </div>
    </header>
  );
}
