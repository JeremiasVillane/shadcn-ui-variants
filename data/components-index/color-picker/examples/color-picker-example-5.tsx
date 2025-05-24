"use client"

import { ColorPicker } from "@/components/ui/color-picker"

export function ColorPickerExample5() {
  const presetColors = [
    "#EF4444", // Red
    "#F97316", // Orange
    "#EAB308", // Yellow
    "#22C55E", // Green
    "#3B82F6", // Blue
    "#8B5CF6" // Violet
  ]

  return (
    <ColorPicker presetColors={presetColors} defaultColor={presetColors[2]} />
  )
}
