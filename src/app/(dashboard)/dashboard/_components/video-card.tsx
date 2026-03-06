"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/shared/components/ui/icon";
import { formatDuration } from "@/lib/duration";
import type { Video } from "../../_actions/video-actions";

function formatViewCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffWeeks = Math.floor(diffDays / 7);

  if (diffHours < 1) return "Hace menos de 1 hora";
  if (diffHours < 24) return `Hace ${diffHours} horas`;
  if (diffDays === 1) return "Hace 1 día";
  if (diffDays < 7) return `Hace ${diffDays} días`;
  if (diffWeeks === 1) return "Hace 1 semana";
  if (diffWeeks < 4) return `Hace ${diffWeeks} semanas`;
  return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
}

export function VideoCard({ video }: { video: Video }) {
  const durationStr =
    video.duration_seconds != null
      ? formatDuration(video.duration_seconds)
      : "--:--";
  const isOptimized = video.status === "optimized";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-gray-300 hover:shadow-md">
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <Image
          src={video.thumbnail_url}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
          {durationStr}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between">
          <span
            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
              isOptimized ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
            }`}
          >
            {isOptimized ? "Optimizado" : "Pendiente"}
          </span>
          <span className="text-xs text-gray-400">
            {formatRelativeDate(video.published_at)}
          </span>
        </div>
        <h4 className="mb-2 line-clamp-2 text-base font-bold leading-tight text-black">
          {video.title}
        </h4>
        <p className="mb-4 line-clamp-2 text-sm text-[#606060]">
          {video.description ?? "Sin descripción"}
        </p>
        <div className="mt-auto border-t border-gray-100 pt-4">
          <div className="mb-4 flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Icon name="visibility" className="text-base" />
              {formatViewCount(video.view_count)}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="thumb_up" className="text-base" />
              {formatViewCount(video.like_count)}
            </span>
          </div>
          {isOptimized ? (
            <Link
              href={`/dashboard/videos/${video.youtube_video_id}`}
              className="flex items-center gap-1 text-sm font-medium text-red-500 transition-colors hover:text-[#cc0000]"
            >
              Ver detalles
              <Icon name="arrow_forward" className="text-lg" />
            </Link>
          ) : (
            <Link
              href={`/dashboard/videos/${video.youtube_video_id}/optimize`}
              className="inline-flex items-center bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-red-200 transition-colors hover:bg-[#cc0000]"
            >
              Optimizar
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
