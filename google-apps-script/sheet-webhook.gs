/**
 * KreditFin website — form submissions → Google Sheet.
 *
 * Deploy steps:
 * 1. Open the target Sheet: https://docs.google.com/spreadsheets/d/1lrzrcmYRnYEJbjMNwqAqzLkul1Im76LTjwwd4PjUmns/edit
 * 2. Extensions > Apps Script.
 * 3. Delete any placeholder code and paste this whole file in.
 * 4. Deploy > New deployment > select type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Click Deploy, authorize the requested permissions, then copy the
 *    "Web app URL" it gives you.
 * 6. Set that URL as NEXT_PUBLIC_SHEET_WEBHOOK_URL in the site's .env.local
 *    (and in your hosting provider's environment settings for production).
 *
 * If you ever edit this script after deploying, use
 * Deploy > Manage deployments > (pencil icon) > New version, otherwise the
 * live Web App URL keeps running the old code.
 */

const SHEET_NAME = "Submissions";

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();
    const headers = getOrInitHeaders(sheet, body);
    const row = headers.map((h) => (h === "Timestamp" ? new Date() : (body[h] ?? "")));
    sheet.appendRow(row);
    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false, message: String(err) });
  }
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  return sheet;
}

// Ensures a header row exists and grows it if the incoming payload has new
// fields (e.g. a different form on the site adds a column that doesn't exist
// yet), so every form on the site can share the same sheet/script.
function getOrInitHeaders(sheet, body) {
  const lastCol = sheet.getLastColumn();
  let headers = lastCol > 0 ? sheet.getRange(1, 1, 1, lastCol).getValues()[0] : [];

  if (headers.length === 0) {
    headers = ["Timestamp", "subject"];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }

  const newKeys = Object.keys(body).filter((k) => headers.indexOf(k) === -1);
  if (newKeys.length > 0) {
    headers = headers.concat(newKeys);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }

  return headers;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
