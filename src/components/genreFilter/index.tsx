import useMovieStore from "../../store/useMovieStore";

export default function GenreFilter() {
  const { genres, selectedGenre, setSelectedGenre } = useMovieStore();

  return (
    <div className="flex flex-wrap gap-2 my-4">
      <button
        className={`btn ${
          selectedGenre === null ? "btn-primary" : "btn-outline"
        }`}
        onClick={() => setSelectedGenre(null)}
      >
        All
      </button>
      {genres.map((genre) => (
        <button
          key={genre}
          className={`btn ${
            selectedGenre === genre ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => setSelectedGenre(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
