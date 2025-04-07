"use client"

import * as React from "react"

import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DescriptionTextSmall, SubHeading } from "@/components/typography"

import { CodeBlock } from "./code-block"
import { CopyToClipboardButton } from "./copy-to-clipboard-button"
import { DownloadFileButton } from "./download-file-button"
import { PlaygroundControls } from "./playground-controls"
import { Card, CardContent } from "./ui/card"

interface PlaygroundProps {
  title: string
  name: string
  playground: Record<string, string[] | string | number | boolean>
  PlaygroundComponent: (...args: any[]) => React.JSX.Element
  playgroundCode: (...args: any[]) => string
}

export function ComponentPlayground({
  title,
  name,
  playground,
  PlaygroundComponent,
  playgroundCode
}: PlaygroundProps) {
  const initialState = Object.keys(playground).reduce(
    (acc, key) => {
      const value = playground[key]
      acc[key] = Array.isArray(value) ? value.at(-1)! : value
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

  const currentPlaygroundCode = React.useMemo(
    () => playgroundCode(playgroundState),
    [playgroundState]
  )

  return (
    <main>
      <header className="mb-6">
        <SubHeading id="playground">Playground</SubHeading>
        {name && (
          <DescriptionTextSmall>{`Customize the ${title} properties to see different variations.`}</DescriptionTextSmall>
        )}
      </header>

      <Tabs variant="underlined" defaultValue="preview" className="w-full">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="p-4">
          <Card className="relative p-4 pt-9">
            <CardContent className="flex justify-center">
              <PlaygroundComponent {...playgroundState} />
              <div className="absolute right-2 top-2 flex">
                <CopyToClipboardButton content={currentPlaygroundCode} />
                <DownloadFileButton
                  sourceCode={currentPlaygroundCode}
                  name={`${name}-playground`}
                />
              </div>
            </CardContent>
          </Card>

          <Separator className="mb-6 mt-8" />

          <PlaygroundControls
            {...{ playground, playgroundState, updatePlaygroundState }}
          />
        </TabsContent>

        <TabsContent value="code" className="p-4">
          <CodeBlock name={name} code={currentPlaygroundCode} />
        </TabsContent>
      </Tabs>

      <Separator className="my-6" />
    </main>
  )
}
