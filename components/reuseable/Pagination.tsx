export default function TablePagination({ page, total, onPageChange }: { page: number; total: number; onPageChange: (page: number) => void }) {
    return (
      <div className="flex justify-between items-center mt-4 text-sm text-neutral-400">
        <span>Page {page} of {total}</span>
  
        <div className="flex gap-2">
          <button onClick={() => onPageChange(page - 1)}>Prev</button>
          <button onClick={() => onPageChange(page + 1)}>Next</button>
        </div>
      </div>
    );
  }