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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "@/services/delete-product";
import { useToast } from "@/hooks/use-toast";

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
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: () => {
      handleCloseDeleteProductAlert();
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        description: "Product deleted successfully!",
      });
    },

    onError: () => {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "There was a problem with your request.",
      });
    },
  });

  function handleDeleteProduct() {
    if (!selectedProduct) return;
    mutation.mutate(selectedProduct.id);
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

          <Button onClick={handleDeleteProduct} disabled={mutation.isPending}>
            {mutation.isPending && <Loader2 className="animate-spin" />}
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
