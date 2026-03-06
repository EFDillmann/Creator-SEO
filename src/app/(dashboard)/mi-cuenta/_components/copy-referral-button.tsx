"use client";

import { useState } from "react";
import { Icon } from "@/shared/components/ui/icon";

interface CopyReferralButtonProps {
  referralLink: string;
}

export function CopyReferralButton({ referralLink }: CopyReferralButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-2 rounded bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-sm shadow-red-200 transition-colors hover:bg-[#cc0000]"
    >
      <Icon name="content_copy" className="text-lg" />
      {copied ? "¡Copiado!" : "Copiar enlace"}
    </button>
  );
}
