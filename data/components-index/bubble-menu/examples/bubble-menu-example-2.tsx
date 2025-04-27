"use client"

import { Droplet, Eraser, PenTool, Shapes, Type } from "lucide-react"

import { BubbleMenu } from "@/components/ui/bubble-menu"

export function BubbleMenuExample2() {
  return (
    <BubbleMenu radius={75} buttonSize={50} subButtonSize={50}>
      <button className="flex size-full items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600">
        <PenTool className="size-6" />
      </button>
      <button className="flex size-full items-center justify-center rounded-full bg-purple-500 text-white hover:bg-purple-600">
        <Droplet className="size-6" />
      </button>
      <button className="flex size-full items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600">
        <Shapes className="size-6" />
      </button>
      <button className="flex size-full items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-600">
        <Type className="size-6" />
      </button>
      <button className="flex size-full items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600">
        <Eraser className="size-6" />
      </button>
    </BubbleMenu>
  )
}
