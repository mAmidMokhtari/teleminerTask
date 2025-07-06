import { Link, useNavigate } from "react-router-dom";

import type { Movie } from "@/model";

import { Card, CardContent } from "../ui/card";

export type MovieCardProps = {
  movie?: Movie;
};

export const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/movie/${movie?.getId()}`)}
      className="py-0 bg-muted hover:shadow-lg border border-border rounded-2xl w-full sm:max-w-xs overflow-hidden transition cursor-pointer">
      <Link to={`/movie/${movie?.getId()}`}>
        <img
          src={import.meta.env.VITE_BASE_IMAGE_URL + movie?.getPoster()}
          alt={movie?.getTitle()}
          className="w-full h-48 object-cover"
        />
        <CardContent className="space-y-2 p-4">
          <h3 className="font-semibold text-lg truncate">
            {movie?.getTitle()}
          </h3>
          <p className="text-muted-foreground text-sm truncate-multiline">
            {movie?.getOverview()}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
};
