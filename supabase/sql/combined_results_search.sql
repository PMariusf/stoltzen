-- Apply to the Stoltzen Supabase project after the original archive views
-- and public.verified_results_2026 are present.
-- Keep legacy runner IDs NULL for 2026 entries until identities are independently verified.
-- Negative result IDs distinguish 2026 entries from historical results in the UI.
-- Security-invoker views respect underlying table privileges and RLS.

create or replace view public.result_search_combined
with (security_invoker = true)
as
select
  r.result_id::bigint as result_id,
  r.runner_id::bigint as runner_id,
  r.legacy_id::bigint as legacy_id,
  r.year::integer,
  r.bib::text,
  r.class_name::text,
  r.club_original::text,
  r.place_rank::integer,
  r.finish_time_text::text,
  r.finish_time_seconds::integer,
  r.name::text,
  r.gender_class::text,
  r.personal_best_text::text,
  r.personal_best_year::integer,
  r.participation_count::integer,
  'archive'::text as result_source
from public.result_search r
union all
select
  -v.id::bigint as result_id,
  null::bigint as runner_id,
  null::bigint as legacy_id,
  v.year::integer,
  null::text as bib,
  v.class_name::text,
  v.club::text as club_original,
  v.overall_place::integer as place_rank,
  v.finish_time_text::text,
  v.finish_time_seconds::integer,
  v.name::text,
  case when v.category = 'men' then 'Herrer'::text else 'Kvinner'::text end as gender_class,
  null::text as personal_best_text,
  null::integer as personal_best_year,
  null::integer as participation_count,
  'verified_2026'::text as result_source
from public.verified_results_2026 v
union all
select
  -(1000000000 + v.id)::bigint as result_id,
  null::bigint as runner_id,
  null::bigint as legacy_id,
  v.year::integer,
  null::text as bib,
  v.class_name::text,
  v.club::text as club_original,
  v.overall_place::integer as place_rank,
  v.finish_time_text::text,
  v.finish_time_seconds::integer,
  v.name::text,
  case when v.category = 'men' then 'Herrer'::text else 'Kvinner'::text end as gender_class,
  null::text as personal_best_text,
  null::integer as personal_best_year,
  null::integer as participation_count,
  'verified_2025'::text as result_source
from public.verified_results_2025 v;

grant select on public.result_search_combined to anon, authenticated;

create or replace view public.result_years
with (security_invoker = true)
as
select distinct year from public.result_search_combined;

create or replace view public.result_filter_options
with (security_invoker = true)
as
select distinct year, class_name, club_original from public.result_search_combined;

grant select on public.result_years, public.result_filter_options to anon, authenticated;
notify pgrst, 'reload schema';
