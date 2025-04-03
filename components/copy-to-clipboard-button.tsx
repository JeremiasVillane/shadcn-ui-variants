"use client"

import { useCopyToClipboard } from "@/hooks"
import { Copy, CopyCheck } from "lucide-react"

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
        "text-muted-foreground [&_svg]:size-3.5",
        className
      )}
      onClick={() => copyToClipboard(content)}
    >
      {isCopied ? (
        <CopyCheck />
      ) : (
        <>
          <Copy />
          <span className="sr-only">Copy</span>
        </>
      )}
    </Button>
  )
}
