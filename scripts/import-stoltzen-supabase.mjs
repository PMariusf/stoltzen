#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

function parseArgs(argv) {
  const options = {
    input: "data/imports/stoltzen-sample.json",
    apply: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === "--input" && next) {
      options.input = next;
      index += 1;
    } else if (arg === "--apply") {
      options.apply = true;
    } else if (arg === "--help" || arg === "-h") {
      console.log(`
Stoltzen Supabase importer

Usage:
  node scripts/import-stoltzen-supabase.mjs
  node scripts/import-stoltzen-supabase.mjs --input data/imports/stoltzen-sample.json
  node scripts/import-stoltzen-supabase.mjs --input data/imports/stoltzen-sample.json --apply

Default mode is DRY RUN. Add --apply to write to Supabase.
`);
      process.exit(0);
    }
  }

  return options;
}

async function loadEnvFile(path) {
  try {
    const raw = await readFile(path, "utf8");

    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const separator = trimmed.indexOf("=");
      if (separator === -1) continue;

      const key = trimmed.slice(0, separator).trim();
      let value = trimmed.slice(separator + 1).trim();

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
}

function timeToSeconds(value) {
  if (!value) return null;

  const match = String(value).match(/^(\d{1,3}):(\d{2})$/);
  if (!match) return null;

  return Number(match[1]) * 60 + Number(match[2]);
}

function getConfig() {
  const url =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const secret =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  return { url: url?.replace(/\/$/, ""), secret };
}

async function apiRequest(url, secret, table, body, onConflict, select) {
  const params = new URLSearchParams();

  if (onConflict) params.set("on_conflict", onConflict);
  if (select) params.set("select", select);

  const endpoint =
    `${url}/rest/v1/${table}${params.size ? `?${params.toString()}` : ""}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      apikey: secret,
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify(body),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText} on ${table}: ${text}`,
    );
  }

  return text ? JSON.parse(text) : [];
}

function buildRunner(profile) {
  return {
    legacy_id: profile.legacyId,
    name: profile.name,
    gender_class: profile.genderClass ?? null,
    participation_count: profile.participationCount ?? null,
    personal_best_text: profile.personalBest?.time ?? null,
    personal_best_seconds: timeToSeconds(profile.personalBest?.time),
    personal_best_year: profile.personalBest?.year ?? null,
    latest_time_text: profile.latestTime?.time ?? null,
    latest_time_seconds: timeToSeconds(profile.latestTime?.time),
    latest_time_year: profile.latestTime?.year ?? null,
    trend: profile.trend ?? null,
    club_current: profile.club ?? null,
    source_url: profile.source?.url ?? null,
    source_fetched_at: profile.source?.fetchedAt ?? null,
  };
}

function buildResult(runnerId, profile, result) {
  return {
    runner_id: runnerId,
    year: result.year,
    bib: null,
    class_name: profile.genderClass ?? null,
    club_original: profile.club ?? null,
    place_rank: null,
    time_text: result.time ?? null,
    time_seconds: timeToSeconds(result.time),
    finish_time_text: result.finishTime ?? result.time ?? null,
    finish_time_seconds: timeToSeconds(result.finishTime ?? result.time),
    source_cells: result.sourceCells ?? null,
  };
}

function buildSplit(resultId, result) {
  return {
    result_id: resultId,
    split_1_text: result.split1 ?? null,
    split_1_seconds: timeToSeconds(result.split1),
    split_2_text: result.split2 ?? null,
    split_2_seconds: timeToSeconds(result.split2),
    split_3_text: result.split3 ?? null,
    split_3_seconds: timeToSeconds(result.split3),
  };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  await loadEnvFile(resolve(".env.local"));
  await loadEnvFile(resolve(".env"));

  const raw = await readFile(resolve(options.input), "utf8");
  const payload = JSON.parse(raw);
  const profiles = Array.isArray(payload.profiles) ? payload.profiles : [];

  const validProfiles = profiles.filter(
    (profile) =>
      Number.isInteger(profile.legacyId) &&
      profile.legacyId > 0 &&
      typeof profile.name === "string" &&
      profile.name.trim(),
  );

  const yearlyResultCount = validProfiles.reduce(
    (total, profile) => total + (profile.results?.length ?? 0),
    0,
  );

  console.log("Stoltzen Supabase import");
  console.log(`  Input: ${resolve(options.input)}`);
  console.log(`  Profiles: ${validProfiles.length}`);
  console.log(`  Yearly results: ${yearlyResultCount}`);
  console.log(`  Mode: ${options.apply ? "APPLY" : "DRY RUN"}`);

  if (!validProfiles.length) {
    throw new Error("No valid profiles found in the input JSON.");
  }

  if (!options.apply) {
    console.log("");
    console.log("Dry run complete. Nothing was written to Supabase.");
    console.log("Add --apply after the schema migration has been applied.");
    return;
  }

  const { url, secret } = getConfig();

  if (!url) {
    throw new Error(
      "Missing SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL in .env.local.",
    );
  }

  if (!secret) {
    throw new Error(
      "Missing SUPABASE_SECRET_KEY or SUPABASE_SERVICE_ROLE_KEY in .env.local.",
    );
  }

  let importedProfiles = 0;
  let importedResults = 0;

  for (const profile of validProfiles) {
    process.stdout.write(
      `[${String(importedProfiles + 1).padStart(3, "0")}/${validProfiles.length}] ${profile.name} ... `,
    );

    const runnerRows = await apiRequest(
      url,
      secret,
      "runners",
      buildRunner(profile),
      "legacy_id",
      "id,legacy_id,name",
    );

    const runner = runnerRows[0];

    if (!runner?.id) {
      throw new Error(
        `Runner upsert returned no id for legacy_id ${profile.legacyId}`,
      );
    }

    for (const result of profile.results ?? []) {
      const resultRows = await apiRequest(
        url,
        secret,
        "results",
        buildResult(runner.id, profile, result),
        "runner_id,year",
        "id,runner_id,year",
      );

      const storedResult = resultRows[0];

      if (!storedResult?.id) {
        throw new Error(
          `Result upsert returned no id for ${profile.name} ${result.year}`,
        );
      }

      await apiRequest(
        url,
        secret,
        "splits",
        buildSplit(storedResult.id, result),
        "result_id",
        "result_id",
      );

      importedResults += 1;
    }

    importedProfiles += 1;
    console.log(`OK — ${profile.results?.length ?? 0} result(s)`);
  }

  console.log("");
  console.log("Supabase import complete");
  console.log(`  Profiles: ${importedProfiles}`);
  console.log(`  Results: ${importedResults}`);
  console.log("");
  console.log(
    "The import is idempotent: re-running it updates existing rows by legacy_id and runner_id/year.",
  );
}

main().catch((error) => {
  console.error("");
  console.error("Import failed:", error.message);
  process.exitCode = 1;
});
