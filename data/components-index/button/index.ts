import { type ButtonProps } from "@/components/ui/button"

import { ComponentDetails } from "../site-index"
import { ButtonExtras } from "./button-extras"
import { ButtonPlayground } from "./button-playground"
import { buttonPlaygroundCode } from "./button-playground-code"

export const button: ComponentDetails<ButtonProps> = {
  playground: { iconLeft: undefined, iconRight: undefined },
  PlaygroundComponent: ButtonPlayground,
  playgroundCode: buttonPlaygroundCode,
  ExtrasComponent: ButtonExtras
}
