"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { RegistryItem } from "@/types"

import { cn } from "@/lib/utils"

import { NavigationMenuLink } from "./ui/navigation-menu"

interface ComponentNavCardProps {
  component: RegistryItem
}

export default function ComponentNavCard({ component }: ComponentNavCardProps) {
  const pathname = usePathname()

  return (
    <li key={component.title}>
      <NavigationMenuLink asChild>
        <Link
          href={`/components/${component.name}`}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            pathname === `/components/${component.name}` &&
              "bg-accent text-accent-foreground"
          )}
        >
          <div className="text-sm font-medium leading-none">
            {component.title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {component.description}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
