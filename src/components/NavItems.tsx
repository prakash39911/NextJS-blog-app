"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import clsx from "clsx"; // Import clsx for conditional classes

export default function NavItems({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href; // Check if the link is active

  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="flex flex-row gap-6 items-center text-xl text-gray-300">
            <Link href={href} legacyBehavior passHref>
              <NavigationMenuLink
                className={clsx(
                  "bg-none px-4 py-2 rounded-lg transition-colors",
                  isActive
                    ? "bg-gray-800 text-gray-200"
                    : "text-gray-300 hover:bg-gray-700"
                )}
              >
                {label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
