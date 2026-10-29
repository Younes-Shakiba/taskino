const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/**
 * Converts western digits inside a string to Persian digits.
 */
export function toPersianDigits(value) {
  return String(value).replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[Number(digit)]);
}

/**
 * Persian (Jalali) formatted date, e.g. "سه‌شنبه ۲۹ مهر".
 */
export function formatToday(date = new Date()) {
  return new Intl.DateTimeFormat("fa-IR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

/**
 * Percentage of completed tasks, rounded to the nearest integer.
 */
export function getProgress(tasks) {
  if (tasks.length === 0) {
    return 0;
  }

  return Math.round((tasks.filter((task) => task.completed).length / tasks.length) * 100);
}
