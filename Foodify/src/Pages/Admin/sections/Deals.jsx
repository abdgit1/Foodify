import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, ShoppingBag, Loader2, ImagePlus } from 'lucide-react';
import SlideOverPanel from '../../../Components/AdminComponents/SlideOverPanel';
import ConfirmModal from '../../../Components/AdminComponents/ConfirmModal';
import {
  getAllDealsRaw,
  getDealByIdRaw,
  createDeal,
  updateDeal,
  deleteDeal,
} from '../../../services/dealService';
import { getAllRestaurants } from '../../../services/restaurantservices';

const EMPTY_FORM = { name: '', description: '', combo_price: '', restaurant_id: '', is_active: true, is_featured: false };

function DealForm({ form, setForm, imagePreview, onImageChange, onSubmit, submitLabel, submitting, isEdit, restaurantName, restaurantOptions }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-semibold text-[#03081F] dark:text-white">Deal Image</label>
        <div className="flex items-center gap-4">
          <div className="w-[72px] h-[72px] rounded-xl overflow-hidden bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <ShoppingBag size={24} className="text-black/20 dark:text-white/20" />
            )}
          </div>
          <label className="flex-1 h-[46px] flex items-center justify-center gap-2 rounded-xl border border-dashed border-black/15 dark:border-white/15 text-[13px] text-black/50 dark:text-white/50 cursor-pointer hover:border-[#fc8a06] hover:text-[#fc8a06] transition-colors">
            <ImagePlus size={15} />
            {imagePreview ? 'Change image' : 'Upload image'}
            <input type="file" accept="image/*" className="hidden" onChange={onImageChange} />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-semibold text-[#03081F] dark:text-white">Deal Name</label>
        <input
          type="text"
          value={form.name}
          onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
          placeholder="e.g. Dragon Feast for Two"
          required
          className="h-[46px] w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 text-[14px] text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none focus:border-[#fc8a06] transition-colors"
        />
      </div>

      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#03081F] dark:text-white">Combo Price</label>
          <input
            type="number"
            step="0.01"
            value={form.combo_price}
            onChange={e => setForm(p => ({ ...p, combo_price: e.target.value }))}
            placeholder="0.00"
            required
            className="h-[46px] w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 text-[14px] text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none focus:border-[#fc8a06] transition-colors"
          />
        </div>

        <div className="flex-1 flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#03081F] dark:text-white">Restaurant</label>
          <select
  value={form.restaurant_id}
  onChange={(e) =>
    setForm((p) => ({
      ...p,
      restaurant_id: e.target.value,
    }))
  }
  required
  className="h-[46px] w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 text-[14px] text-black dark:text-white outline-none focus:border-[#fc8a06] transition-colors cursor-pointer"
>
  <option value="">Select...</option>

  {restaurantOptions?.map((r) => (
    <option
      key={r.id}
      value={r.id}
      className="bg-white dark:bg-[#0a0f2e]"
    >
      {r.name}
    </option>
  ))}
</select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-semibold text-[#03081F] dark:text-white">Description</label>
        <textarea
          value={form.description}
          onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
          placeholder="What's included in this deal..."
          rows={3}
          className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-[14px] text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none focus:border-[#fc8a06] transition-colors resize-none"
        />
      </div>

      <div className="flex gap-4">
        {[{ key: 'is_active', label: 'Active' }, { key: 'is_featured', label: 'Featured' }].map(({ key, label }) => (
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

      {!isEdit && (
        <p className="text-[11px] text-black/40 dark:text-white/40 bg-black/3 dark:bg-white/5 rounded-lg px-3 py-2">
          This creates the deal itself. Add items to it afterward from the <b>Deal Items</b> tab.
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="h-[48px] w-full rounded-xl bg-[#fc8a06] text-white font-bold text-[14px] hover:bg-[#e07a00] transition-colors mt-2 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {submitting && <Loader2 size={16} className="animate-spin" />}
        {submitting ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
}

export default function Deals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [search, setSearch] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  const restaurantMap = Object.fromEntries(
  restaurants.map((r) => [r.id, r])
);

  const [panelOpen, setPanelOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [loadingEditTarget, setLoadingEditTarget] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchDeals = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const data = await getAllDealsRaw();
      setDeals(data);
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRestaurants = async () => {
    try {
      const data = await getAllRestaurants();
      setRestaurants(data);
    } catch (err) {
      console.error('Error fetching restaurants:', err);
    }
  };

  useEffect(() => {
    fetchDeals();
    fetchRestaurants();
  }, []);

  const filtered = deals.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));

const restaurantNameOf = (deal) =>
  restaurantMap[deal.restaurant_id]?.name ||
  deal.items?.[0]?.menu_item?.restaurant?.name ||
  null;

  const openAdd = () => {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setImageFile(null);
    setImagePreview(null);
    setPanelOpen(true);
  };

  const openEdit = async (d) => {
    setEditTarget(d);
    setImageFile(null);
    setImagePreview(null);
    setPanelOpen(true);
    setLoadingEditTarget(true);
    try {
      const full = await getDealByIdRaw(d.id);
      setForm({
        name: full.name ?? '',
        description: full.description ?? '',
        combo_price: full.combo_price ?? '',
        restaurant_id: full.restaurant_id ?? '',
        is_active: !!full.is_active,
        is_featured: !!full.is_featured,
      });
      setImagePreview(full.image ?? null);
    } catch (err) {
      alert(`Couldn't load "${d.name}" for editing: ${err.message}`);
      setPanelOpen(false);
    } finally {
      setLoadingEditTarget(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (imagePreview && imagePreview.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const payload = { ...form, image: imageFile };
      if (editTarget) {
        const updated = await updateDeal(editTarget.id, payload);
        setDeals(prev => prev.map(d => d.id === editTarget.id ? { ...d, ...updated } : d));
      } else {
        const created = await createDeal(payload);
        setDeals(prev => [...prev, { ...created, items: [] }]);
      }
      setPanelOpen(false);
    } catch (err) {
      alert(`Couldn't save "${form.name}": ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (deleting || !deleteTarget) return;
    setDeleting(true);
    try {
      await deleteDeal(deleteTarget.id);
      setDeals(prev => prev.filter(d => d.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      alert(`Couldn't delete "${deleteTarget.name}": ${err.message}`);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-6 space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl px-4 h-[44px] flex-1 max-w-[360px]">
          <Search size={15} className="text-black/30 dark:text-white/30 shrink-0" />
          <input
            type="text"
            placeholder="Search deals..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-[13px] text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none w-full"
          />
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 h-[44px] bg-[#fc8a06] text-white rounded-xl font-semibold text-[13px] hover:bg-[#e07a00] transition-colors cursor-pointer shrink-0"
        >
          <Plus size={16} /> Add Deal
        </button>
      </div>

      {loadError && (
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl px-4 py-2.5 text-[12px] text-red-500">
          Couldn't load deals right now. ({loadError})
        </div>
      )}

      <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-black/5 dark:border-white/5">
          <p className="text-[14px] font-bold text-[#03081F] dark:text-white">
            Deals <span className="text-black/30 dark:text-white/30 font-normal text-[13px]">({filtered.length})</span>
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/5">
                {['Deal', 'Restaurant', 'Price', 'Items', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-black/40 dark:text-white/40 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan="6" className="text-center py-10 text-black/30 dark:text-white/30">Loading deals…</td></tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan="6" className="text-center py-10 text-black/30 dark:text-white/30">No deals found.</td></tr>
              )}
              {!loading && filtered.map(deal => {
                const itemCount = deal.items?.length || 0;
                return (
                  <tr key={deal.id} className="border-b border-black/3 dark:border-white/3 hover:bg-[#fc8a06]/2 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-black/5 dark:bg-white/10 overflow-hidden flex items-center justify-center shrink-0">
                          {deal.image ? <img src={deal.image} alt={deal.name} className="w-full h-full object-cover" /> : <ShoppingBag size={16} className="text-black/20 dark:text-white/20" />}
                        </div>
                        <div>
                          <p className="font-semibold text-[#03081F] dark:text-white">{deal.name}</p>
                          {deal.is_featured && <span className="text-[10px] text-[#fc8a06] font-semibold">FEATURED</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-black/60 dark:text-white/60 whitespace-nowrap">
                      {restaurantNameOf(deal) || '—'}
                    </td>
                    <td className="px-4 py-3.5 font-bold text-[#03081F] dark:text-white whitespace-nowrap">${Number(deal.combo_price).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td className="px-4 py-3.5">
                      {itemCount > 0 ? (
                        <span className="px-2 py-0.5 bg-[#fc8a06]/10 text-[#fc8a06] text-[11px] rounded-full font-medium">
                          {itemCount} item{itemCount !== 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-red-50 dark:bg-red-400/10 text-red-500 text-[11px] rounded-full font-medium">
                          No items yet
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2 py-0.5 text-[11px] rounded-full font-medium ${deal.is_active ? 'bg-green-50 dark:bg-green-400/10 text-green-600' : 'bg-black/5 dark:bg-white/10 text-black/40 dark:text-white/40'}`}>
                        {deal.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(deal)} className="p-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors cursor-pointer">
                          <Pencil size={13} className="text-[#03081F] dark:text-white" />
                        </button>
                        <button onClick={() => setDeleteTarget(deal)} className="p-1.5 rounded-lg bg-red-50 dark:bg-red-400/10 hover:bg-red-100 dark:hover:bg-red-400/20 transition-colors cursor-pointer">
                          <Trash2 size={13} className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <SlideOverPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        title={editTarget ? `Edit: ${editTarget.name}` : 'Add New Deal'}
      >
        {loadingEditTarget ? (
          <div className="flex items-center justify-center py-16 text-black/30 dark:text-white/30 text-[13px]">
            <Loader2 size={18} className="animate-spin mr-2" /> Loading deal…
          </div>
        ) : (
          <DealForm
            form={form}
            setForm={setForm}
            imagePreview={imagePreview}
            onImageChange={handleImageChange}
            onSubmit={handleSubmit}
            submitLabel={editTarget ? 'Save Changes' : 'Create Deal'}
            submitting={submitting}
            isEdit={!!editTarget}
            restaurantName={editTarget ? restaurantNameOf(editTarget) : null}
            restaurantOptions={restaurants}
          />
        )}
      </SlideOverPanel>

      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title={`Delete "${deleteTarget?.name}"?`}
        message="This will permanently remove the deal and its item associations."
        confirmLabel={deleting ? 'Deleting…' : 'Delete Deal'}
      />
    </div>
  );
}