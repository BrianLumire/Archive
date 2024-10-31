import { useState, useEffect } from "react";

interface UsePaginationAndSearchProps<T> {
  initialPageIndex?: number;
  initialPageSize?: number;
  initialSearchTerm?: string;
  onSearchAndPaginationChange: (params: {
    pageIndex: number;
    pageSize: number;
    searchTerm: string;
  }) => void;
}

export function usePaginationAndSearch<T>({
  initialPageIndex = 0,
  initialPageSize = 10,
  initialSearchTerm = "",
  onSearchAndPaginationChange,
}: UsePaginationAndSearchProps<T>) {
  const [pagination, setPagination] = useState({
    pageIndex: initialPageIndex,
    pageSize: initialPageSize,
  });
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    onSearchAndPaginationChange({
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      searchTerm,
    });
  }, [pagination.pageIndex, pagination.pageSize, searchTerm]);

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement> | string
  ) => {
    const newSearchTerm =
      typeof event === "string" ? event : event.target.value;
    setSearchTerm(newSearchTerm);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const handlePaginationChange = (newPagination: {
    pageIndex: number;
    pageSize: number;
  }) => {
    setPagination(newPagination);
  };

  return {
    pagination,
    searchTerm,
    handleSearchChange,
    handlePaginationChange,
    setPagination,
  };
}
