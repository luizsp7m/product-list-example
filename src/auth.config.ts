import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isLoginPage = nextUrl.pathname.startsWith("/login");

      if (isOnDashboard) {
        return isLoggedIn;
      }

      if (isLoginPage) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/dashboard", nextUrl));
        } else {
          return true;
        }
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;
