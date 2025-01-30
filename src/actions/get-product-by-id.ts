"use server";

import { db } from "@/lib/db";
import { productFormatter } from "@/utils/product-formatter";

export async function getProductById(productId: string) {
  try {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return productFormatter(product);
  } catch (error) {
    throw error;
  }
}
