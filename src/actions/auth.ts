"use server";

import { signIn, signOut } from "@/lib/auth";
import { UNAUTHENTICATED_ENTRY } from "@/constants/app-config";

import { LoginFormData } from "@/app/login/_components/login-form";
import { AuthError } from "next-auth";

export async function authenticate(credentials: LoginFormData) {
  try {
    await signIn("credentials", credentials);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Invalid credentials");
        default:
          throw new Error("Something went wrong");
      }
    }
    throw error;
  }
}

export const logout = async () => {
  await signOut({ redirectTo: UNAUTHENTICATED_ENTRY });
};
