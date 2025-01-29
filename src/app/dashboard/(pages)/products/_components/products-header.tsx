import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function ProductsHeader() {
  return (
    <div className="flex items-center justify-between">
      <h5 className="text-sm">Products</h5>

      <Link
        href={"/dashboard/products/create"}
        className={buttonVariants({ variant: "default" })}
      >
        <Plus />
        Product
      </Link>
    </div>
  );
}
