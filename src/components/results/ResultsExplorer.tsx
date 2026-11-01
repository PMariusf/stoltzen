"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";

type ResultsExplorerProps = {
  locale?: Locale;
  fixedYear?: number;
};

type ResultSearchRow = {
  result_id: number;
  runner_id: number | null;
  legacy_id: number | null;
  result_source: "archive" | "verified_2026" | "verified_2025";
  year: number;
  bib: string | null;
  class_name: string | null;
  club_original: string | null;
  place_rank: number | null;
  finish_time_text: string | null;
  finish_time_seconds: number | null;
  name: string;
  gender_class: string | null;
  personal_best_text: string | null;
  personal_best_year: number | null;
  participation_count: number | null;
};

type FilterOptionRow = {
  year: number;
  class_name: string | null;
  club_original: string | null;
};

const PAGE_SIZE = 50;
type SortMode = "newest" | "fastest" | "name" | "place";

const sortOrders: Record<SortMode, string> = {
  newest: "year.desc,finish_time_seconds.asc.nullslast,name.asc",
  fastest: "finish_time_seconds.asc.nullslast,year.desc,name.asc",
  name: "name.asc,year.desc",
  place: "place_rank.asc.nullslast,year.desc,finish_time_seconds.asc.nullslast",
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

function getHeaders(withCount = false) {
  if (!supabaseKey) return {};

  return {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    ...(withCount ? { Prefer: "count=exact" } : {}),
  };
}

function parseTotal(contentRange: string | null, fallback: number) {
  if (!contentRange) return fallback;
  const total = contentRange.split("/")[1];
  const parsed = Number(total);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function safeSearchTerm(value: string) {
  return value
    .replace(/[,*()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function ResultsExplorer({
  locale = "no",
  fixedYear,
}: ResultsExplorerProps) {
  const en = locale === "en";
  const configured = Boolean(supabaseUrl && supabaseKey);
  const configurationError = configured
    ? null
    : en
      ? "Supabase is not configured for this environment."
      : "Supabase er ikke konfigurert for dette miljøet.";

  const [query, setQuery] = useState("");
  const [urlReady, setUrlReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const [year, setYear] = useState(fixedYear ? String(fixedYear) : "all");
  const [className, setClassName] = useState("all");
  const [club, setClub] = useState("all");
  const [rows, setRows] = useState<ResultSearchRow[]>([]);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<SortMode>("newest");
  const [years, setYears] = useState<number[]>([]);
  const [filterRows, setFilterRows] = useState<FilterOptionRow[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(configured);
  const [filterLoading, setFilterLoading] = useState(configured);
  const [error, setError] = useState<string | null>(null);

  const selectedYear = fixedYear ? String(fixedYear) : year;

  useEffect(() => {
    function restoreFilters() {
      const params = new URLSearchParams(window.location.search);
      const requestedYear = params.get("year");
      const requestedSort = params.get("sort");
      const requestedPage = Number(params.get("page") ?? "1");
      setQuery((params.get("q") ?? "").slice(0, 120));
      if (!fixedYear) setYear(requestedYear && /^\\d{4}$/.test(requestedYear) ? requestedYear : "all");
      setClassName(params.get("class") || "all");
      setClub(params.get("club") || "all");
      setSort(requestedSort && Object.prototype.hasOwnProperty.call(sortOrders, requestedSort) ? requestedSort as SortMode : "newest");
      setPage(Number.isSafeInteger(requestedPage) && requestedPage > 0 ? Math.min(requestedPage - 1, 9999) : 0);
    }
    restoreFilters();
    setUrlReady(true);
    window.addEventListener("popstate", restoreFilters);
    return () => window.removeEventListener("popstate", restoreFilters);
  }, [fixedYear]);

  useEffect(() => {
    if (!urlReady) return;
    const url = new URL(window.location.href);
    const params = url.searchParams;
    for (const key of ["q", "year", "class", "club", "sort", "page"]) params.delete(key);
    if (query.trim()) params.set("q", query.trim());
    if (!fixedYear && year !== "all") params.set("year", year);
    if (className !== "all") params.set("class", className);
    if (club !== "all") params.set("club", club);
    if (sort !== "newest") params.set("sort", sort);
    if (page > 0) params.set("page", String(page + 1));
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    setCopied(false);
  }, [urlReady, query, year, className, club, sort, page, fixedYear]);

  async function copySearchLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const classOptions = useMemo(
    () =>
      [...new Set(filterRows.map((row) => row.class_name).filter(Boolean))]
        .sort((a, b) => a!.localeCompare(b!, locale === "en" ? "en" : "nb")) as string[],
    [filterRows, locale],
  );

  const clubOptions = useMemo(
    () =>
      [...new Set(filterRows.map((row) => row.club_original).filter(Boolean))]
        .sort((a, b) => a!.localeCompare(b!, locale === "en" ? "en" : "nb")) as string[],
    [filterRows, locale],
  );

  useEffect(() => {
    if (!supabaseUrl || !supabaseKey) return;

    let cancelled = false;

    async function loadYears() {
      const params = new URLSearchParams({
        select: "year",
        order: "year.desc",
      });

      const response = await fetch(
        `${supabaseUrl}/rest/v1/result_years?${params.toString()}`,
        { headers: getHeaders() },
      );

      if (!response.ok) {
        throw new Error(`Could not load result years (${response.status})`);
      }

      const data = (await response.json()) as { year: number }[];
      if (!cancelled) setYears(data.map((item) => item.year));
    }

    loadYears().catch((loadError) => {
      if (!cancelled) setError(loadError.message);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!supabaseUrl || !supabaseKey) return;

    let cancelled = false;

    async function loadFilterOptions() {
      const params = new URLSearchParams({
        select: "year,class_name,club_original",
        order: "year.desc",
        limit: "5000",
      });

      if (selectedYear !== "all") {
        params.set("year", `eq.${selectedYear}`);
      }

      const response = await fetch(
        `${supabaseUrl}/rest/v1/result_filter_options?${params.toString()}`,
        { headers: getHeaders() },
      );

      if (!response.ok) {
        throw new Error(`Could not load result filters (${response.status})`);
      }

      const data = (await response.json()) as FilterOptionRow[];

      if (!cancelled) {
        setFilterRows(data);
        setFilterLoading(false);
      }
    }

    loadFilterOptions().catch((loadError) => {
      if (!cancelled) {
        setError(loadError.message);
        setFilterLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [selectedYear]);

  useEffect(() => {
    if (!supabaseUrl || !supabaseKey || !urlReady) return;

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          select:
            "result_id,runner_id,legacy_id,year,bib,class_name,club_original,place_rank,finish_time_text,finish_time_seconds,name,gender_class,personal_best_text,personal_best_year,participation_count,result_source",
          order: sortOrders[sort],
          limit: String(PAGE_SIZE),
          offset: String(page * PAGE_SIZE),
        });

        if (selectedYear !== "all") {
          params.set("year", `eq.${selectedYear}`);
        }

        if (className !== "all") {
          params.set("class_name", `eq.${className}`);
        }

        if (club !== "all") {
          params.set("club_original", `eq.${club}`);
        }

        const searchTerm = safeSearchTerm(query);
        if (searchTerm) {
          params.set(
            "or",
            `(name.ilike.*${searchTerm}*,bib.ilike.*${searchTerm}*)`,
          );
        }

        const response = await fetch(
          `${supabaseUrl}/rest/v1/result_search_combined?${params.toString()}`,
          {
            headers: getHeaders(true),
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          const body = await response.text();
          throw new Error(
            `Supabase result search failed (${response.status}): ${body}`,
          );
        }

        const data = (await response.json()) as ResultSearchRow[];

        setRows(data);
        setTotalCount(
          parseTotal(response.headers.get("content-range"), data.length),
        );
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === "AbortError") {
          return;
        }

        setRows([]);
        setTotalCount(0);
        setError(
          loadError instanceof Error
            ? loadError.message
            : en
              ? "Could not load results."
              : "Kunne ikke laste resultater.",
        );
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query, selectedYear, className, club, en, page, sort, urlReady]);

  const selectedYearLabel =
    selectedYear === "all"
      ? en
        ? "all years"
        : "alle år"
      : selectedYear;

  return (
    <div className="border border-white/10 bg-white/[0.025] p-5 sm:p-7">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/35">
            {en ? "Live database" : "Tilkoblet database"}
          </p>
          <p className="mt-2 text-sm text-white/55">
            {en
              ? "Supabase is connected. Historical results are being migrated in stages."
              : "Supabase er koblet til. Historiske resultater migreres inn trinnvis."}
          </p>
        </div>
        <span className="border border-white/15 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/45">
          {en ? "Migration preview" : "Migrering · testdata"}
        </span>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.4fr_0.65fr_0.8fr_0.8fr_0.8fr_auto]">
        <label className="block">
          <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-white/35">
            {en ? "Name or bib" : "Navn eller startnummer"}
          </span>
          <input
            value={query}
            onChange={(event) => { setPage(0); setQuery(event.target.value); }}
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
              onChange={(event) => {
                setFilterLoading(true);
                setPage(0);
                setYear(event.target.value);
                setClassName("all");
                setClub("all");
              }}
              className="min-h-13 w-full border border-white/15 bg-[#0b0b0b] px-4 text-sm text-white outline-none focus:border-white/45"
            >
              <option value="all">{en ? "All years" : "Alle år"}</option>
              {years.map((item) => (
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
            onChange={(event) => { setPage(0); setClassName(event.target.value); }}
            disabled={filterLoading}
            className="min-h-13 w-full border border-white/15 bg-[#0b0b0b] px-4 text-sm text-white outline-none focus:border-white/45 disabled:opacity-50"
          >
            <option value="all">{en ? "All classes" : "Alle klasser"}</option>
            {classOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-white/35">
            {en ? "Club" : "Klubb"}
          </span>
          <select
            value={club}
            onChange={(event) => { setPage(0); setClub(event.target.value); }}
            disabled={filterLoading}
            className="min-h-13 w-full border border-white/15 bg-[#0b0b0b] px-4 text-sm text-white outline-none focus:border-white/45 disabled:opacity-50"
          >
            <option value="all">{en ? "All clubs" : "Alle klubber"}</option>
            {clubOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-white/35">
            {en ? "Sort by" : "Sorter etter"}
          </span>
          <select
            value={sort}
            onChange={(event) => { setPage(0); setSort(event.target.value as SortMode); }}
            className="min-h-13 w-full border border-white/15 bg-[#0b0b0b] px-4 text-sm text-white outline-none focus:border-white/45"
          >
            <option value="newest">{en ? "Newest year" : "Nyeste år"}</option>
            <option value="fastest">{en ? "Fastest time" : "Raskeste tid"}</option>
            <option value="name">{en ? "Name A–Z" : "Navn A–Å"}</option>
            <option value="place">{en ? "Best placing" : "Beste plassering"}</option>
          </select>
        </label>
        <div className="flex items-end">
          <button
            type="button"
            onClick={() => {
              setPage(0);
              setSort("newest");
              setQuery("");
              setClassName("all");
              setClub("all");
              if (!fixedYear) {
                setFilterLoading(true);
                setYear("all");
              }
            }}
            className="min-h-13 w-full border border-white/15 px-5 text-xs font-black uppercase tracking-[0.12em] text-white/65 transition hover:border-white/45 hover:text-white"
          >
            {en ? "Reset" : "Nullstill"}
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button type="button" onClick={copySearchLink} className="min-h-11 border border-white/15 px-4 text-xs font-bold uppercase tracking-wider text-white/75 transition hover:border-white/50 hover:text-white" aria-live="polite">
          {copied ? (en ? "Link copied" : "Lenke kopiert") : (en ? "Copy search link" : "Kopier søkelenke")}
        </button>
      </div>

      <div className="mt-7 border-t border-white/10 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/30">
              {en ? "Results" : "Resultater"}
            </p>
            <p className="mt-2 text-sm text-white/55">
              {loading
                ? en
                  ? "Loading results..."
                  : "Laster resultater..."
                : en
                  ? `${totalCount} results found for ${selectedYearLabel}`
                  : `${totalCount} resultater funnet for ${selectedYearLabel}`}
            </p>
          </div>

          {!fixedYear && selectedYear !== "all" && (
            <Link
              href={
                en
                  ? `/en/results/${selectedYear}`
                  : `/resultater/${selectedYear}`
              }
              className="text-xs font-black uppercase tracking-[0.12em] text-white/65 transition hover:text-white"
            >
              {en ? "Open year page →" : "Åpne årsside →"}
            </Link>
          )}
        </div>

        {configurationError || error ? (
          <div className="mt-6 border border-red-300/20 bg-red-300/[0.04] px-6 py-8">
            <p className="font-black uppercase tracking-[-0.02em]">
              {en ? "Could not load results" : "Kunne ikke laste resultater"}
            </p>
            <p className="mt-2 break-words text-sm leading-6 text-white/45">
              {configurationError ?? error}
            </p>
          </div>
        ) : loading ? (
          <div className="mt-6 grid gap-2">
            {[0, 1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-14 animate-pulse border border-white/5 bg-white/[0.025]"
              />
            ))}
          </div>
        ) : rows.length === 0 ? (
          <div className="mt-6 border border-dashed border-white/15 px-6 py-12 text-center">
            <p className="text-lg font-black uppercase tracking-[-0.025em]">
              {en ? "No results found" : "Ingen resultater funnet"}
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/45">
              {en
                ? "Try another name, year, class or club. More historical results will appear as the archive migration continues."
                : "Prøv et annet navn, år, klasse eller klubb. Flere historiske resultater kommer inn etter hvert som arkivet migreres."}
            </p>
          </div>
        ) : (
          <>
            <div className="mt-6 grid gap-3 md:hidden">
              {rows.map((result) => (
                <article key={result.result_id} className="border border-white/15 bg-white/[0.035] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      {result.legacy_id === null ? (
                        <span className="text-base font-bold text-white">{result.name}</span>
                      ) : (
                        <Link href={en ? `/en/profile/${result.legacy_id}` : `/profil/${result.legacy_id}`} className="text-base font-bold text-white underline-offset-4 hover:underline">
                          {result.name}
                        </Link>
                      )}
                      {result.result_source !== "archive" && (
                        <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-amber-300">{en ? "Imported result · profile pending" : "Importert resultat · profil ikke koblet"}</span>
                      )}
                      <p className="mt-1 text-xs text-white/50">{result.club_original ?? (en ? "No club" : "Ingen klubb")} · {result.class_name ?? result.gender_class ?? "—"}</p>
                    </div>
                    <span className="shrink-0 text-xl font-black text-white">{result.finish_time_text ?? "—"}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-3 text-xs text-white/60">
                    <span>{en ? "Year" : "År"}: {result.year}</span>
                    <span>{en ? "Place" : "Plass"}: {result.place_rank ?? "—"}</span>
                    <span>{en ? "Bib" : "Startnr."}: {result.bib ?? "—"}</span>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-6 hidden overflow-x-auto md:block">
              <table className="w-full min-w-[860px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] font-black uppercase tracking-[0.18em] text-white/35">
                    {!fixedYear && <th className="px-3 py-3">{en ? "Year" : "År"}</th>}
                    <th className="px-3 py-3">{en ? "Place" : "Plass"}</th>
                    <th className="px-3 py-3">{en ? "Runner" : "Løper"}</th>
                    <th className="px-3 py-3">{en ? "Bib" : "Startnr."}</th>
                    <th className="px-3 py-3">{en ? "Class" : "Klasse"}</th>
                    <th className="px-3 py-3">{en ? "Club" : "Klubb"}</th>
                    <th className="px-3 py-3">{en ? "Time" : "Tid"}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((result) => (
                    <tr
                      key={result.result_id}
                      className="border-b border-white/10 text-white/75"
                    >
                      {!fixedYear && (
                        <td className="px-3 py-4 text-white/45">{result.year}</td>
                      )}
                      <td className="px-3 py-4 font-black">
                        {result.place_rank ?? "—"}
                      </td>
                      <td className="px-3 py-4">
                        {result.legacy_id === null ? (
                          <>
                            <span className="font-bold">{result.name}</span>
                            <span className="mt-1 block text-[10px] uppercase tracking-[0.12em] text-amber-300/80">{en ? "Imported result · no profile link" : "Importert resultat · uten profilkobling"}</span>
                          </>
                        ) : (
                          <>
                            <Link
                              href={en ? `/en/profile/${result.legacy_id}` : `/profil/${result.legacy_id}`}
                              className="font-bold transition hover:text-white hover:underline hover:underline-offset-4"
                            >{result.name}</Link>
                            <span className="mt-1 block text-[10px] uppercase tracking-[0.14em] text-white/25">ID {result.legacy_id}</span>
                          </>
                        )}
                      </td>
                      <td className="px-3 py-4 text-white/45">
                        {result.bib ?? "—"}
                      </td>
                      <td className="px-3 py-4 text-white/55">
                        {result.class_name ?? result.gender_class ?? "—"}
                      </td>
                      <td className="px-3 py-4 text-white/55">
                        {result.club_original ?? "—"}
                      </td>
                      <td className="px-3 py-4 font-black">
                        {result.finish_time_text ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <nav aria-label={en ? "Results pages" : "Resultatsider"} className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-white/45" aria-live="polite">
                {en
                  ? `Showing ${page * PAGE_SIZE + 1}–${page * PAGE_SIZE + rows.length} of ${totalCount} matches`
                  : `Viser ${page * PAGE_SIZE + 1}–${page * PAGE_SIZE + rows.length} av ${totalCount} treff`}
              </p>
              <div className="flex items-center gap-3">
                <button type="button" disabled={page === 0} onClick={() => setPage((value) => Math.max(0, value - 1))} className="min-h-11 border border-white/20 px-4 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-30">
                  {en ? "Previous" : "Forrige"}
                </button>
                <span className="text-xs text-white/55">
                  {en ? "Page" : "Side"} {page + 1} / {Math.max(1, Math.ceil(totalCount / PAGE_SIZE))}
                </span>
                <button type="button" disabled={(page + 1) * PAGE_SIZE >= totalCount} onClick={() => setPage((value) => value + 1)} className="min-h-11 border border-white/20 px-4 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-30">
                  {en ? "Next" : "Neste"}
                </button>
              </div>
            </nav>
          </>
        )}
      </div>
    </div>
  );
}
