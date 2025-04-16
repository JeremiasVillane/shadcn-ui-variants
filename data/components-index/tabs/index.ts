import { type TabsProps } from "@/components/ui/tabs"

import { ComponentDetails } from "../site-index"
import { TabsPlayground } from "./tabs-playground"
import { tabsPlaygroundCode } from "./tabs-playground-code"

export const tabs: ComponentDetails<TabsProps> = {
  PlaygroundComponent: TabsPlayground,
  playgroundCode: tabsPlaygroundCode
}
