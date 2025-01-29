"use client";

import Link from "next/link";

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

const productFormSchema = z.object({
  name: z.string().trim().min(3).max(50),
  category: z.nativeEnum(PRODUCT_CATEGORIES),
  price: z.number().positive(),
  description: z.string().trim().min(3).max(250),
});

type ProductFormData = z.infer<typeof productFormSchema>;

export function ProductForm() {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(values: ProductFormData) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 max-w-[768px] mx-auto"
      >
        <h5 className="text-muted-foreground">Create product</h5>

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
            href={"/dashboard/products"}
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>

          <Button type="submit">Create</Button>
        </div>
      </form>
    </Form>
  );
}
