import { ListTodo, Clock3, CircleCheck } from "lucide-react";
import { toPersianDigits } from "../lib/format";

const FILTERS = [
  { id: "all", label: "همه", icon: ListTodo },
  { id: "active", label: "انجام‌نشده", icon: Clock3 },
  { id: "completed", label: "انجام‌شده", icon: CircleCheck },
];

function FilterTabs({ filter, onChange, counts }) {
  return (
    <div className="flex w-full gap-1 overflow-x-auto rounded-2xl border border-line bg-surface-2 p-1 scrollbar-slim sm:w-fit">
      {FILTERS.map(({ id, label, icon: Icon }) => {
        const isActive = filter === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={isActive}
            className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-semibold transition duration-200 sm:flex-none ${
              isActive
                ? "bg-surface text-primary shadow-soft"
                : "text-muted hover:bg-surface/70 hover:text-fg"
            }`}
          >
            <Icon className="h-4 w-4" strokeWidth={2.2} />
            {label}
            <span
              className={`rounded-md px-1.5 py-0.5 text-[11px] font-bold transition ${
                isActive ? "bg-primary-soft text-primary" : "bg-line/60 text-muted"
              }`}
            >
              {toPersianDigits(counts[id])}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default FilterTabs;
