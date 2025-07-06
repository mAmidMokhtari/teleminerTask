import { MovieCard, MovieCardSkeleton, SearchBar } from "@/components";

import { MultiSelect } from "../ui/multi-select";
import Spinner from "../ui/spinner";
import { useData } from "./useData";

export const MovieList = () => {
  const data = useData();

  return (
    <div className="space-y-4 m-auto container">
      <h1 className="font-bold text-3xl">Movie Explorer</h1>

      <div className="flex flex-wrap gap-2 mb-4">
        <SearchBar className="flex-1 h-10" />

        <MultiSelect
          options={data.genreOptions}
          onValueChange={data.handleGenreChange}
          placeholder="Select options"
          variant="inverted"
          animation={2}
          maxCount={3}
          className="w-full md:w-[600px] h-10"
        />
      </div>

      {data.isLoading && (
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      )}

      {data.isError && (
        <p className="text-red-500">Error: {(data.error as Error).message}</p>
      )}

      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-6">
        {!data.isLoading &&
          data.allMovies.map((movie, index) => {
            const isLast = index === data.allMovies.length - 1;

            const movieCard = <MovieCard key={movie.getId()} movie={movie} />;

            if (isLast) {
              return (
                <div
                  ref={data.lastMovieRef}
                  key={movie.getId()}
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "10px 0",
                  }}
                >
                  {movieCard}
                </div>
              );
            } else {
              return movieCard;
            }
          })}
      </div>

      {data.isFetchingNextPage && <Spinner />}
      {!data.hasNextPage && !data.isLoading && <p>No more movies to load.</p>}
    </div>
  );
};

export default MovieList;
