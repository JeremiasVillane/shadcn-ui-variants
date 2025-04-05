"use client"

import * as React from "react"

import { getHighlightedCodeNodes } from "@/lib/shiki"
import { cn } from "@/lib/utils"

import { CopyToClipboardButton } from "./copy-to-clipboard-button"
import { DownloadFileButton } from "./download-file-button"
import { ExpandableCodeBlock } from "./expandable-code-block"
import { Card, CardContent } from "./ui/card"

interface CodeBlockProps extends React.ComponentPropsWithoutRef<"div"> {
  name: string
  code: string
  registryUrl?: string
}

export function CodeBlock({
  name,
  code,
  registryUrl,
  className,
  ...props
}: CodeBlockProps) {
  const [highlightedCode, setHighlightedCode] =
    React.useState<React.ReactNode | null>(null)

  React.useEffect(() => {
    async function highlightCode() {
      const highlightedNodes = await getHighlightedCodeNodes(code)
      setHighlightedCode(highlightedNodes)
    }
    highlightCode()
  }, [code])

  return (
    <Card className={cn("bg-code relative overflow-hidden", className)}>
      <CardContent className="max-w-2xl p-0" {...props}>
        {registryUrl && (
          <div className="border-b px-8 pb-8 pt-6">
            <h2 className="mb-2.5 text-lg font-semibold">
              Installation Command
            </h2>
          </div>
        )}

        <ExpandableCodeBlock>
          {highlightedCode}
          <div className="absolute right-2 top-2 flex">
            <CopyToClipboardButton content={code} />
            <DownloadFileButton sourceCode={code} name={`${name}-playground`} />
          </div>
        </ExpandableCodeBlock>
      </CardContent>
    </Card>
  )
}
