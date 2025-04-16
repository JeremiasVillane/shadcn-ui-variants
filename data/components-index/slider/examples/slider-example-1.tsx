"use client"

import { Slider } from "@/components/ui/slider"

export function SliderExample1() {
  return (
    <div className="container">
      <Slider startLabel="Low" endLabel="High" showTooltip />
    </div>
  )
}
