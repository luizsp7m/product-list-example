import { PRODUCT_CATEGORIES } from "@/constants/product-categories";
import { Prisma } from "@prisma/client";
import { z } from "zod";

const orderByFields = Object.values(Prisma.ProductScalarFieldEnum) as string[];
const orderByDirections = ["asc", "desc"];

export const getProductsSearchParamsSchema = z.object({
  search: z.string().toLowerCase().trim().optional(),
  page: z.coerce.number().int().min(1),
  perPage: z.coerce.number().int().min(1),
  category: z.nativeEnum(PRODUCT_CATEGORIES).optional(),
  orderBy: z
    .string()
    .trim()
    .refine((value) => {
      if (!value) return true;
      const [field, order] = value.split(":");
      return orderByFields.includes(field) && orderByDirections.includes(order);
    }, `Use 'field:asc' or 'field:desc' with a valid field`)
    .optional(),
});
