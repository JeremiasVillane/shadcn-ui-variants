import Link from "next/link"
import { GalleryVerticalEnd } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link href="/" className="flex items-center space-x-2">
          <GalleryVerticalEnd className="h-6 w-6" />
          <span className="inline-block font-bold">Shadcn Variants</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <MainNav />
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            <Button variant="outline" size="sm" asChild>
              <Link
                href="https://github.com/JeremiasVillane/shadcn-ui-variants"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
