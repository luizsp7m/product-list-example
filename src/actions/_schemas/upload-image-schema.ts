import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // Máx. 2MB

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const uploadImageSchema = z
  .custom<File>((file) => file instanceof File, { message: "Required" })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "The file must be a maximum of 2MB",
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Only PNG, JPG, and JPEG files are allowed",
  });
