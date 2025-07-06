import { useEffect, useState } from "react";

import { useDebounce } from "@/hooks/useDebounce";
import useMovieStore from "@/store/useMovieStore";

export const useData = () => {
  const { setSearch } = useMovieStore();
  const [inputValue, setInputValue] = useState("");
  const debounced = useDebounce(inputValue, 500);

  useEffect(() => {
    setSearch(debounced);
  }, [debounced, setSearch]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return {
    inputValue,
    handleChangeInput,
  };
};
