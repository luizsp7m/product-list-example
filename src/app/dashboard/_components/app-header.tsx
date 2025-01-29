import { ModeToggle } from "./mode-toggle";
import { NavItems } from "./nav-items";

export function AppHeader() {
  return (
    <div className="border-b">
      <div className="container flex items-center justify-between mx-auto px-4 h-[64px]">
        <div className="flex items-center gap-8">
          <h1>Logo</h1>
          <NavItems />
        </div>

        <ModeToggle />
      </div>
    </div>
  );
}
