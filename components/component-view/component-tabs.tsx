"use client"

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
  Component: (...args: any[]) => React.JSX.Element
}

export function ComponentTabs({ code, name, Component }: ComponentTabsProps) {
  return (
    <Tabs variant="underlined" defaultValue="preview" className="w-full">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>

      <TabsContent value="preview" className="p-4">
        <Card className="relative p-4 pt-9">
          <CardContent className="flex min-h-80 items-center justify-center overflow-auto px-0 md:px-12">
            <Component />
            <div className="absolute right-2 top-2 flex">
              <CopyToClipboardButton content={code} />
              <DownloadFileButton sourceCode={code} name={name} />
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
