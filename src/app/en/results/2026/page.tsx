import type { Metadata } from "next";
import Link from "next/link";
import ResultsExplorer from "@/components/results/ResultsExplorer";
import { featured2026, featured2026Sources } from "@/data/featured-results-2026";

export const metadata: Metadata = {
  title: "Results 2026",
  description: "Start and results page for Stoltzekleiven Opp 2026.",
};

export default function Results2026Page() {
  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <section className="border-b border-white/10 bg-[#0b0b0b]">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-36 md:px-10 md:pb-20 md:pt-44">
          <p className="section-kicker">Results · 2026</p>
          <h1 className="mt-5 text-[clamp(4rem,10vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.07em]">
            Stoltzen 2026
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-8 text-white/58">
            Search the 2026 start and result data. The official database will
            appear here once the existing data is ready for import.
          </p>

          <Link href="/en/results" className="text-link mt-8 inline-flex">
            ← All results
          </Link>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#121212]">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10">
          <p className="section-kicker">Verified 2026 results</p>
          <h2 className="mt-4 text-3xl font-black uppercase sm:text-4xl">Podium finishers</h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-white/55">Selected verified 2026 results. These are shown separately until official runner IDs can be matched safely to the archive.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {([
              { title: "Men", entries: featured2026.men },
              { title: "Women", entries: featured2026.women },
            ]).map(({title, entries}) => (
              <div key={title} className="border border-white/15 p-5 sm:p-7">
                <h3 className="text-xl font-black uppercase">{title}</h3>
                <ol className="mt-5 divide-y divide-white/10">
                  {entries.map((entry) => (
                    <li key={entry.place} className="flex items-center gap-3 py-4">
                      <span className="w-7 text-lg font-black text-[#f5a443]">{entry.place}</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold">{entry.name}</p>
                        {entry.club && <p className="text-xs text-white/45">{entry.club}</p>}
                      </div>
                      <strong className="text-xl tabular-nums">{entry.time}</strong>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-white/60">
            Sources: <a className="underline underline-offset-4 hover:text-white" href={featured2026Sources.official} target="_blank" rel="noopener noreferrer">Stoltzen.no</a> · <a className="underline underline-offset-4 hover:text-white" href={featured2026Sources.report} target="_blank" rel="noopener noreferrer">Kondis</a>
          </p>
        </div>
      </section>

      <section className="bg-[#111]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
          <ResultsExplorer locale="en" fixedYear={2026} />
        </div>
      </section>
    </main>
  );
}
