import {
  DAY_ORDER,
  type DayId,
  type Lesson,
  SEMESTER_START,
  type WeekKind,
} from "./schedule-data";

const DAY_TO_INDEX: Record<number, DayId> = {
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
  0: "saturday", // Sunday → show Saturday as last study day reference
};

/** Monday-start academic week index from semester start (0-based). */
export function academicWeekIndex(date: Date): number {
  const start = parseISODate(SEMESTER_START);
  const startMonday = startOfMonday(start);
  const currentMonday = startOfMonday(date);
  const diffMs = currentMonday.getTime() - startMonday.getTime();
  const weeks = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));
  return weeks;
}

/** Sept 1 2026 starts as odd (числитель) → week index 0,2,4… = odd */
export function weekKindForDate(date: Date): "odd" | "even" {
  const idx = academicWeekIndex(date);
  return idx % 2 === 0 ? "odd" : "even";
}

export function dayIdForDate(date: Date): DayId {
  const dow = date.getDay();
  if (dow === 0) return "monday"; // Sunday → preview next Monday
  return DAY_TO_INDEX[dow] ?? "monday";
}

export function isSunday(date: Date): boolean {
  return date.getDay() === 0;
}

export function lessonMatchesWeek(
  lesson: Lesson,
  week: "odd" | "even",
): boolean {
  if (lesson.week === "always") return true;
  return lesson.week === week;
}

export function filterLessons(
  lessons: Lesson[],
  opts: { week: "odd" | "even"; day?: DayId },
): Lesson[] {
  return lessons
    .filter((l) => lessonMatchesWeek(l, opts.week))
    .filter((l) => (opts.day ? l.day === opts.day : true))
    .sort((a, b) => {
      const di = DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day);
      if (di !== 0) return di;
      return a.start.localeCompare(b.start) || a.title.localeCompare(b.title);
    });
}

export function weekLabel(week: "odd" | "even"): string {
  return week === "odd"
    ? "Нечётная неделя (числитель)"
    : "Чётная неделя (знаменатель)";
}

export function weekShort(week: "odd" | "even"): string {
  return week === "odd" ? "Нечётная" : "Чётная";
}

export function formatRuDate(date: Date): string {
  return date.toLocaleDateString("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function badgeForWeek(week: WeekKind): string {
  if (week === "always") return "Каждую неделю";
  if (week === "odd") return "Нечётная · числитель";
  return "Чётная · знаменатель";
}

function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d, 12, 0, 0, 0);
}

function startOfMonday(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d;
}
