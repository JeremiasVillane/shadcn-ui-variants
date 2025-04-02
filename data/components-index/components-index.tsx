import { TabsPlayground, tabsPlaygroundCode } from "./tabs"

interface ComponentDetails {
  title: string
  url: string
  componentName: string
  description?: string
  playground: Record<string, string[] | string | number | boolean>
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
      variant: ["default", "bootstrap"],
      numberOfTabs: ["1", "2", "3"],
      tab1Title: "Tab 1",
      tab2Title: "Tab 2",
      tab3Title: "Tab 3"
    },
    PlaygroundComponent: TabsPlayground,
    playgroundCode: tabsPlaygroundCode
  }
}

export const components = Object.values(componentsIndex)

export const groups = [
  {
    label: "Get Started",
    items: [
      {
        title: "Introduction",
        url: "/components/introduction"
      }
    ]
  },
  {
    label: "Components",
    items: components
  }
]
