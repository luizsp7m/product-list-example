"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteProduct(productId: string) {
  try {
    await db.product.delete({
      where: {
        id: productId,
      },
    });

    revalidatePath("/products");
  } catch (error) {
    throw error;
  }
}
