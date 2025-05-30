"use client"

import { Button } from "@/components/ui/button"
import { Kinetic } from "@/components/ui/kinetic"

export function KineticExample4() {
  return (
    <Kinetic
      animation={{
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1 }
      }}
      loop
      duration={2}
    >
      <Button>Looping button</Button>
    </Kinetic>
  )
}
