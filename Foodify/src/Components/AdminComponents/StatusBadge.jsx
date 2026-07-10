const STATUS_CONFIG = {
  pending:          { label: 'Pending',          bg: 'bg-yellow-50  dark:bg-yellow-400/10', text: 'text-yellow-600  dark:text-yellow-400', dot: 'bg-yellow-500'  },
  accepted:         { label: 'Accepted',         bg: 'bg-blue-50    dark:bg-blue-400/10',   text: 'text-blue-600    dark:text-blue-400',   dot: 'bg-blue-500'    },
  preparing:        { label: 'Preparing',        bg: 'bg-purple-50  dark:bg-purple-400/10', text: 'text-purple-600  dark:text-purple-400', dot: 'bg-purple-500'  },
  out_for_delivery: { label: 'Out for Delivery', bg: 'bg-orange-50  dark:bg-orange-400/10', text: 'text-orange-600  dark:text-orange-400', dot: 'bg-orange-500'  },
  delivered:        { label: 'Delivered',        bg: 'bg-green-50   dark:bg-green-400/10',  text: 'text-green-600   dark:text-green-400',  dot: 'bg-green-500'   },
  cancelled:        { label: 'Cancelled',        bg: 'bg-red-50     dark:bg-red-400/10',    text: 'text-red-600     dark:text-red-400',    dot: 'bg-red-500'     },
};

export default function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || { label: status, bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}
