import React from "react";

import { Link, useParams } from "react-router-dom";

import api from "@/api";
import { MovieDetailCard, MovieDetailSkeleton } from "@/components";
import { Button } from "@/components/ui/button";

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  /* ---------------------------------- Apis ---------------------------------- */

  const { useGetMovie } = api.queries.movie;

  const movie = useGetMovie(id);

  if (movie.isLoading) return <MovieDetailSkeleton />;
  if (movie.isError)
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error: {(movie.error as Error).message}</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        <Button>← Back to list</Button>
      </Link>
      <MovieDetailCard movie={movie.data} />
    </div>
  );
};

export default MovieDetail;
