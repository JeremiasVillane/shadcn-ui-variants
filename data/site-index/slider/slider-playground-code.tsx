"use client"

import { SliderPlaygroundProps } from "./slider-playground"

export const sliderPlaygroundCode = ({
  variant,
  withOutput,
  withInput,
  startLabel,
  endLabel,
  showTooltip,
  showTicks,
  numberOfTicks
}: SliderPlaygroundProps) => {
  const code = `"use client"

import { Slider, SliderVariant } from "@/components/ui/slider"

export function SliderPlayground() {
  return (
    <div className="w-full py-12">
      <Slider defaultValue={[50]} max={100}${!showTicks ? " step={1}" : ""}${variant !== "default" ? ` variant="${variant}"` : ""}${showTooltip ? " showTooltip" : ""}${withOutput ? " withOutput" : ""}${withInput ? " withInput" : ""}${startLabel.length > 0 ? ` startLabel="${startLabel}"` : ""}${endLabel.length > 0 ? ` endLabel="${endLabel}"` : ""}${showTicks ? ` showTicks numberOfTicks={${numberOfTicks}}` : ""} />
    </div>
  )
}
`

  return code
}
