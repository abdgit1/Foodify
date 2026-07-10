import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from '../../Components/AdminComponents/AdminSidebar';
import AdminTopbar from '../../Components/AdminComponents/AdminTopbar';
import Overview from './sections/Overview';
import Analytics from './sections/Analytics';
import Orders from './sections/Orders';
import Restaurants from './sections/Restaurants';
import MenuItems from './sections/MenuItems';
import Categories from './sections/Categories';
import Deals from './sections/Deals';

export default function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#f5f5f7] dark:bg-[#060a1c] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopbar />
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-6">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="analytics"    element={<Analytics />} />
            <Route path="orders"       element={<Orders />} />
            <Route path="restaurants"  element={<Restaurants />} />
            <Route path="menu-items"   element={<MenuItems />} />
            <Route path="categories"   element={<Categories />} />
            <Route path="deals"        element={<Deals />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
