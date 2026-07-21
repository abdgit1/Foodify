import { ShoppingBag, DollarSign, Store, Users, TrendingUp, Clock } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import StatCard   from '../../../Components/AdminComponents/StatCard';
import StatusBadge from '../../../Components/AdminComponents/StatusBadge';
import { useEffect, useState } from 'react';
import { getOverview }        from '../../../services/analyticsService';
import { getAllOrders }        from '../../../services/adminService';
import { getOrdersByStatus }  from '../../../services/analyticsService';
import { getRevenueOverTime } from '../../../services/analyticsService';

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const BRAND_ORANGE = '#fc8a06';
const BRAND_GREEN  = '#028643';

const STATUS_COLORS = {
  pending:          '#f59e0b',
  accepted:         '#3b82f6',
  preparing:        '#8b5cf6',
  out_for_delivery: '#fc8a06',
  delivered:        '#028643',
  cancelled:        '#ef4444',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatPeriod(period) {
  if (!period) return '';
  try {
    return new Date(period).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', timeZone: 'UTC',
    });
  } catch { return period; }
}

function fmtMoney(v) {
  if (!v) return '$0';
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000)     return `$${(v / 1_000).toFixed(1)}k`;
  return `$${Number(v).toFixed(0)}`;
}

// ─── Revenue bar tooltip ──────────────────────────────────────────────────────
const RevenueTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const rev    = payload.find(p => p.dataKey === 'Revenue');
  const orders = payload.find(p => p.dataKey === 'Orders');
  return (
    <div className="bg-[#03081F] border border-white/10 rounded-2xl px-4 py-3 shadow-2xl text-[12px] min-w-[130px]">
      <p className="text-white/50 font-semibold mb-2">{label}</p>
      {rev    && <p className="text-[#fc8a06] font-bold text-[14px]">${Number(rev.value).toLocaleString()}</p>}
      {orders && <p className="text-white/60 mt-0.5">{orders.value} orders</p>}
    </div>
  );
};

// ─── Mini KPI pill ────────────────────────────────────────────────────────────
function KPIPill({ label, value, color }) {
  return (
    <div className="flex flex-col items-center px-4 py-2.5 rounded-xl bg-black/3 dark:bg-white/5 border border-black/4 dark:border-white/5">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-black/40 dark:text-white/40">{label}</span>
      <span className="text-[16px] font-bold mt-0.5" style={{ color }}>{value}</span>
    </div>
  );
}

