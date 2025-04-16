import Link from "next/link"
import { MaterialSymbolsStarRounded } from "@/public/assets/MaterialSymbolsStarRounded"
import { MdiGithub } from "@/public/assets/MdiGithub"
import { RegistryItem } from "@/types"
import { GalleryVerticalEnd, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { HoverBorderGradient } from "@/components/local/ui/hover-border-gradient"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from "@/components/local/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

import MainNav from "./main-nav"
import MobileNav from "./mobile-nav"

interface SiteHeaderProps {
  registryItems: RegistryItem[]
}

export function SiteHeader({ registryItems }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-4 space-x-4 sm:justify-between sm:space-x-0">
        <Link href="/" className="flex items-center space-x-2">
          <GalleryVerticalEnd className="h-6 w-6" />
          <span className="hidden font-bold md:inline-block">
            Shadcn UI Variants
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-4 md:justify-between">
          <section className="hidden md:flex">
            <MainNav registryItems={registryItems} />
          </section>

          <section className="flex items-center space-x-1">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="flex items-center space-x-0 bg-background px-2 py-0.5 text-sm text-foreground lg:space-x-1.5"
            >
              <span className="flex items-center space-x-1">
                <MdiGithub className="size-5 shrink-0" />
                <Link
                  href="https://github.com/JeremiasVillane/shadcn-ui-variants"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground/80"
                >
                  <span className="hidden lg:flex">Star on GitHub</span>
                </Link>
              </span>
              <MaterialSymbolsStarRounded className="size-4 shrink-0 text-foreground/80" />
            </HoverBorderGradient>

            <ThemeToggle />

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <MobileNav registryItems={registryItems} />
              </SheetContent>
            </Sheet>
          </section>
        </div>
      </div>
    </header>
  )
}
