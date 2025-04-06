import { TabsVariant } from "@/components/ui/tabs"

import { ComponentDetails } from "../site-index"
import { TabsPlayground, TabsPlaygroundProps } from "./tabs-playground"
import { tabsPlaygroundCode } from "./tabs-playground-code"

export const tabs: ComponentDetails<TabsPlaygroundProps> = {
  title: "Tabs",
  url: "/components/tabs",
  componentName: "tabs",
  description: "Tabs component with extensive style and animation variations.",
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
  },
  cliCommand: "add tabs",
  PlaygroundComponent: TabsPlayground,
  playgroundCode: tabsPlaygroundCode
}
