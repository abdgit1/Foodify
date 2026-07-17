import { useState,useEffect } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import SlideOverPanel from '../../../Components/AdminComponents/SlideOverPanel';
import ConfirmModal from '../../../Components/AdminComponents/ConfirmModal';
import { getAllMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from '../../../services/menuItemService';
import {getAllRestaurants} from '../../../services/restaurantservices';
import {getAllCategories,} from '../../../services/Categoryservice';



const EMPTY_FORM = { name: '', description: '', price: '', restaurant_id: '', category_id: '', is_available: true, is_featured: false, image: null };


function MenuItemForm({ form, setForm, onSubmit, submitLabel ,restaurants , categories}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <p className="text-[11px] text-black/40 dark:text-white/40 bg-black/3 dark:bg-white/5 rounded-lg px-3 py-2">
        API: <code>POST /restaurants/create-menuitem/</code> or <code>PATCH /restaurants/update-menuitem/:id/</code>
      </p>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-semibold text-[#03081F] dark:text-white">Item Name</label>
        <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Kung Pao Chicken" required
          className="h-[46px] w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 text-[14px] text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none focus:border-[#fc8a06] transition-colors" />
      </div>

      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#03081F] dark:text-white">Price (£)</label>
          <input type="number" step="0.01" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} placeholder="0.00" required
            className="h-[46px] w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 text-[14px] text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none focus:border-[#fc8a06] transition-colors" />
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#03081F] dark:text-white">Restaurant</label>
          <select value={form.restaurant_id} onChange={e => setForm(p => ({ ...p, restaurant_id: e.target.value }))} required
            className="h-[46px] w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 text-[14px] text-black dark:text-white outline-none focus:border-[#fc8a06] transition-colors cursor-pointer">
            <option value="">Select...</option>
            {restaurants.map(r => <option key={r.id} value={r.id} className="bg-white dark:bg-[#0a0f2e]">{r.name}</option>)}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-semibold text-[#03081F] dark:text-white">Category</label>
        <select value={form.category_id} onChange={e => setForm(p => ({ ...p, category_id: e.target.value }))}
          className="h-[46px] w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 text-[14px] text-black dark:text-white outline-none focus:border-[#fc8a06] transition-colors cursor-pointer">
          <option value="">None</option>
          {categories.map(c => <option key={c.id} value={c.id} className="bg-white dark:bg-[#0a0f2e]">{c.name}</option>)}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-semibold text-[#03081F] dark:text-white">Description</label>
        <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Item description..." rows={3}
          className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-[14px] text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none focus:border-[#fc8a06] transition-colors resize-none" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-semibold text-[#03081F] dark:text-white">Image</label>
        {form.image && typeof form.image === 'string' && (
          <img src={form.image} alt="Current" className="w-20 h-20 rounded-lg object-cover mb-1" />
        )}
        <input type="file" accept="image/*" onChange={e => setForm(p => ({ ...p, image: e.target.files?.[0] || p.image }))}
          className="text-[13px] text-black/60 dark:text-white/60 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-[13px] file:font-semibold file:bg-[#fc8a06]/10 file:text-[#fc8a06] hover:file:bg-[#fc8a06]/20 cursor-pointer" />
      </div>

      <div className="flex gap-4">
        {[{ key: 'is_available', label: 'Available' }, { key: 'is_featured', label: 'Featured' }].map(({ key, label }) => (
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




  

export default function MenuItems() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [filterRestaurant, setFilterRestaurant] = useState('all');
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);





const fetchMenuItems = async () => {
  setLoading(true);
  setError(null);
  try {
    const data = await getAllMenuItems();
    setItems(data);
  } catch (err) {
    console.error('Error fetching menu items:', err);
    setError('Failed to load menu items. Please try again.');
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchMenuItems();
}, []);

const fetchRestaurants = async () => {
    try {
      const data = await getAllRestaurants();
      setRestaurants(data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddMenuItem = async (payload) => {
    try {
      const newItem = await createMenuItem(payload);
      setItems(prev => [...prev, newItem]);
    }
    catch (error) {
      console.error('Error creating menu item:', error);
    }
  };


  const handleUpdateMenuItem = async (id, payload) => {
    try {
      const updatedItem = await updateMenuItem(id, payload);
      setItems(prev => prev.map(it => it.id === id ? updatedItem : it));
    }
    catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  


  const filtered = items.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.restaurant.name.toLowerCase().includes(search.toLowerCase());
    const matchRest = filterRestaurant === 'all' || String(item.restaurant.id) === filterRestaurant;
    return matchSearch && matchRest;
  });

  const openAdd = () => { setEditTarget(null); setForm(EMPTY_FORM); setPanelOpen(true); };
  const openEdit = (item) => {
    setEditTarget(item);
    setForm({ name: item.name, description: item.description, price: item.price, restaurant_id: String(item.restaurant.id), category_id: String(item.category?.id || ''), is_available: item.is_available, is_featured: item.is_featured, image: item.image || null });
    setPanelOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTarget) {
      handleUpdateMenuItem(editTarget.id, form);
    } else {
      handleAddMenuItem(form);
    }
    setPanelOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteMenuItem(deleteTarget.id);
      setItems(prev => prev.filter(it => it.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      console.error('Error deleting menu item:', err);
      setError('Failed to delete menu item. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-6 space-y-5">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl px-4 h-[44px] flex-1">
          <Search size={15} className="text-black/30 dark:text-white/30 shrink-0" />
          <input type="text" placeholder="Search menu items..." value={search} onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-[13px] text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none w-full" />
        </div>
        <select value={filterRestaurant} onChange={e => setFilterRestaurant(e.target.value)}
          className="h-[44px] px-4 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl text-[13px] text-black dark:text-white outline-none cursor-pointer">
          <option value="all" className="bg-white dark:bg-[#0a0f2e]">All Restaurants</option>
          {restaurants.map(r => <option key={r.id} value={String(r.id)} className="bg-white dark:bg-[#0a0f2e]">{r.name}</option>)}
        </select>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 h-[44px] bg-[#fc8a06] text-white rounded-xl font-semibold text-[13px] hover:bg-[#e07a00] transition-colors cursor-pointer shrink-0">
          <Plus size={16} /> Add Item
        </button>
      </div>

      {/* API hint */}
      <div className="bg-[#fc8a06]/5 border border-[#fc8a06]/20 rounded-xl px-4 py-2.5 text-[12px] text-[#fc8a06]">
        <span className="font-semibold">API:</span> <code>GET /restaurants/all-menuitem</code> · <code>POST /restaurants/create-menuitem/</code> · <code>PATCH /restaurants/update-menuitem/:id/</code> · <code>DELETE /restaurants/delete-menuitem/:id/</code>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-400/10 border border-red-200 dark:border-red-400/20 rounded-xl px-4 py-2.5 text-[13px] text-red-600 dark:text-red-400 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={fetchMenuItems} className="font-semibold underline cursor-pointer">Retry</button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-black/5 dark:border-white/5">
          <p className="text-[14px] font-bold text-[#03081F] dark:text-white">Menu Items <span className="text-black/30 dark:text-white/30 font-normal text-[13px]">({filtered.length})</span></p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/5">
                {['Name', 'Restaurant', 'Category', 'Price', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-black/40 dark:text-white/40 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-black/40 dark:text-white/40 text-[13px]">Loading menu items...</td></tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-black/40 dark:text-white/40 text-[13px]">No menu items found.</td></tr>
              )}
              {!loading && filtered.map(item => (
                <tr key={item.id} className="border-b border-black/3 dark:border-white/3 hover:bg-[#fc8a06]/2 transition-colors">
                  <td className="px-4 py-3.5">
                    <p className="font-semibold text-[#03081F] dark:text-white">{item.name}</p>
                    <p className="text-[11px] text-black/40 dark:text-white/40 line-clamp-1">{item.description}</p>
                  </td>
                  <td className="px-4 py-3.5 text-black/60 dark:text-white/60 whitespace-nowrap">{item.restaurant.name}</td>
                  <td className="px-4 py-3.5">
                    {item.category && (
                      <span className="px-2 py-0.5 bg-[#fc8a06]/10 text-[#fc8a06] text-[11px] rounded-full font-medium">{item.category.name}</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 font-bold text-[#03081F] dark:text-white whitespace-nowrap">£{item.price}</td>
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

      <SlideOverPanel open={panelOpen} onClose={() => setPanelOpen(false)} title={editTarget ? `Edit: ${editTarget.name}` : 'Add Menu Item'}>
        <MenuItemForm form={form} setForm={setForm} onSubmit={handleSubmit} submitLabel={editTarget ? 'Save Changes' : 'Create Item'}  restaurants={restaurants} categories={categories} />
      </SlideOverPanel>

      <ConfirmModal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete}
        title={`Delete "${deleteTarget?.name}"?`} message="This menu item will be permanently removed." confirmLabel={deleting ? 'Deleting...' : 'Delete Item'} />
    </div>
  );
}