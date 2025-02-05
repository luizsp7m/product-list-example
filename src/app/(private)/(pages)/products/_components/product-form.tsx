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

import { PRODUCT_CATEGORY_OPTIONS } from "@/constants/product-categories";

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
import { Product } from "@/types/product";
import { Fragment, useState } from "react";
import { uploadImage } from "@/services/upload-image";
import { productFormSchema } from "../_schemas/product-form-schema";
import { useToast } from "@/hooks/use-toast";
import { upsertProduct } from "@/actions/upsert-product";

export type ProductFormData = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  product?: Product;
}

export function ProductForm({ product }: ProductFormProps) {
  const { toast } = useToast();

  const [imagePreview, setImagePreview] = useState<string | null>(
    product?.imageUrl || null,
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
    if (!imagePreview && !imageFile) {
      form.setError("imageFile", { message: "Required" });
      return;
    }

    let imageUrl = product?.imageUrl || "";

    if (imageFile) {
      try {
        imageUrl = await uploadImage(imageFile);
      } catch (error) {
        console.error("Error uploading image:", error);

        form.setError("imageFile", {
          message: "Failed to upload image. Try again.",
        });

        return;
      }
    }

    try {
      await upsertProduct({
        id: product?.id,
        name: data.name,
        category: data.category,
        description: data.description,
        imageUrl,
        price: data.price,
      });

      toast({
        description: product
          ? "Product updated successfully!"
          : "Product created successfully!",
      });
    } catch (error) {
      console.log(error);

      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "There was a problem with your request.",
      });
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
    <Fragment>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-[768px] space-y-3"
        >
          <h5 className="inline-block text-muted-foreground">
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

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                    onValueChange={({ floatValue }) =>
                      field.onChange(floatValue)
                    }
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
                        onClick={removeImage}
                        type="button"
                      >
                        Remove
                      </Button>
                    </div>
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

          <div className="flex justify-end gap-2">
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
    </Fragment>
  );
}
