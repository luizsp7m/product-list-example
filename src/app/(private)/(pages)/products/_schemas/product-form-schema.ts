import { z } from "zod";
import { PRODUCT_CATEGORIES } from "@/constants/product-categories";

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

export const productFormSchema = z.object({
  id: z.string().trim().uuid().optional(),
  name: z.string().trim().min(3).max(256),
  category: z.nativeEnum(PRODUCT_CATEGORIES),
  price: z.number().positive(),
  imageFile: imageFileSchema,
  imageUrl: z.string().optional(),
  description: z.string().trim().min(3).max(512),
});
