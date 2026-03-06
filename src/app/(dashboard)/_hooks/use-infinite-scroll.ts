"use client";

import { useCallback, useEffect, useRef } from "react";

export function useInfiniteScroll(
  onLoadMore: () => void,
  hasMore: boolean,
  loading: boolean
) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (!entry?.isIntersecting || !hasMore || loading) return;
      onLoadMore();
    },
    [onLoadMore, hasMore, loading]
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [handleIntersect]);

  return sentinelRef;
}
