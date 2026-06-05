import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/Contact";
import { CustomCursor } from "@/components/CustomCursor";
import { DetailingLabCaseStudy } from "@/components/DetailingLabCaseStudy";
import { Nav } from "@/components/Nav";
import { ScrollProgress } from "@/components/ScrollProgress";

export const Route = createFileRoute("/work/detailing-lab")({
  head: () => ({
    meta: [
      { title: "The Detailing Lab Case Study | Double A" },
      {
        name: "description",
        content:
          "Automotive services website case study for The Detailing Lab, covering package discovery, inquiry flow, and premium mobile detailing brand presentation.",
      },
      { property: "og:title", content: "The Detailing Lab Case Study | Double A" },
      {
        property: "og:description",
        content:
          "Premium mobile detailing website with service packages, inquiry form, and automotive brand direction.",
      },
    ],
  }),
  component: DetailingLabPage,
});

function DetailingLabPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <DetailingLabCaseStudy />
      <Contact />
    </main>
  );
}
