import type { Metadata } from "next";
import { LandingHeader } from "./_components/landing-header";
import { LandingHero } from "./_components/landing-hero";
import { LandingStatsBanner } from "./_components/landing-stats-banner";
import { LandingAboutCards } from "./_components/landing-about-cards";
import { LandingFunctionality } from "./_components/landing-functionality";
import { LandingTestimonials } from "./_components/landing-testimonials";
import { LandingCTA } from "./_components/landing-cta";
import { LandingFooter } from "./_components/landing-footer";

export const metadata: Metadata = {
  title: "CreatorSEO.ai - Haz Crecer tu Canal de YouTube con IA SEO",
  description:
    "Automatiza títulos, descripciones y etiquetas con IA para posicionar mejor en YouTube. Optimización impulsada por aprendizaje profundo.",
  keywords: [
    "SEO YouTube",
    "IA SEO",
    "optimización videos",
    "creadores YouTube",
    "metadatos IA",
  ],
  openGraph: {
    title: "CreatorSEO.ai - IA SEO para Creadores",
    description:
      "Automatiza títulos, descripciones y etiquetas con IA para posicionar mejor en YouTube.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "CreatorSEO.ai - IA SEO para Creadores",
    description:
      "Automatiza títulos, descripciones y etiquetas con IA para posicionar mejor en YouTube.",
  },
  alternates: {
    canonical: "https://creatorseo.ai",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CreatorSEO.ai",
  description:
    "Herramienta de IA para optimización SEO de videos en YouTube. Automatiza títulos, descripciones y etiquetas.",
  url: "https://creatorseo.ai",
};

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden bg-background-light text-yt-text antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingHeader />
      <main>
        <LandingHero />
        <LandingStatsBanner />
        <LandingAboutCards />
        <LandingFunctionality />
        <LandingTestimonials />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
