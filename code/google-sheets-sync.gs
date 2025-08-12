function syncFromSupabase() {
  // Configuratie - vervang met jouw waarden
  var supabaseUrl = 'https://nvttcwbsqbiidzszaran.supabase.co/rest/v1/voorraad_schoon?select=*';
  var supabaseKey = 'PLAATS_HIER_JE_ANON_API_KEY'; // Alleen anon key gebruiken voor read-only

  var sheet = SpreadsheetApp.getActiveSheet();

  // Debug: Log start
  Logger.log('Start: Sheet naam: ' + sheet.getName());

  // Sheet leegmaken (behalve rij 1)
  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clear();
    Logger.log('Sheet gewist vanaf rij 2');
  } else {
    Logger.log('Sheet was al leeg (behalve headers)');
  }

  // Data ophalen van Supabase
  var headers = {
    'apikey': supabaseKey,
    'Authorization': 'Bearer ' + supabaseKey
  };
  var response = UrlFetchApp.fetch(supabaseUrl, { headers: headers });
  Logger.log('Response status: ' + response.getResponseCode());
  Logger.log('Response content: ' + response.getContentText().substring(0, 500)); // Eerste 500 chars voor debug

  var data = JSON.parse(response.getContentText());
  Logger.log('Aantal rijen opgehaald: ' + data.length);

  // Headers controleren en rijen toevoegen
  var dataRows = [];
  data.forEach(function(row) {
    var dataRow = [
      row.id || '',
      row.created_at || '',
      row.categorie || '',
      row.naam_kort || '',
      row.omschrijving || '',
      row.hoeveelheid || '',
      row.eenheid || '',
      row.kcal_per_eenheid || '',
      row.eiwit_per_eenheid || '',
      row.tht || '',
      row.datum_laatste_wijziging || '',
      row.opmerkingen || ''
    ];
    dataRows.push(dataRow);
  });
  Logger.log('Aantal rijen voorbereid: ' + dataRows.length);

  // Schrijf data naar Sheet (beginnend bij rij 2)
  if (dataRows.length > 0) {
    sheet.getRange(2, 1, dataRows.length, dataRows[0].length).setValues(dataRows);
    Logger.log('Data geschreven naar Sheet');
  } else {
    Logger.log('Geen data om te schrijven');
  }
}
