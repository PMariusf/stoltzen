# Foreløpig tilgjengelighetsgjennomgang – Stoltzen

Dato: 1. november 2026
Omfang: kildekode på `feature/stoltzen-results-upgrade`, inkludert globale navigasjonskomponenter, resultatsøk, løypegrafer og sidelayouter.

## Juridisk ramme

For private virksomheter og frivillige lag er en formell tilgjengelighetserklæring
på uustatus.no normalt ikke påkrevd. Private nettsteder er likevel underlagt
de relevante minstekravene i norsk forskrift. Offentlige virksomheter har
ytterligere krav (WCAG 2.1 / EN 301 549 og formell erklæring).
Se https://www.uutilsynet.no/tilgjengelighetserklaering/ofte-stilte-sporsmal-om-tilgjengelighetserklaeringen/894
og https://www.uutilsynet.no/webdirektivet-wad/eus-webdirektiv-wad/265.

Vi kan frivillig publisere en status- og tilbakemeldingsside. Den er **ikke**
en ferdig formell erklæring og påstår ikke at WCAG AA er oppfylt.

## Kodekontrollerte funn

1. **Tastaturnavigasjon**: «Hopp til hovedinnhold»-lenke manglet.
   Rettet i root layout og global CSS (fokuslenke og målelement).
2. **Aktiv navigasjon**: visuell `is-active` manglet `aria-current="page"`.
   Rettet for desktop og mobil.
3. **Fokusmarkering**: innført global `:focus-visible` på lenker,
   knapper, skjemaelementer og mobilmenyoppsummering.
4. **Løypegrafene**: SVG har `role="img"` og tilgjengelige tekstetiketter,
   knapper har `aria-pressed`, tekstoppdateringer har `aria-live`.
   Dette er positiv kodeindikasjon, men må prøves med skjermleser.
5. **Resultatsøket**: tekstfelter/selects har synlige etiketter,
   tabelloverskrifter og lastetilstander. Må testes med tastatur,
   skjermleser, mobile brytepunkter og filtrering.
6. **Mulig kontrastproblem**: svært mange sekundære etiketter har
   `text-white/25`–`text-white/50` på mørk bakgrunn. Tilsvarende
   forekommer i lys modus. Disse *kan* falle under 4,5:1 for vanlig
   tekst, men faktiske komposittfarger er ennå ikke målt.
7. **Språk**: rotdokument er `lang="nb"`; engelske sider har
   en omsluttende `div lang="en"`. Dette kan fungere for hovedinnholdet,
   men dokumentets overordnede språk og delt navigasjon må testes med
   skjermleser og eventuelt løses med egen rotlayout per språk.
8. **Mobilmeny**: `details/summary` kan brukes med tastatur,
   men lukking, fokusrekkefølge og skjermlesertilbakemelding må
   testes manuelt.

## Foreløpig vurdering

**Status: ikke ferdig testet.** Ingen Lighthouse-, axe- eller
manuelle skjermleserresultater er dokumentert. Man kan ikke konkludere
med «oppfyller WCAG» basert på kildekodegjennomgangen.

## Tester som gjenstår

- Lighthouse Accessibility og axe på forsiden, løp, påmelding, resultater,
  statistikk, historie, bilder og praktisk info (NO og EN), både lys/mørk.
- Kontrastmåling for vanlig tekst (4,5:1), stor tekst (3:1),
  fokus-/UI-indikatorer og grafer.
- Tastatur fra start til slutt: skip-lenke, navigasjon, meny,
  språkbytte, skjemaer, filtre, paginering og profilvisninger.
- NVDA/VoiceOver: språkbytte, landmarks, leserekkefølge, grafkontroller,
  statusmeldinger og tilgjengelige navn.
- Zoom 200–400 %, 320 CSS px, liggende mobil, reflow og ingen tekstoverlapp.
- Bilder: alt-tekst og dekorative bilder, video/lyd, lenkenavn og sidetitler.

## Utkast til offentlig tilgjengelighetsstatus

«Vi arbeider med universell utforming av Stoltzen-nettsiden.
Nettsiden er under utvikling, og vi har ennå ikke gjennomført
en fullstendig WCAG-gjennomgang. Tastaturnavigasjon og fokusmarkering
er forbedret. Kontraster, skjermleserstøtte og mobilvisning skal
testes nærmere. Oppdager du en tilgjengelighetsbarriere, kan du gi
beskjed til arrangøren via den offisielle kontaktinformasjonen.»

Publisering krever bekreftet kontaktkanal. Ikke oppgi fiktiv e-postadresse.

## WCAG-kodekontroll, oppfølging 1. november 2026

Referanse: WCAG 2.2 AA som kvalitetsmål, men gjeldende norsk minimum for
private nettløsninger er WCAG 2.0 A/AA med forskriftens unntak.
Kilde: https://lovdata.no/nav/forskrift/2013-06-21-732 og
https://www.w3.org/TR/WCAG22/

| Kriterium | Vurdering | Tiltak |
|---|---|---|
| 1.4.3 Kontrast (AA) | Bekreftet risiko/avvik i enkelte etiketter | 23 forekomster av svært svak `text-white/25`–`text-white/60` i ResultsExplorer økt til `text-white/75`. Gjenværende sider må måles. |
| 2.4.1 Hoppe over blokker (A) | Tidligere mangel | «Hopp til hovedinnhold» lagt inn. Må tastaturtestes. |
| 2.4.7 Synlig fokus (AA i WCAG 2.1/2.2) | Forbedret | Felles fokusring, mørkere ring i lys modus. |
| 2.4.4 Lenkeformål (A) | Delvis vurdert | Profil-lenker, menytekst og CTA virker beskrivende. Test gjenstår. |
| 3.1.1 Sidens språk (A) | Mulig avvik på engelske sider | `html lang="nb"` også for engelske ruter; innholdet er markert med `div lang="en"`. Fiks krever layoutgjennomgang. |
| 4.1.2 Navn, rolle, verdi (A) | Delvis gjennomgått | Native knapper, labels og `aria-pressed`; mobilmeny/tema må testes med skjermleser. |
| 1.4.10 Reflow (AA WCAG 2.1/2.2) | Ikke verifisert | Test 320 CSS px / 400 % zoom. |
| 2.5.8 Målstørrelse (AA WCAG 2.2) | Ikke verifisert | Test interaktive elementer / språkvalg. |

En referanseberegning for hvit tekst med opacity 0,25 over #0b0b0b
gir ca. 2,15:1, mot ca. 11,05:1 ved opacity 0,75.
Dette er ikke et bevis på hver enkelt renders kontrast fordi flere
elementer har andre bakgrunnsfarger eller temaoverstyringer.

**Testbegrensning:** Ikke Lighthouse-, axe-, VoiceOver- eller browserautomasjonstestet.
Ingen samlet WCAG-score eller full AA-samsvar er dokumentert.
