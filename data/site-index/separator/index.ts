import { SeparatorVariant } from "@/components/ui/separator"

import {
  SeparatorPlayground,
  SeparatorPlaygroundProps
} from "./separator-playground"
import { separatorPlaygroundCode } from "./separator-playground-code"

export const separator = {
  title: "Separator",
  url: "/components/separator",
  componentName: "separator",
  description: "Custom Separator with variants and new props",
  playground: {
    variant: ["default", "dotted", "dashed"] satisfies SeparatorVariant[],
    label: "OR",
    chip: false,
    orientation: ["vertical", "horizontal"]
  } satisfies Record<keyof SeparatorPlaygroundProps, any>,
  PlaygroundComponent: SeparatorPlayground,
  playgroundCode: separatorPlaygroundCode
}
