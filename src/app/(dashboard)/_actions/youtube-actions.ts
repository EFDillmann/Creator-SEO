import "server-only";

export interface YouTubeChannel {
  id: string;
  title: string;
  thumbnails?: {
    default?: { url: string };
    medium?: { url: string };
    high?: { url: string };
  };
}

export interface YouTubeVideoForCache {
  youtube_video_id: string;
  channel_id: string;
  title: string;
  description: string | null;
  thumbnail_url: string;
  duration_seconds: number | null;
  published_at: string;
  view_count: number;
  like_count: number;
}

function parseIso8601Duration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] ?? "0", 10);
  const minutes = parseInt(match[2] ?? "0", 10);
  const seconds = parseInt(match[3] ?? "0", 10);
  return hours * 3600 + minutes * 60 + seconds;
}

export async function getUploadsPlaylistId(
  providerToken: string | null
): Promise<string | null> {
  if (!providerToken) return null;

  const url = new URL("https://www.googleapis.com/youtube/v3/channels");
  url.searchParams.set("part", "contentDetails");
  url.searchParams.set("mine", "true");

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${providerToken}` },
  });

  if (!res.ok) return null;

  const data = (await res.json()) as {
    items?: Array<{
      contentDetails?: { relatedPlaylists?: { uploads?: string } };
    }>;
  };

  return data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads ?? null;
}

export async function fetchPlaylistVideos(
  providerToken: string,
  playlistId: string,
  pageToken?: string,
  maxResults = 12
): Promise<{
  videos: YouTubeVideoForCache[];
  nextPageToken: string | null;
}> {
  const headers = { Authorization: `Bearer ${providerToken}` };

  const playlistUrl = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  playlistUrl.searchParams.set("part", "snippet");
  playlistUrl.searchParams.set("playlistId", playlistId);
  playlistUrl.searchParams.set("maxResults", String(maxResults));
  if (pageToken) playlistUrl.searchParams.set("pageToken", pageToken);

  const playlistRes = await fetch(playlistUrl.toString(), { headers });
  if (!playlistRes.ok) return { videos: [], nextPageToken: null };

  const playlistData = (await playlistRes.json()) as {
    items?: Array<{
      snippet?: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails?: { default?: { url: string }; medium?: { url: string }; high?: { url: string } };
        resourceId?: { videoId: string };
      };
    }>;
    nextPageToken?: string | null;
  };

  const items = playlistData.items ?? [];
  const videoIds = items
    .map((i) => i.snippet?.resourceId?.videoId)
    .filter((id): id is string => !!id);

  if (videoIds.length === 0) {
    return { videos: [], nextPageToken: playlistData.nextPageToken ?? null };
  }

  const videosUrl = new URL("https://www.googleapis.com/youtube/v3/videos");
  videosUrl.searchParams.set("part", "statistics,contentDetails");
  videosUrl.searchParams.set("id", videoIds.join(","));

  const videosRes = await fetch(videosUrl.toString(), { headers });
  if (!videosRes.ok) return { videos: [], nextPageToken: null };

  const videosData = (await videosRes.json()) as {
    items?: Array<{
      id: string;
      statistics?: { viewCount?: string; likeCount?: string };
      contentDetails?: { duration?: string };
    }>;
  };

  const statsMap = new Map(
    (videosData.items ?? []).map((v) => [
      v.id,
      {
        viewCount: parseInt(v.statistics?.viewCount ?? "0", 10),
        likeCount: parseInt(v.statistics?.likeCount ?? "0", 10),
        duration: v.contentDetails?.duration ?? "PT0S",
      },
    ])
  );

  const videos: YouTubeVideoForCache[] = items.map((item) => {
    const snippet = item.snippet!;
    const videoId = snippet.resourceId?.videoId ?? "";
    const stats = statsMap.get(videoId) ?? { viewCount: 0, likeCount: 0, duration: "PT0S" };
    const thumbnails = snippet.thumbnails;
    const thumbnailUrl =
      thumbnails?.high?.url ?? thumbnails?.medium?.url ?? thumbnails?.default?.url ?? "";

    return {
      youtube_video_id: videoId,
      channel_id: snippet.channelId,
      title: snippet.title ?? "",
      description: snippet.description ?? null,
      thumbnail_url: thumbnailUrl,
      duration_seconds: parseIso8601Duration(stats.duration),
      published_at: snippet.publishedAt ?? new Date().toISOString(),
      view_count: stats.viewCount,
      like_count: stats.likeCount,
    };
  });

  return {
    videos,
    nextPageToken: playlistData.nextPageToken ?? null,
  };
}

export interface YouTubeVideoDetail {
  youtube_video_id: string;
  title: string;
  description: string | null;
  tags: string[];
  category_id: string;
  default_language: string | null;
  recording_location: string | null;
  privacy_status: string;
  thumbnail_url: string;
  duration_seconds: number | null;
  view_count: number;
  like_count: number;
  published_at: string;
}

export async function getVideoDetail(
  providerToken: string,
  videoId: string
): Promise<YouTubeVideoDetail | null> {
  const url = new URL("https://www.googleapis.com/youtube/v3/videos");
  url.searchParams.set("part", "snippet,contentDetails,statistics,status,recordingDetails");
  url.searchParams.set("id", videoId);

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${providerToken}` },
  });

  if (!res.ok) return null;

  const data = (await res.json()) as {
    items?: Array<{
      id: string;
      snippet?: {
        title: string;
        description: string;
        tags?: string[];
        categoryId?: string;
        defaultLanguage?: string;
        defaultAudioLanguage?: string;
        publishedAt?: string;
        thumbnails?: { default?: { url: string }; medium?: { url: string }; high?: { url: string } };
      };
      contentDetails?: { duration?: string };
      statistics?: { viewCount?: string; likeCount?: string };
      status?: { privacyStatus?: string };
      recordingDetails?: { location?: { description?: string } };
    }>;
  };

  const item = data.items?.[0];
  if (!item?.snippet) return null;

  const snippet = item.snippet;
  const thumbnails = snippet.thumbnails;
  const thumbnailUrl =
    thumbnails?.high?.url ?? thumbnails?.medium?.url ?? thumbnails?.default?.url ?? "";

  const recordingLocation =
    (item as { recordingDetails?: { location?: { description?: string } } }).recordingDetails
      ?.location?.description ?? null;

  return {
    youtube_video_id: item.id,
    title: snippet.title ?? "",
    description: snippet.description ?? null,
    tags: snippet.tags ?? [],
    category_id: snippet.categoryId ?? "22",
    default_language: snippet.defaultLanguage ?? snippet.defaultAudioLanguage ?? null,
    recording_location: recordingLocation,
    privacy_status: item.status?.privacyStatus ?? "public",
    thumbnail_url: thumbnailUrl,
    duration_seconds: item.contentDetails?.duration
      ? parseIso8601Duration(item.contentDetails.duration)
      : null,
    view_count: parseInt(item.statistics?.viewCount ?? "0", 10),
    like_count: parseInt(item.statistics?.likeCount ?? "0", 10),
    published_at: snippet.publishedAt ?? new Date().toISOString(),
  };
}

