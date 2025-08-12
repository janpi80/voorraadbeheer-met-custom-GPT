📦 Voorraadbeheer – Supabase + Custom GPT + Google Sheets

Overzicht
Dit project koppelt een Supabase-database aan een Custom GPT voor voorraadbeheer, en een Google Sheet als read-only dashboard.
	•	Custom GPT: Alle bewerkingen (toevoegen, wijzigen, verwijderen, THT-checks).
	•	Google Sheet: Alleen uitlezen (read-only).
	•	Supabase View (voorraad_schoon): Filtert automatisch irrelevante waarden, zoals de bulkdatum 2025-08-12T08:03:17.819444+00:00.

Belangrijke onderdelen

Supabase
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
when datum_laatste_wijziging = ‘2025-08-12T08:03:17.819444+00:00’ then null
else datum_laatste_wijziging
end as datum_laatste_wijziging,
opmerkingen
from “Voorraad”;

Doel: irrelevante datums neutraliseren voordat data naar GPT of Google Sheet gaat.

Custom GPT
OpenAPI-spec: https://gist.github.com/janpi80/27bcaec51e4454db0fa36f976d1176c0
getVoorraad → /voorraad_schoon (view)
postVoorraad, patchVoorraad, deleteVoorraad → /Voorraad (tabel)

Google Sheets
Spreadsheet: https://docs.google.com/spreadsheets/d/1KvllL8AbYfnqMXmbdb8PDDJGQYZwHMN5CgvwzqzICXQ/edit?gid=0#gid=0
Code.gs gebruikt:
var supabaseUrl = ‘https://nvttcwbsqbiidzszaran.supabase.co/rest/v1/voorraad_schoon?select=*’;

Implementatiestappen
	1.	View aanmaken in Supabase
SQL uit bovenstaande sectie uitvoeren.
	2.	YAML aanpassen
In getVoorraad-route /Voorraad vervangen door /voorraad_schoon.
Nieuwe versie in gist plaatsen.
	3.	Custom GPT updaten
In GPT → Edit Actions → Import from URL (raw gist link).
API key opnieuw invullen.
	4.	Google Sheet updaten
In Code.gs de supabaseUrl aanpassen naar voorraad_schoon.
	5.	Testen
In GPT en Google Sheets controleren of irrelevante datum verdwenen is.

Belangrijke aandachtspunten
	•	Nieuwe kolommen? Aanpassen in:
	1.	Supabase tabel
	2.	View voorraad_schoon
	3.	YAML-spec
	4.	Google Sheets Code.gs
	•	Nieuwe filters? Toevoegen in voorraad_schoon.
	•	API-wijzigingen? YAML aanpassen en opnieuw importeren.
