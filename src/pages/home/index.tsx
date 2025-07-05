import { useEffect, useRef, useState } from "react";

import GenreFilter from "@/components/genreFilter";
import MovieCard from "@/components/movieCard";
import MovieForm from "@/components/movieForm.tsx";
import SearchBar from "@/components/searchBar";
import SkeletonMovieCard from "@/components/skeletonMovieCard";
import { Button } from "@/components/ui/button";
import { type IMovie, useMovies } from "@/hooks/useMovies";
import useMovieStore from "@/store/useMovieStore";

export default function Home() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMovies();

  const { selectedGenre, customMovies, deleteMovie } = useMovieStore();
  const [formOpen, setFormOpen] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState<IMovie | null>(null);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [fetchNextPage, hasNextPage]);

  const allMovies = [
    ...customMovies,
    ...(data?.pages.flatMap((page) => page.Search) || []),
  ];

  const filteredMovies = allMovies.filter((movie: IMovie) =>
    selectedGenre ? movie.Genre?.includes(selectedGenre) : true
  );

  const openAddForm = () => {
    setMovieToEdit(null);
    setFormOpen(true);
  };

  const openEditForm = (movie: IMovie) => {
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
        <Button onClick={openAddForm} className="ml-4">
          Add Movie
        </Button>
      </div>

      <GenreFilter />

      {isError && (
        <p className="text-destructive text-center">Something went wrong.</p>
      )}

      <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-6">
        {(isLoading || isFetchingNextPage) && !data
          ? Array.from({ length: 10 }).map((_, i) => (
              <SkeletonMovieCard key={i} />
            ))
          : filteredMovies.map((movie: IMovie) => (
              <div key={movie.imdbID} className="relative">
                <MovieCard {...movie} />
                <div className="top-2 right-2 absolute flex space-x-2">
                  <Button
                    onClick={() => openEditForm(movie)}
                    className="btn-outline btn btn-sm"
                  >
                    Edit
                  </Button>
                  {movie.imdbID.startsWith("custom-") && (
                    <Button
                      onClick={() => deleteMovie(movie.imdbID)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </Button>
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
