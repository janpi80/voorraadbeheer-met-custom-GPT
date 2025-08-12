# Installatiehandleiding – Voorraadbeheer-project

Deze handleiding beschrijft hoe je het project vanaf nul kunt opzetten.

---

## 1. Supabase opzetten

1. Maak een nieuw project aan op https://supabase.com.
2. Ga naar **Table editor** en voer de SQL in uit `sql/create_tables.sql` om de `Voorraad`-tabel aan te maken.
3. Maak de view aan door de SQL uit `sql/create_view_voorraad_schoon.sql` uit te voeren.
4. Ga naar **Project settings → API** en noteer:
   - **anon public key** (voor Google Sheets read-only)
   - **service_role key** (voor Custom GPT write-toegang)

---

## 2. OpenAPI YAML koppelen aan Custom GPT

1. Open de YAML in `openapi/voorraadbeheer-api.yaml`.
2. Upload de YAML naar https://gist.github.com (maak of update je gist).
3. Kopieer de **raw URL** van het gist.
4. Ga in Custom GPT naar **Edit Actions**.
5. Kies **Import from URL** en plak de gist raw URL.
6. Vul de **service_role key** in als API key.
7. Test GET, POST, PATCH en DELETE.

---

## 3. Google Sheets koppelen

1. Open de Google Spreadsheet (link in README.md).
2. Ga naar **Extensions → Apps Script**.
3. Plak de inhoud van `code/google-sheets-sync.gs`.
4. Vul je **anon public key** in bij `supabaseKey`.
5. Sla op en voer `syncFromSupabase()` uit.
6. De sheet laadt nu automatisch alle data uit `voorraad_schoon`.

---

## 4. Projectbestanden in GitHub

Structuur:
- `docs/` → Uitleg per onderdeel
- `sql/` → SQL-scripts voor tabellen en views
- `openapi/` → OpenAPI specificatie
- `code/` → Google Sheets script
- `UPDATE_STEPS.md` → Checklist voor updates
- `CHANGELOG.md` → Historisch logboek
- `INSTALL.md` → Deze installatiehandleiding

---

## 5. Eerste test

- Voeg via GPT een product toe.
- Controleer in Supabase of het is toegevoegd.
- Run `syncFromSupabase()` in Google Sheets om te zien of het verschijnt.
