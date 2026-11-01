-- Historical published ranking results, 1979-2024.
-- Existing legacy runner profiles remain in runners/results.
-- Entries here stay unlinked until a legacy identity is independently verified.

create table if not exists public.verified_historical_results (
  id bigint generated always as identity primary key,
  year integer not null check (year between 1979 and 2024),
  category text not null check (category in ('men','women')),
  overall_place integer not null check (overall_place > 0),
  name text not null,
  club text,
  class_name text,
  finish_time_text text not null,
  finish_time_seconds integer not null check (finish_time_seconds > 0),
  source_url text not null,
  created_at timestamptz not null default now(),
  unique(year,category,overall_place)
);
alter table public.verified_historical_results enable row level security;
drop policy if exists "Public read verified historical results" on public.verified_historical_results;
create policy "Public read verified historical results"
  on public.verified_historical_results for select
  to anon,authenticated using (true);
grant select on public.verified_historical_results to anon,authenticated;
grant all on public.verified_historical_results to service_role;
grant usage,select on sequence public.verified_historical_results_id_seq to service_role;

-- Then apply supabase/sql/combined_results_search.sql to expose these in search.
