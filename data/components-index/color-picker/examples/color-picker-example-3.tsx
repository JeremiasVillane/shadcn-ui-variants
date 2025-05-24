"use client"

import { useState } from "react"

import { ColorPicker } from "@/components/ui/color-picker"

export function ColorPickerExample3() {
  const [colorWithAlpha, setColorWithAlpha] = useState("#DB277780") // 80 for 50% alpha

  return (
    <ColorPicker
      withAlpha
      value={colorWithAlpha}
      onChange={setColorWithAlpha}
      selectorTitle="Color with Transparency"
    />
  )
}
