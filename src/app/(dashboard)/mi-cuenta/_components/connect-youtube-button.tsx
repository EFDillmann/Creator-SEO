"use client";

import { createClient } from "@/lib/supabase/client";
import {
  GOOGLE_OAUTH_QUERY_PARAMS,
  GOOGLE_OAUTH_SCOPES,
} from "@/app/(auth)/_utils/auth-scopes";

export function ConnectYouTubeButton() {
  const handleConnect = async () => {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: GOOGLE_OAUTH_SCOPES,
        queryParams: GOOGLE_OAUTH_QUERY_PARAMS,
        redirectTo: `${window.location.origin}/api/auth/callback?next=/mi-cuenta`,
      },
    });
  };

  return (
    <button
      type="button"
      onClick={handleConnect}
      className="flex items-center gap-2 rounded border border-gray-300 px-4 py-2 text-sm font-medium text-yt-text transition-colors hover:bg-gray-50 hover:text-black"
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
          fill="#FF0000"
        />
      </svg>
      Conectar canal de YouTube
    </button>
  );
}
