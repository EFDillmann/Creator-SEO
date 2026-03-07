const STATS = [
  { value: "10M+", label: "Videos Optimizados" },
  { value: "2.5B+", label: "Vistas Generadas" },
  { value: "45%", label: "Aumento Promedio CTR" },
  { value: "4.9/5", label: "Calificación de Usuarios" },
] as const;

export function LandingStatsBanner() {
  return (
    <section
      className="border-y border-gray-100 bg-surface-light py-10"
      aria-label="Estadísticas"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <h3 className="text-3xl font-bold text-black">{value}</h3>
              <p className="mt-1 text-sm font-medium text-yt-gray">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
