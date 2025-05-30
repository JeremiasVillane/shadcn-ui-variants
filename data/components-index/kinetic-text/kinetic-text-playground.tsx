"use client"

import { KineticText, KineticTextProps } from "@/components/ui/kinetic-text"

export function KineticTextPlayground(props: KineticTextProps) {
  return (
    <div className="flex h-36 w-full items-center justify-center overflow-hidden">
      <KineticText {...props}>Text to animate</KineticText>
    </div>
  )
}
