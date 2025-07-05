export default function SkeletonMovieCard() {
  return (
    <div className="bg-gray-300 rounded-md w-full h-64 animate-pulse">
      <div className="bg-gray-400 mb-4 rounded w-full h-40"></div>
      <div className="bg-gray-400 mb-2 rounded w-3/4 h-4"></div>
      <div className="bg-gray-400 rounded w-1/2 h-4"></div>
    </div>
  );
}
