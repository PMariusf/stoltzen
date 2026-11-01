"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";

type Stop = "start" | "stairs" | "finish";
const stops: Stop[] = ["start", "stairs", "finish"];
const positions: Record<Stop, { x: number; y: number }> = {
  start: { x: 70, y: 270 },
  stairs: { x: 330, y: 170 },
  finish: { x: 640, y: 60 },
};

export default function InteractiveCourse({ locale = "no" }: { locale?: Locale }) {
  const en = locale === "en";
  const [active, setActive] = useState<Stop>("start");
  const details: Record<Stop, { title: string; text: string; label: string }> = {
    start: {
      title: "Fjellveien",
      label: en ? "Start" : "Start",
      text: en ? "The race begins on Fjellveien at the foot of the climb." : "Løpet starter i Fjellveien ved foten av stigningen.",
    },
    stairs: {
      title: "Stoltzekleiven",
      label: en ? "Stair climb" : "Trappene",
      text: en ? "The stone staircase is the signature challenge. Keep a steady rhythm on the way up." : "Steintrappene er løypens kjennetegn. Her gjelder det å finne rytmen oppover.",
    },
    finish: {
      title: "Sandvikspilen",
      label: en ? "Finish" : "Mål",
      text: en ? "The finish is by Sandvikspilen, roughly 315 vertical metres above the start." : "Målområdet er ved Sandvikspilen, omtrent 315 høydemeter over start.",
    },
  };

  return (
    <div className="overflow-hidden border border-white/15 bg-[#090909] p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f7aa4c]">
            {en ? "Explore the course" : "Utforsk løypen"}
          </p>
          <h3 className="mt-2 text-2xl font-black uppercase">{en ? "From start to finish" : "Fra start til mål"}</h3>
        </div>
        <span className="border border-white/15 px-3 py-2 text-xs font-bold text-white/65">801 {en ? "steps" : "trinn"}</span>
      </div>

      <svg viewBox="0 0 710 330" className="mt-5 w-full" role="img" aria-label={en ? "Illustrative uphill course diagram from Fjellveien to Sandvikspilen. Not a measured elevation profile." : "Illustrativ løypeskisse fra Fjellveien til Sandvikspilen. Ikke en målt høydeprofil."}>
        <defs>
          <linearGradient id="course-glow" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffb15b" />
            <stop offset="100%" stopColor="#ff7f11" />
          </linearGradient>
        </defs>
        {[90, 160, 230].map((y) => <line key={y} x1="30" y1={y} x2="685" y2={y} stroke="white" strokeOpacity="0.08" strokeDasharray="5 7" />)}
        <path d="M70 270 C170 267 215 215 330 170 S535 92 640 60" fill="none" stroke="#ff8e27" strokeWidth="5" strokeLinecap="round" />
        <path d="M70 270 C170 267 215 215 330 170 S535 92 640 60 L640 295 L70 295 Z" fill="url(#course-glow)" opacity="0.09" />
        {stops.map((stop) => {
          const point = positions[stop];
          return (
            <g key={stop}>
              <circle cx={point.x} cy={point.y} r={active === stop ? 12 : 8} fill={active === stop ? "#fff" : "#ff951f"} stroke="#080808" strokeWidth="3" />
              <text x={point.x} y={point.y - 25} textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">
                {stop === "start" ? "START" : stop === "finish" ? (en ? "FINISH" : "MÅL") : "801"}
              </text>
            </g>
          );
        })}
        <text x="70" y="311" fill="#aaa" fontSize="13" textAnchor="middle">Fjellveien</text>
        <text x="635" y="32" fill="#aaa" fontSize="13" textAnchor="middle">Sandvikspilen</text>
      </svg>
      <p className="mt-2 text-xs leading-5 text-white/45">
        {en ? "Schematic illustration only. The curve and intermediate markers do not show measured distances or elevations." : "Kun en skjematisk illustrasjon. Kurven og mellompunktene viser ikke målte distanser eller høyder."}
      </p>

      <div className="mt-6 grid gap-2 sm:grid-cols-3" aria-label={en ? "Choose course section" : "Velg løypedel"}>
        {stops.map((stop, index) => (
          <button
            key={stop}
            type="button"
            aria-pressed={active === stop}
            onClick={() => setActive(stop)}
            className={`min-h-12 border px-4 py-3 text-left text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 ${active === stop ? "border-[#ed8d29] bg-[#ed8d29] text-black" : "border-white/15 text-white/75 hover:border-white/50"}`}
          >
            <span className="mr-2 opacity-60">0{index + 1}</span>{details[stop].label}
          </button>
        ))}
      </div>

      <div aria-live="polite" className="mt-5 border-t border-white/15 pt-5">
        <h4 className="text-2xl font-black uppercase">{details[active].title}</h4>
        <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">{details[active].text}</p>
      </div>
    </div>
  );
}
