import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  maxVisiblePages = 5,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  // Calculate visible page numbers
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <div className="flex flex-col items-center justify-center mt-8 space-y-4">
      {/* Page info */}
      <div className="text-sm text-gray-600">
        Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
        results
      </div>

      {/* Pagination buttons */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          First
        </Button>

        <Button
          variant="outline"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        {startPage > 1 && (
          <>
            <Button variant="outline" onClick={() => onPageChange(1)}>
              1
            </Button>
            {startPage > 2 && <span className="px-2">...</span>}
          </>
        )}

        {pageNumbers.map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2">...</span>}
            <Button
              variant="outline"
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </Button>
          </>
        )}

        <Button
          variant="outline"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>

        <Button
          variant="outline"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
