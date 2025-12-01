"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { categories } from "@/lib/data"
import { cn } from "@/lib/utils"

export function CategoryNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[600px] grid-cols-3 gap-4 p-4">
              {categories.map((category) => (
                <div key={category.id} className="group relative">
                  <Link href={`/categories/${category.id}`} className="block">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={200}
                      height={120}
                      className="h-32 w-full rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-md" />
                    <div className="absolute bottom-2 left-2 text-white">
                      <h3 className="font-bold">{category.name}</h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className="bg-gray-100/50 p-4 dark:bg-gray-800/50">
               <h4 className="font-semibold mb-2">Shop by Category</h4>
               <ul className="grid grid-cols-3 gap-2">
                {categories.map((category) => (
                  <li key={category.id}>
                     <Link href={`/categories/${category.id}`} passHref legacyBehavior>
                        <NavigationMenuLink className={cn("text-sm hover:underline")}>
                          {category.name}
                        </NavigationMenuLink>
                     </Link>
                  </li>
                ))}
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
