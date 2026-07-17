import { useState } from 'react';
import { TrendingUp, Award, Store, BarChart2 } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend
} from 'recharts';
import { mockRevenueOverTime, mockPopularItems, mockPopularDeals, mockRevenueByRestaurant } from '../mockData';
import {getRevenueByRestaurant,getRevenueOverTime,getPopularItems,getPopularDeals} from '../../../services/Analyticsservice';
import { useEffect } from 'react';

// ─── Brand palette ────────────────────────────────────────────────────────────
const BRAND_ORANGE = '#fc8a06';
const BRAND_GREEN  = '#028643';
const BLUE         = '#3b82f6';
const PURPLE       = '#8b5cf6';

// Restaurant bar chart gradient colors
const BAR_COLORS = [BRAND_ORANGE, BRAND_GREEN, BLUE, PURPLE, '#ec4899'];

// ─── Shared dark tooltip ──────────────────────────────────────────────────────
const DarkTooltip = ({ active, payload, label, prefix = '£' }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#03081F] border border-white/10 rounded-xl px-3 py-2 shadow-2xl text-[12px]">
      {label && <p className="text-white/50 font-medium mb-1">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || p.fill || BRAND_ORANGE }}>
          {p.name}: <span className="text-white font-bold">{prefix}{typeof p.value === 'number' ? p.value.toLocaleString() : p.value}</span>
        </p>
      ))}
    </div>
  );
};

// ─── Hint badge ───────────────────────────────────────────────────────────────
const ApiHint = ({ endpoint }) => (
  <p className="text-[11px] text-black/40 dark:text-white/40 mt-0.5">
    API: <code className="bg-black/5 dark:bg-white/10 px-1 rounded text-[10px]">{endpoint}</code>
  </p>
);

