"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteProduct(productId: string) {
  try {
    const session = await auth();

    if (!session) {
      throw new Error("Unauthenticated");
    }

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
