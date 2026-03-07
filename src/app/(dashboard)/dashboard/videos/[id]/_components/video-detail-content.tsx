"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { VideoDetailHeader } from "./video-detail-header";
import { VideoDetailSidebar } from "./video-detail-sidebar";
import { VideoDetailForm } from "./video-detail-form";
import {
  publishVideoToYouTube,
  type VideoDetailForEdit,
  type VideoFormData,
} from "@/app/(dashboard)/_actions/video-actions";

const toFormData = (v: VideoDetailForEdit): VideoFormData => ({
  title: v.title,
  description: v.description ?? "",
  tags: v.tags ?? [],
  category_id: v.category_id ?? "22",
  recording_location: v.recording_location ?? "",
  default_language: v.default_language ?? "es",
  privacy_status: v.privacy_status ?? "public",
  ai_context: v.ai_context ?? "",
});

interface VideoDetailContentProps {
  video: VideoDetailForEdit;
  userId: string;
}

export function VideoDetailContent({ video, userId }: VideoDetailContentProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formState, setFormState] = useState<VideoFormData>(toFormData(video));
  const initialData = useRef(toFormData(video));

  const hasChanges =
    JSON.stringify(formState) !== JSON.stringify(initialData.current);

  const handleDiscard = useCallback(() => {
    const initial = toFormData(video);
    setFormState(initial);
    initialData.current = initial;
  }, [video]);

  const handleSaveToYouTube = useCallback(
    async (formData: VideoFormData) => {
      setIsSaving(true);
      setError(null);
      const result = await publishVideoToYouTube(
        userId,
        video.youtube_video_id,
        formData
      );
      setIsSaving(false);
      if (result.success) {
        initialData.current = formData;
        router.refresh();
      } else {
        setError(result.error);
      }
    },
    [userId, video.youtube_video_id, router]
  );

  return (
    <div className="flex flex-1 flex-col">
      <VideoDetailHeader
        videoId={video.youtube_video_id}
        formId="video-detail-form"
        onDiscard={handleDiscard}
        isSaving={isSaving}
        hasChanges={hasChanges}
      />
      <div className="flex-1 p-8 text-yt-text">
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12">
          <VideoDetailSidebar video={video} />
          <div className="space-y-8 lg:col-span-8">
            <div>
              <h1 className="mb-2 text-2xl font-bold text-yt-text">{video.title}</h1>
              <p className="text-gray-600">
                Edita los detalles de tu video para mejorar su posicionamiento
                SEO.
              </p>
            </div>
            <VideoDetailForm
              formId="video-detail-form"
              formState={formState}
              onFormStateChange={setFormState}
              onSaveToYouTube={handleSaveToYouTube}
              isSaving={isSaving}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
