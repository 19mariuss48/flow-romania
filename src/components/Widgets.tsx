import { useQuery } from "@tanstack/react-query";
import { getTopDonators } from "../lib/api/tebex.server";
import { getServerStatus } from "../lib/api/status.server";
import { useState, useEffect } from "react";

function getCountdown(targetDate: string) {
  const target = new Date(targetDate).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (diff <= 0) return { d: "00", h: "00", m: "00", s: "00" };

  const d = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, "0");
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, "0");
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");
  const s = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, "0");

  return { d, h, m, s };
}

function Widget({ title, children, live }: { title: string; children: React.ReactNode; live?: boolean }) {
  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h4 className="text-xs tracking-[0.35em] text-silver">{title}</h4>
        {live ? (
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[9px] tracking-[0.2em] font-bold text-emerald-400 uppercase">Live</span>
          </div>
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        )}
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
  { t: "Eveniment Cursă Ilegală: Premiu 100k", a: "razvan.t", c: "Evenimente", time: "5h" },
];

const members = [
  { n: "alexandru.r", rank: "VIP DIAMOND", amount: "50", currency: "EUR" },
  { n: "mirela.s", rank: "VIP GOLD", amount: "25", currency: "EUR" },
  { n: "cristian.b", rank: "Pachet Arme", amount: "15", currency: "EUR" },
  { n: "andreea.v", rank: "Mașină Custom", amount: "30", currency: "EUR" },
  { n: "vlad.n", rank: "VIP SILVER", amount: "10", currency: "EUR" },
  { n: "george.m", rank: "Bani In-Game", amount: "5", currency: "EUR" },
];

export function Widgets() {
  const { data: topDonators = [], isLoading } = useQuery({
    queryKey: ["topDonators"],
    queryFn: () => getTopDonators(),
  });

  const { data: serverStatus } = useQuery({
    queryKey: ["serverStatus"],
    queryFn: () => getServerStatus(),
    refetchInterval: 60000, // refresh every minute
  });

  const [timeLeft, setTimeLeft] = useState({ d: "00", h: "00", m: "00", s: "00" });

  // Test states for restart simulation
  const [restartPhase, setRestartPhase] = useState<'countdown' | 'restarting' | 'online' | 'offline'>('countdown');
  const [restartTime, setRestartTime] = useState(120); // 2 minutes in seconds

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (restartPhase === 'countdown') {
      timer = setInterval(() => {
        setRestartTime((prev) => {
          if (prev <= 1) {
            setRestartPhase('restarting');
            setRestartTime(60); // 1 minute for restarting phase
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (restartPhase === 'restarting') {
      timer = setInterval(() => {
        setRestartTime((prev) => {
          if (prev <= 1) {
            setRestartPhase('online');
            setRestartTime(60); // 1 minute for online phase
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (restartPhase === 'online') {
      timer = setInterval(() => {
        setRestartTime((prev) => {
          if (prev <= 1) {
            setRestartPhase('offline');
            setRestartTime(60); // 1 minute for offline phase
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (restartPhase === 'offline') {
      timer = setInterval(() => {
        setRestartTime((prev) => {
          if (prev <= 1) {
            setRestartPhase('countdown');
            setRestartTime(120); // 2 minutes for countdown phase
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [restartPhase]);

  useEffect(() => {
    if (!serverStatus?.launchDate) return;
    
    setTimeLeft(getCountdown(serverStatus.launchDate));
    const interval = setInterval(() => {
      setTimeLeft(getCountdown(serverStatus.launchDate));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [serverStatus?.launchDate]);

  const displayMembers = topDonators.length > 0 ? topDonators : members;

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

        <Widget title="ULTIMELE DONAȚII">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <span className="text-xs text-muted-foreground">Se încarcă...</span>
            </div>
          ) : (
            <ul className="space-y-3">
              {displayMembers.map((m, i) => (
                <li key={m.n} className="flex items-center gap-3">
                  <span className="text-xs tracking-widest text-muted-foreground w-6">0{i + 1}</span>
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-white/30 to-white/5 border border-white/10 flex items-center justify-center text-xs text-silver">
                    {m.n[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0 flex items-center justify-between">
                    <div className="min-w-0 pr-4">
                      <div className="text-sm text-foreground truncate">{m.n}</div>
                      <div className="text-[10px] tracking-widest text-muted-foreground flex items-center gap-2 mt-0.5 truncate">
                        <span>{m.rank}</span>
                        {m.purchased && (
                          <>
                            <span className="h-1 w-1 rounded-full bg-white/20 shrink-0" />
                            <span className="text-silver truncate">{m.purchased}</span>
                          </>
                        )}
                      </div>
                    </div>
                    {m.amount ? (
                      <div className="text-xs font-mono text-emerald-400/90 shrink-0 bg-emerald-400/10 px-2 py-0.5 rounded-md">
                        {m.amount} {m.currency}
                      </div>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Widget>

        <Widget title="STATUS SERVER" live={restartPhase !== 'offline'}>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Locuri Jucători</span>
              <span className="text-sm text-foreground">
                {serverStatus?.players || 0}
                <span className="text-muted-foreground">/{serverStatus?.maxPlayers || 300}</span>
              </span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-white/80 to-white/40 shine transition-all duration-1000" 
                style={{ width: `${Math.min(100, ((serverStatus?.players || 0) / (serverStatus?.maxPlayers || 300)) * 100)}%` }} 
              />
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
                  <div className="text-2xl font-light text-silver-gradient">{serverStatus?.discord || "0"}</div>
                  <div className="text-[10px] tracking-widest text-muted-foreground mt-1">DISCORD</div>
                </div>
                <div>
                  <div className="text-2xl font-light text-silver-gradient">v2.00</div>
                  <div className="text-[10px] tracking-widest text-muted-foreground mt-1">VERSIUNE</div>
                </div>
                <div>
                  {restartPhase === 'countdown' ? (
                    <>
                      <div className="text-2xl font-light text-rose-400">
                        {Math.floor(restartTime / 60).toString().padStart(2, '0')}:{(restartTime % 60).toString().padStart(2, '0')}
                      </div>
                      <div className="text-[10px] tracking-widest text-rose-400/80 mt-1 animate-pulse">RESTART ÎN</div>
                    </>
                  ) : restartPhase === 'restarting' ? (
                    <>
                      <div className="text-xl font-light text-amber-400 mt-1 animate-pulse">RESTARTING</div>
                      <div className="text-[10px] tracking-widest text-muted-foreground mt-1">STARE</div>
                    </>
                  ) : restartPhase === 'offline' ? (
                    <>
                      <div className="text-2xl font-light text-red-500">OFFLINE</div>
                      <div className="text-[10px] tracking-widest text-muted-foreground mt-1">STARE</div>
                    </>
                  ) : (
                    <>
                      <div className="text-2xl font-light text-emerald-400">ONLINE</div>
                      <div className="text-[10px] tracking-widest text-muted-foreground mt-1">STARE</div>
                    </>
                  )}
                </div>
                <div>
                  <div className="text-2xl font-light text-silver-gradient">60Hz</div>
                  <div className="text-[10px] tracking-widest text-muted-foreground mt-1">TICKRATE</div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="text-[10px] tracking-[0.4em] text-muted-foreground mb-2">LANSARE</div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { v: timeLeft.d, l: "ZILE" },
                    { v: timeLeft.h, l: "ORE" },
                    { v: timeLeft.m, l: "MIN" },
                    { v: timeLeft.s, l: "SEC" },
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
