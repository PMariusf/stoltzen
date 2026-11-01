import { cache } from "react";

export type ArchiveResult = {
  result_id: number;
  legacy_id: number;
  name: string;
  year: number;
  finish_time_seconds: number | null;
  finish_time_text: string | null;
  class_name: string | null;
  gender_class: string | null;
};

type StatisticsData = {
  results: ArchiveResult[];
  resultCount: number;
  runnerCount: number;
  years: { year: number; count: number }[];
  fastest: ArchiveResult[];
  frequent: { legacyId: number; name: string; count: number }[];
  limited: boolean;
  classes: { name: string; count: number; fastest: ArchiveResult | null }[];
};

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const LIMIT = 1000;

// Only public data. Do not use a secret or service-role key here.
export const getArchiveStatistics = cache(async (): Promise<StatisticsData> => {
  if (!url || !key) throw new Error("Supabase er ikke konfigurert.");
  const params = new URLSearchParams({
    select: "result_id,legacy_id,name,year,finish_time_seconds,finish_time_text,class_name,gender_class",
    order: "year.desc",
    limit: String(LIMIT),
  });
  const response = await fetch(`${url}/rest/v1/result_search?${params.toString()}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}`, Prefer: "count=exact" },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Unable to load archive statistics (${response.status})`);
  const results = (await response.json()) as ArchiveResult[];
  const totalHeader = Number(response.headers.get("content-range")?.split("/")[1]);
  const limited = Number.isFinite(totalHeader) && totalHeader > results.length;
  const yearsMap = new Map<number, number>();
  const classMap = new Map<string, { name: string; count: number; fastest: ArchiveResult | null }>();
  const runners = new Map<number, { legacyId: number; name: string; count: number }>();
  for (const result of results) {
    yearsMap.set(result.year, (yearsMap.get(result.year) ?? 0) + 1);
    const className = result.class_name || result.gender_class || "Ukjent";
    const currentClass = classMap.get(className) ?? { name: className, count: 0, fastest: null };
    currentClass.count++;
    if (result.finish_time_seconds !== null && result.finish_time_seconds > 0 &&
      (!currentClass.fastest || (currentClass.fastest.finish_time_seconds ?? Infinity) > result.finish_time_seconds)) {
      currentClass.fastest = result;
    }
    classMap.set(className, currentClass);
    const previous = runners.get(result.legacy_id);
    runners.set(result.legacy_id, {
      legacyId: result.legacy_id,
      name: result.name,
      count: (previous?.count ?? 0) + 1,
    });
  }
  return {
    results,
    resultCount: results.length,
    runnerCount: runners.size,
    years: [...yearsMap.entries()].map(([year, count]) => ({ year, count })).sort((a, b) => a.year - b.year),
    fastest: results.filter((result) => result.finish_time_seconds !== null && result.finish_time_seconds > 0)
      .sort((a, b) => a.finish_time_seconds! - b.finish_time_seconds! || a.year - b.year).slice(0, 10),
    frequent: [...runners.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "nb")).slice(0, 10),
    limited,
    classes: [...classMap.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "nb")),
  };
});

export type { StatisticsData };
