"use client"

import { ColorPicker, ColorPickerProps } from "@/components/ui/color-picker"

export function ColorPickerPlayground(props: ColorPickerProps) {
  return (
    <ColorPicker
      {...props}
      defaultColor="#335599"
      className="border-2 border-muted-foreground shadow"
    />
  )
}
