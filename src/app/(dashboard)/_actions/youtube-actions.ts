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
