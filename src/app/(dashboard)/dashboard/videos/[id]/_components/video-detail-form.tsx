"use client";

import { useCallback } from "react";
import type {
  VideoFormData,
  VideoDetailForEdit,
} from "@/app/(dashboard)/_actions/video-actions";
import type { AIVideoContext } from "@/app/(dashboard)/_actions/ai-actions";
import { VideoDetailAIContext } from "./video-detail-ai-context";
import { VideoTitleField } from "./video-title-field";
import { VideoDescriptionField } from "./video-description-field";
import { VideoTagsField } from "./video-tags-field";
import { VideoMetaFields } from "./video-meta-fields";
import type { GeneralOptimizationResult } from "@/app/(dashboard)/_types/ai-schemas";

interface VideoDetailFormProps {
  formId: string;
  video: VideoDetailForEdit;
  formState: VideoFormData;
  onFormStateChange: (state: VideoFormData) => void;
  onSaveToYouTube: (formData: VideoFormData) => Promise<void>;
  isSaving: boolean;
}

export function VideoDetailForm({
  formId,
  video,
  formState,
  onFormStateChange,
  onSaveToYouTube,
}: VideoDetailFormProps) {
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await onSaveToYouTube(formState);
    },
    [formState, onSaveToYouTube],
  );

  const updateField = useCallback(
    <K extends keyof VideoFormData>(key: K, value: VideoFormData[K]) => {
      onFormStateChange({ ...formState, [key]: value });
    },
    [formState, onFormStateChange],
  );

  const handleGeneralAIComplete = useCallback(
    (data: GeneralOptimizationResult) => {
      onFormStateChange({
        ...formState,
        title: data.title,
        description: data.description,
        tags: data.tags,
        category_id: data.category_id,
        recording_location: data.recording_location,
        default_language: data.default_language,
      });
    },
    [formState, onFormStateChange],
  );

  const videoContext: AIVideoContext = {
    aiContext: formState.ai_context,
    title: formState.title,
    description: formState.description,
    tags: formState.tags,
    durationSeconds: video.duration_seconds,
  };

  return (
    <form id={formId} className="space-y-8" onSubmit={handleSubmit}>
      <VideoDetailAIContext
        value={formState.ai_context}
        onChange={(v) => updateField("ai_context", v)}
        onAIComplete={handleGeneralAIComplete}
        videoContext={videoContext}
      />
      <VideoTitleField
        value={formState.title}
        onChange={(v) => updateField("title", v)}
        videoContext={videoContext}
      />
      <VideoDescriptionField
        value={formState.description}
        onChange={(v) => updateField("description", v)}
        videoContext={videoContext}
      />
      <VideoTagsField
        value={formState.tags}
        onChange={(v) => updateField("tags", v)}
        videoContext={videoContext}
      />
      <VideoMetaFields
        categoryId={formState.category_id}
        recordingLocation={formState.recording_location}
        defaultLanguage={formState.default_language}
        onCategoryChange={(v) => updateField("category_id", v)}
        onLocationChange={(v) => updateField("recording_location", v)}
        onLanguageChange={(v) => updateField("default_language", v)}
      />
    </form>
  );
}
