import type { UseBaseQueryOptions } from "@tanstack/react-query";

export type BaseQuery<T = unknown> = {
  queryOptions?: UseBaseQueryOptions<T>;
  limit?: number;
  page?: number;
};
