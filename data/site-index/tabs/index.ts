import { TabsVariant } from "@/components/ui/tabs"

import { TabsPlayground, TabsPlaygroundProps } from "./tabs-playground"
import { tabsPlaygroundCode } from "./tabs-playground-code"

export const tabs = {
  title: "Tabs",
  url: "/components/tabs",
  componentName: "tabs",
  description: "Custom tabs variants with different styles and animations.",
  playground: {
    variant: [
      "default",
      "underlined",
      "brutalist",
      "pill-filled",
      "pill-outlined",
      "pill-boxed",
      "segmented",
      "bootstrap",
      "vercel"
    ] satisfies TabsVariant[]
  } satisfies Record<keyof TabsPlaygroundProps, any>,
  cliCommand: "add tabs",
  PlaygroundComponent: TabsPlayground,
  playgroundCode: tabsPlaygroundCode
}
