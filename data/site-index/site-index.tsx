import { AccordionVariant } from "@/components/ui/accordion"
import { TabsVariant } from "@/components/ui/tabs"

import { AccordionPlayground, accordionPlaygroundCode } from "./accordion"
import { TabsPlayground, tabsPlaygroundCode } from "./tabs"

interface ComponentDetails {
  title: string
  url: string
  componentName: string
  description?: string
  playground: Record<string, string[] | string | number | boolean>
  cliCommand?: string
  PlaygroundComponent: (...args: any[]) => React.JSX.Element
  playgroundCode: (...args: any[]) => string
  className?: string
}

type ComponentsIndex = Record<string, ComponentDetails>

export const componentsIndex: ComponentsIndex = {
  tabs: {
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
      ] satisfies TabsVariant[],
      numberOfTabs: ["1", "2", "3"],
      tab1Title: "Tab 1",
      tab2Title: "Tab 2",
      tab3Title: "Tab 3"
    },
    cliCommand: "add tabs",
    PlaygroundComponent: TabsPlayground,
    playgroundCode: tabsPlaygroundCode
  },
  accordion: {
    title: "Accordion",
    url: "/components/accordion",
    componentName: "accordion",
    description:
      "Custom accordion variants with different styles and animations.",
    playground: {
      variant: [
        "default",
        "separated-outline",
        "separated-fill",
        "contained-outline",
        "contained-fill",
        "tabs-outline",
        "tabs-fill"
      ] satisfies AccordionVariant[],
      type: ["multiple", "single"],
      collapsible: true
    },
    cliCommand: "add accordion",
    PlaygroundComponent: AccordionPlayground,
    playgroundCode: accordionPlaygroundCode
  }
}

export const components = Object.values(componentsIndex)

export const contentIndex = [
  {
    label: "Get Started",
    items: [
      {
        title: "Introduction",
        url: "/docs"
      }
    ]
  },
  {
    label: "Components",
    items: components
  }
]
