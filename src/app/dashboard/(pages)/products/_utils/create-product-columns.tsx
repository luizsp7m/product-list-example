import Link from "next/link";
import Image from "next/image";

import { Button, buttonVariants } from "@/components/ui/button";
import { PRODUCT_CATEGORY_LABELS } from "@/constants/product-categories";
import { Product } from "@/types/product";
import { currencyFormatter } from "@/utils/currency-formatter";
import { dateFormatter } from "@/utils/date-formatter";
import { ColumnDef } from "@tanstack/react-table";
import { Pen, Trash } from "lucide-react";

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
          {/* <Image
            src={
              "https://i.imgur.com/3kCFN9v_d.webp?maxwidth=760&fidelity=grand"
            }
            alt="Product Image"
            width={320}
            height={320}
            style={{ width: 48, height: 48 }}
            className="rounded object-fill"
          /> */}

          <div className="h-[48px] w-[48px] rounded bg-secondary" />

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
              href={`/dashboard/products/update/${product.id}`}
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
