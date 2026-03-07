"use server";

import "server-only";
import { createClient } from "@/lib/supabase/server";
import {
  getUploadsPlaylistId,
  fetchPlaylistVideos,
  getVideoDetail,
  updateVideoOnYouTube,
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

export interface VideoDetailForEdit {
  id: string;
  youtube_video_id: string;
  channel_id: string;
  status: "optimized" | "pending";
  title: string;
  description: string | null;
  tags: string[];
  category_id: string;
  recording_location: string | null;
  default_language: string;
  privacy_status: string;
  ai_context: string | null;
  thumbnail_url: string;
  duration_seconds: number | null;
  published_at: string;
  view_count: number;
  like_count: number;
}

export interface VideoFormData {
  title: string;
  description: string;
  tags: string[];
  category_id: string;
  recording_location: string;
  default_language: string;
  privacy_status: string;
  ai_context: string;
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

export async function getVideoDetailForEdit(
  userId: string,
  youtubeVideoId: string
): Promise<VideoDetailForEdit | null> {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const providerToken = session?.provider_token as string | undefined;

  const { data: dbVideo, error } = await supabase
    .from("videos")
    .select("*")
    .eq("user_id", userId)
    .eq("youtube_video_id", youtubeVideoId)
    .single();

  if (error || !dbVideo) return null;

  const video = dbVideo as Video & {
    tags?: string[];
    category_id?: string | null;
    recording_location?: string | null;
    default_language?: string | null;
    privacy_status?: string | null;
    ai_context?: string | null;
  };

  let ytDetail: Awaited<ReturnType<typeof getVideoDetail>> = null;
  if (providerToken) {
    ytDetail = await getVideoDetail(providerToken, youtubeVideoId);
  }

  return {
    id: video.id,
    youtube_video_id: video.youtube_video_id,
    channel_id: video.channel_id,
    status: video.status,
    title: video.title,
    description: video.description ?? "",
    tags: video.tags?.length ? video.tags : (ytDetail?.tags ?? []),
    category_id: video.category_id ?? ytDetail?.category_id ?? "22",
    recording_location: video.recording_location ?? ytDetail?.recording_location ?? null,
    default_language: video.default_language ?? ytDetail?.default_language ?? "es",
    privacy_status: video.privacy_status ?? ytDetail?.privacy_status ?? "public",
    ai_context: video.ai_context ?? null,
    thumbnail_url: video.thumbnail_url,
    duration_seconds: video.duration_seconds,
    published_at: video.published_at,
    view_count: video.view_count,
    like_count: video.like_count,
  };
}

export async function saveVideoDraft(
  userId: string,
  youtubeVideoId: string,
  formData: VideoFormData
): Promise<{ success: true } | { success: false; error: string }> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("videos")
    .update({
      title: formData.title,
      description: formData.description || null,
      tags: formData.tags,
      category_id: formData.category_id || null,
      recording_location: formData.recording_location || null,
      default_language: formData.default_language || "es",
      privacy_status: formData.privacy_status || "public",
      ai_context: formData.ai_context || null,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .eq("youtube_video_id", youtubeVideoId);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function publishVideoToYouTube(
  userId: string,
  youtubeVideoId: string,
  formData: VideoFormData
): Promise<{ success: true } | { success: false; error: string }> {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const providerToken = session?.provider_token as string | undefined;

  if (!providerToken) {
    return {
      success: false,
      error: "Token de YouTube no disponible. Reconecta tu canal en Mi Cuenta.",
    };
  }

  const result = await updateVideoOnYouTube(providerToken, youtubeVideoId, {
    title: formData.title,
    description: formData.description,
    tags: formData.tags,
    categoryId: formData.category_id,
    defaultLanguage: formData.default_language || undefined,
    privacyStatus: formData.privacy_status,
  });

  if (!result.success) return result;

  await supabase
    .from("videos")
    .update({
      title: formData.title,
      description: formData.description || null,
      tags: formData.tags,
      category_id: formData.category_id || null,
      recording_location: formData.recording_location || null,
      default_language: formData.default_language || "es",
      privacy_status: formData.privacy_status || "public",
      ai_context: formData.ai_context || null,
      status: "optimized",
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .eq("youtube_video_id", youtubeVideoId);

  return { success: true };
}
