import { Loader2 } from "lucide-react";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { deleteProduct } from "@/actions/delete-product";

interface DeleteProductAlertProps {
  isOpen: boolean;
  selectedProduct: Product | null;
  handleCloseDeleteProductAlert: () => void;
}

export function DeleteProductAlert({
  isOpen,
  selectedProduct,
  handleCloseDeleteProductAlert,
}: DeleteProductAlertProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDeleteProduct() {
    if (!selectedProduct) return;

    try {
      setIsDeleting(true);
      await deleteProduct(selectedProduct.id);
      handleCloseDeleteProductAlert();
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleCloseDeleteProductAlert();
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <Button onClick={handleDeleteProduct} disabled={isDeleting}>
            {isDeleting && <Loader2 className="animate-spin" />}
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
