"use client";

import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <Button size="icon" variant="outline" onClick={() => logout()}>
      <LogOut />
    </Button>
  );
}
