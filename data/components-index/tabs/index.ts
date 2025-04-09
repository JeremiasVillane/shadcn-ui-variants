import { ComponentDetails } from "../site-index"
import { TabsPlayground, TabsPlaygroundProps } from "./tabs-playground"
import { tabsPlaygroundCode } from "./tabs-playground-code"

export const tabs: ComponentDetails<TabsPlaygroundProps> = {
  cliCommand: "add tabs",
  PlaygroundComponent: TabsPlayground,
  playgroundCode: tabsPlaygroundCode
}
