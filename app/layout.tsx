import type { Metadata } from "next";
import "./globals.css";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: `${business.name} | ${business.descriptor}`,
  description: business.slogan,
  openGraph: { title: business.name, description: business.slogan, locale: "pt_BR", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
