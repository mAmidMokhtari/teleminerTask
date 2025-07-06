type Result<T> = {
  page?: number;
  total_pages?: number;
  results?: T[];
};

export interface IPaginate<T> extends Result<T> {}
