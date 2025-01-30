"use client";

import { Button } from "@/components/ui/button";
import { useUpdateSearchParams } from "../_hooks/use-update-search-params";

interface TablePaginationProps {
  currentPage: number;
  numberPages: number;
}

export function TablePagination({
  currentPage,
  numberPages,
}: TablePaginationProps) {
  const { handleChangePage } = useUpdateSearchParams();

  return (
    <div className="flex justify-end gap-2">
      {Array.from({ length: numberPages }).map((_, index) => (
        <Button
          key={index}
          variant="outline"
          className={`${
            currentPage === index + 1 && "bg-accent"
          } h-[40px] w-[40px]`}
          onClick={() => handleChangePage(index + 1)}
        >
          {index + 1}
        </Button>
      ))}
    </div>
  );
}
