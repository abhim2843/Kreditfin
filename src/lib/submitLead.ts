// Submits website form data to Web3Forms, which emails it to the configured inbox.
// Free, no backend. Get an access key at https://web3forms.com (tied to the
// destination email) and set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY.
//
// Submissions are also mirrored into a Google Sheet via a Google Apps Script
// Web App (see google-apps-script/sheet-webhook.gs for the script + deploy
// steps). Set NEXT_PUBLIC_SHEET_WEBHOOK_URL to the deployed Web App URL.

export type LeadData = Record<string, string>;

async function postToSheet(data: LeadData, subject: string) {
  const webhookUrl = process.env.NEXT_PUBLIC_SHEET_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    // Sent as text/plain to avoid a CORS preflight — Apps Script Web Apps
    // don't handle OPTIONS requests, so a JSON content-type would fail.
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ subject, ...data }),
    });
  } catch {
    // Non-fatal: the email submission via Web3Forms is the source of truth.
    // A sheet-logging failure shouldn't block the user's enquiry from going through.
  }
}

export async function submitLead(data: LeadData, subject = "New KreditFin enquiry") {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    throw new Error("Email service is not configured yet. Please try again later.");
  }

  // Fire-and-forget mirror to Google Sheets; doesn't block or affect the email flow.
  void postToSheet(data, subject);

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      subject,
      from_name: "KreditFin Website",
      ...data,
    }),
  });

  const json = await res.json();
  if (!json.success) {
    throw new Error(json.message || "Something went wrong. Please try again.");
  }
  return json;
}
