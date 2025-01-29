"use server";

import { signIn, signOut } from "@/lib/auth";

import {
  AUTHENTICATED_ENTRY,
  UNAUTHENTICATED_ENTRY,
} from "@/constants/app-config";

export const login = async () => {
  await signIn("credentials", { redirectTo: AUTHENTICATED_ENTRY });
};

export const logout = async () => {
  await signOut({ redirectTo: UNAUTHENTICATED_ENTRY });
};
