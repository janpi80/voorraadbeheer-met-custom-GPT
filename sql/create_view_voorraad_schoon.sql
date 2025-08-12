#-- Maak of vervang de view 'voorraad_schoon'
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
        when datum_laatste_wijziging = '2025-08-12T08:03:17.819444+00:00' 
        then null 
        else datum_laatste_wijziging 
    end as datum_laatste_wijziging,
    opmerkingen
from "Voorraad";
