import { SliderVariant } from "@/components/ui/slider"

import { accordion } from "./accordion"
import { alert } from "./alert"
import { alertDialog } from "./alert-dialog"
import { breadcrumb } from "./breadcrumb"
import { separator } from "./separator"
import {
  SliderPlayground,
  sliderPlaygroundCode,
  SliderPlaygroundProps
} from "./slider"
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
  separator,
  slider: {
    title: "Slider",
    url: "/components/slider",
    componentName: "slider",
    description: "A custom Slider with added functionalities.",
    playground: {
      variant: ["default", "solid", "square", "thin"] satisfies SliderVariant[],
      showTooltip: false,
      withOutput: false,
      withInput: true,
      startLabel: "",
      endLabel: "",
      showTicks: true,
      numberOfTicks: 11
    } satisfies Record<keyof SliderPlaygroundProps, any>,
    cliCommand: "add slider",
    PlaygroundComponent: SliderPlayground,
    playgroundCode: sliderPlaygroundCode
  },
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
