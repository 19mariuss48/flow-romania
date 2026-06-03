import { Link } from "@tanstack/react-router";
import logo from "@/assets/flow-logo.png";
import heroBg from "@/assets/hero-bg.jpg";

function Particles() {
  const particles = Array.from({ length: 28 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, i) => {
        const left = (i * 37) % 100;
        const delay = (i * 0.6) % 12;
        const dur = 12 + ((i * 3) % 14);
        const size = 1 + (i % 3);
        return (
          <span
            key={i}
            className="particle"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${dur}s`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: 0.4 + (i % 4) * 0.1,
            }}
          />
        );
      })}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(11,11,11,0.85)_75%)]" />
      </div>

      <Particles />

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-white/10 rounded-full" />
            <img
              src={logo}
              alt="FLOW Romania"
              className="relative h-32 w-32 md:h-44 md:w-44 object-contain drop-shadow-[0_10px_40px_rgba(255,255,255,0.25)]"
            />
          </div>
        </div>

        <p className="text-xs md:text-sm tracking-[0.6em] text-silver mb-6">
          FONDAT · MAI 2025
          
        </p>

        <h1 className="text-5xl md:text-8xl font-light tracking-[0.15em] text-silver-gradient leading-none">
          FLOW ROMANIA
        </h1>

        <div className="mx-auto my-8 hairline w-48" />

        <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto font-light tracking-wide">
          Următoarea generație de roleplay românesc — creată pentru cei care cer mai mult de la FiveM.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://discord.gg/flowro"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center rounded-full bg-white text-black px-8 py-4 text-sm tracking-[0.25em] font-medium hover:bg-white/90 transition-all shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)] hover:shadow-[0_0_80px_-5px_rgba(255,255,255,0.7)]"
          >
            ALĂTURĂ-TE PE DISCORD
            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </a>
          <Link
            to="/forum"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-sm tracking-[0.25em] text-foreground hover:bg-white/5 hover:border-white/40 transition-all backdrop-blur"
          >
            VIZITEAZĂ FORUMUL
          </Link>
        </div>

        {/* Stats bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden glass">
          {[
            { v: "2.847", l: "MEMBRI" },
            { v: "184", l: "CONECTAȚI" },
            { v: "62", l: "STAFF" },
            { v: "T-156z", l: "PÂNĂ LA LANSARE" },
          ].map((s) => (
            <div key={s.l} className="bg-background/40 px-6 py-5">
              <div className="text-2xl md:text-3xl font-light text-silver-gradient">{s.v}</div>
              <div className="text-[10px] tracking-[0.3em] text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] text-muted-foreground">
        DERULEAZĂ ↓
      </div>
    </section>
  );
}
