"use client"

import { BubbleMenu } from "@/components/ui/bubble-menu"

const subCircleStyle = "text-foreground/70 font-medium"

export function BubbleMenuDemo() {
  return (
    <BubbleMenu>
      <button className={subCircleStyle}>1</button>
      <button className={subCircleStyle}>2</button>
      <button className={subCircleStyle}>3</button>
      <button className={subCircleStyle}>4</button>
    </BubbleMenu>
  )
}
