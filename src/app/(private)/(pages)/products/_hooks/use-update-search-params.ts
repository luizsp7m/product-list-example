import { PRODUCT_SEARCH_PARAMS } from "@/constants/product-search-params";
import { useSearchParamsValues } from "./use-search-params-values";
import { useRouter } from "next/navigation";

export function useUpdateSearchParams() {
  const router = useRouter();

  const { search, page, orderBy, perPage, category } = useSearchParamsValues();

  function updateParams(overrides: Partial<Record<string, string | number>>) {
    const params = new URLSearchParams();

    if (search) params.set(PRODUCT_SEARCH_PARAMS.SEARCH, String(search));
    if (orderBy) params.set(PRODUCT_SEARCH_PARAMS.ORDER_BY, String(orderBy));
    if (perPage) params.set(PRODUCT_SEARCH_PARAMS.PER_PAGE, String(perPage));
    if (page) params.set(PRODUCT_SEARCH_PARAMS.PAGE, String(page));
    if (category) params.set(PRODUCT_SEARCH_PARAMS.CATEGORY, String(category));

    Object.entries(overrides).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    return params;
  }

  function pushParams(params: URLSearchParams) {
    router.replace(`?${params.toString()}`);
  }

  const handleResetParams = () => {
    const params = new URLSearchParams();
    pushParams(params);
  };

  const handleSearch = (newSearch?: string) => {
    const params = updateParams({
      [PRODUCT_SEARCH_PARAMS.SEARCH]: newSearch,
      [PRODUCT_SEARCH_PARAMS.PAGE]: 1,
    });

    pushParams(params);
  };

  const handleChangeOrderBy = (newOrderBy: string) => {
    const params = updateParams({
      [PRODUCT_SEARCH_PARAMS.ORDER_BY]: newOrderBy,
    });

    pushParams(params);
  };

  const handleChangePerPage = (newPerPage: number) => {
    const params = updateParams({
      [PRODUCT_SEARCH_PARAMS.PER_PAGE]: newPerPage,
      [PRODUCT_SEARCH_PARAMS.PAGE]: 1,
    });

    pushParams(params);
  };

  const handleChangePage = (newPage: number) => {
    const params = updateParams({
      [PRODUCT_SEARCH_PARAMS.PAGE]: newPage,
    });

    pushParams(params);
  };

  const handleChangeCategory = (newCategory: string) => {
    const params = updateParams({
      [PRODUCT_SEARCH_PARAMS.CATEGORY]: newCategory,
      [PRODUCT_SEARCH_PARAMS.PAGE]: 1,
    });

    pushParams(params);
  };

  return {
    handleSearch,
    handleChangeOrderBy,
    handleChangePerPage,
    handleChangePage,
    handleChangeCategory,
    handleResetParams,
  };
}
