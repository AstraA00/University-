"use client";

import { useMemo, useState } from "react";
import {
  CHANGING_SLOTS,
  DAY_LABELS,
  DAY_ORDER,
  GROUP,
  LESSONS,
  SEMESTER,
  STABLE_SLOTS,
  UNIVERSITY,
  type DayId,
  type Lesson,
} from "@/lib/schedule-data";
import {
  badgeForWeek,
  dayIdForDate,
  filterLessons,
  formatRuDate,
  isSunday,
  weekKindForDate,
  weekLabel,
  weekShort,
} from "@/lib/week";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Building2,
  CalendarDays,
  Clock3,
  Info,
  MapPin,
  UserRound,
} from "lucide-react";

function typeLabel(type: Lesson["type"]): string {
  const map = {
    лек: "Лекция",
    прак: "Практика",
    лаб: "Лабораторная",
    "лек/прак": "Лекция / практика",
  } as const;
  return map[type];
}

function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <Card
      className={
        lesson.differsByWeek
          ? "border-amber-300/80 bg-amber-50/60 shadow-sm dark:border-amber-700 dark:bg-amber-950/30"
          : "shadow-sm"
      }
    >
      <CardHeader className="gap-2 pb-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base leading-snug sm:text-lg">
              {lesson.title}
            </CardTitle>
            <CardDescription className="mt-1 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1">
                <Clock3 className="size-3.5" />
                {lesson.start}–{lesson.end}
              </span>
              <span>·</span>
              <span>{typeLabel(lesson.type)}</span>
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {lesson.differsByWeek ? (
              <Badge
                variant="outline"
                className="border-amber-400 bg-amber-100 text-amber-950 dark:bg-amber-900/40 dark:text-amber-100"
              >
                Различается по неделям
              </Badge>
            ) : (
              <Badge variant="secondary">Каждую неделю</Badge>
            )}
            {lesson.week !== "always" && (
              <Badge variant="outline">{badgeForWeek(lesson.week)}</Badge>
            )}
            {lesson.shared && <Badge variant="outline">Совместно</Badge>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p className="flex items-start gap-2">
          <UserRound className="mt-0.5 size-4 shrink-0" />
          <span>{lesson.teacher}</span>
        </p>
        <p className="flex items-start gap-2">
          <MapPin className="mt-0.5 size-4 shrink-0" />
          <span>ауд. {lesson.room}</span>
        </p>
        {lesson.dates && (
          <p className="flex items-start gap-2">
            <CalendarDays className="mt-0.5 size-4 shrink-0" />
            <span>Даты: {lesson.dates.join(", ")}</span>
          </p>
        )}
        {lesson.note && (
          <p className="flex items-start gap-2 text-foreground/80">
            <Info className="mt-0.5 size-4 shrink-0" />
            <span>{lesson.note}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
      {text}
    </div>
  );
}

export function ScheduleViewer() {
  const today = useMemo(() => new Date(), []);
  const autoWeek = weekKindForDate(today);
  const todayDay = dayIdForDate(today);
  const sunday = isSunday(today);

  const [week, setWeek] = useState<"odd" | "even">(autoWeek);
  const [selectedDay, setSelectedDay] = useState<DayId>(
    sunday ? "monday" : todayDay,
  );

  const todayLessons = useMemo(() => {
    if (sunday) return [];
    return filterLessons(LESSONS, { week, day: todayDay });
  }, [sunday, week, todayDay]);

  const dayLessons = useMemo(
    () => filterLessons(LESSONS, { week, day: selectedDay }),
    [week, selectedDay],
  );

  const weekLessons = useMemo(
    () => filterLessons(LESSONS, { week }),
    [week],
  );

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground shadow-sm">
          <Building2 className="size-3.5" />
          {UNIVERSITY}
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">
            Расписание {GROUP}
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {SEMESTER}. Занятия с 1 сентября идут по{" "}
            <strong className="text-foreground">нечётной неделе (числитель)</strong>.
            У группы есть пары, которые меняются каждую неделю, и пары, которые
            стоят постоянно.
          </p>
        </div>

        <Card className="border-sky-200 bg-sky-50/70 dark:border-sky-900 dark:bg-sky-950/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="size-5" />
              Да, есть числитель / знаменатель
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed text-foreground/80">
              В PDF у каждой пары две строки времени. Одна дисциплина на обе
              строки — каждая неделя. Две разные дисциплины (или разная аудитория)
              сверху и снизу — нечётная сверху, чётная снизу. Немецкий и
              французский в понедельник вечером — языковые подгруппы, а не тип
              недели. Субботние лаборатории ФОИТ — по конкретным датам.
            </CardDescription>
          </CardHeader>
        </Card>
      </header>

      <section className="sticky top-0 z-20 -mx-4 border-b bg-background/95 px-4 py-3 backdrop-blur supports-backdrop-filter:bg-background/80 sm:-mx-0 sm:rounded-xl sm:border sm:px-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium">Тип недели</p>
            <p className="text-xs text-muted-foreground">
              Сегодня: {formatRuDate(today)} · по календарю это{" "}
              <span className="font-medium text-foreground">
                {weekShort(autoWeek).toLowerCase()}
              </span>
            </p>
          </div>
          <div
            className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto"
            role="group"
            aria-label="Тип недели"
          >
            <Button
              type="button"
              variant={week === "odd" ? "default" : "outline"}
              className="sm:px-4"
              aria-pressed={week === "odd"}
              onClick={() => setWeek("odd")}
            >
              Нечётная · числитель
            </Button>
            <Button
              type="button"
              variant={week === "even" ? "default" : "outline"}
              className="sm:px-4"
              aria-pressed={week === "even"}
              onClick={() => setWeek("even")}
            >
              Чётная · знаменатель
            </Button>
          </div>
        </div>
      </section>

      <Tabs defaultValue="today" className="gap-4">
        <TabsList className="grid h-auto w-full grid-cols-3">
          <TabsTrigger value="today">Сегодня</TabsTrigger>
          <TabsTrigger value="day">По дням</TabsTrigger>
          <TabsTrigger value="week">Неделя</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold">Пары на сегодня</h2>
            <Badge variant="outline">{weekLabel(week)}</Badge>
          </div>
          {sunday ? (
            <EmptyState text="Воскресенье — выходной. Выберите день во вкладке «По дням» или смотрите всю неделю." />
          ) : todayLessons.length === 0 ? (
            <EmptyState text="На сегодня при выбранной неделе пар нет." />
          ) : (
            <div className="grid gap-3">
              {todayLessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="day" className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {DAY_ORDER.map((day) => (
              <Button
                key={day}
                size="sm"
                variant={selectedDay === day ? "default" : "outline"}
                onClick={() => setSelectedDay(day)}
              >
                {DAY_LABELS[day]}
              </Button>
            ))}
          </div>
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold">{DAY_LABELS[selectedDay]}</h2>
            <Badge variant="outline">{weekShort(week)}</Badge>
          </div>
          {dayLessons.length === 0 ? (
            <EmptyState text="В этот день при выбранной неделе пар нет." />
          ) : (
            <div className="grid gap-3">
              {dayLessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="week" className="space-y-6">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold">Неделя целиком</h2>
            <Badge variant="outline">{weekLabel(week)}</Badge>
          </div>
          {DAY_ORDER.map((day) => {
            const lessons = weekLessons.filter((l) => l.day === day);
            if (lessons.length === 0) return null;
            return (
              <div key={day} className="space-y-3">
                <h3 className="text-base font-semibold text-foreground/90">
                  {DAY_LABELS[day]}
                </h3>
                <div className="grid gap-3">
                  {lessons.map((lesson) => (
                    <LessonCard key={lesson.id} lesson={lesson} />
                  ))}
                </div>
              </div>
            );
          })}
        </TabsContent>
      </Tabs>

      <Separator />

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Меняется по неделям</CardTitle>
            <CardDescription>
              Пары, где числитель и знаменатель отличаются
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {CHANGING_SLOTS.map((slot) => (
              <div
                key={slot.when}
                className="rounded-lg border bg-muted/30 p-3"
              >
                <p className="font-medium">{slot.when}</p>
                <p className="mt-1 text-muted-foreground">
                  Нечётная: {slot.odd}
                </p>
                <p className="text-muted-foreground">Чётная: {slot.even}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Одинаково каждую неделю</CardTitle>
            <CardDescription>
              Плюс суббота по датам и языковые подгруппы
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {STABLE_SLOTS.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border bg-muted/30 px-3 py-2 text-foreground/90"
                >
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <footer className="pb-6 text-center text-xs text-muted-foreground">
        Источник: расписание 1 курса ИЦУ ПГУАС, группы 26ИСТ1–3, приказ от
        19.06.2026. Жёлтым отмечены слоты, которые зависят от недели.
      </footer>
    </div>
  );
}
