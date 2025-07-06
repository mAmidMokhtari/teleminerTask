import type { IGenre } from "./index.type";

export class Genre {
  protected props: IGenre = {};

  constructor(data?: IGenre) {
    if (data) {
      this.props = data;
    }
  }

  getId(): string {
    return this.props?.id?.toString() || "";
  }

  getName(): string {
    return this.props?.name || "";
  }
}
