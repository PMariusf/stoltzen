#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const DEFAULT_BASE_URL = "https://www.stoltzen.no/statistikk";
const LETTERS = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", "Æ", "Ø", "Å"];

function parseArgs(argv) {
  const options = {
    ids: [],
    letters: [],
    all: false,
    limit: 30,
    delay: 650,
    output: "data/imports/stoltzen-sample.json",
    baseUrl: DEFAULT_BASE_URL,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === "--ids" && next) {
      options.ids = next.split(",").map((value) => value.trim()).filter(Boolean);
      index += 1;
    } else if (arg === "--letters" && next) {
      options.letters = next.split(",").map((value) => value.trim().toUpperCase()).filter(Boolean);
      index += 1;
    } else if (arg === "--all") {
      options.all = true;
    } else if (arg === "--limit" && next) {
      options.limit = Math.max(1, Number.parseInt(next, 10) || 30);
      index += 1;
    } else if (arg === "--delay" && next) {
      options.delay = Math.max(250, Number.parseInt(next, 10) || 650);
      index += 1;
    } else if (arg === "--output" && next) {
      options.output = next;
      index += 1;
    } else if (arg === "--base-url" && next) {
      options.baseUrl = next.replace(/\/$/, "");
      index += 1;
    } else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }
  }

  return options;
}

function printHelp() {
  console.log(`
Stoltzen legacy-result importer

Usage:
  npm run import:stoltzen -- --ids 89466,111704
  npm run import:stoltzen -- --letters A --limit 25
  npm run import:stoltzen -- --letters A,B,C --limit 50
  npm run import:stoltzen -- --all --limit 100

Options:
  --ids        Comma-separated legacy profile IDs
  --letters    Comma-separated surname index letters
  --all        Crawl all alphabet index pages
  --limit      Maximum number of profiles to fetch (default: 30)
  --delay      Delay between profile requests in ms (minimum: 250, default: 650)
  --output     JSON output path
  --base-url   Override legacy statistics base URL
`);
}

function sleep(ms) {
  return new Promise((resolvePromise) => setTimeout(resolvePromise, ms));
}

async function fetchHtml(url, attempt = 1) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "user-agent":
        "StoltzenMigration/0.1 (+https://stoltzen.no; low-rate archival migration)",
      accept: "text/html,application/xhtml+xml",
      "accept-language": "nb-NO,nb;q=0.9,en;q=0.7",
    },
  });

  if (!response.ok) {
    if (attempt < 3 && response.status >= 500) {
      await sleep(900 * attempt);
      return fetchHtml(url, attempt + 1);
    }

    throw new Error(`${response.status} ${response.statusText} for ${url}`);
  }

  return response.text();
}

function decodeHtml(value = "") {
  const named = {
    amp: "&",
    quot: '"',
    apos: "'",
    lt: "<",
    gt: ">",
    nbsp: " ",
    Aring: "Å",
    aring: "å",
    AElig: "Æ",
    aelig: "æ",
    Oslash: "Ø",
    oslash: "ø",
  };

  return value
    .replace(/&#(\d+);/g, (_, decimal) =>
      String.fromCodePoint(Number.parseInt(decimal, 10)),
    )
    .replace(/&#x([\da-f]+);/gi, (_, hex) =>
      String.fromCodePoint(Number.parseInt(hex, 16)),
    )
    .replace(/&([a-zA-Z]+);/g, (entity, name) => named[name] ?? entity);
}

