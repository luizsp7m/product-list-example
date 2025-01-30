"use server";

import { db } from "@/lib/db";
import { productFormatter } from "@/utils/product-formatter";

export async function getProducts() {
  try {
    const products = await db.product.findMany();
    return { data: products.map(productFormatter) };
  } catch (error) {
    throw error;
  }
}
