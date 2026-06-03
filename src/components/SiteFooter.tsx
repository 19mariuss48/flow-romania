import { Link } from "@tanstack/react-router";
import logo from "@/assets/flow-logo.png";

const cols = [
  { title: "COMUNITATE", links: ["Forum", "Discord", "Regulament", "Evenimente"] },
  { title: "SUPORT", links: ["Centru de Ajutor", "Reclamații", "Cereri Unban", "Bug Tracker"] },
  { title: "LEGAL", links: ["Termeni și Condiții", "Politică de Confidențialitate", "Politică de Cookie-uri", "Politică de Rambursare"] },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/5 mt-20">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="FLOW" className="h-10 w-10 object-contain" />
              <div>
                <div className="text-sm tracking-[0.3em] text-silver">FLOW</div>
                <div className="text-[10px] tracking-[0.4em] text-muted-foreground">ROMANIA</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed font-light">
              O experiență premium de roleplay în FiveM. Creată în România, concepută pentru întreaga lume. Se lansează în iunie 2026.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-[10px] tracking-[0.4em] text-silver mb-5">{c.title}</div>
              <ul className="space-y-3">
                {c.links.map((l) => {
                  if (l === "Forum") {
                    return (
                      <li key={l}>
                        <Link 
                          to="/forum" 
                          className="text-sm text-muted-foreground hover:text-foreground transition cursor-pointer"
                        >
                          {l}
                        </Link>
                      </li>
                    );
                  }

                  if (l === "Regulament") {
                    return (
                      <li key={l}>
                        <Link 
                          to="/regulament" 
                          className="text-sm text-muted-foreground hover:text-foreground transition cursor-pointer"
                        >
                          {l}
                        </Link>
                      </li>
                    );
                  }

                  let href = "#";
                  let target = undefined;
                  let rel = undefined;
                  
                  if (l === "Discord") {
                    href = "https://discord.gg/flowro";
                    target = "_blank";
                    rel = "noopener noreferrer";
                  }
                  
                  return (
                    <li key={l}>
                      <a 
                        href={href} 
                        target={target}
                        rel={rel}
                        className="text-sm text-muted-foreground hover:text-foreground transition"
                      >
                        {l}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.3em] text-muted-foreground">
          <div>© 2026 FLOW ROMANIA · TOATE DREPTURILE REZERVATE</div>
          <div>FĂRĂ AFILIERE CU ROCKSTAR GAMES SAU TAKE-TWO INTERACTIVE</div>
        </div>
      </div>
    </footer>
  );
}
