# Project Overview

## Doel
Dit project is een geïntegreerd systeem voor voorraadbeheer, boodschappen en receptenbeheer.  
Het maakt gebruik van:
- **Supabase** als centrale database
- **Custom GPT** als beheerinterface
- **Google Sheets** als read-only dashboard

---

## Componenten

### 1. Supabase
- **Tabel:** `Voorraad`
- **View:** `voorraad_schoon` (filtert irrelevante waarden zoals de bulkdatum `2025-08-12T08:03:17.819444+00:00`)
- Houdt automatisch `datum_laatste_wijziging` bij via triggers of automatische kolommen.
- Kolommen:
  - id, created_at, categorie, naam_kort, omschrijving, hoeveelheid, eenheid
  - kcal_per_eenheid, eiwit_per_eenheid, tht, datum_laatste_wijziging, opmerkingen

**Categorieën in gebruik:**
- **Voorraad:** Diepvries, Koelkast en vers, Kruiden en gedroogd, Kast / Houdbaar
- **Boodschappen:** Lijst met nog te kopen producten
- **Recepten:** Bevat recepten, aantal porties, ingrediënten, bereidingswijze

---

### 2. Custom GPT
- Koppelt via een OpenAPI-specificatie (YAML in openai map).
- Schrijf-toegang tot Supabase (service_role key).
- Taken:
  - Producten toevoegen, bijwerken of verwijderen
  - THT-checks uitvoeren
  - Boodschappenlijst beheren
  - Recepten opslaan en ingrediënten controleren
- Haalt data op via de view `voorraad_schoon` om gefilterde data te tonen.

---

### 3. Google Sheets
- Read-only dashboard voor de voorraad.
- Gebruikt `voorraad_schoon` als bron.
- Koppeling via Apps Script (`Code.gs`) met anon key.
- Functies:
  - Actueel overzicht tonen
  - Data automatisch verversen via sync-script

---

## Dataflow

- Custom GPT (schrijven) → Supabase (tabel + view) → Google Sheets (lezen)

---

## Belangrijke aandachtspunten
- **Nieuwe kolommen:**  
  - Supabase tabel bijwerken  
  - View `voorraad_schoon` aanpassen  
  - YAML in gist updaten  
  - Google Sheets script aanpassen
- **Filters:**  
  - Ongewenste waarden filteren in de view, niet in GPT of Sheets.
- **Beveiliging:**  
  - Schrijf-toegang alleen via GPT (service_role key)  
  - Sheets gebruikt alleen anon key voor read-only toegang
