import Link from "next/link";
import { Icon } from "@/shared/components/ui/icon";

export function LandingHeader() {
  return (
    <header
      className="fixed top-0 left-0 z-50 w-full border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md"
      role="banner"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-primary"
            aria-label="CreatorSEO.ai - Inicio"
          >
            <Icon name="smart_toy" className="text-3xl" />
            <h2 className="text-xl font-bold tracking-tight text-black">
              CreatorSEO.ai
            </h2>
          </Link>
          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Navegación principal"
          >
            <a
              href="#features"
              className="text-sm font-medium text-yt-gray transition-colors hover:text-black"
            >
              Características
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-yt-gray transition-colors hover:text-black"
            >
              Cómo Funciona
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-yt-gray transition-colors hover:text-black"
            >
              Precios
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden text-sm font-medium text-yt-gray transition-colors hover:text-primary sm:block"
            >
              Acceder
            </Link>
            <Link
              href="/login"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg"
            >
              Empezar
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
