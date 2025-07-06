import type { IGenre } from "@/model";
import { Genre } from "@/model";
import services from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetGenres = () => {
  const { data, ...query } = useQuery<IGenre[]>({
    queryKey: ["genres"],
    queryFn: services.genre.fetchGenres,
  });

  const genres = data?.map((item) => new Genre(item)) || [];

  return {
    genres,
    ...query,
  };
};

export default useGetGenres;
