import { getProductById } from "@/actions/get-product-by-id";
import { ProductForm } from "../../../_components/product-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update",
};

export default async function UpdateProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);

  return <ProductForm product={product} />;
}
