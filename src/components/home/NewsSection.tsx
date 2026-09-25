export default function NewsSection() {
  return (
    <section className="bg-[#0b0b0b] text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <p className="section-kicker">Siste nytt</p>
        <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="section-title">Kun det viktigste på forsiden.</h2>
          <p className="max-w-lg text-sm leading-6 text-white/45">
            Her viser vi tre nyeste saker når innholdet fra dagens nettsted er ryddet og migrert.
            Det historiske arkivet beholdes separat.
          </p>
        </div>

        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <article key={item} className="min-h-48 border border-white/10 bg-white/[0.025] p-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/30">Nyhet {item}</p>
              <p className="mt-10 text-lg font-bold text-white/55">Innhold kobles til etter migrering</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
