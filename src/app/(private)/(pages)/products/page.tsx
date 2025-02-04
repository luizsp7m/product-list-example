import { Fragment, Suspense } from "react";
import { ProductsHeader } from "./_components/products-header";
import { Toolbar } from "./_components/toolbar";
import { ProductsTableContainer } from "./_components/products-table-container";
import { Loading } from "@/components/shared-components/loading";

export default function ProductsPage({
  searchParams,
}: {
  searchParams: {
    search?: string;
    category?: string;
    page?: string;
    perPage?: string;
    orderBy?: string;
  };
}) {
  return (
    <Fragment>
      <ProductsHeader />
      <Toolbar />

      <Suspense key={JSON.stringify(searchParams)} fallback={<Loading />}>
        <ProductsTableContainer searchParams={searchParams} />
      </Suspense>
    </Fragment>
  );
}
