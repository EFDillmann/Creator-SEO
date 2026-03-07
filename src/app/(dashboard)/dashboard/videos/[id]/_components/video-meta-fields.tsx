"use client";

import { Icon } from "@/shared/components/ui/icon";
import {
  YOUTUBE_VIDEO_CATEGORIES,
  VIDEO_LANGUAGES,
  SUBTITLE_CERTIFICATIONS,
} from "../_constants/youtube-categories";

interface VideoMetaFieldsProps {
  categoryId: string;
  recordingLocation: string;
  defaultLanguage: string;
  onCategoryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
}

export function VideoMetaFields({
  categoryId,
  recordingLocation,
  defaultLanguage,
  onCategoryChange,
  onLocationChange,
  onLanguageChange,
}: VideoMetaFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="video-category"
            className="block text-sm font-bold text-yt-text"
          >
            Categoría
          </label>
          <div className="relative">
            <select
              id="video-category"
              value={categoryId}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-yt-text shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {YOUTUBE_VIDEO_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
            <Icon
              name="expand_more"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="video-location"
            className="block text-sm font-bold text-yt-text"
          >
            Ubicación del video
          </label>
          <div className="relative">
            <input
              id="video-location"
              type="text"
              value={recordingLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              placeholder="Ninguna"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-yt-text shadow-sm transition-all placeholder:text-gray-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Icon
              name="location_on"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 border-b border-gray-100 pb-8 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="video-lang"
            className="block text-sm font-bold text-yt-text"
          >
            Idioma del video
          </label>
          <div className="relative">
            <select
              id="video-lang"
              value={
                VIDEO_LANGUAGES.some((l) => l.value === defaultLanguage)
                  ? defaultLanguage
                  : "es"
              }
              onChange={(e) => onLanguageChange(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-yt-text shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {VIDEO_LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
            <Icon
              name="expand_more"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="video-cert"
            className="block text-sm font-bold text-yt-text"
          >
            Certificación de subtítulos
          </label>
          <div className="relative">
            <select
              id="video-cert"
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-yt-text shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {SUBTITLE_CERTIFICATIONS.map((cert) => (
                <option key={cert.value} value={cert.value}>
                  {cert.label}
                </option>
              ))}
            </select>
            <Icon
              name="expand_more"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>
      </div>
    </>
  );
}
