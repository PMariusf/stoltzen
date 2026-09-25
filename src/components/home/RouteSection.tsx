import Link from "next/link";

export default function RouteSection() {
  return (
    <section className="bg-[#111] text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="route-panel relative min-h-[430px] overflow-hidden border border-white/10 p-8 sm:p-10">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_60%)]" />
            <div className="relative flex h-full min-h-[350px] flex-col justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-white/40">Start</p>
                <p className="mt-2 text-3xl font-black uppercase tracking-[-0.04em]">Fjellveien</p>
              </div>
              <div className="ml-5 h-28 w-px bg-gradient-to-b from-white/60 to-white/10" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-white/40">801 trinn senere</p>
                <p className="mt-2 text-3xl font-black uppercase tracking-[-0.04em]">Sandvikspilen</p>
              </div>
            </div>
          </div>

          <div>
            <p className="section-kicker">Løypen</p>
            <h2 className="section-title mt-4">Én retning. Opp.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/62">
              En egen løypeside kan samle kart, høydeprofil, bilder fra de viktigste partiene og praktiske tips for førstegangsløpere.
            </p>
            <Link href="/lopet" className="text-link mt-8 inline-flex">
              Se løypen <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
