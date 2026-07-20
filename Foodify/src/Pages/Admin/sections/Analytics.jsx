import { useState, useEffect } from 'react';
import { TrendingUp, Award, Store, BarChart2 } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, Legend,
} from 'recharts';
import {
  getRevenueByRestaurant,
  getRevenueOverTime,
  getPopularItems,
  getPopularDeals,
} from '../../../services/Analyticsservice';

// ─── Brand palette ────────────────────────────────────────────────────────────
const BRAND_ORANGE = '#fc8a06';
const BRAND_GREEN  = '#028643';
const BLUE         = '#3b82f6';
const PURPLE       = '#8b5cf6';
const BAR_COLORS   = [BRAND_ORANGE, BRAND_GREEN, BLUE, PURPLE, '#ec4899', '#14b8a6', '#f43f5e', '#facc15'];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatPeriod(period, range) {
  if (!period) return '';
  try {
    const d = new Date(period);
    if (range === 'monthly') return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
    if (range === 'weekly')  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' });
  } catch { return period; }
}

function fmtMoney(v) {
  if (!v && v !== 0) return '$0';
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000)     return `$${(v / 1_000).toFixed(1)}k`;
  return `$${Number(v).toFixed(0)}`;
}

// ─── Shared dark glass tooltip ────────────────────────────────────────────────
const DarkTooltip = ({ active, payload, label, prefix = '$' }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#03081F] border border-white/10 rounded-2xl px-4 py-3 shadow-2xl text-[12px] min-w-[140px]">
      {label && <p className="text-white/50 font-medium mb-2">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || p.fill || BRAND_ORANGE }} className="mb-0.5">
          {p.name}:{' '}
          <span className="text-white font-bold">
            {prefix}{typeof p.value === 'number' ? p.value.toLocaleString('en-US') : p.value}
          </span>
        </p>
      ))}
    </div>
  );
};

// ─── Mini KPI pill ────────────────────────────────────────────────────────────
function KPIPill({ label, value, color }) {
  return (
    <div className="flex flex-col items-center px-4 py-2.5 rounded-xl bg-black/3 dark:bg-white/5 border border-black/4 dark:border-white/5">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-black/40 dark:text-white/40">{label}</span>
      <span className="text-[15px] font-bold mt-0.5" style={{ color }}>{value}</span>
    </div>
  );
}

