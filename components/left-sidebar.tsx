import React from "react"
import Link from "next/link"
import { contentIndex } from "@/data/components-index"

import { Separator } from "@/components/ui/separator"

export default function LeftSidebar() {
  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] md:block">
      <div className="h-full py-6 pl-8 pr-6 lg:py-8">
        {contentIndex.map((section, index) => (
          <React.Fragment key={section.label}>
            <div className="flex flex-col space-y-3">
              <h4 className="font-medium">{section.label}</h4>
              <nav className="flex flex-col space-y-2">
                {section.items.map((item) => {
                  if (typeof item === "object") {
                    return (
                      <Link
                        key={item.url}
                        href={item.url}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {item.title}
                      </Link>
                    )
                  }
                  return (
                    <Link
                      key={item}
                      href={`/components/${item}`}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {(item as string).charAt(0).toUpperCase() +
                        (item as string).slice(1)}
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
