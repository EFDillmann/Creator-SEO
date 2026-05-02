"use client";

import { useState } from "react";
import { Icon } from "@/shared/components/ui/icon";
import {
  generateTitleOptimization,
  type AIVideoContext,
} from "@/app/(dashboard)/_actions/ai-actions";

interface VideoTitleFieldProps {
  value: string;
  onChange: (value: string) => void;
  videoContext: AIVideoContext;
}

const MAX_TITLE_LENGTH = 100;

export function VideoTitleField({
  value,
  onChange,
  videoContext,
}: VideoTitleFieldProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorToast, setErrorToast] = useState<string | null>(null);
  const count = Math.min(value.length, MAX_TITLE_LENGTH);

  const handleAIClick = async () => {
    setIsGenerating(true);
    setErrorToast(null);
    try {
      const res = await generateTitleOptimization(videoContext);
      if (res.success && res.data) {
        onChange(res.data.title.slice(0, MAX_TITLE_LENGTH));
      } else {
        setErrorToast(res.error ?? "Error al optimizar título.");
        setTimeout(() => setErrorToast(null), 3000);
      }
    } catch (e) {
      console.error(e);
      setErrorToast("Error de conexión.");
      setTimeout(() => setErrorToast(null), 3000);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-3">
      <label
        htmlFor="video-title"
        className="block text-sm font-bold text-yt-text"
      >
        Título <span className="text-red-500">*</span>
      </label>
      <div className="flex items-start gap-3">
        <div className="relative flex-1">
          <input
            id="video-title"
            type="text"
            value={value}
            onChange={(e) =>
              onChange(e.target.value.slice(0, MAX_TITLE_LENGTH))
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-14 text-base text-yt-text shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <span className="absolute right-3 bottom-3 text-xs text-gray-600">
            {count}/{MAX_TITLE_LENGTH}
          </span>
        </div>
        <button
          type="button"
          onClick={handleAIClick}
          disabled={isGenerating}
          className="group flex shrink-0 items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-4 py-3 font-medium text-primary transition-colors hover:bg-red-100 disabled:opacity-70"
        >
          {isGenerating ? (
            <Icon name="progress_activity" className="animate-spin" />
          ) : (
            <Icon name="auto_awesome" className="group-hover:animate-pulse" />
          )}
          {isGenerating ? "Optimizando..." : "Optimizar con IA"}
        </button>
      </div>
      <p className="text-xs text-gray-600">
        Un título atractivo ayuda a enganchar a los espectadores.{" "}
        <a href="#" className="text-primary hover:underline">
          Más información
        </a>
      </p>
      {errorToast && (
        <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-red-600 px-4 py-2 text-sm text-white shadow-lg">
          {errorToast}
        </div>
      )}
    </div>
  );
}
