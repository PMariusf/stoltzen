#!/usr/bin/env node
// Safe, review-first importer for published annual ranking extracts.
// Usage: node scripts/import-verified-results.mjs --input data/imports/verified-batch.example.json
//        node scripts/import-verified-results.mjs --input /path/to/reviewed.json --apply
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const TABLES = { 2025: "verified_results_2025", 2026: "verified_results_2026" };
const CATEGORIES = new Set(["men", "women"]);
const REQUIRED = ["year", "category", "overall_place", "name", "class_name", "finish_time_text", "source_url"];
const MAX_BATCH = 200;

function args(argv) {
  let input, apply = false;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--input") input = argv[++i];
    else if (argv[i] === "--apply") apply = true;
    else if (argv[i] === "--help" || argv[i] === "-h") {
      console.log("Usage: node scripts/import-verified-results.mjs --input path/to/reviewed.json [--apply]\nDefault: dry run. --apply writes ONLY new, non-conflicting rows.");
      process.exit(0);
    } else throw new Error(`Unknown argument: ${argv[i]}`);
  }
  if (!input) throw new Error("Supply --input with a reviewed JSON file.");
  return { input: resolve(input), apply };
}

async function loadLocalEnv() {
  for (const file of [".env.local", ".env"]) {
    let raw;
    try { raw = await readFile(resolve(file), "utf8"); }
    catch (error) { if (error.code === "ENOENT") continue; throw error; }
    for (const line of raw.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z_][A-Z_0-9]*)\s*=\s*(.*)$/);
      if (!match || process.env[match[1]]) continue;
      process.env[match[1]] = match[2].trim().replace(/^(['"])(.*)\1$/, "$2");
    }
  }
}

function normalize(row, index) {
  if (!row || typeof row !== "object" || Array.isArray(row)) throw new Error(`Row ${index}: expected object`);
  for (const field of REQUIRED) {
    if (row[field] === null || row[field] === undefined || String(row[field]).trim() === "") {
      throw new Error(`Row ${index}: missing ${field}`);
    }
  }
  const year = Number(row.year);
  const place = Number(row.overall_place);
  if (!Object.hasOwn(TABLES, year)) throw new Error(`Row ${index}: unsupported year ${year}`);
  if (!CATEGORIES.has(row.category)) throw new Error(`Row ${index}: category must be men or women`);
  if (!Number.isSafeInteger(place) || place < 1 || place > 100000) throw new Error(`Row ${index}: invalid placing`);
  if (!/^[0-9]{1,3}:[0-5][0-9]$/.test(row.finish_time_text)) throw new Error(`Row ${index}: expected mm:ss`);
  const [minutes, seconds] = row.finish_time_text.split(":").map(Number);
  const finish_time_seconds = minutes * 60 + seconds;
  if (row.finish_time_seconds !== undefined && row.finish_time_seconds !== finish_time_seconds) {
    throw new Error(`Row ${index}: time seconds do not agree with finish_time_text`);
  }
  let source_url;
  try {
    const u = new URL(row.source_url);
    if (u.protocol !== "https:") throw new Error("HTTPS only");
    source_url = u.toString();
  } catch { throw new Error(`Row ${index}: source_url must be a valid HTTPS URL`); }
  const text = (value) => typeof value === "string" ? value.trim() : "";
  if (!text(row.name) || text(row.name).length > 200) throw new Error(`Row ${index}: invalid name`);
  if (!text(row.class_name)) throw new Error(`Row ${index}: class_name is required`);
  if (row.club !== null && row.club !== undefined && typeof row.club !== "string") throw new Error(`Row ${index}: club must be string or null`);
  return {
    year, category: row.category, overall_place: place,
    name: text(row.name), club: text(row.club) || null,
    class_name: text(row.class_name), finish_time_text: row.finish_time_text,
    finish_time_seconds, source_url,
  };
}

function key(row) { return `${row.year}/${row.category}/${row.overall_place}`; }
function equivalent(a, b) {
  return ["year","category","overall_place","name","club","class_name","finish_time_text","finish_time_seconds"].every(field => (a[field] ?? null) === (b[field] ?? null));
}

