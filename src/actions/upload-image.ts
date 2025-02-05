"use server";

import { uploadImageSchema } from "./_schemas/upload-image-schema";

export async function uploadImage(formData: FormData): Promise<string> {
  const uploadImageValidation = uploadImageSchema.safeParse(
    formData.get("imageFile"),
  );

  if (!uploadImageValidation.success) {
    throw new Error("Image validation error");
  }

  const rawFormData = new FormData();

  rawFormData.append("image", uploadImageValidation.data);

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_KEY}`,
      {
        method: "POST",
        body: rawFormData,
      },
    );

    return (await response.json()).data.url;
  } catch (error) {
    throw new Error("Image upload failure");
  }
}
