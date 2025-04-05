"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

export type AccordionVariant =
  | "default"
  | "separated-outline"
  | "separated-fill"
  | "contained-outline"
  | "contained-fill"
  | "tabs-fill"
  | "tabs-outline"

interface AccordionContextValue {
  variant: AccordionVariant
}

const AccordionContext = React.createContext<AccordionContextValue>({
  variant: "default"
})

const accordionVariants = cva("max-w-lg my-4 w-full", {
  variants: {
    variant: {
      default: "",
      "separated-outline": "space-y-2",
      "separated-fill": "space-y-2",
      "contained-outline": "",
      "contained-fill": "",
      "tabs-fill": "space-y-2",
      "tabs-outline": "space-y-2"
    }
  },
  defaultVariants: { variant: "default" }
})

const accordionItemVariants = cva("border-b px-4", {
  variants: {
    variant: {
      default: "",
      "separated-outline": "border rounded-md",
      "separated-fill": "border-none rounded-md bg-secondary",
      "contained-outline":
        "border border-b-0 last:border-b first:rounded-t-md last:rounded-b-md",
      "contained-fill":
        "last:border-none first:rounded-t-md last:rounded-b-md bg-muted",
      "tabs-fill": "border-none rounded-md data-[state=open]:bg-secondary",
      "tabs-outline": "border rounded-md data-[state=closed]:border-none"
    }
  },
  defaultVariants: { variant: "default" }
})

type AccordionPrimitiveRootProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Root
>

type AccordionProps = AccordionPrimitiveRootProps & {
  variant?: AccordionVariant
}

const Accordion = ({
  variant = "default",
  className,
  children,
  ...props
}: AccordionProps) => {
  return (
    <AccordionContext.Provider value={{ variant }}>
      <AccordionPrimitive.Root
        className={cn(accordionVariants({ variant }), className)}
        {...props}
      >
        {children}
      </AccordionPrimitive.Root>
    </AccordionContext.Provider>
  )
}

const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(AccordionContext)
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(accordionItemVariants({ variant }), className)}
      {...props}
    />
  )
})
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const { variant } = React.useContext(AccordionContext)
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          variant.startsWith("tabs") ? "data-[state=closed]:py-2" : "",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
