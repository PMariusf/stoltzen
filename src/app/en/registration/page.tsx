import type { Metadata } from "next";
import Link from "next/link";
import { registration } from "@/data/registration";

export const metadata: Metadata = {
  title: "Registration",
  description:
    "Registration for Stoltzekleiven Opp – individual entry, groups, seeded group, key dates, waiting list, changes and FAQ.",
};

const options = [
  {
    title: "Individual registration",
    label: "Individual",
    text: "For runners entering on their own. Price, classes and opening time will be updated when the next registration is ready.",
  },
  {
    title: "Group registration",
    label: "Group",
    text: "For teams, companies and other groups. Capacity, deadlines and rules will be presented as structured information.",
  },
  {
    title: "Seeded group",
    label: "Seeded",
    text: "Criteria, documentation and seeded-group placement will be collected here.",
  },
];

export default function RegistrationPage() {
  return (
    <main className="bg-[#080808] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.09),transparent_24%),linear-gradient(145deg,#171717,#070707_60%)]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44">
          <p className="section-kicker">Registration</p>
          <h1 className="mt-5 max-w-5xl text-[clamp(4rem,10vw,8.5rem)] font-black uppercase leading-[0.8] tracking-[-0.075em]">
            Ready for the
            <br />
            next Stoltzen?
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-8 text-white/60 md:text-2xl md:leading-9">
            Individual registration, groups, seeded entry, prices, deadlines,
            changes and waiting-list information in one place.
          </p>

          <div className="mt-10 max-w-3xl border border-white/15 bg-white/[0.035] p-6 sm:p-7">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/35">Status</p>
            <p className="mt-2 text-2xl font-black uppercase tracking-[-0.04em]">2026 is sold out</p>
            <p className="mt-2 text-sm leading-6 text-white/50">
              Registration information for {registration.nextYear} will appear here as soon as the date and time are confirmed.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#e9e8e3] text-black">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">Choose entry type</p>
          <h2 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            Three clear
            <br />
            ways in.
          </h2>

          <div className="mt-14 grid gap-3 lg:grid-cols-3">
            {options.map((option) => (
              <article key={option.label} className="flex min-h-[340px] flex-col justify-between border border-black/15 bg-white/35 p-7 sm:p-8">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-black/35">{option.label}</p>
                  <h3 className="mt-9 text-3xl font-black uppercase leading-[0.95] tracking-[-0.05em]">{option.title}</h3>
                  <p className="mt-5 text-sm leading-6 text-black/55">{option.text}</p>
                </div>

                <div className="mt-10 border-t border-black/15 pt-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-black/35">Price / age</p>
                  <p className="mt-2 text-sm font-bold">Published when confirmed</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#101010]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:py-32">
          <div>
            <p className="section-kicker">Key dates</p>
            <h2 className="section-title mt-4">
              Know when
              <br />
              it happens.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-white/55">
              Registration can fill extremely quickly, so opening date, time
              and live status should be among the first things you see.
            </p>
          </div>

          <div className="border-t border-white/10">
            {[
              ["Registration opens", "Date to come"],
              ["Changes deadline", "Date to come"],
              ["Race weekend", "Date to come"],
            ].map(([label, value], index) => (
              <div key={label} className="grid gap-4 border-b border-white/10 py-7 sm:grid-cols-[44px_1fr_auto] sm:items-center">
                <span className="text-xs font-black text-white/25">{String(index + 1).padStart(2, "0")}</span>
                <p className="text-lg font-black uppercase tracking-[-0.025em]">{label}</p>
                <p className="text-sm font-black uppercase tracking-[0.08em] text-white/65">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#151515]">
        <div className="mx-auto max-w-5xl px-6 py-24 md:px-10 lg:py-32">
          <p className="section-kicker">FAQ</p>
          <h2 className="section-title mt-4">Frequently asked questions.</h2>

          <div className="mt-12 border-t border-white/10">
            {[
              ["When does registration open?", "The opening date and time for the next race will be published here once confirmed."],
              ["What if the race is full?", "Waiting-list and remaining-place information will be shown here when relevant."],
              ["Can I change the runner?", "Rules and deadlines for name changes will be published for each event."],
              ["Where do I find my bib number?", "Once the start list is published, you will find it under Start & results."],
            ].map(([question, answer]) => (
              <details key={question} className="group border-b border-white/10">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="text-lg font-black uppercase tracking-[-0.03em]">{question}</span>
                  <span className="text-2xl font-light text-white/40 transition group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-3xl pb-7 text-sm leading-7 text-white/50">{answer}</p>
              </details>
            ))}
          </div>

          <Link href="/en/results" className="text-link mt-10 inline-flex">
            Start & results <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
