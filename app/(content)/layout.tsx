import * as React from "react"

import { LeftSidebar, TOC } from "@/components/layout"

export default function ComponentsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="space-y-6">
      <div className="container flex-1 items-start">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[240px_minmax(0,1fr)_300px]">
          <LeftSidebar />

          <main className="py-6 lg:py-8">
            <div className="mx-auto w-full min-w-0">{children}</div>
          </main>

          <TOC className="sticky top-14 hidden h-[calc(100vh-3.5rem)] bg-background px-6 py-8 xl:block" />
        </div>
      </div>
    </div>
  )
}
