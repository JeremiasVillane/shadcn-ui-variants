"use client"

import * as React from "react"

import { getHighlightedCodeNodes } from "@/lib/shiki"

import { ExpandableCodeBlock } from "./expandable-code-block"

interface CodeBlockProps {
  code: string
  registryUrl?: string
}

export function CodeBlock({ code, registryUrl }: CodeBlockProps) {
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
    <div className="max-w-2xl gap-0 rounded-lg border p-0">
      {registryUrl && (
        <div className="border-b px-8 pb-8 pt-6">
          <h2 className="mb-2.5 text-lg font-semibold">Installation Command</h2>
        </div>
      )}

      <ExpandableCodeBlock>{highlightedCode}</ExpandableCodeBlock>
    </div>
  )
}
