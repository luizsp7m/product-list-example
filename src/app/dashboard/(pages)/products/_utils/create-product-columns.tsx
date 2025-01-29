import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORY_LABELS } from "@/constants/product-categories";
import { Product } from "@/types/product";
import { currencyFormatter } from "@/utils/currency-formatter";
import { dateFormatter } from "@/utils/date-formatter";
import { ColumnDef } from "@tanstack/react-table";
import { Pen, Trash } from "lucide-react";

export function createProductColumns(): ColumnDef<Product>[] {
  return [
    {
      accessorKey: "name",
      header: "Product",
      cell: ({ row: { original: product } }) => (
        <span className="block w-[256px] truncate">{product.name}</span>
      ),
    },

    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row: { original: product } }) =>
        PRODUCT_CATEGORY_LABELS[product.category],
    },

    {
      accessorKey: "PRICE",
      header: () => <div className="text-right">Price</div>,
      cell: ({ row: { original: product } }) => {
        const price = currencyFormatter(product.price);

        return <div className="text-right font-medium">{price}</div>;
      },
    },

    {
      accessorKey: "updatedAt",
      header: "Last update",
      cell: ({ row: { original: transaction } }) => (
        <span className="block w-[128px] truncate">
          {dateFormatter(transaction.updatedAt)}
        </span>
      ),
    },

    {
      id: "actions",
      cell: ({ row: { original: product } }) => {
        return (
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => alert(product.id)}
            >
              <Pen />
            </Button>

            <Button
              size="icon"
              variant="outline"
              onClick={() => alert(product.id)}
            >
              <Trash />
            </Button>
          </div>
        );
      },
    },
  ];
}
