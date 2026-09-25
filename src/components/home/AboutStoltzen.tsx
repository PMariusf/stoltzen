import Link from "next/link";

export default function AboutStoltzen() {
  return (
    <section className="bg-[#0b0b0b] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:py-32">
        <div>
          <p className="section-kicker">Dette er Stoltzen</p>
          <h2 className="section-title mt-4">Kort løype.<br />Brutal stigning.</h2>
        </div>
        <div className="max-w-2xl lg:pt-12">
          <p className="text-lg leading-8 text-white/68 md:text-xl md:leading-9">
            Fra Fjellveien til Sandvikspilen går løypen omtrent 900 meter og stiger rundt 315 høydemeter.
            Stoltzekleiven Opp handler om å finne rytmen, tåle bakken og komme seg helt opp.
          </p>
          <Link href="/lopet" className="text-link mt-8 inline-flex">
            Les om løpet <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
