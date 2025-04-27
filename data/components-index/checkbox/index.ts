import { CheckboxProps } from "@/components/ui/checkbox"

import { ComponentDetails } from "../site-index"
import { CheckboxPlayground } from "./checkbox-playground"
import { checkboxPlaygroundCode } from "./checkbox-playground-code"

export const checkbox: ComponentDetails<CheckboxProps> = {
  PlaygroundComponent: CheckboxPlayground,
  playgroundCode: checkboxPlaygroundCode
}
