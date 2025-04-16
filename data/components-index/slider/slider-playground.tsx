"use client"

import { Slider, type SliderProps } from "@/components/ui/slider"

export function SliderPlayground({
  variant,
  withOutput,
  withInput,
  startLabel,
  endLabel,
  showTooltip,
  showTicks,
  numberOfTicks
}: SliderProps) {
  return (
    <div className="w-full py-12">
      <Slider
        variant={variant}
        withOutput={withOutput}
        withInput={withInput}
        startLabel={startLabel}
        endLabel={endLabel}
        showTooltip={showTooltip}
        showTicks={showTicks}
        numberOfTicks={numberOfTicks}
        defaultValue={[50]}
        max={100}
        step={1}
      />
    </div>
  )
}
