import type { Locale } from "@/lib/i18n";

export default function NewsSection({ locale = "no" }: { locale?: Locale }) {
  const en = locale === "en";

  return (
    <section className="bg-[#0b0b0b] text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <p className="section-kicker">{en ? "Latest news" : "Siste nytt"}</p>
        <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="section-title">
            {en ? "Only what matters on the front page." : "Kun det viktigste på forsiden."}
          </h2>
          <p className="max-w-lg text-sm leading-6 text-white/45">
            {en
              ? "We will show the three latest stories here once the existing content has been cleaned up and migrated. The historic archive remains available separately."
              : "Her viser vi tre nyeste saker når innholdet fra dagens nettsted er ryddet og migrert. Det historiske arkivet beholdes separat."}
          </p>
        </div>

        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <article key={item} className="min-h-48 border border-white/10 bg-white/[0.025] p-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/30">
                {en ? `News ${item}` : `Nyhet ${item}`}
              </p>
              <p className="mt-10 text-lg font-bold text-white/55">
                {en ? "Content will be connected after migration" : "Innhold kobles til etter migrering"}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
