import { Icon } from "@/shared/components/ui/icon";

const CARDS = [
  {
    icon: "rocket_launch" as const,
    title: "Impulso de Ranking",
    description:
      "Identifica al instante palabras clave de alto volumen y baja competencia para colocar tus videos en la primera página de resultados de búsqueda.",
  },
  {
    icon: "auto_fix_high" as const,
    title: "Auto-Optimización",
    description:
      "Genera títulos que invitan al clic, descripciones ricas en SEO y etiquetas virales con un solo clic. Adiós al bloqueo del escritor.",
  },
  {
    icon: "trending_up" as const,
    title: "Detector de Tendencias",
    description:
      "Mantente a la vanguardia. Nuestra IA predice tendencias emergentes en tu nicho para que puedas crear contenido que está a punto de explotar.",
  },
] as const;

export function LandingAboutCards() {
  return (
    <section
      id="features"
      className="bg-white py-20 lg:py-28"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2
            id="features-heading"
            className="mb-4 text-3xl font-bold text-black md:text-4xl"
          >
            Por qué nos eligen los Mejores Creadores
          </h2>
          <p className="text-lg text-yt-gray">
            Nuestra IA analiza millones de puntos de datos de las últimas
            tendencias de YouTube para generar metadatos que realmente convierten
            vistas en suscriptores.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {CARDS.map(({ icon, title, description }) => (
            <article
              key={title}
              className="group rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-red-500/5"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Icon name={icon} className="text-3xl" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-black">{title}</h3>
              <p className="leading-relaxed text-yt-gray">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
