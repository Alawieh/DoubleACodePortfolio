import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/Contact";
import { CustomCursor } from "@/components/CustomCursor";
import { Nav } from "@/components/Nav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Uno400CaseStudy } from "@/components/Uno400CaseStudy";

export const Route = createFileRoute("/work/uno400")({
  head: () => ({
    meta: [
      { title: "Uno400 Case Study | Double A" },
      {
        name: "description",
        content:
          "SwiftUI multiplayer card game case study covering Firebase Realtime Database, host arbitration, optimistic UI, bot players, and event-sourced recovery.",
      },
      { property: "og:title", content: "Uno400 Case Study | Double A" },
      {
        property: "og:description",
        content:
          "Real-time SwiftUI card game with Firebase synchronization, clean MVVM, idempotent play handling, and self-healing game state.",
      },
    ],
  }),
  component: Uno400Page,
});

function Uno400Page() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <Uno400CaseStudy />
      <Contact />
    </main>
  );
}
