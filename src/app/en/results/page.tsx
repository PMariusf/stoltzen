import type { Metadata } from "next";
import Link from "next/link";
import ResultsExplorer from "@/components/results/ResultsExplorer";
import { event } from "@/data/event";

export const metadata: Metadata = {
  title: "Start & results",
  description:
    "Search Stoltzekleiven Opp results by name, bib number, year, class and club.",
};

export default function ResultsPage() {
  return (
    <main className="bg-[#080808] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_22%,rgba(255,255,255,0.09),transparent_24%),linear-gradient(145deg,#161616,#070707_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-36 md:px-10 md:pb-20 md:pt-44">
          <p className="section-kicker">Start & results</p>
          <h1 className="mt-5 max-w-5xl text-[clamp(4rem,10vw,8.5rem)] font-black uppercase leading-[0.8] tracking-[-0.075em]">
            Find the runner.
            <br />
            Find the time.
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-white/60 md:text-2xl md:leading-9">
            Search by name or bib number, filter by year, class and club, and
            eventually build your own Stoltzen history.
          </p>
        </div>
      </section>

      <section className="bg-[#0b0b0b]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
          <ResultsExplorer locale="en" />
        </div>
      </section>

      <section className="bg-[#e9e8e3] text-black">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
            Stoltzen profile
          </p>
          <div className="mt-4 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              Your complete
              <br />
              Stoltzen history.
            </h2>
            <p className="max-w-xl text-lg leading-8 text-black/58">
              Once the archive is connected, a runner profile can collect
              personal best, latest result, progression, placings, number of
              finishes and race photos.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:py-24">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
              Current year
            </p>
            <h2 className="mt-4 text-4xl font-black uppercase tracking-[-0.05em] sm:text-5xl">
              Results {event.year}
            </h2>
          </div>
          <Link
            href={`/en/results/${event.year}`}
            className="inline-flex min-h-14 items-center justify-center bg-black px-7 text-sm font-black uppercase tracking-[0.08em] text-white"
          >
            Open {event.year}
          </Link>
        </div>
      </section>
    </main>
  );
}
