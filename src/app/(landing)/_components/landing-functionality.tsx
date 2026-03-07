import { Icon } from "@/shared/components/ui/icon";

export function LandingFunctionality() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-surface-light py-20 lg:py-28"
      aria-labelledby="how-it-works-heading"
    >
      <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-red-50/50 to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2
            id="how-it-works-heading"
            className="mb-4 text-3xl font-bold text-black md:text-4xl"
          >
            Mira la Diferencia
          </h2>
          <p className="text-lg text-yt-gray">De genérico a viral en segundos.</p>
        </div>
        <div className="grid items-stretch gap-8 lg:grid-cols-2">
          <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
              <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-500">
                <Icon name="close" className="text-lg" /> ANTES: ENTRADA SIN
                PROCESAR
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-6 p-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500">
                  Tema del Video
                </label>
                <div className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-600">
                  hacer café en casa
                </div>
              </div>
              <div className="space-y-2 opacity-50">
                <label className="text-xs font-bold uppercase text-gray-500">
                  Título
                </label>
                <div className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-600">
                  Cómo hago café
                </div>
              </div>
              <div className="space-y-2 opacity-50">
                <label className="text-xs font-bold uppercase text-gray-500">
                  Etiquetas
                </label>
                <div className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-600">
                  café, mañana, bebida
                </div>
              </div>
            </div>
          </div>
          <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-primary/20 bg-white shadow-xl shadow-red-500/5">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-red-50/50 to-transparent" />
            <div className="relative z-10 flex items-center justify-between border-b border-primary/10 bg-red-50/80 px-6 py-4">
              <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
                <Icon name="check_circle" className="text-lg" /> DESPUÉS:
                OPTIMIZADO POR IA
              </span>
              <span className="rounded bg-primary px-2 py-0.5 text-[10px] font-bold text-white">
                98/100 PUNTUACIÓN
              </span>
            </div>
            <div className="relative z-10 flex flex-1 flex-col gap-6 p-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-primary/80">
                  Título Optimizado
                </label>
                <div className="w-full rounded-lg border border-primary/30 bg-white p-3 text-base font-medium text-black shadow-sm ring-1 ring-primary/5">
                  Café de Calidad Barista en Casa (¡Ahorra Dinero Diario!)
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-primary/80">
                  Descripción Inteligente
                </label>
                <div className="w-full rounded-lg border border-primary/30 bg-white p-3 text-sm leading-relaxed text-yt-gray ring-1 ring-primary/5">
                  En este video, aprende las técnicas secretas para preparar{" "}
                  <span className="font-medium text-primary">
                    café estilo cafetería
                  </span>{" "}
                  desde tu cocina. Cubrimos la selección de granos, consejos de
                  molienda y el método perfecto de vertido...
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-primary/80">
                  Etiquetas en Tendencia
                </label>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded border border-primary/10 bg-red-50 px-2 py-1 text-xs font-medium text-primary">
                    #AmanteDelCafé
                  </span>
                  <span className="rounded border border-primary/10 bg-red-50 px-2 py-1 text-xs font-medium text-primary">
                    #VidaBarista
                  </span>
                  <span className="rounded border border-primary/10 bg-red-50 px-2 py-1 text-xs font-medium text-primary">
                    #CaféCasero
                  </span>
                  <span className="rounded border border-primary/10 bg-red-50 px-2 py-1 text-xs font-medium text-primary">
                    #AhorraDinero
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
