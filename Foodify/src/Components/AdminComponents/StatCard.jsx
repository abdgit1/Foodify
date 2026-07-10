// Reusable stat card with gradient accent bar
export default function StatCard({ title, value, sub, icon: Icon, accent = '#fc8a06', trend }) {
  return (
    <div className="relative bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl p-5 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      {/* Accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: accent }} />

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-semibold text-black/40 dark:text-white/40 uppercase tracking-wider mb-2">{title}</p>
          <p className="text-[28px] font-bold text-[#03081F] dark:text-white leading-none">{value}</p>
          {sub && <p className="text-[12px] text-black/40 dark:text-white/40 mt-1.5">{sub}</p>}
          {trend !== undefined && (
            <p className={`text-[12px] font-semibold mt-1.5 ${trend >= 0 ? 'text-[#028643]' : 'text-red-500'}`}>
              {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}% vs last week
            </p>
          )}
        </div>
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: `${accent}15` }}
        >
          <Icon size={22} style={{ color: accent }} />
        </div>
      </div>
    </div>
  );
}
