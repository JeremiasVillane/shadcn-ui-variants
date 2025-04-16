import { type InputProps } from "@/components/ui/input"

import { ComponentDetails } from "../site-index"
import { InputExtras } from "./input-extras"
import { InputPlayground } from "./input-playground"
import { inputPlaygroundCode } from "./input-playground-code"

export const input: ComponentDetails<InputProps> = {
  playground: {
    startIcon: undefined,
    endIcon: undefined,
    startAddon: undefined,
    endAddon: undefined,
    maxLength: 33
  },
  PlaygroundComponent: InputPlayground,
  playgroundCode: inputPlaygroundCode,
  ExtrasComponent: InputExtras
}
