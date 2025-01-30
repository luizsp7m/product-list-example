import type { NextAuthConfig } from "next-auth";

import {
  AUTHENTICATED_ENTRY,
  UNAUTHENTICATED_ENTRY,
} from "./constants/app-config";

import { USER_ROLES } from "./constants/user-roles";

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

      const userRole = auth?.user.role;
      const isAdmin = userRole === USER_ROLES.ADMIN;

      if (isOnDashboard && !isLoggedIn) {
        return false;
      }

      if (isOnDashboard && isLoggedIn && !isAdmin) {
        return Response.redirect(new URL("/", nextUrl));
      }

      if (isLoginRoute && isLoggedIn) {
        return Response.redirect(new URL(AUTHENTICATED_ENTRY, nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
