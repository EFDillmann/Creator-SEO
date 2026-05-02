"use server";

import "server-only";
import fs from "fs";
import path from "path";
import { z } from "zod";
import { generateText, Output } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import {
  GeneralOptimizationSchema,
  TitleOptimizationSchema,
  TagsOptimizationSchema,
} from "../_types/ai-schemas";

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const MODEL_NAME = "openrouter/free";

const skillPath = path.join(
  process.cwd(),
  ".agents",
  "skills",
  "youtube-seo",
  "SKILL.md",
);
const SYSTEM_PROMPT = fs.readFileSync(skillPath, "utf-8");

export type AIVideoContext = {
  aiContext: string;
  title: string;
  description: string;
  tags: string[];
  durationSeconds: number | null;
};

function buildPromptContext(ctx: AIVideoContext) {
  return `
Información actual del video:
- Título actual: ${ctx.title || "N/A"}
- Descripción actual: ${ctx.description || "N/A"}
- Etiquetas actuales: ${ctx.tags.length ? ctx.tags.join(", ") : "N/A"}
- Duración del video: ${ctx.durationSeconds ? ctx.durationSeconds + " segundos" : "Desconocida"}
- Contexto adicional provisto por el creador: ${ctx.aiContext || "N/A"}
`;
}

function trimTagsToLimit(tags: string[], limit: number = 500): string[] {
  const result: string[] = [];
  let currentLength = 0;

  for (const tag of tags) {
    // +1 por la coma que las separa, excepto en la primera
    const addedLength = tag.length + (result.length > 0 ? 1 : 0);
    if (currentLength + addedLength <= limit) {
      result.push(tag);
      currentLength += addedLength;
    } else {
      break;
    }
  }
  return result;
}

export async function generateGeneralOptimization(ctx: AIVideoContext) {
  try {
    const AI_GeneralSchema = z.object({
      title: GeneralOptimizationSchema.shape.title,
      description_paragraphs: z
        .array(z.string())
        .describe(
          "Lista de párrafos de la descripción. Cada elemento es una nueva línea o párrafo (ej. un timestamp va en su propio elemento). El ÚLTIMO elemento del arreglo DEBE contener 3 a 5 hashtags separados por espacios.",
        ),
      tags: GeneralOptimizationSchema.shape.tags,
      category_id: GeneralOptimizationSchema.shape.category_id,
      recording_location: GeneralOptimizationSchema.shape.recording_location,
      default_language: GeneralOptimizationSchema.shape.default_language,
    });

    const result = await generateText({
      model: openrouter(MODEL_NAME),
      system: SYSTEM_PROMPT,
      prompt: `Optimiza de manera general un video nuevo considerando la siguiente información detallada:\n${buildPromptContext(ctx)}\n\nGenera el mejor título, una descripción completa con ganchos y timestamps, etiquetas enfocadas en long-tail y configuración de metadatos sugerida.`,
      output: Output.object({
        schema: AI_GeneralSchema,
      }),
    });

    return {
      success: true,
      data: {
        title: result.output.title,
        description: result.output.description_paragraphs.join("\n"),
        tags: trimTagsToLimit(result.output.tags),
        category_id: result.output.category_id,
        recording_location: result.output.recording_location,
        default_language: result.output.default_language,
      },
    };
  } catch (error) {
    console.error("Error en generateGeneralOptimization:", error);
    return {
      success: false,
      error: "Hubo un error al generar la optimización general.",
    };
  }
}

export async function generateTitleOptimization(ctx: AIVideoContext) {
  try {
    const result = await generateText({
      model: openrouter(MODEL_NAME),
      system: SYSTEM_PROMPT,
      prompt: `${buildPromptContext(ctx)}\n\nGenera una opción de título altamente optimizada para CTR y SEO (long-tail) que sustituya al actual.`,
      output: Output.object({
        schema: TitleOptimizationSchema,
      }),
    });

    return { success: true, data: result.output };
  } catch (error) {
    console.error("Error en generateTitleOptimization:", error);
    return { success: false, error: "Hubo un error al optimizar el título." };
  }
}

export async function generateDescriptionOptimization(ctx: AIVideoContext) {
  try {
    const AI_DescriptionSchema = z.object({
      description_paragraphs: z
        .array(z.string())
        .describe(
          "Lista de párrafos de la descripción. Cada elemento es una nueva línea o párrafo. Ideal para crear listas de timestamps verticales. El ÚLTIMO elemento DEBE contener obligatoriamente 3 a 5 hashtags separados por espacios.",
        ),
    });

    const result = await generateText({
      model: openrouter(MODEL_NAME),
      system: SYSTEM_PROMPT,
      prompt: `${buildPromptContext(ctx)}\n\nGenera una descripción estructurada completa (gancho, desarrollo, timestamps) que sustituya a la actual. Responde con un arreglo de strings, donde cada string es una línea separada.`,
      output: Output.object({
        schema: AI_DescriptionSchema,
      }),
    });

    return {
      success: true,
      data: {
        description: result.output.description_paragraphs.join("\n"),
      },
    };
  } catch (error) {
    console.error("Error en generateDescriptionOptimization:", error);
    return {
      success: false,
      error: "Hubo un error al optimizar la descripción.",
    };
  }
}

export async function generateTagsOptimization(ctx: AIVideoContext) {
  try {
    const result = await generateText({
      model: openrouter(MODEL_NAME),
      system: SYSTEM_PROMPT,
      prompt: `${buildPromptContext(ctx)}\n\nGenera un arreglo de etiquetas óptimo, dando prioridad a las frases long-tail y de baja competencia.`,
      output: Output.object({
        schema: TagsOptimizationSchema,
      }),
    });

    return {
      success: true,
      data: {
        tags: trimTagsToLimit(result.output.tags),
      },
    };
  } catch (error) {
    console.error("Error en generateTagsOptimization:", error);
    return {
      success: false,
      error: "Hubo un error al optimizar las etiquetas.",
    };
  }
}
