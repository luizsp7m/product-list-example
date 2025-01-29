"use server";

import { db } from "@/lib/db";
import { ProductFormatter } from "@/utils/product-formatter";

export async function getProducts() {
  try {
    const products = await db.product.findMany();
    return { data: products.map(ProductFormatter) };
  } catch (error) {
    throw error;
  }
}
