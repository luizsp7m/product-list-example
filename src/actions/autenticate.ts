"use server";

import { AuthError } from "next-auth";
import { signIn } from "../lib/auth";

export async function authenticate(credentials: {
  email: string;
  password: string;
}) {
  try {
    await signIn("credentials", credentials);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }

    throw error;
  }
}
