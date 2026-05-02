"use client";

import { useState } from "react";
import { Icon } from "@/shared/components/ui/icon";

import {
  generateDescriptionOptimization,
  type AIVideoContext,
} from "@/app/(dashboard)/_actions/ai-actions";

interface VideoDescriptionFieldProps {
  value: string;
  onChange: (value: string) => void;
  videoContext: AIVideoContext;
}

const MAX_DESCRIPTION_LENGTH = 5000;

export function VideoDescriptionField({
  value,
  onChange,
  videoContext,
}: VideoDescriptionFieldProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorToast, setErrorToast] = useState<string | null>(null);

  const handleAIClick = async () => {
    setIsGenerating(true);
    setErrorToast(null);
    try {
      const res = await generateDescriptionOptimization(videoContext);
      if (res.success && res.data) {
        onChange(res.data.description.slice(0, MAX_DESCRIPTION_LENGTH));
      } else {
        setErrorToast(res.error ?? "Error al optimizar descripción.");
        setTimeout(() => setErrorToast(null), 3000);
      }
    } catch (e) {
      console.error("Error al optimizar descripción:", e);
      setErrorToast("Error de conexión.");
      setTimeout(() => setErrorToast(null), 3000);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-3">
      <label
        htmlFor="video-desc"
        className="block text-sm font-bold text-yt-text"
      >
        Descripción
      </label>
      <div className="relative">
        <textarea
          id="video-desc"
          value={value}
          onChange={(e) =>
            onChange(e.target.value.slice(0, MAX_DESCRIPTION_LENGTH))
          }
          className="h-48 w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-yt-text shadow-sm transition-all placeholder:text-gray-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <div className="absolute top-3 right-3">
          <button
            type="button"
            onClick={handleAIClick}
            disabled={isGenerating}
            className="flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-primary shadow-sm transition-colors hover:bg-gray-50 disabled:opacity-70"
          >
            {isGenerating ? (
              <Icon name="progress_activity" className="animate-spin text-sm" />
            ) : (
              <Icon name="auto_awesome" className="text-sm" />
            )}
            {isGenerating ? "Mejorando..." : "Mejorar con IA"}
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-600">
        Escribe palabras clave al principio de la descripción para mejorar el
        SEO.
      </p>
      {errorToast && (
        <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-red-600 px-4 py-2 text-sm text-white shadow-lg">
          {errorToast}
        </div>
      )}
    </div>
  );
}
