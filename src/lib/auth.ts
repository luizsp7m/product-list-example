import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { authConfig } from "../auth.config";
import { z } from "zod";
import { db } from "@/lib/db";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,

  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const credentialValidation = z
            .object({ email: z.string().email(), password: z.string().min(3) })
            .safeParse(credentials);

          if (!credentialValidation.success) {
            throw new Error("Error in data validation");
          }

          const { email, password } = credentialValidation.data;

          const user = await db.user.findUnique({ where: { email } });

          if (!user) {
            throw new Error("User not found");
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            throw new Error("Wrong password");
          }

          return user;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
});
