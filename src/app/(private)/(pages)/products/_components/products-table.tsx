"use client";

import { DataTable } from "@/components/ui/data-table";
import { createProductColumns } from "../_utils/create-product-columns";
import { DeleteProductAlert } from "./delete-product-alert";
import { useDeleteProductAlert } from "../_hooks/use-selected-product";
import { Product } from "@/types/product";
import { Fragment } from "react";

interface ProductsTableProps {
  products: Product[];
}

export function ProductsTable({ products }: ProductsTableProps) {
  const {
    deleteProductAlertIsOpen,
    selectedProduct,
    handleOpenDeleteProductAlert,
    handleCloseDeleteProductAlert,
  } = useDeleteProductAlert();

  const columns = createProductColumns({ handleOpenDeleteProductAlert });

  return (
    <Fragment>
      <DataTable data={products} columns={columns} />

      <DeleteProductAlert
        isOpen={deleteProductAlertIsOpen}
        selectedProduct={selectedProduct}
        handleCloseDeleteProductAlert={handleCloseDeleteProductAlert}
      />
    </Fragment>
  );
}
