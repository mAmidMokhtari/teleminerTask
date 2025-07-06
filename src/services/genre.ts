import axios from "axios";

export const fetchGenres = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_API_URL}/genre/movie/list`,
    {
      params: {
        api_key: import.meta.env.VITE_API_KEY,
      },
    }
  );
  return res.data.genres; // [{id, name}]
};
