import { LogoutButton } from "./logout-button";
import { ModeToggle } from "./mode-toggle";

export function AppHeader() {
  return (
    <div className="sticky top-0 z-50 border-b bg-background">
      <div className="container mx-auto flex h-[64px] items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <h1>Logo</h1>
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
