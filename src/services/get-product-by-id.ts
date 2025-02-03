import { api } from "@/lib/api";
import { Product } from "@/types/product";

export async function getProductById(productId: string): Promise<Product> {
  const response = await api.get(`/products/${productId}`);
  return response.data;
}
