"use client";

import Link from "next/link";
import Image from "next/image";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  PRODUCT_CATEGORIES,
  PRODUCT_CATEGORY_OPTIONS,
} from "@/constants/product-categories";

import { Textarea } from "@/components/ui/textarea";
import { MoneyInput } from "@/components/shared-components/money-input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Loader2 } from "lucide-react";
import { upsertProduct } from "@/actions/upsert-product";
import { Product } from "@/types/product";
import { useState } from "react";
import { uploadImage } from "@/services/upload-image";

const productFormSchema = z.object({
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
            "The file must be a maximum of 2MB"
          )
          .refine(
            (files) =>
              !files ||
              files.length === 0 ||
              ["image/png", "image/jpeg", "image/jpg"].includes(files[0]?.type),
            "Only PNG, JPG and JPEG files are allowed"
          )
      : z.any(),
});

export type ProductFormData = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  product?: Product;
}

export function ProductForm({ product }: ProductFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    product?.imageUrl || null
  );

  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: product
      ? {
          name: product.name,
          category: product.category,
          price: product.price,
          description: product.description,
        }
      : {
          name: "",
          description: "",
        },
  });

  async function onSubmit(data: ProductFormData) {
    let imageUrl = product?.imageUrl || "";

    try {
      if (imageFile) {
        const imageUploadedUrl = await uploadImage(imageFile);
        imageUrl = imageUploadedUrl;
      }

      await upsertProduct({
        id: product?.id,
        name: data.name,
        category: data.category,
        description: data.description,
        imageUrl,
        price: data.price,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setImageFile(selectedFile);
      form.setValue("imageFile", event.target.files!, { shouldValidate: true });

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);

    form.setValue("imageFile", new DataTransfer().files, {
      shouldValidate: true,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 max-w-[768px] mx-auto"
      >
        <h5 className="text-muted-foreground">
          {product ? "Update product" : "Create product"}
        </h5>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>

              <FormControl>
                <Input placeholder="Product name" {...field} />
              </FormControl>

              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product category" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {PRODUCT_CATEGORY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>

              <FormControl>
                <MoneyInput
                  placeholder="$ 0,00"
                  value={field.value}
                  onBlur={field.onBlur}
                  disabled={field.disabled}
                  onValueChange={({ floatValue }) => field.onChange(floatValue)}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageFile"
          render={() => (
            <FormItem>
              <FormLabel>Image</FormLabel>

              {imagePreview ? (
                <div className="relative w-full h-40 overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt={"Product image"}
                    fill
                    sizes="100%"
                    className="rounded-lg"
                    style={{
                      objectFit: "cover",
                    }}
                  />

                  <Button
                    variant="destructive"
                    className="absolute top-1 right-1 text-xs"
                    onClick={removeImage}
                    type="button"
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </FormControl>
              )}

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>

              <FormControl>
                <Textarea
                  placeholder="Product description"
                  style={{ resize: "none" }}
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">
          <Link
            href={"/products"}
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader2 className="animate-spin" />
            )}

            {product ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
