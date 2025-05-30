"use client"

import { KineticTextProps } from "@/components/ui/kinetic-text"

export const kineticTextPlaygroundCode = ({
  animation,
  duration,
  delay,
  startOnView,
  once,
  loop,
  onScroll,
  by,
  stagger
}: KineticTextProps): string => {
  const code = `import { KineticText } from "@/components/ui/kinetic-text"

export function KineticPlayground() {
  return (
    <KineticText
      animation="${animation}"${duration !== 0.5 ? `
      duration={${duration}}` : ""}${delay !== 0 ? `
      delay={${delay}}` : ""}${startOnView ? `
      startOnView` : ""}${!once ? `
      once={false}` : ""}${loop ? `
      loop` : ""}${onScroll ? `
      onScroll` : ""}${by !== "character" ? `
      by="${by}"` : ""}${stagger !== 0.05 ? `
      stagger={${stagger}}` : ""}
    >
      Text to animate
    </KineticText>
  )
}`

  return code
}
