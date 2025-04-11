"use client"

import * as React from "react"

import { AutoTableOfContents } from "../ui/auto-toc"

export function TOC(props: React.ComponentPropsWithRef<"div">) {
  return (
    <aside {...props}>
      <AutoTableOfContents title="On This Page" />
    </aside>
  )
}
