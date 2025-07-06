import type { IMovie } from "@/model";
import { Movie } from "@/model";
import { Paginate } from "@/model/pagination";
import type { IPaginate } from "@/model/pagination/index.type";
import api from "@/services";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";

export const useGetMovieInfiniteList = (search: string, genreId: string[]) => {
  const queryFn = async ({
    pageParam = 1,
    queryKey,
  }: QueryFunctionContext<[string, string, string]>) => {
    return api.movie.getMovies({
      pageParam,
      queryKey,
    });
  };

  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<IPaginate<IMovie>>({
    queryKey: ["movies", search, genreId.join(",")],
    queryFn,
    getNextPageParam: (lastPage) => {
      return lastPage?.page &&
        lastPage.total_pages &&
        lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    staleTime: 5 * 60 * 1000,
  });

  const pages = data?.pages?.map(
    (page) => new Paginate<IMovie, Movie>(Movie, page, page?.page)
  );

  return {
    pages,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
};

export default useGetMovieInfiniteList;