export interface YouTubeVideoUpdatePayload {
  title: string;
  description: string;
  tags: string[];
  categoryId: string;
  defaultLanguage?: string;
  privacyStatus: string;
}

export async function updateVideoOnYouTube(
  providerToken: string,
  videoId: string,
  payload: YouTubeVideoUpdatePayload
): Promise<{ success: true } | { success: false; error: string }> {
  const url = new URL("https://www.googleapis.com/youtube/v3/videos");
  url.searchParams.set("part", "snippet,status");

  const body = {
    id: videoId,
    snippet: {
      title: payload.title,
      description: payload.description,
      tags: payload.tags,
      categoryId: payload.categoryId,
      defaultLanguage: payload.defaultLanguage ?? undefined,
    },
    status: {
      privacyStatus: payload.privacyStatus,
    },
  };

  const res = await fetch(url.toString(), {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${providerToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const message = (err as { error?: { message?: string } }).error?.message ?? res.statusText;
    return { success: false, error: message };
  }

  return { success: true };
}

export async function getYouTubeChannel(
  providerToken: string | null
): Promise<YouTubeChannel | null> {
  if (!providerToken) return null;

  const url = new URL("https://www.googleapis.com/youtube/v3/channels");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("mine", "true");

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${providerToken}`,
    },
  });

  if (!res.ok) return null;

  const data = (await res.json()) as {
    items?: Array<{
      id: string;
      snippet?: {
        title: string;
        thumbnails?: YouTubeChannel["thumbnails"];
      };
    }>;
  };

  const channel = data.items?.[0];
  if (!channel?.snippet) return null;

  return {
    id: channel.id,
    title: channel.snippet.title,
    thumbnails: channel.snippet.thumbnails,
  };
}
