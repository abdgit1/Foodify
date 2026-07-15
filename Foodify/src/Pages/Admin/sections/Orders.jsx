import { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import StatusBadge from '../../../Components/AdminComponents/StatusBadge';
import { getAllOrders, updateOrderStatus } from '../../../services/adminService';

const ALL_STATUSES = ['all', 'pending', 'accepted', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];
const NEXT_STATUS = {
  pending:          'accepted',
  accepted:         'preparing',
  preparing:        'out_for_delivery',
  out_for_delivery: 'delivered',
};

// The real API doesn't return a top-level `user` on each order — the
// customer who placed it is only identifiable via the first status_history
// entry's `changed_by` (whoever triggered the initial "pending" status).
function getCustomer(order) {
  return order.user ?? order.status_history?.[0]?.changed_by ?? null;
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const loadOrders = async () => {
      setLoading(true);
      setLoadError(null);
      try {
        const data = await getAllOrders();
        if (!isCancelled) setOrders(data || []);
      } catch (err) {
        if (!isCancelled) setLoadError(err.message);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    loadOrders();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Filter
  const filtered = orders.filter(o => {
    const customer = getCustomer(o);
    const matchSearch =
      String(o.order_id).includes(search) ||
      customer?.username?.toLowerCase().includes(search.toLowerCase()) ||
      o.restaurant.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || o.current_status === filterStatus;
    return matchSearch && matchStatus;
  });

  // PATCH /order/admin/orders/:id/status/ — optimistic, rolls back on failure.
  const handleStatusUpdate = async (orderId, newStatus) => {
    const previousOrders = orders;
    setUpdatingId(orderId);
    setOrders(prev => prev.map(o => o.order_id === orderId ? { ...o, current_status: newStatus } : o));
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (err) {
      setOrders(previousOrders);
      alert(`Couldn't update order #${orderId}: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="p-6 space-y-5">

      {loadError && (
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl px-4 py-3 text-[12px] text-red-500">
          Couldn't load orders right now. ({loadError})
        </div>
      )}

      {/* Search + filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl px-4 h-[44px] flex-1">
          <Search size={15} className="text-black/30 dark:text-white/30 shrink-0" />
          <input
            type="text"
            placeholder="Search by order ID, customer or restaurant..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-[13px] text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none w-full"
          />
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl px-4 h-[44px] w-full sm:w-auto">
          <Filter size={14} className="text-black/30 dark:text-white/30 shrink-0" />
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="bg-transparent text-[13px] text-black dark:text-white outline-none cursor-pointer capitalize"
          >
            {ALL_STATUSES.map(s => (
              <option key={s} value={s} className="bg-white dark:bg-[#0a0f2e] capitalize">
                {s === 'all' ? 'All Statuses' : s.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary chips */}
      <div className="flex flex-wrap gap-2">
        {ALL_STATUSES.filter(s => s !== 'all').map(s => {
          const count = orders.filter(o => o.current_status === s).length;
          return (
            <button
              key={s}
              onClick={() => setFilterStatus(filterStatus === s ? 'all' : s)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold capitalize transition-all cursor-pointer
                ${filterStatus === s ? 'bg-[#03081F] dark:bg-white text-white dark:text-[#03081F]' : 'bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/60 hover:bg-black/10'}`}
            >
              {s.replace(/_/g, ' ')} ({count})
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/5 dark:border-white/5">
          <p className="text-[14px] font-bold text-[#03081F] dark:text-white">
            All Orders <span className="text-black/30 dark:text-white/30 font-normal text-[13px]">({filtered.length})</span>
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/5">
                {['#', 'Customer', 'Restaurant', 'Items', 'Total', 'Status', 'Address', 'Date', 'Action'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-black/40 dark:text-white/40 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="9" className="text-center py-10 text-black/30 dark:text-white/30 text-[13px]">Loading orders…</td>
                </tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center py-10 text-black/30 dark:text-white/30 text-[13px]">No orders found.</td>
                </tr>
              )}
              {!loading && filtered.map((order) => {
                const nextStatus = NEXT_STATUS[order.current_status];
                const isUpdating = updatingId === order.order_id;
                const customer = getCustomer(order);
                return (
                  <tr key={order.order_id} className="border-b border-black/3 dark:border-white/3 hover:bg-[#fc8a06]/2 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-[#fc8a06] whitespace-nowrap">#{order.order_id}</td>
                    <td className="px-4 py-3.5">
                      <p className="font-medium text-[#03081F] dark:text-white">{customer?.username ?? '—'}</p>
                      <p className="text-[11px] text-black/40 dark:text-white/40">{customer?.email}</p>
                    </td>
                    <td className="px-4 py-3.5 text-black/70 dark:text-white/70 whitespace-nowrap">{order.restaurant.name}</td>
                    <td className="px-4 py-3.5 text-black/60 dark:text-white/60">
                      {order.items.map((it, i) => (
                        <span key={i} className="block text-[12px]">{it.name} ×{it.quantity}</span>
                      ))}
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-[#03081F] dark:text-white whitespace-nowrap">£{order.total_price}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap"><StatusBadge status={order.current_status} /></td>
                    <td className="px-4 py-3.5 text-[12px] text-black/50 dark:text-white/50 max-w-[140px] truncate">{order.delivery_address}</td>
                    <td className="px-4 py-3.5 text-[12px] text-black/40 dark:text-white/40 whitespace-nowrap">
                      {new Date(order.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {nextStatus ? (
                        <button
                          onClick={() => handleStatusUpdate(order.order_id, nextStatus)}
                          disabled={isUpdating}
                          className="px-3 py-1.5 bg-[#028643] text-white rounded-lg text-[11px] font-semibold hover:bg-[#026635] transition-colors capitalize cursor-pointer disabled:opacity-50"
                        >
                          {isUpdating ? '...' : `→ ${nextStatus.replace(/_/g, ' ')}`}
                        </button>
                      ) : order.current_status === 'delivered' ? (
                        <span className="text-[11px] text-[#028643] font-semibold">✓ Complete</span>
                      ) : (
                        <span className="text-[11px] text-red-400 font-semibold">Cancelled</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}