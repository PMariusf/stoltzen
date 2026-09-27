-- Public runner profile view with yearly results and splits.

create or replace view public.runner_profile_results
with (security_invoker = true)
as
select
  p.id as runner_id,
  p.legacy_id,
  p.name,
  p.gender_class,
  p.participation_count,
  p.personal_best_text,
  p.personal_best_seconds,
  p.personal_best_year,
  p.latest_time_text,
  p.latest_time_seconds,
  p.latest_time_year,
  p.trend,
  p.club_current,
  r.id as result_id,
  r.year,
  r.bib,
  r.class_name,
  r.club_original,
  r.place_rank,
  r.time_text,
  r.time_seconds,
  r.finish_time_text,
  r.finish_time_seconds,
  s.split_1_text,
  s.split_1_seconds,
  s.split_2_text,
  s.split_2_seconds,
  s.split_3_text,
  s.split_3_seconds
from public.runners p
left join public.results r on r.runner_id = p.id
left join public.splits s on s.result_id = r.id;

grant select on public.runner_profile_results to anon, authenticated;
