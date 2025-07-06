import type { Movie } from "@/model";

interface MovieDetailCardProps {
  movie: Movie;
}

export const MovieDetailCard = ({ movie }: MovieDetailCardProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <img
        src={import.meta.env.VITE_BASE_IMAGE_URL + movie.getPoster()}
        alt={movie.getTitle()}
        className="w-full md:w-96 rounded-lg shadow"
      />

      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-bold">{movie.getTitle()}</h1>
        <p className="text-muted-foreground">{movie.getOverview()}</p>

        <div className="space-y-2">
          {movie.getReleaseDate() && (
            <p>
              <span className="font-semibold">Release Date:</span>{" "}
              {movie.getReleaseDate()}
            </p>
          )}

          {movie.getRuntime() && (
            <p>
              <span className="font-semibold">Runtime:</span>{" "}
              {movie.getRuntime()} min
            </p>
          )}

          {movie.getVoteAverage() && (
            <p>
              <span className="font-semibold">Rating:</span>{" "}
              {movie.getVoteAverage()}/10
            </p>
          )}

          {movie.getGenres() && movie.getGenres().length > 0 && (
            <p>
              <span className="font-semibold">Genres:</span>{" "}
              {movie
                .getGenres()
                .map((g) => g.getName())
                .join(", ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
