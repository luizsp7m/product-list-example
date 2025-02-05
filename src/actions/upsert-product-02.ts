"use server";

import { PRODUCT_CATEGORIES } from "@/constants/product-categories";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type UpsertProductState = {
  message?: string | null;
  errors?: {
    [key: string]: string[];
  };
};

const priceSchema = z
  .string()
  .transform((value) => {
    const sanitizedValue = value.replace(/[^0-9,.-]/g, "");
    const numericValue = parseFloat(sanitizedValue.replace(",", "."));
    return numericValue;
  })
  .refine((value) => value > 0, {
    message: "The value must be a positive number",
  });

const MAX_FILE_SIZE = 2 * 1024 * 1024; // Máx. 2MB

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const imageFileSchema = z
  .custom<File>((file) => file instanceof File, { message: "Required" })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "The file must be a maximum of 2MB",
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Only PNG, JPG, and JPEG files are allowed",
  })
  .optional();

const productDataSchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string().trim().min(3).max(256),
    category: z.nativeEnum(PRODUCT_CATEGORIES),
    price: priceSchema,
    imageFile: imageFileSchema,
    imageUrl: z.string().optional(),
    description: z.string().trim().min(3).max(512),
  })
  .refine((data) => data.imageFile || data.imageUrl, {
    message: "Either an image file must be provided",
    path: ["imageFile"],
  });

function imageFileInputIsEmpty(imageFile: File) {
  return imageFile.size === 0 && imageFile.name === "undefined";
}

export async function upsertProduct(
  prevState: UpsertProductState,
  formData: FormData,
) {
  const imageFileFormData = formData.get("imageFile") as File;

  const validatedFields = productDataSchema.safeParse({
    id: formData.get("id") || undefined,
    name: formData.get("name"),
    category: formData.get("category"),
    price: formData.get("price"),
    imageFile: !imageFileInputIsEmpty(imageFileFormData)
      ? imageFileFormData
      : undefined,
    imageUrl: formData.get("imageUrl") || undefined,
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation error",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    id,
    name,
    category,
    price,
    imageFile,
    imageUrl: prevImageUrl,
    description,
  } = validatedFields.data;

  const imageUrl = prevImageUrl || "";

  if (imageFile) {
    return {
      message: "Image upload failed",
    };
  }

  const productData = {
    name,
    category,
    price,
    imageUrl,
    description,
  };

  try {
    await db.product.upsert({
      create: productData,
      update: productData,
      where: { id: id ?? "" },
    });
  } catch (error) {
    console.log(error);

    return {
      message: "Database error",
    };
  }

  revalidatePath("/products");
  redirect("/products");
}
