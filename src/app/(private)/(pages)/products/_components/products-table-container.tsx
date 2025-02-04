import { getProducts } from "@/actions/get-products";
import { ProductsTable } from "./products-table";
import { TablePagination } from "./table-pagination";

interface ProductsTableContainerProps {
  searchParams: {
    search?: string;
    category?: string;
    page?: string;
    perPage?: string;
    orderBy?: string;
  };
}

export async function ProductsTableContainer({
  searchParams,
}: ProductsTableContainerProps) {
  const productsResponse = await getProducts({ ...searchParams });

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-muted-foreground">
        Products found: {productsResponse.total}
      </span>

      <ProductsTable products={productsResponse.data} />

      <TablePagination
        currentPage={productsResponse.page}
        numberPages={productsResponse.numberPages}
      />
    </div>
  );
}
