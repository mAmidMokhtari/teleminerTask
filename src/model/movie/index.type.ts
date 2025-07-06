import type { IGenre } from "../genre/index.type";

export interface IMovie {
  id?: number;
  title?: string;
  overview?: string;
  poster_path?: string;
  release_date?: string;
  genres?: IGenre[];
  runtime?: number;
  vote_average?: number;
}
