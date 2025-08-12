# Projectoverzicht – Voorraadbeheer met Custom GPT

## Doel
Dit project beheert een voedselvoorraad via Supabase, een Custom GPT en Google Sheets.  
Het systeem kan producten toevoegen, aanpassen, verwijderen en uitlezen, inclusief houdbaarheidscontroles (THT) en opmerkingen.  

## Onderdelen
1. **Supabase**  
   - Backend-database voor alle voorraadgegevens.  
   - Tabel: `Voorraad`  
   - View: `voorraad_schoon` (filtert irrelevante datum/tijdwaarden)  

2. **Custom GPT**  
   - OpenAI Custom GPT gekoppeld via OpenAPI-spec (`openapi/voorraadbeheer-api.yaml`).  
   - Kan GET, POST, PATCH, DELETE uitvoeren op de voorraad.  
   - Service role key nodig voor schrijf-acties.

3. **Google Sheets**  
   - Read-only weergave van de voorraad via `voorraad_schoon`.  
   - Apps Script (`code/google-sheets-sync.gs`) haalt data automatisch op.  
   - Gebruikt anon key voor beveiliging.

## Workflow
1. Producten worden toegevoegd/bewerkt via Custom GPT.
2. Supabase slaat alle data op en werkt automatisch `datum_laatste_wijziging` bij.
3. Google Sheets synchroniseert periodiek of handmatig voor overzicht.
4. View `voorraad_schoon` filtert interne of irrelevante datums uit de resultaten.

## Beveiliging
- **Service role key** → Alleen in Custom GPT voor schrijven.  
- **Anon key** → Alleen in Google Sheets voor lezen.  
- Geen schrijf-toegang vanuit Google Sheets om onbedoelde wijzigingen te voorkomen.

## Belangrijke bestanden
- `sql/create_tables.sql` → maakt de voorraad-tabel aan.
- `sql/create_view_voorraad_schoon.sql` → maakt de gefilterde view aan.
- `openapi/voorraadbeheer-api.yaml` → OpenAPI-specificatie voor Custom GPT.
- `code/google-sheets-sync.gs` → Apps Script voor Google Sheets synchronisatie.
- `UPDATE_STEPS.md` → procedure voor updates.
- `CHANGELOG.md` → versiegeschiedenis.
- `INSTALL.md` → installatiehandleiding.

## Links
- Google Spreadsheet: https://docs.google.com/spreadsheets/d/1KvllL8AbYfnqMXmbdb8PDDJGQYZwHMN5CgvwzqzICXQ/edit?gid=0#gid=0
- OpenAPI gist: https://gist.github.com/janpi80/27bcaec51e4454db0fa36f976d1176c0
