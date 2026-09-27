-- Lightweight public views used by the result explorer filters.

create or replace view public.result_years
with (security_invoker = true)
as
select distinct year
from public.results;

create or replace view public.result_filter_options
with (security_invoker = true)
as
select distinct
  year,
  class_name,
  club_original
from public.results;

grant select on public.result_years to anon, authenticated;
grant select on public.result_filter_options to anon, authenticated;
