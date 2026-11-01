import Link from "next/link";
import { event } from "@/data/event";
import { getArchiveStatistics } from "@/lib/archive-statistics";
import type { Locale } from "@/lib/i18n";

function time(value: string | null, seconds: number | null) {
  if (value) return value;
  if (seconds === null) return "—";
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export default async function StatisticsPageContent({ locale = "no" }: { locale?: Locale }) {
  const en = locale === "en";
  const stats = await getArchiveStatistics();
  const linkPrefix = en ? "/en/profile/" : "/profil/";
  const years = stats.years;
  const maxYearCount = Math.max(1, ...years.map((year) => year.count));

  return (
    <main className="statistics-dark-surface bg-[#090909] text-white">
      <section className="statistics-dark-panel border-b border-white/10 bg-[radial-gradient(circle_at_80%_20%,rgba(255,145,0,0.13),transparent_35%)]">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-36 md:px-10 md:pt-44">
          <p className="section-kicker">{en ? "Stoltzen archive" : "Stoltzen-arkivet"}</p>
          <h1 className="mt-5 text-[clamp(3.5rem,8vw,7.5rem)] font-black uppercase leading-[0.88] tracking-[-0.07em]">
            {en ? "Statistics & records." : "Statistikk & rekorder."}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/60">
            {en
              ? "Explore the imported race history. The archive is incomplete, so rankings below are not official all-time rankings."
              : "Utforsk den importerte løpshistorikken. Arkivet er foreløpig ufullstendig, så listene nedenfor er ikke offisielle alle-tiders-rangeringer."}
          </p>
          <Link href={en ? "/en/results" : "/resultater"} className="mt-7 inline-flex border border-white/25 px-5 py-3 text-xs font-black uppercase tracking-wider hover:bg-white hover:text-black">
            {en ? "Search results" : "Søk i resultater"} →
          </Link>
        </div>
      </section>

      <section className="statistics-dark-panel mx-auto max-w-7xl px-6 py-14 md:px-10">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: en ? "Imported results" : "Importerte resultater", number: stats.resultCount },
            { label: en ? "Runners with results" : "Løpere med resultater", number: stats.runnerCount },
            { label: en ? "Years represented" : "År representert", number: years.length },
          ].map((item) => (
            <div key={item.label} className="border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-white/50">{item.label}</p>
              <p className="mt-3 text-5xl font-black">{item.number}</p>
            </div>
          ))}
        </div>
        {stats.limited && (
          <p role="status" className="mt-5 border border-amber-500/40 p-4 text-sm text-amber-200">
            {en ? "Only the first 1,000 imported results are included. Statistics are partial." : "Bare de første 1 000 importerte resultatene er med. Statistikken er derfor delvis."}
          </p>
        )}
      </section>

      <section className="bg-[#eeeae1] text-black">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-black/45">{en ? "Course records" : "Løyperekorder"}</p>
          <h2 className="mt-3 text-4xl font-black uppercase tracking-tight">{en ? "The fastest." : "De raskeste."}</h2>
          <p className="mt-3 text-sm text-black/55">
            {en ? "Published course records, kept separate from the partial data import." : "Oppgitte løyperekorder, holdt adskilt fra den delvise dataimporten."}
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              { label: en ? "Men" : "Menn", record: event.records.men },
              { label: en ? "Women" : "Kvinner", record: event.records.women },
            ].map(({ label, record }) => (
              <article key={label} className="border border-black/15 p-7">
                <p className="text-xs font-black uppercase tracking-widest text-black/55">{label}</p>
                <p className="mt-4 text-6xl font-black tracking-tighter">{record.time}</p>
                <p className="mt-4 font-bold">{record.name}</p>
                <p className="mt-1 text-sm text-black/55">{record.year}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="statistics-dark-panel mx-auto grid max-w-7xl gap-14 px-6 py-20 md:px-10 lg:grid-cols-2">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">{en ? "Imported results" : "Importerte resultater"}</p>
          <h2 className="mt-3 text-3xl font-black uppercase">{en ? "10 fastest finish times" : "10 raskeste sluttider"}</h2>
          <p className="mt-3 text-sm leading-6 text-white/45">
            {en ? "Among currently imported entries; the same runner may appear more than once." : "Blant foreløpig importerte resultater. Samme løper kan forekomme flere ganger."}
          </p>
          {stats.fastest.length ? (
            <ol className="mt-8 divide-y divide-white/10 border-t border-white/10">
              {stats.fastest.map((item, index) => (
                <li key={item.result_id} className="flex items-center gap-4 py-4">
                  <span className="w-7 shrink-0 text-lg font-black text-white/35">{index + 1}</span>
                  <div className="min-w-0 flex-1">
                    <Link href={linkPrefix + item.legacy_id} className="font-bold underline-offset-4 hover:underline">{item.name}</Link>
                    <p className="text-xs text-white/45">{item.year}</p>
                  </div>
                  <strong className="text-xl">{time(item.finish_time_text, item.finish_time_seconds)}</strong>
                </li>
              ))}
            </ol>
          ) : <p className="mt-8 text-white/55">{en ? "No finish times imported yet." : "Ingen sluttider importert ennå."}</p>}
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">{en ? "Participation" : "Deltakelser"}</p>
          <h2 className="mt-3 text-3xl font-black uppercase">{en ? "Most recorded races" : "Flest registrerte løp"}</h2>
          <p className="mt-3 text-sm leading-6 text-white/45">
            {en ? "Counts from the currently imported results, not lifetime participation totals." : "Antall i det importerte arkivet, ikke nødvendigvis samlet antall deltakelser."}
          </p>
          <ol className="mt-8 divide-y divide-white/10 border-t border-white/10">
            {stats.frequent.map((item, index) => (
              <li key={item.legacyId} className="flex items-center gap-4 py-4">
                <span className="w-7 shrink-0 text-lg font-black text-white/35">{index + 1}</span>
                <Link href={linkPrefix + item.legacyId} className="min-w-0 flex-1 font-bold underline-offset-4 hover:underline">{item.name}</Link>
                <strong className="text-xl">{item.count}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="statistics-dark-panel border-t border-white/10 bg-[#0c0c0c]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">{en ? "Class breakdown" : "Klassefordeling"}</p>
          <h2 className="mt-3 text-3xl font-black uppercase">{en ? "Times by class" : "Tider per klasse"}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/50">
            {en ? "Fastest imported result in each available class. These are not official class records; age-group classes are not available in the current import." : "Raskeste importerte resultat i hver tilgjengelige klasse. Dette er ikke offisielle klasserekorder; aldersklasser finnes ikke i den nåværende importen."}
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {stats.classes.map((entry) => (
              <article key={entry.name} className="border border-white/15 bg-white/[0.025] p-6">
                <h3 className="text-xl font-black uppercase">{entry.name}</h3>
                <p className="mt-2 text-sm text-white/50">{entry.count} {en ? "imported results" : "importerte resultater"}</p>
                {entry.fastest ? (
                  <div className="mt-5 border-t border-white/10 pt-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-white/45">{en ? "Fastest imported time" : "Raskeste importerte tid"}</p>
                    <p className="mt-2 text-4xl font-black">{time(entry.fastest.finish_time_text, entry.fastest.finish_time_seconds)}</p>
                    <Link href={linkPrefix + entry.fastest.legacy_id} className="mt-2 inline-block text-sm text-white/70 underline-offset-4 hover:underline">
                      {entry.fastest.name} · {entry.fastest.year}
                    </Link>
                  </div>
                ) : (
                  <p className="mt-5 text-sm text-white/50">{en ? "No valid time" : "Ingen gyldig tid"}</p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="statistics-dark-panel bg-[#151515]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <h2 className="text-3xl font-black uppercase">{en ? "Results by year" : "Resultater per år"}</h2>
          <p className="mt-3 text-sm text-white/45">{en ? "Number of entries imported for each race year." : "Antall resultater som er importert for hvert løpsår."}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {years.map(({ year, count }) => (
              <div key={year} className="border border-white/10 p-4">
                <div className="flex justify-between text-sm font-bold"><span>{year}</span><span>{count}</span></div>
                <div className="mt-3 h-2 bg-white/10">
                  <div className="h-2 bg-[#ed870b]" style={{ width: `${(count / maxYearCount) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
