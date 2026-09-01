import { ScheduleViewer } from "@/components/schedule-viewer";

export default function Home() {
  return (
    <main className="flex-1 bg-[radial-gradient(circle_at_top,_oklch(0.97_0.02_250),_transparent_55%)]">
      <ScheduleViewer />
    </main>
  );
}
