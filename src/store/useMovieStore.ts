import { create } from "zustand";

interface Movie {
  imdbID: string;
  Title: string;
  Year?: string;
  Genre?: string;
  Poster?: string;
  [key: string]: unknown;
}

interface MovieState {
  search: string;
  setSearch: (s: string) => void;
  page: number;
  setPage: (p: number) => void;
  genres: string[];
  setGenres: (g: string[]) => void;
  selectedGenre: string | null;
  setSelectedGenre: (g: string | null) => void;

  // Custom movies state
  customMovies: Movie[];
  addMovie: (movie: Movie) => void;
  updateMovie: (movie: Movie) => void;
  deleteMovie: (imdbID: string) => void;

  user: { username: string } | null;
  register: (username: string, password: string) => boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const useMovieStore = create<MovieState>((set) => ({
  search: "old",
  setSearch: (s) => set({ search: s, page: 1 }),
  page: 1,
  setPage: (p) => set({ page: p }),

  genres: [],
  setGenres: (g) => set({ genres: g }),

  selectedGenre: null,
  setSelectedGenre: (g) => set({ selectedGenre: g, page: 1 }),

  customMovies: [],
  addMovie: (movie) =>
    set((state) => ({
      customMovies: [...state.customMovies, movie],
    })),
  updateMovie: (updatedMovie) =>
    set((state) => ({
      customMovies: state.customMovies.map((m) =>
        m.imdbID === updatedMovie.imdbID ? updatedMovie : m
      ),
    })),
  deleteMovie: (imdbID) =>
    set((state) => ({
      customMovies: state.customMovies.filter((m) => m.imdbID !== imdbID),
    })),

  user: null,

  register: (username, password) => {
    const existing = localStorage.getItem(`user:${username}`);
    if (existing) return false;

    localStorage.setItem(`user:${username}`, password);
    return true;
  },

  login: (username, password) => {
    const storedPassword = localStorage.getItem(`user:${username}`);
    if (storedPassword === password) {
      set({ user: { username } });
      return true;
    }
    return false;
  },

  logout: () => set({ user: null }),
}));

export default useMovieStore;
