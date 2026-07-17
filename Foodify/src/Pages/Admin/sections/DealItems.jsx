import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import SlideOverPanel from '../../../Components/AdminComponents/SlideOverPanel';
import ConfirmModal from '../../../Components/AdminComponents/ConfirmModal';
import {
  getAllDealItems,
  createDealItem,
  updateDealItem,
  deleteDealItem,
} from '../../../services/dealItemService';
import { getAllDealsRaw } from '../../../services/dealService';
import { getAllMenuItems } from '../../../services/menuItemService';

const EMPTY_FORM = { deal_id: '', menu_item_id: '', quantity: 1 };

function DealItemForm({ form, setForm, onSubmit, submitLabel, submitting, deals, menuItems, isEdit }) {
  const selectedDeal = deals.find(
    d => String(d.id) === String(form.deal_id)
  );

  const selectedRestaurantId = selectedDeal?.restaurant_id;

  const filteredMenuItems = selectedRestaurantId
    ? menuItems.filter(
        m =>
          String(m.restaurant?.id) ===
          String(selectedRestaurantId)
      )
    : menuItems;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">

<div className="flex flex-col gap-1.5">
  <label className="text-[13px] font-semibold text-[#03081F] dark:text-white">
    Deal
  </label>

  <select
    value={form.deal_id}
    onChange={e =>
      setForm(p => ({
        ...p,
        deal_id: e.target.value,
        menu_item_id: '',

      }))
    }
    required
    className="h-[46px] w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 text-[14px] text-black dark:text-white outline-none focus:border-[#fc8a06] transition-colors cursor-pointer"
  >
    <option value="">Select a deal...</option>
    {deals.map(d => (
      <option
        key={d.id}
        value={d.id}
        className="bg-white dark:bg-[#0a0f2e]"
      >
        {d.name}
      </option>
    ))}
  </select>
</div>

<div className="flex flex-col gap-1.5">
  <label className="text-[13px] font-semibold text-[#03081F] dark:text-white">
    Menu Item
  </label>

  <select
    value={form.menu_item_id}
    onChange={e =>
      setForm(p => ({
        ...p,
        menu_item_id: e.target.value,
      }))
    }
    required
    className="h-[46px] w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 text-[14px] text-black dark:text-white outline-none focus:border-[#fc8a06] transition-colors cursor-pointer"
  >
    <option value="">Select a menu item...</option>
    {filteredMenuItems.map(m => (
      <option
        key={m.id}
        value={m.id}
        className="bg-white dark:bg-[#0a0f2e]"
      >
        {m.name} — {m.restaurant?.name}
      </option>
    ))}
  </select>
</div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-semibold text-[#03081F] dark:text-white">Quantity</label>
        <input
          type="number"
          min="1"
          value={form.quantity}
          onChange={e => setForm(p => ({ ...p, quantity: e.target.value }))}
          required
          className="h-[46px] w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 text-[14px] text-black dark:text-white outline-none focus:border-[#fc8a06] transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="h-[48px] w-full rounded-xl bg-[#fc8a06] text-white font-bold text-[14px] hover:bg-[#e07a00] transition-colors mt-2 cursor-pointer disabled:opacity-60"
      >
        {submitting ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
}

export default function DealItems() {
  const [dealItems, setDealItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [search, setSearch] = useState('');
  const [filterDeal, setFilterDeal] = useState('all');

  const [deals, setDeals] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  const [panelOpen, setPanelOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchDealItems = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const data = await getAllDealItems();
      setDealItems(data);
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeals = async () => {
    try {
      setDeals(await getAllDealsRaw());
    } catch (err) {
      console.error('Error fetching deals:', err);
    }
  };

  const fetchMenuItems = async () => {
    try {
      setMenuItems(await getAllMenuItems());
    } catch (err) {
      console.error('Error fetching menu items:', err);
    }
  };

  useEffect(() => {
    fetchDealItems();
    fetchDeals();
    fetchMenuItems();
  }, []);

  const dealNameOf = (dealId) => deals.find(d => String(d.id) === String(dealId))?.name || `Deal #${dealId}`;

  const filtered = dealItems.filter(item => {
    const matchSearch =
      item.menu_item?.name?.toLowerCase().includes(search.toLowerCase()) ||
      dealNameOf(item.deal_id).toLowerCase().includes(search.toLowerCase());
    const matchDeal = filterDeal === 'all' || String(item.deal_id) === filterDeal;
    return matchSearch && matchDeal;
  });

  const openAdd = () => {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setPanelOpen(true);
  };

  const openEdit = (item) => {
    setEditTarget(item);
    setForm({
      deal_id: String(item.deal_id),
      menu_item_id: String(item.menu_item_id),
      quantity: item.quantity,
    });
    setPanelOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      if (editTarget) {
        // Only quantity is realistically editable — see the read-only
        // deal/menu-item fields in the form for why.
        const updated = await updateDealItem(editTarget.id, {
            deal_id: form.deal_id,
             menu_item_id: form.menu_item_id,

            quantity: form.quantity });
        setDealItems(prev => prev.map(it => it.id === editTarget.id ? { ...it, ...updated } : it));
      } else {
        const created = await createDealItem({
          deal_id: form.deal_id,
          menu_item_id: form.menu_item_id,
          quantity: form.quantity,
        });
        setDealItems(prev => [...prev, created]);
      }
      setPanelOpen(false);
    } catch (err) {
      alert(`Couldn't save this deal item: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (deleting || !deleteTarget) return;
    setDeleting(true);
    try {
      await deleteDealItem(deleteTarget.id);
      setDealItems(prev => prev.filter(it => it.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      alert(`Couldn't remove this item: ${err.message}`);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-6 space-y-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl px-4 h-[44px] flex-1">
          <Search size={15} className="text-black/30 dark:text-white/30 shrink-0" />
          <input
            type="text"
            placeholder="Search deal items..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-[13px] text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none w-full"
          />
        </div>
        <select
          value={filterDeal}
          onChange={e => setFilterDeal(e.target.value)}
          className="h-[44px] px-4 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl text-[13px] text-black dark:text-white outline-none cursor-pointer"
        >
          <option value="all" className="bg-white dark:bg-[#0a0f2e]">All Deals</option>
          {deals.map(d => <option key={d.id} value={String(d.id)} className="bg-white dark:bg-[#0a0f2e]">{d.name}</option>)}
        </select>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 h-[44px] bg-[#fc8a06] text-white rounded-xl font-semibold text-[13px] hover:bg-[#e07a00] transition-colors cursor-pointer shrink-0"
        >
          <Plus size={16} /> Add Item to Deal
        </button>
      </div>

      {loadError && (
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl px-4 py-2.5 text-[12px] text-red-500">
          Couldn't load deal items right now. ({loadError})
        </div>
      )}

      <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-black/5 dark:border-white/5">
          <p className="text-[14px] font-bold text-[#03081F] dark:text-white">
            Deal Items <span className="text-black/30 dark:text-white/30 font-normal text-[13px]">({filtered.length})</span>
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/5">
                {['Deal', 'Menu Item', 'Restaurant', 'Qty', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-black/40 dark:text-white/40 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan="5" className="text-center py-10 text-black/30 dark:text-white/30">Loading deal items…</td></tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan="5" className="text-center py-10 text-black/30 dark:text-white/30">No deal items found.</td></tr>
              )}
              {!loading && filtered.map(item => (
                <tr key={item.id} className="border-b border-black/3 dark:border-white/3 hover:bg-[#fc8a06]/2 transition-colors">
                  <td className="px-4 py-3.5 font-semibold text-[#03081F] dark:text-white whitespace-nowrap">{dealNameOf(item.deal_id)}</td>
                  <td className="px-4 py-3.5 text-black/60 dark:text-white/60">{item.menu_item?.name}</td>
                  <td className="px-4 py-3.5 text-black/60 dark:text-white/60 whitespace-nowrap">{item.menu_item?.restaurant?.name}</td>
                  <td className="px-4 py-3.5 font-bold text-[#03081F] dark:text-white">{item.quantity}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors cursor-pointer">
                        <Pencil size={13} className="text-[#03081F] dark:text-white" />
                      </button>
                      <button onClick={() => setDeleteTarget(item)} className="p-1.5 rounded-lg bg-red-50 dark:bg-red-400/10 hover:bg-red-100 dark:hover:bg-red-400/20 transition-colors cursor-pointer">
                        <Trash2 size={13} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SlideOverPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        title={editTarget ? 'Edit Deal Item' : 'Add Item to Deal'}
      >
        <DealItemForm
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          submitLabel={editTarget ? 'Save Changes' : 'Add Item'}
          submitting={submitting}
          deals={deals}
          menuItems={menuItems}
          isEdit={!!editTarget}
        />
      </SlideOverPanel>

      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Remove this item from the deal?"
        message={`"${deleteTarget?.menu_item?.name}" will be removed from "${dealNameOf(deleteTarget?.deal_id)}".`}
        confirmLabel={deleting ? 'Removing…' : 'Remove Item'}
      />
    </div>
  );
}