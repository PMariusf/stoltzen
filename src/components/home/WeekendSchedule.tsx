import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export default function WeekendSchedule({
  locale = "no",
}: {
  locale?: Locale;
}) {
  const en = locale === "en";

  const days = en
    ? [
        {
          day: "Friday",
          date: "25 September",
          items: [
            ["Bib pickup", "08:15–18:00"],
            ["Race day", "See start list"],
          ],
        },
        {
          day: "Saturday",
          date: "26 September",
          items: [
            ["Bib pickup", "08:15–18:00"],
            ["Seeded group", "From 13:10"],
          ],
        },
      ]
    : [
        {
          day: "Fredag",
          date: "25. september",
          items: [
            ["Henting av startnummer", "08:15–18:00"],
            ["Løpsdag", "Se startliste"],
          ],
        },
        {
          day: "Lørdag",
          date: "26. september",
          items: [
            ["Henting av startnummer", "08:15–18:00"],
            ["Seedet gruppe", "Fra 13:10"],
          ],
        },
      ];

  return (
    <section className="border-b border-white/10 bg-[#0d0d0d] text-white">
      <div className="mx-auto max-w-7xl px-5 pb-14 pt-16 sm:px-6 md:px-10 md:pb-20 md:pt-24">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:items-start">
          <div>
            <p className="section-kicker">
              {en ? "This weekend" : "Denne helgen"}
            </p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-[0.92] tracking-[-0.055em] sm:text-5xl">
              {en ? (
                <>Stoltzen<br />2026.</>
              ) : (
                <>Stoltzehelgen<br />2026.</>
              )}
            </h2>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {days.map((day) => (
              <article
                key={day.day}
                className="border border-white/10 bg-white/[0.025] p-5 sm:p-6"
              >
                <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">
                      {day.day}
                    </p>
                    <p className="mt-1 text-2xl font-black tracking-[-0.04em]">
                      {day.date}
                    </p>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-white/70" />
                </div>

                <div className="divide-y divide-white/10">
                  {day.items.map(([label, time]) => (
                    <div
                      key={label}
                      className="flex items-start justify-between gap-4 py-4 sm:items-center sm:gap-5"
                    >
                      <span className="max-w-[58%] text-sm leading-5 text-white/50">{label}</span>
                      <span className="shrink-0 text-right text-xs font-black uppercase tracking-[0.08em] text-white sm:text-sm">
                        {time}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6">
          <Link
            href={en ? "/en/results/2026" : "/resultater/2026"}
            className="text-link inline-flex"
          >
            {en ? "Start & results" : "Start & resultater"}{" "}
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            href={en ? "/en/practical-info" : "/praktisk-info"}
            className="text-xs font-black uppercase tracking-[0.14em] text-white/40 transition hover:text-white"
          >
            {en ? "Practical info" : "Praktisk info"}
          </Link>
          <p className="w-full text-left text-xs leading-5 text-white/28 sm:ml-auto sm:w-auto sm:text-right">
            {en
              ? "Individual start times are shown in the start list."
              : "Personlig starttid finner du i startlisten."}
          </p>
        </div>
      </div>
    </section>
  );
}
