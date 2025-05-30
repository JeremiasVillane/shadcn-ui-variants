"use client"

import { Kinetic } from "@/components/ui/kinetic"

export function KineticExample3() {
  return (
    <Kinetic onScroll animation="fadeInUp">
      <div>Scroll to see me animate</div>
    </Kinetic>
  )
}
