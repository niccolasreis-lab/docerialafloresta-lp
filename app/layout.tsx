import type { Metadata } from "next";
import "./globals.css";
import { business } from "@/data/business";

const seoTitle = `${business.name} | Bolos, doces e salgados no Jaçanã`;
const seoDescription = `${business.slogan}. Encomendas e delivery pelo WhatsApp e iFood em São Paulo.`;
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl = configuredSiteUrl
  ? new URL(configuredSiteUrl.startsWith("http") ? configuredSiteUrl : `https://${configuredSiteUrl}`)
  : new URL("http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: seoTitle,
  description: seoDescription,
  keywords: ["doceria", "bolos", "doces", "salgados", "sorvetes", "Jaçanã", "São Paulo", "Doceria La Floresta", "encomendas de bolos"],
  authors: [{ name: business.name }],
  creator: business.name,
  publisher: business.name,
  openGraph: {
    title: seoTitle,
    description: seoDescription,
    url: "/",
    siteName: business.name,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/generated/refresh/bolo-floresta-negra-v2.webp",
        width: 1024,
        height: 1024,
        alt: "Bolo Floresta Negra da Doceria La Floresta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: seoDescription,
    images: ["/images/generated/refresh/bolo-floresta-negra-v2.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Bakery", "LocalBusiness"],
  name: business.name,
  description: business.slogan,
  image: new URL("/images/generated/refresh/bolo-floresta-negra-v2.webp", siteUrl).toString(),
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    addressRegion: business.address.state,
    postalCode: business.address.postalCode,
    addressCountry: "BR",
  },
  telephone: [business.whatsapp.display, ...business.phones],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: business.hours.openingTime,
    closes: business.hours.closingTime,
  },
  sameAs: [business.social.instagram, business.social.ifood],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
