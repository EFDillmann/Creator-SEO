"use server";

import "server-only";
import { createClient } from "@/lib/supabase/server";
import {
  getUploadsPlaylistId,
  fetchPlaylistVideos,
  type YouTubeVideoForCache,
} from "./youtube-actions";

export interface Video {
  id: string;
  youtube_video_id: string;
  channel_id: string;
  status: "optimized" | "pending";
  title: string;
  description: string | null;
  thumbnail_url: string;
  duration_seconds: number | null;
  published_at: string;
  view_count: number;
  like_count: number;
}

export async function syncVideosFromYouTube(): Promise<
  { success: true; count: number } | { success: false; error: string }
> {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;
  const providerToken = session?.provider_token as string | undefined;

  if (!user?.id) {
    return { success: false, error: "No autenticado" };
  }
  if (!providerToken) {
    return { success: false, error: "Token de YouTube no disponible. Conecta tu canal en Mi Cuenta." };
  }

  const playlistId = await getUploadsPlaylistId(providerToken);
  if (!playlistId) {
    return { success: false, error: "No se pudo obtener el canal de YouTube." };
  }

  let totalCount = 0;
  let nextPageToken: string | undefined;

  do {
    const { videos, nextPageToken: next } = await fetchPlaylistVideos(
      providerToken,
      playlistId,
      nextPageToken,
      12
    );
    nextPageToken = next ?? undefined;

    if (videos.length === 0) break;

    const rows = videos.map((v: YouTubeVideoForCache) => ({
      user_id: user.id,
      youtube_video_id: v.youtube_video_id,
      channel_id: v.channel_id,
      status: "pending" as const,
      title: v.title,
      description: v.description,
      thumbnail_url: v.thumbnail_url,
      duration_seconds: v.duration_seconds,
      published_at: v.published_at,
      view_count: v.view_count,
      like_count: v.like_count,
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from("videos").upsert(rows, {
      onConflict: "user_id,youtube_video_id",
    });

    if (error) {
      return { success: false, error: error.message };
    }
    totalCount += videos.length;
  } while (nextPageToken);

  return { success: true, count: totalCount };
}

export async function getVideosPage(
  userId: string,
  page: number,
  pageSize = 12,
  search?: string
): Promise<{ videos: Video[]; hasMore: boolean }> {
  const supabase = await createClient();

  const from = page * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("videos")
    .select("*", { count: "exact" })
    .eq("user_id", userId)
    .order("published_at", { ascending: false })
    .range(from, to);

  if (search?.trim()) {
    query = query.ilike("title", `%${search.trim()}%`);
  }

  const { data, error, count } = await query;

  if (error) {
    return { videos: [], hasMore: false };
  }

  const videos = (data ?? []) as Video[];
  const total = count ?? 0;
  const hasMore = from + videos.length < total;

  return { videos, hasMore };
}
