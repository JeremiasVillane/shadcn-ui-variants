import type React from "react"

import { Separator } from "@/components/ui/separator"

export default function ComponentsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="space-y-6">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <div className="h-full py-6 pl-8 pr-6 lg:py-8">
            <nav className="flex flex-col space-y-2">
              <div className="flex flex-col space-y-3">
                <h4 className="font-medium">Getting Started</h4>
                <a
                  href="/docs"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Introduction
                </a>
                <a
                  href="/docs/installation"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Installation
                </a>
              </div>
              <Separator className="my-4" />
              <div className="flex flex-col space-y-3">
                <h4 className="font-medium">Components</h4>
                <a
                  href="/components/button"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Button
                </a>
                <a
                  href="/components/badge"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Badge
                </a>
                <a
                  href="/components/card"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Card
                </a>
              </div>
            </nav>
          </div>
        </aside>
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
          <div className="mx-auto w-full min-w-0">{children}</div>
        </main>
      </div>
    </div>
  )
}
