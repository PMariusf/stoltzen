import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export default function TrainingSection({ locale = "no" }: { locale?: Locale }) {
  const en = locale === "en";

  const cards = en
    ? [
        ["01", "Before the race", "Pacing, warm-up and how to prepare for a short, steep climb."],
        ["02", "Equipment", "Shoes, clothing and simple choices for changing Bergen weather."],
        ["03", "Race day", "Start, practical information and what to know before heading to Fjellveien."],
      ]
    : [
        ["01", "Før løpet", "Disponering, oppvarming og hvordan du forbereder deg på en kort, bratt løype."],
        ["02", "Utstyr", "Sko, bekledning og enkle valg for skiftende bergensvær."],
        ["03", "Løpsdagen", "Start, praktisk informasjon og det du bør vite før turen til Fjellveien."],
      ];

  return (
    <section className="bg-[#ecebe6] text-black">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-black/45">
              {en ? "Preparation" : "Forberedelser"}
            </p>
            <h2 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-6xl">
              {en ? (
                <>Ready for<br />the climb.</>
              ) : (
                <>Klar for<br />bakken.</>
              )}
            </h2>
          </div>

          <div className="max-w-xl">
            <p className="text-lg leading-8 text-black/60">
              {en
                ? "Everything you need before race day, gathered in one place and easy to scan."
                : "Det viktigste før løpsdagen, samlet på ett sted og enkelt å finne frem i."}
            </p>
            <div className="mt-7 flex flex-wrap gap-5">
              <Link
                href={en ? "/en/preparation" : "/forberedelser"}
                className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.12em]"
              >
                {en ? "Prepare" : "Forbered deg"} <span aria-hidden="true">→</span>
              </Link>
              <Link
                href={en ? "/en/practical-info" : "/praktisk-info"}
                className="text-sm font-black uppercase tracking-[0.12em] text-black/45 transition hover:text-black"
              >
                {en ? "Practical info" : "Praktisk info"}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-black/15 bg-black/15 md:grid-cols-3">
          {cards.map(([number, title, text]) => (
            <article key={number} className="bg-[#ecebe6] p-7 md:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-black/30">{number}</p>
              <h3 className="mt-10 text-2xl font-black uppercase tracking-[-0.04em]">{title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-black/55">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
