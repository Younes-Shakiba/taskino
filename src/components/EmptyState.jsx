import { Inbox, PartyPopper, Rocket } from "lucide-react";

const STATES = {
  all: {
    icon: Inbox,
    title: "هنوز کاری اضافه نکردی",
    description: "اولین تسکت رو بنویس و برنامه‌ی امروزت رو شروع کن.",
  },
  active: {
    icon: PartyPopper,
    title: "آفرین! همه‌ی تسک‌ها انجام شدن",
    description: "کارهای امروزت تمومه، حالا یه تسک تازه اضافه کن.",
  },
  completed: {
    icon: Rocket,
    title: "هنوز هیچ تسکی رو انجام ندادی",
    description: "با تیک زدن روی هر تسک، اینجا نمایش داده می‌شه.",
  },
};

function EmptyState({ filter }) {
  const { icon: Icon, title, description } = STATES[filter] ?? STATES.all;

  return (
    <div className="animate-fade-in rounded-3xl border border-dashed border-line-strong bg-surface-2/60 px-6 py-14 text-center">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-primary-soft text-primary shadow-soft">
        <Icon className="h-7 w-7" strokeWidth={1.9} />
      </span>

      <h3 className="mt-5 text-base font-bold text-fg">{title}</h3>
      <p className="mx-auto mt-1.5 max-w-xs text-sm text-muted">{description}</p>
    </div>
  );
}

export default EmptyState;
