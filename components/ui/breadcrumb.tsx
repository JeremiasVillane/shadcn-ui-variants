import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, ChevronsRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  /** @default "default" */
  // prettier-ignore
  variant?: "default" | "contained" | "badge-active" | "badge-outline" | "badge-fill"
  /** @default "default" */
  separatorVariant?: "default" | "slash" | "dot" | "chevrons" | "step"
}

interface BreadcrumbContextValue {
  separatorVariant: BreadcrumbProps["separatorVariant"]
  contained: boolean
  badgeActive: boolean
  badgeFill: boolean
  badgeOutline: boolean
}

const BreadcrumbContext = React.createContext<BreadcrumbContextValue>({
  separatorVariant: "default",
  contained: false,
  badgeActive: false,
  badgeFill: false,
  badgeOutline: false
})

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    { separatorVariant = "default", variant = "default", className, ...props },
    ref
  ) => {
    const contained = variant === "contained"
    const badgeActive = variant === "badge-active"
    const badgeFill = variant === "badge-fill"
    const badgeOutline = variant === "badge-outline"

    const contextValue: BreadcrumbContextValue = {
      separatorVariant,
      contained,
      badgeActive,
      badgeFill,
      badgeOutline
    }

    return (
      <BreadcrumbContext.Provider value={contextValue}>
        <nav
          ref={ref}
          aria-label="breadcrumb"
          className={cn(
            contained && "rounded-lg bg-secondary px-3 py-1.5",
            className
          )}
          {...props}
        />
      </BreadcrumbContext.Provider>
    )
  }
)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & { asChild?: boolean }
>(({ asChild, className, children, ...props }, ref) => {
  const { badgeFill, badgeOutline } = React.useContext(BreadcrumbContext)
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    >
      {badgeFill ? (
        <Badge
          variant="secondary"
          className="rounded-full font-medium shadow-none"
        >
          {children}
        </Badge>
      ) : badgeOutline ? (
        <Badge
          variant="outline"
          className="rounded-full font-medium shadow-none"
        >
          {children}
        </Badge>
      ) : (
        children
      )}
    </Comp>
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, children, ...props }, ref) => {
  const { badgeActive, badgeOutline, badgeFill } =
    React.useContext(BreadcrumbContext)
  const content =
    badgeActive || badgeOutline || badgeFill ? (
      <Badge className="rounded-full shadow-none">{children}</Badge>
    ) : (
      children
    )

  return (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    >
      {content}
    </span>
  )
})
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => {
  const { separatorVariant } = React.useContext(BreadcrumbContext)
  let separatorContent: React.ReactNode

  if (children) {
    separatorContent = children
  } else {
    switch (separatorVariant) {
      case "slash":
        separatorContent = " / "
        break
      case "dot":
        separatorContent = " • "
        break
      case "chevrons":
        separatorContent = <ChevronsRight />
        break
      case "step":
        separatorContent = (
          <svg
            width="40"
            height="2"
            role="presentation"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="40" height="2" fill="currentColor" />
          </svg>
        )
        break
      default:
        separatorContent = <ChevronRight />
        break
    }
  }

  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn(
        "[&>svg]:h-3.5 [&>svg]:w-3.5",
        separatorVariant === "step" ? "[&>svg]:w-5.5 [&>svg]:h-full" : "",
        className
      )}
      {...props}
    >
      {separatorContent}
    </li>
  )
}
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis
}
export type { BreadcrumbProps }
