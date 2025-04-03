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
      variant: ["default", "underlined", "bootstrap"],
      numberOfTabs: ["1", "2", "3"],
      tab1Title: "Tab 1",
      tab2Title: "Tab 2",
      tab3Title: "Tab 3"
    },
    cliCommand: "add tabs",
    PlaygroundComponent: TabsPlayground,
    playgroundCode: tabsPlaygroundCode
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
