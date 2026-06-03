import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { ForumIndex } from "@/components/ForumIndex";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/forum")({
  head: () => ({
    meta: [
      { title: "FORUM — FLOW ROMANIA" },
      { name: "description", content: "Forumul oficial al comunității FLOW ROMÂNIA. Discuții, anunțuri, regulamente și asistență." },
      { property: "og:title", content: "FORUM — FLOW ROMANIA" },
      { property: "og:description", content: "Forumul oficial al comunității FLOW ROMÂNIA." },
    ],
  }),
  component: ForumPage,
});

function ForumPage() {
  const location = useLocation();
  const isExactForum = location.pathname === "/forum" || location.pathname === "/forum/";

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-foreground flex flex-col justify-between relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,255,255,0.02),transparent_70%)] pointer-events-none" />
      
      <SiteHeader />
      
      <main className="flex-1 relative z-10">
        {isExactForum ? <ForumIndex /> : <Outlet />}
      </main>

      <SiteFooter />
    </div>
  );
}
