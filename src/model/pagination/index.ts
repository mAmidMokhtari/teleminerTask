import type { ClassConstructor } from "class-transformer";

import { Meta } from "../meta";
import type { IPaginate } from "./index.type";

export class Paginate<T, K> {
  protected props: IPaginate<T> = {};
  protected itemConstructor: ClassConstructor<K>;
  protected page?: number;

  constructor(
    itemConstructor: ClassConstructor<K>,
    data?: IPaginate<T>,
    page?: number
  ) {
    this.itemConstructor = itemConstructor;
    this.page = page;
    if (data) {
      this.props = data;
    }
  }

  getItems(): K[] {
    return (this.props?.results || []).map(
      (item) => new this.itemConstructor(item)
    );
  }

  getPage(): number {
    return this.page || 1;
  }

  getTotalCount(): number {
    return this.props.total_pages || 0;
  }

  getMeta(): Meta {
    return new Meta({
      totalItems: this.props.total_pages || 1,
      currentPage: this.page || 1,
    });
  }
}
