import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { useState } from "react";

interface ImageUploadInputProps extends InputProps {
  imageUrl?: string;
}

export function ImageUploadInput({
  imageUrl,
  ...props
}: ImageUploadInputProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    imageUrl || "",
  );

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  }

  function handleRemoveImage() {
    setImagePreview(null);
  }

  return (
    <div className="space-y-2">
      {imagePreview && (
        <div
          className="relative flex h-44 w-full items-center justify-center overflow-hidden rounded-md bg-secondary bg-cover bg-center"
          style={{
            backgroundImage: `url(${imagePreview})`,
          }}
        >
          <div className="absolute inset-0 rounded-md bg-black/30 backdrop-blur-md" />

          <div className="relative z-10 h-44 w-full overflow-hidden">
            <Image
              src={imagePreview}
              alt={"Product image"}
              fill
              sizes="100%"
              className="rounded-md"
              style={{
                objectFit: "contain",
              }}
            />

            <Button
              variant="destructive"
              className="absolute right-2 top-2 text-xs"
              onClick={handleRemoveImage}
              type="button"
            >
              Remove
            </Button>
          </div>
        </div>
      )}

      <Input
        className={`${imagePreview ? "hidden" : "block"}`}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        {...props}
      />
    </div>
  );
}
