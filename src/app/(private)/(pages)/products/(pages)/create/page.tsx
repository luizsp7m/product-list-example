import { Metadata } from "next";
import { ProductForm } from "../../_components/product-form";

export const metadata: Metadata = {
  title: "Create",
};

export default function CrateProductPage() {
  return <ProductForm />;
}
