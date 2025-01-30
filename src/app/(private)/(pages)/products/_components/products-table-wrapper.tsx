import { getProducts } from "@/actions/get-products";
import { ProductsTable } from "./products-table";
import { TablePagination } from "./table-pagination";

interface ProductsTableWrapperProps {
  searchParams: {
    search: string;
    orderBy: string;
    perPage: number;
    page: number;
    category: string;
  };
}

export async function ProductsTableWrapper({
  searchParams,
}: ProductsTableWrapperProps) {
  const productsResponse = await getProducts({
    orderBy: searchParams.orderBy,
    page: searchParams.page,
    perPage: searchParams.perPage,
    search: searchParams.search,
    category: searchParams.category,
  });

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-muted-foreground">
        Products found: {productsResponse.total ?? 0}
      </span>

      <ProductsTable products={productsResponse.data} />

      <TablePagination
        currentPage={productsResponse.page}
        numberPages={productsResponse.numberPages}
      />
    </div>
  );
}
