import type { Metadata } from "next";

import "@material-symbols/font-400/outlined.css";
import "./globals.css";

import { spaceGrotesk } from "@/shared/config/fonts";

export const metadata: Metadata = {
  title: "CreatorSEO.ai",
  description: "Optimiza tus videos y estrategia SEO con IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${spaceGrotesk.variable} antialiased`}>{children}</body>
    </html>
  );
}
