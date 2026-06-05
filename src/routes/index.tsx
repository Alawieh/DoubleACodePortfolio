import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader } from "@/components/Loader";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { Capabilities } from "@/components/Capabilities";
import { Projects } from "@/components/Projects";
import { Metrics } from "@/components/Metrics";
import { Founders } from "@/components/Founders";
import { Process } from "@/components/Process";
import { Contact } from "@/components/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Double A — Digital Engineering Studio" },
      {
        name: "description",
        content:
          "Double A is a software engineering studio building scalable web, mobile, and enterprise products. React, Angular, Node.js, Flutter.",
      },
      { property: "og:title", content: "Double A — Digital Engineering Studio" },
      {
        property: "og:description",
        content:
          "We build software that builds businesses. From modern websites to enterprise systems, engineered with precision.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [loaded, setLoaded] = useState(false);

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Loader onDone={() => setLoaded(true)} />
      {loaded && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <Nav />
          <Hero />
          <Journey />
          <Capabilities />
          <Projects />
          <Metrics />
          <Founders />
          <Process />
          <Contact />
        </>
      )}
    </main>
  );
}
