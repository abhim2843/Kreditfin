import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Loan Consolidation & Debt Consolidation in India | Lower Your EMI — KreditFin",
  description: "Juggling multiple EMIs? KreditFin consolidates personal loans, credit cards & app loans into one EMI — with or without property, lower rate, longer tenure.",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.kreditfin.com";

const orgAddress = {
  "@type": "PostalAddress",
  streetAddress: "Plot No 4, 3rd Floor, Vikas Marg, Swasthya Vihar",
  addressLocality: "New Delhi",
  postalCode: "110092",
  addressCountry: "IN",
};

const aggregateRating = {
  "@type": "AggregateRating",
  ratingValue: "5.0",
  bestRating: "5",
  reviewCount: "67",
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "AS Fintech Private Limited",
      alternateName: "KreditFin",
      legalName: "AS Fintech Private Limited",
      foundingDate: "2018",
      url: siteUrl,
      logo: `${siteUrl}/assets/logo.png`,
      image: `${siteUrl}/assets/logo.png`,
      email: "support@kreditfin.com",
      telephone: "+91-7303820386",
      address: orgAddress,
      aggregateRating,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: "+91-7303820386",
          email: "support@kreditfin.com",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
        },
        {
          "@type": "ContactPoint",
          contactType: "Grievance Redressal Officer",
          name: "Mr. Sarvesh (Director)",
          email: "support@kreditfin.com",
          areaServed: "IN",
        },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#localbusiness`,
      name: "KreditFin",
      image: `${siteUrl}/assets/logo.png`,
      url: siteUrl,
      telephone: "+91-7303820386",
      email: "support@kreditfin.com",
      address: orgAddress,
      aggregateRating,
      parentOrganization: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <head>
        {/* Organization + LocalBusiness structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />

        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KN2NT9XF');`}
        </Script>
        {/* End Google Tag Manager */}

        {/* Microsoft Clarity */}
        <Script id="clarity-script" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "xj4ywsti0g");`}
        </Script>
        {/* End Microsoft Clarity */}

        {/* Meta Pixel Code */}
        <Script id="meta-pixel-script" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '856876575255112');
          fbq('track', 'PageView');`}
        </Script>
        {/* End Meta Pixel Code */}
      </head>
      <body className="antialiased font-[family-name:var(--font-manrope)]">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KN2NT9XF"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {/* Meta Pixel Code (noscript) */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=856876575255112&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code (noscript) */}
        {children}
      </body>
    </html>
  );
}
