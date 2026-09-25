"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { resultYears, results } from "@/data/results";
import type { Locale } from "@/lib/i18n";

type ResultsExplorerProps = {
  locale?: Locale;
  fixedYear?: number;
};

export default function ResultsExplorer({
  locale = "no",
  fixedYear,
}: ResultsExplorerProps) {
  const en = locale === "en";
  const [query, setQuery] = useState("");
  const [year, setYear] = useState(String(fixedYear ?? 2026));
  const [className, setClassName] = useState("all");
  const [club, setClub] = useState("all");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return results.filter((result) => {
      const matchesYear = fixedYear ? result.year === fixedYear : result.year === Number(year);
      const matchesQuery =
        !normalized ||
        result.name.toLowerCase().includes(normalized) ||
        result.bib.toLowerCase().includes(normalized);
      const matchesClass = className === "all" || result.className === className;
      const matchesClub = club === "all" || result.club === club;

      return matchesYear && matchesQuery && matchesClass && matchesClub;
    });
  }, [query, year, className, club, fixedYear]);

  const selectedYear = fixedYear ?? Number(year);

  return (
    <div className="border border-white/10 bg-white/[0.025] p-5 sm:p-7">
      <div className="grid gap-3 lg:grid-cols-[1.6fr_0.7fr_0.8fr_0.8fr_auto]">
        <label className="block">
          <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-white/35">
            {en ? "Name or bib" : "Navn eller startnummer"}
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={en ? "Search runner..." : "Søk etter løper..."}
            className="min-h-13 w-full border border-white/15 bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/45"
          />
        </label>

        {!fixedYear && (
          <label className="block">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-white/35">
              {en ? "Year" : "År"}
            </span>
            <select
              value={year}
              onChange={(event) => setYear(event.target.value)}
              className="min-h-13 w-full border border-white/15 bg-[#0b0b0b] px-4 text-sm text-white outline-none focus:border-white/45"
            >
              {resultYears.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        )}

        <label className="block">
          <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-white/35">
            {en ? "Class" : "Klasse"}
          </span>
          <select
            value={className}
            onChange={(event) => setClassName(event.target.value)}
            className="min-h-13 w-full border border-white/15 bg-[#0b0b0b] px-4 text-sm text-white outline-none focus:border-white/45"
          >
            <option value="all">{en ? "All classes" : "Alle klasser"}</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-white/35">
            {en ? "Club" : "Klubb"}
          </span>
          <select
            value={club}
            onChange={(event) => setClub(event.target.value)}
            className="min-h-13 w-full border border-white/15 bg-[#0b0b0b] px-4 text-sm text-white outline-none focus:border-white/45"
          >
            <option value="all">{en ? "All clubs" : "Alle klubber"}</option>
          </select>
        </label>

        <div className="flex items-end">
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setClassName("all");
              setClub("all");
              if (!fixedYear) setYear("2026");
            }}
            className="min-h-13 w-full border border-white/15 px-5 text-xs font-black uppercase tracking-[0.12em] text-white/65 transition hover:border-white/45 hover:text-white"
          >
            {en ? "Reset" : "Nullstill"}
          </button>
        </div>
      </div>

      <div className="mt-7 border-t border-white/10 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/30">
              {en ? "Results" : "Resultater"}
            </p>
            <p className="mt-2 text-sm text-white/55">
              {en
                ? `${filtered.length} results shown for ${selectedYear}`
                : `${filtered.length} resultater vist for ${selectedYear}`}
            </p>
          </div>

          {!fixedYear && (
            <Link
              href={en ? `/en/results/${selectedYear}` : `/resultater/${selectedYear}`}
              className="text-xs font-black uppercase tracking-[0.12em] text-white/65 transition hover:text-white"
            >
              {en ? "Open year page →" : "Åpne årsside →"}
            </Link>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-6 border border-dashed border-white/15 px-6 py-12 text-center">
            <p className="text-lg font-black uppercase tracking-[-0.025em]">
              {en ? "Result database not connected yet" : "Resultatdatabasen er ikke koblet til ennå"}
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/45">
              {en
                ? "The search interface is ready. Official historical and current results will appear here once the existing data has been imported."
                : "Søkegrensesnittet er klart. Offisielle historiske og nye resultater vises her når eksisterende resultatdata er importert."}
            </p>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[10px] font-black uppercase tracking-[0.18em] text-white/35">
                  <th className="px-3 py-3">{en ? "Place" : "Plass"}</th>
                  <th className="px-3 py-3">{en ? "Runner" : "Løper"}</th>
                  <th className="px-3 py-3">{en ? "Bib" : "Startnr."}</th>
                  <th className="px-3 py-3">{en ? "Class" : "Klasse"}</th>
                  <th className="px-3 py-3">{en ? "Club" : "Klubb"}</th>
                  <th className="px-3 py-3">{en ? "Time" : "Tid"}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((result) => (
                  <tr key={result.id} className="border-b border-white/10 text-white/75">
                    <td className="px-3 py-4 font-black">{result.placing}</td>
                    <td className="px-3 py-4 font-bold">{result.name}</td>
                    <td className="px-3 py-4 text-white/45">{result.bib}</td>
                    <td className="px-3 py-4 text-white/55">{result.className}</td>
                    <td className="px-3 py-4 text-white/55">{result.club}</td>
                    <td className="px-3 py-4 font-black">{result.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
