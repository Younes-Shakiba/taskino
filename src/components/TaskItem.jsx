import { Check, Trash } from "lucide-react";

function TaskItem({ task, onToggle, onDelete, index = 0 }) {
  const { completed, title } = task;

  return (
    <li
      className="animate-fade-up"
      style={{ animationDelay: `${Math.min(index, 12) * 45}ms` }}
    >
      <div
        className={`group flex items-center gap-3 rounded-2xl border p-3.5 shadow-soft transition duration-300 hover:-translate-y-0.5 ${
          completed
            ? "border-line bg-surface-2/70 hover:border-primary/30"
            : "border-line bg-surface hover:border-primary/45 hover:shadow-lift"
        }`}
      >
        <button
          type="button"
          role="checkbox"
          aria-checked={completed}
          onClick={() => onToggle(task.id)}
          aria-label={`تغییر وضعیت ${title}`}
          className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg border-2 transition duration-300 ${
            completed
              ? "border-transparent bg-gradient-to-br from-primary to-fuchsia-500 shadow-glow"
              : "border-line-strong bg-surface hover:border-primary"
          }`}
        >
          <Check
            className={`h-4 w-4 text-white transition duration-300 ${
              completed ? "scale-100 opacity-100" : "scale-0 -rotate-12 opacity-0"
            }`}
            strokeWidth={3.4}
          />
        </button>

        <span
          className={`min-w-0 flex-1 break-words text-[15px] leading-7 transition-colors duration-300 ${
            completed ? "text-muted line-through decoration-primary/40" : "text-fg"
          }`}
        >
          {title}
        </span>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          aria-label={`حذف ${title}`}
          title="حذف"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-muted transition duration-200 hover:bg-rose-500/10 hover:text-rose-500 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
        >
          <Trash className="h-4.5 w-4.5" strokeWidth={2.1} />
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
