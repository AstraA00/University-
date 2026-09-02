export type WeekKind = "odd" | "even" | "always";
export type DayId =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export type LessonType = "лек" | "прак" | "лаб" | "лек/прак";

export interface Lesson {
  id: string;
  day: DayId;
  start: string;
  end: string;
  title: string;
  type: LessonType;
  teacher: string;
  room: string;
  /** Which week this lesson appears on */
  week: WeekKind;
  /** True if the pair differs between odd and even weeks (or room changes) */
  differsByWeek: boolean;
  note?: string;
  /** Date-specific sessions (dd.mm) for Saturday FOIT labs */
  dates?: string[];
  shared?: boolean;
}

export const GROUP = "26ИСТ2";
export const SEMESTER = "Осенний семестр 2026–2027";
export const UNIVERSITY =
  "ПГУАС · Институт цифрового управления · 09.03.02";
export const SEMESTER_START = "2026-09-01"; // нечётная неделя (числитель)

export const DAY_LABELS: Record<DayId, string> = {
  monday: "Понедельник",
  tuesday: "Вторник",
  wednesday: "Среда",
  thursday: "Четверг",
  friday: "Пятница",
  saturday: "Суббота",
};

export const DAY_ORDER: DayId[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

/**
 * Расписание 26ИСТ2 по PDF ПГУАС.
 * Числитель = нечётная неделя (верхняя строка пары),
 * знаменатель = чётная (нижняя строка).
 */
export const LESSONS: Lesson[] = [
  // ——— Понедельник ———
  {
    id: "mon-1015-history-prak",
    day: "monday",
    start: "10:15",
    end: "11:50",
    title: "История России",
    type: "прак",
    teacher: "д.и.н., проф. Королева Л.А.",
    room: "3406",
    week: "odd",
    differsByWeek: true,
    note: "Только на нечётной неделе (числитель)",
  },
  {
    id: "mon-1200-history-prak",
    day: "monday",
    start: "12:00",
    end: "13:35",
    title: "История России",
    type: "прак",
    teacher: "д.и.н., проф. Королева Л.А.",
    room: "3406",
    week: "always",
    differsByWeek: false,
  },
  {
    id: "mon-1400-history-lec-odd",
    day: "monday",
    start: "14:00",
    end: "15:35",
    title: "История России",
    type: "лек",
    teacher: "д.и.н., проф. Королева Л.А.",
    room: "4202",
    week: "odd",
    differsByWeek: true,
    note: "На чётной неделе — ауд. 2326",
    shared: true,
  },
  {
    id: "mon-1400-history-lec-even",
    day: "monday",
    start: "14:00",
    end: "15:35",
    title: "История России",
    type: "лек",
    teacher: "д.и.н., проф. Королева Л.А.",
    room: "2326",
    week: "even",
    differsByWeek: true,
    note: "На нечётной неделе — ауд. 4202",
    shared: true,
  },
  {
    id: "mon-1545-german",
    day: "monday",
    start: "15:45",
    end: "17:20",
    title: "Иностранный язык (нем.)",
    type: "прак",
    teacher: "к.п.н., доц. Каргина Е.М.",
    room: "3313",
    week: "always",
    differsByWeek: false,
    note: "Языковая подгруппа (не числитель/знаменатель)",
  },
  {
    id: "mon-1545-french",
    day: "monday",
    start: "15:45",
    end: "17:20",
    title: "Иностранный язык (франц.)",
    type: "прак",
    teacher: "к.ф.н., доц. Стешина Е.Г.",
    room: "3312",
    week: "always",
    differsByWeek: false,
    note: "Языковая подгруппа (не числитель/знаменатель)",
  },

  // ——— Вторник ———
  {
    id: "tue-1015-foit-1",
    day: "tuesday",
    start: "10:15",
    end: "11:50",
    title: "Физические основы информационных технологий",
    type: "лек",
    teacher: "д.т.н., проф. Грейсух Г.И.",
    room: "2209",
    week: "odd",
    differsByWeek: true,
    note: "1 п/гр · на нечётной неделе",
    shared: true,
  },
  {
    id: "tue-1015-foit-2",
    day: "tuesday",
    start: "10:15",
    end: "11:50",
    title: "Физические основы информационных технологий",
    type: "лек",
    teacher: "д.т.н., проф. Грейсух Г.И.",
    room: "2209",
    week: "even",
    differsByWeek: true,
    note: "2 п/гр · на чётной неделе",
    shared: true,
  },
  {
    id: "tue-1200-algo-lec",
    day: "tuesday",
    start: "12:00",
    end: "13:35",
    title: "Алгоритмы и структуры данных",
    type: "лек",
    teacher: "доц. Глебова Т.А.",
    room: "2326",
    week: "always",
    differsByWeek: false,
    shared: true,
  },
  {
    id: "tue-1400-cross-lec",
    day: "tuesday",
    start: "14:00",
    end: "15:35",
    title: "Кросс-культурные коммуникации",
    type: "лек",
    teacher: "к.э.н., доц. Черниковская М.В.",
    room: "3308",
    week: "odd",
    differsByWeek: true,
    shared: true,
  },
  {
    id: "tue-1400-data-lec",
    day: "tuesday",
    start: "14:00",
    end: "15:35",
    title: "Анализ данных",
    type: "лек",
    teacher: "к.т.н., доц. Куимова Е.И.",
    room: "1226",
    week: "even",
    differsByWeek: true,
    shared: true,
  },

  // ——— Среда ———
  {
    id: "wed-0830-org-lec",
    day: "wednesday",
    start: "08:30",
    end: "10:05",
    title: "Основы российской государственности",
    type: "лек",
    teacher: "к.и.н., доц. Садырова М.Ю.",
    room: "2403",
    week: "odd",
    differsByWeek: true,
    shared: true,
  },
  {
    id: "wed-0830-math-lec",
    day: "wednesday",
    start: "08:30",
    end: "10:05",
    title: "Математика",
    type: "лек",
    teacher: "к.п.н., доц. Ячинова С.Н.",
    room: "1322",
    week: "even",
    differsByWeek: true,
    shared: true,
  },
  {
    id: "wed-1015-pe",
    day: "wednesday",
    start: "10:15",
    end: "11:50",
    title: "Элективные курсы по физической культуре и спорту",
    type: "прак",
    teacher: "ст. преп. Семенов А.И.",
    room: "Спорткомплекс",
    week: "always",
    differsByWeek: false,
  },
  {
    id: "wed-1200-english",
    day: "wednesday",
    start: "12:00",
    end: "13:35",
    title: "Иностранный язык (англ.)",
    type: "прак",
    teacher: "асс. Копенкина Д.М.",
    room: "3106а",
    week: "odd",
    differsByWeek: true,
  },
  {
    id: "wed-1200-algo-lab",
    day: "wednesday",
    start: "12:00",
    end: "13:35",
    title: "Алгоритмы и структуры данных",
    type: "лаб",
    teacher: "доц. Глебова Т.А., асс. Илюшин А.О.",
    room: "2323, 2324",
    week: "even",
    differsByWeek: true,
  },
  {
    id: "wed-1400-algo-lab",
    day: "wednesday",
    start: "14:00",
    end: "15:35",
    title: "Алгоритмы и структуры данных",
    type: "лаб",
    teacher: "доц. Глебова Т.А., асс. Илюшин А.О.",
    room: "2323, 2324",
    week: "even",
    differsByWeek: true,
    note: "Вторая пара лаборатории на чётной неделе",
  },

  // ——— Четверг ———
  {
    id: "thu-0830-data-lab",
    day: "thursday",
    start: "08:30",
    end: "10:05",
    title: "Анализ данных",
    type: "лаб",
    teacher: "к.т.н., доц. Куимова Е.И.",
    room: "2318",
    week: "always",
    differsByWeek: false,
  },
  {
    id: "thu-1015-cross-prak",
    day: "thursday",
    start: "10:15",
    end: "11:50",
    title: "Кросс-культурные коммуникации",
    type: "прак",
    teacher: "к.э.н., доц. Черниковская М.В.",
    room: "3303",
    week: "odd",
    differsByWeek: true,
  },
  {
    id: "thu-1015-math-prak",
    day: "thursday",
    start: "10:15",
    end: "11:50",
    title: "Математика",
    type: "прак",
    teacher: "к.п.н., доц. Ячинова С.Н.",
    room: "1319",
    week: "even",
    differsByWeek: true,
  },
  {
    id: "thu-1200-russian-lec",
    day: "thursday",
    start: "12:00",
    end: "13:35",
    title: "Русский язык и культура речи",
    type: "лек",
    teacher: "к.ф.н., доц. Стешина Е.Г.",
    room: "4101",
    week: "odd",
    differsByWeek: true,
    shared: true,
  },
  {
    id: "thu-1200-russian-prak",
    day: "thursday",
    start: "12:00",
    end: "13:35",
    title: "Русский язык и культура речи",
    type: "прак",
    teacher: "к.ф.н., доц. Стешина Е.Г.",
    room: "3416",
    week: "even",
    differsByWeek: true,
  },

  // ——— Пятница ———
  {
    id: "fri-0830-pe",
    day: "friday",
    start: "08:30",
    end: "10:05",
    title: "Физическая культура и спорт",
    type: "лек/прак",
    teacher: "ст. преп. Семенов А.И.",
    room: "Спорткомплекс",
    week: "odd",
    differsByWeek: true,
    note: "Только на нечётной неделе (числитель)",
  },
  {
    id: "fri-1015-history-lec",
    day: "friday",
    start: "10:15",
    end: "11:50",
    title: "История России",
    type: "лек",
    teacher: "д.и.н., проф. Королева Л.А.",
    room: "4101",
    week: "always",
    differsByWeek: false,
    shared: true,
  },
  {
    id: "fri-1200-org-prak",
    day: "friday",
    start: "12:00",
    end: "13:35",
    title: "Основы российской государственности",
    type: "прак",
    teacher: "к.и.н., доц. Садырова М.Ю.",
    room: "2010а",
    week: "even",
    differsByWeek: true,
    note: "Только на чётной неделе (сдвоенная практика)",
  },
  {
    id: "fri-1400-org-prak",
    day: "friday",
    start: "14:00",
    end: "15:35",
    title: "Основы российской государственности",
    type: "прак",
    teacher: "к.и.н., доц. Садырова М.Ю.",
    room: "2010а",
    week: "even",
    differsByWeek: true,
    note: "Только на чётной неделе (сдвоенная практика)",
  },

  // ——— Суббота (по датам) ———
  {
    id: "sat-0830-foit-lab",
    day: "saturday",
    start: "08:30",
    end: "10:05",
    title: "Физические основы информационных технологий",
    type: "лаб",
    teacher: "асс. Железняков А.А.",
    room: "2207",
    week: "always",
    differsByWeek: false,
    dates: ["26.09", "24.10", "28.11", "12.12"],
    note: "Не еженедельно — только в указанные даты",
  },
  {
    id: "sat-1015-foit-lab",
    day: "saturday",
    start: "10:15",
    end: "11:50",
    title: "Физические основы информационных технологий",
    type: "лаб",
    teacher: "асс. Железняков А.А.",
    room: "2207",
    week: "always",
    differsByWeek: false,
    dates: ["26.09", "24.10", "28.11", "12.12"],
    note: "Не еженедельно — только в указанные даты",
  },
];

export const CHANGING_SLOTS = [
  {
    when: "Пн 10:15–11:50",
    odd: "История России прак. · ауд. 3406",
    even: "—",
  },
  {
    when: "Пн 14:00–15:35",
    odd: "История России лек. · ауд. 4202",
    even: "История России лек. · ауд. 2326",
  },
  {
    when: "Вт 10:15–11:50",
    odd: "ФОИТ лек. · 1 п/гр",
    even: "ФОИТ лек. · 2 п/гр",
  },
  {
    when: "Вт 14:00–15:35",
    odd: "Кросс-культурные коммуникации лек.",
    even: "Анализ данных лек.",
  },
  {
    when: "Ср 08:30–10:05",
    odd: "ОРГ лек.",
    even: "Математика лек.",
  },
  {
    when: "Ср 12:00–13:35",
    odd: "Английский прак.",
    even: "Алгоритмы и структуры данных лаб.",
  },
  {
    when: "Ср 14:00–15:35",
    odd: "—",
    even: "Алгоритмы и структуры данных лаб.",
  },
  {
    when: "Чт 10:15–11:50",
    odd: "Кросс-культурные коммуникации прак.",
    even: "Математика прак.",
  },
  {
    when: "Чт 12:00–13:35",
    odd: "Русский язык лек.",
    even: "Русский язык прак.",
  },
  {
    when: "Пт 08:30–10:05",
    odd: "Физическая культура и спорт",
    even: "—",
  },
  {
    when: "Пт 12:00–15:35",
    odd: "—",
    even: "ОРГ прак. (сдвоенная, ауд. 2010а)",
  },
] as const;

export const STABLE_SLOTS = [
  "Пн 12:00–13:35 — История России прак. (ауд. 3406)",
  "Пн 15:45–17:20 — Иностранный язык (нем./франц. — по подгруппе)",
  "Вт 12:00–13:35 — Алгоритмы и структуры данных лек.",
  "Ср 10:15–11:50 — Элективная физкультура",
  "Чт 08:30–10:05 — Анализ данных лаб.",
  "Пт 10:15–11:50 — История России лек.",
  "Сб 08:30–11:50 — ФОИТ лаб. по датам: 26.09, 24.10, 28.11, 12.12",
] as const;
