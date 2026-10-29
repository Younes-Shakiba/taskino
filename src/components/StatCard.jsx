const TONES = {
  primary: "bg-primary-soft text-primary",
  amber: "bg-amber-500/15 text-amber-500",
  emerald: "bg-emerald-500/15 text-emerald-500",
};

function StatCard({ icon: Icon, label, value, tone = "primary" }) {
  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift">
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition duration-300 group-hover:scale-105 ${TONES[tone]}`}
      >
        <Icon className="h-5 w-5" strokeWidth={2.2} />
      </span>

      <div className="min-w-0">
        <p className="truncate text-xs font-medium text-muted">{label}</p>
        <p className="mt-0.5 text-xl font-bold text-fg">{value}</p>
      </div>
    </div>
  );
}

export default StatCard;
