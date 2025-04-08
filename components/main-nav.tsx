import Link from "next/link"
import { ComponentDoc } from "@/types"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"

import ComponentNavCard from "./component-nav-card"

interface MainNavProps {
  navComponentCards: ComponentDoc[]
}

const navButtonStyle = cn(
  navigationMenuTriggerStyle(),
  "bg-transparent h-8 rounded-sm"
)

export default function MainNav({ navComponentCards }: MainNavProps) {
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
            <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2 xl:w-[600px]">
              {navComponentCards?.map(
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
