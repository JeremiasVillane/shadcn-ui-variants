"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/local/ui/collapsible"

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  expandButtonTitle?: string
}

export function CodeBlockWrapper({
  expandButtonTitle = "Expand",
  className,
  children,
  ...props
}: CodeBlockProps) {
  const [isOpened, setIsOpened] = React.useState(false)

  return (
    <Collapsible open={isOpened} onOpenChange={setIsOpened}>
      <div
        className={cn("relative overflow-hidden rounded-b-md", className)}
        {...props}
      >
        <CollapsibleContent
          forceMount
          className={cn("overflow-hidden", !isOpened && "max-h-[20rem]")}
        >
          <div
            className={cn(
              "[&_pre]:my-0 [&_pre]:max-h-[650px] [&_pre]:pb-[100px]",
              !isOpened ? "[&_pre]:overflow-hidden" : "[&_pre]:overflow-auto]"
            )}
          >
            {children}
          </div>
        </CollapsibleContent>
        <div
          className={cn(
            "absolute flex h-24 w-full items-center justify-center rounded-b-md bg-gradient-to-t from-black to-transparent p-2",
            isOpened
              ? "inset-x-0 bottom-6 h-12"
              : "bottom-0 left-1/2 -translate-x-1/2"
          )}
        >
          <CollapsibleTrigger asChild>
            <Button className="h-8 border border-muted-foreground/40 bg-black text-xs text-white hover:bg-neutral-800">
              {isOpened ? "Collapse" : expandButtonTitle}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
    </Collapsible>
  )
}
