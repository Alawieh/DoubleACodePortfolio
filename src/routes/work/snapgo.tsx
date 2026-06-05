import { createFileRoute } from "@tanstack/react-router";
import { CustomCursor } from "@/components/CustomCursor";
import { Nav } from "@/components/Nav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SnapGoCaseStudy } from "@/components/SnapGoCaseStudy";
import { Contact } from "@/components/Contact";

export const Route = createFileRoute("/work/snapgo")({
  head: () => ({
    meta: [
      { title: "snapGo tech Case Study | Double A" },
      {
        name: "description",
        content:
          "snapGo tech ecommerce catalog case study with WhatsApp ordering, Supabase catalog management, and an admin dashboard.",
      },
      { property: "og:title", content: "snapGo tech Case Study | Double A" },
      {
        property: "og:description",
        content:
          "Electronics catalog with WhatsApp ordering, product management, category management, and visual banner editing.",
      },
    ],
  }),
  component: SnapGoPage,
});

function SnapGoPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <SnapGoCaseStudy />
      <Contact />
    </main>
  );
}
