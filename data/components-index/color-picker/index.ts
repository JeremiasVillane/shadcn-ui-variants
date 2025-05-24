import { ColorPickerProps } from "@/components/ui/color-picker"

import { ComponentDetails } from "../site-index"
import { ColorPickerExtras } from "./color-picker-extras"
import { ColorPickerPlayground } from "./color-picker-playground"
import { colorPickerPlaygroundCode } from "./color-picker-playground-code"

export const colorPicker: ComponentDetails<ColorPickerProps> = {
  playground: {
    className: undefined,
    value: undefined,
    onChange: undefined,
    onAddColor: undefined,
    trigger: undefined,
    defaultColor: undefined,
    presetColors: undefined,
    showFormat: undefined
  },
  PlaygroundComponent: ColorPickerPlayground,
  playgroundCode: colorPickerPlaygroundCode,
  ExtrasComponent: ColorPickerExtras
}
