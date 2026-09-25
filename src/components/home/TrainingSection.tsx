import Link from "next/link";

export default function TrainingSection() {
  return (
    <section className="bg-[#ecebe6] text-black">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:px-10 lg:grid-cols-2 lg:py-32">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-black/45">Forberedelser</p>
          <h2 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-6xl">
            Trening mot<br />Stoltzen.
          </h2>
        </div>
        <div className="max-w-xl lg:pt-10">
          <p className="text-lg leading-8 text-black/60">
            Samle treningstips, disponering, sko, oppvarming, sikkerhet og Stoltzekarusellen på ett sted —
            enkelt for både førstegangsløpere og erfarne deltakere.
          </p>
          <Link href="/forberedelser" className="mt-8 inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.12em]">
            Forbered deg <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
