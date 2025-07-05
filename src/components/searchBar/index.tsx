import { useEffect, useState } from "react";

import { useDebounce } from "../../hooks/useDebounce";
import useMovieStore from "../../store/useMovieStore";

export default function SearchBar() {
  const { setSearch } = useMovieStore();
  const [inputValue, setInputValue] = useState("");
  const debounced = useDebounce(inputValue, 500);

  useEffect(() => {
    setSearch(debounced);
  }, [debounced, setSearch]);

  return (
    <div className="mx-auto my-6 w-full max-w-xl">
      <Input
        type="text"
        placeholder="Search for a movie..."
        className="text-base"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
}
