import { useEffect, useState } from "react";
import { formatToday } from "../lib/format";

function msUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);

  midnight.setHours(24, 0, 0, 500);

  return midnight.getTime() - now.getTime();
}

/**
 * Keeps the formatted date in sync with the calendar day: it rolls over
 * at midnight and refreshes whenever the tab becomes visible again.
 */
export function useToday() {
  const [today, setToday] = useState(() => formatToday());

  useEffect(() => {
    let timeoutId;

    function schedule() {
      timeoutId = setTimeout(() => {
        setToday(formatToday());
        schedule();
      }, msUntilMidnight());
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        setToday(formatToday());
      }
    }

    schedule();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return today;
}
