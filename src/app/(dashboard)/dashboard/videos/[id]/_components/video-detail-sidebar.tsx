import Image from "next/image";
import { Icon } from "@/shared/components/ui/icon";
import type { VideoDetailForEdit } from "@/app/(dashboard)/_actions/video-actions";

const PRIVACY_LABELS: Record<string, string> = {
  public: "Público",
  private: "Privado",
  unlisted: "No listado",
};

interface VideoDetailSidebarProps {
  video: VideoDetailForEdit;
}

export function VideoDetailSidebar({ video }: VideoDetailSidebarProps) {
  const isOptimized = video.status === "optimized";
  const privacyLabel = PRIVACY_LABELS[video.privacy_status] ?? video.privacy_status;

  return (
    <div className="lg:col-span-4 space-y-6">
      <div className="sticky top-24">
        <a
          href={`https://youtube.com/watch?v=${video.youtube_video_id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group block relative overflow-hidden rounded-xl border border-gray-200 bg-black shadow-sm aspect-video cursor-pointer"
        >
          <Image
            src={video.thumbnail_url}
            alt={video.title}
            fill
            className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl text-white opacity-80 drop-shadow-lg transition-transform group-hover:scale-110">
              <Icon name="play_circle" />
            </span>
          </div>
        </a>
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-gray-600">
              Estado
            </h3>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-sm font-medium ${
                  isOptimized
                    ? "border-green-200 bg-green-100 text-green-800"
                    : "border-amber-200 bg-amber-100 text-amber-800"
                }`}
              >
                {isOptimized ? "Optimizado" : "Pendiente de Optimización"}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 border-t border-gray-100 py-4">
            <div>
              <span className="mb-1 block text-xs font-medium text-gray-600">Visibilidad</span>
              <span className="flex items-center gap-1 text-sm font-medium text-yt-text">
                <Icon name="public" className="text-base text-yt-text" />
                {privacyLabel}
              </span>
            </div>
            <div>
              <span className="mb-1 block text-xs font-medium text-gray-600">Restricciones</span>
              <span className="text-sm font-medium text-yt-text">Ninguna</span>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-yt-text">
              <Icon name="analytics" className="text-primary" />
              Rendimiento Actual
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Vistas</span>
                <span className="font-bold text-yt-text">{video.view_count.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">CTR</span>
                <span className="font-bold text-yt-text">4.2%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Retención media</span>
                <span className="font-bold text-yt-text">3:15 (39%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
