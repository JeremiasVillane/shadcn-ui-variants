"use client"

import { Kinetic, KineticProps } from "@/components/ui/kinetic"

export function KineticPlayground(props: KineticProps) {
  return (
    <div className="flex w-full h-36 items-center justify-center overflow-hidden">
      <Kinetic {...props}>
        <div>Content to animate</div>
      </Kinetic>
    </div>
  )
}
