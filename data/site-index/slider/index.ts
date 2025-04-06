import { SliderVariant } from "@/components/ui/slider"

import { ComponentDetails } from "../site-index"
import { SliderPlayground, SliderPlaygroundProps } from "./slider-playground"
import { sliderPlaygroundCode } from "./slider-playground-code"

export const slider: ComponentDetails<SliderPlaygroundProps> = {
  title: "Slider",
  url: "/components/slider",
  componentName: "slider",
  description:
    "A versatile slider component with a variety of styles and advanced behaviours.",
  playground: {
    variant: ["default", "solid", "square", "thin"] satisfies SliderVariant[],
    showTooltip: false,
    withOutput: false,
    withInput: true,
    startLabel: "",
    endLabel: "",
    showTicks: true,
    numberOfTicks: 11
  },
  cliCommand: "add slider",
  PlaygroundComponent: SliderPlayground,
  playgroundCode: sliderPlaygroundCode
}
