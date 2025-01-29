import { Fragment } from "react";
import { ProductsHeader } from "./_components/products-header";
import { ProductsTableWrapper } from "./_components/products-table-wrapper";

export default async function ProductsPage() {
  return (
    <Fragment>
      <ProductsHeader />
      <ProductsTableWrapper />
    </Fragment>
  );
}
