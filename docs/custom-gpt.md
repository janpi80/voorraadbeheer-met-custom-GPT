# Custom GPT – OpenAPI integratie

## OpenAPI-specificatie
Bestand: `openapi/openapi.yaml`  

## Belangrijk
- `getVoorraad` gebruikt `/voorraad_schoon` in plaats van `/Voorraad`
- Extra velden toegevoegd: `datum_laatste_wijziging` en `opmerkingen`
- `datum_laatste_wijziging` is optioneel bij POST (Supabase vult automatisch)

## Import in GPT
1. Open GPT → **Edit Actions**
2. Kies **Import from URL**
3. Vul gist-raw link in
4. API-key invullen (Supabase anon key)
5. Test de 4 routes (GET, POST, PATCH, DELETE)