async function request({ base, token, table, method = "GET", search = "", body }) {
  const response = await fetch(`${base}/rest/v1/${table}${search}`, {
    method, headers: {
      apikey: token, Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(method === "POST" ? { Prefer: "return=representation" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(20000),
  });
  const raw = await response.text();
  if (!response.ok) throw new Error(`Supabase ${table} ${response.status}: ${raw.slice(0, 300)}`);
  return raw ? JSON.parse(raw) : [];
}

async function main() {
  const options = args(process.argv.slice(2));
  const payload = JSON.parse(await readFile(options.input, "utf8"));
  if (!Array.isArray(payload.rows) || payload.rows.length === 0 || payload.rows.length > MAX_BATCH) {
    throw new Error(`Input must contain 1–${MAX_BATCH} rows in a rows array`);
  }
  const rows = payload.rows.map(normalize);
  const seen = new Set();
  for (const row of rows) {
    const id = key(row);
    if (seen.has(id)) throw new Error(`Duplicate ranking within batch: ${id}`);
    seen.add(id);
  }
  await loadLocalEnv();
  const base = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/$/, "");
  const readToken = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  const secret = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base || !readToken) throw new Error("Missing Supabase URL or public key for comparison");
  if (!/^https:\/\/[^/]+\.supabase\.co$/.test(base)) throw new Error("Unexpected Supabase URL");
  if (options.apply && !secret) throw new Error("--apply needs SUPABASE_SECRET_KEY or SUPABASE_SERVICE_ROLE_KEY (never NEXT_PUBLIC_)");

  const grouped = Object.groupBy(rows, row => row.year);
  const newRows = [];
  let unchanged = 0;
  const conflicts = [];
  for (const [year, batch] of Object.entries(grouped)) {
    const table = TABLES[year];
    // Read ONLY the ranking slots supplied, in a single bounded query per year.
    const categories = [...new Set(batch.map(row => row.category))];
    const places = [...new Set(batch.map(row => row.overall_place))];
    const search = `?select=year,category,overall_place,name,club,class_name,finish_time_text,finish_time_seconds&category=in.(${categories.join(",")})&overall_place=in.(${places.join(",")})&limit=1000`;
    const existing = await request({ base, token: readToken, table, search });
    const lookup = new Map(existing.map(row => [key(row), row]));
    for (const row of batch) {
      const stored = lookup.get(key(row));
      if (!stored) newRows.push(row);
      else if (equivalent(row, stored)) unchanged++;
      else conflicts.push({ ranking: key(row), incoming: row, stored });
    }
  }

  console.log(`\nStoltzen verified-results import — ${options.apply ? "APPLY" : "DRY RUN"}`);
  console.log(`Input: ${options.input}`);
  console.log(`Reviewed: ${rows.length}; existing: ${unchanged}; new: ${newRows.length}; conflicts: ${conflicts.length}`);
  for (const row of newRows) console.log(`  NEW  ${key(row)}  ${row.name}  ${row.finish_time_text}`);
  for (const conflict of conflicts) console.error(`  CONFLICT ${conflict.ranking}: incoming ${conflict.incoming.name} ${conflict.incoming.finish_time_text}; stored ${conflict.stored.name} ${conflict.stored.finish_time_text}`);
  if (conflicts.length) throw new Error("Conflicts require manual review. No database changes were made.");
  if (!options.apply) {
    console.log("Dry run complete. Review the source before executing with --apply.");
    return;
  }
  if (!newRows.length) { console.log("Nothing new to import."); return; }
  for (const year of Object.keys(grouped)) {
    const batch = newRows.filter(row => row.year === Number(year));
    if (!batch.length) continue;
    // Do not update existing results. A new conflict after the preview will cause an error.
    const inserted = await request({ base, token: secret, table: TABLES[year], method: "POST", body: batch });
    console.log(`Imported ${inserted.length} new ${year} rows.`);
  }
  console.log("Import finished. Review /resultater in the browser.");
}

main().catch(error => {
  console.error(`Import failed: ${error.message}`);
  process.exitCode = 1;
});
