import { PRODUCT_SEARCH_PARAMS } from "@/constants/product-search-params";
import { useSearchParams } from "next/navigation";

export function useSearchParamsValues() {
  const searchParams = useSearchParams();

  const search = searchParams.get(PRODUCT_SEARCH_PARAMS.SEARCH) || "";
  const page = searchParams.get(PRODUCT_SEARCH_PARAMS.PAGE) || "";
  const orderBy = searchParams.get(PRODUCT_SEARCH_PARAMS.ORDER_BY) || "";
  const perPage = searchParams.get(PRODUCT_SEARCH_PARAMS.PER_PAGE) || "";
  const category = searchParams.get(PRODUCT_SEARCH_PARAMS.CATEGORY) || "";

  return {
    search,
    page,
    orderBy,
    perPage,
    category,
  };
}
