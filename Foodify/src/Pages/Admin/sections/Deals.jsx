import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, Star, CheckCircle, XCircle, ShoppingBag } from 'lucide-react';
import SlideOverPanel from '../../../Components/AdminComponents/SlideOverPanel';
import ConfirmModal from '../../../Components/AdminComponents/ConfirmModal';
import { mockDeals, mockRestaurants } from '../mockData';

const EMPTY_FORM = { name: '', description: '', combo_price: '', restaurant_id: '', is_active: true, is_featured: false };

function DealForm({ form, setForm, onSubmit, submitLabel }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <p className="text-[11px] text-black/40 dark:text-white/40 bg-black/3 dark:bg-white/5 rounded-lg px-3 py-2">
        API: <code>POST /restaurants/create-deal/</code> or <code>PATCH /restaurants/update-deal/:id/</code>
      </p>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-semibold text-[#03081F] dark:text-white">Deal Name</label>
        <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Dragon Feast for Two" required
          className="h-[46px] w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 text-[14px] text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none focus:border-[#fc8a06] transition-colors" />
      </div>

      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#03081F] dark:text-white">Combo Price (£)</label>
          <input type="number" step="0.01" value={form.combo_price} onChange={e => setForm(p => ({ ...p, combo_price: e.target.value }))} placeholder="0.00" required
            className="h-[46px] w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 text-[14px] text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none focus:border-[#fc8a06] transition-colors" />
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#03081F] dark:text-white">Restaurant</label>
          <select value={form.restaurant_id} onChange={e => setForm(p => ({ ...p, restaurant_id: e.target.value }))} required
            className="h-[46px] w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 text-[14px] text-black dark:text-white outline-none focus:border-[#fc8a06] transition-colors cursor-pointer">
            <option value="">Select...</option>
            {mockRestaurants.map(r => <option key={r.id} value={String(r.id)} className="bg-white dark:bg-[#0a0f2e]">{r.name}</option>)}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-semibold text-[#03081F] dark:text-white">Description</label>
        <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="What's included in this deal?" rows={3}
          className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-[14px] text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none focus:border-[#fc8a06] transition-colors resize-none" />
      </div>

      <div className="flex gap-4">
        {[{ key: 'is_active', label: 'Active' }, { key: 'is_featured', label: 'Featured' }].map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.checked }))} className="w-4 h-4 accent-[#fc8a06]" />
            <span className="text-[13px] text-[#03081F] dark:text-white">{label}</span>
          </label>
        ))}
      </div>

      <button type="submit" className="h-[48px] w-full rounded-xl bg-[#fc8a06] text-white font-bold text-[14px] hover:bg-[#e07a00] transition-colors mt-2 cursor-pointer">
        {submitLabel}
      </button>
    </form>
  );
}

