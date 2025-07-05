import { Link, useNavigate } from "react-router-dom";

import { Card, CardContent } from "../ui/card";

interface MovieCardProps {
  imdbID: string;
  Poster: string;
  Title: string;
  Year: string;
  Type: string;
}

export default function MovieCard({
  imdbID,
  Poster,
  Title,
  Year,
  Type,
}: MovieCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/movie/${imdbID}`)}
      className="bg-muted hover:shadow-lg border border-border rounded-2xl w-full max-w-xs overflow-hidden transition cursor-pointer"
    >
      <Link to={`/movie/${imdbID}`}>
        <img
          src={Poster !== "N/A" ? Poster : "/placeholder.png"}
          alt={Title}
          className="w-full h-72 object-cover"
        />
        <CardContent className="space-y-2 p-4">
          <h3 className="font-semibold text-lg truncate">{Title}</h3>
          <p className="text-muted-foreground text-sm">
            {Year} • {Type}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}
