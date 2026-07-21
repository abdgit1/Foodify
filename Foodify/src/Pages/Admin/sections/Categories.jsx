import { useState, useEffect, useMemo } from 'react';
import { Plus, Pencil, Trash2, Tag, Check, X, Search } from 'lucide-react';
import ConfirmModal from '../../../Components/AdminComponents/ConfirmModal';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../../services/categoryService';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState(null);

  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [savingEditId, setSavingEditId] = useState(null);
  const [editError, setEditError] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const fetchCategories = async () => {
    setLoading(true);
    setListError(null);
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      setListError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setCreating(true);
    setCreateError(null);
    try {
      const newCategory = await createCategory({ name: newName.trim() });
      setCategories((prev) => [...prev, newCategory]);
      setNewName('');
    } catch (err) {
      setCreateError(err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleEdit = async (id) => {
    if (!editName.trim()) return;

    setSavingEditId(id);
    setEditError(null);
    try {
      const updatedCategory = await updateCategory(id, { name: editName.trim() });
      setCategories((prev) => prev.map((c) => (c.id === id ? updatedCategory : c)));
      setEditId(null);
      setEditName('');
    } catch (err) {
      setEditError(err.message);
    } finally {
      setSavingEditId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      await deleteCategory(deleteTarget.id);
      setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      // Surface delete failures too — e.g. trying to delete a category
      // that's still linked to menu items may be rejected by the backend.
      alert(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => c.name.toLowerCase().includes(q));
  }, [categories, searchQuery]);

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
          <form onSubmit={handleCreateCategory} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-[#03081F] dark:text-white">Category Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Japanese"
                required
                className="h-[44px] w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 text-[14px] text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none focus:border-[#fc8a06] transition-colors"
              />
              {newName && (
                <p className="text-[11px] text-black/40 dark:text-white/40">
                  Slug (server-generated preview): <span className="font-medium">{newName.toLowerCase().trim().replace(/\s+/g, '-')}</span>
                </p>
              )}
            </div>

            {createError && (
              <p className="text-[12px] text-red-500 font-medium">{createError}</p>
            )}

            <button
              type="submit"
              disabled={creating}
              className="h-[44px] w-full rounded-xl bg-[#fc8a06] text-white font-bold text-[13px] hover:bg-[#e07a00] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {creating ? 'Creating…' : 'Create Category'}
            </button>
          </form>
        </div>

        {/* Categories list */}
        <div className="lg:col-span-2 bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-black/5 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-[14px] font-bold text-[#03081F] dark:text-white shrink-0">
              All Categories{' '}
              <span className="text-black/30 dark:text-white/30 font-normal text-[13px]">
                ({filteredCategories.length}{searchQuery ? ` of ${categories.length}` : ''})
              </span>
            </p>

            {/* Search bar */}
            <div className="relative w-full sm:w-[240px]">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories…"
                className="w-full h-[38px] rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 pl-9 pr-8 text-[13px] text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none focus:border-[#fc8a06] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30 hover:text-black/60 dark:hover:text-white/60"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {loading && (
            <p className="px-5 py-6 text-[13px] text-black/40 dark:text-white/40">Loading categories…</p>
          )}

          {listError && (
            <p className="px-5 py-6 text-[13px] text-red-500">Couldn't load categories. ({listError})</p>
          )}

          {!loading && !listError && filteredCategories.length === 0 && (
            <p className="px-5 py-6 text-[13px] text-black/40 dark:text-white/40">
              {searchQuery ? `No categories match "${searchQuery}".` : 'No categories yet.'}
            </p>
          )}

          {!loading && !listError && filteredCategories.length > 0 && (
            <div className="divide-y divide-black/5 dark:divide-white/5">
              {filteredCategories.map((cat) => (
                <div key={cat.id} className="flex items-center gap-4 px-5 py-4 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                  <div className="w-9 h-9 bg-[#fc8a06]/10 rounded-xl flex items-center justify-center shrink-0">
                    <Tag size={16} className="text-[#fc8a06]" />
                  </div>

                  {editId === cat.id ? (
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          autoFocus
                          className="flex-1 h-[36px] rounded-xl border border-[#fc8a06] bg-white dark:bg-white/5 px-3 text-[13px] text-black dark:text-white outline-none"
                        />
                        <button
                          onClick={() => handleEdit(cat.id)}
                          disabled={savingEditId === cat.id}
                          className="w-8 h-8 rounded-lg bg-[#028643] flex items-center justify-center hover:bg-[#026635] transition-colors cursor-pointer disabled:opacity-60"
                        >
                          <Check size={14} className="text-white" />
                        </button>
                        <button
                          onClick={() => { setEditId(null); setEditError(null); }}
                          className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/20 transition-colors cursor-pointer"
                        >
                          <X size={14} className="text-[#03081F] dark:text-white" />
                        </button>
                      </div>
                      {editError && (
                        <p className="text-[11px] text-red-500 font-medium">{editError}</p>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[14px] text-[#03081F] dark:text-white">{cat.name}</p>
                        {/* slug intentionally not shown — the real API response never includes it */}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => { setEditId(cat.id); setEditName(cat.name); setEditError(null); }}
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
          )}
        </div>
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title={`Delete "${deleteTarget?.name}"?`}
        message="Deleting this category will unlink it from all associated menu items."
        confirmLabel={deleting ? 'Deleting…' : 'Delete Category'}
      />
    </div>
  );
}