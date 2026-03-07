import { redirect } from "next/navigation";

export default async function VideoOptimizeRedirect({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/dashboard/videos/${id}`);
}
