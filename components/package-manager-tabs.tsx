import { cn } from "@/lib/utils"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsProps,
  TabsTrigger
} from "@/components/ui/tabs"

import { CopyToClipboardButton } from "./copy-to-clipboard-button"

interface PackageManagersTabsProps {
  cliCommand: string
}

const tabs = [
  {
    name: "pnpm",
    value: "pnpm",
    content: "pnpm dlx shadcn@latest"
  },
  {
    name: "npm",
    value: "npm",
    content: "npx shadcn@latest"
  },
  {
    name: "yarn",
    value: "yarn",
    content: "npx shadcn@latest"
  },
  {
    name: "bun",
    value: "bun",
    content: "bunx --bun shadcn@latest"
  }
]

export default function PackageManagersTabs({
  cliCommand,
  className,
  ...props
}: PackageManagersTabsProps & TabsProps) {
  return (
    <Tabs
      variant="underlined"
      defaultValue={tabs[0].value}
      className={cn("min-w-0", className)}
      {...props}
    >
      <TabsList className="p-1">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="px-2.5 sm:px-3"
          >
            <code className="flex items-center gap-1 text-[13px]">
              {tab.name}
            </code>
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <div className="flex h-10 items-center justify-between gap-2 rounded-md border pl-3 pr-1.5">
            <code className="text-[13px] truncate">{`${tab.content} ${cliCommand}`}</code>
            <CopyToClipboardButton content={`${tab.content} ${cliCommand}`} />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
