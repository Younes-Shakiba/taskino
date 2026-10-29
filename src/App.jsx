import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CircleCheck,
  Clock3,
  Layers,
  ListTodo,
  Moon,
  Sparkles,
  Sun,
  Trash,
} from "lucide-react";

import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import FilterTabs from "./components/FilterTabs";
import EmptyState from "./components/EmptyState";
import ProgressRing from "./components/ProgressRing";
import StatCard from "./components/StatCard";
import Logo from "./components/Logo";
import { useTheme } from "./hooks/useTheme";
import { useToday } from "./hooks/useToday";
import { getProgress, toPersianDigits } from "./lib/format";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState("all");
  const { theme, toggleTheme } = useTheme();
  const today = useToday();

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.length - completedCount;
  const progress = getProgress(tasks);

  const filteredTasks = useMemo(() => {
    if (filter === "active") {
      return tasks.filter((task) => !task.completed);
    }

    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    }

    return tasks;
  }, [tasks, filter]);

  function handleAddTask(title) {
    const newTask = {
      id: crypto.randomUUID(),
      title: title,
      completed: false,
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
  }

  function handleToggleTask(taskId) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function handleDeleteTask(taskId) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId),
    );
  }

  function handleClearCompleted() {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => !task.completed),
    );
  }

  return (
    <div className="relative min-h-screen bg-app text-fg">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="animate-drift absolute -top-32 start-[-12%] h-96 w-96 rounded-full bg-primary/20 blur-[130px]" />
        <div className="animate-drift absolute -bottom-40 end-[-12%] h-96 w-96 rounded-full bg-fuchsia-500/16 blur-[130px] [animation-delay:-8s]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-line/70 bg-app/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-3 px-4 py-3 sm:px-6">
          <Logo height={32} className="sm:hidden" />
          <Logo height={40} className="hidden sm:block" />

          <span className="hidden items-center gap-1.5 rounded-xl border border-line bg-surface px-3 py-2 text-xs font-semibold text-muted shadow-soft min-[380px]:inline-flex">
            <CalendarDays
              className="h-3.5 w-3.5 text-primary"
              strokeWidth={2.3}
            />
            {today}
          </span>

          <div className="flex-1" />

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="تغییر حالت روشن و تاریک"
            title="تغییر حالت روشن و تاریک"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-surface text-muted shadow-soft transition duration-200 hover:border-primary/50 hover:text-primary"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" strokeWidth={2.2} />
            ) : (
              <Moon className="h-5 w-5" strokeWidth={2.2} />
            )}
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 pb-14 pt-6 sm:px-6 sm:pt-8">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-line bg-surface p-5 shadow-soft sm:p-7">
          <div className="pointer-events-none absolute -end-16 -top-20 h-56 w-56 rounded-full bg-primary/12 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -start-16 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />

          <div className="relative flex flex-col items-center gap-5 text-center sm:flex-row sm:text-start">
            <ProgressRing value={progress} />

            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-9 text-fg">
                برنامه‌ریزی روزانه
              </h2>
              <p className="mt-1 text-sm leading-6 text-muted">
                کارهات رو بنویس و قدم‌به‌قدم انجامشون بده.
              </p>
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-bold text-primary">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />
                {tasks.length === 0
                  ? "برنامه‌ی امروزت خالیه"
                  : `${toPersianDigits(completedCount)} از ${toPersianDigits(tasks.length)} کار انجام شده`}
              </p>
            </div>
          </div>
        </section>

        {/* Add task */}
        <section className="mt-5 rounded-3xl border border-line bg-surface p-5 shadow-soft sm:p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
              <Sparkles className="h-5 w-5" strokeWidth={2.1} />
            </span>

            <div className="min-w-0">
              <h2 className="text-base font-bold text-fg">افزودن کار جدید</h2>
              <p className="mt-0.5 text-xs text-muted">
                کلید{" "}
                <kbd className="rounded-md border border-line bg-surface-2 px-1.5 py-0.5 text-[10px] font-bold text-muted">
                  /
                </kbd>{" "}
                برای فوکوس سریع
              </p>
            </div>
          </div>

          <TaskForm onAddTask={handleAddTask} />
        </section>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard
            icon={Layers}
            label="کل تسک‌ها"
            value={toPersianDigits(tasks.length)}
            tone="primary"
          />
          <StatCard
            icon={Clock3}
            label="انجام‌نشده"
            value={toPersianDigits(activeCount)}
            tone="amber"
          />
          <StatCard
            icon={CircleCheck}
            label="انجام‌شده"
            value={toPersianDigits(completedCount)}
            tone="emerald"
          />
        </div>

        {/* Task list */}
        <section className="mt-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-bold text-fg">
                <ListTodo className="h-5 w-5 text-primary" strokeWidth={2.3} />
                فهرست کارها
              </h2>
              <p className="mt-1 text-xs text-muted">
                {activeCount === 0
                  ? "همه‌ی کارها انجام شدن!"
                  : `${toPersianDigits(activeCount)} کار باقی مونده`}
              </p>
            </div>

            {completedCount > 0 && (
              <button
                type="button"
                onClick={handleClearCompleted}
                className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface px-3 py-2 text-xs font-semibold text-muted shadow-soft transition duration-200 hover:border-rose-400/60 hover:text-rose-500"
              >
                <Trash className="h-3.5 w-3.5" strokeWidth={2.2} />
                پاک کردن انجام‌شده‌ها
              </button>
            )}
          </div>

          <FilterTabs
            filter={filter}
            onChange={setFilter}
            counts={{
              all: tasks.length,
              active: activeCount,
              completed: completedCount,
            }}
          />

          <div className="mt-4">
            {filteredTasks.length === 0 ? (
              <EmptyState filter={filter} />
            ) : (
              <ul className="space-y-2.5">
                {filteredTasks.map((task, index) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={handleToggleTask}
                    onDelete={handleDeleteTask}
                    index={index}
                  />
                ))}
              </ul>
            )}
          </div>
        </section>

        <footer className="mt-10 flex flex-col items-center gap-1.5 text-center text-xs text-muted">
          <p>
            ساخته‌شده برای اینکه کارهات رو{" "}
            <span className="font-bold text-primary">قدم‌به‌قدم</span> انجام بدی
          </p>
          <p className="text-[11px] text-muted/70">
            <span className="text-gradient font-bold">تسکینو</span> — نسخه‌ی ۱.۰
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
