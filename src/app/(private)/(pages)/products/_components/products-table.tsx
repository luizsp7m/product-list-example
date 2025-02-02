"use client";

import { DataTable } from "@/components/ui/data-table";
import { createProductColumns } from "../_utils/create-product-columns";
import { DeleteProductAlert } from "./delete-product-alert";
import { Loading } from "@/components/shared-components/loading";
import { TablePagination } from "./table-pagination";
import { useGetProducts } from "../_hooks/use-get-products";
import { useDeleteProductAlert } from "../_hooks/use-selected-product";

export function ProductsTable() {
  const {
    deleteProductAlertIsOpen,
    selectedProduct,
    handleOpenDeleteProductAlert,
    handleCloseDeleteProductAlert,
  } = useDeleteProductAlert();

  const { productsResponse, isLoading, error } = useGetProducts();

  const columns = createProductColumns({ handleOpenDeleteProductAlert });

  if (isLoading) return <Loading />;

  if (error) {
    return <span>Something went wrong!</span>;
  }

  if (!productsResponse) return null;

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-muted-foreground">
        Products found: {productsResponse.total ?? 0}
      </span>

      <DataTable data={productsResponse.data} columns={columns} />

      <TablePagination
        currentPage={productsResponse.page}
        numberPages={productsResponse.numberPages}
      />

      <DeleteProductAlert
        isOpen={deleteProductAlertIsOpen}
        selectedProduct={selectedProduct}
        handleCloseDeleteProductAlert={handleCloseDeleteProductAlert}
      />
    </div>
  );
}
