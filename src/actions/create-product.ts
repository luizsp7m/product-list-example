"use server";

import { ProductFormData } from "@/app/dashboard/(pages)/products/_components/product-form";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(product: ProductFormData) {
  try {
    await db.product.create({
      data: {
        ...product,
        image: "",
      },
    });

    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
  } catch (error) {
    throw error;
  }
}
