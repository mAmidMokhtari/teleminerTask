import { Input } from "../ui/input";
import { useData } from "./useData";

export const SearchBar = ({ className }: { className?: string }) => {
  const data = useData();

  return (
    <Input
      type="text"
      placeholder="Search for a movie..."
      value={data.inputValue}
      onChange={data.handleChangeInput}
      className={className}
    />
  );
};
