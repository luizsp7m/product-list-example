"use server";

import { ProductFormData } from "@/app/(private)/(pages)/products/_components/product-form";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function upsertProduct(
  product: ProductFormData & { id?: string }
) {
  try {
    await db.product.upsert({
      create: {
        ...product,
      },

      update: {
        ...product,
      },

      where: {
        id: product.id ?? "",
      },
    });

    revalidatePath("/products");
    redirect("/products");
  } catch (error) {
    throw error;
  }
}
