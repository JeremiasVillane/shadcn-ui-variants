"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { Button } from "./ui/button"

interface ExpandableCodeBlockProps {
  children: React.ReactNode
}

export function ExpandableCodeBlock({ children }: ExpandableCodeBlockProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [showButton, setShowButton] = React.useState(false)

  React.useEffect(() => {
    const el = containerRef.current
    if (el && el.scrollHeight > el.clientHeight) {
      setShowButton(true)
    }
  }, [children])

  return (
    <div className="min-w-0">
      <article
        ref={containerRef}
        className={cn(
          "relative min-w-0 overflow-x-auto transition-all duration-300",
          isExpanded
            ? "max-h-full overflow-y-auto"
            : "max-h-96 overflow-y-hidden"
        )}
      >
        {children}
      </article>

      {showButton && (
        <section
          className={cn(
            "absolute bottom-0 left-1/2 flex w-full -translate-x-1/2 items-center justify-center bg-gradient-to-t from-black via-transparent to-transparent transition-all ease-in-out",
            isExpanded ? "py-2" : "py-4"
          )}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="border-neutral-800 bg-black text-white hover:bg-black hover:text-gray-300"
          >
            {isExpanded ? "Show less" : "Show more"}
          </Button>
        </section>
      )}
    </div>
  )
}
