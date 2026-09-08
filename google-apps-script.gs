const SHEET_NAME = "Eventos";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(["timestamp","campaign","event","email","action","provider","source"]);
    }

    sheet.appendRow([
      String(data.timestamp || ""),
      String(data.campaign || ""),
      String(data.event || ""),
      String(data.email || ""),
      String(data.action || ""),
      String(data.provider || ""),
      String(data.source || "")
    ]);

    return ContentService.createTextOutput(JSON.stringify({ok:true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
