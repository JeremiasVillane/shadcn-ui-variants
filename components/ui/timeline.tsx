import * as React from "react"

import { cn } from "@/lib/utils"

interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  /** Defines the position of the timeline items.
   * @default "right" */
  position?: "left" | "right" | "alternate" | "reverse-alternate"
}

const TimelineItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, children, ...props }, ref) => {
  let hasOppositeContent = false

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === TimelineOppositeContent) {
      hasOppositeContent = true
    }
  })

  return (
    <li
      ref={ref}
      className={cn(
        "flex min-h-20 items-stretch",
        !hasOppositeContent && [
          "before:content-['']",
          "before:hidden",
          "before:flex-1",
          "before:px-4",
          "before:py-1.5",
          "md:before:block"
        ],
        className
      )}
      {...props}
    >
      {children}
    </li>
  )
})
TimelineItem.displayName = "TimelineItem"

const TimelineOppositeContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("timeline-opposite-area flex-1 px-4 py-1.5", className)}
    {...props}
  />
))
TimelineOppositeContent.displayName = "TimelineOppositeContent"

const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ className, position = "right", ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        "flex flex-col",
        position === "right" && [
          "[&>li_.timeline-content-area]:text-left",
          "[&>li_.timeline-opposite-area]:text-right"
        ],
        position === "left" && [
          "[&>li]:flex-row-reverse",
          "[&>li_.timeline-content-area]:text-right",
          "[&>li_.timeline-opposite-area]:text-left"
        ],
        position === "alternate" && [
          "[&>li_.timeline-content-area]:text-left",
          "[&>li_.timeline-opposite-area]:text-right",
          "md:[&>li:nth-child(odd)_.timeline-content-area]:text-left",
          "md:[&>li:nth-child(odd)_.timeline-opposite-area]:text-right",
          "md:[&>li:nth-child(even)]:flex-row-reverse",
          "md:[&>li:nth-child(even)_.timeline-content-area]:text-right",
          "md:[&>li:nth-child(even)_.timeline-opposite-area]:text-left"
        ],

        position === "reverse-alternate" && [
          "[&>li_.timeline-content-area]:text-left",
          "[&>li_.timeline-opposite-area]:text-right",
          "md:[&>li:nth-child(odd)]:flex-row-reverse",
          "md:[&>li:nth-child(odd)_.timeline-content-area]:text-right",
          "md:[&>li:nth-child(odd)_.timeline-opposite-area]:text-left",
          "md:[&>li:nth-child(even)_.timeline-content-area]:text-left",
          "md:[&>li:nth-child(even)_.timeline-opposite-area]:text-right"
        ],
        className
      )}
      {...props}
    />
  )
)
Timeline.displayName = "Timeline"

const TimelineSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "timeline-separator flex flex-none flex-col items-center",
      className
    )}
    {...props}
  />
))
TimelineSeparator.displayName = "TimelineSeparator"

const TimelineNode = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "my-3 flex rounded-full bg-primary p-1.5 shadow-md",
      className
    )}
    {...props}
  />
))
TimelineNode.displayName = "TimelineNode"

const TimelineConnectorLine = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn("w-0.5 grow bg-muted", className)} {...props} />
))
TimelineConnectorLine.displayName = "TimelineConnectorLine"

const TimelineContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("timeline-content-area flex-1 px-4 py-1.5", className)}
    {...props}
  />
))
TimelineContent.displayName = "TimelineContent"

const TimelineHeader = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold text-primary", className)}
    {...props}
  >
    {children}
  </h3>
))
TimelineHeader.displayName = "TimelineHeader"

const TimelineBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  >
    {children}
  </div>
))
TimelineBody.displayName = "TimelineBody"

export {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineNode,
  TimelineConnectorLine,
  TimelineContent,
  TimelineHeader,
  TimelineBody
}
export type { TimelineProps }
