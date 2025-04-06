import { accordion } from "./accordion"
import { alert } from "./alert"
import { alertDialog } from "./alert-dialog"
import { breadcrumb } from "./breadcrumb"
import { button } from "./button"
import { input } from "./input"
import { separator } from "./separator"
import { slider } from "./slider"
import { tabs } from "./tabs"

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
  accordion,
  alert,
  "alert-dialog": alertDialog,
  breadcrumb,
  button,
  input,
  separator,
  slider,
  tabs
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
