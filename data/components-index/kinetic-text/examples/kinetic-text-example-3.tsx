"use client"

import { KineticText } from "@/components/ui/kinetic-text"

export function KineticTextExample3() {
  const quote = "Creativity is intelligence having fun.\nAlbert Einstein"
  return (
    <KineticText
      animation="bounce"
      by="line"
      stagger={0.3}
      duration={1.5} // Duration hint for each line bounce animation
      loop
      delay={0.5} // Initial delay before the first line starts its loop
      className="rounded-md bg-muted p-4 text-center text-2xl italic"
    >
      {quote}
    </KineticText>
  )
}
