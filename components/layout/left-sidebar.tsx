"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { contentIndex } from "@/data/content-index"

import { toWordCase } from "@/lib/string-utils"
import { Separator } from "@/components/ui/separator"

export function LeftSidebar() {
  const pathname = usePathname()

  const getLinkStyle = React.useCallback(
    (url: string) =>
      `rounded-sm rounded-l-none px-3 py-1 text-sm transition-colors ${pathname === url ? "bg-primary/10 font-medium text-primary border-l-2 border-foreground -ms-0.5" : "text-foreground/80 hover:bg-muted hover:text-foreground"}`,
    [pathname]
  )

  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] md:block">
      <div className="h-full py-6 pl-8 pr-6 lg:py-8">
        {contentIndex.map((section, index) => (
          <React.Fragment key={section.label}>
            <div className="flex flex-col space-y-2">
              <h4 className="text-sm font-medium">{section.label}</h4>
              <nav className="flex flex-col space-y-2">
                {section.items.map((item) => {
                  const url =
                    "url" in item ? item.url : `/components/${item.name}`
                  return (
                    <Link key={url} href={url} className={getLinkStyle(url)}>
                      {item.title}
                    </Link>
                  )
                })}
              </nav>
            </div>
            {index < contentIndex.length - 1 && <Separator className="my-4" />}
          </React.Fragment>
        ))}
      </div>
    </aside>
  )
}
