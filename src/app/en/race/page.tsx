import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The race",
  description:
    "Get to know Stoltzekleiven Opp – the course from Fjellveien to Sandvikspilen, roughly 900 metres and 315 vertical metres.",
};

const stats = [
  { value: "0.9 KM", label: "Approx. distance" },
  { value: "801", label: "Steps" },
  { value: "315 M", label: "Vertical metres" },
  { value: "1979", label: "First race" },
];

export default function RacePage() {
  return (
    <main className="bg-[#080808] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.08),transparent_24%),linear-gradient(145deg,#151515,#070707_60%)]" />
        <div className="pointer-events-none absolute -right-8 top-24 hidden select-none text-[22vw] font-black leading-none tracking-[-0.09em] text-white/[0.025] lg:block">
          801
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44">
          <p className="section-kicker">The race</p>
          <h1 className="mt-5 max-w-5xl text-[clamp(4rem,10vw,8.5rem)] font-black uppercase leading-[0.8] tracking-[-0.075em]">
            Stoltzekleiven
            <br />
            Opp
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-8 text-white/62 md:text-2xl md:leading-9">
            Short on the map. Brutal on the legs. From Fjellveien to
            Sandvikspilen, the course is roughly 900 metres and climbs about
            315 vertical metres.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/en/registration"
              className="inline-flex min-h-14 items-center justify-center bg-white px-7 text-sm font-black uppercase tracking-[0.08em] text-black transition hover:bg-white/80"
            >
              Registration
            </Link>
            <Link
              href="/en/practical-info"
              className="inline-flex min-h-14 items-center justify-center border border-white/25 px-7 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:border-white/60 hover:bg-white hover:text-black"
            >
              Practical info
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0b0b0b]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-b border-r border-white/10 px-5 py-8 text-center last:border-r-0 md:border-b-0 md:py-11"
            >
              <p className="text-4xl font-black tracking-[-0.06em] sm:text-5xl">{stat.value}</p>
              <p className="mt-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/35">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#111]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <p className="section-kicker">From start to finish</p>
              <h2 className="section-title mt-4">
                One direction.
                <br />
                Up.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/58">
                The race starts at Fjellveien and finishes at Sandvikspilen.
                The stairs, the gradient and your rhythm decide how quickly
                you make it to the top.
              </p>
            </div>

            <div className="relative min-h-[500px] overflow-hidden border border-white/10 bg-[#090909] p-8 sm:p-10">
              <div className="relative flex min-h-[420px] flex-col justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/35">Start</p>
                  <p className="mt-2 text-3xl font-black uppercase tracking-[-0.04em]">Fjellveien</p>
                </div>

                <div className="ml-5 h-48 w-px bg-gradient-to-b from-white/20 via-white/45 to-white/70" />

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/35">Finish</p>
                  <p className="mt-2 text-3xl font-black uppercase tracking-[-0.04em]">Sandvikspilen</p>
                  <p className="mt-2 text-sm text-white/35">+315 M</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e9e8e3] text-black">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
            Everything about the race
          </p>
          <h2 className="mt-4 max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            Useful information.
            <br />
            Not hidden in news.
          </h2>

          <div className="mt-14 grid gap-px overflow-hidden border border-black/15 bg-black/15 md:grid-cols-3">
            {[
              ["01", "Who can take part?", "Classes, age limits and any participation requirements will be shown clearly here."],
              ["02", "How does the start work?", "Start groups, times and current-year practical details will be collected here."],
              ["03", "Map & photos", "The course map, elevation profile and photos from different parts of the route will be connected here."],
            ].map(([number, title, text]) => (
              <article key={number} className="bg-[#e9e8e3] p-7 sm:p-8">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-black/35">{number}</p>
                <h3 className="mt-8 text-2xl font-black uppercase tracking-[-0.04em]">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-black/55">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
