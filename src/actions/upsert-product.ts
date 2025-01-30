"use server";

import { ProductFormData } from "@/app/dashboard/(pages)/products/_components/product-form";
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
        imageUrl: "",
      },

      update: {
        ...product,
        imageUrl: "",
      },

      where: {
        id: product.id ?? "",
      },
    });

    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
  } catch (error) {
    throw error;
  }
}
