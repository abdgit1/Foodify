import { LayoutDashboard, ShoppingBag, UtensilsCrossed, Tag, Layers, BarChart2, ChevronRight, X, Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../assets/OrderUKLogo.png';

const navItems = [
  { label: 'Overview',     path: '/admin-dashboard',              icon: LayoutDashboard, end: true },
  { label: 'Analytics',    path: '/admin-dashboard/analytics',    icon: BarChart2        },
  { label: 'Orders',       path: '/admin-dashboard/orders',       icon: ShoppingBag      },
  { label: 'Restaurants',  path: '/admin-dashboard/restaurants',  icon: UtensilsCrossed  },
  { label: 'Menu Items',   path: '/admin-dashboard/menu-items',   icon: Layers           },
  { label: 'Categories',   path: '/admin-dashboard/categories',   icon: Tag              },
  { label: 'Deals',        path: '/admin-dashboard/deals',        icon: ShoppingBag      },
  { label: 'Deal Items',   path: '/admin-dashboard/deal-items',   icon: Layers           },
];

export default function AdminSidebar({ collapsed, setCollapsed }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col h-screen sticky top-0 bg-[#03081F] border-r border-white/5 transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-[240px]'}`}
      >
        {/* Logo */}
        <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/5 ${collapsed ? 'justify-center' : ''}`}>
          {!collapsed && (
            <div className="flex-1 dark:bg-white dark:rounded-lg dark:px-2 dark:py-1">
              <img src={logo} alt="Foodify" className="w-[120px] h-auto object-contain" />
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 bg-[#fc8a06] rounded-lg flex items-center justify-center font-bold text-white text-sm">F</div>
          )}
        </div>

        {/* Admin badge */}
        {!collapsed && (
          <div className="px-4 py-3 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#fc8a06] flex items-center justify-center text-white font-bold text-sm shrink-0">A</div>
              <div className="min-w-0">
                <p className="text-white text-[13px] font-semibold truncate">Admin Panel</p>
                <p className="text-white/40 text-[11px] truncate">admin@foodify.com</p>
              </div>
            </div>
          </div>
        )}

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 flex flex-col gap-1">
          {navItems.map(({ label, path, icon: Icon, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 group
                ${isActive
                  ? 'bg-[#fc8a06] text-white shadow-lg shadow-[#fc8a06]/20'
                  : 'text-white/50 hover:bg-white/5 hover:text-white'
                }
                ${collapsed ? 'justify-center' : ''}`
              }
              title={collapsed ? label : undefined}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center gap-2 p-4 border-t border-white/5 text-white/40 hover:text-white transition-colors cursor-pointer"
        >
          <ChevronRight size={16} className={`transition-transform duration-300 ${collapsed ? '' : 'rotate-180'}`} />
          {!collapsed && <span className="text-[12px]">Collapse</span>}
        </button>
      </aside>

      {/* Mobile: bottom nav bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#03081F] border-t border-white/10 flex items-center justify-around py-2 px-2">
        {navItems.slice(0, 5).map(({ label, path, icon: Icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all
              ${isActive ? 'text-[#fc8a06]' : 'text-white/40'}`
            }
          >
            <Icon size={20} />
            <span className="text-[9px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </>
  );
}