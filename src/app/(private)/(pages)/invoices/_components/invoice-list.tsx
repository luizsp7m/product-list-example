"use client";

import { Loading } from "@/components/shared-components/loading";
import { getProducts } from "@/services/get-products";
import { useQuery } from "@tanstack/react-query";
import { useSearchParamsValues } from "../../products/_hooks/use-search-params-values";

export function InvoiceList() {
  const { search, category, orderBy, perPage, page } = useSearchParamsValues();

  const {
    data: productsResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts({ search, category, orderBy, perPage, page }),
    retry: false,
  });

  if (isLoading) return <Loading />;

  if (error) {
    return <span>Error</span>;
  }

  return (
    <ul>
      {productsResponse?.data.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
