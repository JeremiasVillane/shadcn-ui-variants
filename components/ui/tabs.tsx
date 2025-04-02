"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

export type TabsVariant = "default" | "bootstrap"
interface TabsContextValue {
  variant: TabsVariant
}
const TabsContext = React.createContext<TabsContextValue>({
  variant: "default"
})

const tabsListVariants = cva(
  "inline-flex h-8 items-center w-full p-0 bg-background justify-start rounded-none",
  {
    variants: {
      variant: {
        default: "text-muted-foreground",
        bootstrap: "border-b"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background h-full rounded-none",
  {
    variants: {
      variant: {
        default:
          "data-[state=active]:bg-background border-b data-[state=active]:text-foreground data-[state=active]:border-b border-muted data-[state=active]:border-primary data-[state=active]:shadow-none",
        bootstrap:
          "border border-transparent border-b-border data-[state=active]:border-border data-[state=active]:border-b-background data-[state=active]:shadow-none -mb-[2px] rounded-t"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  variant?: TabsVariant
}

const Tabs = ({ variant = "default", children, ...props }: TabsProps) => {
  return (
    <TabsContext.Provider value={{ variant }}>
      <TabsPrimitive.Root {...props}>{children}</TabsPrimitive.Root>
    </TabsContext.Provider>
  )
}

type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(TabsContext)
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

type TabsTriggerProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.Trigger
>

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(TabsContext)
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(tabsTriggerVariants({ variant }), className)}
      {...props}
    />
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }
