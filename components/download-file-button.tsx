import * as React from "react"
import { Download } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button, ButtonProps } from "./ui/button"

interface DownloadFileButtonProps {
  sourceCode: string
  name: string
}

export const DownloadFileButton = ({
  sourceCode,
  name,
  className,
  ...props
}: ButtonProps & DownloadFileButtonProps) => {
  const downloadFile = React.useCallback(() => {
    const blob = new Blob([sourceCode], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [sourceCode])

  return (
    <Button
      variant="ghost"
      size="xs"
      {...props}
      className={cn(
        "text-muted-foreground [&_svg]:size-3.5",
        "transition-transform duration-200 ease-in-out active:scale-90",
        "hover:bg-background/50",
        className
      )}
      onClick={downloadFile}
    >
      <Download />
      <span className="sr-only">Download</span>
    </Button>
  )
}
