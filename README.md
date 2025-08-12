# Voorraadbeheer – Supabase + Custom GPT + Google Sheets

## Overzicht
Dit project is een volledig digitaal systeem voor **voorraadbeheer**, **boodschappen** en **receptbeheer**.  
Het combineert:
- **Supabase** als centrale database
- **Custom GPT** als slimme interface voor beheer
- **Google Sheets** als visueel dashboard (read-only)

Met dit systeem kun je:
- Producten toevoegen, wijzigen en verwijderen
- Houdbaarheidsdata (THT) controleren
- Notities toevoegen aan producten
- Een boodschappenlijst bijhouden
- Recepten opslaan en automatisch ingrediënten controleren
- Altijd een up-to-date overzicht hebben in Google Sheets

---

## Hoe het werkt
1. **Custom GPT**  
   - Is gekoppeld via een OpenAPI-specificatie.
   - Kan voorraad, boodschappen en recepten beheren met commando's in natuurlijke taal.
   - Alleen GPT heeft schrijf-toegang (via Supabase service_role key).

2. **Supabase**  
   - Bevat de hoofdtabel `Voorraad` met alle categorieën.
   - Extra view `voorraad_schoon` filtert onnodige waarden (zoals irrelevante bulkdatums).
   - Houdt automatisch bij wanneer een product voor het laatst is gewijzigd.

3. **Google Sheets**  
   - Haalt data op uit `voorraad_schoon`.
   - Is **read-only** (gebruikt anon key) zodat gegevens niet per ongeluk worden gewijzigd.
   - Geeft altijd een actueel overzicht van de voorraad.

---

## Databasecategorieën

### 1. Voorraadbeheer
Categorieën:
- Diepvries
- Koelkast en vers
- Kruiden en gedroogd
- Kast / Houdbaar

**Functies:**
- Producten toevoegen, bewerken of verwijderen.
- THT-checks voor versproducten (3 dagen) en overige (7 dagen).
- Opmerkingenveld voor extra context.

---

### 2. Boodschappenlijst
- **Categorie:** `boodschappen`
- Bevat producten die nog gekocht moeten worden.
- Kan automatisch worden gevuld als ingrediënten ontbreken voor een recept.
- Na aankoop worden items verwijderd en toegevoegd aan de juiste voorraadcategorie.

---

### 3. Recepten
- **Categorie:** `recepten`
- Opslag als één item per recept.
- **hoeveelheid** = aantal porties.
- **omschrijving** bevat ingrediëntenlijst en bereidingswijze.
- **kcal_per_eenheid** en **eiwit_per_eenheid** per portie.
- GPT kan automatisch controleren of alle ingrediënten aanwezig zijn en ontbrekende producten op de boodschappenlijst zetten.

---

## Belangrijkste voordelen
- **Centrale opslag**: alle gegevens in Supabase.
- **Slimme bediening**: beheer via natuurlijke taal met GPT.
- **Visueel overzicht**: Google Sheets als dashboard.
- **Automatisch filteren**: onnodige datums/waarden verwijderd in de view.
- **Veiligheid**: schrijf-toegang alleen voor GPT, lees-toegang voor Sheets.

---

## Systeemoverzicht

Custom GPT (schrijf) → Supabase (tabel + view) → Google Sheets (lees)
---

## Installatie & gebruik
- [`INSTALL.md`](INSTALL.md): stap-voor-stap installatie-instructies.
- [`UPDATE_STEPS.md`](UPDATE_STEPS.md): bijwerken van het systeem.
- [`PROJECT_OVERVIEW.md`](PROJECT_OVERVIEW.md): technische details.

---

## Links
- **Google Spreadsheet**: zie INSTALL.md voor instructies om je eigen gekoppelde sheet op te zetten.
- **OpenAPI gist**: [Open](https://gist.github.com/janpi80/27bcaec51e4454db0fa36f976d1176c0)

---

## Licentie
Dit project valt onder de MIT-licentie – zie [`LICENSE`](LICENSE).
