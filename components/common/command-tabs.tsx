import { cn } from "@/lib/utils"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsProps,
  TabsTrigger
} from "@/components/ui/tabs"

import { CopyToClipboardButton } from "./copy-to-clipboard-button"
import { CodeBlock } from "../local/ui/code-block"

export type CommandMapType = {
  pnpm: string
  npm: string
  yarn: string
  bun: string
}

interface CommandTabsProps {
  commandMap: CommandMapType
}

export function CommandTabs({
  commandMap,
  className,
  ...props
}: CommandTabsProps & TabsProps) {
  const tabs = Object.entries(commandMap)

  return (
    <Tabs
      variant="bootstrap"
      defaultValue={tabs[0][0]}
      className={cn("min-w-0", className)}
      {...props}
    >
      <TabsList>
        {tabs.map(([tabTitle, _]) => (
          <TabsTrigger
            key={tabTitle}
            value={tabTitle}
            className="px-2.5 sm:px-3"
          >
            <code className="flex items-center gap-1 text-[13px]">
              {tabTitle}
            </code>
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map(([tabTitle, tabContent]) => (
        <TabsContent key={tabTitle} value={tabTitle}>
          <div className="flex h-10 items-center justify-between gap-2 overflow-hidden rounded-md border bg-neutral-900 px-2">
            <CodeBlock
              language="llvm"
              code={tabContent}
              className="truncate bg-transparent px-2 py-1"
            />
            <CopyToClipboardButton content={tabContent} />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
