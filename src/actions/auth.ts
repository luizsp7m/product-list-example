"use server";

import { signIn, signOut } from "@/lib/auth";

import {
  AUTHENTICATED_ENTRY,
  UNAUTHENTICATED_ENTRY,
} from "@/constants/app-config";

import { LoginFormData } from "@/app/login/_components/login-form";

export async function signInWithCredentials(credentials: LoginFormData) {
  try {
    await signIn("credentials", {
      redirect: true,
      redirectTo: AUTHENTICATED_ENTRY,
      email: credentials.email,
      password: credentials.password,
    });
  } catch (error) {
    throw error;
  }
}

export const logout = async () => {
  await signOut({ redirectTo: UNAUTHENTICATED_ENTRY });
};
