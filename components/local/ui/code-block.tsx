"use client"

import * as React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism"

import { cn } from "@/lib/utils"
import { CopyToClipboardButton, DownloadFileButton } from "@/components/common"

type CodeBlockProps = {
  language: string
  filename?: string
  highlightLines?: number[]
} & (
  | {
      code: string
      tabs?: never
    }
  | {
      code?: never
      tabs: Array<{
        name: string
        code: string
        language?: string
        highlightLines?: number[]
      }>
    }
)

export const CodeBlock = ({
  language,
  filename,
  code,
  highlightLines = [],
  tabs = [],
  className,
  ...props
}: CodeBlockProps & React.ComponentPropsWithoutRef<"div">) => {
  const [activeTab, setActiveTab] = React.useState(0)

  const tabsExist = tabs.length > 0

  const activeCode = tabsExist ? tabs[activeTab].code : code
  const activeLanguage = tabsExist
    ? tabs[activeTab].language || language
    : language
  const activeHighlightLines = tabsExist
    ? tabs[activeTab].highlightLines || []
    : highlightLines

  return (
    <div
      className={cn(
        "relative w-full rounded-lg bg-neutral-900 p-4 pb-10 font-mono text-sm",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-2">
        {tabsExist && (
          <div className="flex overflow-x-auto">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`!py-2 px-3 font-sans text-xs transition-colors ${
                  activeTab === index
                    ? "text-white"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        )}
        {!tabsExist && filename && (
          <div className="flex items-center justify-between py-3">
            <div className="absolute left-4 top-3 text-xs text-zinc-400">
              {filename}
            </div>
            <div className="absolute right-2 top-2 flex">
              <CopyToClipboardButton
                content={tabsExist ? tabs[activeTab].code : (code ?? "")}
              />
              <DownloadFileButton
                sourceCode={tabsExist ? tabs[activeTab].code : (code ?? "")}
                name={filename}
              />
            </div>
          </div>
        )}
      </div>
      <SyntaxHighlighter
        language={activeLanguage}
        style={tomorrow}
        customStyle={{
          margin: 0,
          padding: 0,
          background: "transparent",
          fontSize: "0.875rem" // text-sm equivalent
        }}
        wrapLines={true}
        showLineNumbers={!!filename}
        lineProps={(lineNumber) => ({
          style: {
            backgroundColor: activeHighlightLines.includes(lineNumber)
              ? "rgba(255,255,255,0.1)"
              : "transparent",
            display: "block",
            width: "100%"
          }
        })}
        PreTag="div"
      >
        {String(activeCode)}
      </SyntaxHighlighter>
    </div>
  )
}
