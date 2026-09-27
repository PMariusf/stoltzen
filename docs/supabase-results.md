# Supabase-oppsett for Stoltzen-resultater

Resultatmigreringen er delt i to separate steg:

1. `scripts/import-stoltzen.mjs` henter og parser den gamle StoltzeStatistikken til lokal JSON.
2. `scripts/import-stoltzen-supabase.mjs` validerer JSON-filen og kan deretter importere den til Supabase.

## 1. Opprett Supabase-prosjekt

Det er foreløpig ikke koblet noe Supabase-prosjekt til denne Stoltzen-koden.

Når prosjektet er opprettet, legg følgende i `.env.local`:

```text
NEXT_PUBLIC_SUPABASE_URL=https://PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...

# Kun server/import. Aldri NEXT_PUBLIC_:
SUPABASE_SECRET_KEY=sb_secret_...
```

En legacy `SUPABASE_SERVICE_ROLE_KEY` støttes også av importscriptene, men nye
Supabase secret keys er anbefalt for server-side arbeid.

**Secret/service-role key skal aldri legges i frontend eller Git.**

## 2. Kjør schema-migreringen

SQL ligger i:

```text
supabase/migrations/20260925_create_results_archive.sql
```

Den oppretter:

- `runners`
- `results`
- `splits`
- `result_search` view
- indekser for navn, år, startnummer, klasse, klubb og sluttid
- RLS med offentlig lesing
- ingen INSERT/UPDATE/DELETE-policy for vanlige brukere

Importer bruker en Supabase secret/service-role key som har server-side tilgang.

## 3. Kontroller JSON først

```bash
npm run import:stoltzen:supabase
```

Dette er kun en dry-run og skriver ingenting.

Du kan bruke en annen fil:

```bash
npm run import:stoltzen:supabase -- --input data/imports/stoltzen-sample.json
```

## 4. Importer et lite testutvalg

Når schemaet finnes og JSON-en ser riktig ut:

```bash
npm run import:stoltzen:supabase -- --input data/imports/stoltzen-sample.json --apply
```

Importer er laget for å kunne kjøres flere ganger:

- `runners` oppdateres på `legacy_id`
- `results` oppdateres på `runner_id + year`
- `splits` oppdateres på `result_id`

Det betyr at vi kan forbedre parseren og kjøre samme profiler på nytt uten å
lage dubletter.

## Datamodell

### runners

Én rad per person:

- gammel Stoltzen-ID
- navn
- klasse
- antall deltakelser
- PB
- siste registrerte tid
- trend
- nåværende/original klubbtekst
- kilde

### results

Én rad per person per år:

- år
- startnummer når vi får det
- klasse
- original klubbtekst
- plassering når vi får den
- sluttid som tekst og sekunder
- rå kildeceller for kontroll

### splits

Mellomtidene ligger separat:

- mellomtid 1
- mellomtid 2
- mellomtid 3

Både original tekst og sekunder beholdes slik at vi kan vise originalverdien og
samtidig sortere/regne effektivt.

## Neste migreringssteg

Profilstatistikken gir oss personhistorikken. Deretter bør årsresultatlistene
brukes til å berike resultatene med:

- startnummer
- klasse per år
- klubb per år
- klasseplassering
- totalplassering

Når dette er på plass kan `/resultater` bruke `result_search` direkte og
StoltzeProfil kan bygges fra `runners + results + splits`.
