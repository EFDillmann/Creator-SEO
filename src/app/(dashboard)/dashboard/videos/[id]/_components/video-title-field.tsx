"use client";

import { useState } from "react";
import { Icon } from "@/shared/components/ui/icon";

interface VideoTitleFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const MAX_TITLE_LENGTH = 100;

export function VideoTitleField({ value, onChange }: VideoTitleFieldProps) {
  const [showToast, setShowToast] = useState(false);
  const count = Math.min(value.length, MAX_TITLE_LENGTH);

  const handleAIClick = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-3">
      <label htmlFor="video-title" className="block text-sm font-bold text-yt-text">
        Título <span className="text-red-500">*</span>
      </label>
      <div className="flex items-start gap-3">
        <div className="relative flex-1">
          <input
            id="video-title"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value.slice(0, MAX_TITLE_LENGTH))}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-14 text-base text-yt-text shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <span className="absolute right-3 bottom-3 text-xs text-gray-600">
            {count}/{MAX_TITLE_LENGTH}
          </span>
        </div>
        <button
          type="button"
          onClick={handleAIClick}
          className="group flex shrink-0 items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-4 py-3 font-medium text-primary transition-colors hover:bg-red-100"
        >
          <Icon name="auto_awesome" className="group-hover:animate-pulse" />
          Optimizar con IA
        </button>
      </div>
      <p className="text-xs text-gray-600">
        Un título atractivo ayuda a enganchar a los espectadores.{" "}
        <a href="#" className="text-primary hover:underline">
          Más información
        </a>
      </p>
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white shadow-lg">
          Próximamente
        </div>
      )}
    </div>
  );
}
