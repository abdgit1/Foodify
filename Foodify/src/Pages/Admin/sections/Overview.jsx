import { ShoppingBag, DollarSign, Store, Users, TrendingUp, Clock } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import StatCard from '../../../Components/AdminComponents/StatCard';
import StatusBadge from '../../../Components/AdminComponents/StatusBadge';
import { mockOverview, mockRevenueOverTime, mockOrders, mockOrdersByStatus } from '../mockData';
import { useEffect, useState } from 'react';
import {getOverview} from '../../../services/Analyticsservice';
import {getAllOrders} from '../../../services/Adminservice';
import {getOrdersByStatus} from '../../../services/Analyticsservice';

import { getRevenueOverTime } from '../../../services/Analyticsservice';

// ─── Brand colors ────────────────────────────────────────────────────────────
const BRAND_ORANGE = '#fc8a06';
const BRAND_GREEN  = '#028643';
const BRAND_DARK   = '#03081F';

const STATUS_COLORS = {
  pending:          '#f59e0b',
  accepted:         '#3b82f6',
  preparing:        '#8b5cf6',
  out_for_delivery: '#fc8a06',
  delivered:        '#028643',
  cancelled:        '#ef4444',
};



// ─── Custom tooltip for area/bar charts ──────────────────────────────────────
const CustomTooltip = ({ active, payload, label, prefix = '£' }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#03081F] text-white text-[12px] px-3 py-2 rounded-xl shadow-xl border border-white/10">
      <p className="font-semibold mb-1 text-white/60">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: <span className="font-bold text-white">{prefix}{typeof p.value === 'number' ? p.value.toLocaleString() : p.value}</span>
        </p>
      ))}
    </div>
  );
};

// ─── Custom Pie tooltip ───────────────────────────────────────────────────────
const PieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="bg-[#03081F] text-white text-[12px] px-3 py-2 rounded-xl shadow-xl border border-white/10">
      <p className="capitalize font-semibold" style={{ color: d.payload.fill }}>{d.name.replace('_', ' ')}</p>
      <p className="text-white font-bold">{d.value} orders</p>
    </div>
  );
};

