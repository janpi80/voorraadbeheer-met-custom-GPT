# Update stappen voor Voorraadbeheer-project

Deze stappen volg je bij elke wijziging aan het systeem (Supabase, Custom GPT of Google Sheets).

1. Pas de Supabase-tabel aan indien nodig.
   - Voeg kolommen toe of verwijder deze via SQL.
   - Voer `sql/create_tables.sql` opnieuw uit indien je de hele tabel wilt opbouwen.

2. Werk de view `voorraad_schoon` bij.
   - Pas SQL aan in `sql/create_view_voorraad_schoon.sql`.
   - Zorg dat filters correct blijven werken (bijvoorbeeld datumfilter voor irrelevante data).

3. Werk de OpenAPI YAML (`openapi/voorraadbeheer-api.yaml`) bij.
   - Voeg nieuwe kolommen toe aan `VoorraadItem` en `VoorraadUpdate`.
   - Pas de `getVoorraad` route aan als je een andere view of tabel wilt gebruiken.
   - Update changelog bovenin YAML.

4. Upload de nieuwe YAML naar Gist.
   - Ga naar https://gist.github.com
   - Vervang de inhoud van het bestaande gist met de nieuwe YAML.
   - Kopieer de **raw** link.

5. Update Custom GPT met nieuwe YAML.
   - Open Custom GPT → Edit Actions.
   - Kies "Import from URL" en plak de nieuwe gist-raw link.
   - Vul API-key in (Supabase service role key voor write-toegang).

6. Update Google Sheets (Code.gs) indien kolommen zijn gewijzigd.
   - Pas URL of kolomnamen aan in `code/google-sheets-sync.gs`.
   - Gebruik alleen de **anon key** voor read-only toegang.

7. Test het systeem.
   - Controleer in GPT of GET, POST, PATCH en DELETE werken.
   - Controleer in Google Sheets of de juiste data wordt weergegeven.
   - Controleer of filters (zoals datumfilter in view) correct werken.
