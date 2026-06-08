function Widget({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h4 className="text-xs tracking-[0.35em] text-silver">{title}</h4>
        <span className="h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
      </div>
      {children}
    </div>
  );
}

const topics = [
  { t: "Aplicație Poliție — Agent Andrei Popescu", a: "andrei.p", c: "Poliție", time: "12m" },
  { t: "Anunț Reorganizare Familie de Mafie", a: "don.vito", c: "Mafia Italiană", time: "47m" },
  { t: "Showroom Auto: Gama GT 2026", a: "garage.flow", c: "Media", time: "1h" },
  { t: "Recrutare S.M.U.R.D. — Sesiunea Q2 Deschisă", a: "dr.ionescu", c: "S.M.U.R.D.", time: "2h" },
  { t: "Actualizare Server v0.9.4 Note Patch", a: "staff.flow", c: "Update-uri", time: "3h" },
];

const members = [
  { n: "alexandru.r", rank: "Fondator" },
  { n: "mirela.s", rank: "Administrator" },
  { n: "cristian.b", rank: "Moderator" },
  { n: "andreea.v", rank: "Veteran" },
  { n: "vlad.n", rank: "Veteran" },
];

export function Widgets() {
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-3 gap-6">
        <Widget title="ULTIMELE SUBIECTE">
          <ul className="space-y-4">
            {topics.map((t) => (
              <li key={t.t} className="group">
                <a href="#" className="block">
                  <div className="text-sm text-foreground/90 group-hover:text-foreground transition leading-snug">{t.t}</div>
                  <div className="mt-1 flex items-center gap-3 text-[10px] tracking-wider text-muted-foreground">
                    <span>@{t.a}</span>
                    <span className="h-px w-3 bg-white/20" />
                    <span className="text-silver">{t.c}</span>
                    <span className="ml-auto">{t.time}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </Widget>

        <Widget title="MEMBRI DE TOP">
          <ul className="space-y-3">
            {members.map((m, i) => (
              <li key={m.n} className="flex items-center gap-3">
                <span className="text-xs tracking-widest text-muted-foreground w-6">0{i + 1}</span>
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-white/30 to-white/5 border border-white/10 flex items-center justify-center text-xs text-silver">
                  {m.n[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-foreground truncate">{m.n}</div>
                  <div className="text-[10px] tracking-widest text-muted-foreground">{m.rank}</div>
                </div>
              </li>
            ))}
          </ul>
        </Widget>

        <Widget title="STATUS SERVER">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Locuri Jucători</span>
              <span className="text-sm text-foreground">184<span className="text-muted-foreground">/300</span></span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-white/80 to-white/40 shine" style={{ width: "61%" }} />
            </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <div className="text-2xl font-light text-silver-gradient">99.8%</div>
                  <div className="text-[10px] tracking-widest text-muted-foreground mt-1">UPTIME</div>
                </div>
                <div>
                  <div className="text-2xl font-light text-silver-gradient">28ms</div>
                  <div className="text-[10px] tracking-widest text-muted-foreground mt-1">LATENȚĂ</div>
                </div>
                <div>
                  <div className="text-2xl font-light text-silver-gradient">14.2k</div>
                  <div className="text-[10px] tracking-widest text-muted-foreground mt-1">DISCORD</div>
                </div>
                <div>
                  <div className="text-2xl font-light text-silver-gradient">v0.9.4</div>
                  <div className="text-[10px] tracking-widest text-muted-foreground mt-1">VERSIUNE</div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="text-[10px] tracking-[0.4em] text-muted-foreground mb-2">LANSARE</div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { v: "156", l: "ZILE" },
                    { v: "08", l: "ORE" },
                    { v: "42", l: "MIN" },
                    { v: "11", l: "SEC" },
                  ].map((c) => (
                  <div key={c.l} className="bg-white/[0.03] rounded-md py-2">
                    <div className="text-lg font-light text-foreground">{c.v}</div>
                    <div className="text-[8px] tracking-widest text-muted-foreground">{c.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Widget>
      </div>
    </section>
  );
}
