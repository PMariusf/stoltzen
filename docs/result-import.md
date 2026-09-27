# Import av gamle Stoltzen-resultater

Dette er første migreringssteg for resultatarkivet.

Scriptet **skriver ikke til databasen**. Det henter et lite utvalg offentlige
StoltzeProfiler, normaliserer feltene og lager en lokal JSON-fil som kan
kontrolleres før vi bygger Supabase-importen.

## Test 25 profiler

```bash
npm run import:stoltzen:sample
```

Standardtesten leser bokstavsiden `A`, finner opptil 25 legacy-profiler og
skriver resultatet til:

```text
data/imports/stoltzen-sample.json
```

Genererte importfiler er ignorert av Git.

## Test bestemte profiler

```bash
npm run import:stoltzen -- --ids 89466,111704,112112
```

## Test andre bokstaver

```bash
npm run import:stoltzen -- --letters H,K --limit 30
```

## Felter vi henter

På profilnivå:

- `legacyId`
- navn
- antall registrerte deltakelser
- personlig rekord og år
- forrige/siste registrerte tid
- trend
- klasse
- klubb
- kilde-URL og hentetidspunkt

Per løpsår:

- år
- registrert tid
- mellomtid 1
- mellomtid 2
- mellomtid 3
- sluttid

Scriptet beholder den gamle ID-en. Den kan senere brukes som stabil nøkkel for
StoltzeProfil og for å unngå å slå sammen personer bare fordi de har samme navn.

## Viktig før full migrering

1. Kontroller minst 20–30 profiler manuelt mot gamle StoltzeStatistikken.
2. Behold original klubbtekst i rådata. Klubbnavn kan normaliseres i et separat felt senere.
3. Sluttid bør være autoritativ ved konflikt med mellomtidsdata.
4. Ikke importer SMS-treningslogg eller andre gamle profilfunksjoner vi ikke trenger.
5. Kjør full import med lav forespørselsrate. Standard er 650 ms mellom profilsider og scriptet tillater ikke mindre enn 250 ms.
6. Når parseren er kontrollert, bygger vi et eget steg som skriver til Supabase med upsert på `legacy_id`.

## Foreslått databaseform

```text
runners
  id
  legacy_id
  name
  gender_class

results
  id
  runner_id
  year
  club_original
  finish_time

splits
  result_id
  split_1
  split_2
  split_3
```

Årsresultatene kan senere berikes med startnummer, klasseplassering,
totalplassering og klubb per år fra egne årsresultatlister.
