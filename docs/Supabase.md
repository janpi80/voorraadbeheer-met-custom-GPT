# Supabase – Tabellen & Views

## Tabel: Voorraad
Kolommen:
- id (PK)
- created_at (timestamp, default now())
- categorie (string)
- naam_kort (string)
- omschrijving (string)
- hoeveelheid (numeric)
- eenheid (string)
- kcal_per_eenheid (numeric)
- eiwit_per_eenheid (numeric)
- tht (date)
- datum_laatste_wijziging (timestamp, default now())
- opmerkingen (text)

## View: voorraad_schoon
Doel: filtert de irrelevante datum `2025-08-12T08:03:17.819444+00:00`

SQL:
```sql
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
