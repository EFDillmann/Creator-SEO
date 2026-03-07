import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getVideoDetailForEdit } from "../../../_actions/video-actions";
import { VideoDetailContent } from "./_components/video-detail-content";

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) notFound();

  const video = await getVideoDetailForEdit(user.id, id);
  if (!video) notFound();

  return <VideoDetailContent video={video} userId={user.id} />;
}
