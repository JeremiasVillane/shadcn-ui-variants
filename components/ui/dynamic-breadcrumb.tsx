"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  type BreadcrumbProps
} from "@/components/ui/breadcrumb"

interface DynamicBreadcrumbProps {
  /** Whether to show the home link at the start of the breadcrumb
   *  @default false */
  displayHome?: boolean
  /** Whether to make the links active or not
   *  @default false */
  activeLinks?: boolean
  /** Additional CSS classes to apply to the breadcrumb container */
  className?: string
}

function DynamicBreadcrumb({
  displayHome = false,
  activeLinks = false,
  className,
  ...props
}: DynamicBreadcrumbProps & BreadcrumbProps) {
  const [pathSegments, setPathSegments] = React.useState<string[]>([])

  React.useEffect(() => {
    if (typeof window === "undefined") return
    const pathname = window.location.pathname
    const segments = pathname.split("/").filter((segment) => segment)
    setPathSegments(segments)
  }, [])

  return (
    <Breadcrumb className={cn("pb-3", className)} {...props}>
      <BreadcrumbList>
        {displayHome && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                {activeLinks ? <a href="/">Home</a> : <span>Home</span>}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathSegments.length > 0 && <BreadcrumbSeparator />}
          </>
        )}

        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/")
          const isLast = index === pathSegments.length - 1

          const displayName = segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase())

          return (
            <React.Fragment key={href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{displayName}</BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink asChild>
                      {activeLinks ? (
                        <a href={href}>{displayName}</a>
                      ) : (
                        <span className="cursor-default">{displayName}</span>
                      )}
                    </BreadcrumbLink>
                  </>
                )}
              </BreadcrumbItem>

              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export { DynamicBreadcrumb }
export type { DynamicBreadcrumbProps }
