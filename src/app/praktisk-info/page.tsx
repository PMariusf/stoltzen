import type { Metadata } from "next";
import Link from "next/link";
import { event } from "@/data/event";

export const metadata: Metadata = {
  title: "Praktisk info",
  description:
    "Praktisk informasjon for Stoltzekleiven Opp – start, mål, startnummer, bagasje, transport, parkering, publikum, toaletter, vær og kontakt.",
};

const practicalCards = [
  {
    number: "01",
    title: "Startnummer",
    text: "Henting av startnummer, åpningstider og årets hentested legges inn her fra den offisielle arrangementsinformasjonen.",
  },
  {
    number: "02",
    title: "Bagasje",
    text: "Informasjon om innlevering, transport og henting av bagasje samles her når årets løsning er bekreftet.",
  },
  {
    number: "03",
    title: "Toaletter",
    text: "Plassering og tilgjengelighet for toaletter ved start- og målområdet legges inn her.",
  },
  {
    number: "04",
    title: "Transport",
    text: "Anbefalt kollektivtransport, avstigning og gangvei til startområdet samles på ett sted.",
  },
  {
    number: "05",
    title: "Parkering",
    text: "Eventuelle begrensninger og anbefalte parkeringsløsninger publiseres her før arrangementet.",
  },
  {
    number: "06",
    title: "Publikum",
    text: "Her beskriver vi hvor publikum kan følge løpet, hvordan man kommer seg dit og hvilke områder som må holdes frie.",
  },
];

export default function PracticalInfoPage() {
  return (
    <main className="bg-[#080808] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(255,255,255,0.08),transparent_24%),linear-gradient(145deg,#151515,#070707_60%)]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44">
          <p className="section-kicker">Praktisk info</p>

          <h1 className="mt-5 max-w-5xl text-[clamp(4rem,10vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.07em]">
            Alt du trenger
            <br />
            før start.
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-8 text-white/60 md:text-2xl md:leading-9">
            Start, mål, startnummer, bagasje, transport, publikum og annen
            viktig arrangementsinformasjon samlet på én side.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/resultater"
              className="inline-flex min-h-14 items-center justify-center bg-white px-7 text-sm font-black uppercase tracking-[0.08em] text-black transition hover:bg-white/80"
            >
              Start & resultater
            </Link>

            <Link
              href="/lopet"
              className="inline-flex min-h-14 items-center justify-center border border-white/25 px-7 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:border-white/60 hover:bg-white hover:text-black"
            >
              Se løpet
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0b0b0b]">
        <div className="mx-auto grid max-w-7xl gap-px bg-white/10 md:grid-cols-2">
          <div className="bg-[#0b0b0b] px-6 py-10 md:px-10 md:py-12">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/35">
              Start
            </p>
            <p className="mt-3 text-4xl font-black uppercase tracking-[-0.05em]">
              Fjellveien
            </p>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/48">
              Startområdet ligger ved Fjellveien. Detaljert kart, adkomst og
              årets startoppsett legges inn her.
            </p>
          </div>

          <div className="bg-[#0b0b0b] px-6 py-10 md:px-10 md:py-12">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/35">
              Mål
            </p>
            <p className="mt-3 text-4xl font-black uppercase tracking-[-0.05em]">
              Sandvikspilen
            </p>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/48">
              Målområdet ligger ved Sandvikspilen etter omtrent 900 meter og
              rundt 315 høydemeter.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#e9e8e3] text-black">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
                På løpsdagen
              </p>
              <h2 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-6xl">
                Finn det du
                <br />
                trenger raskt.
              </h2>
            </div>

            <p className="max-w-xl text-lg leading-8 text-black/58">
              Denne siden skal erstatte informasjon som tidligere har ligget
              spredt i mange forskjellige nyhetssaker. Det viktigste skal være
              lett å finne på mobil når du faktisk står på vei til løpet.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden border border-black/15 bg-black/15 md:grid-cols-2 lg:grid-cols-3">
            {practicalCards.map((card) => (
              <article key={card.title} className="min-h-60 bg-[#e9e8e3] p-7 sm:p-8">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-black/30">
                  {card.number}
                </p>
                <h3 className="mt-8 text-2xl font-black uppercase tracking-[-0.04em]">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-black/55">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="section-kicker">Kart & adkomst</p>
              <h2 className="section-title mt-4">
                Fra byen
                <br />
                til start.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-white/55">
                Her kobler vi inn et oversiktlig kart med start, mål,
                startnummerhenting, publikumsområder og relevante
                transportpunkter når den offisielle arrangementsplanen er klar.
              </p>
            </div>

            <div className="relative min-h-[480px] overflow-hidden border border-white/10 bg-[#090909] p-7 sm:p-10">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.035),transparent_50%),repeating-linear-gradient(0deg,rgba(255,255,255,0.02)_0,rgba(255,255,255,0.02)_1px,transparent_1px,transparent_34px),repeating-linear-gradient(90deg,rgba(255,255,255,0.02)_0,rgba(255,255,255,0.02)_1px,transparent_1px,transparent_34px)]" />

              <div className="relative min-h-[400px]">
                <div className="absolute left-[14%] top-[68%]">
                  <span className="block h-3 w-3 rounded-full bg-white" />
                  <p className="mt-3 text-xs font-black uppercase tracking-[0.18em]">
                    Fjellveien
                  </p>
                  <p className="mt-1 text-[11px] text-white/35">Start</p>
                </div>

                <div className="absolute right-[14%] top-[18%] text-right">
                  <span className="ml-auto block h-3 w-3 rounded-full border border-white bg-[#090909]" />
                  <p className="mt-3 text-xs font-black uppercase tracking-[0.18em]">
                    Sandvikspilen
                  </p>
                  <p className="mt-1 text-[11px] text-white/35">Mål</p>
                </div>

                <div className="absolute bottom-[24%] left-[18%] right-[18%] top-[24%] rotate-[-24deg] border-l border-dashed border-white/25" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0b0b0b]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:px-10 lg:grid-cols-2 lg:py-32">
          <div>
            <p className="section-kicker">Vær & forhold</p>
            <h2 className="section-title mt-4">
              Bergen bestemmer
              <br />
              litt også.
            </h2>
          </div>

          <div className="max-w-xl lg:pt-10">
            <p className="text-lg leading-8 text-white/58">
              Nærmere arrangementsdagen kan vi vise værvarsel og eventuelle
              beskjeder om forholdene i løypen her. Kritisk informasjon skal
              alltid komme fra arrangøren, ikke bare fra et automatisk
              værvarsel.
            </p>

            <div className="mt-8 border border-white/10 bg-white/[0.025] p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/35">
                Viktig melding
              </p>
              <p className="mt-3 text-sm leading-6 text-white/60">
                Arrangementsbeskjeder og endringer får en tydelig plass her
                når siden kobles til årets oppdateringer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e9e8e3] text-black">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
                {event.name}
              </p>
              <h2 className="mt-4 text-4xl font-black uppercase tracking-[-0.05em] sm:text-5xl">
                Mangler du fortsatt noe?
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-black/55">
                Kontaktinformasjon, presse og andre henvendelser samles i
                footer og på en egen kontaktside når innholdet migreres.
              </p>
            </div>

            <Link
              href="/pamelding"
              className="inline-flex min-h-14 items-center justify-center bg-black px-7 text-sm font-black uppercase tracking-[0.08em] text-white"
            >
              Se påmelding
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
