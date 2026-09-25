import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export default function ResultsSection({ locale = "no" }: { locale?: Locale }) {
  const en = locale === "en";

  return (
    <section className="bg-[#e9e8e3] text-black">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-black/45">
          {en ? "Start & results" : "Start & resultater"}
        </p>
        <div className="mt-4 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <h2 className="text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            {en ? <>Find the runner.<br />Find the time.</> : <>Finn løperen.<br />Finn tiden.</>}
          </h2>
          <p className="max-w-xl text-lg leading-8 text-black/60">
            {en
              ? "The results section is being built for search by name, bib number, class, club, year, time and placing. The same data can later power a personal Stoltzen profile."
              : "Resultatdelen bygges for søk på navn, startnummer, klasse, klubb, år, tid og plassering. Senere kan samme datagrunnlag drive en personlig StoltzeProfil."}
          </p>
        </div>

        <div className="mt-12 grid gap-3 border-y border-black/15 py-6 sm:grid-cols-[1fr_auto]">
          <div className="flex min-h-14 items-center border border-black/15 bg-white/50 px-5 text-black/45">
            {en ? "Search by name or bib number" : "Søk på navn eller startnummer"}
          </div>
          <Link href={en ? "/en/results" : "/resultater"} className="inline-flex min-h-14 items-center justify-center bg-black px-7 text-sm font-black uppercase tracking-[0.08em] text-white">
            {en ? "Open results" : "Åpne resultater"}
          </Link>
        </div>
      </div>
    </section>
  );
}
