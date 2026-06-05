import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/Contact";
import { CustomCursor } from "@/components/CustomCursor";
import { DataInsightsCaseStudy } from "@/components/DataInsightsCaseStudy";
import { Nav } from "@/components/Nav";
import { ScrollProgress } from "@/components/ScrollProgress";

export const Route = createFileRoute("/work/data-insights")({
  head: () => ({
    meta: [
      { title: "Data Insights Workspace Case Study | Double A" },
      {
        name: "description",
        content:
          "AI analytics interface case study covering dataset onboarding, guided analysis workspaces, API integration, and result presentation.",
      },
      { property: "og:title", content: "Data Insights Workspace Case Study | Double A" },
      {
        property: "og:description",
        content:
          "A user-friendly web and desktop interface for a client-provided AI analytics backend.",
      },
    ],
  }),
  component: DataInsightsPage,
});

function DataInsightsPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <DataInsightsCaseStudy />
      <Contact />
    </main>
  );
}
