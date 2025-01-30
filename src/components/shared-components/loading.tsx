import { Loader2 } from "lucide-react";

export function Loading() {
  return (
    <div className="flex items-center gap-2 justify-center p-6">
      <Loader2 className="animate-spin" />
      <span className="text-muted-foreground text-sm">Loading...</span>
    </div>
  );
}
