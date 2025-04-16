"use client"

import type { SliderProps } from "@/components/ui/slider"

export const sliderPlaygroundCode = ({
  variant,
  withOutput,
  withInput,
  startLabel,
  endLabel,
  showTooltip,
  showTicks,
  numberOfTicks
}: SliderProps) => {
  const code = `import { Slider, SliderVariant } from "@/components/ui/slider"

export function SliderPlayground() {
  return (
    <div className="w-full py-12">
      <Slider defaultValue={[50]} max={100}${!showTicks ? " step={1}" : ""}${variant !== "default" ? ` variant="${variant}"` : ""}${showTooltip ? " showTooltip" : ""}${withOutput ? " withOutput" : ""}${withInput ? " withInput" : ""}${!!startLabel && (startLabel as string).length > 0 ? ` startLabel="${startLabel}"` : ""}${!!endLabel && (endLabel as string).length > 0 ? ` endLabel="${endLabel}"` : ""}${showTicks ? ` showTicks numberOfTicks={${numberOfTicks}}` : ""} />
    </div>
  )
}
`

  return code
}
