"use client"

import { KineticText } from "@/components/ui/kinetic-text"

export function KineticTextExample2() {
  return (
    <div style={{ height: "150vh", paddingTop: "50vh" }}>
      <KineticText
        animation="blurIn" // Each word will blur in
        by="word" // Animation applied word by word
        onScroll={true} // Enable scroll-driven animation

        // Use `scrollStagger` for animations when `onScroll` is true.
        // This value (0.0 to 1.0) determines how much of the total scroll progress
        // separates the start of each word's animation.
        // A smaller value means words animate closer together during scroll.
        scrollStagger={0.075} // Example: Each word starts its animation 7.5% of scrollYProgress after the previous one.

        // The `duration` prop is still relevant for how long each word's "blurIn"
        // effect takes to play out within its calculated scroll animation window.
        duration={0.6}
        
        // The `offset` prop for KineticText defines when its internal scrollYProgress (0-1) completes.
        // This 0-1 progress is then used by child segments for their staggered animation.
        offset={500} // The entire text block's scroll-based animation sequence is mapped to complete
        // by the time its top is 500px from the viewport top.

        className="text-3xl leading-relaxed text-muted-foreground"
      >
        Discover the amazing features as you scroll through our innovative
        platform. Each word reveals itself, guiding you on a journey of
        exploration.
      </KineticText>
    </div>
  )
}
