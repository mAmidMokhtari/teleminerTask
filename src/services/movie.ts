import axios from "axios";

import type { GetMovieRequest } from "@/dto";
import type { IMovie } from "@/model";
import type { IPaginate } from "@/model/pagination/index.type";

export const getMovies = async ({
  pageParam = 1,
  queryKey,
}: {
  pageParam?: number;
  queryKey: [string, string, string];
}): Promise<IPaginate<IMovie>> => {
  const [, search, genreId] = queryKey;

  const url = search
    ? `${import.meta.env.VITE_BASE_API_URL}/search/movie`
    : `${import.meta.env.VITE_BASE_API_URL}/discover/movie`;

  const params: GetMovieRequest = {
    api_key: import.meta.env.VITE_API_KEY || "",
    page: pageParam,
  };

  if (search) params.query = search;
  if (genreId) params.with_genres = genreId;

  const res = await axios.get<IPaginate<IMovie>>(url, { params });
  const slicedResults = res.data?.results?.slice(0, 10);

  return {
    ...res.data,
    results: slicedResults,
  };
};

export const getMovie = async (id: string): Promise<IMovie> => {
  const url = `${import.meta.env.VITE_BASE_API_URL}/movie/${id}`;

  const res = await axios.get<IMovie>(url, {
    params: { api_key: import.meta.env.VITE_API_KEY },
  });

  return res.data;
};
