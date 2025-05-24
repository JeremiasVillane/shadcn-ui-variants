"use client"

import * as React from "react"

import { ColorPicker } from "@/components/ui/color-picker"
import { toast } from "@/components/ui/simple-toast"

export function ColorPickerExample7() {
  const [color, setColor] = React.useState("#F59E0B")

  const handleAddNewColor = (newColor: string) => {
    toast({
      title: "Color Added to Palette!",
      description: (
        <article className="space-y-2 pt-1">
          <div>Color: {newColor}</div>
          <div
            className="h-6 w-36 rounded"
            style={{ backgroundColor: newColor }}
          />
        </article>
      ),
      position: "top-center",
      enterAnimationType: "zoom-in",
      duration: 6000,
    })
    // Here you might add the color to a global state, API, etc.
  }

  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      onAddColor={handleAddNewColor}
    />
  )
}
