import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { PRODUCT_CATEGORY_LABELS } from "@/constants/product-categories";
import { Product } from "@/types/product";
import { currencyFormatter } from "@/utils/currency-formatter";
import { dateFormatter } from "@/utils/date-formatter";
import { ColumnDef } from "@tanstack/react-table";
import { Pen, Trash } from "lucide-react";
import Image from "next/image";

interface CreateProductColumnsProps {
  handleOpenDeleteProductAlert: (product: Product) => void;
}

export function createProductColumns({
  handleOpenDeleteProductAlert,
}: CreateProductColumnsProps): ColumnDef<Product>[] {
  return [
    {
      accessorKey: "name",
      header: "Product",
      cell: ({ row: { original: product } }) => (
        <div className="flex gap-2 items-center">
          <div className="relative flex justify-center items-center w-[48px] h-[48px] bg-secondary overflow-hidden rounded">
            <Image
              src={product.imageUrl}
              alt={`${product.name} image`}
              fill
              sizes="100%"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </div>

          <span className="block w-[256px] truncate">{product.name}</span>
        </div>
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
            <Link
              href={`/products/update/${product.id}`}
              className={buttonVariants({
                size: "icon",
                variant: "outline",
              })}
            >
              <Pen />
            </Link>

            <Button
              size="icon"
              variant="outline"
              onClick={() => handleOpenDeleteProductAlert(product)}
            >
              <Trash />
            </Button>
          </div>
        );
      },
    },
  ];
}
