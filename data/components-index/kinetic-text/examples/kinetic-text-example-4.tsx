"use client"

import { KineticText } from "@/components/ui/kinetic-text"

export function KineticTextExample4() {
  return (
    <KineticText
      animation="rotateIn"
      by="text" // Animates the entire text block as one segment
      duration={1} // This will be overridden by the custom spring if it doesn't use duration
      delay={0.2}
      transition={{
        // Custom transition
        type: "spring",
        stiffness: 500,
        damping: 15
      }}
      className="text-5xl font-extrabold text-purple-600"
    >
      KINETIC!
    </KineticText>
  )
}
