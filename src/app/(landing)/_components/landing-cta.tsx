import Link from "next/link";

export function LandingCTA() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-t border-gray-100 bg-white py-24"
      aria-labelledby="cta-heading"
    >
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <h2
          id="cta-heading"
          className="mb-6 text-3xl font-bold text-black md:text-5xl"
        >
          ¿Listo para dominar tu nicho?
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-yt-gray md:text-xl">
          Únete a miles de creadores que ahorran tiempo y crecen más rápido con
          optimización impulsada por IA.
        </p>
        <Link
          href="/login"
          className="inline-block rounded-lg bg-primary px-10 py-4 text-lg font-bold text-white shadow-xl shadow-red-600/20 transition-all hover:scale-105 hover:bg-primary-dark hover:shadow-2xl"
        >
          Únete a Miles de Creadores
        </Link>
        <p className="mt-6 text-sm text-gray-500">
          No se requiere tarjeta de crédito para la prueba gratuita.
        </p>
      </div>
    </section>
  );
}
