import { Metadata } from "next";
import { ProductForm } from "../../_components/product-form-sc";

export const metadata: Metadata = {
  title: "Create",
};

export default function CrateProductPage() {
  return <ProductForm />;
}
