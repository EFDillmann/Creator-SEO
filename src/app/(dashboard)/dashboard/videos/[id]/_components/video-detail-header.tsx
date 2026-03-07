"use client";

import Link from "next/link";
import { Icon } from "@/shared/components/ui/icon";

interface VideoDetailHeaderProps {
  videoId: string;
  formId?: string;
  onDiscard?: () => void;
  isSaving?: boolean;
  hasChanges?: boolean;
}

export function VideoDetailHeader({
  formId,
  onDiscard,
  isSaving = false,
  hasChanges = false,
}: VideoDetailHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/95 px-8 py-4 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-sm font-medium text-yt-gray transition-colors hover:text-black"
        >
          <Icon name="arrow_back" />
          Volver a mis publicaciones
        </Link>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onDiscard}
          className="rounded px-4 py-2 text-sm font-medium text-yt-gray transition-colors hover:bg-gray-50 hover:text-black"
        >
          Descartar
        </button>
        <button
          type="submit"
          form={formId}
          disabled={isSaving || !hasChanges}
          className="rounded bg-primary px-6 py-2 text-sm font-medium text-white shadow-sm shadow-red-200 transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? "Guardando..." : "Guardar cambios en YouTube"}
        </button>
      </div>
    </header>
  );
}
