-- 2025 published top-10 results by men/women.
-- Source: https://www.sportsidioten.no/lop/stoltzekleiven-opp-2025/
-- Kept separate from historical runners: no stable legacy ID verified.
-- Do not create or guess runner IDs from matching names.
create table if not exists public.verified_results_2025 (
  id bigint generated always as identity primary key,
  year integer not null default 2025 check (year = 2025),
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
alter table public.verified_results_2025 enable row level security;
drop policy if exists "Public read verified 2025 results" on public.verified_results_2025;
create policy "Public read verified 2025 results"
  on public.verified_results_2025 for select to anon,authenticated using (true);
grant select on public.verified_results_2025 to anon,authenticated;
grant all on public.verified_results_2025 to service_role;
grant usage,select on sequence public.verified_results_2025_id_seq to service_role;

-- Re-runnable; prevents duplicate (year,category,place) entries.
insert into public.verified_results_2025
 (category,overall_place,name,club,class_name,finish_time_text,finish_time_seconds,source_url)
values
 ('men',1,'Anders Sommer','Varegg IL','Menn 18-34 år','08:22',502,'https://www.sportsidioten.no/lop/stoltzekleiven-opp-2025/'),
 ('men',2,'Joel Dyrhovden','Samnanger IL','Menn 35-39 år','08:26',506,'https://www.sportsidioten.no/lop/stoltzekleiven-opp-2025/'),
 ('men',3,'Callum Smith','Varegg IL','Menn 18-34 år','08:40',520,'https://www.sportsidioten.no/lop/stoltzekleiven-opp-2025/'),
 ('men',4,'Halfdan E Færø','Førde IL','Menn 18-34 år','08:41',521,'https://www.sportsidioten.no/lop/stoltzekleiven-opp-2025/'),
 ('men',5,'Tor Naustdal Helgheim','Equinor Bergen BIL','Menn 18-34 år','08:59',539,'https://www.sportsidioten.no/lop/stoltzekleiven-opp-2025/'),
 ('men',6,'Njål Pedersen',null,'Menn 18-34 år','09:11',551,'https://www.sportsidioten.no/lop/stoltzekleiven-opp-2025/'),
 ('men',7,'Håvard Klakegg','Jølster IL','Menn 18-34 år','09:11',551,'https://www.sportsidioten.no/lop/stoltzekleiven-opp-2025/'),
 ('men',8,'Andreas Fiskerstrand','Lovstafetten','Menn 18-34 år','09:17',557,'https://www.sportsidioten.no/lop/stoltzekleiven-opp-2025/'),
 ('men',9,'Mark Purkis','Varegg IL','Menn 18-34 år','09:25',565,'https://www.sportsidioten.no/lop/stoltzekleiven-opp-2025/'),
 ('men',10,'Tristan Kahrs Guldbrandsen','TIF Viking','Menn 18-34 år','09:32',572,'https://www.sportsidioten.no/lop/stoltzekleiven-opp-2025/'),
 ('women',1,'Karoline Holsen Kyte','Førde IL','Kvinner 18-34 år','09:53',593,'https://www.sportsidioten.no/lop/stoltzekleiven-opp-2025/'),
 ('women',2,'Emma Julie Dyrhovden','Framo BIL','Kvinner 18-34 år','10:12',612,'https://www.sportsidioten.no/lop/stoltzekleiven-opp-2025/'),
 ('women',3,'Aurora Veen Torkildsen','Åsane Cykle Klubb','Jenter 15-17 år','11:14',674,'https://www.sportsidioten.no/lop/stoltzekleiven-opp-2025/'),
 ('women',4,'Live Færø Linde',null,'Jenter 12-14 år','11:16',676,'https://www.sportsidioten.no/lop/stoltzekleiven-opp-2025/'),
 ('women',5,'Synne Heggøy Fjeldberg','Norconsult','Kvinner 18-34 år','11:21',681,'https://www.sportsidioten.no/lop/stoltzekleiven-opp-2025/'),
 ('women',6,'Hanne Stavø Storkås',null,'Kvinner 18-34 år','11:22',682,'https://www.sportsidioten.no/lop/stoltzekleiven-opp-2025/'),
 ('women',7,'Maren Bjerkestrand','Varegg IL','Kvinner 18-34 år','11:24',684,'https://www.sportsidioten.no/lop/stoltzekleiven-opp-2025/'),
 ('women',8,'Stine Borgli','Archer Løpe og Sykkelklubb','Kvinner 35-39 år','11:29',689,'https://www.sportsidioten.no/lop/stoltzekleiven-opp-2025/'),
 ('women',9,'Ine-Therese Binner','Subsea7','Kvinner 35-39 år','11:32',692,'https://www.sportsidioten.no/lop/stoltzekleiven-opp-2025/'),
 ('women',10,'Renate Berget Galleberg','NOTEAM','Kvinner 40-44 år','11:45',705,'https://www.sportsidioten.no/lop/stoltzekleiven-opp-2025/')
on conflict(year,category,overall_place) do nothing;
