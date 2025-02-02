import { productDataSchema } from "@/app/api/products/_schemas/product-data-schema";
import { api } from "@/lib/api";
import { z } from "zod";

export type UpsertProductData = z.infer<typeof productDataSchema>;

export async function upsertProduct(productData: UpsertProductData) {
  await api.post(`/products`, productData);
}
