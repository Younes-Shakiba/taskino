import { useEffect, useRef, useState } from "react";
import { Plus, Pencil } from "lucide-react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const inputRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      inputRef.current?.focus();
      return;
    }

    onAddTask(trimmedTitle);
    setTitle("");
    inputRef.current?.focus();
  }

  useEffect(() => {
    function handleKeyDown(event) {
      const target = event.target;
      const isTyping =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <div className="relative min-w-0 flex-1">
        <Pencil
          className="pointer-events-none absolute inset-y-0 start-4 my-auto h-4.5 w-4.5 text-muted"
          strokeWidth={2.1}
          aria-hidden="true"
        />

        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="مثلاً یادگیری React..."
          aria-label="عنوان تسک جدید"
          className="w-full rounded-2xl border border-line bg-surface-2 ps-11 pe-4 py-3.5 text-base text-fg outline-none transition duration-200 placeholder:text-muted/70 hover:border-line-strong focus:border-primary focus:bg-surface focus:ring-4 focus:ring-primary/12"
        />
      </div>

      <button
        type="submit"
        className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-primary to-fuchsia-500 px-5 py-3.5 font-bold text-primary-contrast shadow-glow transition duration-200 hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0 sm:w-auto"
      >
        <Plus
          className="h-5 w-5 transition duration-300 group-hover:rotate-90"
          strokeWidth={2.6}
        />
        افزودن تسک
      </button>
    </form>
  );
}

export default TaskForm;
