import { notFound } from "next/navigation";

export default async function VideoOptimizePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) notFound();
  return (
    <div className="flex flex-1 flex-col p-8">
      <h1 className="text-2xl font-bold">Optimizar video</h1>
      <p className="mt-2 text-[#606060]">Video ID: {id}</p>
      <p className="mt-4 text-sm text-[#606060]">
        Esta página estará disponible próximamente.
      </p>
    </div>
  );
}
