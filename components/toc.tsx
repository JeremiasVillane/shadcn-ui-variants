"use client"

import * as React from "react"

import { AnchorProvider, NyxTOCItems, ScrollProvider } from "./ui/nyx-toc"

export default function TOC(props: React.ComponentPropsWithRef<"div">) {
  const containerRef = React.useRef(null)

  const items = [
    {
      title: "Playground",
      url: "#playground",
      depth: 1
    },
    {
      title: "API",
      url: "#api",
      depth: 3
    },
    {
      title: "Installation",
      url: "#installation",
      depth: 1
    }
  ]

  return (
    <aside {...props}>
      <ScrollProvider containerRef={containerRef}>
        <AnchorProvider toc={items}>
          <NyxTOCItems items={items} label="On This Page" />
        </AnchorProvider>
      </ScrollProvider>
    </aside>
  )
}
