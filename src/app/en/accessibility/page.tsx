import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Accessibility status and ongoing improvements for the Stoltzen website.",
};

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white" lang="en">
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-36 md:px-10 md:pt-44">
        <p className="section-kicker">Inclusive access</p>
        <h1 className="mt-5 break-words text-[clamp(2.75rem,7vw,5.5rem)] font-black uppercase leading-[0.95] tracking-[-0.055em]">Accessibility</h1>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-white/80">
          We want as many people as possible to be able to use the Stoltzen website,
          regardless of ability, assistive technology or screen size.
        </p>
        <p className="mt-5 text-sm leading-7 text-white/75">
          Last reviewed: 1 November 2026. This is a preliminary accessibility status,
          not a formally certified accessibility statement.
        </p>
        <div className="mt-12 space-y-10">
          <section aria-labelledby="status-heading">
            <h2 id="status-heading" className="text-2xl font-black uppercase">Current status</h2>
            <p className="mt-4 leading-8 text-white/80">
              The website is under development. We reviewed parts of the source code and
              improved keyboard navigation, visible focus indicators, and current-page
              announcements in the navigation. A complete WCAG audit has not yet been
              performed, so we cannot confirm full conformance.
            </p>
          </section>
          <section aria-labelledby="known-heading">
            <h2 id="known-heading" className="text-2xl font-black uppercase">Areas still being checked</h2>
            <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-white/80">
              <li>Contrast in small text and labels, in light and dark themes.</li>
              <li>Screen reader and keyboard use across all pages.</li>
              <li>Readability and navigation at high zoom and narrow screen widths.</li>
              <li>Accessible result filters, tables, and interactive course charts.</li>
            </ul>
          </section>
          <section aria-labelledby="feedback-heading">
            <h2 id="feedback-heading" className="text-2xl font-black uppercase">Accessibility feedback</h2>
            <p className="mt-4 leading-8 text-white/80">
              If something on the website is difficult to use, please contact the race
              organiser through the official Stoltzekleiven Opp contact channels.
              Mention which page you were using and what did not work.
            </p>
            <Link href="/en" className="mt-6 inline-flex min-h-11 items-center border border-white/45 px-5 py-3 font-bold underline underline-offset-4 hover:bg-white hover:text-black">
              Back to the homepage
            </Link>
          </section>
        </div>
      </section>
    </main>
  );
}
