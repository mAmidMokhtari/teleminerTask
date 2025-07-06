export const MovieDetailSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 animate-pulse">
      <div className="mb-4">
        <div className="h-8 w-32 bg-muted rounded" />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-96 h-[500px] bg-muted rounded-lg shadow" />

        <div className="flex-1 space-y-4">
          <div className="h-8 w-3/4 bg-muted rounded" />

          <div className="space-y-2">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-5/6 bg-muted rounded" />
            <div className="h-4 w-2/3 bg-muted rounded" />
          </div>

          <div className="space-y-2 mt-6">
            <div className="h-4 w-1/2 bg-muted rounded" />
            <div className="h-4 w-1/3 bg-muted rounded" />
            <div className="h-4 w-1/4 bg-muted rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};
