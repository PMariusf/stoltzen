import type { Metadata } from "next";
import Link from "next/link";
import { event } from "@/data/event";

export const metadata: Metadata = {
  title: "Historie",
  description:
    "Historien til Stoltzekleiven Opp – fra 1979 til dagens løp, med rekorder, løpere og milepæler.",
};

const milestones = [
  {
    year: String(event.stats.since),
    title: "Starten",
    text: "Første kapittel i Stoltzekleiven Opp.",
  },
  {
    year: String(event.records.women.year),
    title: "Kvinnerekord",
    text: `${event.records.women.name} · ${event.records.women.time}`,
  },
  {
    year: String(event.records.men.year),
    title: "Herrerekord",
    text: `${event.records.men.name} · ${event.records.men.time}`,
  },
  {
    year: String(event.year),
    title: "Neste kapittel",
    text: event.dateLabel,
  },
];

export default function HistoryPage() {
  return (
    <main className="bg-[#080808] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(255,255,255,0.08),transparent_24%),linear-gradient(145deg,#161616,#070707_62%)]" />
        <div className="pointer-events-none absolute -right-8 top-20 hidden select-none text-[23vw] font-black leading-none tracking-[-0.09em] text-white/[0.025] lg:block">
          1979
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-36 sm:px-6 md:px-10 md:pb-28 md:pt-44">
          <p className="section-kicker">Historie</p>
          <h1 className="mt-5 max-w-5xl text-[clamp(4rem,10vw,8.5rem)] font-black uppercase leading-[0.8] tracking-[-0.075em]">
            Siden
            <br />
            1979.
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-white/60 md:text-2xl md:leading-9">
            Rekorder, løpere, bilder og historier har bygget Stoltzekleiven Opp
            gjennom flere tiår.
          </p>
        </div>
      </section>

      <section className="bg-[#141414]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 md:py-24 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <p className="section-kicker">Tidslinje</p>
              <h2 className="section-title mt-4">
                Samme bakke.
                <br />
                Nye historier.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-white/55">
              Noen år huskes for rekordene. Andre for været, publikum eller
              løperne som kommer tilbake år etter år. Historien vokser for hver
              utgave av løpet.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((item) => (
              <article key={item.year} className="min-h-48 bg-[#141414] p-6">
                <p className="text-4xl font-black tracking-[-0.06em]">
                  {item.year}
                </p>
                <p className="mt-8 text-xs font-black uppercase tracking-[0.16em] text-white/70">
                  {item.title}
                </p>
                <p className="mt-2 text-xs leading-5 text-white/38">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e9e8e3] text-black">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 md:py-24 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
                Rekordene
              </p>
              <h2 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-6xl">
                De raskeste
                <br />
                opp.
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Menn", event.records.men],
                ["Kvinner", event.records.women],
              ].map(([label, record]) => {
                const item = record as typeof event.records.men;
                return (
                  <article key={label as string} className="border border-black/15 bg-white/35 p-7">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-black/40">
                      {label as string}
                    </p>
                    <p className="mt-7 text-5xl font-black tracking-[-0.07em]">
                      {item.time}
                    </p>
                    <p className="mt-4 text-sm font-bold">{item.name}</p>
                    <p className="mt-1 text-xs text-black/40">{item.year}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 sm:py-20 md:px-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="section-kicker">Se mer</p>
            <h2 className="mt-4 text-4xl font-black uppercase tracking-[-0.05em] sm:text-5xl">
              Historien i bilder.
            </h2>
          </div>
          <Link
            href="/bilder"
            className="inline-flex min-h-13 items-center justify-center border border-white/20 px-7 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:border-white/60"
          >
            Se bildegalleri
          </Link>
        </div>
      </section>
    </main>
  );
}
