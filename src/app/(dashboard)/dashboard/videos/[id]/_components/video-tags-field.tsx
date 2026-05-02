"use client";

import { useState, useCallback, KeyboardEvent } from "react";
import { Icon } from "@/shared/components/ui/icon";
import {
  generateTagsOptimization,
  type AIVideoContext,
} from "@/app/(dashboard)/_actions/ai-actions";

const MAX_TAGS = 30;
const MAX_TAG_LENGTH = 30;

const MOCK_SUGGESTIONS = ["cine barato", "softbox casero", "setup youtuber"];

interface VideoTagsFieldProps {
  value: string[];
  onChange: (value: string[]) => void;
  videoContext: AIVideoContext;
}

export function VideoTagsField({
  value,
  onChange,
  videoContext,
}: VideoTagsFieldProps) {
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorToast, setErrorToast] = useState<string | null>(null);

  const handleAIClick = async () => {
    setIsGenerating(true);
    setErrorToast(null);
    try {
      const res = await generateTagsOptimization(videoContext);
      if (res.success && res.data) {
        onChange(res.data.tags.slice(0, MAX_TAGS));
      } else {
        setErrorToast(res.error ?? "Error al optimizar etiquetas.");
        setTimeout(() => setErrorToast(null), 3000);
      }
    } catch (e) {
      console.error("Error al optimizar etiquetas:", e);
      setErrorToast("Error de conexión.");
      setTimeout(() => setErrorToast(null), 3000);
    } finally {
      setIsGenerating(false);
    }
  };

  const addTag = useCallback(
    (tag: string) => {
      const trimmed = tag.trim().slice(0, MAX_TAG_LENGTH);
      if (!trimmed || value.length >= MAX_TAGS) return;
      if (value.includes(trimmed)) return;
      onChange([...value, trimmed]);
      setInputValue("");
    },
    [value, onChange],
  );

  const removeTag = useCallback(
    (index: number) => {
      onChange(value.filter((_, i) => i !== index));
    },
    [value, onChange],
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    addTag(suggestion);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label
          htmlFor="video-tags"
          className="block text-sm font-bold text-yt-text"
        >
          Etiquetas
        </label>
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
          {isGenerating ? "Optimizando..." : "Optimizar con IA"}
        </button>
      </div>
      <div className="flex min-h-[50px] flex-wrap items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
        {value.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="flex items-center gap-1 rounded bg-gray-200 px-2 py-1 text-sm text-yt-text"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(i)}
              className="hover:text-primary"
              aria-label={`Eliminar ${tag}`}
            >
              <Icon name="close" className="text-sm" />
            </button>
          </span>
        ))}
        <input
          id="video-tags"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Añadir etiqueta..."
          className="min-w-[120px] flex-1 border-none bg-transparent p-0 text-sm text-yt-text placeholder:text-gray-600 focus:ring-0"
        />
      </div>
      <div className="flex gap-2">
        <span className="text-xs text-gray-600">Sugerencias:</span>
        {MOCK_SUGGESTIONS.filter((s) => !value.includes(s)).map(
          (suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-xs font-medium text-primary hover:underline"
            >
              + {suggestion}
            </button>
          ),
        )}
      </div>
      {errorToast && (
        <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-red-600 px-4 py-2 text-sm text-white shadow-lg">
          {errorToast}
        </div>
      )}
    </div>
  );
}
