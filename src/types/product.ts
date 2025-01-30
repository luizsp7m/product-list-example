import { PRODUCT_CATEGORIES } from "@/constants/product-categories";

export type Product = {
  id: string;
  name: string;
  category: (typeof PRODUCT_CATEGORIES)[keyof typeof PRODUCT_CATEGORIES];
  price: number;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};
