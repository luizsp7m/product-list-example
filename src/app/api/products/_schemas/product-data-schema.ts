import { PRODUCT_CATEGORIES } from "@/constants/product-categories";
import { z } from "zod";

export const productDataSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(3).max(256),
  category: z.nativeEnum(PRODUCT_CATEGORIES),
  price: z.number().positive(),
  description: z.string().trim().min(3).max(256),
  imageUrl: z.string().trim().min(1).max(256),
});
