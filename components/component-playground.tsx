"use client"

import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { CodeBlock } from "./code-block"
import { CopyToClipboardButton } from "./copy-to-clipboard-button"
import { DownloadFileButton } from "./download-file.button"
import { PlaygroundControls } from "./playground-controls"

interface PlaygroundProps {
  title: string
  name: string
  code: string
  playground: Record<string, (string | number)[] | string | number | boolean>
  PlaygroundComponent: (...args: any[]) => React.JSX.Element
  playgroundCode: (...args: any[]) => string
}

export function ComponentPlayground({
  title,
  name,
  code,
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
    <Card>
      <CardHeader>
        <CardTitle>{`${title} Playground`}</CardTitle>
        {name && (
          <CardDescription>{`Customize the ${name} properties to see different variations.`}</CardDescription>
        )}
      </CardHeader>

      <CardContent className="p-0">
        <Tabs defaultValue="preview" className="w-full">
          <div className="flex items-center justify-between px-4">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="preview"
                className="rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-2 font-medium data-[state=active]:border-b-primary data-[state=active]:text-foreground"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-2 font-medium data-[state=active]:border-b-primary data-[state=active]:text-foreground"
              >
                Code
              </TabsTrigger>
            </TabsList>

            <section className="relative">
              <div className="absolute right-0 top-0 flex -translate-y-1/2">
                <CopyToClipboardButton content={currentPlaygroundCode} />
                <DownloadFileButton
                  sourceCode={currentPlaygroundCode}
                  name={name}
                />
              </div>
            </section>
          </div>

          <TabsContent value="preview" className="p-4">
            <div className="flex flex-col gap-8">
              <div className="flex min-h-[200px] w-full items-center justify-center rounded-md border p-8">
                <PlaygroundComponent {...playgroundState} />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Customize</h3>
                <PlaygroundControls
                  {...{ playground, playgroundState, updatePlaygroundState }}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="code" className="p-4">
            <CodeBlock code={currentPlaygroundCode} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
