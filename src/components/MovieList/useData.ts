import { useCallback, useRef, useState } from "react";

import api from "@/api";
import useMovieStore from "@/store/useMovieStore";

export const useData = () => {
  const { search } = useMovieStore();
  const [genreId, setGenreId] = useState<string[]>([]);

  const { useGetMovieInfiniteList } = api.queries.movie;
  const { useGetGenres } = api.queries.genre;

  const { genres } = useGetGenres();

  const genreOptions = genres.map((genre) => ({
    value: genre.getId(),
    label: genre.getName(),
  }));

  const {
    pages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useGetMovieInfiniteList(search, genreId);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastMovieRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isFetchingNextPage) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  const handleGenreChange = (value: string[]) => {
    setGenreId(value);
  };

  const allMovies = pages ? pages.flatMap((page) => page.getItems()) : [];

  return {
    allMovies,
    isLoading,
    isError,
    error,
    lastMovieRef,
    genreOptions,
    handleGenreChange,
    isFetchingNextPage,
    hasNextPage,
  };
};
