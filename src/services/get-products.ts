import { api } from "@/lib/api";
import { Product } from "@/types/product";

interface GetProductsResponseProps {
  search?: string;
  perPage?: number;
  page?: number;
  category?: string;
  orderBy?: string;
}

interface GetProductsResponse {
  data: Product[];
  page: number;
  perPage: number;
  numberPages: number;
  total: number;
}

export async function getProducts({
  search,
  category,
  orderBy,
  perPage,
  page,
}: GetProductsResponseProps = {}) {
  const response = await api.get<GetProductsResponse>("/products", {
    params: {
      ...(search && { search }),
      ...(category && { category }),
      ...(orderBy && { orderBy }),
      ...(perPage && { perPage }),
      ...(page && { page }),
    },
  });

  return response.data;
}
