import { ComponentDetails } from "../site-index"
import { SliderPlayground, SliderPlaygroundProps } from "./slider-playground"
import { sliderPlaygroundCode } from "./slider-playground-code"

export const slider: ComponentDetails<SliderPlaygroundProps> = {
  cliCommand: "add slider",
  PlaygroundComponent: SliderPlayground,
  playgroundCode: sliderPlaygroundCode
}
