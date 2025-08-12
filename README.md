Voorraadbeheer – Supabase + Custom GPT + Google Sheets

Dit project koppelt een Supabase-database aan een Custom GPT voor voorraadbeheer, en een Google Sheet als read-only dashboard.  
- Custom GPT: Alle bewerkingen (toevoegen, wijzigen, verwijderen, THT-checks).  
- Google Sheets: Alleen uitlezen (read-only).  
- Supabase View (voorraad_schoon): Filtert automatisch irrelevante waarden, zoals de bulkdatum 2025-08-12T08:03:17.819444+00:00.

1. Supabase
Tabel: Voorraad
Kolommen:
id, created_at, categorie, naam_kort, omschrijving, hoeveelheid, eenheid, kcal_per_eenheid, eiwit_per_eenheid, tht, datum_laatste_wijziging, opmerkingen

View: voorraad_schoon
SQL:
create or replace view voorraad_schoon as
select 
  id, 
  created_at, 
  categorie, 
  naam_kort, 
  omschrijving, 
  hoeveelheid, 
  eenheid, 
  kcal_per_eenheid, 
  eiwit_per_eenheid, 
  tht, 
  case 
    when datum_laatste_wijziging = '2025-08-12T08:03:17.819444+00:00' then null 
    else datum_laatste_wijziging 
  end as datum_laatste_wijziging, 
  opmerkingen
from "Voorraad";

Doel: irrelevante datum neutraliseren voordat data naar GPT of Google Sheet gaat.

2. Custom GPT
OpenAPI-spec: https://gist.github.com/janpi80/27bcaec51e4454db0fa36f976d1176c0  
Aanpassingen:
- getVoorraad-route verwijst naar /voorraad_schoon
- Kolommen datum_laatste_wijziging en opmerkingen toegevoegd aan VoorraadItem en VoorraadUpdate
- datum_laatste_wijziging optioneel bij POST (Supabase vult automatisch)

3. Google Sheets
Spreadsheet: https://docs.google.com/spreadsheets/d/1KvllL8AbYfnqMXmbdb8PDDJGQYZwHMN5CgvwzqzICXQ/edit?gid=0#gid=0  
Code.gs gebruikt:
var supabaseUrl = 'https://nvttcwbsqbiidzszaran.supabase.co/rest/v1/voorraad_schoon?select=*';

Aanpassing t.o.v. oorspronkelijke versie:
- voorraad vervangen door voorraad_schoon zodat gefilterde data wordt opgehaald
- Blijft read-only: API key in Sheets is anon-key

4. Implementatiestappen
1. View aanmaken in Supabase SQL (zie script hierboven)
2. YAML aanpassen in getVoorraad-route /voorraad → /voorraad_schoon
3. Nieuwe versie in gist plaatsen en Custom GPT updaten via Edit Actions → Import from URL
4. API key opnieuw invullen
5. Google Sheet updaten in Code.gs met nieuwe view-URL
6. Testen in GPT en Google Sheets om te controleren dat irrelevante datum is verdwenen

5. Belangrijke aandachtspunten
- Nieuwe kolommen toevoegen? Supabase tabel updaten, view voorraad_schoon updaten, YAML aanpassen, Google Sheets Code.gs aanpassen
- Nieuwe filters in view zetten om ongewenste waarden te verwijderen
- Alleen GPT heeft schrijf-toegang; Google Sheets blijft read-only
