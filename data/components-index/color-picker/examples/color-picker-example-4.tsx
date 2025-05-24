"use client"

import { ColorPicker } from "@/components/ui/color-picker"

export function ColorPickerExample4() {
  // Only allow HEX and RGB inputs, disable HSL.
  return (
    <div className="flex flex-col gap-4">
      <ColorPicker
        showFormat={{ hex: true, rgb: true, hsl: false }}
        selectorTitle="HEX & RGB only"
        defaultColor="#BA1818"
      />
      <ColorPicker
        showFormat={{ hex: false, rgb: false, hsl: false }}
        selectorTitle="Without any inputs"
        defaultColor="#2CBF2C"
      />
      <ColorPicker
        showFormat={{ hex: false, rgb: false, hsl: true }}
        selectorTitle="HSL only"
        defaultColor="#2020C7"
      />
    </div>
  )
}
