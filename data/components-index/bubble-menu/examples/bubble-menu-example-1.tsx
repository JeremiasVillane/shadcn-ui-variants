"use client"

import { Edit, Heart, RotateCw, Share2, Trash2 } from "lucide-react"

import { BubbleMenu } from "@/components/ui/bubble-menu"

export function BubbleMenuExample1() {
  return (
    <BubbleMenu radius={80} buttonSize={40} subButtonSize={44}>
      <button className="flex size-full items-center justify-center">
        <Trash2 className="size-5 text-destructive" />
      </button>
      <button className="flex size-full items-center justify-center">
        <Edit className="size-5 text-primary" />
      </button>
      <button className="flex size-full items-center justify-center">
        <Share2 className="text-info size-5" />
      </button>
      <button className="flex size-full items-center justify-center">
        <Heart className="size-5 text-rose-500" />
      </button>
      <button className="flex size-full items-center justify-center">
        <RotateCw className="text-warning size-5" />
      </button>
    </BubbleMenu>
  )
}