// ─── Orders-by-status: stacked bar + legend ───────────────────────────────────
function StatusBreakdown({ data }) {
  const [hovered, setHovered] = useState(null);
  if (!data?.length) return (
    <div className="flex flex-col items-center justify-center py-10 gap-2 text-black/25 dark:text-white/25">
      <span className="text-3xl">📭</span>
      <p className="text-[12px]">No orders yet</p>
    </div>
  );

  const total = data.reduce((s, d) => s + d.value, 0) || 1;

  return (
    <div className="space-y-4">
      {/* Total label */}
      <div className="flex items-baseline justify-between">
        <span className="text-[12px] text-black/40 dark:text-white/40">All statuses</span>
        <span className="text-[22px] font-bold text-[#03081F] dark:text-white">{total.toLocaleString()}</span>
      </div>

      {/* Stacked bar */}
      <div className="flex rounded-2xl overflow-hidden h-7 w-full gap-[2px] bg-black/5 dark:bg-white/5">
        {data.filter(d => d.value > 0).map((d) => (
          <div
            key={d.name}
            onMouseEnter={() => setHovered(d.name)}
            onMouseLeave={() => setHovered(null)}
            title={`${d.name.replace(/_/g, ' ')}: ${d.value}`}
            className="cursor-default transition-all duration-200"
            style={{
              width:      `${(d.value / total) * 100}%`,
              background: d.fill,
              opacity:    hovered && hovered !== d.name ? 0.4 : 1,
              minWidth:   3,
            }}
          />
        ))}
      </div>

      {/* Legend rows — one per status */}
      <div className="space-y-2">
        {data.map((d) => {
          const pct   = ((d.value / total) * 100);
          const isHov = hovered === d.name;
          return (
            <div
              key={d.name}
              className="flex items-center gap-2.5 py-1 px-2 rounded-xl transition-colors cursor-default"
              style={{ background: isHov ? `${d.fill}12` : 'transparent' }}
              onMouseEnter={() => setHovered(d.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.fill }} />
              <span className="text-[12px] text-black/60 dark:text-white/60 capitalize flex-1">
                {d.name.replace(/_/g, ' ')}
              </span>
              {/* Progress track */}
              <div className="w-16 h-1.5 rounded-full bg-black/6 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: d.fill }}
                />
              </div>
              <span className="text-[11px] font-bold text-[#03081F] dark:text-white w-5 text-right">{d.value}</span>
              <span className="text-[10px] text-black/35 dark:text-white/35 w-9 text-right">{pct.toFixed(1)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Overview() {
  const [revenueOverTime, setRevenueOverTime] = useState([]);
  const [overviewData,    setOverviewData]    = useState(null);
  const [recentOrders,    setRecentOrders]    = useState([]);
  const [ordersByStatus,  setOrdersByStatus]  = useState([]);

  useEffect(() => { getRevenueOverTime().then(setRevenueOverTime).catch(console.error); }, []);
  useEffect(() => { getOverview().then(setOverviewData).catch(console.error); }, []);
  useEffect(() => { getAllOrders().then(setRecentOrders).catch(console.error); }, []);
  useEffect(() => { getOrdersByStatus().then(setOrdersByStatus).catch(console.error); }, []);

  // ─── Shaped data ─────────────────────────────────────────────────────────
  const revenueData = revenueOverTime.map(d => ({
    date:    formatPeriod(d.period),
    Revenue: d.total_revenue,
    Orders:  d.total_orders,
  }));

  const statusData = ordersByStatus.map(d => ({
    name:  d.current_status,
    value: d.count,
    fill:  STATUS_COLORS[d.current_status] || '#ccc',
  }));

  // Mini KPIs for the revenue chart
  const totalRevChart = revenueData.reduce((s, d) => s + (d.Revenue || 0), 0);
  const peakRevChart  = revenueData.length ? Math.max(...revenueData.map(d => d.Revenue || 0)) : 0;
  const avgRevChart   = revenueData.length ? totalRevChart / revenueData.length : 0;
  const peakIndex     = revenueData.findIndex(d => d.Revenue === peakRevChart);

  // Smart interval — show at most 8 X-axis ticks regardless of data size
  const xInterval = revenueData.length <= 8 ? 0 : Math.ceil(revenueData.length / 8) - 1;

  return (
    <div className="p-6 space-y-6">

      {/* ── Stat cards ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Orders"       value={overviewData?.total_orders}                                                                                        sub="All time"            icon={ShoppingBag} accent={BRAND_ORANGE} trend={8}  />
        <StatCard title="Total Revenue"      value={`$${Number(overviewData?.total_revenue ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}              sub="All time"            icon={DollarSign}  accent={BRAND_GREEN}  trend={12} />
        <StatCard title="Active Restaurants" value={overviewData?.active_restaurants}                                                                                  sub="Currently open"      icon={Store}       accent="#3b82f6"     trend={2}  />
        <StatCard title="Total Users"        value={overviewData?.total_users?.toLocaleString()}                                                                       sub="Registered accounts" icon={Users}       accent="#8b5cf6"     trend={5}  />
      </div>

      {/* ── Charts row ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* ── Revenue per period — BarChart (discrete periods = bars) ── */}
        <div className="lg:col-span-2 bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[14px] font-bold text-[#03081F] dark:text-white flex items-center gap-2">
                <TrendingUp size={15} className="text-[#028643]" />
                Revenue — Recent Periods
              </p>
              <p className="text-[11px] text-black/35 dark:text-white/35 mt-0.5">
                Peak day highlighted · hover for details
              </p>
            </div>
          </div>

          {/* Mini KPI row */}
          {revenueData.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-5">
              <KPIPill label="Total"    value={fmtMoney(totalRevChart)} color={BRAND_ORANGE} />
              <KPIPill label="Peak"     value={fmtMoney(peakRevChart)}  color={BRAND_GREEN}  />
              <KPIPill label="Daily Avg" value={fmtMoney(avgRevChart)}  color="#8b5cf6"      />
            </div>
          )}

          {/* Scrollable Container */}
          <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-black/10 dark:scrollbar-thumb-white/10">
            <div style={{ width: Math.max(500, revenueData.length * 60), minWidth: '100%' }}>
              <ResponsiveContainer width="100%" height={170}>
                <BarChart
                  data={revenueData}
                  margin={{ top: 4, right: 4, left: -18, bottom: 0 }}
                  barSize={24}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: '#888' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#888' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={fmtMoney}
                  />
                  <Tooltip content={<RevenueTooltip />} cursor={{ fill: 'rgba(252,138,6,0.06)', radius: 8 }} />
                  <Bar dataKey="Revenue" name="Revenue" radius={[5, 5, 0, 0]}>
                    {revenueData.map((_, i) => (
                      <Cell
                        key={i}
                        fill={i === peakIndex ? BRAND_GREEN : BRAND_ORANGE}
                        fillOpacity={i === peakIndex ? 1 : 0.72}
                      />
                    ))}
                  </Bar>
                  {/* Hidden bar for tooltip orders value */}
                  <Bar dataKey="Orders" name="Orders" fill="transparent" hide />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ── Orders by Status ── */}
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl p-5">
          <p className="text-[14px] font-bold text-[#03081F] dark:text-white mb-1">Orders by Status</p>
          <p className="text-[11px] text-black/35 dark:text-white/35 mb-4">Hover to isolate a status</p>
          <StatusBreakdown data={statusData} />
        </div>
      </div>

      {/* ── Recent orders table ─────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/5 dark:border-white/5">
          <div>
            <p className="text-[14px] font-bold text-[#03081F] dark:text-white">Recent Orders</p>
            <p className="text-[12px] text-black/40 dark:text-white/40">
              Latest 5 orders
            </p>
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
                <tr key={order.order_id} className="border-b border-black/3 dark:border-white/3 hover:bg-[#fc8a06]/3 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-[#fc8a06]">#{order.order_id}</td>
                  <td className="px-5 py-3.5 text-[#03081F] dark:text-white">
                    {(order.user ?? order.status_history?.[0]?.changed_by)?.username ?? '—'}
                  </td>
                  <td className="px-5 py-3.5 text-black/60 dark:text-white/60">{order.restaurant.name}</td>
                  <td className="px-5 py-3.5 font-semibold text-[#03081F] dark:text-white">
                    ${Number(order.total_price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-5 py-3.5"><StatusBadge status={order.current_status} /></td>
                  <td className="px-5 py-3.5 text-black/40 dark:text-white/40 whitespace-nowrap">
                    {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
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
