import { type SeparatorProps } from "@/components/ui/separator"

import { ComponentDetails } from "../site-index"
import { SeparatorPlayground } from "./separator-playground"
import { separatorPlaygroundCode } from "./separator-playground-code"

export const separator: ComponentDetails<SeparatorProps> = {
  playground: { label: "OR" },
  PlaygroundComponent: SeparatorPlayground,
  playgroundCode: separatorPlaygroundCode
}
