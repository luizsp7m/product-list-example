"use client";

import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PRODUCT_CATEGORY_OPTIONS } from "@/constants/product-categories";
import { CurrencyInput } from "./money-input";
import { Textarea } from "@/components/ui/textarea";
import { useFormState, useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { FieldErrorMessage } from "./field-error-message";
import { ImageUploadInput } from "./image-upload-input";
import { Product } from "@/types/product";
import { Fragment } from "react";
import { upsertProduct, UpsertProductState } from "@/actions/upsert-product-02";

interface ProductFormProps {
  product?: Product;
}

export function ProductForm({ product }: ProductFormProps) {
  const initialState: UpsertProductState = { message: null, errors: {} };

  const [state, formAction] = useFormState(upsertProduct, initialState);

  return (
    <form action={formAction} className="mx-auto max-w-[768px] space-y-3">
      {product && (
        <Fragment>
          <Input name="id" value={product?.id} type="hidden" />
          <Input name="imageUrl" value={product?.imageUrl} type="hidden" />
        </Fragment>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>

        <Input
          type="text"
          name="name"
          defaultValue={product?.name}
          placeholder="Product name"
          required
        />

        <p className="text-[0.8rem] text-muted-foreground">
          This is your public display name.
        </p>

        {state.errors?.name &&
          state.errors?.name.map((error) => (
            <FieldErrorMessage key={error} message={error} />
          ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>

        <Select name="category" defaultValue={product?.category} required>
          <SelectTrigger>
            <SelectValue placeholder="Select product category" />
          </SelectTrigger>

          <SelectContent>
            {PRODUCT_CATEGORY_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {state.errors?.category &&
          state.errors?.category.map((error) => (
            <FieldErrorMessage key={error} message={error} />
          ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <CurrencyInput name="price" defaultValue={product?.price} required />

        {state.errors?.price &&
          state.errors?.price.map((error) => (
            <FieldErrorMessage key={error} message={error} />
          ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageFile">Image</Label>

        <ImageUploadInput
          imageUrl={product?.imageUrl}
          name="imageFile"
          required={product ? false : true}
        />

        {state.errors?.imageFile &&
          state.errors?.imageFile.map((error) => (
            <FieldErrorMessage key={error} message={error} />
          ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>

        <Textarea
          name="description"
          defaultValue={product?.description}
          required
          rows={5}
          style={{ resize: "none" }}
        />

        {state.errors?.description &&
          state.errors?.description.map((error) => (
            <FieldErrorMessage key={error} message={error} />
          ))}
      </div>

      <FormFooter text={product ? "Update" : "Create"} />
    </form>
  );
}

function FormFooter({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-end gap-2">
      <Link
        href={"/products"}
        className={buttonVariants({ variant: "outline" })}
      >
        Cancel
      </Link>

      <Button type="submit" disabled={pending}>
        {pending && <Loader2 className="animate-spin" />}
        {text}
      </Button>
    </div>
  );
}
