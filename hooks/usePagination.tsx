import { useState, useMemo } from 'react';

interface UsePaginationOptions<T> {
  data: T[];
  initialPage?: number;
  initialPageSize?: number;
}

export function usePagination<T>({
  data,
  initialPage = 1,
  initialPageSize = 10,
}: UsePaginationOptions<T>) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialPageSize);

  const totalEntries = data.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / itemsPerPage));

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (size: number) => {
    setItemsPerPage(size);
    setCurrentPage(1);
  };

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    totalEntries,
    currentData,
    handlePageChange,
    handleItemsPerPageChange,
  };
}