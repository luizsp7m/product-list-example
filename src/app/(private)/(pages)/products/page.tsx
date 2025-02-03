import { Fragment, Suspense } from "react";
import { ProductsHeader } from "./_components/products-header";
import { Toolbar } from "./_components/toolbar";
import { ProductsTable } from "./_components/products-table";

export default function ProductsPage() {
  return (
    <Fragment>
      <ProductsHeader />

      <Suspense>
        <Toolbar />
      </Suspense>

      <Suspense>
        <ProductsTable />
      </Suspense>
    </Fragment>
  );
}
