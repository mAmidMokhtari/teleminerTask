import React, { useState } from "react";

import type { IMovie } from "@/hooks/useMovies";

import useMovieStore from "../../store/useMovieStore";

interface MovieFormProps {
  movieToEdit?: IMovie | null;
  onClose: () => void;
}

export default function MovieForm({ movieToEdit, onClose }: MovieFormProps) {
  const isEditMode = !!movieToEdit;
  const { addMovie, updateMovie } = useMovieStore();

  const [title, setTitle] = useState(movieToEdit?.Title || "");
  const [year, setYear] = useState(movieToEdit?.Year || "");
  const [genre, setGenre] = useState(movieToEdit?.Genre || "");
  const [poster, setPoster] = useState(movieToEdit?.Poster || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    const newMovie = {
      imdbID: isEditMode ? movieToEdit.imdbID : `custom-${Date.now()}`,
      Title: title,
      Year: year,
      Genre: genre,
      Poster: poster,
    };

    if (isEditMode) {
      updateMovie(newMovie);
    } else {
      addMovie(newMovie);
    }

    onClose();
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-96 max-w-full"
      >
        <h2 className="mb-4 font-bold text-xl">
          {isEditMode ? "Edit Movie" : "Add Movie"}
        </h2>

        <label className="block mb-2">
          Title <span className="text-red-500">*</span>
          <input
            type="text"
            className="px-2 py-1 border rounded w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label className="block mb-2">
          Year
          <input
            type="text"
            className="px-2 py-1 border rounded w-full"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </label>

        <label className="block mb-2">
          Genre
          <input
            type="text"
            className="px-2 py-1 border rounded w-full"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </label>

        <label className="block mb-4">
          Poster URL
          <input
            type="text"
            className="px-2 py-1 border rounded w-full"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
          />
        </label>

        <div className="flex justify-end gap-2">
          <button type="button" className="btn-outline btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditMode ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
