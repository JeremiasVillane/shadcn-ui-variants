import { type SliderProps } from "@/components/ui/slider"

import { ComponentDetails } from "../site-index"
import { SliderPlayground } from "./slider-playground"
import { sliderPlaygroundCode } from "./slider-playground-code"

export const slider: ComponentDetails<SliderProps> = {
  PlaygroundComponent: SliderPlayground,
  playgroundCode: sliderPlaygroundCode
}
