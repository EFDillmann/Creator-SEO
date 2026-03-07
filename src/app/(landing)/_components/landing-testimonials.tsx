"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { Icon } from "@/shared/components/ui/icon";

const MOCK_TESTIMONIALS = [
  {
    quote:
      "Desde que empecé a usar Creator SEO AI, mi tráfico de búsqueda orgánica se ha triplicado. Se siente como tener una agencia experta en SEO en mi bolsillo.",
    author: "Sarah Jenkins",
    role: "Reseñadora Tech • 500k Subs",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBGSA36GL9D18ViCe7Qq4hPPbAPNnIgLDapkh_almOtH3MUatEwInABE-Rn5CtK_5NK9h9yFcdFDTdeXsj_r55-YAd_M2SbZoZe98CB9oF9tS_vxsUaVz4ZjHQ82PBSYFld9k9lE_fB03MRo8wa7E2G19-RIEuE8979BI12UcgZCem49pziTjr7e3SxO5vhuVwVhU77ygOOi6Kioy2eOimkiaAsl77pchKO_4UTtDevnNknrnvdFGGgKxXNqw__idgRQOgQuTjWBiln",
  },
  {
    quote:
      "La optimización automática de títulos y descripciones me ahorra horas cada semana. Los resultados en mi canal han sido increíbles.",
    author: "Carlos Mendoza",
    role: "Creador de Tutoriales • 200k Subs",
    avatar: "",
  },
  {
    quote:
      "Finalmente una herramienta que entiende el algoritmo de YouTube. Mis videos ahora aparecen en las primeras posiciones de búsqueda.",
    author: "María García",
    role: "Influencer Lifestyle • 350k Subs",
    avatar: "",
  },
] as const;

export function LandingTestimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      id="testimonios"
      className="border-t border-gray-100 bg-white py-20"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {MOCK_TESTIMONIALS.map(({ quote, author, role, avatar }) => (
              <div
                key={author}
                className="min-w-0 flex-[0_0_100%] px-2"
                aria-roledescription="slide"
              >
                <div className="text-center">
                  <div className="mb-8 flex justify-center">
                    <div className="flex gap-1 text-primary">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="star"
                          fill
                          className="text-2xl"
                        />
                      ))}
                    </div>
                  </div>
                  <blockquote className="mb-8 text-2xl font-medium leading-relaxed text-black md:text-3xl">
                    &quot;{quote}&quot;
                  </blockquote>
                  <div className="flex items-center justify-center gap-4">
                    <div
                      className="h-12 w-12 shrink-0 rounded-full border border-gray-100 bg-gray-200 bg-cover bg-center"
                      style={
                        avatar
                          ? { backgroundImage: `url(${avatar})` }
                          : undefined
                      }
                      role="img"
                      aria-label={`Avatar de ${author}`}
                    />
                    <div className="text-left">
                      <div className="font-bold text-black">{author}</div>
                      <div className="text-sm text-yt-gray">{role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={scrollPrev}
            className="rounded-full p-2 transition-colors hover:bg-gray-100"
            aria-label="Testimonio anterior"
          >
            <Icon name="chevron_left" className="text-2xl text-yt-gray" />
          </button>
          <div className="flex gap-2">
            {MOCK_TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollTo(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === selectedIndex ? "bg-primary" : "bg-gray-300"
                }`}
                aria-label={`Ir al testimonio ${index + 1}`}
                aria-current={index === selectedIndex ? "true" : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={scrollNext}
            className="rounded-full p-2 transition-colors hover:bg-gray-100"
            aria-label="Siguiente testimonio"
          >
            <Icon name="chevron_right" className="text-2xl text-yt-gray" />
          </button>
        </div>
      </div>
    </section>
  );
}
