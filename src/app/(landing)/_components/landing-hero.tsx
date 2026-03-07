import Link from "next/link";
import { Icon } from "@/shared/components/ui/icon";

export function LandingHero() {
  return (
    <section
      className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28"
      aria-labelledby="hero-heading"
    >
      <div className="absolute -z-10 top-0 right-0 h-[800px] w-[800px] translate-x-1/2 -translate-y-1/2 rounded-full bg-red-50 opacity-60 blur-[100px]" />
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 sm:px-6 lg:flex-row lg:gap-20 lg:px-8">
        <div className="flex-1 text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Crecimiento Impulsado por IA
          </div>
          <h1
            id="hero-heading"
            className="mb-6 text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl lg:text-7xl"
          >
            Haz Crecer tu Canal con <span className="text-primary">IA SEO</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg font-medium leading-relaxed text-yt-gray sm:text-xl lg:mx-0">
            Deja de adivinar qué posiciona. Automatiza tus títulos, descripciones
            y etiquetas con IA de aprendizaje profundo para posicionarte mejor y
            crecer más rápido.
          </p>
          <div className="flex flex-col items-center gap-4 justify-center sm:flex-row lg:justify-start">
            <Link
              href="/login"
              className="w-full rounded-lg bg-primary px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-xl sm:w-auto"
            >
              Empezar Gratis
            </Link>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-8 py-4 text-base font-bold text-yt-text shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 hover:shadow-md sm:w-auto"
            >
              <Icon name="play_circle" className="text-primary" />
              Ver Demo
            </button>
          </div>
          <div className="mt-10 flex items-center justify-center gap-6 opacity-60 transition-all duration-500 hover:opacity-100 lg:justify-start">
            <span className="text-xs font-semibold uppercase tracking-wider text-yt-gray">
              Con la confianza de creadores de
            </span>
            <span className="text-lg font-bold text-black">YouTube</span>
            <span className="text-lg font-bold text-black">Twitch</span>
            <span className="text-lg font-bold text-black">Vimeo</span>
          </div>
        </div>
        <div className="relative w-full max-w-[600px] flex-1 lg:max-w-none">
          <div className="absolute -top-10 -right-10 h-24 w-24 animate-pulse rounded-full bg-red-100 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-32 w-32 animate-pulse rounded-full bg-gray-100 blur-2xl delay-700" />
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/50">
            <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <div className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="mx-auto font-mono text-xs text-gray-500">
                seo_optimizer.exe
              </div>
            </div>
            <div className="space-y-4 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <Icon name="video_file" className="text-gray-600" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="h-2 w-1/3 rounded bg-gray-200" />
                  <div className="flex h-20 w-full items-center justify-center rounded border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-500">
                    Analizando contenido de video...
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50">
                  <Icon name="smart_toy" className="animate-spin text-primary" />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
                    <p className="mb-1 text-xs font-bold text-primary">
                      Título Generado
                    </p>
                    <p className="text-sm font-medium text-black">
                      Cómo Editar Videos 10x Más Rápido (Tutorial Premiere Pro
                      2024)
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                      #TrucosDeEdición
                    </span>
                    <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                      #PremierePro
                    </span>
                    <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                      #CreaciónDeContenido
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
