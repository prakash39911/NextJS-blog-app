import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

import React from "react";

export default function NavItems() {
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="flex flex-row gap-6 items-center text-xl text-gray-300">
            <Link href="/allblogs" legacyBehavior passHref>
              <NavigationMenuLink className="bg-none">
                All Blogs
              </NavigationMenuLink>
            </Link>
            <Link href="/trending" legacyBehavior passHref>
              <NavigationMenuLink className="bg-none">
                Trending
              </NavigationMenuLink>
            </Link>
            <Link href="/alltimefav" legacyBehavior passHref>
              <NavigationMenuLink className="bg-none">
                All Time Fav
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
