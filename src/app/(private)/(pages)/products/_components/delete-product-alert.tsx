import { Loader2 } from "lucide-react";

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
import { useToast } from "@/hooks/use-toast";
import { useFormStatus } from "react-dom";
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
  const { toast } = useToast();

  async function handleDeleteProduct() {
    if (!selectedProduct) return;

    try {
      await deleteProduct(selectedProduct.id);

      handleCloseDeleteProductAlert();

      toast({
        description: "Product deleted successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "There was a problem with your request.",
      });
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
          <AlertDialogCancel type="button">Cancel</AlertDialogCancel>

          <form action={handleDeleteProduct}>
            <SubmitButton />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending && <Loader2 className="animate-spin" />}
      Continue
    </Button>
  );
}
