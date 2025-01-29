import { getProducts } from "@/actions/get-products";
import { Fragment } from "react";
import { ProductsTable } from "./products-table";

export async function ProductsTableWrapper() {
  const productsResponse = await getProducts();

  return (
    <Fragment>
      <ProductsTable products={productsResponse.data} />
    </Fragment>
  );
}
