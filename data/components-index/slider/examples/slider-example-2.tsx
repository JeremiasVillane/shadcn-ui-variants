"use client"

import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/local/ui/label"

export function SliderExample2() {
  return (
    <div className="container">
      <Label>Temperature</Label>
      <Slider variant="thin" max={100} withInput showTicks numberOfTicks={5} />
    </div>
  )
}
