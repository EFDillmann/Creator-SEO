import Link from "next/link";
import { Icon } from "@/shared/components/ui/icon";

const FOOTER_LINKS = {
  Producto: [
    { label: "Características", href: "#features" },
    { label: "Precios", href: "#pricing" },
    { label: "Extensión de Chrome", href: "#" },
    { label: "Hoja de Ruta", href: "#" },
  ],
  Recursos: [
    { label: "Blog", href: "#" },
    { label: "Academia de Creadores", href: "#" },
    { label: "Centro de Ayuda", href: "#" },
    { label: "Estudios de Caso", href: "#" },
  ],
  Legal: [
    { label: "Política de Privacidad", href: "#" },
    { label: "Términos de Servicio", href: "#" },
    { label: "Información de Licencia", href: "#" },
    { label: "Contáctanos", href: "#" },
  ],
} as const;

export function LandingFooter() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-1">
            <Link
              href="/"
              className="mb-4 flex items-center gap-2 text-primary"
              aria-label="CreatorSEO.ai - Inicio"
            >
              <Icon name="smart_toy" className="text-2xl" />
              <h2 className="text-lg font-bold text-black">CreatorSEO.ai</h2>
            </Link>
            <p className="text-sm leading-relaxed text-yt-gray">
              La herramienta de IA #1 para el crecimiento en YouTube. Optimiza,
              posiciona y escala con información basada en datos.
            </p>
          </div>
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 font-bold text-black">{title}</h4>
              <ul className="space-y-2 text-sm text-yt-gray">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="transition-colors hover:text-primary"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Creator SEO AI. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}
