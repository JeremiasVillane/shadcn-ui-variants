"use client"

import { useState } from "react"

import { ColorPicker } from "@/components/ui/color-picker"
import { Label } from "@/components/ui/label"

export function ColorPickerExample1() {
  const [selectedColor, setSelectedColor] = useState("#10B981")

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor="controlledColor" className="text-lg">
          Pick a color:
        </Label>
        <ColorPicker
          id="controlledColor"
          value={selectedColor}
          onChange={setSelectedColor}
          popoverSide="top"
          className="size-6 rounded-full transition-all hover:scale-105"
        />
      </div>
      <p>Current color: {selectedColor}</p>
    </div>
  )
}
