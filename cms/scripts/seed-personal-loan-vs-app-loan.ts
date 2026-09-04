// One-off migration: pushes the existing "Personal Loan vs App Loan" post
// into Sanity so it can be edited from the Studio going forward.
//
// Run with:
//   cd cms
//   npx sanity exec scripts/seed-personal-loan-vs-app-loan.ts --with-user-token
//
// Requires `npx sanity login` to have been run first in this folder.

import fs from "node:fs";
import path from "node:path";
import { getCliClient } from "sanity/cli";

const client = getCliClient();

let keyCounter = 0;
function key() {
  keyCounter += 1;
  return `k${keyCounter}`;
}

function h2(text: string) {
  return { _type: "block", _key: key(), style: "h2", children: [{ _type: "span", _key: key(), text }] };
}

function p(text: string) {
  return { _type: "block", _key: key(), style: "normal", children: [{ _type: "span", _key: key(), text }] };
}

function bulletList(items: string[]) {
  return items.map((text) => ({
    _type: "block",
    _key: key(),
    style: "normal",
    listItem: "bullet",
    level: 1,
    children: [{ _type: "span", _key: key(), text }],
  }));
}

const comparisonTable = {
  _type: "comparisonTable",
  _key: key(),
  column1: "Traditional Personal Loan",
  column2: "Instant App Loan",
  rows: [
    {
      _key: key(),
      label: "Who lends",
      value1: "RBI-regulated banks/NBFCs, direct or via a registered loan advisor (DSA)",
      value2: "Often an NBFC partner behind the app — sometimes clearly disclosed, sometimes buried",
    },
    {
      _key: key(),
      label: "Interest rate",
      value1: "Roughly 10.5%–24% p.a., based on credit profile",
      value2: "Tiny-looking daily/monthly rate that compounds to 30%–60%+ annually",
    },
    {
      _key: key(),
      label: "Documentation",
      value1: "Salary slips, bank statements, ID proof",
      value2: "Minimal — sometimes just PAN, Aadhaar, app permissions",
    },
    {
      _key: key(),
      label: "Loan amount",
      value1: "₹50,000 to several lakhs, more with collateral",
      value2: "Usually ₹1,000 to ₹2–5 lakh",
    },
    {
      _key: key(),
      label: "Tenure",
      value1: "12 months to 5+ years",
      value2: "Days to a few months, occasionally up to 24 months",
    },
    {
      _key: key(),
      label: "Data access",
      value1: "Standard KYC only",
      value2: "Frequently requests contacts, SMS, call logs, location",
    },
    {
      _key: key(),
      label: "Recovery practices",
      value1: "Governed by RBI Fair Practices Code; structured notices",
      value2: "Some apps use aggressive, even harassing tactics when unregulated",
    },
  ],
};

const faqList = {
  _type: "faqList",
  _key: key(),
  items: [
    {
      _key: key(),
      question: "I need an urgent loan right now — can KreditFin help?",
      answer:
        "We can guide you toward the right regulated lender for your situation, but as an advisory partner, we don't disburse funds ourselves, and responsible lending always involves a basic eligibility and document check — even when it's fast. If your need is genuinely urgent and small, a regulated bank-backed app loan may suit you better than a longer consolidation process. If it's a recurring shortfall or multiple existing loans, that's where we can add real value by structuring a proper solution rather than another quick patch.",
    },
    {
      _key: key(),
      question: "App loans charge just 0.01% per day — why would I worry about that?",
      answer:
        "Because daily rates compound annually, and 0.01%–0.2% per day can translate to 18%–70%+ per year depending on the app. Always ask for the annualized rate (APR) and the Key Fact Statement before accepting any offer — it's your right under RBI's digital lending rules.",
    },
    {
      _key: key(),
      question: "I'm a student — can I get a personal loan?",
      answer:
        "Most banks and NBFCs require a stable income source, so students without salaried income typically don't qualify for a standard personal loan. Some lenders offer education-specific or co-signed loans with a parent/guardian as guarantor. If you're a student facing a short-term need, it's worth discussing with family before turning to an unregulated app, since student profiles are frequently targeted by high-cost, low-transparency lenders.",
    },
    {
      _key: key(),
      question: "Can a loan app really access my contacts and harass my family?",
      answer:
        "Yes — this has happened, and the RBI has taken action against multiple digital lending apps for exactly this. Apps that request contact list, SMS, or call log permissions beyond standard KYC, and use them to pressure repayment by contacting your network, are violating RBI's Digital Lending Guidelines. Always check app permissions before installing, and avoid any lender that doesn't clearly disclose its RBI-regulated banking/NBFC partner.",
    },
    {
      _key: key(),
      question: "What's the difference between a “good” app loan and a “bad” one?",
      answer:
        "A good one discloses its regulated lending partner, gives you a Key Fact Statement, asks only for KYC-relevant permissions, and routes disbursal/repayment directly through your bank account. A bad one hides the lender's identity, asks for contact/SMS access, and pressures you with vague or threatening recovery messages.",
    },
    {
      _key: key(),
      question: "I have three personal loans and two app loans running together — what should I do?",
      answer:
        "This is the most common situation we see, and it's manageable. Rather than taking a fourth loan to pay off the others, the better move is usually consolidation — combining everything into a single loan with one EMI and a lower blended interest rate, especially if you own property that can be used as security. Talk to a regulated lender or advisory partner before taking on more unsecured debt.",
    },
    {
      _key: key(),
      question: "Does taking a loan against property mean I risk losing my home?",
      answer:
        "Like any secured loan, timely repayment matters — missed payments on any loan (secured or unsecured) carry consequences. The advantage of a Loan Against Property used for consolidation is that your combined monthly EMI usually drops significantly compared to juggling several unsecured loans at higher rates, making repayment more manageable, not less.",
    },
  ],
};

