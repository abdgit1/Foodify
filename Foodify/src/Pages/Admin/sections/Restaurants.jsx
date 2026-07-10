import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, Star, CheckCircle, XCircle, Store } from 'lucide-react';
import SlideOverPanel from '../../../Components/AdminComponents/SlideOverPanel';
import ConfirmModal from '../../../Components/AdminComponents/ConfirmModal';
import { mockRestaurants } from '../mockData';

const EMPTY_FORM = { name: '', description: '', address: '', is_featured: false, is_active: true };

function RestaurantForm({ form, setForm, onSubmit, submitLabel }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <p className="text-[11px] text-black/40 dark:text-white/40 bg-black/3 dark:bg-white/5 rounded-lg px-3 py-2">
        API: <code>POST /restaurants/create-restaurant/</code> or <code>PATCH /restaurants/update-restaurant/:id/</code>
      </p>
      {[
        { label: 'Restaurant Name', key: 'name', type: 'text', placeholder: 'e.g. Golden Dragon' },
        { label: 'Address', key: 'address', type: 'text', placeholder: 'e.g. 45 Main Blvd, Lahore' },
      ].map(({ label, key, type, placeholder }) => (
        <div key={key} className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#03081F] dark:text-white">{label}</label>
          <input
            type={type}
            value={form[key]}
            onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
            placeholder={placeholder}
            required
            className="h-[46px] w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 text-[14px] text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none focus:border-[#fc8a06] transition-colors"
          />
        </div>
      ))}
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-semibold text-[#03081F] dark:text-white">Description</label>
        <textarea
          value={form.description}
          onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
          placeholder="Brief description of the restaurant..."
          rows={3}
          className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-[14px] text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none focus:border-[#fc8a06] transition-colors resize-none"
        />
      </div>
      <div className="flex gap-4">
        {[{ key: 'is_featured', label: 'Featured' }, { key: 'is_active', label: 'Active' }].map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form[key]}
              onChange={e => setForm(p => ({ ...p, [key]: e.target.checked }))}
              className="w-4 h-4 accent-[#fc8a06]"
            />
            <span className="text-[13px] text-[#03081F] dark:text-white">{label}</span>
          </label>
        ))}
      </div>
      <button
        type="submit"
        className="h-[48px] w-full rounded-xl bg-[#fc8a06] text-white font-bold text-[14px] hover:bg-[#e07a00] transition-colors mt-2 cursor-pointer"
      >
        {submitLabel}
      </button>
    </form>
  );
}

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState(mockRestaurants);
  const [search, setSearch] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = restaurants.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.address.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setEditTarget(null); setForm(EMPTY_FORM); setPanelOpen(true); };
  const openEdit = (r) => { setEditTarget(r); setForm({ name: r.name, description: r.description, address: r.address, is_featured: r.is_featured, is_active: r.is_active }); setPanelOpen(true); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTarget) {
      setRestaurants(prev => prev.map(r => r.id === editTarget.id ? { ...r, ...form } : r));
    } else {
      const newId = Math.max(...restaurants.map(r => r.id)) + 1;
      setRestaurants(prev => [...prev, { id: newId, ...form, image: null, created_at: new Date().toISOString() }]);
    }
    setPanelOpen(false);
  };

  const handleDelete = () => {
    setRestaurants(prev => prev.filter(r => r.id !== deleteTarget.id));
  };

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl px-4 h-[44px] flex-1 max-w-[360px]">
          <Search size={15} className="text-black/30 dark:text-white/30 shrink-0" />
          <input
            type="text"
            placeholder="Search restaurants..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-[13px] text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none w-full"
          />
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 h-[44px] bg-[#fc8a06] text-white rounded-xl font-semibold text-[13px] hover:bg-[#e07a00] transition-colors cursor-pointer shrink-0"
        >
          <Plus size={16} /> Add Restaurant
        </button>
      </div>

      {/* API hint */}
      <div className="bg-[#fc8a06]/5 border border-[#fc8a06]/20 rounded-xl px-4 py-2.5 text-[12px] text-[#fc8a06]">
        <span className="font-semibold">API:</span> <code>GET /restaurants/all-restaurant</code> · <code>POST /restaurants/create-restaurant/</code> · <code>PATCH /restaurants/update-restaurant/:id/</code> · <code>DELETE /restaurants/delete-restaurant/:id/</code>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(r => (
          <div key={r.id} className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            {/* Image placeholder */}
            <div className="h-[100px] bg-gradient-to-br from-[#fc8a06]/10 to-[#03081F]/5 flex items-center justify-center">
              <Store size={32} className="text-[#fc8a06]/40" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-[15px] text-[#03081F] dark:text-white">{r.name}</h3>
                <div className="flex gap-1 shrink-0">
                  {r.is_featured && <span className="p-1 bg-yellow-50 dark:bg-yellow-400/10 rounded-lg"><Star size={12} className="text-yellow-500" /></span>}
                  {r.is_active
                    ? <span className="p-1 bg-green-50 dark:bg-green-400/10 rounded-lg"><CheckCircle size={12} className="text-green-500" /></span>
                    : <span className="p-1 bg-red-50 dark:bg-red-400/10 rounded-lg"><XCircle size={12} className="text-red-400" /></span>
                  }
                </div>
              </div>
              <p className="text-[12px] text-black/50 dark:text-white/50 mb-1 line-clamp-2">{r.description}</p>
              <p className="text-[11px] text-black/30 dark:text-white/30 mb-4">{r.address}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(r)}
                  className="flex-1 flex items-center justify-center gap-1.5 h-[36px] bg-black/5 dark:bg-white/10 rounded-xl text-[12px] font-semibold text-[#03081F] dark:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <Pencil size={13} /> Edit
                </button>
                <button
                  onClick={() => setDeleteTarget(r)}
                  className="flex-1 flex items-center justify-center gap-1.5 h-[36px] bg-red-50 dark:bg-red-400/10 rounded-xl text-[12px] font-semibold text-red-500 hover:bg-red-100 dark:hover:bg-red-400/20 transition-colors cursor-pointer"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide-over panel */}
      <SlideOverPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        title={editTarget ? `Edit: ${editTarget.name}` : 'Add New Restaurant'}
      >
        <RestaurantForm form={form} setForm={setForm} onSubmit={handleSubmit} submitLabel={editTarget ? 'Save Changes' : 'Create Restaurant'} />
      </SlideOverPanel>

      {/* Delete confirm */}
      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title={`Delete "${deleteTarget?.name}"?`}
        message="This will permanently remove the restaurant and all associated data."
        confirmLabel="Delete Restaurant"
      />
    </div>
  );
}
