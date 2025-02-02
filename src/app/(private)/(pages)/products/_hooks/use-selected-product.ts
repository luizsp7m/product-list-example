import { Product } from "@/types/product";
import { useState } from "react";

export function useDeleteProductAlert() {
  const [deleteProductAlertIsOpen, setDeleteProductAlertIsOpen] =
    useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function handleOpenDeleteProductAlert(product: Product) {
    setSelectedProduct(product);
    setDeleteProductAlertIsOpen(true);
  }

  function handleCloseDeleteProductAlert() {
    setDeleteProductAlertIsOpen(false);
    setSelectedProduct(null);
  }

  return {
    deleteProductAlertIsOpen,
    selectedProduct,
    handleOpenDeleteProductAlert,
    handleCloseDeleteProductAlert,
  };
}
