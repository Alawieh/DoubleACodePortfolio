import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/Contact";
import { CustomCursor } from "@/components/CustomCursor";
import { Nav } from "@/components/Nav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { TijaratiCaseStudy } from "@/components/TijaratiCaseStudy";

export const Route = createFileRoute("/work/tijarati-pro")({
  head: () => ({
    meta: [
      { title: "Tijarati Pro Case Study | Double A" },
      {
        name: "description",
        content:
          "Mobile business platform case study covering Flutter development, Firebase backend, subscriptions, reporting, and iOS/Android publishing.",
      },
      { property: "og:title", content: "Tijarati Pro Case Study | Double A" },
      {
        property: "og:description",
        content:
          "Production Flutter app for inventory, invoices, payments, reports, Firebase backend, and store publishing.",
      },
    ],
  }),
  component: TijaratiPage,
});

function TijaratiPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <TijaratiCaseStudy />
      <Contact />
    </main>
  );
}
