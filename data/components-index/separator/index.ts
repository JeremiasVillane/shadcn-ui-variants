import { ComponentDetails } from "../site-index"
import {
  SeparatorPlayground,
  SeparatorPlaygroundProps
} from "./separator-playground"
import { separatorPlaygroundCode } from "./separator-playground-code"

export const separator: ComponentDetails<SeparatorPlaygroundProps> = {
  playground: {
    label: "OR"
  },
  PlaygroundComponent: SeparatorPlayground,
  playgroundCode: separatorPlaygroundCode
}
