import { z } from "zod";
import { PRODUCT_CATEGORIES } from "@/constants/product-categories";

export const productFormSchema = z.object({
  name: z.string().trim().min(3).max(256),
  category: z.nativeEnum(PRODUCT_CATEGORIES),
  price: z.number().positive(),
  description: z.string().trim().min(3).max(256),

  imageFile:
    typeof window !== "undefined" && "FileList" in window
      ? z
          .instanceof(FileList)
          .optional()
          .refine(
            (files) =>
              !files || files.length === 0 || files[0]?.size <= 2 * 1024 * 1024, // Máx. 2MB
            "The file must be a maximum of 2MB",
          )
          .refine(
            (files) =>
              !files ||
              files.length === 0 ||
              ["image/png", "image/jpeg", "image/jpg"].includes(files[0]?.type),
            "Only PNG, JPG and JPEG files are allowed",
          )
      : z.any(),
});
