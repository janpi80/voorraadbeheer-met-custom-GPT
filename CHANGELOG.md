# Changelog – Voorraadbeheer-project

## 2.0.4 – 2025-08-12
- Projectbestanden opgesplitst in mappenstructuur voor GitHub (`docs/`, `sql/`, `openapi/`, `code/`).
- Alle projectonderdelen in platte tekst gezet voor makkelijke import in GitHub.
- UPDATE_STEPS.md en CHANGELOG.md toegevoegd voor beheer en historisch overzicht.
- Documentatie uitgebreid met Google Sheets, Supabase en Custom GPT instructies.

## 2.0.3 – 2025-08-12
- Google Sheets `Code.gs` uitgebreid met nieuwe kolommen `datum_laatste_wijziging` en `opmerkingen`.
- YAML OpenAPI-bestand in GitHub gezet en gesynchroniseerd met Custom GPT.
- Structuur van README.md verbeterd en links toegevoegd naar gist en spreadsheet.
- Supabase view `voorraad_schoon` in SQL-bestand gezet.

## 2.0.2 – 2025-08-12
- Toegevoegd: kolommen `datum_laatste_wijziging` en `opmerkingen` aan Supabase-tabel en OpenAPI YAML.
- `getVoorraad` verwijst nu naar view `voorraad_schoon` i.p.v. originele `Voorraad`-tabel.
- View `voorraad_schoon` toegevoegd om irrelevante datum `2025-08-12T08:03:17.819444+00:00` te filteren.
- Google Sheets `Code.gs` aangepast voor nieuwe kolommen.

## 2.0.1 – 2025-08-10
- Eerste werkende integratie van Supabase, Custom GPT en Google Sheets.
- GET, POST, PATCH en DELETE werkend via Custom GPT OpenAPI acties.
- THT-checks toegevoegd in GPT.

## 2.0.0 – 2025-08-05
- Migratie naar Supabase als backend.
- Eerste versie van de voorraad-tabel en OpenAPI specificatie.
