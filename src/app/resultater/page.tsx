import type { Metadata } from "next";
import Link from "next/link";
import ResultsExplorer from "@/components/results/ResultsExplorer";
import { event } from "@/data/event";

export const metadata: Metadata = {
  title: "Start & resultater",
  description:
    "Søk i resultater fra Stoltzekleiven Opp etter navn, startnummer, år, klasse og klubb.",
};

export default function ResultsPage() {
  return (
    <main className="bg-[#080808] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_22%,rgba(255,255,255,0.09),transparent_24%),linear-gradient(145deg,#161616,#070707_60%)]" />
        <div className="pointer-events-none absolute -right-10 top-24 hidden select-none text-[20vw] font-black leading-none tracking-[-0.08em] text-white/[0.025] lg:block">
          {event.year}
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-36 md:px-10 md:pb-20 md:pt-44">
          <p className="section-kicker">Start & resultater</p>
          <h1 className="mt-5 max-w-5xl text-[clamp(4rem,10vw,8.5rem)] font-black uppercase leading-[0.8] tracking-[-0.075em]">
            Finn løperen.
            <br />
            Finn tiden.
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-white/60 md:text-2xl md:leading-9">
            Søk på navn eller startnummer, velg år, klasse og klubb — og bygg
            etter hvert din egen historikk i Stoltzen.
          </p>
        </div>
      </section>

      <section className="bg-[#0b0b0b]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
          <ResultsExplorer locale="no" />
        </div>
      </section>

      <section className="bg-[#e9e8e3] text-black">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
                StoltzeProfil
              </p>
              <h2 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                Hele din
                <br />
                Stoltzen-historie.
              </h2>
            </div>

            <p className="max-w-xl text-lg leading-8 text-black/58">
              Når resultatarkivet er koblet til, kan én løperprofil samle
              personbeste, siste resultat, utvikling, plasseringer, antall
              gjennomføringer og bilder fra løpet.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden border border-black/15 bg-black/15 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["PB", "Personbeste", "Din raskeste registrerte tid."],
              ["SISTE", "Siste løp", "Siste registrerte Stoltzen-resultat."],
              ["UTVIKLING", "Progresjon", "Se tidene dine utvikle seg år for år."],
              ["ANTALL", "Gjennomføringer", "Hvor mange ganger du har kommet deg til toppen."],
            ].map(([value, title, text]) => (
              <article key={title} className="bg-[#e9e8e3] p-7">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-black/30">{value}</p>
                <h3 className="mt-8 text-xl font-black uppercase tracking-[-0.035em]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-black/55">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="section-kicker">Statistikk</p>
              <h2 className="section-title mt-4">
                Mer enn
                <br />
                én sluttid.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/55">
                Resultatdataene kan også drive rekorder, topp 10, historiske
                vinnere, aldersklasserekorder, flest deltakelser og utvikling
                over tid.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["7:46", "Løyperekord menn", event.records.men.name],
                ["9:35", "Løyperekord kvinner", event.records.women.name],
                ["TOPP 10", "Raskeste tider", "Kvinner og menn"],
                ["1979–", "Historisk arkiv", "Søk år for år"],
              ].map(([value, label, note]) => (
                <article key={label} className="border border-white/10 bg-white/[0.025] p-7">
                  <p className="text-4xl font-black tracking-[-0.06em]">{value}</p>
                  <p className="mt-5 text-sm font-black uppercase tracking-[-0.02em]">{label}</p>
                  <p className="mt-2 text-xs text-white/35">{note}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:py-24">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
              Årets side
            </p>
            <h2 className="mt-4 text-4xl font-black uppercase tracking-[-0.05em] sm:text-5xl">
              Resultater {event.year}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-black/55">
              En egen årsside gjør det enkelt å dele direkte til årets start-
              og resultatoversikt.
            </p>
          </div>

          <Link
            href={event.links.latestResults}
            className="inline-flex min-h-14 items-center justify-center bg-black px-7 text-sm font-black uppercase tracking-[0.08em] text-white"
          >
            Åpne {event.year}
          </Link>
        </div>
      </section>
    </main>
  );
}
