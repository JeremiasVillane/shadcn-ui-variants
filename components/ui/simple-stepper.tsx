import * as React from "react"

import { cn } from "@/lib/utils"

const Stepper = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("flex flex-col", className)} {...props} />
))
Stepper.displayName = "Stepper"

const StepperItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("relative flex items-stretch gap-4", className)}
    {...props}
  />
))
StepperItem.displayName = "StepperItem"

const StepperConnector = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex w-6 flex-col items-center", className)}
    {...props}
  />
))
StepperConnector.displayName = "StepperConnector"

const StepperDot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-[15px] text-foreground/80 ring-4 ring-background",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
StepperDot.displayName = "StepperDot"

const StepperLine = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-[2px] flex-grow bg-foreground/10", className)}
    {...props}
  />
))
StepperLine.displayName = "StepperLine"

const StepperContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <article
    ref={ref}
    className={cn("min-w-0 flex-1 pb-8 pt-0.5", className)}
    {...props}
  />
))
StepperContent.displayName = "StepperContent"

const StepperTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-base font-semibold leading-tight", className)}
    {...props}
  />
))
StepperTitle.displayName = "StepperTitle"

const StepperDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <section
    ref={ref}
    className={cn("mt-0.5 min-w-0 text-sm text-muted-foreground", className)}
    {...props}
  />
))
StepperDescription.displayName = "StepperDescription"

export {
  Stepper,
  StepperItem,
  StepperConnector,
  StepperDot,
  StepperLine,
  StepperContent,
  StepperTitle,
  StepperDescription
}
