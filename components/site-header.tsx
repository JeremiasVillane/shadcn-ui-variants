import Link from "next/link"
import { ComponentDoc } from "@/types"
import { GalleryVerticalEnd, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import MainNav from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"

interface SiteHeaderProps {
  navComponentCards: ComponentDoc[]
}

export function SiteHeader({ navComponentCards }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-4 space-x-4 sm:justify-between sm:space-x-0">
        <Link href="/" className="flex items-center space-x-2">
          <GalleryVerticalEnd className="h-6 w-6" />
          <span className="inline-block font-bold">Shadcn Variants</span>
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-4 md:justify-between">
          <section className="hidden md:flex">
            <MainNav navComponentCards={navComponentCards} />
          </section>

          <section className="flex items-center space-x-1">
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              asChild
              className="hidden sm:inline-flex"
            >
              <Link
                href="https://github.com/JeremiasVillane/shadcn-ui-variants"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <MobileNav navComponentCards={navComponentCards} />
              </SheetContent>
            </Sheet>
          </section>
        </div>
      </div>
    </header>
  )
}
