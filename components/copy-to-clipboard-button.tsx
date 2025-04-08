"use client"

import { useCopyToClipboard } from "@/hooks"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button, ButtonProps } from "./ui/button"

export const CopyToClipboardButton = ({
  content,
  className,
  ...props
}: ButtonProps & { content: string }) => {
  const { copyToClipboard, isCopied } = useCopyToClipboard()

  return (
    <Button
      variant="ghost"
      size="xs"
      {...props}
      className={cn(
        "shrink-0 text-muted-foreground [&_svg]:size-3.5",
        "hover:bg-background/50",
        className
      )}
      onClick={() => copyToClipboard(content)}
      aria-label={
        isCopied ? "Copied to clipboard" : "Copy command to clipboard"
      }
    >
      <span className="sr-only">{isCopied ? "Copied" : "Copy"}</span>
      <Copy
        className={cn(
          "h-4 w-4 transition-transform duration-200 ease-in-out",
          isCopied ? "scale-0" : "scale-100"
        )}
        aria-hidden={isCopied}
      />
      <Check
        className={cn(
          "absolute h-4 w-4 transition-transform duration-200 ease-in-out",
          isCopied ? "scale-100" : "scale-0"
        )}
        aria-hidden={!isCopied}
      />
    </Button>
  )
}
