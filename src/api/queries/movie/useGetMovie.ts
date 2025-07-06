import { type IMovie, Movie } from "@/model";
import services from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetMovie = (id?: string) => {
  const { data, ...query } = useQuery<IMovie>({
    queryKey: ["MOVIE", id],
    queryFn: async ({ queryKey }) => {
      const [, movieId] = queryKey;

      return await services.movie.getMovie(movieId as string);
    },
    enabled: !!id,
  });

  return {
    data: new Movie(data),
    ...query,
  };
};

export default useGetMovie;
