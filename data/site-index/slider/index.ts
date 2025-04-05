import { SliderVariant } from "@/components/ui/slider"

import { SliderPlayground, SliderPlaygroundProps } from "./slider-playground"
import { sliderPlaygroundCode } from "./slider-playground-code"

export const slider = {
  title: "Slider",
  url: "/components/slider",
  componentName: "slider",
  description: "A custom Slider with added functionalities.",
  playground: {
    variant: ["default", "solid", "square", "thin"] satisfies SliderVariant[],
    showTooltip: false,
    withOutput: false,
    withInput: true,
    startLabel: "",
    endLabel: "",
    showTicks: true,
    numberOfTicks: 11
  } satisfies Record<keyof SliderPlaygroundProps, any>,
  cliCommand: "add slider",
  PlaygroundComponent: SliderPlayground,
  playgroundCode: sliderPlaygroundCode
}