export default function Analytics() {
  const [revenueRange, setRevenueRange] = useState('daily');
  const [revenueByRestaurant, setRevenueByRestaurant] = useState([]);
  const [popularItems, setPopularItems] = useState([]);


  const [popularDeals, setPopularDeals] = useState([]);

  const handleGetPopularDeals = async () => {
    try {
      const response = await getPopularDeals();
      setPopularDeals(response);
    }
    catch (error) {
      console.error('Error fetching popular deals:', error);
    }
  };
  useEffect(() => {
    handleGetPopularDeals();
  }, []);
  console.log('Popular deals data:', popularDeals); // Log the popular deals data to the console for debugging

  const handleGetPopularItems = async () => {
    try {
      const response = await getPopularItems();
      setPopularItems(response);
    }
    catch (error) {
      console.error('Error fetching popular items:', error);
    }
  };
  useEffect(() => {
    handleGetPopularItems();
  }, []);
  console.log('Popular items data:', popularItems); // Log the popular items data to the console for debugging

  const handleGetRevenueByRestaurant = async () => {
    try {
      const response = await getRevenueByRestaurant();
      setRevenueByRestaurant(response);
    }
    catch (error) {
      console.error('Error fetching revenue by restaurant:', error);
    }
  };
  useEffect(() => {
    handleGetRevenueByRestaurant();
  }, []);
  console.log('Revenue by restaurant data:', revenueByRestaurant); // Log the revenue by restaurant data to the console for debugging

  const [revenueOverTime, setRevenueOverTime] = useState([]);
  const handleGetRevenueOverTime = async (range) => {
    try {
      const response = await getRevenueOverTime(range);
      setRevenueOverTime(response);
    }
    catch (error) {
      console.error('Error fetching revenue over time:', error);
    }
  };
  useEffect(() => {
    handleGetRevenueOverTime(revenueRange);
  }, [revenueRange]);

  console.log('Revenue over time data:', revenueOverTime); // Log the revenue over time data to the console for debugging

  // Shape data for recharts
  const revenueData = revenueOverTime.map(d => ({
    date:    d.period.slice(5),
    Revenue: d.total_revenue,
    Orders:  d.total_orders,
  }));

  const restaurantData = revenueByRestaurant.map(r => ({
    name:    r.restaurant__name.split(' ')[0],   // short label
    fullName: r.restaurant__name,
    Revenue: r.total_revenue,
    Orders:  r.total_orders,
  }));

  return (
    <div className="p-6 space-y-6">

      {/* ── Revenue over time — AreaChart ─────────────────────────────────── */}
      <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <p className="text-[15px] font-bold text-[#03081F] dark:text-white flex items-center gap-2">
              <TrendingUp size={16} className="text-[#028643]" /> Revenue Over Time
            </p>
            <ApiHint endpoint="GET /order/admin/analytics/revenue-over-time/?range=daily" />
          </div>
          {/* Range selector */}
          <div className="flex gap-2">
            {['daily', 'weekly', 'monthly'].map(r => (
              <button
                key={r}
                onClick={() => setRevenueRange(r)}
                className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold capitalize transition-colors cursor-pointer
                  ${revenueRange === r ? 'bg-[#fc8a06] text-white shadow-md' : 'bg-black/5 dark:bg-white/10 text-black/50 dark:text-white/50 hover:bg-black/10 dark:hover:bg-white/20'}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* ✅ recharts AreaChart — fully reactive to data changes */}
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="areaRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={BRAND_GREEN}  stopOpacity={0.3} />
                <stop offset="95%" stopColor={BRAND_GREEN}  stopOpacity={0}   />
              </linearGradient>
              <linearGradient id="areaOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={BRAND_ORANGE} stopOpacity={0.2} />
                <stop offset="95%" stopColor={BRAND_ORANGE} stopOpacity={0}   />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.1)" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="revenue" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="orders" orientation="right" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
            <Tooltip content={<DarkTooltip />} />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />
            <Area yAxisId="revenue" type="monotone" dataKey="Revenue" name="Revenue (£)"
              stroke={BRAND_GREEN} strokeWidth={2.5} fill="url(#areaRevenue)"
              dot={{ r: 4, fill: BRAND_GREEN, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: BRAND_GREEN }} />
            <Area yAxisId="orders" type="monotone" dataKey="Orders" name="Orders"
              stroke={BRAND_ORANGE} strokeWidth={2} fill="url(#areaOrders)"
              dot={{ r: 3, fill: BRAND_ORANGE, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: BRAND_ORANGE }} strokeDasharray="5 3" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ── Revenue by restaurant — BarChart ─────────────────────────────── */}
      <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl p-5">
        <div className="mb-5">
          <p className="text-[15px] font-bold text-[#03081F] dark:text-white flex items-center gap-2">
            <Store size={16} className="text-[#3b82f6]" /> Revenue by Restaurant
          </p>
          <ApiHint endpoint="GET /order/admin/analytics/revenue-by-restaurant/" />
        </div>

        {/* ✅ recharts BarChart — colored bars, hover tooltip, axis labels */}
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={restaurantData} margin={{ top: 5, right: 5, left: -15, bottom: 0 }} barSize={36}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.1)" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = restaurantData.find(r => r.name === payload[0]?.payload?.name);
                return (
                  <div className="bg-[#03081F] border border-white/10 rounded-xl px-3 py-2 shadow-2xl text-[12px]">
                    <p className="text-white/50 font-medium mb-1">{d?.fullName}</p>
                    <p style={{ color: BRAND_ORANGE }}>Revenue: <span className="text-white font-bold">£{payload[0]?.value?.toLocaleString()}</span></p>
                    <p className="text-white/60">Orders: <span className="text-white font-bold">{d?.Orders}</span></p>
                  </div>
                );
              }}
            />
            <Bar dataKey="Revenue" radius={[6, 6, 0, 0]}>
              {restaurantData.map((_, i) => (
                <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Summary table below chart */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/5">
                {['Restaurant', 'Total Revenue', 'Orders', 'Avg / Order'].map(h => (
                  <th key={h} className="text-left py-2 pr-4 text-[11px] font-semibold text-black/40 dark:text-white/40 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {revenueByRestaurant.map((r, i) => (
                <tr key={r.restaurant__id} className="border-b border-black/3 dark:border-white/3 hover:bg-black/2 dark:hover:bg-white/2 transition-colors">
                  <td className="py-3 pr-4 font-medium text-[#03081F] dark:text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: BAR_COLORS[i % BAR_COLORS.length] }} />
                    {r.restaurant__name}
                  </td>
                  <td className="py-3 pr-4 font-semibold" style={{ color: BAR_COLORS[i % BAR_COLORS.length] }}>
                    £{r.total_revenue.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 pr-4 text-black/60 dark:text-white/60">{r.total_orders}</td>
                  <td className="py-3 pr-4 text-black/60 dark:text-white/60">£{(r.total_revenue / r.total_orders).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Popular items + deals ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Popular items — horizontal BarChart */}
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl p-5">
          <div className="mb-4">
            <p className="text-[15px] font-bold text-[#03081F] dark:text-white flex items-center gap-2">
              <Award size={16} className="text-[#fc8a06]" /> Popular Menu Items
            </p>
            <ApiHint endpoint="GET /order/admin/analytics/popular-items/" />
          </div>

          {/* ✅ recharts horizontal bar */}
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={popularItems.map(it => ({ name: it.menu_item__name.split(' ').slice(0, 2).join(' '), sold: it.total_sold, revenue: it.total_revenue }))}
              layout="vertical"
              margin={{ top: 0, right: 40, left: 30, bottom: 0 }}
              barSize={14}
            >
              <XAxis type="number" tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} width={90} />
              <Tooltip content={<DarkTooltip prefix="" />} />
              <Bar dataKey="sold" name="Units Sold" fill={BRAND_ORANGE} radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>

          {/* Detailed list */}
          <div className="mt-3 space-y-2">
            {popularItems.map((item, i) => (
              <div key={item.menu_item__id} className="flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-[#fc8a06]/10 text-[#fc8a06] text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <span className="text-[#03081F] dark:text-white truncate">{item.menu_item__name}</span>
                </div>
                <span className="text-[#028643] font-semibold shrink-0 ml-2">£{item.total_revenue.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Popular deals — horizontal BarChart */}
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl p-5">
          <div className="mb-4">
            <p className="text-[15px] font-bold text-[#03081F] dark:text-white flex items-center gap-2">
              <BarChart2 size={16} className="text-[#8b5cf6]" /> Popular Deals
            </p>
            <ApiHint endpoint="GET /order/admin/analytics/popular-deals/" />
          </div>

          {/* ✅ recharts horizontal bar */}
          <ResponsiveContainer width="100%" height={130}>
            <BarChart
              data={popularDeals.map(d => ({ name: d.deal__name.split(' ').slice(0, 2).join(' '), sold: d.total_sold, revenue: d.total_revenue }))}
              layout="vertical"
              margin={{ top: 0, right: 40, left: 30, bottom: 0 }}
              barSize={14}
            >
              <XAxis type="number" tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} width={90} />
              <Tooltip content={<DarkTooltip prefix="" />} />
              <Bar dataKey="sold" name="Units Sold" fill={PURPLE} radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-3 space-y-2 ">
            {popularDeals.map((deal, i) => (
              <div key={deal.deal__id} className="flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-[#8b5cf6]/10 text-[#8b5cf6] text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <span className="text-[#03081F] dark:text-white truncate">{deal.deal__name}</span>
                </div>
                <span className="text-[#028643] font-semibold shrink-0 ml-2">£{deal.total_revenue.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
