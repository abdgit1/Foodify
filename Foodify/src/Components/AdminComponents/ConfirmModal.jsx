import { AlertTriangle } from 'lucide-react';

export default function ConfirmModal({ open, onClose, onConfirm, title = 'Are you sure?', message, confirmLabel = 'Delete', confirmClass = 'bg-red-500 hover:bg-red-600 text-white' }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onMouseDown={onClose} />
      <div className="relative bg-white dark:bg-[#0a0f2e] rounded-2xl shadow-2xl p-6 w-full max-w-[380px] flex flex-col items-center text-center gap-4">
        <div className="w-14 h-14 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center">
          <AlertTriangle size={24} className="text-red-500" />
        </div>
        <div>
          <h3 className="text-[16px] font-bold text-[#03081F] dark:text-white">{title}</h3>
          {message && <p className="text-[13px] text-black/50 dark:text-white/50 mt-1">{message}</p>}
        </div>
        <div className="flex gap-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 h-[42px] rounded-xl bg-black/5 dark:bg-white/10 text-[#03081F] dark:text-white text-[14px] font-semibold hover:bg-black/10 dark:hover:bg-white/20 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className={`flex-1 h-[42px] rounded-xl text-[14px] font-semibold transition-colors cursor-pointer ${confirmClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
