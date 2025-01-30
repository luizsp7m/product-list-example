"use client";

import { DataTable } from "@/components/ui/data-table";
import { Product } from "@/types/product";
import { createProductColumns } from "../_utils/create-product-columns";
import { Fragment, useState } from "react";
import { DeleteProductAlert } from "./delete-product-alert";

interface ProductsTableProps {
  products: Product[];
}

export function ProductsTable({ products }: ProductsTableProps) {
  const [deleteProductAlertIsOpen, setDeleteProductAlertIsOpen] =
    useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function handleOpenDeleteProductAlert(product: Product) {
    setSelectedProduct(product);
    setDeleteProductAlertIsOpen(true);
  }

  function handleCloseDeleteProductAlert() {
    setDeleteProductAlertIsOpen(false);
    setSelectedProduct(null);
  }

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
