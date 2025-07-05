// import { useQuery } from "@tanstack/react-query";

// import { fetchMovies } from "../services/api";
// import useMovieStore from "../store/useMovieStore";

// export const useMovies = () => {
//   const { search, page } = useMovieStore();

//   return useQuery({
//     queryKey: ["movies", search, page],
//     queryFn: () => fetchMovies(search, page),
//     enabled: search.trim().length > 0,
//     placeholderData: [],
//   });
// };

// import { useQuery } from "@tanstack/react-query";

// import { fetchMovieDetail, fetchMovies } from "../services/api";
// import useMovieStore from "../store/useMovieStore";

// export const useMovies = () => {
//   const { search, page } = useMovieStore();

//   return useQuery({
//     queryKey: ["movies", search, page],
//     queryFn: async () => {
//       const base = await fetchMovies(search, page);
//       const enriched = await Promise.all(
//         (base?.Search || []).map(async (movie: any) => {
//           const details = await fetchMovieDetail(movie.imdbID);
//           return { ...movie, ...details };
//         })
//       );
//       return { ...base, Search: enriched };
//     },
//     keepPreviousData: true,
//     enabled: search.trim().length > 0,
//     placeholderData: [],
//   });
// };

import { useQuery } from "@tanstack/react-query";

import { fetchMovieDetail, fetchMovies } from "../services/api";
import useMovieStore from "../store/useMovieStore";

export const useMovies = () => {
  const { search, page, setGenres } = useMovieStore();

  return useQuery({
    queryKey: ["movies", search, page],
    queryFn: async () => {
      const base = await fetchMovies(search, page);
      const enriched = await Promise.all(
        (base?.Search || []).map(async (movie: any) => {
          const details = await fetchMovieDetail(movie.imdbID);
          return { ...movie, ...details };
        })
      );

      // extract genres and update store
      const genreSet = new Set<string>();
      enriched.forEach((movie) => {
        movie.Genre?.split(", ").forEach((g: string) => genreSet.add(g));
      });
      setGenres(Array.from(genreSet));

      return { ...base, Search: enriched };
    },
    keepPreviousData: true,
    enabled: search.trim().length > 0,
  });
};
