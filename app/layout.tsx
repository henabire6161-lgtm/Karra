import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Karra Solutions | Practical Solutions. Sustainable Growth.",
  description:
    "Karra Solutions connects businesses, properties and agricultural value chains through practical solutions designed for Ethiopia.",
  keywords: [
    "Karra Solutions",
    "market solutions Ethiopia",
    "property management Ethiopia",
    "Agri Linkages Ethiopia",
  ],
  openGraph: {
    title: "Karra Solutions | Practical Solutions. Sustainable Growth.",
    description:
      "Market execution, owner side property management and agricultural linkages in Ethiopia.",
    type: "website",
    locale: "en_ET",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
