import type { IMovie } from "@/model";
import { Movie } from "@/model";
import { Paginate } from "@/model/pagination";
import type { IPaginate } from "@/model/pagination/index.type";
import api from "@/services";
import {
  type QueryFunctionContext,
  useInfiniteQuery,
} from "@tanstack/react-query";

export const useGetMovieInfiniteList = (search: string, genreId: string[]) => {
  const genreString = genreId.join(",");
  const queryKey = ["movies", search, genreString];

  const queryFn = async (
    ctx: QueryFunctionContext
  ): Promise<IPaginate<IMovie>> => {
    const page = (ctx.pageParam ?? 1) as number;

    const [_, search, genres] = ctx.queryKey as [string, string, string];

    return api.movie.getMovies({
      pageParam: page,
      queryKey: [_, search, genres],
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
  } = useInfiniteQuery<IPaginate<IMovie>, Error>({
    queryKey,
    queryFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      typeof lastPage.page === "number" &&
      typeof lastPage.total_pages === "number" &&
      lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined,
    staleTime: 5 * 60 * 1000,
  });

  const pages = data?.pages?.map(
    (page) => new Paginate<IMovie, Movie>(Movie, page, page.page)
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
