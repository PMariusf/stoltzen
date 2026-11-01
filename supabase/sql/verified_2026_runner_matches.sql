-- Evidence-backed mapping for independently verified 2026 athlete identities.
-- A name match alone is insufficient for a link to an archive runner.

create table if not exists public.verified_2026_runner_matches (
  verified_result_id bigint primary key
    references public.verified_results_2026(id) on delete cascade,
  runner_id bigint not null unique
    references public.runners(id) on delete restrict,
  evidence_url text not null,
  verified_at timestamptz not null default now()
);

alter table public.verified_2026_runner_matches enable row level security;
revoke all on public.verified_2026_runner_matches from anon, authenticated;
grant all on public.verified_2026_runner_matches to service_role;
