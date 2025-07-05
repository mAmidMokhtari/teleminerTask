import { useEffect, useRef, useState } from "react";

import GenreFilter from "../../components/genreFilter";
import MovieCard from "../../components/movieCard";
import MovieForm from "../../components/movieForm.tsx";
import SearchBar from "../../components/searchBar";
import SkeletonMovieCard from "../../components/skeletonMovieCard";
import { useMovies } from "../../hooks/useMovies";
import useMovieStore from "../../store/useMovieStore";

export default function Home() {
  const { data, isLoading, isError } = useMovies();
  const { setPage, selectedGenre, customMovies, deleteMovie } = useMovieStore();
  const [formOpen, setFormOpen] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState<any | null>(null);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) observer.unobserve(sentinelRef.current);
    };
  }, [setPage]);

  // ترکیب فیلم‌های واکشی شده و سفارشی
  const allMovies = [...(data?.Search || []), ...customMovies];

  // فیلتر بر اساس ژانر
  const filteredMovies = allMovies.filter((movie: any) =>
    selectedGenre ? movie.Genre?.includes(selectedGenre) : true
  );

  const openAddForm = () => {
    setMovieToEdit(null);
    setFormOpen(true);
  };

  const openEditForm = (movie: any) => {
    setMovieToEdit(movie);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setMovieToEdit(null);
  };

  return (
    <div className="mx-auto px-4 container">
      <div className="flex justify-between items-center mt-4">
        <SearchBar />
        <button onClick={openAddForm} className="ml-4 btn btn-primary">
          Add Movie
        </button>
      </div>

      <GenreFilter />

      {isError && (
        <p className="text-destructive text-center">Something went wrong.</p>
      )}

      <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-6">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <SkeletonMovieCard key={i} />
            ))
          : filteredMovies.map((movie: any) => (
              <div key={movie.imdbID} className="relative">
                <MovieCard {...movie} />
                <div className="top-2 right-2 absolute flex space-x-2">
                  <button
                    onClick={() => openEditForm(movie)}
                    className="btn-outline btn btn-sm"
                  >
                    Edit
                  </button>
                  {movie.imdbID.startsWith("custom-") && (
                    <button
                      onClick={() => deleteMovie(movie.imdbID)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
      </div>

      <div ref={sentinelRef} className="h-10" />

      {formOpen && <MovieForm movieToEdit={movieToEdit} onClose={closeForm} />}
    </div>
  );
}
