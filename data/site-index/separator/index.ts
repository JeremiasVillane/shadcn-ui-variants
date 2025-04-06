import { SeparatorVariant } from "@/components/ui/separator"

import { ComponentDetails } from "../site-index"
import {
  SeparatorPlayground,
  SeparatorPlaygroundProps
} from "./separator-playground"
import { separatorPlaygroundCode } from "./separator-playground-code"

export const separator: ComponentDetails<SeparatorPlaygroundProps> = {
  title: "Separator",
  url: "/components/separator",
  componentName: "separator",
  description: "Separator component with new variants and styles.",
  playground: {
    variant: ["default", "dotted", "dashed"] satisfies SeparatorVariant[],
    label: "OR",
    chip: false,
    orientation: ["vertical", "horizontal"]
  },
  PlaygroundComponent: SeparatorPlayground,
  playgroundCode: separatorPlaygroundCode
}