export default function Overview() {
  const [revenueOverTime, setRevenueOverTime] = useState([]);

  const handleGetRevenueOverTime = async () => {
  try {
    const response = await getRevenueOverTime();
    setRevenueOverTime(response);
  }
  catch (error) {
    console.error('Error fetching revenue over time data:', error);
  }
} 

useEffect(() => {
  handleGetRevenueOverTime();
}, []);
  // Shape data for recharts
  const revenueData = revenueOverTime?.map(d => ({
    date: d.period.slice(5),        // "07-08"
    Revenue: d.total_revenue,
    Orders: d.total_orders,
  }));


  const [overviewData, setOverviewData] = useState(null);
  const handleGetOverview = async () => {
    try {
      const response = await getOverview();
      setOverviewData(response);
    }
    catch (error) {
      console.error('Error fetching overview data:', error);
    }
  };

  useEffect(() => {
    handleGetOverview();
  }, []);

  console.log('Overview data:', overviewData); // Log the overview data to the console for debugging

  const [recentOrders, setRecentOrders] = useState([]);
  const handleGetRecentOrders = async () => {
    try {
      const response = await getAllOrders();
      setRecentOrders(response);
    }
    catch (error) {
      console.error('Error fetching recent orders:', error);
    }
  };

  useEffect(() => {
    handleGetRecentOrders();
  }, []);

  console.log('Recent orders data:', recentOrders); // Log the recent orders data to the console for debugging

  const [ordersByStatus, setOrdersByStatus] = useState([]);
  const handleGetOrdersByStatus = async () => {
    try {
      const response = await getOrdersByStatus();
      setOrdersByStatus(response);
    }
    catch (error) {
      console.error('Error fetching orders by status:', error);
    }
  };

  useEffect(() => {
    handleGetOrdersByStatus();
  }, []);
  console.log('Orders by status data:', ordersByStatus); // Log the orders by status data to the console for debugging

  const pieData = ordersByStatus.map(d => ({
    name: d.current_status,
    value: d.count,
    fill: STATUS_COLORS[d.current_status] || '#ccc',
  }));


  return (
    <div className="p-6 space-y-6">

      {/* ── Stat cards ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Orders"        value={overviewData?.total_orders}       sub="All time"            icon={ShoppingBag} accent={BRAND_ORANGE} trend={8}  />
        <StatCard title="Total Revenue"       value={`£${overviewData?.total_revenue.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`} sub="All time" icon={DollarSign} accent={BRAND_GREEN}  trend={12} />
        <StatCard title="Active Restaurants"  value={overviewData?.active_restaurants}                  sub="Currently open"      icon={Store}       accent="#3b82f6"     trend={2}  />
        <StatCard title="Total Users"         value={overviewData?.total_users.toLocaleString()}        sub="Registered accounts" icon={Users}        accent="#8b5cf6"     trend={5}  />
      </div>

      {/* ── Charts row ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Area chart — Revenue + Orders (last 7 days) */}
        <div className="lg:col-span-2 bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[14px] font-bold text-[#03081F] dark:text-white">Revenue — Last 7 Days</p>
              <p className="text-[12px] text-black/40 dark:text-white/40 mt-0.5">
                API: <code className="bg-black/5 dark:bg-white/10 px-1 rounded text-[10px]">GET /order/admin/analytics/revenue-over-time/</code>
              </p>
            </div>
            <TrendingUp size={18} className="text-[#028643]" />
          </div>

          {/* ✅ Recharts — updates automatically when data changes */}
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={BRAND_ORANGE} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={BRAND_ORANGE} stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="Revenue"
                stroke={BRAND_ORANGE}
                strokeWidth={2.5}
                fill="url(#revenueGrad)"
                dot={{ r: 4, fill: BRAND_ORANGE, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: BRAND_ORANGE }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart — Orders by Status */}
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl p-5">
          <div className="mb-4">
            <p className="text-[14px] font-bold text-[#03081F] dark:text-white">Orders by Status</p>
            <p className="text-[12px] text-black/40 dark:text-white/40 mt-0.5">
              API: <code className="bg-black/5 dark:bg-white/10 px-1 rounded text-[10px]">GET /order/admin/analytics/orders-by-status/</code>
            </p>
          </div>

          {/* ✅ Recharts PieChart */}
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-2">
            {pieData.map(d => (
              <div key={d.name} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.fill }} />
                <span className="text-[10px] text-black/50 dark:text-white/50 capitalize truncate">{d.name.replace(/_/g, ' ')}</span>
                <span className="ml-auto text-[10px] font-bold text-[#03081F] dark:text-white">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent orders table ────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/5 dark:border-white/5">
          <div>
            <p className="text-[14px] font-bold text-[#03081F] dark:text-white">Recent Orders</p>
            <p className="text-[12px] text-black/40 dark:text-white/40">Latest 5 orders — API: <code className="bg-black/5 dark:bg-white/10 px-1 rounded text-[10px]">GET /order/admin/orders</code></p>
          </div>
          <Clock size={16} className="text-black/30 dark:text-white/30" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/5">
                {['Order ID', 'Customer', 'Restaurant', 'Total', 'Status', 'Date'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold text-black/40 dark:text-white/40 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.slice(0, 5).map(order => (
                <tr key={order.order_id} className="border-b border-black/3 dark:border-white/3 hover:bg-[#fc8a06]/2 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-[#fc8a06]">#{order.order_id}</td>
                  <td className="px-5 py-3.5 text-[#03081F] dark:text-white">{order.user?.username}</td>
                  <td className="px-5 py-3.5 text-black/60 dark:text-white/60">{order.restaurant.name}</td>
                  <td className="px-5 py-3.5 font-semibold text-[#03081F] dark:text-white">£{order.total_price}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={order.current_status} /></td>
                  <td className="px-5 py-3.5 text-black/40 dark:text-white/40 whitespace-nowrap">
                    {new Date(order.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
