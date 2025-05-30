"use client"

import { Kinetic } from "@/components/ui/kinetic"

export function KineticExample1() {
  return (
    <Kinetic animation="fadeIn" duration={3}>
      <div>Content to animate</div>
    </Kinetic>
  )
}