export default function Deals() {
  const [deals, setDeals] = useState(mockDeals);
  const [search, setSearch] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = deals.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.restaurant.name.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setEditTarget(null); setForm(EMPTY_FORM); setPanelOpen(true); };
  const openEdit = (d) => {
    setEditTarget(d);
    setForm({ name: d.name, description: d.description, combo_price: d.combo_price, restaurant_id: String(d.restaurant.id), is_active: d.is_active, is_featured: d.is_featured });
    setPanelOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTarget) {
      setDeals(prev => prev.map(d => d.id === editTarget.id ? { ...d, ...form } : d));
    } else {
      const newId = Math.max(...deals.map(d => d.id)) + 1;
      const rest = mockRestaurants.find(r => String(r.id) === form.restaurant_id);
      setDeals(prev => [...prev, { id: newId, ...form, restaurant: rest || { id: 0, name: '' }, image: null, items: [], created_at: new Date().toISOString() }]);
    }
    setPanelOpen(false);
  };

  const handleDelete = () => setDeals(prev => prev.filter(d => d.id !== deleteTarget.id));

  const toggleActive = (id) => setDeals(prev => prev.map(d => d.id === id ? { ...d, is_active: !d.is_active } : d));

  return (
    <div className="p-6 space-y-5">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl px-4 h-[44px] flex-1">
          <Search size={15} className="text-black/30 dark:text-white/30 shrink-0" />
          <input type="text" placeholder="Search deals..." value={search} onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-[13px] text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none w-full" />
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 h-[44px] bg-[#fc8a06] text-white rounded-xl font-semibold text-[13px] hover:bg-[#e07a00] transition-colors cursor-pointer shrink-0">
          <Plus size={16} /> Add Deal
        </button>
      </div>

      {/* API hint */}
      <div className="bg-[#fc8a06]/5 border border-[#fc8a06]/20 rounded-xl px-4 py-2.5 text-[12px] text-[#fc8a06]">
        <span className="font-semibold">API:</span> <code>GET /restaurants/all-deal/</code> · <code>POST /restaurants/create-deal/</code> · <code>PATCH /restaurants/update-deal/:id/</code> · <code>DELETE /restaurants/delete-deal/:id/</code>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(deal => (
          <div key={deal.id} className={`bg-white dark:bg-white/5 border rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ${deal.is_active ? 'border-black/5 dark:border-white/5' : 'border-dashed border-black/10 dark:border-white/10 opacity-70'}`}>
            {/* Header stripe */}
            <div className="h-[80px] bg-gradient-to-br from-[#03081F] to-[#1a2155] flex items-center justify-between px-5">
              <ShoppingBag size={28} className="text-[#fc8a06]/60" />
              <div className="flex flex-col items-end gap-1">
                <span className="text-[22px] font-black text-white">£{deal.combo_price}</span>
                <span className="text-[10px] text-white/40">combo price</span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-[14px] text-[#03081F] dark:text-white leading-tight">{deal.name}</h3>
                <div className="flex gap-1 shrink-0">
                  {deal.is_featured && <span className="p-1 bg-yellow-50 dark:bg-yellow-400/10 rounded-lg"><Star size={12} className="text-yellow-500" /></span>}
                  {deal.is_active
                    ? <span className="px-2 py-0.5 bg-green-50 dark:bg-green-400/10 rounded-full text-[10px] text-green-600 font-semibold">Active</span>
                    : <span className="px-2 py-0.5 bg-black/5 dark:bg-white/10 rounded-full text-[10px] text-black/40 dark:text-white/40 font-semibold">Inactive</span>
                  }
                </div>
              </div>
              <p className="text-[12px] text-black/50 dark:text-white/50 mb-1 line-clamp-2">{deal.description}</p>
              <p className="text-[11px] text-[#fc8a06] font-medium mb-3">{deal.restaurant.name}</p>

              {/* Deal items chips */}
              {deal.items?.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {deal.items.map((di, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-[#fc8a06]/10 text-[#fc8a06] text-[10px] rounded-full">
                      {di.menu_item.name} ×{di.quantity}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <button onClick={() => toggleActive(deal.id)}
                  className="flex-1 h-[34px] rounded-xl text-[11px] font-semibold transition-colors cursor-pointer bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/20">
                  {deal.is_active ? 'Deactivate' : 'Activate'}
                </button>
                <button onClick={() => openEdit(deal)} className="p-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors cursor-pointer">
                  <Pencil size={13} className="text-[#03081F] dark:text-white" />
                </button>
                <button onClick={() => setDeleteTarget(deal)} className="p-2 rounded-xl bg-red-50 dark:bg-red-400/10 hover:bg-red-100 dark:hover:bg-red-400/20 transition-colors cursor-pointer">
                  <Trash2 size={13} className="text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SlideOverPanel open={panelOpen} onClose={() => setPanelOpen(false)} title={editTarget ? `Edit: ${editTarget.name}` : 'Add New Deal'}>
        <DealForm form={form} setForm={setForm} onSubmit={handleSubmit} submitLabel={editTarget ? 'Save Changes' : 'Create Deal'} />
      </SlideOverPanel>

      <ConfirmModal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete}
        title={`Delete "${deleteTarget?.name}"?`} message="This deal and all its deal items will be permanently removed." confirmLabel="Delete Deal" />
    </div>
  );
}
