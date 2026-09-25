import type { Metadata } from "next";
import Link from "next/link";
import ResultsExplorer from "@/components/results/ResultsExplorer";

export const metadata: Metadata = {
  title: "Resultater 2026",
  description:
    "Start- og resultatside for Stoltzekleiven Opp 2026.",
};

export default function Results2026Page() {
  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <section className="border-b border-white/10 bg-[#0b0b0b]">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-36 md:px-10 md:pb-20 md:pt-44">
          <p className="section-kicker">Resultater · 2026</p>
          <h1 className="mt-5 text-[clamp(4rem,10vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.07em]">
            Stoltzen 2026
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-8 text-white/58">
            Søk i start- og resultatdata for 2026. Selve databasen kobles inn
            når de offisielle dataene er klare for import.
          </p>

          <Link href="/resultater" className="text-link mt-8 inline-flex">
            ← Alle resultater
          </Link>
        </div>
      </section>

      <section className="bg-[#111]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
          <ResultsExplorer locale="no" fixedYear={2026} />
        </div>
      </section>
    </main>
  );
}
