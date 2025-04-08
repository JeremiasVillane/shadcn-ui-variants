"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { contentIndex } from "@/data/site-index"

import { toPascalCase } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

export default function LeftSidebar() {
  const pathname = usePathname()

  const getLinkStyle = React.useCallback(
    (url: string) =>
      `text-sm hover:text-foreground/80 ${pathname === url ? "text-foreground" : "text-muted-foreground"}`,
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
                      {toPascalCase(item.name)}
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
