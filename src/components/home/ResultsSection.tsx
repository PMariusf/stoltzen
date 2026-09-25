import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export default function ResultsSection({ locale = "no" }: { locale?: Locale }) {
  const en = locale === "en";

  const features = en
    ? [
        ["PB", "Personal best", "Your fastest registered Stoltzen time."],
        ["YEAR", "Year by year", "Follow the result history across seasons."],
        ["SPLITS", "Splits", "See how the climb developed on the way up."],
      ]
    : [
        ["PB", "Personbeste", "Din raskeste registrerte tid i Stoltzen."],
        ["ÅR", "År for år", "Følg resultathistorikken gjennom sesongene."],
        ["SPLIT", "Mellomtider", "Se hvordan løpet utviklet seg på vei opp."],
      ];

  return (
    <section className="border-y border-black/10 bg-[#e9e8e3] text-black">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-28">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-black/45">
          {en ? "Start & results" : "Start & resultater"}
        </p>

        <div className="mt-4 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <h2 className="text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            {en ? (
              <>Find the runner.<br />Find the time.</>
            ) : (
              <>Finn løperen.<br />Finn tiden.</>
            )}
          </h2>

          <div>
            <p className="max-w-xl text-lg leading-8 text-black/60">
              {en
                ? "Search the archive by runner, year, class and club. Open a Stoltzen profile to see personal bests, yearly history and split times."
                : "Søk i arkivet etter løper, år, klasse og klubb. Åpne en StoltzeProfil for å se personbeste, årshistorikk og mellomtider."}
            </p>
            <Link
              href={en ? "/en/results" : "/resultater"}
              className="mt-7 inline-flex min-h-13 items-center justify-center bg-black px-7 text-sm font-black uppercase tracking-[0.1em] text-white transition hover:bg-black/80"
            >
              {en ? "Search results" : "Søk i resultater"} <span className="ml-3" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-black/15 bg-black/15 md:grid-cols-3">
          {features.map(([eyebrow, title, text]) => (
            <article key={title} className="bg-[#e9e8e3] p-7 md:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-black/35">
                {eyebrow}
              </p>
              <h3 className="mt-8 text-2xl font-black uppercase tracking-[-0.04em]">
                {title}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-black/55">
                {text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
