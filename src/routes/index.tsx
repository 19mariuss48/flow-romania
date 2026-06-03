import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { Widgets } from "@/components/Widgets";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FLOW ROMANIA — The Next Generation Roleplay Experience" },
      { name: "description", content: "Premium Romanian FiveM roleplay community launching June 2026. Join the FLOW." },
      { property: "og:title", content: "FLOW ROMANIA" },
      { property: "og:description", content: "Premium Romanian FiveM roleplay community launching June 2026." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="relative">
      <SiteHeader />
      <main>
        <Hero />
        <Widgets />
      </main>
      <SiteFooter />
    </div>
  );
}
