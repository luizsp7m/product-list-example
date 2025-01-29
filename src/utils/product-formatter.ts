import { Product } from "@/types/product";
import { Product as ProductPrisma } from "@prisma/client";

export function ProductFormatter(product: ProductPrisma): Product {
  return {
    ...product,
    price: parseFloat(product.price as unknown as string),
    createdAt: product.createdAt as unknown as string,
    updatedAt: product.updatedAt as unknown as string,
  };
}