function cleanText(html = "") {
  return decodeHtml(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<br\s*\/?\s*>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function getRows(html) {
  return [...html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map(
    (match) =>
      [...match[1].matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)].map(
        (cell) => cleanText(cell[1]),
      ),
  );
}

function normalizeTime(value) {
  const match = String(value ?? "").match(/\b(\d{1,2})[:.](\d{2})\b/);
  if (!match) return null;
  return `${match[1]}:${match[2]}`;
}

function extractYear(value) {
  const match = String(value ?? "").match(/\b(19\d{2}|20\d{2})\b/);
  return match ? Number(match[1]) : null;
}

function firstInteger(value) {
  const match = String(value ?? "").match(/\d+/);
  return match ? Number(match[0]) : null;
}

function metadataFromRows(rows) {
  const metadata = new Map();

  for (const row of rows) {
    if (row.length < 2) continue;
    const label = row[0].replace(/\s+/g, " ").trim().toLowerCase();
    if (!label) continue;
    metadata.set(label, row.slice(1).join(" ").trim());
  }

  return metadata;
}

function metadataValue(metadata, label) {
  const key = [...metadata.keys()].find((candidate) =>
    candidate.startsWith(label.toLowerCase()),
  );
  return key ? metadata.get(key) : null;
}

function parseProfile(html, sourceUrl) {
  const rows = getRows(html);
  const metadata = metadataFromRows(rows);

  const headingMatch = html.match(
    /<h1\b[^>]*>[\s\S]*?StoltzeStatistikk\s+for\s+([\s\S]*?)<\/h1>/i,
  );
  const titleMatch = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);

  let name = headingMatch ? cleanText(headingMatch[1]) : null;

  if (!name && titleMatch) {
    name = cleanText(titleMatch[1])
      .replace(/\s*:\s*Stoltzekleiven Opp.*$/i, "")
      .trim();
  }

  const idFromMetadata = firstInteger(metadataValue(metadata, "id"));
  const idFromUrl = firstInteger(new URL(sourceUrl).searchParams.get("id"));
  const legacyId = idFromMetadata ?? idFromUrl;

  const participationText = metadataValue(metadata, "antall deltagelser");
  const personalBestText = metadataValue(metadata, "personlig rekord");
  const latestTimeText = metadataValue(metadata, "forrige tid");

  const resultRows = rows
    .filter((row) => /^\d{4}$/.test(row[0] ?? "") && row.length >= 3)
    .map((row) => ({
      year: Number(row[0]),
      time: normalizeTime(row[2]),
      split1: normalizeTime(row[3]),
      split2: normalizeTime(row[4]),
      split3: normalizeTime(row[5]),
      finishTime: normalizeTime(row[6]) ?? normalizeTime(row[2]),
      sourceCells: row,
    }))
    .filter((result) => result.year >= 1979 && result.year <= 2100);

  return {
    legacyId,
    name,
    participationCount: firstInteger(participationText),
    personalBest: {
      time: normalizeTime(personalBestText),
      year: extractYear(personalBestText),
    },
    latestTime: {
      time: normalizeTime(latestTimeText),
      year: extractYear(latestTimeText),
    },
    trend: metadataValue(metadata, "trend"),
    genderClass: metadataValue(metadata, "klasse"),
    club: metadataValue(metadata, "klubb"),
    results: resultRows,
    source: {
      url: sourceUrl,
      fetchedAt: new Date().toISOString(),
    },
  };
}

function discoverIds(html) {
  const ids = new Set();

  for (const match of html.matchAll(/stat\.php\?id=(\d+)/gi)) {
    ids.add(match[1]);
  }

  return [...ids];
}

async function discoverFromLetters(baseUrl, letters, limit) {
  const ids = [];
  const seen = new Set();

  for (const letter of letters) {
    if (ids.length >= limit) break;

    const url = `${baseUrl}/?l=${encodeURIComponent(letter)}`;
    console.log(`Discovering profiles: ${letter} — ${url}`);

    try {
      const html = await fetchHtml(url);
      const found = discoverIds(html);

      console.log(`  Found ${found.length} profile links`);

      for (const id of found) {
        if (seen.has(id)) continue;
        seen.add(id);
        ids.push(id);

        if (ids.length >= limit) break;
      }
    } catch (error) {
      console.warn(`  Could not read ${letter}: ${error.message}`);
    }

    await sleep(300);
  }

  return ids;
}

function validateProfile(profile) {
  const warnings = [];

  if (!profile.legacyId) warnings.push("missing legacy ID");
  if (!profile.name) warnings.push("missing name");
  if (!profile.genderClass) warnings.push("missing class");
  if (!profile.results.length) warnings.push("no yearly results found");

  for (const result of profile.results) {
    if (!result.finishTime) {
      warnings.push(`missing finish time for ${result.year}`);
    }
  }

  return warnings;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  let ids = [...new Set(options.ids)];

  const requestedLetters = options.all
    ? LETTERS
    : options.letters.filter((letter) => LETTERS.includes(letter));

  if (!ids.length && requestedLetters.length) {
    ids = await discoverFromLetters(
      options.baseUrl,
      requestedLetters,
      options.limit,
    );
  }

  if (!ids.length) {
    console.log(
      "No IDs supplied. Running a safe sample crawl from letter A (max 25 profiles).",
    );
    ids = await discoverFromLetters(
      options.baseUrl,
      ["A"],
      Math.min(25, options.limit),
    );
  }

  ids = ids.slice(0, options.limit);

  if (!ids.length) {
    throw new Error(
      "No legacy profile IDs were discovered. Try --ids with known IDs or another --letters value.",
    );
  }

  console.log(
    `Fetching ${ids.length} profiles with ${options.delay} ms between requests...`,
  );

  const profiles = [];
  const errors = [];

  for (let index = 0; index < ids.length; index += 1) {
    const id = ids[index];
    const url = `${options.baseUrl}/stat.php?id=${encodeURIComponent(id)}`;

    process.stdout.write(
      `[${String(index + 1).padStart(2, "0")}/${ids.length}] ${id} ... `,
    );

    try {
      const html = await fetchHtml(url);
      const profile = parseProfile(html, url);
      const warnings = validateProfile(profile);

      profiles.push({
        ...profile,
        importWarnings: warnings,
      });

      console.log(
        `${profile.name ?? "unknown"} — ${profile.results.length} result(s)${
          warnings.length ? ` — warnings: ${warnings.join(", ")}` : ""
        }`,
      );
    } catch (error) {
      errors.push({
        legacyId: id,
        url,
        error: error.message,
      });
      console.log(`FAILED — ${error.message}`);
    }

    if (index < ids.length - 1) {
      await sleep(options.delay);
    }
  }

  const output = {
    generatedAt: new Date().toISOString(),
    source: {
      name: "StoltzeStatistikk",
      baseUrl: options.baseUrl,
    },
    import: {
      requestedProfiles: ids.length,
      importedProfiles: profiles.length,
      failedProfiles: errors.length,
      delayMs: options.delay,
    },
    profiles,
    errors,
  };

  const outputPath = resolve(options.output);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, JSON.stringify(output, null, 2) + "\n", "utf8");

  const resultCount = profiles.reduce(
    (total, profile) => total + profile.results.length,
    0,
  );
  const warningCount = profiles.reduce(
    (total, profile) => total + profile.importWarnings.length,
    0,
  );

  console.log("");
  console.log("Import sample complete");
  console.log(`  Profiles: ${profiles.length}/${ids.length}`);
  console.log(`  Yearly results: ${resultCount}`);
  console.log(`  Parser warnings: ${warningCount}`);
  console.log(`  Request failures: ${errors.length}`);
  console.log(`  Output: ${outputPath}`);
  console.log("");
  console.log(
    "Review the JSON before importing anything into Supabase. No database writes are performed by this script.",
  );
}

main().catch((error) => {
  console.error("");
  console.error("Import failed:", error.message);
  process.exitCode = 1;
});
