export async function uploadImage(imageFile: File): Promise<string> {
  try {
    const formData = new FormData();

    formData.append("image", imageFile);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    return data.data.url;
  } catch (error) {
    console.log(error);
    throw new Error("Image upload failure");
  }
}
