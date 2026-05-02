"use client";

import { useState } from "react";
import { Icon } from "@/shared/components/ui/icon";

import type { GeneralOptimizationResult } from "@/app/(dashboard)/_types/ai-schemas";
import {
  generateGeneralOptimization,
  type AIVideoContext,
} from "@/app/(dashboard)/_actions/ai-actions";

interface VideoDetailAIContextProps {
  value: string;
  onChange: (value: string) => void;
  onAIComplete: (data: GeneralOptimizationResult) => void;
  videoContext: AIVideoContext;
}

export function VideoDetailAIContext({
  value,
  onChange,
  onAIComplete,
  videoContext,
}: VideoDetailAIContextProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorToast, setErrorToast] = useState<string | null>(null);

  const handleAIClick = async () => {
    if (!value.trim()) {
      setErrorToast("Por favor, ingresa algo de contexto primero.");
      setTimeout(() => setErrorToast(null), 3000);
      return;
    }
    setIsGenerating(true);
    setErrorToast(null);
    try {
      const res = await generateGeneralOptimization(videoContext);
      if (res.success && res.data) {
        onAIComplete(res.data);
      } else {
        setErrorToast(res.error ?? "Error desconocido al optimizar.");
        setTimeout(() => setErrorToast(null), 3000);
      }
    } catch (e) {
      console.error("Error al generar optimización:", e);
      setErrorToast("Ocurrió un error en la conexión.");
      setTimeout(() => setErrorToast(null), 3000);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-red-100 bg-red-50/50 p-6 space-y-4">
      <div className="pointer-events-none absolute top-0 right-0 p-4 opacity-5">
        <Icon name="smart_toy" className="text-9xl text-primary" />
      </div>
      <div className="relative z-10 space-y-2">
        <label
          htmlFor="ai-context"
          className="flex items-center gap-2 text-base font-bold text-yt-text"
        >
          <Icon name="auto_awesome" className="text-primary" />
          Contexto del Video para la IA
        </label>
        <p className="text-sm text-gray-600">
          Describe brevemente tu contenido. Usaremos este contexto para
          autocompletar el Título, Descripción, Etiquetas y Categoría de manera
          inteligente.
        </p>
      </div>
      <div className="relative z-10">
        <textarea
          id="ai-context"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Escribe de qué trata el video, locaciones, quiénes participan, tono deseado (ej. educativo, divertido), palabras clave importantes, etc..."
          className="h-32 w-full resize-y rounded-lg border border-red-100 bg-white px-4 py-3 text-sm text-yt-text shadow-sm transition-all placeholder:text-gray-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <div className="relative z-10 flex justify-end">
        <button
          type="button"
          onClick={handleAIClick}
          disabled={isGenerating}
          className="group flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-sm shadow-red-200 transition-colors hover:bg-primary-dark disabled:opacity-70"
        >
          {isGenerating ? (
            <Icon name="progress_activity" className="animate-spin" />
          ) : (
            <Icon name="bolt" className="group-hover:animate-pulse" />
          )}
          {isGenerating ? "Generando..." : "Generar todos los detalles con IA"}
        </button>
      </div>
      {errorToast && (
        <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-red-600 px-4 py-2 text-sm text-white shadow-lg">
          {errorToast}
        </div>
      )}
    </div>
  );
}
