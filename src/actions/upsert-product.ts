"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { upsertProductSchema } from "./_schemas/upsert-product-schema";

type UpsertProductFormData = z.infer<typeof upsertProductSchema>;

interface UpsertProductResponseProps {
  success: boolean;
  message: string;
  errors?: {
    [key: string]: string[];
  };
}

export async function upsertProduct(
  upsertFormValues: UpsertProductFormData,
): Promise<UpsertProductResponseProps> {
  const upsertFormValuesValidation =
    upsertProductSchema.safeParse(upsertFormValues);

  if (!upsertFormValuesValidation.success) {
    return {
      success: false,
      message: "Validation error",
      errors: upsertFormValuesValidation.error.flatten().fieldErrors,
    };
  }

  const product = upsertFormValuesValidation.data;

  try {
    await db.product.upsert({
      create: product,
      update: product,
      where: { id: product.id ?? "" },
    });
  } catch (error) {
    return {
      success: false,
      message: "Database error",
    };
  }

  revalidatePath("/products");

  return {
    success: true,
    message: "OK",
  };
}
