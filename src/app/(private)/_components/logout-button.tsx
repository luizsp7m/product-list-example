"use client";

import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import { useState } from "react";

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);
    await logout();
    setIsLoading(false);
  }

  return (
    <Button size="icon" variant="outline" onClick={handleLogout}>
      {isLoading ? <Loader2 className="animate-spin" /> : <LogOut />}
    </Button>
  );
}
