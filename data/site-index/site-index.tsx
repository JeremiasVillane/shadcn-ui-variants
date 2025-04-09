import { toWordCase } from "@/lib/utils"

import { accordion } from "./accordion"
import { alert } from "./alert"
import { alertDialog } from "./alert-dialog"
import { breadcrumb } from "./breadcrumb"
import { button } from "./button"
import { input } from "./input"
import { separator } from "./separator"
import { slider } from "./slider"
import { tabs } from "./tabs"

export interface ComponentDetails<T = any> {
  playground?: Record<string, string[] | string | number | boolean>
  cliCommand?: string
  PlaygroundComponent: (args: T) => React.JSX.Element
  playgroundCode: (args: T) => string
}

export interface FullComponentDetails extends ComponentDetails {
  name: string
  title: string
  url: string
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

export const components: FullComponentDetails[] = Object.entries(
  componentsIndex
).map(([key, value]) => {
  return {
    ...value,
    name: key,
    title: toWordCase(key),
    url: `/components/${key}`
  }
})

export const contentIndex = [
  {
    label: "Get Started",
    items: [
      {
        name: "Introduction",
        url: "/docs"
      }
    ]
  },
  {
    label: "Components",
    items: components
  }
]
