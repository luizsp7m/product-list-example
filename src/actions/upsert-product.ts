"use server";

import { PRODUCT_CATEGORIES } from "@/constants/product-categories";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type ProductFormData = {
  id?: string;
  name: string;
  category: (typeof PRODUCT_CATEGORIES)[keyof typeof PRODUCT_CATEGORIES];
  price: number;
  description: string;
  imageUrl: string;
};

export async function upsertProduct(product: ProductFormData) {
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
  } catch (error) {
    throw error;
  }

  revalidatePath("/products");
  redirect("/products");
}
