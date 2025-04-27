import Link from "next/link"
import { RegistryItem } from "@/types"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/local/ui/navigation-menu"

import ComponentNavCard from "./component-nav-card"

const navButtonStyle = cn(
  navigationMenuTriggerStyle(),
  "bg-transparent h-8 rounded-sm"
)

interface MainNavProps {
  registryItems: RegistryItem[]
}

export default function MainNav({ registryItems }: MainNavProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navButtonStyle}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={navButtonStyle}>
            Components
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-3 xl:w-[600px]">
              {registryItems?.map(
                (component) =>
                  component && (
                    <ComponentNavCard
                      key={component.name}
                      component={component}
                    />
                  )
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navButtonStyle}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
