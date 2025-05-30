"use client"

import { KineticText } from "@/components/ui/kinetic-text"

export function KineticTextExample1() {
  return (
    <KineticText
      animation="fadeInUp"
      by="character"
      stagger={0.03} // Small delay between characters
      duration={0.4} // Duration for each character's animation
      startOnView={true}
      once={true} // Play animation only once when it enters view
      className="my-8 text-center text-4xl font-bold" // TailwindCSS for example styling
    >
      Welcome to Our World
    </KineticText>
  )
}
