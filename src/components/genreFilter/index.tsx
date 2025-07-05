import useMovieStore from "../../store/useMovieStore";
import { Button } from "../ui/button";

export default function GenreFilter() {
  const { genres, selectedGenre, setSelectedGenre } = useMovieStore();

  return (
    <div className="flex flex-wrap gap-2 my-4">
      <Button
        className={`btn ${
          selectedGenre === null ? "btn-primary" : "btn-outline"
        }`}
        onClick={() => setSelectedGenre(null)}
      >
        All
      </Button>
      {genres.map((genre) => (
        <Button
          key={genre}
          className={`btn ${
            selectedGenre === genre ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => setSelectedGenre(genre)}
        >
          {genre}
        </Button>
      ))}
    </div>
  );
}
