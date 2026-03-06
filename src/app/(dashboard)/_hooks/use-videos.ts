"use client";

import { useCallback, useEffect, useState } from "react";
import { getVideosPage, syncVideosFromYouTube, type Video } from "../_actions/video-actions";

const PAGE_SIZE = 12;

export function useVideos(userId: string | null) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const pageRef = { current: 0 };

  const loadPage = useCallback(
    async (page: number, append: boolean, searchTerm?: string) => {
      if (!userId) return;
      const isFirstPage = page === 0;
      if (isFirstPage) setLoading(true);
      else setLoadingMore(true);
      setError(null);

      try {
        const { videos: newVideos, hasMore: more } = await getVideosPage(
          userId,
          page,
          PAGE_SIZE,
          (searchTerm ?? search) || undefined
        );
        setVideos((prev) => (append ? [...prev, ...newVideos] : newVideos));
        setHasMore(more);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error al cargar videos");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [userId, search]
  );

  const loadMore = useCallback(() => {
    if (!userId || loading || loadingMore || !hasMore) return;
    pageRef.current += 1;
    loadPage(pageRef.current, true);
  }, [userId, loading, loadingMore, hasMore, loadPage]);

  const refresh = useCallback(
    (searchTerm?: string) => {
      pageRef.current = 0;
      loadPage(0, false, searchTerm);
    },
    [loadPage]
  );

  const syncFromYouTube = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const result = await syncVideosFromYouTube();
      if (result.success) {
        pageRef.current = 0;
        await loadPage(0, false);
      } else {
        setError(result.error);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al sincronizar");
    } finally {
      setLoading(false);
    }
  }, [userId, loadPage]);

  const updateSearch = useCallback(
    (term: string) => {
      setSearch(term);
      pageRef.current = 0;
      loadPage(0, false, term || undefined);
    },
    [loadPage]
  );

  useEffect(() => {
    if (userId) loadPage(0, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only load on userId change
  }, [userId]);

  return {
    videos,
    loading,
    loadingMore,
    hasMore,
    error,
    loadMore,
    refresh,
    syncFromYouTube,
    updateSearch,
  };
}
