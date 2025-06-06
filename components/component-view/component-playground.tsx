"use client"

import * as React from "react"
import { useForceRemount } from "@/hooks"
import { RegistryItem } from "@/types"
import { RefreshCcw } from "lucide-react"

import { H2, SubLead } from "@/components/ui/prose"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CodeBlockWrapper,
  CopyToClipboardButton,
  DownloadFileButton
} from "@/components/common"
import { Card, CardContent } from "@/components/local/ui/card"
import { CodeBlock } from "@/components/local/ui/code-block"

import PlaygroundControls from "./playground-controls"

interface ComponentPlaygroundProps {
  name: RegistryItem["name"]
  title: RegistryItem["title"]
  playground: { [x: string]: string | number | boolean | string[] }
  PlaygroundComponent: (...args: any[]) => React.JSX.Element
  showReload?: boolean
  playgroundCode: (...args: any[]) => string
}

export default function ComponentPlayground({
  name,
  title,
  playground,
  PlaygroundComponent,
  showReload,
  playgroundCode
}: ComponentPlaygroundProps) {
  const { remountKey, forceRemount } = useForceRemount()

  const initialState = Object.keys(playground).reduce(
    (acc, key) => {
      const value = playground[key]
      acc[key] = Array.isArray(value) ? value[0] : value
      return acc
    },
    {} as { [key: string]: string | number | boolean }
  )

  const [playgroundState, updatePlaygroundState] = React.useReducer(
    (prev: typeof playground, next: typeof playground) => {
      const newState = { ...prev, ...next }
      return newState
    },
    initialState
  )

  const code = React.useMemo(
    () => playgroundCode(playgroundState),
    [playgroundState]
  )

  return (
    <>
      <H2 id="playground">Playground</H2>
      <SubLead>{`Customize the ${title} properties to see different variations.`}</SubLead>

      <Tabs variant="underlined" defaultValue="preview" className="w-full">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="pt-4">
          <Card className="relative p-4 pt-9">
            <CardContent className="flex min-h-80 items-center justify-center overflow-auto px-0 md:px-12">
              <PlaygroundComponent key={remountKey} {...playgroundState} />
              <div className="absolute right-2 top-2 flex">
                <CopyToClipboardButton content={code} />
                <DownloadFileButton
                  sourceCode={code}
                  name={`${name}-playground`}
                />
                {showReload && (
                  <RefreshCcw
                    role="button"
                    onClick={forceRemount}
                    className="m-1.5 size-3.5 shrink-0 text-muted-foreground hover:text-foreground"
                  />
                )}
              </div>
            </CardContent>
          </Card>

          <Separator variant="dashed" className="mt-8" />

          <PlaygroundControls
            {...{ playground, playgroundState, updatePlaygroundState }}
          />
        </TabsContent>

        <TabsContent value="code" className="pt-4">
          <CodeBlockWrapper>
            <CodeBlock
              language="tsx"
              filename={`${name}-playground.tsx`}
              code={code}
              className="mb-7 border"
            />
          </CodeBlockWrapper>
        </TabsContent>
      </Tabs>

      <Separator variant="dashed" className="mt-8" />
    </>
  )
}
