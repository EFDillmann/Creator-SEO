export default function VideoDetailLoading() {
  return (
    <div className="flex flex-1 flex-col p-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 h-10 w-64 animate-pulse rounded bg-gray-200" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="aspect-video animate-pulse rounded-xl bg-gray-200" />
            <div className="mt-6 space-y-4">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-20 animate-pulse rounded bg-gray-100" />
            </div>
          </div>
          <div className="space-y-8 lg:col-span-8">
            <div className="h-32 animate-pulse rounded-lg bg-gray-100" />
            <div className="h-12 animate-pulse rounded bg-gray-200" />
            <div className="h-48 animate-pulse rounded-lg bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
