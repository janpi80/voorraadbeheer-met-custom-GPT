# Google Sheets – Read-only koppeling

Doel:
Alleen uitlezen van Supabase-data, zonder wijziging.

Belangrijkste codeaanpassing:
In Code.gs:
var supabaseUrl = 'https://nvttcwbsqbiidzszaran.supabase.co/rest/v1/voorraad_schoon?select=*';

Aanpassen in Google Sheets:
1. Open Extensions → Apps Script
2. Plak de bijgewerkte Code.gs
3. Vervang de Supabase URL en API key indien nodig
4. Sla op en voer syncFromSupabase() uit
