'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PaginationProps {
  /** Current active page (1-indexed) */
  currentPage: number;
  /** Total number of pages available */
  totalPages: number;
  /** Total number of entries across all pages */
  totalEntries: number;
  /** Number of items displayed per page */
  itemsPerPage: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Callback when items per page changes */
  onItemsPerPageChange: (items: number) => void;
  /** Optional: Custom page size options */
  pageSizeOptions?: number[];
  /** Optional: CSS class name for custom styling */
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  totalEntries,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  pageSizeOptions = [5, 8, 10, 15, 20, 30, 50],
  className = '',
}: PaginationProps) {
  if (totalPages === 0) return null;

  const startEntry = Math.min((currentPage - 1) * itemsPerPage + 1, totalEntries);
  const endEntry = Math.min(currentPage * itemsPerPage, totalEntries);

  const getPageNumbers = (): (number | '...')[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(1, currentPage - 1);
    const rightSibling = Math.min(totalPages, currentPage + 1);
    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      return [1, 2, 3, 4, '...', totalPages];
    }

    if (showLeftDots && !showRightDots) {
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    if (showLeftDots && showRightDots) {
      return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }

    return [1, 2, 3, '...', totalPages];
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-border ${className}`}
    >
      {/* Page navigation */}
      <nav className="flex items-center gap-1" aria-label="Pagination navigation">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0 border-[#5B5B5B] border-solid bg-transparent"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {getPageNumbers().map((page, index) =>
          page === '...' ? (
            <span
              key={`dots-${index}`}
              className="w-8 text-center text-sm text-muted-foreground select-none"
              aria-hidden="true"
            >
              …
            </span>
          ) : (
            <Button
              key={page}
              variant="ghost"
              size="sm"
              onClick={() => handlePageChange(page)}
              aria-current={currentPage === page ? 'page' : undefined}
              aria-label={`Go to page ${page}`}
              className={`h-8 min-w-8 px-2.5 text-sm transition-colors ${
                currentPage === page
                  ? 'bg-[#5B5B5B] text-white hover:bg-[#5B5B5B]/90'
                  : ''
              }`}
            >
              {page}
            </Button>
          )
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0 border-[#5B5B5B] border-solid bg-transparent"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </nav>

      {/* Entry info and page size selector */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          Showing <span className="font-medium">{startEntry}</span>–
          <span className="font-medium">{endEntry}</span> of{' '}
          <span className="font-medium">{totalEntries}</span> entries
        </span>

        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => onItemsPerPageChange(parseInt(value, 10))}
          
        >
          <SelectTrigger className="h-8 w-[100px] text-sm border-[#5B5B5B]" aria-label="Items per page">
            <SelectValue placeholder="Show" />
          </SelectTrigger>
          <SelectContent className='' align="end">
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                Show {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}