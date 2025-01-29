"use client";

import { DataTable } from "@/components/ui/data-table";
import { Product } from "@/types/product";
import { createProductColumns } from "../_utils/create-product-columns";

interface ProductsTableProps {
  products: Product[];
}

export function ProductsTable({ products }: ProductsTableProps) {
  const columns = createProductColumns();

  return <DataTable data={products} columns={columns} />;
}
