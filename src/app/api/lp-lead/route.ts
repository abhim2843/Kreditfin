import { NextRequest, NextResponse } from "next/server";

// Server-side so the webhook URL and shared secret never reach the browser.
// Add to .env.local (and your hosting provider's env settings):
//   SHEET_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
//   SHEET_WEBHOOK_SECRET=<same long random string as CONFIG.SHARED_SECRET>

export const runtime = "nodejs";

const INDIAN_MOBILE = /^[6-9]\d{9}$/;

// Very small in-memory throttle. Resets on cold start, which is fine — it is
// there to blunt a script hammering the endpoint, not to be a security control.
const recent = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function throttled(key: string) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > MAX_PER_WINDOW;
}

function istTimestamp(d: Date) {
  // Meta writes created_time as ISO with offset, e.g. 2026-09-03T14:22:11+05:30
  const ist = new Date(d.getTime() + 5.5 * 60 * 60 * 1000);
  return ist.toISOString().replace("Z", "+05:30");
}

function leadId() {
  // 16 digits: 13-digit epoch ms + 3 random. Lead Desk's repairKeys_ validates
  // Lead IDs against /^\d{15,19}$/ — a non-numeric id gets flagged as corrupt
  // and overwritten via a RAW_LEADS phone lookup.
  const rand = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  return `${Date.now()}${rand}`;
}

export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: a real person never fills a hidden field.
  if (body.company_website) {
    return NextResponse.json({ ok: true, id: leadId() });
  }

  // Timing check: a human cannot complete five steps in under four seconds.
  const elapsed = Number(body.elapsed_ms || 0);
  if (elapsed > 0 && elapsed < 4000) {
    return NextResponse.json({ ok: true, id: leadId() });
  }

  const phone = String(body.whatsapp_number || "").replace(/\D/g, "").slice(-10);
  if (!INDIAN_MOBILE.test(phone)) {
    return NextResponse.json({ ok: false, error: "Enter a valid 10-digit Indian mobile number." }, { status: 400 });
  }

  const name = String(body.full_name || "").trim();
  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "Enter your full name." }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (throttled(ip)) {
    return NextResponse.json({ ok: false, error: "Too many attempts. Try again in a few minutes." }, { status: 429 });
  }

  const id = leadId();

  // Mapped 1:1 onto the raw leads tab's Meta instant-form headers.
  // Keys here MUST match those column names character for character.
  const payload: Record<string, string> = {
    secret: process.env.SHEET_WEBHOOK_SECRET ?? "",

    id,
    created_time: istTimestamp(new Date()),
    ad_id: body.ad_id || "",
    ad_name: body.ad_name || "",
    adset_id: body.adset_id || "",
    adset_name: body.adset_name || "",
    campaign_id: body.campaign_id || "",
    campaign_name: body.campaign_name || "",
    form_id: "website_lp",
    form_name: body.form_name || "Website LP — Consolidation",
    is_organic: body.ad_id ? "false" : "true",
    platform: body.platform || "website",

    "choose_employment_type?": body.employment || "",
    "your_monthly_in-hand_salary?": body.salary_band || "",
    "your_cibil_score?_(most_important)":
      body.cibil_band === "Not sure" ? "" : body.cibil_band || "",
    "what_are_you_looking_for?": body.product || "",
    "how_much_loan_do_you_need?": body.loan_band_pl || "",
    "how_much_loan_are_you_looking_for(lap)?": body.loan_band_lap || "",
    "annual_business_turnover?": body.turnover_band || "",
    whatsapp_number: `p:+91${phone}`,
    full_name: name,
    email: String(body.email || "").trim(),
    lead_status: "",

    // Columns the instant form doesn't have. The Apps Script appends these to
    // the end of the header row once, then reuses them.
    // Alias-matched to Lead Desk FIELD_ALIASES.propertyOwn
    property_owned: body.property || "",
    // Alias-matched to Lead Desk FIELD_ALIASES.company
    company_name: String(body.employer || "").trim(),
    "best_time_to_contact?": body.best_time || "",
    "pincode?": String(body.pincode || "").trim(),
    "city?": String(body.city || "").trim(),
    landing_page: body.page_path || "",
    fbclid: body.fbclid || "",
  };

  const url = process.env.SHEET_WEBHOOK_URL;
  if (!url) {
    console.error("SHEET_WEBHOOK_URL is not set — lead not persisted:", id);
    return NextResponse.json({ ok: false, error: "Submissions are not configured yet." }, { status: 500 });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });
    const json = await res.json().catch(() => ({ success: false }));
    if (!json.success) throw new Error(json.message || "Sheet write failed");
  } catch (err) {
    // Log loudly but still confirm to the user — never lose a lead to a
    // transient Apps Script hiccup. Check server logs if the sheet looks short.
    console.error("Sheet write failed for lead", id, err);
    return NextResponse.json({ ok: true, id, warning: "queued" });
  }

  return NextResponse.json({ ok: true, id });
}
