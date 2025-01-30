import { Fragment, Suspense } from "react";
import { ProductsHeader } from "./_components/products-header";
import { ProductsTableWrapper } from "./_components/products-table-wrapper";
import { Toolbar } from "./_components/toolbar";
import { Loading } from "@/components/shared-components/loading";

export default async function ProductsPage(props: {
  searchParams?: Promise<{
    search?: string;
    orderBy?: string;
    page?: string;
    perPage?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const search = searchParams?.search || "";
  const orderBy = searchParams?.orderBy || "updatedAt:desc";
  const page = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.perPage) || 10;

  return (
    <Fragment>
      <ProductsHeader />
      <Toolbar />

      <Suspense fallback={<Loading />}>
        <ProductsTableWrapper
          searchParams={{
            search,
            orderBy,
            page,
            perPage,
          }}
        />
      </Suspense>
    </Fragment>
  );
}
