import { create } from "zustand";

interface MovieState {
  search: string;
  setSearch: (s: string) => void;
}

const useMovieStore = create<MovieState>((set) => ({
  search: "old",
  setSearch: (value) => set({ search: value }),
}));

export default useMovieStore;