const checklist = {
  _type: "checklist",
  _key: key(),
  items: [
    "Convert any “per day” or “per month” rate to an annual percentage",
    "Ask for the Key Fact Statement (mandatory under RBI digital lending rules)",
    "Check which bank/NBFC is actually disbursing the loan",
    "Review app permissions before installing — decline contact/SMS access requests",
    "If you're managing more than one active loan, look at consolidation before taking a new one",
    "Work only with RBI-regulated lenders or advisory partners — never an unregistered lender or app",
  ],
};

const body = [
  p("“0.01% per day” sounds like nothing. On paper, it isn't. On your phone's contact list, it can become everything."),
  p("If you've ever typed “urgent loan” into Google at 11 PM, you've probably landed on five different loan apps promising money in your account in 10 minutes. No paperwork. No income proof. Just your Aadhaar, a selfie, and a tap."),
  p("It feels like the answer. For a few hundred or a few thousand rupees, it usually is."),
  p("But when that “quick fix” becomes your third app loan in two months, the question changes from “how fast can I get money?” to “how do I get out of this?”"),
  p("This guide breaks down personal loans vs app loans honestly — the real cost, the real risk, and when each one actually makes sense. No scare tactics, no guaranteed-approval promises. Just the facts you need before you tap “Apply.”"),

  h2("Personal Loan vs App Loan: The Core Difference"),
  comparisonTable,
  p("The headline difference isn't really speed. Banks have gotten faster too. The real difference is what you're trading for that speed — usually a much higher effective cost, and sometimes your privacy."),

  h2("Why “0.01% Per Day” Isn't What It Sounds Like"),
  p("This is one of the most common questions we hear, so let's do the maths plainly."),
  p("0.01% per day looks like a rounding error. But annualized, even small daily rates add up fast:"),
  ...bulletList([
    "0.05% per day → roughly 18% per year",
    "0.1% per day → roughly 36% per year",
    "0.15%–0.2% per day → 55%–73% per year, common among several app-based lenders",
  ]),
  p("Compare that to a standard personal loan from a bank or NBFC at 10.5%–24% per annum, or a Loan Against Property at 9%–13% per annum. The “tiny daily rate” framing is a marketing choice, not a cost advantage. Always convert any daily or monthly rate to an annual percentage rate (APR) before comparing — and ask for the Key Fact Statement (KFS), which RBI now mandates every digital lender disclose. If an app won't show you one, that's your answer."),

  h2("The Part Nobody Tells You: App Permissions and Recovery Harassment"),
  p("Here's the angle most “best loan apps” listicles skip entirely."),
  p("Many unregulated or loosely regulated lending apps ask for permissions that have nothing to do with assessing your loan — contact list access, SMS reading, call log history, even gallery access. This isn't for KYC. It's leverage."),
  p("When a repayment is missed — even by a day, even due to a genuine emergency — some of these apps (or the recovery agents working for them) have been known to:"),
  ...bulletList([
    "Message or call your saved contacts, including family, colleagues, and friends",
    "Send messages implying you're a defaulter or “untrustworthy,” sometimes to people who have nothing to do with the loan",
    "Use morphed images or threats to pressure repayment",
    "Continue contact even after partial payment or a reasonable repayment request",
  ]),
  p("This is not just unethical — the RBI has repeatedly flagged and acted against digital lending apps for exactly this conduct, and has tightened rules requiring lenders to route disbursal and repayment only through bank accounts, disclose all lending partners clearly, and stop unauthorized data access. The RBI's Digital Lending Guidelines specifically prohibit accessing a borrower's contact list or media files without explicit, revocable consent tied only to the loan purpose."),
  p("Before you install any loan app, check three things:"),
  ...bulletList([
    "Does it disclose the name of its RBI-regulated lending partner (bank/NBFC) upfront?",
    "Does it ask for contact list, SMS, or call log permissions? (A legitimate app shouldn't need these.)",
    "Does it provide a Key Fact Statement before you accept the loan?",
  ]),
  p("If the answer to #1 is no, or #2 is yes — pause."),

  h2("So When Does a Personal Loan Make More Sense Than an App Loan?"),
  p("App loans aren't always wrong. For a genuine ₹5,000–₹10,000 short-term gap, repaid within weeks, a regulated app loan from a known NBFC partner can be a reasonable, fast tool."),
  p("Where it stops making sense is when:"),
  ...bulletList([
    "You're borrowing a larger amount (₹50,000+) for a planned need — medical, education, wedding, renovation",
    "You're already juggling two or more active loans or app dues",
    "You need longer repayment time to keep your monthly EMI manageable",
    "The interest cost over the full tenure matters more than how fast the money lands",
  ]),
  p("This is exactly where a structured personal loan — or better, a secured loan against your home equity — changes the math entirely. Instead of 3–4 high-interest unsecured loans or app dues nibbling away at your salary every month, one consolidated secured loan can mean a single EMI, a dramatically lower interest rate, and a tenure that actually fits your income."),

  h2("How KreditFin Fits In — Without Adding to Your Stress"),
  p("KreditFin is not a lender. We don't disburse loans, and we never will pretend otherwise — we are a loan advisory and facilitation partner (DSA) working with RBI-regulated banks and NBFCs."),
  p("What that means practically: when multiple personal loans, app loan dues, and credit card bills start adding up, we look at whether your home equity can be used to restructure all of it into one secured loan against property — typically at a much lower rate, with a longer tenure, and one EMI instead of several."),
  p("We're not here to push you into anything faster than you're ready for. Our role is to lay out your real options — secured consolidation, unsecured consolidation, or a fresh personal loan — explain the actual cost of each in plain numbers, and connect you with the right regulated lender for your profile. No pressure, no guaranteed-approval promises, and no judgment about how you got here. Debt stress is common; the way out just needs to be structured properly."),
  p("Ghar hi bachayega aapka Ghar — sometimes, the asset you already own is the simplest way to fix a complicated EMI situation."),

  h2("Frequently Asked Questions"),
  faqList,

  h2("A Quick Checklist Before You Borrow Anything"),
  checklist,
];

