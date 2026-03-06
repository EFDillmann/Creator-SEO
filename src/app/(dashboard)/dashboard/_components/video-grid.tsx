"use client";

import { Icon } from "@/shared/components/ui/icon";
import { useInfiniteScroll } from "../../_hooks/use-infinite-scroll";
import { useVideos } from "../../_hooks/use-videos";
import { DashboardHeader } from "./dashboard-header";
import { VideoCard } from "./video-card";

interface VideoGridProps {
  userId: string;
}

export function VideoGrid({ userId }: VideoGridProps) {
  const {
    videos,
    loading,
    loadingMore,
    hasMore,
    error,
    loadMore,
    syncFromYouTube,
    updateSearch,
  } = useVideos(userId);

  const sentinelRef = useInfiniteScroll(loadMore, hasMore, loadingMore);

  if (loading) {
    return (
      <>
        <DashboardHeader onSearch={updateSearch} />
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-red-500" />
            <p className="text-sm text-yt-gray">Cargando videos...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <DashboardHeader onSearch={updateSearch} />
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
          <p className="text-center text-red-600">{error}</p>
          <button
            onClick={syncFromYouTube}
            className="rounded bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
          >
            Reintentar
          </button>
        </div>
      </>
    );
  }

  if (videos.length === 0) {
    return (
      <>
        <DashboardHeader onSearch={updateSearch} />
        <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
          <div className="flex flex-col items-center gap-2 text-center">
            <Icon name="video_library" className="text-5xl text-gray-300" />
            <h3 className="text-lg font-bold text-black">No hay videos</h3>
            <p className="max-w-md text-sm text-yt-gray">
              Sincroniza tu canal de YouTube para ver tus videos aquí.
            </p>
          </div>
          <button
            onClick={syncFromYouTube}
            className="flex items-center gap-2 rounded bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark"
          >
            <Icon name="sync" className="text-lg" />
            Sincronizar desde YouTube
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <DashboardHeader onSearch={updateSearch} />
      <div className="p-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h3 className="text-lg font-bold text-black">Videos Recientes</h3>
            <p className="mt-1 text-sm text-yt-gray">
              Gestiona y optimiza el contenido de tu canal.
            </p>
          </div>
          <button
            onClick={syncFromYouTube}
            className="text-sm font-medium text-red-500 hover:underline"
          >
            Sincronizar
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
        <div ref={sentinelRef} className="h-4 w-full" />
        {loadingMore && (
          <div className="flex justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-red-500" />
          </div>
        )}
      </div>
    </>
  );
}
