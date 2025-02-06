"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number | undefined;
  pathname?: string;
}

export function PaginationComponent({
  currentPage,
  totalPages,
  pathname,
}: PaginationControlsProps) {
  const router = useRouter();

  if (!totalPages) return;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Show a window of 5 pages
  const getVisiblePages = () => {
    let start = Math.max(currentPage - 2, 1);
    const end = Math.min(start + 4, totalPages);

    // Adjust start if we're near the end
    if (end === totalPages) {
      start = Math.max(end - 4, 1);
    }

    return pages.slice(start - 1, end);
  };

  const handlePageChange = (currentPage: number) => {
    router.replace(`${pathname}?page=${currentPage}`);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getVisiblePages().map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          className={cn(
            "min-w-[40px]",
            currentPage === page && "pointer-events-none"
          )}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
