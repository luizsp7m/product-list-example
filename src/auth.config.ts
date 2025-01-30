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
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }

      return token;
    },

    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.role = token.role as string;

      return session;
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith(AUTHENTICATED_ENTRY);
      const isLoginRoute = nextUrl.pathname === UNAUTHENTICATED_ENTRY;

      if (isOnDashboard && !isLoggedIn) {
        return false;
      }

      if (isLoginRoute && isLoggedIn) {
        return Response.redirect(new URL(AUTHENTICATED_ENTRY, nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
