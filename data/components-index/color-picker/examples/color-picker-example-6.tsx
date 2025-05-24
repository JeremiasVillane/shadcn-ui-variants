"use client"

import { useState } from "react"
import { Paintbrush } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ColorPicker } from "@/components/ui/color-picker"

export function ColorPickerExample6() {
  const [color, setColor] = useState("#D946EF")

  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      trigger={
        <Button
          variant="outline"
          iconLeft={<Paintbrush className="mr-2" />}
          className="w-full justify-start text-left transition-colors hover:opacity-95"
        >
          {color ? `Current: ${color}` : "Pick a color"}
        </Button>
      }
    />
  )
}
