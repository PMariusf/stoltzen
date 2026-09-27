export const resultYears = Array.from(
  { length: 2026 - 1979 + 1 },
  (_, index) => 2026 - index,
);

export const resultFilters = {
  classes: ["Alle klasser"],
  clubs: ["Alle klubber"],
} as const;

export type ResultRow = {
  id: string;
  year: number;
  name: string;
  bib: string;
  className: string;
  club: string;
  time: string;
  placing: number;
};

export const results: ResultRow[] = [];
