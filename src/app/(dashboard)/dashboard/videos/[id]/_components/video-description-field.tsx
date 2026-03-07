"use client";

import { useState } from "react";
import { Icon } from "@/shared/components/ui/icon";

interface VideoDescriptionFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const MAX_DESCRIPTION_LENGTH = 5000;

export function VideoDescriptionField({ value, onChange }: VideoDescriptionFieldProps) {
  const [showToast, setShowToast] = useState(false);

  const handleAIClick = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-3">
      <label htmlFor="video-desc" className="block text-sm font-bold text-yt-text">
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
            className="flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-primary shadow-sm transition-colors hover:bg-gray-50"
          >
            <Icon name="auto_awesome" className="text-sm" />
            Mejorar con IA
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-600">
        Escribe palabras clave al principio de la descripción para mejorar el
        SEO.
      </p>
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white shadow-lg">
          Próximamente
        </div>
      )}
    </div>
  );
}
