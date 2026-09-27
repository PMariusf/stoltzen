import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Practical info",
  description:
    "Practical information for Stoltzekleiven Opp – start, finish, bib collection, baggage, transport, parking, spectators, toilets and weather.",
};

const cards = [
  ["01", "Bib collection", "Collection point, opening times and current-year details will be published here."],
  ["02", "Baggage", "Information about drop-off, transport and collection will be gathered here."],
  ["03", "Toilets", "Locations and availability around the start and finish areas will be shown here."],
  ["04", "Transport", "Recommended public transport, stops and walking routes to the start will be collected here."],
  ["05", "Parking", "Any restrictions and recommended parking options will be published before race day."],
  ["06", "Spectators", "Where to watch, how to get there and which areas must remain clear will be explained here."],
];

export default function PracticalInfoPage() {
  return (
    <main className="bg-[#080808] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(255,255,255,0.08),transparent_24%),linear-gradient(145deg,#151515,#070707_60%)]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44">
          <p className="section-kicker">Practical info</p>
          <h1 className="mt-5 max-w-5xl text-[clamp(4rem,10vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.07em]">
            Everything you need
            <br />
            before the start.
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-8 text-white/60 md:text-2xl md:leading-9">
            Start, finish, bib collection, baggage, transport, spectators and
            other important race-day information in one place.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/en/results" className="inline-flex min-h-14 items-center justify-center bg-white px-7 text-sm font-black uppercase tracking-[0.08em] text-black">
              Start & results
            </Link>
            <Link href="/en/race" className="inline-flex min-h-14 items-center justify-center border border-white/25 px-7 text-sm font-black uppercase tracking-[0.08em] text-white">
              The race
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0b0b0b]">
        <div className="mx-auto grid max-w-7xl gap-px bg-white/10 md:grid-cols-2">
          <div className="bg-[#0b0b0b] px-6 py-10 md:px-10 md:py-12">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/35">Start</p>
            <p className="mt-3 text-4xl font-black uppercase tracking-[-0.05em]">Fjellveien</p>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/48">
              Detailed access, map and current start-area information will appear here.
            </p>
          </div>

          <div className="bg-[#0b0b0b] px-6 py-10 md:px-10 md:py-12">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/35">Finish</p>
            <p className="mt-3 text-4xl font-black uppercase tracking-[-0.05em]">Sandvikspilen</p>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/48">
              The finish is at Sandvikspilen after roughly 900 metres and about 315 vertical metres.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#e9e8e3] text-black">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">On race day</p>
          <h2 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-6xl">
            Find what you
            <br />
            need quickly.
          </h2>

          <div className="mt-14 grid gap-px overflow-hidden border border-black/15 bg-black/15 md:grid-cols-2 lg:grid-cols-3">
            {cards.map(([number, title, text]) => (
              <article key={number} className="min-h-60 bg-[#e9e8e3] p-7 sm:p-8">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-black/30">{number}</p>
                <h3 className="mt-8 text-2xl font-black uppercase tracking-[-0.04em]">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-black/55">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111]">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 md:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:py-32">
          <div>
            <p className="section-kicker">Map & access</p>
            <h2 className="section-title mt-4">
              From the city
              <br />
              to the start.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/55">
              A clear map will show start, finish, bib collection, spectator
              areas and relevant transport points once the official race plan
              is ready.
            </p>
          </div>

          <div className="min-h-[420px] border border-white/10 bg-[#090909] p-8">
            <div className="flex h-full min-h-[350px] items-center justify-between">
              <div>
                <span className="block h-3 w-3 rounded-full bg-white" />
                <p className="mt-3 text-xs font-black uppercase tracking-[0.18em]">Fjellveien</p>
                <p className="mt-1 text-[11px] text-white/35">Start</p>
              </div>
              <div className="h-px flex-1 border-t border-dashed border-white/25" />
              <div className="text-right">
                <span className="ml-auto block h-3 w-3 rounded-full border border-white" />
                <p className="mt-3 text-xs font-black uppercase tracking-[0.18em]">Sandvikspilen</p>
                <p className="mt-1 text-[11px] text-white/35">Finish</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
