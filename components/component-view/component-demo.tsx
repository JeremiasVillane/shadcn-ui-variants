"use client"

import { RegistryItem } from "@/types"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyToClipboardButton, DownloadFileButton } from "@/components/common"
import { DescriptionTextSmall, SubHeading } from "@/components/typography"

import { CodeBlock } from "../ui/code-block"

interface ComponentDemoProps {
  name: RegistryItem["name"]
  title: RegistryItem["title"]
  DemoComponent: () => React.JSX.Element
  demoCode: string
}

export function ComponentDemo({
  name,
  title,
  DemoComponent,
  demoCode
}: ComponentDemoProps) {
  return (
    <section>
      <header className="mb-6">
        <SubHeading id="demo">Demo</SubHeading>
        <DescriptionTextSmall>{`See the ${title} component in action.`}</DescriptionTextSmall>
      </header>

      <Tabs variant="underlined" defaultValue="preview" className="w-full">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="p-4">
          <Card className="relative p-4 pt-9">
            <CardContent className="flex min-h-80 items-center justify-center px-12">
              <DemoComponent />
              <div className="absolute right-2 top-2 flex">
                <CopyToClipboardButton content={demoCode} />
                <DownloadFileButton
                  sourceCode={demoCode}
                  name={`${name}-demo`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="p-4">
          <CodeBlock
            language="tsx"
            filename={`${name}-demo.tsx`}
            code={demoCode}
            className="pb-3 border"
          />
        </TabsContent>
      </Tabs>
    </section>
  )
}
