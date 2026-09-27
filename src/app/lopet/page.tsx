import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Løpet",
  description:
    "Bli kjent med Stoltzekleiven Opp – løypen fra Fjellveien til Sandvikspilen, rundt 900 meter og 315 høydemeter.",
};

const stats = [
  { value: "0,9 KM", label: "Omtrentlig lengde" },
  { value: "801", label: "Trinn" },
  { value: "315 M", label: "Høydemeter" },
  { value: "1979", label: "Første løp" },
];

export default function RacePage() {
  return (
    <main className="bg-[#080808] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.08),transparent_24%),linear-gradient(145deg,#151515,#070707_60%)]" />
        <div className="pointer-events-none absolute -right-8 top-24 hidden select-none text-[22vw] font-black leading-none tracking-[-0.09em] text-white/[0.025] lg:block">
          801
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44">
          <p className="section-kicker">Løpet</p>

          <h1 className="mt-5 max-w-5xl text-[clamp(4rem,10vw,8.5rem)] font-black uppercase leading-[0.8] tracking-[-0.075em]">
            Stoltzekleiven
            <br />
            Opp
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-8 text-white/62 md:text-2xl md:leading-9">
            Kort på kartet. Brutal i beina. Fra Fjellveien til Sandvikspilen
            går løpet omtrent 900 meter og stiger rundt 315 høydemeter.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/pamelding"
              className="inline-flex min-h-14 items-center justify-center bg-white px-7 text-sm font-black uppercase tracking-[0.08em] text-black transition hover:bg-white/80"
            >
              Påmelding
            </Link>

            <Link
              href="/praktisk-info"
              className="inline-flex min-h-14 items-center justify-center border border-white/25 px-7 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:border-white/60 hover:bg-white hover:text-black"
            >
              Praktisk info
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0b0b0b]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-b border-r border-white/10 px-5 py-8 text-center last:border-r-0 md:border-b-0 md:py-11"
            >
              <p className="text-4xl font-black tracking-[-0.06em] sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/35">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#111]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <p className="section-kicker">Fra start til mål</p>
              <h2 className="section-title mt-4">
                Én retning.
                <br />
                Opp.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-white/58">
                Løypen starter i Fjellveien og ender ved Sandvikspilen.
                Underveis er det trappene, stigningen og rytmen som bestemmer
                hvor fort du kommer deg opp.
              </p>
            </div>

            <div className="relative min-h-[520px] overflow-hidden border border-white/10 bg-[#090909] p-7 sm:p-10">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.035),transparent_45%),repeating-linear-gradient(135deg,rgba(255,255,255,0.025)_0,rgba(255,255,255,0.025)_1px,transparent_1px,transparent_12px)]" />

              <div className="relative flex min-h-[440px] flex-col justify-between">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/35">
                      Start
                    </p>
                    <p className="mt-2 text-3xl font-black uppercase tracking-[-0.04em]">
                      Fjellveien
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-white/35">0 M</p>
                </div>

                <div className="relative ml-4 flex-1 py-8">
                  <div className="absolute bottom-8 left-0 top-8 w-px bg-white/15" />
                  <div className="absolute bottom-8 left-0 w-px bg-white/70" style={{ height: "72%" }} />

                  <div className="absolute left-[-5px] top-[22%] h-2.5 w-2.5 rounded-full border border-white/50 bg-[#111]" />
                  <div className="absolute left-5 top-[20%]">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/55">
                      Stoltzekleiven
                    </p>
                    <p className="mt-1 max-w-xs text-xs leading-5 text-white/30">
                      Selve klatringen gjennom trappene.
                    </p>
                  </div>

                  <div className="absolute left-[-5px] top-[62%] h-2.5 w-2.5 rounded-full border border-white/50 bg-[#111]" />
                  <div className="absolute left-5 top-[60%]">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/55">
                      Siste del
                    </p>
                    <p className="mt-1 max-w-xs text-xs leading-5 text-white/30">
                      Her merkes høydeforskjellen for alvor.
                    </p>
                  </div>
                </div>

                <div className="flex items-end justify-between gap-6">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/35">
                      Mål
                    </p>
                    <p className="mt-2 text-3xl font-black uppercase tracking-[-0.04em]">
                      Sandvikspilen
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-white/35">+315 M</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e9e8e3] text-black">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
            Dette bør du vite
          </p>

          <h2 className="mt-4 max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            Alt om løpet.
            <br />
            Ikke gjemt i nyheter.
          </h2>

          <div className="mt-14 grid gap-px overflow-hidden border border-black/15 bg-black/15 md:grid-cols-3">
            <article className="bg-[#e9e8e3] p-7 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-black/35">
                01
              </p>
              <h3 className="mt-8 text-2xl font-black uppercase tracking-[-0.04em]">
                Hvem kan delta?
              </h3>
              <p className="mt-4 text-sm leading-6 text-black/55">
                Klasser, aldersgrenser og eventuelle krav skal hentes fra den
                offisielle påmeldingsinformasjonen og vises tydelig her.
              </p>
            </article>

            <article className="bg-[#e9e8e3] p-7 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-black/35">
                02
              </p>
              <h3 className="mt-8 text-2xl font-black uppercase tracking-[-0.04em]">
                Hvordan foregår starten?
              </h3>
              <p className="mt-4 text-sm leading-6 text-black/55">
                Startoppsett, puljer, tider og årets praktiske detaljer skal
                ligge samlet her i stedet for i enkeltstående nyhetssaker.
              </p>
            </article>

            <article className="bg-[#e9e8e3] p-7 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-black/35">
                03
              </p>
              <h3 className="mt-8 text-2xl font-black uppercase tracking-[-0.04em]">
                Kart & bilder
              </h3>
              <p className="mt-4 text-sm leading-6 text-black/55">
                Når vi har migrert foto og løypedata, kobler vi kart,
                høydeprofil og bilder fra de ulike delene av traseen direkte
                inn på denne siden.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#090909]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:px-10 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:py-28">
          <div>
            <p className="section-kicker">Før løpsdagen</p>
            <h2 className="section-title mt-4">
              Klar for
              <br />
              Stoltzen?
            </h2>
          </div>

          <div>
            <p className="max-w-xl text-lg leading-8 text-white/55">
              Påmeldingssiden samler priser, grupper, viktige datoer,
              venteliste og spørsmål og svar.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/pamelding"
                className="inline-flex min-h-14 items-center justify-center bg-white px-7 text-sm font-black uppercase tracking-[0.08em] text-black"
              >
                Se påmelding
              </Link>

              <Link
                href="/forberedelser"
                className="inline-flex min-h-14 items-center justify-center border border-white/25 px-7 text-sm font-black uppercase tracking-[0.08em] text-white"
              >
                Trening mot Stoltzen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