// ─── Ranked items list with progress bars ─────────────────────────────────────
// Grows one row per item — no fixed height.
function RankedList({ items, color, labelKey, valueKey, revenueKey }) {
  if (!items?.length) return (
    <div className="flex flex-col items-center justify-center py-8 gap-2 text-black/25 dark:text-white/25">
      <span className="text-2xl">—</span>
      <p className="text-[12px]">No data yet</p>
    </div>
  );
  const max = Math.max(...items.map(it => it[valueKey] || 0)) || 1;

  return (
    <div className="space-y-2 mt-2">
      {items.map((item, i) => {
        const pct   = (item[valueKey] / max) * 100;
        const isTop = i === 0;
        return (
          <div
            key={i}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors hover:bg-black/3 dark:hover:bg-white/4"
            style={{ background: isTop ? `${color}0d` : 'transparent' }}
          >
            {/* Rank badge */}
            <span
              className="w-7 h-7 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 transition-colors"
              style={{
                background: isTop ? color : `${color}18`,
                color:      isTop ? '#fff' : color,
              }}
            >
              {i + 1}
            </span>

            {/* Name + bar */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[12px] text-[#03081F] dark:text-white font-medium truncate pr-3">
                  {item[labelKey]}
                </span>
                <span className="text-[11px] font-bold shrink-0" style={{ color }}>
                  {item[valueKey].toLocaleString()} sold
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: color }}
                  />
                </div>
                <span className="text-[11px] text-[#028643] font-semibold shrink-0 w-20 text-right">
                  ${Number(item[revenueKey]).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Analytics() {
  const [revenueRange,        setRevenueRange]        = useState('daily');
  const [revenueByRestaurant, setRevenueByRestaurant] = useState([]);
  const [popularItems,        setPopularItems]        = useState([]);
  const [popularDeals,        setPopularDeals]        = useState([]);
  const [revenueOverTime,     setRevenueOverTime]     = useState([]);

  useEffect(() => { getPopularDeals()        .then(setPopularDeals)        .catch(console.error); }, []);
  useEffect(() => { getPopularItems()        .then(setPopularItems)        .catch(console.error); }, []);
  useEffect(() => { getRevenueByRestaurant() .then(setRevenueByRestaurant) .catch(console.error); }, []);
  useEffect(() => {
    getRevenueOverTime(revenueRange).then(setRevenueOverTime).catch(console.error);
  }, [revenueRange]);

  // ─── Shaped data ─────────────────────────────────────────────────────────
  const revenueData = revenueOverTime.map(d => ({
    date:    formatPeriod(d.period, revenueRange),
    Revenue: d.total_revenue,
    Orders:  d.total_orders,
  }));

  const restaurantData = revenueByRestaurant.map(r => ({
    name:    r.restaurant__name,
    Revenue: r.total_revenue,
    Orders:  r.total_orders,
  }));

  // ─── Revenue chart — mini KPIs ────────────────────────────────────────────
  const totalRev = revenueData.reduce((s, d) => s + (d.Revenue || 0), 0);
  const peakRev  = revenueData.length ? Math.max(...revenueData.map(d => d.Revenue || 0)) : 0;
  const avgRev   = revenueData.length ? totalRev / revenueData.length : 0;

  // Smart X-axis interval — always shows ≤ 8 labels regardless of data volume
  const xInterval = revenueData.length <= 8 ? 0 : Math.ceil(revenueData.length / 8) - 1;

  // Restaurant chart — one row per restaurant, 48px each
  const restaurantChartHeight = Math.max(200, restaurantData.length * 48 + 10);

  return (
    <div className="p-6 space-y-6">

      {/* ── Revenue over time — AreaChart with ResponsiveContainer ─────────── */}
      <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl p-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
          <div>
            <p className="text-[15px] font-bold text-[#03081F] dark:text-white flex items-center gap-2">
              <TrendingUp size={16} className="text-[#028643]" /> Revenue Over Time
            </p>
            <p className="text-[11px] text-black/35 dark:text-white/35 mt-0.5">
              X-axis auto-adjusts labels · shows up to 8 ticks regardless of data size
            </p>
          </div>
          {/* Range toggle */}
          <div className="flex gap-1.5 shrink-0 p-1 bg-black/4 dark:bg-white/6 rounded-xl">
            {['daily', 'weekly', 'monthly'].map(r => (
              <button
                key={r}
                onClick={() => setRevenueRange(r)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold capitalize transition-all cursor-pointer
                  ${revenueRange === r
                    ? 'bg-white dark:bg-white/15 text-[#fc8a06] shadow-sm'
                    : 'text-black/45 dark:text-white/45 hover:text-black/70 dark:hover:text-white/70'}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Mini KPI row */}
        {revenueData.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-5">
            <KPIPill label="Period Total" value={fmtMoney(totalRev)} color={BRAND_ORANGE} />
            <KPIPill label="Peak"         value={fmtMoney(peakRev)}  color={BRAND_GREEN}  />
            <KPIPill label="Avg / Period" value={fmtMoney(avgRev)}   color={BLUE}         />
          </div>
        )}

        {/* Scrollable Area chart container */}
        <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-black/10 dark:scrollbar-thumb-white/10">
          <div style={{ width: Math.max(600, revenueData.length * 60), minWidth: '100%' }}>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={revenueData} margin={{ top: 5, right: 20, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={BRAND_GREEN}  stopOpacity={0.3} />
                    <stop offset="95%" stopColor={BRAND_GREEN}  stopOpacity={0}   />
                  </linearGradient>
                  <linearGradient id="gradOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={BRAND_ORANGE} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={BRAND_ORANGE} stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.1)" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: '#888' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="rev"
                  tick={{ fontSize: 11, fill: '#888' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={fmtMoney}
                />
                <YAxis
                  yAxisId="ord"
                  orientation="right"
                  tick={{ fontSize: 11, fill: '#888' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<DarkTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: '12px', paddingTop: '14px' }}
                  formatter={(name) => <span style={{ color: '#888' }}>{name}</span>}
                />
                <Area
                  yAxisId="rev" type="monotone" dataKey="Revenue" name="Revenue ($)"
                  stroke={BRAND_GREEN} strokeWidth={2.5} fill="url(#gradRevenue)"
                  dot={{ r: 3.5, fill: BRAND_GREEN, strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: BRAND_GREEN, strokeWidth: 2, stroke: '#fff' }}
                />
                <Area
                  yAxisId="ord" type="monotone" dataKey="Orders" name="Orders"
                  stroke={BRAND_ORANGE} strokeWidth={2} fill="url(#gradOrders)"
                  dot={{ r: 3, fill: BRAND_ORANGE, strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: BRAND_ORANGE }} strokeDasharray="5 3"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Revenue by Restaurant — horizontal bars, dynamic height ─────────── */}
      <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl p-5">
        <p className="text-[15px] font-bold text-[#03081F] dark:text-white flex items-center gap-2 mb-1">
          <Store size={16} className="text-[#3b82f6]" /> Revenue by Restaurant
        </p>
        <p className="text-[11px] text-black/35 dark:text-white/35 mb-5">
          One row per restaurant — grows automatically as more restaurants are added
        </p>

        {/* Dynamic height container — ResponsiveContainer fills it */}
        <div style={{ height: restaurantChartHeight }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={restaurantData}
              margin={{ top: 0, right: 72, left: 8, bottom: 0 }}
              barSize={20}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.08)" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 10, fill: '#888' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={fmtMoney}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 11, fill: '#888' }}
                axisLine={false}
                tickLine={false}
                width={155}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0]?.payload;
                  return (
                    <div className="bg-[#03081F] border border-white/10 rounded-2xl px-4 py-3 shadow-2xl text-[12px]">
                      <p className="text-white/50 font-medium mb-2 max-w-[180px] truncate">{d?.name}</p>
                      <p style={{ color: BRAND_ORANGE }}>Revenue: <span className="text-white font-bold">${Number(d?.Revenue).toLocaleString('en-US')}</span></p>
                      <p className="text-white/60 mt-0.5">Orders: <span className="text-white font-bold">{d?.Orders}</span></p>
                    </div>
                  );
                }}
              />
              <Bar
                dataKey="Revenue"
                radius={[0, 6, 6, 0]}
                label={{
                  position: 'right',
                  fontSize: 11,
                  fill: '#888',
                  formatter: v => fmtMoney(v),
                }}
              >
                {restaurantData.map((_, i) => (
                  <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Popular items + deals — ranked lists ─────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Popular Menu Items */}
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[15px] font-bold text-[#03081F] dark:text-white flex items-center gap-2">
              <Award size={16} className="text-[#fc8a06]" /> Popular Items
            </p>
            {popularItems.length > 0 && (
              <span className="text-[11px] text-black/35 dark:text-white/35">{popularItems.length} items</span>
            )}
          </div>
          <p className="text-[11px] text-black/35 dark:text-white/35 mb-2">Ranked by units sold</p>

          {/* Column labels */}
          <div className="flex items-center gap-3 px-3 mb-1">
            <span className="w-7 shrink-0" />
            <span className="flex-1 text-[10px] font-semibold uppercase tracking-wider text-black/30 dark:text-white/30">Item name</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-black/30 dark:text-white/30 w-20 text-right shrink-0">Revenue</span>
          </div>
          <RankedList
            items={popularItems}
            color={BRAND_ORANGE}
            labelKey="menu_item__name"
            valueKey="total_sold"
            revenueKey="total_revenue"
          />
        </div>

        {/* Popular Deals */}
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[15px] font-bold text-[#03081F] dark:text-white flex items-center gap-2">
              <BarChart2 size={16} className="text-[#8b5cf6]" /> Popular Deals
            </p>
            {popularDeals.length > 0 && (
              <span className="text-[11px] text-black/35 dark:text-white/35">{popularDeals.length} deals</span>
            )}
          </div>
          <p className="text-[11px] text-black/35 dark:text-white/35 mb-2">Ranked by units sold</p>

          {/* Column labels */}
          <div className="flex items-center gap-3 px-3 mb-1">
            <span className="w-7 shrink-0" />
            <span className="flex-1 text-[10px] font-semibold uppercase tracking-wider text-black/30 dark:text-white/30">Deal name</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-black/30 dark:text-white/30 w-20 text-right shrink-0">Revenue</span>
          </div>
          <RankedList
            items={popularDeals}
            color={PURPLE}
            labelKey="deal__name"
            valueKey="total_sold"
            revenueKey="total_revenue"
          />
        </div>
      </div>
    </div>
  );
}
