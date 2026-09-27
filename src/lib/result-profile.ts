import { cache } from "react";

export type RunnerProfileResult = {
  resultId: number;
  year: number;
  bib: string | null;
  className: string | null;
  club: string | null;
  placeRank: number | null;
  timeText: string | null;
  timeSeconds: number | null;
  finishTimeText: string | null;
  finishTimeSeconds: number | null;
  split1Text: string | null;
  split1Seconds: number | null;
  split2Text: string | null;
  split2Seconds: number | null;
  split3Text: string | null;
  split3Seconds: number | null;
};

export type RunnerProfileData = {
  runnerId: number;
  legacyId: number;
  name: string;
  genderClass: string | null;
  participationCount: number | null;
  personalBestText: string | null;
  personalBestSeconds: number | null;
  personalBestYear: number | null;
  latestTimeText: string | null;
  latestTimeSeconds: number | null;
  latestTimeYear: number | null;
  trend: string | null;
  clubCurrent: string | null;
  results: RunnerProfileResult[];
};

type ProfileRow = {
  runner_id: number;
  legacy_id: number;
  name: string;
  gender_class: string | null;
  participation_count: number | null;
  personal_best_text: string | null;
  personal_best_seconds: number | null;
  personal_best_year: number | null;
  latest_time_text: string | null;
  latest_time_seconds: number | null;
  latest_time_year: number | null;
  trend: string | null;
  club_current: string | null;
  result_id: number | null;
  year: number | null;
  bib: string | null;
  class_name: string | null;
  club_original: string | null;
  place_rank: number | null;
  time_text: string | null;
  time_seconds: number | null;
  finish_time_text: string | null;
  finish_time_seconds: number | null;
  split_1_text: string | null;
  split_1_seconds: number | null;
  split_2_text: string | null;
  split_2_seconds: number | null;
  split_3_text: string | null;
  split_3_seconds: number | null;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const getRunnerProfile = cache(
  async (legacyId: number): Promise<RunnerProfileData | null> => {
    if (!Number.isInteger(legacyId) || legacyId <= 0) return null;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        "Supabase configuration is missing. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
      );
    }

    const params = new URLSearchParams({
      select: "*",
      legacy_id: `eq.${legacyId}`,
      order: "year.desc.nullslast",
    });

    const response = await fetch(
      `${supabaseUrl}/rest/v1/runner_profile_results?${params.toString()}`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const body = await response.text();
      throw new Error(
        `Could not load StoltzeProfil (${response.status}): ${body}`,
      );
    }

    const rows = (await response.json()) as ProfileRow[];
    if (!rows.length) return null;

    const runner = rows[0];

    const results = rows
      .filter(
        (row): row is ProfileRow & { result_id: number; year: number } =>
          row.result_id !== null && row.year !== null,
      )
      .map((row) => ({
        resultId: row.result_id,
        year: row.year,
        bib: row.bib,
        className: row.class_name,
        club: row.club_original,
        placeRank: row.place_rank,
        timeText: row.time_text,
        timeSeconds: row.time_seconds,
        finishTimeText: row.finish_time_text,
        finishTimeSeconds: row.finish_time_seconds,
        split1Text: row.split_1_text,
        split1Seconds: row.split_1_seconds,
        split2Text: row.split_2_text,
        split2Seconds: row.split_2_seconds,
        split3Text: row.split_3_text,
        split3Seconds: row.split_3_seconds,
      }));

    return {
      runnerId: runner.runner_id,
      legacyId: runner.legacy_id,
      name: runner.name,
      genderClass: runner.gender_class,
      participationCount: runner.participation_count,
      personalBestText: runner.personal_best_text,
      personalBestSeconds: runner.personal_best_seconds,
      personalBestYear: runner.personal_best_year,
      latestTimeText: runner.latest_time_text,
      latestTimeSeconds: runner.latest_time_seconds,
      latestTimeYear: runner.latest_time_year,
      trend: runner.trend,
      clubCurrent: runner.club_current,
      results,
    };
  },
);
