import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

import React from "react";

export default function NavItems({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="flex flex-row gap-6 items-center text-xl text-gray-300">
            <Link href={href} legacyBehavior passHref>
              <NavigationMenuLink className="bg-none">
                {label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
