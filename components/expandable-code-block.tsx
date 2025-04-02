"use client"

import * as React from "react"

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
    <div>
      <article
        ref={containerRef}
        className={`overflow-x-auto transition-all duration-300 ${
          isExpanded
            ? "max-h-full overflow-y-auto"
            : "max-h-96 overflow-y-hidden"
        }`}
      >
        {children}
      </article>

      {showButton && !isExpanded && (
        <section className="my-2 flex w-full justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(true)}
          >
            Show more
          </Button>
        </section>
      )}

      {showButton && isExpanded && (
        <section className="my-2 flex w-full justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(false)}
          >
            Show less
          </Button>
        </section>
      )}
    </div>
  )
}
