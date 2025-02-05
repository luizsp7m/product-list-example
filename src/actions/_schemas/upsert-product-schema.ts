import { z } from "zod";
import { PRODUCT_CATEGORIES } from "@/constants/product-categories";

export const upsertProductSchema = z.object({
  id: z.string().trim().uuid().optional(),
  name: z.string().trim().min(3).max(256),
  category: z.nativeEnum(PRODUCT_CATEGORIES),
  price: z.number().positive(),
  imageUrl: z.string().trim().min(3),
  description: z.string().trim().min(3).max(512),
});
