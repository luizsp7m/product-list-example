"use client";

import { AUTHENTICATED_ENTRY } from "@/constants/app-config";
import clsx from "clsx";
import Link from "next/link";

import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { route: "/dashboard", label: "Home" },
  { route: "/dashboard/products", label: "Products" },
];

export function NavItems() {
  const pathname = usePathname();

  const isActiveLink = (route: string) => {
    if (route === AUTHENTICATED_ENTRY) {
      return route === pathname;
    }

    return pathname.startsWith(route);
  };

  return (
    <nav className="flex items-center gap-4">
      {NAV_ITEMS.map((navItem, index) => (
        <Link
          key={index}
          href={navItem.route}
          className={clsx("text-sm text-muted-foreground", {
            "text-primary": isActiveLink(navItem.route),
          })}
        >
          {navItem.label}
        </Link>
      ))}
    </nav>
  );
}
