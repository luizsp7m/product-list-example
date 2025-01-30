import type { NextAuthConfig } from "next-auth";
import {
  AUTHENTICATED_ENTRY,
  UNAUTHENTICATED_ENTRY,
} from "./constants/app-config";

export const authConfig = {
  pages: {
    signIn: UNAUTHENTICATED_ENTRY,
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith(AUTHENTICATED_ENTRY);

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL(AUTHENTICATED_ENTRY, nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
