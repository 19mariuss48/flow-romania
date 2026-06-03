const tiers = [
  {
    name: "BRONZ",
    price: "9€",
    period: "/ lună",
    perks: ["1.000 monede Flow", "Titlu personalizat pe forum", "Prioritate la coadă", "Rol exclusiv pe Discord"],
  },
  {
    name: "ARGINT",
    price: "19€",
    period: "/ lună",
    featured: true,
    perks: ["3.000 monede Flow", "Toate beneficiile Bronz", "Număr de înmatriculare și skin vehicul personalizate", "Banner de profil + avatar animat", "Acces anticipat la evenimente"],
  },
  {
    name: "AUR",
    price: "39€",
    period: "/ lună",
    perks: ["7.500 monede Flow", "Toate beneficiile Argint", "Nume de personaje rezervate", "Acces la proprietăți premium", "Canal de suport 1-la-1"],
  },
];

export function Store() {
  return (
    <section id="store" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.5em] text-silver mb-4">PACHETE VIP</p>
          <h2 className="text-4xl md:text-6xl font-light tracking-[0.1em] text-silver-gradient">SUSȚINE FLOW</h2>
          <div className="mx-auto mt-6 hairline w-32" />
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto font-light">
            Ajută-ne să construim ceva extraordinar. Deblochează beneficii premium în timp ce susții cea mai ambițioasă comunitate de roleplay din România.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative glass rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 ${
                t.featured ? "ring-1 ring-white/30 shadow-[0_40px_100px_-30px_rgba(255,255,255,0.25)]" : ""
              }`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white text-black text-[10px] tracking-[0.3em] font-medium">
                  CEL MAI POPULAR
                </div>
              )}
              <div className="text-[10px] tracking-[0.5em] text-silver mb-4">{t.name}</div>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-light text-foreground">{t.price}</span>
                <span className="text-sm text-muted-foreground">{t.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="text-silver mt-0.5">—</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`block text-center rounded-full py-3 text-xs tracking-[0.3em] transition ${
                  t.featured
                    ? "bg-white text-black hover:bg-white/90 shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]"
                    : "border border-white/20 text-foreground hover:bg-white/5"
                }`}
              >
                ALEGE PLANUL
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
