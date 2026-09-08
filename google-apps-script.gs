/*
  Google Apps Script receptor para Google Sheets.

  Instrucciones rápidas:
  1. Crea un Google Sheet.
  2. Extensions > Apps Script.
  3. Pega este código.
  4. Cambia SHEET_NAME si quieres.
  5. Deploy > New deployment > Web app.
  6. Ejecutar como: Me.
  7. Acceso: la opción adecuada para tu prueba.
  8. Copia la URL /exec y pégala en ENDPOINT dentro de script.js.

  Columnas esperadas:
  timestamp | campaign | event | email | scenario
*/

const SHEET_NAME = "Eventos";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(["timestamp", "campaign", "event", "email", "scenario"]);
    }

    // Whitelist explícita: solo campos previstos para la simulación.
    const row = [
      String(data.timestamp || ""),
      String(data.campaign || ""),
      String(data.event || ""),
      String(data.email || ""),
      String(data.scenario || "")
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
