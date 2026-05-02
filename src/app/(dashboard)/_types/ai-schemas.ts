import { z } from "zod";

export const GeneralOptimizationSchema = z.object({
  title: z
    .string()
    .max(100)
    .describe("Un título altamente optimizado para CTR y SEO, menor a 100 caracteres."),
  description: z
    .string()
    .max(5000)
    .describe(
      "Descripción estructurada y lista para publicar. Usa saltos de línea (\\n) limpios, sin Markdown extraño, sin placeholders (como [URL]), y con timestamps reales."
    ),
  tags: z
    .array(z.string())
    .max(30)
    .describe(
      "Arreglo de etiquetas. ¡MUY IMPORTANTE!: La suma total de caracteres de TODAS las etiquetas combinadas (incluyendo comas) NO DEBE superar los 500 caracteres."
    ),
  category_id: z
    .enum(["1", "2", "10", "15", "17", "19", "20", "22", "23", "24", "25", "26", "27", "28"])
    .describe("ID de categoría de YouTube OBLIGATORIO (ej. '22' blogs, '27' educación)."),
  recording_location: z
    .string()
    .describe("País o ubicación relevante sugerida. Dejar vacío si es global."),
  default_language: z
    .enum(["es", "es-ES", "en", "pt"])
    .describe("Idioma principal recomendado ('es', 'es-ES', 'en', 'pt')."),
});

export type GeneralOptimizationResult = z.infer<typeof GeneralOptimizationSchema>;

export const TitleOptimizationSchema = z.object({
  title: z
    .string()
    .max(100)
    .describe("Un solo título altamente optimizado para CTR y SEO de cola larga."),
});

export const DescriptionOptimizationSchema = z.object({
  description: z
    .string()
    .max(5000)
    .describe(
      "Descripción final lista para publicar. Usa saltos de línea (\\n) reales, evita Markdown como ##, y NO uses placeholders o instrucciones al usuario."
    ),
});

export const TagsOptimizationSchema = z.object({
  tags: z
    .array(z.string())
    .max(30)
    .describe(
      "Arreglo de etiquetas. ¡MUY IMPORTANTE!: La suma total de caracteres de TODAS las etiquetas combinadas (incluyendo comas) NO DEBE superar los 500 caracteres."
    ),
});
