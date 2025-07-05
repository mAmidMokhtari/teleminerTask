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

import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchMovieDetail, fetchMovies } from "../services/api";
import useMovieStore from "../store/useMovieStore";

export interface IMovie {
  Title: string;
  Year: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster: string;
  Ratings?: [
    {
      Source: string;
      Value: string;
    },
    {
      Source: string;
      Value: string;
    },
    {
      Source: string;
      Value: string;
    }
  ];
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  imdbID: string;
  Type: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
}

// export const useMovies = () => {
//   const { search, page, setGenres } = useMovieStore();

//   return useQuery({
//     queryKey: ["movies", search, page],
//     queryFn: async () => {
//       const base = await fetchMovies(search, page);
//       const enriched = await Promise.all(
//         (base?.Search || []).map(async (movie: IMovie) => {
//           const details = await fetchMovieDetail(movie.imdbID);
//           return { ...movie, ...details };
//         })
//       );

//       // extract genres and update store
//       const genreSet = new Set<string>();
//       enriched.forEach((movie) => {
//         movie.Genre?.split(", ").forEach((g: string) => genreSet.add(g));
//       });
//       setGenres(Array.from(genreSet));

//       return { ...base, Search: enriched };
//     },

//     enabled: search.trim().length > 0,
//     placeholderData: [],
//   });
// };
export const useMovies = () => {
  const { search, setGenres } = useMovieStore();

  return useInfiniteQuery({
    queryKey: ["movies", search],
    queryFn: async ({ pageParam = 1 }) => {
      const base = await fetchMovies(search, pageParam);
      const enriched = await Promise.all(
        (base?.Search || []).map(async (movie: IMovie) => {
          const details = await fetchMovieDetail(movie.imdbID);
          return { ...movie, ...details };
        })
      );

      // update genres
      const genreSet = new Set<string>();
      enriched.forEach((movie) => {
        movie.Genre?.split(", ").forEach((g: string) => genreSet.add(g));
      });
      setGenres(Array.from(genreSet).sort());

      return { ...base, Search: enriched, page: pageParam };
    },
    getNextPageParam: (lastPage) => {
      const totalResults = parseInt(lastPage.totalResults || "0", 10);
      const totalPages = Math.ceil(totalResults / 10);
      const nextPage = lastPage.page + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    enabled: search.trim().length > 0,
    initialPageParam: 1,
  });
};
