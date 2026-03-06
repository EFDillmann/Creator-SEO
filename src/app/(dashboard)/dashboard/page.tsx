import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getYouTubeChannel } from "../_actions/youtube-actions";
import { VideoGrid } from "./_components/video-grid";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const channel = await getYouTubeChannel(
    (await supabase.auth.getSession()).data.session?.provider_token ?? null,
  );

  if (!channel) {
    return (
      <div className="flex flex-1 flex-col items-center p-8">
        <header className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-gray-100 bg-white/95 px-8 py-4 backdrop-blur-sm">
          <h2 className="text-xl font-bold text-black">Dashboard</h2>
        </header>
        <div className="flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-6 p-8">
          <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <h1 className="mb-2 text-2xl font-bold text-black">
              Conecta tu canal de YouTube
            </h1>
            <p className="mb-4 text-yt-gray">
              Para ver tus videos y optimizarlos, necesitas conectar tu canal de
              YouTube desde Mi Cuenta.
            </p>
            <Link
              href="/mi-cuenta"
              className="inline-flex items-center text-sm font-medium text-red-500 hover:underline"
            >
              Ir a Mi Cuenta
            </Link>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <VideoGrid userId={user.id} />
    </div>
  );
}
