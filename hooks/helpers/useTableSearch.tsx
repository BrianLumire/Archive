import { useState, useEffect } from "react";

interface UseSearchProps<T> {
  initialSearchTerm?: string;
  onSearch: (searchTerm: string) => void;
  debounceTime?: number;
}

export function useSearch<T>({
  initialSearchTerm = "",
  onSearch,
}: UseSearchProps<T>) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    onSearch(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement> | string
  ) => {
    setSearchTerm(typeof event === "string" ? event : event.target.value);
  };

  return {
    searchTerm,
    setSearchTerm,
    handleSearchChange,
  };
}
