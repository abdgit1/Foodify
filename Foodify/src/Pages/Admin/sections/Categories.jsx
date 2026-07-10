import { useState } from 'react';
import { Plus, Pencil, Trash2, Tag, Check, X } from 'lucide-react';
import ConfirmModal from '../../../Components/AdminComponents/ConfirmModal';
import { mockCategories } from '../mockData';

export default function Categories() {
  const [categories, setCategories] = useState(mockCategories);
  const [newName, setNewName] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const newId = Math.max(...categories.map(c => c.id)) + 1;
    const slug = newName.toLowerCase().replace(/\s+/g, '-');
    setCategories(prev => [...prev, { id: newId, name: newName.trim(), slug, created_at: new Date().toISOString() }]);
    setNewName('');
  };

  const handleEdit = (id) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, name: editName.trim(), slug: editName.toLowerCase().replace(/\s+/g, '-') } : c));
    setEditId(null);
    setEditName('');
  };

  const handleDelete = () => setCategories(prev => prev.filter(c => c.id !== deleteTarget.id));

  return (
    <div className="p-6 space-y-5">

      {/* API hint */}
      <div className="bg-[#fc8a06]/5 border border-[#fc8a06]/20 rounded-xl px-4 py-2.5 text-[12px] text-[#fc8a06]">
        <span className="font-semibold">API:</span>{' '}
        <code>GET /restaurants/all-category</code> ·{' '}
        <code>POST /restaurants/create-category/</code> ·{' '}
        <code>PATCH /restaurants/update-category/:id/</code> ·{' '}
        <code>DELETE /restaurants/delete-category/:id/</code>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Add category form */}
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl p-5">
          <h2 className="text-[14px] font-bold text-[#03081F] dark:text-white mb-4 flex items-center gap-2">
            <Plus size={16} className="text-[#fc8a06]" /> Add New Category
          </h2>
          <form onSubmit={handleAdd} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-[#03081F] dark:text-white">Category Name</label>
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="e.g. Japanese"
                required
                className="h-[44px] w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 text-[14px] text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none focus:border-[#fc8a06] transition-colors"
              />
              {newName && (
                <p className="text-[11px] text-black/40 dark:text-white/40">Slug: <span className="font-medium">{newName.toLowerCase().replace(/\s+/g, '-')}</span></p>
              )}
            </div>
            <button
              type="submit"
              className="h-[44px] w-full rounded-xl bg-[#fc8a06] text-white font-bold text-[13px] hover:bg-[#e07a00] transition-colors cursor-pointer"
            >
              Create Category
            </button>
          </form>
        </div>

        {/* Categories list */}
        <div className="lg:col-span-2 bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-black/5 dark:border-white/5">
            <p className="text-[14px] font-bold text-[#03081F] dark:text-white">
              All Categories <span className="text-black/30 dark:text-white/30 font-normal text-[13px]">({categories.length})</span>
            </p>
          </div>
          <div className="divide-y divide-black/3 dark:divide-white/3">
            {categories.map((cat) => (
              <div key={cat.id} className="flex items-center gap-4 px-5 py-4 hover:bg-black/1.5 dark:hover:bg-white/1.5 transition-colors">
                <div className="w-9 h-9 bg-[#fc8a06]/10 rounded-xl flex items-center justify-center shrink-0">
                  <Tag size={16} className="text-[#fc8a06]" />
                </div>

                {editId === cat.id ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      autoFocus
                      className="flex-1 h-[36px] rounded-xl border border-[#fc8a06] bg-white dark:bg-white/5 px-3 text-[13px] text-black dark:text-white outline-none"
                    />
                    <button onClick={() => handleEdit(cat.id)} className="w-8 h-8 rounded-lg bg-[#028643] flex items-center justify-center hover:bg-[#026635] transition-colors cursor-pointer">
                      <Check size={14} className="text-white" />
                    </button>
                    <button onClick={() => setEditId(null)} className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/20 transition-colors cursor-pointer">
                      <X size={14} className="text-[#03081F] dark:text-white" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[14px] text-[#03081F] dark:text-white">{cat.name}</p>
                      <p className="text-[11px] text-black/30 dark:text-white/30">slug: {cat.slug}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => { setEditId(cat.id); setEditName(cat.name); }}
                        className="p-2 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors cursor-pointer"
                      >
                        <Pencil size={13} className="text-[#03081F] dark:text-white" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(cat)}
                        className="p-2 rounded-lg bg-red-50 dark:bg-red-400/10 hover:bg-red-100 dark:hover:bg-red-400/20 transition-colors cursor-pointer"
                      >
                        <Trash2 size={13} className="text-red-500" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title={`Delete "${deleteTarget?.name}"?`}
        message="Deleting this category will unlink it from all associated menu items."
        confirmLabel="Delete Category"
      />
    </div>
  );
}
