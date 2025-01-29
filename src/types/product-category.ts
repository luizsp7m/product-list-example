import { PRODUCT_CATEGORY } from "@/constants/product-categories";

export type ProductCategory =
  (typeof PRODUCT_CATEGORY)[keyof typeof PRODUCT_CATEGORY];
