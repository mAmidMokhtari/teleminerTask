import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

import { fetchMovieDetail } from "../../services/api";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieDetail(id!),
    enabled: !!id,
  });

  if (isLoading)
    return <p className="py-10 text-center">Loading movie details...</p>;
  if (isError)
    return (
      <p className="py-10 text-destructive text-center">
        Failed to load movie.
      </p>
    );

  return (
    <div className="flex flex-col gap-2 mx-auto px-4 py-8 container">
      <Link to={"/"}>
        <Button type="button" className="btn btn-primary">
          back
        </Button>
      </Link>
      <Card className="flex md:flex-row flex-col gap-6 p-6">
        <img
          src={data?.Poster !== "N/A" ? data?.Poster : "/placeholder.png"}
          alt={data?.Title}
          className="rounded-xl w-full md:w-64 h-auto object-cover"
        />
        <div className="space-y-4">
          <h2 className="font-bold text-3xl">{data?.Title}</h2>
          <p className="text-muted-foreground">
            {data?.Year} • {data?.Runtime} • {data?.Genre}
          </p>
          <p>{data?.Plot}</p>
          <div className="text-muted-foreground text-sm">
            <p>
              <strong>Director:</strong> {data?.Director}
            </p>
            <p>
              <strong>Actors:</strong> {data?.Actors}
            </p>
            <p>
              <strong>Language:</strong> {data?.Language}
            </p>
            <p>
              <strong>IMDb Rating:</strong> {data?.imdbRating}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
