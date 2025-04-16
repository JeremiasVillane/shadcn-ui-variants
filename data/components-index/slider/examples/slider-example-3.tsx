"use client"

import * as React from "react"
import { Volume2Icon, VolumeXIcon } from "lucide-react"

import { Slider } from "@/components/ui/slider"

export function SliderExample3() {
  const [value, setValue] = React.useState([50])

  return (
    <div className="container">
      <Slider
        value={value}
        onValueChange={setValue}
        startIcon={
          <VolumeXIcon
            role="button"
            size={20}
            onClick={() => setValue([0])}
            className="transition-color text-foreground/70 hover:text-foreground"
          />
        }
        endIcon={<Volume2Icon size={20} className="text-foreground/70" />}
        withOutput
      />
    </div>
  )
}
