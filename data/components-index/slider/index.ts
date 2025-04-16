import { type SliderProps } from "@/components/ui/slider"

import { ComponentDetails } from "../site-index"
import { SliderExtras } from "./slider-extras"
import { SliderPlayground } from "./slider-playground"
import { sliderPlaygroundCode } from "./slider-playground-code"

export const slider: ComponentDetails<SliderProps> = {
  playground: { startIcon: undefined, endIcon: undefined },
  PlaygroundComponent: SliderPlayground,
  playgroundCode: sliderPlaygroundCode,
  ExtrasComponent: SliderExtras
}
