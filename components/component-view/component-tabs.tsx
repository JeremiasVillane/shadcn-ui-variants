"use client"

import { useForceRemount } from "@/hooks"
import { RefreshCcw } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  CodeBlockWrapper,
  CopyToClipboardButton,
  DownloadFileButton
} from "../common"
import { Card, CardContent } from "../local/ui/card"
import { CodeBlock } from "../local/ui/code-block"

interface ComponentTabsProps {
  code: string
  name: string
  withReload?: boolean
  Component: (...args: any[]) => React.JSX.Element
}

export function ComponentTabs({
  code,
  name,
  withReload = false,
  Component
}: ComponentTabsProps) {
  const { remountKey, forceRemount } = useForceRemount()

  return (
    <Tabs variant="underlined" defaultValue="preview" className="w-full">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>

      <TabsContent value="preview" className="p-4">
        <Card className="relative p-4 pt-9">
          <CardContent className="flex min-h-80 items-center justify-center overflow-auto px-0 md:px-12">
            <Component key={remountKey} />
            <div className="absolute right-2 top-2 flex">
              <CopyToClipboardButton content={code} />
              <DownloadFileButton sourceCode={code} name={name} />
              {withReload && (
                <RefreshCcw
                  role="button"
                  onClick={forceRemount}
                  className="m-1.5 size-3.5 shrink-0 text-muted-foreground hover:text-foreground"
                />
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="code" className="p-4">
        <CodeBlockWrapper>
          <CodeBlock
            language="tsx"
            filename={`${name}.tsx`}
            code={code}
            className="mb-7 border"
          />
        </CodeBlockWrapper>
      </TabsContent>
    </Tabs>
  )
}