async function run() {
  const imagePath = path.resolve(__dirname, "../../public/assets/blog-1.png");
  const imageAsset = await client.assets.upload("image", fs.createReadStream(imagePath), {
    filename: "blog-1.png",
  });

  const doc = {
    _id: "blogPost-personal-loan-vs-app-loan",
    _type: "blogPost",
    title: "Personal Loan vs App Loan: Which One Actually Helps You — and Which One Hurts You Later?",
    slug: { _type: "slug", current: "personal-loan-vs-app-loan" },
    excerpt: "“0.01% per day” sounds like nothing. On paper, it isn't. On your phone's contact list, it can become everything.....",
    author: "Team Kreditfin",
    publishedAt: new Date("2026-07-07").toISOString(),
    mainImage: { _type: "image", asset: { _type: "reference", _ref: imageAsset._id } },
    body,
    disclaimer:
      "This article is for general informational purposes and does not constitute financial advice. KreditFin (AS Fintech Private Limited) is a loan advisory and facilitation partner (DSA) working with RBI-regulated banks and NBFCs. KreditFin does not provide loans directly. All loan approvals, interest rates, and terms are determined solely by the partner bank/NBFC based on their credit policy.",
  };

  const result = await client.createOrReplace(doc);
  console.log(`Seeded blog post: ${result._id}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
