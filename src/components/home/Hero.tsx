import Link from "next/link";
import { event } from "@/data/event";
import type { EventPhase } from "@/lib/event-phase";
import { getPhaseContent } from "@/lib/event-phase";

export default function Hero({ phase }: { phase: EventPhase }) {
  const content = getPhaseContent(phase);

  return (
    <section className="hero-surface relative min-h-[92svh] overflow-hidden bg-[#080808] text-white">
      <div className="hero-grid absolute inset-0 opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_36%,rgba(255,255,255,0.14),transparent_24%),linear-gradient(to_top,rgba(0,0,0,0.96),rgba(0,0,0,0.15)_55%,rgba(0,0,0,0.42))]" />
      <div className="pointer-events-none absolute -right-8 top-[18%] hidden select-none text-[20vw] font-black leading-none tracking-[-0.09em] text-white/[0.035] lg:block">
        801
      </div>

      <div className="relative mx-auto flex min-h-[92svh] max-w-[1500px] items-end px-6 pb-16 pt-36 sm:px-8 md:pb-24 lg:px-10">
        <div className="max-w-5xl">
          <div className="mb-6 inline-flex items-center gap-3 border border-white/15 bg-black/30 px-4 py-2 backdrop-blur-md">
            <span className={`h-2 w-2 rounded-full ${phase === "live" ? "animate-pulse bg-white" : "bg-white/45"}`} />
            <span className="text-xs font-black uppercase tracking-[0.22em] text-white/75">
              {content.eyebrow}
            </span>
          </div>

          <p className="mb-4 text-xs font-bold uppercase tracking-[0.34em] text-white/55 sm:text-sm">
            {event.location} · {event.dateLabel}
          </p>

          <h1 className="max-w-5xl text-[clamp(3.7rem,10vw,9rem)] font-black uppercase leading-[0.78] tracking-[-0.075em]">
            Stoltze
            <br />
            kleiven Opp
          </h1>

          <p className="mt-8 max-w-2xl text-xl font-semibold leading-tight text-white/90 sm:text-2xl md:text-3xl">
            801 trinn. 315 høydemeter.
            <br />
            Én vei opp.
          </p>

          <p className="mt-5 text-sm font-medium text-white/55">{content.status}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href={content.primaryHref}
              className="inline-flex min-h-14 items-center justify-center bg-white px-7 text-sm font-black uppercase tracking-[0.08em] text-black transition hover:bg-white/80"
            >
              {content.primaryLabel}
            </Link>
            <Link
              href={event.links.latestResults}
              className="inline-flex min-h-14 items-center justify-center border border-white/25 bg-black/20 px-7 text-sm font-black uppercase tracking-[0.08em] text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-white hover:text-black"
            >
              Resultater {event.year}
            </Link>
            <Link
              href={event.links.gallery}
              className="inline-flex min-h-14 items-center justify-center border border-white/25 px-7 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:border-white/60"
            >
              Se bilder
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
