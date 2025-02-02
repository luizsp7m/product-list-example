import { getProducts } from "@/services/get-products";
import { useSearchParamsValues } from "./use-search-params-values";
import { useQuery } from "@tanstack/react-query";

export function useGetProducts() {
  const { search, category, orderBy, perPage, page } = useSearchParamsValues();

  const {
    data: productsResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", { search, category, orderBy, perPage, page }],
    queryFn: () =>
      getProducts({
        search,
        category,
        orderBy,
        perPage: perPage as unknown as number,
        page: page as unknown as number,
      }),
  });

  return {
    productsResponse,
    isLoading,
    error,
  };
}
