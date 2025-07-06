import { Genre } from "../genre";
import type { IMovie } from "./index.type";

export class Movie {
  protected props: IMovie = {};

  constructor(data?: IMovie) {
    if (data) {
      this.props = data;
    }
  }

  getId(): number {
    return this.props?.id || 0;
  }

  getTitle(): string {
    return this.props?.title || "";
  }

  getOverview(): string {
    return this.props?.overview || "";
  }

  getPoster(): string {
    return this.props?.poster_path || "";
  }

  getReleaseDate(): string {
    return this.props?.release_date || "";
  }

  getGenres(): Genre[] {
    return (this.props?.genres || [])?.map((genre) => new Genre(genre));
  }

  getRuntime(): number {
    return this.props?.runtime || 0;
  }

  getVoteAverage(): number {
    return this.props?.vote_average || 0;
  }
}
