# Kontrollert import av årsresultater

Dette er en **manuelt kildekontrollert** importflyt for utdrag fra resultatlister.
Den henter ikke automatisk resultater fra tredjepartssider og den oppretter **ikke**
historiske løper-ID-er.

## Forberedelser

Oppdater `.env.local` lokalt (ikke sjekk nøklene inn i Git):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` til å lese og forhåndskontrollere
- `SUPABASE_SECRET_KEY` eller `SUPABASE_SERVICE_ROLE_KEY` **kun lokalt** når du skal skrive

Tabellene `verified_results_2025`, `verified_results_2026` og
`verified_historical_results` skal være opprettet i prosjektet.
For år 1979–2024 brukes sistnevnte, for nyere år beholdes årstabellene. Bruk kun offisielle eller kontrollerbare kilder.

## 1. Registrer et gjennomgått parti

Kopier `data/imports/verified-batch.example.json` til en ny lokal JSON-fil.
Fyll ut én post per resultat med:

- year: 1979–2026 (for eldre år må resultatet være kildekontrollert)
- category: `men` eller `women`
- overall_place: plassering i den valgte kjønnskategorien
- name, class_name og finish_time_text (mm:ss)
- club (streng eller null)
- source_url: HTTPS-adresse til den publiserte resultatlisten

**Viktig:** Kontrollér at plasseringen faktisk er totalplassering innen
kjønnskategorien, ikke plassering i aldersklasse. Ellers vil oppslaget mot
eksisterende rader bli feil.

## 2. Kjør en tørrtest

```bash
npm run import:verified -- --input data/imports/verified-batch.example.json
```

Skriptet leser eksisterende rader fra Supabase og viser:
- eksakte historiske duplikater som allerede finnes i `result_search` (for 1979–2024)
- allerede registrerte identiske poster
- nye poster
- konflikter (samme år/kjønn/plass, men ulike resultater)

En konflikt stanser hele importen. Ingen rader skrives i tørrtestmodus.

## 3. Godkjenn og importer

Når kilden, alle navn, klasser, tider og plasseringer er kontrollert:

```bash
npm run import:verified -- --input path/to/reviewed-batch.json --apply
```

Skriptet skriver kun nye rader og overskriver aldri eksisterende. Den historiske duplikatkontrollen bruker navn, år og sluttid; den kan ikke bevise løperidentitet.
Unik databasebegrensning på (year, category, overall_place) hindrer
duplikater også hvis to importer kjøres samtidig. Importen er ikke en
transaksjon på tvers av år: ved en feil sjekker du databasen og kjører
tørrtest igjen før du forsøker videre.

## 4. Etterkontroll

- Søk etter de importerte løperne på `/resultater`.
- Filtrer på år og kontroller riktig antall.
- Kontrollér at nye resultater uten historisk legacy-ID **ikke** har profil-lenke.
- Oppdater kilde- og importnotater før en eventuell PR til `main`.

Denne importflyten gjelder bare separate, verifiserte årsresultater.
Historiske individuelle løperprofiler håndteres fortsatt av
`import-stoltzen-supabase.mjs` og trenger separat ID-kontroll.
