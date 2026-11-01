"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { RunnerProfileResult } from "@/lib/result-profile";

type Point = {
  id: number;
  year: number;
  seconds: number;
  label: string;
};

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

function deltaLabel(delta: number, en: boolean) {
  if (delta === 0) return en ? "Same time as previous race" : "Samme tid som forrige løp";
  return delta < 0
    ? (en ? `${formatTime(Math.abs(delta))} faster than previous race` : `${formatTime(Math.abs(delta))} raskere enn forrige løp`)
    : (en ? `${formatTime(delta)} slower than previous race` : `${formatTime(delta)} langsommere enn forrige løp`);
}

export default function RunnerProgressChart({
  results,
  personalBestSeconds,
  locale = "no",
}: {
  results: RunnerProfileResult[];
  personalBestSeconds: number | null;
  locale?: Locale;
}) {
  const en = locale === "en";
  const points = useMemo<Point[]>(
    () => results
      .filter((result) => {
        const time = result.finishTimeSeconds ?? result.timeSeconds;
        return time !== null && Number.isFinite(time) && time > 0;
      })
      .map((result) => ({
        id: result.resultId,
        year: result.year,
        seconds: (result.finishTimeSeconds ?? result.timeSeconds)!,
        label: result.finishTimeText ?? result.timeText ?? formatTime((result.finishTimeSeconds ?? result.timeSeconds)!),
      }))
      .sort((a, b) => a.year - b.year),
    [results],
  );
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const activeIndex = Math.max(0, points.findIndex((point) => point.id === selectedId));
  const selected = points[activeIndex];
  const previous = activeIndex > 0 ? points[activeIndex - 1] : null;
  const pb = personalBestSeconds !== null && personalBestSeconds > 0 ? personalBestSeconds : null;

  if (!points.length) {
    return (
      <div className="border border-black/15 p-6 text-sm text-black/60">
        {en ? "No valid finish times have been imported for the chart yet." : "Ingen gyldige sluttider er importert til grafen ennå."}
      </div>
    );
  }

  const allTimes = [...points.map((point) => point.seconds), ...(pb === null ? [] : [pb])];
  const minTime = Math.min(...allTimes);
  const maxTime = Math.max(...allTimes);
  const padding = Math.max(10, (maxTime - minTime) * 0.15);
  const lower = Math.max(0, minTime - padding);
  const upper = maxTime + padding;
  const width = 800;
  const height = 260;
  const left = 58;
  const right = 22;
  const top = 18;
  const bottom = 35;
  const x = (index: number) => left + (points.length === 1 ? (width - left - right) / 2 : (index / (points.length - 1)) * (width - left - right));
  // Lower times are better and appear higher on the graph.
  const y = (seconds: number) => top + ((seconds - lower) / (upper - lower)) * (height - top - bottom);
  const polyline = points.map((point, index) => `${x(index)},${y(point.seconds)}`).join(" ");
  const pbIndex = pb === null ? -1 : points.findIndex((point) => point.seconds === pb);

  return (
    <div className="border border-black/15 bg-white/45 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-black/45">
            {en ? "Finish time progression" : "Utvikling i sluttid"}
          </p>
          <p className="mt-1 text-xs text-black/55">
            {en ? "Lower on the time scale means faster" : "Lavere tid betyr raskere løp"}
          </p>
        </div>
        {pb !== null && (
          <span className="text-xs font-bold text-black/65">
            PB {formatTime(pb)}
          </span>
        )}
      </div>

      <div className="mt-4 w-full overflow-x-auto">
        <svg role="img" aria-label={en ? "Line chart of recorded finish times by year" : "Linjegraf over registrerte sluttider per år"} viewBox={`0 0 ${width} ${height}`} className="block min-w-[320px] w-full" xmlns="http://www.w3.org/2000/svg">
          {[0, 0.5, 1].map((fraction) => {
            const seconds = lower + fraction * (upper - lower);
            return (
              <g key={fraction}>
                <line x1={left} y1={y(seconds)} x2={width - right} y2={y(seconds)} stroke="#000" strokeOpacity="0.12" strokeDasharray="4 5" />
                <text x={left - 10} y={y(seconds) + 4} textAnchor="end" fontSize="12" fill="#555">{formatTime(Math.round(seconds))}</text>
              </g>
            );
          })}
          {pb !== null && (
            <line x1={left} y1={y(pb)} x2={width - right} y2={y(pb)} stroke="#c47114" strokeWidth="1.5" strokeDasharray="7 5" />
          )}
          <polyline points={polyline} fill="none" stroke="#151515" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
          {points.map((point, index) => (
            <g key={point.id}>
              <circle cx={x(index)} cy={y(point.seconds)} r={activeIndex === index ? 7 : 5} fill={activeIndex === index ? "#c47114" : "#151515"} stroke="#fff" strokeWidth="2" />
              {(points.length <= 12 || index === 0 || index === points.length - 1 || index === activeIndex) && (
                <text x={x(index)} y={height - 9} textAnchor="middle" fontSize="12" fontWeight={activeIndex === index ? "bold" : "normal"} fill="#444">{point.year}</text>
              )}
            </g>
          ))}
          {pbIndex >= 0 && <text x={Math.min(width - 28, x(pbIndex) + 14)} y={Math.max(14, y(pb!) - 13)} fontSize="12" fontWeight="bold" fill="#a65b06">PB</text>}
        </svg>
      </div>

      <div className="mt-5 flex flex-wrap gap-2" aria-label={en ? "Select race year" : "Velg løpsår"}>
        {points.map((point) => (
          <button
            key={point.id}
            type="button"
            aria-pressed={selected.id === point.id}
            onClick={() => setSelectedId(point.id)}
            className={`min-h-10 border px-3 py-2 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${selected.id === point.id ? "border-black bg-black text-white" : "border-black/20 hover:border-black/60"}`}
          >
            {point.year}
          </button>
        ))}
      </div>

      <div aria-live="polite" className="mt-5 grid gap-3 border-t border-black/15 pt-5 sm:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-widest text-black/50">{en ? "Selected race" : "Valgt løp"} · {selected.year}</p>
          <p className="mt-2 text-3xl font-black">{selected.label}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-black/50">{en ? "Compared with previous race" : "Sammenlignet med forrige løp"}</p>
          <p className="mt-2 text-sm font-bold">
            {previous ? deltaLabel(selected.seconds - previous.seconds, en) : (en ? "First recorded race" : "Første registrerte løp")}
          </p>
          {previous && <p className="mt-1 text-xs text-black/55">{previous.year}: {previous.label}</p>}
        </div>
      </div>
    </div>
  );
}
