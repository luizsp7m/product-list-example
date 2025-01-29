import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/provider-components/theme-provider";

export const metadata: Metadata = {
  title: {
    template: "% - | eCommerce",
    default: "eCommerce",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
