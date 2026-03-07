"use client";

import { useCallback } from "react";
import type { VideoFormData } from "@/app/(dashboard)/_actions/video-actions";
import { VideoDetailAIContext } from "./video-detail-ai-context";
import { VideoTitleField } from "./video-title-field";
import { VideoDescriptionField } from "./video-description-field";
import { VideoTagsField } from "./video-tags-field";
import { VideoMetaFields } from "./video-meta-fields";

interface VideoDetailFormProps {
  formId: string;
  formState: VideoFormData;
  onFormStateChange: (state: VideoFormData) => void;
  onSaveToYouTube: (formData: VideoFormData) => Promise<void>;
  isSaving: boolean;
}

export function VideoDetailForm({
  formId,
  formState,
  onFormStateChange,
  onSaveToYouTube,
  isSaving,
}: VideoDetailFormProps) {
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await onSaveToYouTube(formState);
    },
    [formState, onSaveToYouTube]
  );

  const updateField = useCallback(
    <K extends keyof VideoFormData>(key: K, value: VideoFormData[K]) => {
      onFormStateChange({ ...formState, [key]: value });
    },
    [formState, onFormStateChange]
  );

  return (
    <form id={formId} className="space-y-8" onSubmit={handleSubmit}>
      <VideoDetailAIContext
        value={formState.ai_context}
        onChange={(v) => updateField("ai_context", v)}
      />
      <VideoTitleField
        value={formState.title}
        onChange={(v) => updateField("title", v)}
      />
      <VideoDescriptionField
        value={formState.description}
        onChange={(v) => updateField("description", v)}
      />
      <VideoTagsField
        value={formState.tags}
        onChange={(v) => updateField("tags", v)}
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
