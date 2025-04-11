"use client"

import * as React from "react"
import { AlignLeft } from "lucide-react"

import { cn } from "@/lib/utils"
import { useUrlChange } from "@/hooks/use-url-change"

interface TOCItem {
  id: string
  text: string
  level: number
}

interface AutoTableOfContentsProps {
  /** The CSS selector for the container element containing headings.
   * @default "main" */
  containerSelector?: string

  /** The title displayed above the table of contents.
   * @default "Table of Contents" */
  title?: string

  /** Maximum depth of heading levels to include in the table of contents.
   * @default 3 */
  maxDepth?: number

  /** Minimum number of headings required to display the table of contents.
   * @default 2 */
  minHeadings?: number

  /** Additional CSS classes for the navigation container. */
  className?: string

  /** Flag to auto-generate IDs for headings without an existing ID.
   * @default false */
  autoGenerateIds?: boolean

  /** Offset for scrolling to headings. Useful for sticky headers.
   * @default 100 */
  offset?: number
}

function AutoTableOfContents({
  containerSelector = "main",
  title = "Table of Contents",
  maxDepth = 3,
  minHeadings = 2,
  className,
  autoGenerateIds = false,
  offset = 100
}: AutoTableOfContentsProps) {
  const [headings, setHeadings] = React.useState<TOCItem[]>([])
  const [activeId, setActiveId] = React.useState<string>("")
  const observersRef = React.useRef<IntersectionObserver[]>([])

  // Track URL changes to remount/update when navigation occurs
  const currentUrl = useUrlChange()

  // Extract headings from the DOM
  React.useEffect(() => {
    // Clear previous active ID when the current page changes
    !currentUrl.includes("#") && setActiveId("")

    // Clean up any existing observers
    if (observersRef.current.length > 0) {
      observersRef.current.forEach((observer) => observer.disconnect())
      observersRef.current = []
    }

    // Wait a bit for the DOM to be fully updated after route changes
    const timeoutId = setTimeout(() => {
      const container = document.querySelector(containerSelector)
      if (!container) return

      const headingElements = container.querySelectorAll(
        "h1, h2, h3, h4, h5, h6"
      )

      const extractedHeadings: TOCItem[] = []

      headingElements.forEach((heading) => {
        const level = Number.parseInt(heading.tagName.substring(1))

        // Skip headings deeper than maxDepth
        if (level > maxDepth) return

        let id = heading.id

        // If heading doesn't have an ID
        if (!id) {
          // Only generate an ID if autoGenerateIds is true
          if (autoGenerateIds) {
            id =
              heading.textContent
                ?.trim()
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "") || `heading-${extractedHeadings.length}`
            heading.id = id
          } else {
            return
          }
        }

        extractedHeadings.push({
          id,
          text: heading.textContent?.trim() || "",
          level
        })
      })

      if (extractedHeadings.length >= minHeadings) {
        setHeadings(extractedHeadings)
        setupObservers(extractedHeadings)
      } else {
        setHeadings([])
      }
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      observersRef.current.forEach((observer) => observer.disconnect())
      observersRef.current = []
    }
  }, [containerSelector, maxDepth, minHeadings, autoGenerateIds, currentUrl])

  const setupObservers = (headings: TOCItem[]) => {
    if (typeof IntersectionObserver === "undefined") {
      return
    }

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)

      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveId(heading.id)
              }
            })
          },
          {
            rootMargin: "0px 0px -80% 0px",
            threshold: 0.1
          }
        )

        observer.observe(element)
        observersRef.current.push(observer)
      }
    })
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()

    const element = document.getElementById(id)

    if (element) {
      window.scrollTo({
        top: element.offsetTop - offset,
        behavior: "smooth"
      })

      // Update URL hash without scrolling
      window.history.pushState(null, "", `#${id}`)
    }
  }

  if (headings.length < minHeadings) {
    return null
  }

  return (
    <nav className={cn("w-full max-w-xs", className)}>
      {title && (
        <h3 className="-ms-0.5 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <AlignLeft className="size-4" />
          {title}
        </h3>
      )}
      <ul className="ms-2 space-y-1">
        {headings.map((heading) => {
          const isActive = activeId === heading.id
          const indentLevel = Math.max(0, heading.level - 1)

          return (
            <li
              key={heading.id}
              className="transition-all duration-200"
              style={{
                marginLeft: indentLevel > 1 ? `${(indentLevel - 1) * 9}px` : 0
              }}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={cn(
                  "relative block rounded-sm px-3 py-1 text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-foreground/80 hover:bg-muted hover:text-foreground"
                )}
                aria-current={isActive ? "location" : undefined}
              >
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 top-0 w-0.5 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                )}
                {heading.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export { AutoTableOfContents }
export type { AutoTableOfContentsProps, TOCItem }
